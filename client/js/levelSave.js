saveLevel=function(username,levelname,difficulty,w,h){
      console.log("saveLevel gets called")
	level="";
	let x=0;
	let y=0;
	
	let fac=FAC;

	console.log(fac)
	for(let i=0;i<(w+1)*(h+1);i++){
		let code="0";
		console.log("x: "+x+", y: "+y);
		for(let key in Entity.list){
			if(Entity.list[key].x==x&&Entity.list[key].y==y){
				code=Entity.list[key].code;
				console.log("code : " + code);
			}
		}
		level+=code;
		if(x<w*64){
			x+=64;
		}
		else{
			x=0;
			y+=64;
		}
	}
	
	if(fac == 'math'){
		level += 'w';
	}
	else if(fac == 'phil'){
		level += 'x';
	}
	else if(fac == 'phys'){
		level += 'y';
	}
	else if(fac == 'comp'){
		level += 'z';
	}

	console.log("level="+level);

	let levelData={Username: username , Levelname : levelname , Difficulty : difficulty, W:w,H:h, Level : level  	
		  
		      };
	
	return levelData; 
}

saveLevelLE=function(w,h){
      console.log("saveLevel gets called")
	level="";
	let x=0;
	let y=0;
	
	let fac=FAC;

	console.log(fac)
	for(let i=0;i<(w+1)*(h+1);i++){
		let code="0";
		console.log("x: "+x+", y: "+y);
		for(let key in Entity.list){
			if(Entity.list[key].x==x&&Entity.list[key].y==y){
				code=Entity.list[key].code;
				console.log("code : " + code);
			}
		}
		level+=code;
		if(x<w*64){
			x+=64;
		}
		else{
			x=0;
			y+=64;
		}
	}
	
	if(fac == 'math'){
		level += 'w';
	}
	else if(fac == 'phil'){
		level += 'x';
	}
	else if(fac == 'phys'){
		level += 'y';
	}
	else if(fac == 'comp'){
		level += 'z';
	}

	console.log("level="+level);

	levelSTR=level;
	levelW=w;
}
