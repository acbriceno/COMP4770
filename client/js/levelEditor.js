let mousePos;
let currentLevel;

MousePos = function(x, y, code) {
    let self ={x:x,
		y:y,
		code:code,
	};

	self.draw=function(){
		console.log('mousepos.draw is working');
		if(self.x>=32&&self.x<=1248&&self.y>=32&&self.y<=688){
			if(self.code=='p'){
				//console.log('player should draw');
				player.x=self.x-32;
				player.y=self.y-32;
				console.log(player.x+", "+player.y);
				player.update();

			}
			else if(self.code=='e'){
				Enemy.generate(self.x-32,self.y-32);
				Enemy.update();
			}
			else if(self.code=='f'){
				Platform.generate(self.x-32,self.y-32,self.code);
				Platform.update();
			}
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
