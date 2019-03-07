
let dbManager = require('./server/DBManager.js');
var express = require('express');
var app = express();
var serv = require('http').Server(app);
let auth = require('./server/Authentication.js');
let account = require('./server/AccountManager.js');

app.get('/',function(req,res){
  res.sendFile(__dirname + '/client/index.html')
});

app.use("/js", express.static(__dirname + '/client/js/'));

serv.listen(2000);


var io = require('socket.io')(serv,{});

io.sockets.on('connection',function(socket){
  console.log('socket connection');

    socket.on('signUp', function(message){
      account.createUser(message.username, message.password, function(status){
          socket.emit('accountCreated',{
            accountCreated: status,
          });
          console.log(status);
      });
    });

    socket.on('signIn', function(message){
      account.signIn(message.username, message.password, function(status){
        socket.emit('signedIn', {
          token: status.token,
          signedIn: status.signedIn,
      });
      });
    });

    socket.on('signOut', function(message){
      account.signOut(message.username, message.token, function(status){
        socket.emit('signedOut', {
          signedOut: status,
      });

    });
  });



});
