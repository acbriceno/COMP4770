loadLevel=function(level,width){

	Entity.clear();
      console.log("Load level called");

	width++;

	console.log(Entity.list);
	let len=level.length;
	let facCode=level.slice((len-1),len);
	if(facCode == 'w'){
		FAC = 'math';
	}
	else if(facCode == 'x'){
		FAC = 'phil';
	}
	else if(facCode == 'y'){
		FAC = 'phys';
	}
	else if(facCode == 'z'){
		FAC = 'comp';
	}
	for(let i=0;i<(len-1);i++){
		let code=level.slice(i,(i+1));
		let x=(i%width)*64
		let y=(Math.floor(i/width))*64
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
		if(y>deathY){
			deathY=y;
		}
	}

	console.log(facCode)

}
