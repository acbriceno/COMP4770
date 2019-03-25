let mousePos;
let currentLevel;
let moveScreen;

MousePos = function(x, y, code) {
    let self ={x:x,
		y:y,
		code:code,
	};



	self.draw=function(){
		let x=(Math.floor(self.x/64))*64;
		let y=(Math.floor(self.y/64))*64;
		console.log('mousepos.draw is working');
            console.log(x + "," + y);

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
		else if(self.code=='a'){
			Assignment.generate(x,y);
			Assignment.update();
		}
		else if(self.code=='l'){
			Final.generate(x,y);
			Final.update();
		}
		else if(self.code=='m'){
			Midterm.generate(x,y);
			Midterm.update();
		}
		else if(self.code=='d'){
			for(let key in Enemy.list){
				if(Enemy.list[key].x==x&&Enemy.list[key].y==y){
					Entity.list[key].remove=true;
				}
                        console.log("key:" + key)
			}
			for(let key1 in Platform.list){
				if(Platform.list[key1].x==x&&Platform.list[key1].y==y){
					Platform.list[key1].remove=true;
				}
                        console.log("key:" + key)
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

MoveScreen=function(right,down){
	let self={
		right:right,
		down:down,
	};

	return self;
}
