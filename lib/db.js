'use strict';

const _       = require('underscore');
const async   = require('async');
const mongodb = require('mongodb');

let connect = function (config) {
  // set up database stuff
  let host = config.mongodb.server  || 'localhost';
  let port = config.mongodb.port    || mongodb.Connection.DEFAULT_PORT;
  let dbOptions = {
    auto_reconnect: config.mongodb.autoReconnect,
    poolSize:       config.mongodb.poolSize,
    ssl:            config.mongodb.useSSL,
  };

  let db;

  // check to see if there is more than 1 host to connect to.
  // if so, set up a new server for each host and make a replica set.
  if (Array.isArray(host)) {
    host = host.map(function (host) {
      return new mongodb.Server(host, port, dbOptions);
    });

    db = new mongodb.Db('local', new mongodb.ReplSet(host), { safe: true, w: 0 });
  } else {
    db = new mongodb.Db('local', new mongodb.Server(host, port, dbOptions), { safe: true });
  }

  let collections     = {};
  let connections     = {};
  let databases       = [];

  //get admin instance
  let adminDb   = db.admin();
  let mainConn  = db; // main db connection

  // update the collections list
  let updateCollections = function (db, dbName, callback) {
    db.listCollections().toArray(function (err, result) {

      // result = array of { name: string, options: {}} objects
      let names = [];

      // for each object in results
      // push the name of the collection into the names aray
      for (let r in result) {
        names.push(result[r].name);
      }

      // add collections to the db in the collections object
      collections[dbName] = names.sort();

      if (callback) {
        callback(err);
      }
    });
  };

  // update database list
  let updateDatabases = function (admin, callback) {
    admin.listDatabases(function (err, dbs) {

      databases = [];
      if (err) {
        //TODO: handle error
        console.error(err);
        databases = _.pluck(config.mongodb.auth, 'database');
      } else {
        // for each DB, from the config file,
        // create a new connection, add the db to databases array,
        // and update the collections for each db
        for (let i = 0; i < dbs.databases.length; i++) {
          let dbName = dbs.databases[i].name;

          if (config.mongodb.whitelist.length !== 0) {
            if (!_.include(config.mongodb.whitelist, dbName)) {
              continue;
            }
          }

          if (config.mongodb.blacklist.length !== 0) {
            if (_.include(config.mongodb.blacklist, dbName)) {
              continue;
            }
          }

          connections[dbName] = mainConn.db(dbName);
          databases.push(dbName);
          updateCollections(connections[dbName], dbName);
        }
      }

      //Sort database names
      databases = databases.sort();

      if (callback) {
        callback(databases);
      }
    });
  };

  // connect to mongodb database
  db.open(function (err, db) {
    if (err) {
      throw err;
    }

    if (config.options.console) console.log('Database connected');

    mainConn = db;

    //Check if admin features are on
    if (config.mongodb.admin === true) {
      if (config.mongodb.adminUsername.length === 0) {
        if (config.options.console) console.log('Admin Database connected');
        updateDatabases(adminDb);
      } else {
        //auth details were supplied, authenticate admin account with them
        adminDb.authenticate(config.mongodb.adminUsername, config.mongodb.adminPassword, function (err) {
          if (err) {
            //TODO: handle error
            console.error(err);
          }

          if (config.options.console) console.log('Admin Database connected');
          updateDatabases(adminDb);
        });
      }
    } else {
      //Regular user authentication
      if (typeof config.mongodb.auth === 'undefined' || config.mongodb.auth.length === 0) {
        throw new Error('Add auth details to config or turn on admin!');
      }

      // for each db in config (serially), create a new connection, push the db
      // to the databases array, authenticate (if necessary), and updateCollections()
      async.forEachSeries(config.mongodb.auth, function (auth, callback) {
        if (config.options.console) console.log('Connecting to ' + auth.database + '...');
        connections[auth.database] = mainConn.db(auth.database);
        databases.push(auth.database);

        if (typeof auth.username !== 'undefined' && auth.username.length !== 0) {
          connections[auth.database].authenticate(auth.username, auth.password, function (err, success) {
            if (err) {
              //TODO: handle error
              console.error(err);
            }

            if (!success) {
              console.error('Could not authenticate to database "' + auth.database + '"');
            }

            updateCollections(connections[auth.database], auth.database);
            if (config.options.console) console.log('Database ' + auth.database + ' connected');
            callback();
          });
        } else {
          updateCollections(connections[auth.database], auth.database);
          if (config.options.console) console.log('Database ' + auth.database + ' connected');
          callback();
        }
      });
    }
  });

  return {
    adminDb:            adminDb,
    collections:        collections,
    connections:        connections,
    databases:          databases,
    mainConn:           mainConn,
    updateCollections:  updateCollections,
    updateDatabases:    updateDatabases,
  };
};

module.exports = connect;
