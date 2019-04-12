
let dbManager = require('./server/DBManager.js');
let dbLevelManager = require('./server/DBLevelManager.js');
var express = require('express');
var app = express();
var serv = require('http').Server(app);
let auth = require('./server/Authentication.js');
let account = require('./server/AccountManager.js');
let game = require('./server/GameManager.js');

app.get('/',function(req,res){
  res.sendFile(__dirname + '/client/index.html')
});

app.use("/js", express.static(__dirname + '/client/js/'));
app.use("/img", express.static(__dirname + '/client/img/'));
app.use("/css", express.static(__dirname + '/client/css/'));
app.use("/music", express.static(__dirname + '/client/music/'));

serv.listen(2000);


var io = require('socket.io')(serv,{});

io.sockets.on('connection',function(socket){
  console.log('socket connection');

    socket.on('signUp', function(message){
      account.createUser(message.username, message.password, function(status){
          socket.emit('accountCreated',{
            accountCreated: status.accountCreated,
            usernameStatus: status.usernameStatus,
          });
		  //sconsole.log(message);
          console.log(status);
      });
    });

    socket.on('signIn', function(message){
      account.signIn(message.username, message.password, function(status){
        socket.emit('signedIn', {
          userName : message.username,
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
	
	
socket.on('getLevels', function(message){
      console.log("get Levels hit"); 
	dbLevelManager.findAllLevels(function(level){
		console.log("all levels" + level);
        	socket.emit('getLevelsFound',{
			Levels : level
          	});
	});
  });
	
  socket.on('getUserLevels', function(message){
        console.log("get User Levels hit");
  	dbLevelManager.findUserLevels(message.username, function(levels){
  		console.log( levels);
          	socket.emit('userLevelsFound',{
  			Levels : levels
            	});
  	});
    });
  socket.on('saveLevel', function(message){
	  if(message.username == 'system'){
		  dbManager.insertSystemCourseLevel(message.levels);
	  }
	  else{
	  	    dbLevelManager.insertLevel(message.levels);
	  }
  

      console.log("save level server hit")
  });
  
  
  socket.on('loadLevel', function(message){
	console.log(message);
	dbLevelManager.findLevel(message.username,message.levels, function(level){
		console.log(level);
          	socket.emit('levelfound',{
		Username : level.Username , Levelname : level.Levelname , Diffuculty : 	level.Difficulty, Width : level.W, Height : level.H, Faculty: level.Fac, 			Level:level.Level,
          	});

      console.log("load level server hit")
  });
});
	
	socket.on('loadSystemCourseLevel', function(message){
		dbManager.findSystemCourseLevel(message.courseName, function(courseLevel){
			console.log(courseLevel);
			socket.emit('systemCourseLevelFound',{
				courseLevel : courseLevel
			})
		});
	});
	
	
	socket.on('loadAllSystemCourses', function(message){
		dbManager.findAllSystemCourseLevels(function(Levels){
			socket.emit('systemLevelsFound',{
				Levels : Levels
			})
		});
	});
	
	
	
	
  socket.on('createCampaign', function(message){
	  console.log(message);
      game.createCampaign(message.username, message.info, function(campaign){
          socket.emit('campaignCreated',{
			  campaign : campaign
          });
          console.log(campaign);
      });
    });
	
	socket.on('getCampaign', function(message){
		game.getUserCampaign(message.username, message.campaignNumber, function(campaign){
			socket.emit('campaign', {
				campaign : campaign
			});
		});
	});
	
	socket.on('saveCurrentGame', function(message){
		game.saveCurrentGame(message.username, message.campaignNumber, message.save.saveNumber, message.save);
	});
	
	
	socket.on('saveNewSave', function(message){
		game.saveNewSave(message.username, message.campaignNumber, message.save);
	});
	
	socket.on('getUserCampaigns', function (message){
		game.getUserCampaigns(message.token, function(campaigns){
			console.log(campaigns);
			socket.emit('loadUserCampaigns',{
				campaigns : campaigns
			});
		});
	});
	
	socket.on('getUserCampaignSaves', function(message) {
			game.getUserCampaignSaves(message.token, message.campaignNumber, function(saves){
				socket.emit('loadUserCampaignSaves', {
					saves : saves
				});
			});
	});
	
	
		
  });
