'use strict';
let dbManager = require('./DBManager.js');

module.exports.createCampaign = function(user, info, callback){
	dbManager.findAllSystemCourseLevels(function(levels){
		let campaign = generateCampaign(info.difficulty);
		//console.log(campaign);
		//console.log(info.difficulty);	
		let date = Date();
		//console.log(levels);
		let courses = [];
		for (var x=0; x<levels.length; x++){
			if((levels[x].Levelname == "PHYS1000") || (levels[x].Levelname == "PHIL1000") || (levels[x].Levelname == "MATH1000") || (levels[x].Levelname == "COMP1000"))
			{
				courses[x] = levels[x];
				courses[x].midterm = false;
				courses[x].midtermTime = 0;
				courses[x].complete = false;
				courses[x].grade = 0;
				courses[x].bestTime = 0;
				
			}
		}

		console.log(courses);
		let inventory = [];
		let saveFiles = {
			saves: [
			{
				playerName: info.playerName,
				saveNumber : 1,
				saveDate : date,
				money : campaign.money, 
				gammaHP : campaign.gammaHP,
				dadCredit : campaign.dadCredit,
				workCredit : campaign.workCredit,
				Courses : courses,
				inventory: inventory, 
			}
			]
		};
		let campaignSet = [
					{	campaignNumber : 1,
						playerName: info.playerName,
						difficulty: info.difficulty,
						SaveFile: saveFiles,

					}
				];
	
		dbManager.findUserCampaigns(user, function(campaigns){
			if(campaigns == null){
				dbManager.createCampaign(user, campaignSet);
				return callback(campaignSet[0]);
			}else{
				let newCampaign = {
					campaignNumber : campaigns.length + 1,
					playerName: info.playerName,
					difficulty: info.difficulty,
					SaveFile: saveFiles,
				};
				campaigns.push(newCampaign);
				dbManager.updateCampaigns(user, campaigns);
				return callback(newCampaign);
			}
		
		});
				
		//
	});
	
}

var generateCampaign = function(difficulty){
    let campaign = {
  	 	money : 200,
  	 	gammaHP : 0, 
		dadCredit : 5000,
		workCredit : 0,
    };

	if(difficulty == 0){
		campaign["money"] = 1000;
		campaign["gammaHP"] = 0;
		campaign["dadCredit"] = 5000;
		campaign["workCredit"] = 0;
		console.log("test");
	}
	if(difficulty == 1){
		campaign["money"] = 500;
		campaign["gammaHP"] = 0;
		campaign["dadCredit"] = 3000;
		campaign["workCredit"] = 0;
	}
	if(difficulty == 2){
		campaign["money"] = 200;
		campaign["gammaHP"] = 0;
		campaign["dadCredit"] = 1000;
		campaign["workCredit"] = 0;
	}
	if(difficulty == 3){
		campaign["money"] = 100000;
		campaign["gammaHP"] = 0;
		campaign["dadCredit"] = 5000000;
		campaign["workCredit"] = 0;
	}
	
	return campaign;
}

module.exports.loadSystemCourseLevel = function(courseName, callback){
	dbManager.findSystemCourseLevel(courseName, function(courseLevel){
		return  callback(courseLevel);
	});
}

module.exports.insertSystemCourseLevel = function(courseLevel, callback){
	dbManager.insertSystemCourseLevel(courseLevel, function(status){
		return callback(status);
	});
}

module.exports.getUserCampaign = function(username, campaignNumber, callback){
	dbManager.findUserCampaign(username, campaignNumber, function(campaign){
		return callback(campaign);
	});
}

module.exports.saveCurrentGame = function(username, campaignNumber, saveNumber, save){
	dbManager.findUserCampaigns(username, function(campaigns){
		if(campaigns == null){
			
			
		}else{

			campaigns[campaignNumber -1].SaveFile.saves[saveNumber -1] = save;
			dbManager.updateCampaigns(username, campaigns);
			
		}
		
	});
}

module.exports.saveNewSave = function(username, campaignNumber, save){
	dbManager.findUserCampaigns(username, function(campaigns){
		if(campaigns == null){
			
			
		}else{

			campaigns[campaignNumber -1].SaveFile.saves.push(save);
			dbManager.updateCampaigns(username, campaigns);
			
		}
		
	});
}

module.exports.getCampaignLevel = function(levelName, callback){
	dbManager.findSystemCourseLevel(levelName, function(courseLevel){
		console.log(courseLevel);
		return callback(courseLevel);
	});
}


module.exports.getUserCampaigns = function (token, callback){
	dbManager.findUserCampaignsWithToken(token, function(campaigns){
		return callback(campaigns);
		
	});
}

module.exports.getUserCampaignSaves = function(token, campaignNumber, callback){
	dbManager.findUserCampaignWithToken(token, campaignNumber, function(campaign){
		return callback(campaign.SaveFile.saves);
	});
}

module.exports.addCourseLevelToUserCampaign = function(username, campaignNumber, courseName){
	
}
