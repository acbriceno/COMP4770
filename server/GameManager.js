'use strict';
var dbManager = require('./DBManager.js');

module.exports.createCampaign = function(user, campaign callback){
	var courses = [];
	var inventory = [];
	var saveFiles = {
		saves: [
		{
			playerName: campaign.playerName,
			money : campaign.money, 
			gammaHP : campaign.gammaHP,
			dadCredit : campaign.dadCredit,
			workCredit : campaign.workCredit,
			Courses : courses,
			inventory: inventory, 
		}
		]
	};
	var campaignSet = {
			campaigns:[
				{
					playerName: campaign.playerName,
					SaveFile: saveFiles,
					difficulty: campaign.difficulty,
				}
			]};
			
			
	dbManager.createCampaign(user, campaignSet, function(status){
		return calback(status);
	});
}


module.exports.loadCourseLevel = function(courseName, callback){

}

module.exports.insertSystemCourseLevel = function(courseLevel, callback){
	dbManager.insertSystemCourseLevel(courseLevel, function(status){
		return callback(status);
	});
}
