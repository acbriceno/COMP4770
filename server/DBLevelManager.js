'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'CSMadnessDB';

module.exports.connectDatabase = function (){
	const client = new MongoClient(url,{useNewUrlParser: true} );
	client.connect(function(err){
		assert.equal(null, err);
		console.log("Connected Successfully to Database");
		const db = client.db(dbName);
		client.close();
	});
}

module.exports.insertLevel = function(level){
const client = new MongoClient(url,{useNewUrlParser: true} );
client.connect(function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to Database");
	console.log("insert level");
  const db = client.db(dbName);

  // Insert a single document
  db.collection('Level').insertOne({ levels:level}, function(err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);
    console.log("Inserted user to database ");

  });
});
}
