var express = require('express')
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req,res){
  res.sendFile(__dirname + '/client/index.html')
});

serv.listen(2000);

var io = require('socket.io')(serv,{});
io.sockets.on('connection',function(socket){
  console.log('socket connection');
});
