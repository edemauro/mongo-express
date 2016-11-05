'use strict';

var bson = require('../bson');
var fs = require('fs');

var routes = function (config) {
  var exp = {};

  var access = fs.createWriteStream('/home/erickdemauro/thesis/access.log');
  process.stdout.write = access.write.bind(access);

  exp.getProperty = function (req, res) {
    // Get a single property
    // URI like database/collection/document/prop
    res.send(req.prop);
  };

  exp.viewDocument = function (req, res) {
    console.time('viewDocument');
    var ctx = {
      title: (config.options.readOnly ? 'Viewing' : 'Editing') + ' Document: ' + req.document._id,
      editorTheme: config.options.editorTheme,
      docLength: bson.toString(req.document).split(/\r\n|\r|\n/).length,
      docString: bson.toString(req.document),
    };

    res.locals.ctx = ctx;
    res.json(res.locals);
    console.timeEnd('viewDocument');
  };

  exp.checkValid = function (req, res) {
    var doc = req.body.document;
    try {
      bson.toBSON(doc);
    } catch (err) {
      console.error(err);
      return res.status(400).send({
          message: err,
        });
    }

    res.status(200).json({
      message: 'Valid',
    });
  };

  exp.addDocument = function (req, res) {
    console.time('addDocument');
    var doc = req.body.document;

    if (doc === undefined || doc.length === 0) {
      return res.status(400).send({
        message: 'You forgot to enter a document!',
      });
    }

    var docBSON;

    try {
      docBSON = bson.toBSON(doc);
    } catch (err) {
      console.error(err);
      return res.status(400).send({
        message: 'That document is not valid!',
      });
    }

    req.collection.insert(docBSON, { safe: true }, function (err) {
      if (err) {
        console.error(err);
        return res.status(400).send({
          message: 'Something went wrong: ' + err,
        });
      }

      console.timeEnd('addDocument');
      
      return res.status(200).send({
        message: 'Document added!',
      });
    });
  };

  exp.updateDocument = function (req, res) {
    var doc = req.body.document;

    if (doc === undefined || doc.length === 0) {
      return res.status(400).send({
        message: 'You forgot to enter a document!',
      });
    }

    var docBSON;
    try {
      docBSON = bson.toBSON(doc);
    } catch (err) {
      console.error(err);
      return res.status(400).send({
        message: 'That document is not valid!',
      });
    }

    docBSON._id = req.document._id;

    req.collection.update(req.document, docBSON, { safe: true }, function (err) {
      if (err) {
        //document was not saved
        console.error(err);
        return res.status(400).send({
          message: 'Something went wrong: ' + err,
        });
      }

      return res.status(200).send({
        message: 'Document updated!',
      });
    });
  };

  exp.deleteDocument = function (req, res) {
    const skip            = req.query.skip        || '';
    const key             = req.query.key         || '';
    const value           = req.query.value       || '';
    const type            = req.query.type        || '';
    const jsonQuery       = req.query.query       || '';
    const jsonProjection  = req.query.projection  || '';

    req.collection.remove(req.document, { safe: true }, function (err) {
      if (err) {
        console.error(err);
        return res.status(400).send({
          message: 'Something went wrong! ' + err,
        });
      }

      return res.status(200).send({
        message: 'Document deleted! _id: ' + req.document._id,
      });
    });
  };

  return exp;
};

module.exports = routes;
