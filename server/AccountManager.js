'use strict';

var auth = require('./Authentication.js');
var dbManager = require('./DBManager.js');

module.exports.createUser = function(username, password, callback){

    auth.isUsernameTaken(username, function(taken){
        let accountStatus = false;
        if(taken){
            console.log("Username taken");
            return callback(accountStatus);
        }
        else{
            let encrypted = auth.encryptPassword(password);
            let userAccount = {
                username: username,
                salt: encrypted.salt,
                hash: encrypted.passwordHash,
                };  
            dbManager.insertUser(userAccount);
            accountStatus = true;
            return callback(accountStatus);
        }
    });
}

module.exports.signIn = function(username, password, callback){
    auth.authenticateUser(username, password, function(authenticated){
        let status = {
            signedIn : false,
            token : "",
        }
        if(authenticated){
           status.token = auth.generateToken();
           dbManager.insertToken(username, status.token);
           status.signedIn = true;
           return callback(status);
        }
        return callback(status);
      });
}

module.exports.signOut = function(username, token, callback){
    auth.authenticateWithToken(username, token, function(status){
        if(status){
            dbManager.removeToken(username);
            return callback(status);
        }
        return callback(status);
    });

}
