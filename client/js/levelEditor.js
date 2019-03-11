let mousePos;
let currentLevel;

MousePos = function(x, y, code) {
    let self ={x:x, 
		y:y, 
		code:code,
	};
	
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