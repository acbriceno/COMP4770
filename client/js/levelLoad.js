loadLevel=function(level,width){
	
	for(let key1 in Entity.list){
		let e=Entity.list[key1];
		if(e.type != "Player"){
			e.remove=true;
		}
	}
	
	
	
	console.log(Entity.list);
	let len=level.length;
	for(let i=0;i<len;i++){
		let code=level.slice(i,(i+1));
		let x=(i%width)*64
		let y=(Math.floor(i/width))*64
		if(code=='p'){
			player.x=x;
			player.y=y;
		}
		if(code=='z'){
			Enemy.generate(x,y,'phil');
		}
		if(code=='y'){
			Enemy.generate(x,y,'phy');
		}
		if(code=='x'){
			Enemy.generate(x,y,'math');
		}
		if(code=='w'){
			Enemy.generate(x,y,'cs');
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