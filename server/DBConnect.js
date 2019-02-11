const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//Connection URL 
const url = 'mongodb://localhost:27017';

//Database Name
const dbName = 'CSMadnessDB';

//Create a new Mongo Client
const client = new MongoClient(url, {useNewUrlParser: true});

//Use connect method to connect to the Server 
client.connect(function(err){
	assert.equal(null, err);
	console.log("Connected successfully to server");
	
	const db = client.db(dbName);
	
	client.close();
});	
