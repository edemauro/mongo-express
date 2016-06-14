'use strict';

//Add routes from other files
var collectionRoute  = require('./collection');
var databaseRoute    = require('./database');
var documentRoute    = require('./document');
var gridFSRoute      = require('./gridfs');

var routes = function (config) {
  var exp = {};

  exp.addDatabase       = databaseRoute(config).addDatabase;
  exp.deleteDatabase    = databaseRoute(config).deleteDatabase;
  exp.viewDatabase      = databaseRoute(config).viewDatabase;

  exp.addCollection     = collectionRoute(config).addCollection;
  exp.compactCollection = collectionRoute(config).compactCollection;
  exp.deleteCollection  = collectionRoute(config).deleteCollection;
  exp.exportColArray    = collectionRoute(config).exportColArray;
  exp.exportCollection  = collectionRoute(config).exportCollection;
  exp.renameCollection  = collectionRoute(config).renameCollection;
  exp.updateCollections = collectionRoute(config).updateCollections;
  exp.viewCollection    = collectionRoute(config).viewCollection;

  exp.getProperty       = documentRoute(config).getProperty;
  exp.addDocument       = documentRoute(config).addDocument;
  exp.checkValid        = documentRoute(config).checkValid;
  exp.deleteDocument    = documentRoute(config).deleteDocument;
  exp.updateDocument    = documentRoute(config).updateDocument;
  exp.viewDocument      = documentRoute(config).viewDocument;

  exp.addBucket         = gridFSRoute(config).addBucket;
  exp.deleteBucket      = gridFSRoute(config).deleteBucket;
  exp.viewBucket        = gridFSRoute(config).viewBucket;
  exp.addFile           = gridFSRoute(config).addFile;
  exp.getFile           = gridFSRoute(config).getFile;
  exp.deleteFile        = gridFSRoute(config).deleteFile;

  //Homepage route
  exp.index = function (req, res) {
    var ctx = {
      title: 'Mongo Express',
      info: false,
    };

    if (typeof req.adminDb === 'undefined') {
      return res.render('index');
    }

    req.adminDb.serverStatus(function (err, info) {
      if (err) {
        //TODO: handle error
        console.error(err);
      }

      ctx.info = info;

      res.render('index', ctx);
    });
  };

  // API index route
  exp.apiIndex = function (req, res) {
    var ctx = {
      title: 'Mongo Express',
      info: false,
    };

    res.locals.ctx = ctx;

    if (typeof req.adminDb === 'undefined') {
      return res.json(res.locals);
    }

    req.adminDb.serverStatus(function (err, info) {
      if (err) {
        //TODO: handle error
        // RETURN ERROR status
        console.error(err);
      }

      ctx.info = info;
      res.locals.ctx = ctx;
      res.json(res.locals);
    });
  };

  exp.apiDeleteDatabase = databaseRoute(config).apiDeleteDatabase;
  exp.apiViewDatabase = databaseRoute(config).apiViewDatabase;
  // exp.apiDeleteCollection = collectionRoute(config).apiDeleteCollection;
  // exp.apiViewCollection = collectionRoute(config).apiViewCollection;
  exp.apiAddDatabase       = databaseRoute(config).apiAddDatabase;
  // exp.apiAddCollection     = collectionRoute(config).apiAddCollection;
  exp.apiAddDocument = documentRoute(config).apiAddDocument;
  // exp.apiRenameCollection = collectionRoute(config).apiRenameCollection;
  exp.apiDeleteDocument = documentRoute(config).apiDeleteDocument;
  exp.apiViewDocument = documentRoute(config).apiViewDocument;
  exp.apiUpdateDocument = documentRoute(config).apiUpdateDocument;
  exp.apiViewBucket = gridFSRoute(config).apiViewBucket;

  return exp;
};

module.exports = routes;
