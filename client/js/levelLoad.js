loadLevel=function(level,width){
	let len=level.length;
	for(let i=0;i<len;i++){
		let code=level.slice(i,(i+1));
		let x=(i%width)*32
		let y=(Math.floor(i/width))*32
		if(code=='p'){
			player.x=x;
			player.y=y;
		}
		if(code=='e'){
			Enemy.generate(x,y);
		}
		if(code=='f'||code=='b'){
			Platform.generate(x,y,code);
		}
		if(code=='a'){
			Assignment.generate(x,y);
		}
		if(code=='m'){
			Midterm.generate(x,y);
		}
		if(code=='l'){
			Final.generate(x,y);
		}
	}
}