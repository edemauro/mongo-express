'use strict';

var _     = require('underscore');
var bson  = require('../bson');
var os    = require('os');
var utils = require('../utils');

var routes = function (config) {
  var exp = {};

  exp.viewCollection = function (req, res) {

    req.query = req.query || {}; // might not be present in Express5

    // var limit = config.options.documentsPerPage;
    // var skip = parseInt(req.query.skip, 10) || 0;
    // var query_options = {
    //   // limit:  limit,
    //   skip:   skip,
    // };

    // some query filter
    var query           = {};
    // var projection      = {};
    // var key             = req.query.key         || '';
    // var value           = req.query.value       || '';
    // var type            = req.query.type        || '';
    // var jsonQuery       = req.query.query       || '';
    // var jsonProjection  = req.query.projection  || '';
    var dbName          = req.params.database;
    var collectionName  = req.params.collection;
    var defaultKey = (config.defaultKeyNames && config.defaultKeyNames[dbName] && config.defaultKeyNames[dbName][collectionName]) ?
      config.defaultKeyNames[dbName][collectionName] :
      '_id';
    // var edKey = function (doc, defaultKey) {
    //   var defaultKeyAsArray = defaultKey.split('.');
    //   var val = doc;
    //   for (var i = 0; i < defaultKeyAsArray.length; i++) {
    //     if (val[defaultKeyAsArray[i]]) {
    //       val = val[defaultKeyAsArray[i]];
    //     }
    //   }

    //   return val;
    // };

    // if (key && value) {
    //   // If type == J, convert value as json document
    //   if (type.toUpperCase() === 'J') {
    //     value = JSON.parse(req.query.value);
    //   }

    //   // If type == N, convert value to Number
    //   if (type.toUpperCase() === 'N') {
    //     value = Number(req.query.value);
    //   }

    //   // If type == O, convert value to ObjectID
    //   // TODO: Add ObjectID validation to prevent error messages.
    //   if (type.toUpperCase() === 'O') {
    //     value = bson.toObjectId(req.query.value);
    //     if (!value) {
    //       req.session.error = 'ObjectIDs must be 24 characters long!';
    //       return res.status(400).send({
    //         message: req.session.error,
    //       });
    //     }
    //   }

    //   if (type.toUpperCase() === 'R') {
    //     query[key] = new RegExp(req.query.value, 'i');
    //   } else {
    //     query[key] = value;
    //   }

    // } else if (jsonQuery) {
    //   query = bson.toSafeBSON(jsonQuery);
    //   if (query === null) {
    //     req.session.error = 'Query entered is not valid';
    //     return res.status(400).send({
    //       message: req.session.error,
    //     });
    //   }

    //   if (jsonProjection) {
    //     projection = bson.toSafeBSON(jsonProjection) || {};
    //   }
    // } else {
    //   query = {};
    // }

    req.collection.find({},{}, {limit: 1000}).toArray(function (err, items) {
      req.collection.stats(function (err, stats) {
        req.collection.count(query, null, function (err, count) {
          var docs    = [];
          var columns = [];

          for (var i in items) {

            // Prep items with stubs so as not to send large info down the wire
            for (let prop in items[i]) {
              if (utils.roughSizeOfObject(items[i][prop]) > config.options.maxPropSize) {
                items[i][prop] = {
                  attribu: prop,
                  display: '*** LARGE PROPERTY ***',
                  humanSz: utils.bytesToSize(utils.roughSizeOfObject(items[i][prop])),
                  maxSize: utils.bytesToSize(config.options.maxPropSize),
                  preview: JSON.stringify(items[i][prop]).substr(0, 25),
                  roughSz: utils.roughSizeOfObject(items[i][prop]),
                  _id: items[i]._id,
                };
              }
            }

            // If after prepping the row is still too big
            if (utils.roughSizeOfObject(items[i]) > config.options.maxRowSize) {
              for (let prop in items[i]) {
                if (prop !== '_id' && utils.roughSizeOfObject(items[i][prop]) > 200) {
                  items[i][prop] = {
                    attribu: prop,
                    display: '*** LARGE ROW ***',
                    humanSz: utils.bytesToSize(utils.roughSizeOfObject(items[i][prop])),
                    maxSize: utils.bytesToSize(config.options.maxRowSize),
                    preview: JSON.stringify(items[i][prop]).substr(0, 25),
                    roughSz: utils.roughSizeOfObject(items[i][prop]),
                    _id: items[i]._id,
                  };
                }
              }
            }

            docs[i] = items[i];
            columns.push(Object.keys(items[i]));
            items[i] = bson.toString(items[i]);
          }

          // Generate an array of columns used by all documents visible on this page
          columns = _.uniq(_.flatten(columns));

          var ctx = {
            title: 'Viewing Collection: ' + req.collectionName,
            documents: items, // Docs converted to strings
            docs: docs,       // Original docs
            columns: columns, // All used columns
            stats: stats,
          };

          res.locals.ctx = ctx;
          res.json(res.locals);
        });
      });
    });
  };

  exp.compactCollection = function (req, res) {
    req.db.command({ compact: req.collectionName }, function (err) {
      if (err) {
        req.session.error = 'Error: ' + err;
        // return res.redirect('back');
        return res.status(400).send({
            message: err,
          });
      }

      req.session.success = 'Collection compacted!';
      // return res.redirect('back');

      return res.status(200).json({
        message: req.session.success
      });
    });
  };

  exp.exportCollection = function (req, res) {
    req.collection.find().toArray(function (err, items) {
      res.setHeader('Content-disposition', 'attachment; filename=' + req.collectionName + '.json');
      res.setHeader('Content-type', 'application/json');
      var aItems = [];
      for (var i in items) {
        var docStr = bson.toJsonString(items[i]);
        aItems.push(docStr);
      }

      res.write(aItems.join(os.EOL));
      res.end();
    });
  };

  exp.exportColArray = function (req, res) {
    req.collection.find().toArray(function (err, items) {
      res.setHeader('Content-disposition', 'attachment; filename=' + req.collectionName + '.json');
      res.setHeader('Content-type', 'application/json');
      res.write(bson.toJsonString(items));
      res.end();
    });
  };

  exp.addCollection = function (req, res) {
    var name = req.body.collection;

    if (name === undefined || name.length === 0) {
      return res.status(400).send({
        message: 'You forgot to enter a collection name!',
      });
    }

    //Collection names must begin with a letter or underscore, and can contain only letters, underscores, numbers or dots
    if (!name.match(/^[a-zA-Z_][a-zA-Z0-9\._]*$/)) {
      return res.status(400).send({
        message: 'That collection name is invalid.',
      });
    }

    req.db.createCollection(name, function (err) {
      if (err) {
        console.error(err);
        return res.status(400).send({
          message: 'Something went wrong: ' + err,
        });
      }

      req.updateCollections(req.db, req.dbName, function () {
        res.status(200).json({
          message: 'Collection created!',
        });
      });
    });
  };

  exp.deleteCollection = function (req, res) {
    req.collection.drop(function (err) {
      if (err) {
        console.error(err);
        return res.status(400).send({
          message: 'Something went wrong: ' + err,
        });
      }

      //If delete was successful, result === true

      req.updateCollections(req.db, req.dbName, function (err) {
        if (err) {
          console.error(err);
          return res.status(400).send({
            message: 'Something went wrong: ' + err,
          });
        }

        return res.status(200).json({
          message: 'Collection  "' + req.collectionName + '" deleted!',
        });
      });
    });
  };

  exp.renameCollection = function (req, res) {
    var name = req.body.collection;

    if (name === undefined || name.length === 0) {
      return res.status(400).send({
        message: 'You forgot to enter a collection name!',
      });
    }

    //Collection names must begin with a letter or underscore, and can contain only letters, underscores, numbers or dots
    if (!name.match(/^[a-zA-Z_][a-zA-Z0-9\._]*$/)) {
      return res.status(400).send({
        message: 'That collection name is invalid.',
      });
    }

    req.collection.rename(name, function (err) {
      if (err) {
        console.error(err);
        return res.status(400).send({
          message: 'Something went wrong: ' + err,
        });
      }

      req.updateCollections(req.db, req.dbName, function (err) {
        if (err) {
          return res.status(400).send({
            message: 'Something went wrong: ' + err,
          });
        }

        res.status(200).json({
          message: 'Collection renamed!',
        });
      });
    });
  };

  exp.updateCollections = function (req, res) {
    req.updateCollections(req.db, req.dbName, function (err) {
      if (err) {
        req.session.error = 'Something went wrong: ' + err;
        return res.redirect('back');
      }

      req.session.success = 'Collections Updated!';
      res.redirect(res.locals.baseHref + 'db/' + req.dbName);
    });
  };

  return exp;
};

module.exports = routes;
