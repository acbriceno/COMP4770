let mousePos;
let currentLevel;

MousePos = function(x, y, code) {
    let self ={x:x,
		y:y,
		code:code,
	};

	self.draw=function(){
		console.log('mousepos.draw is working');
            console.log(self.x + ", " + self.y + ", " + self.code);
		if(self.code='p'){
			// player.x=self.x;
			// player.y=self.y;
			// player.update();
                  ctxLE.fillRect(self.x, self.y, 20, 20);

		}
		else if(self.code='e'){
			Enemy.generate(self.x,self.y);
			Enemy.update();
		}
		else if(self.code='f'){
			Platform.generate(self.x,self.y,self.code);
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
