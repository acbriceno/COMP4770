'use strict';
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017'; 
const dbName = 'CSMadnessDB';
module.exports.connectDatabase = function (){
	const client = new MongoClient(url,{useNewUrlParser: true} );
	client.connect(function(err){
		assert.equal(null, err);
		console.log("Connected Successfully to Server");
		const db = client.db(dbName);
		client.close();
	});		
}

module.exports.insertUser = function(){
    
}
