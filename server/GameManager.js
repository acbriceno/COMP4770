'use strict';
let dbManager = require('./DBManager.js');

module.exports.createCampaign = function(user, info, callback){
	
	let campaign = generateCampaign(info.difficulty);
	console.log(campaign);
	console.log(info.difficulty);	
	let courses = [];
	let inventory = [];
	let saveFiles = {
		saves: [
		{
			playerName: info.playerName,
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
			dbManager.addCampaigns(user, campaigns);
			return callback(newCampaign);
		}
		
	});
				
	//
}

var generateCampaign = function(difficulty){
    let campaign = {
  	 	money : 200,
  	 	gammaHP : 0, 
		dadCredit : 5000,
		workCredit : 0,
    };
	
	switch (difficulty) {
	//easy
	case 0:
		campaign["money"] = 1000;
		campaign["gammaHP"] = 0,
		campaign["dadCredit"] = 5000;
		campaign["workCredit"] = 0;
		return campaign;
		break;
	//medium
	case 1:
		campaign["money"] = 500;
		campaign["gammaHP"] = 0,
		campaign["dadCredit"] = 3000;
		campaign["workCredit"] = 0;
		return campaign;
		break;
	//hard
	case 2:
		campaign["money"] = 0;
		campaign["gammaHP"] = 0,
		campaign["dadCredit"] = 1000;
		campaign["workCredit"] = 0;
		return campaign;
		break;
	//cheats
	case 4:
		campaign["money"] = 100000;
		campaign["gammaHP"] = 0,
		campaign["dadCredit"] = 5000000;
		campaign["workCredit"] = 0;
		return campaign;
		break;
	}
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

