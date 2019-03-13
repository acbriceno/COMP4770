let mousePos;
let currentLevel;

<<<<<<< HEAD
MousePos = function(x, y) {
      let self ={x:x, y:y};

      self.getCoord = function() {
            return(self.x, self.y)
      }
=======
MousePos = function(x, y, code) {
    let self ={x:x, 
		y:y, 
		code:code,
	};
	
	self.draw=function(){
		console.log('mousepos.draw is working');
		if(self.code='p'){
			player.x=self.x;
			player.y=self.y;
			
			player.update();
			
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
>>>>>>> 95cf9af59c8136c5bd0b7cc90f1c6b21bed1cabc
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

