saveLevel=function(username,playername,difficulty,progress,inventory,w,h,fac,level2d){
      console.log("saveLevel gets called")
	level="";
	let x=0;
	let y=0;
	


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

	console.log(level);

	let levelData={Username: username , Difficulty : difficulty, W:w,H:h, Fac: fac, Level : level  	
		  
		      };
	
	return levelData; 
}
