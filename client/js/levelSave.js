saveLevel=function(w,h,fac,level2d){
	let level;
	let x=0;
	let y=0;
	let s="hello";

	for(let i=0;i<w*h;i++){
		let code=0;
		for(let key in Entity.list){
			if(Entity.list[key].x==x&&Entity.list[key].y==y){
				code=Entity.list[key].code;
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

	console.log("save Level LevelSave.js hit");
	return s;
	//logic to pass to the database
}
