saveLevel=function(username,playername,difficulty,progress,inventory,w,h,fac,level2d){
	var level;
	let x=0;
	let y=0;
	let levelString="eeep";


	for(let i=0;i<w*h;i++){
		let code="0";
		for(let key in Entity.list){
			if(Entity.list[key].x==x&&Entity.list[key].y==y){
				code=Entity.list[key].code;
				console.log("code : " + code);
			}
		}
		level+=code;
		if(x<w){
			x+=64;
		}
		else{
			x=0;
			y+=64;
		}
	}


	let updatedLevelString=username + "," + playername + "," + difficulty + "," + progress + "," + inventory  +  "," + levelString;

	console.log(updatedLevelString);
	console.log("save Level LevelSave.js hit");
      console.log(level)
	return updatedLevelString;                           //return level string here
	//logic to pass to the database
}
