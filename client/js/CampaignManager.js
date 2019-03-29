function checkCampaignPlayerNameCheat(playerName){
	cheatPlayerNames = ["Bill Gates", "Mark Zuckerberg"];
	cheat = false;
	
	for(var x = 0; x< cheatPlayerNames.length; x++){
		if(cheatPlayerNames[x] == playerName){
			cheat = true;
			return true;
		}
	}
	return cheat;
}

function loadCampaignLevel(campaign){
	
	
}