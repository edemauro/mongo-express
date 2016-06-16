var mockData = (function() {
  return {
    getMockDatabase: getMockDatabase,
    getMockCollection: getMockCollection
  };

  function getMockDatabase() {
    return {
      "baseHref": "/",
      "databases": ["local", "sails", "test", "test_database"],
      "collections": {
        "db": [],
        "local": ["rest", "startup_log", "system.indexes", "test"],
        "sails": ["coverletter", "job", "system.indexes", "user", "users"],
        "test": ["fs.chunks", "fs.files", "system.indexes"],
        "test_database": ["coverletter", "job", "profilepic", "resume", "system.indexes", "user"]
      },
      "gridFSBuckets": {
        "db": [],
        "local": [],
        "sails": [],
        "test": ["fs"],
        "test_database": []
      },
      "readOnly": false,
      "dbName": "local",
      "ctx": {
        "title": "Viewing Database: local",
        "databases": ["local", "sails", "test", "test_database"],
        "colls": ["rest", "startup_log", "system.indexes", "test"],
        "grids": [],
        "stats": {
          "avgObjSize": "1.09 KB",
          "collections": 5,
          "dataFileVersion": "4.22",
          "dataSize": "94.8 KB",
          "extentFreeListNum": 3,
          "fileSize": "67.1 MB",
          "indexes": 3,
          "indexSize": "24.5 KB",
          "numExtents": "5",
          "objects": 87,
          "storageSize": "10.5 MB"
        }
      }
    }
  }

  function getMockCollection() {
    return {
       "baseHref":"/",
       "databases":[
          "local",
          "sails",
          "test",
          "test_database"
       ],
       "collections":[
          "coverletter",
          "job",
          "system.indexes",
          "user",
          "users"
       ],
       "gridFSBuckets":[
          [

          ],
          [

          ],
          [

          ],
          [

          ],
          [

          ]
       ],
       "readOnly":false,
       "dbName":"sails",
       "collectionName":"job",
       "ctx":{
          "title":"Viewing Collection: job",
          "documents":[
             "{\n    \"_id\": ObjectID(\"572805e454de6bfa0841a1c5\"),\n    \"name\": \"Pizza hut\",\n    \"position\": \"Cook\",\n    \"dateApplied\": ISODate(\"2015-11-12T00:00:00.000Z\"),\n    \"interviewDate\": ISODate(\"2016-05-03T13:30:00.000Z\"),\n    \"contact\": \"Ronald\",\n    \"phone\": \"824-231-2314\",\n    \"email\": \"pizza@hut.com\",\n    \"linkedIn\": \"PizzaMcHut\",\n    \"applied\": true,\n    \"notes\": \"Applied\",\n    \"address\": \"17028 Devonshire St., Northridge, CA 91325\",\n    \"owner\": ObjectID(\"572804982e7a5db008b26525\"),\n    \"createdAt\": ISODate(\"2016-05-03T01:59:00.531Z\"),\n    \"updatedAt\": ISODate(\"2016-05-03T01:59:00.531Z\")\n}",
             "{\n    \"_id\": ObjectID(\"572808bcdacc4b2c0b801df7\"),\n    \"name\": \"CSUN\",\n    \"position\": \"Professor\",\n    \"dateApplied\": ISODate(\"2015-11-11T00:00:00.000Z\"),\n    \"interviewDate\": ISODate(\"2016-05-02T19:20:00.000Z\"),\n    \"contact\": \"Chris\",\n    \"phone\": \"818-636-3123\",\n    \"email\": \"chris@csun.edu\",\n    \"linkedIn\": \"CHRIS\",\n    \"applied\": true,\n    \"notes\": \"He is crayyyyyy.\",\n    \"address\": \"6705 Hollywood Blvd, Los Angeles, CA 90028\",\n    \"owner\": ObjectID(\"572804982e7a5db008b26525\"),\n    \"createdAt\": ISODate(\"2016-05-03T02:11:08.404Z\"),\n    \"updatedAt\": ISODate(\"2016-05-03T02:11:08.404Z\")\n}",
             "{\n    \"_id\": ObjectID(\"57280c93a91a8a3b0d8055de\"),\n    \"name\": \"a\",\n    \"position\": \"b\",\n    \"dateApplied\": ISODate(\"4444-04-04T00:00:00.000Z\"),\n    \"interviewDate\": ISODate(\"2016-05-02T19:30:00.000Z\"),\n    \"contact\": \"bob\",\n    \"phone\": \"55555555\",\n    \"email\": \"christufenkjian@gmail.com\",\n    \"linkedIn\": \"ggdgfg\",\n    \"applied\": true,\n    \"notes\": \"\",\n    \"address\": \"\",\n    \"owner\": ObjectID(\"572804982e7a5db008b26525\"),\n    \"createdAt\": ISODate(\"2016-05-03T02:27:31.301Z\"),\n    \"updatedAt\": ISODate(\"2016-05-03T02:27:31.301Z\")\n}"
          ],
          "docs":[
             {
                "_id":"572805e454de6bfa0841a1c5",
                "name":"Pizza hut",
                "position":"Cook",
                "dateApplied":"2015-11-12T00:00:00.000Z",
                "interviewDate":"2016-05-03T13:30:00.000Z",
                "contact":"Ronald",
                "phone":"824-231-2314",
                "email":"pizza@hut.com",
                "linkedIn":"PizzaMcHut",
                "applied":true,
                "notes":"Applied",
                "address":"17028 Devonshire St., Northridge, CA 91325",
                "owner":"572804982e7a5db008b26525",
                "createdAt":"2016-05-03T01:59:00.531Z",
                "updatedAt":"2016-05-03T01:59:00.531Z"
             },
             {
                "_id":"572808bcdacc4b2c0b801df7",
                "name":"CSUN",
                "position":"Professor",
                "dateApplied":"2015-11-11T00:00:00.000Z",
                "interviewDate":"2016-05-02T19:20:00.000Z",
                "contact":"Chris",
                "phone":"818-636-3123",
                "email":"chris@csun.edu",
                "linkedIn":"CHRIS",
                "applied":true,
                "notes":"He is crayyyyyy.",
                "address":"6705 Hollywood Blvd, Los Angeles, CA 90028",
                "owner":"572804982e7a5db008b26525",
                "createdAt":"2016-05-03T02:11:08.404Z",
                "updatedAt":"2016-05-03T02:11:08.404Z"
             },
             {
                "_id":"57280c93a91a8a3b0d8055de",
                "name":"a",
                "position":"b",
                "dateApplied":"4444-04-04T00:00:00.000Z",
                "interviewDate":"2016-05-02T19:30:00.000Z",
                "contact":"bob",
                "phone":"55555555",
                "email":"christufenkjian@gmail.com",
                "linkedIn":"ggdgfg",
                "applied":true,
                "notes":"",
                "address":"",
                "owner":"572804982e7a5db008b26525",
                "createdAt":"2016-05-03T02:27:31.301Z",
                "updatedAt":"2016-05-03T02:27:31.301Z"
             }
          ],
          "columns":[
             "_id",
             "name",
             "position",
             "dateApplied",
             "interviewDate",
             "contact",
             "phone",
             "email",
             "linkedIn",
             "applied",
             "notes",
             "address",
             "owner",
             "createdAt",
             "updatedAt"
          ],
          "stats":{
             "ns":"sails.job",
             "count":3,
             "size":1488,
             "avgObjSize":496,
             "numExtents":1,
             "storageSize":8192,
             "lastExtentSize":8192,
             "paddingFactor":1,
             "paddingFactorNote":"paddingFactor is unused and unmaintained in 3.0. It remains hard coded to 1.0 for compatibility only.",
             "userFlags":1,
             "capped":false,
             "nindexes":1,
             "indexDetails":{

             },
             "totalIndexSize":8176,
             "indexSizes":{
                "_id_":8176
             },
             "ok":1
          }
       }
    }
  };
})();