let mousePos;
let currentLevel;

MousePos = function(x, y, code) {
    let self ={x:x,
		y:y,
		code:code,
	};

	
	
	self.draw=function(){
		let x=(Math.floor(self.x/64))*64;
		let y=(Math.floor(self.y/64))*64;
		console.log('mousepos.draw is working');
		
		if(self.code=='p'){
			console.log('player should draw');
			player.x=x;
			player.y=y;
			console.log(player.x+", "+player.y);
			player.update();

		}
		else if(self.code=='e'){
			Enemy.generate(x,y);
			Enemy.update();
		}
		else if(self.code=='f'){
			Platform.generate(x,y,self.code);
			Platform.update();
		}
	}

	return self;
}

CurrentLevel=function(){
	let self={
		w:20,
		h:11,
		fac:'cs',
		//level:level[][],
	};
	//logic to send level data to to levelSave.js
	self.save=function(){

	}

}
