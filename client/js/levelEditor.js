let mousePos;
let currentLevel;
let moveScreen;

MousePos = function(x,y,xoff,yoff,code) {
    let self ={x:x,
		y:y,
		xoff:xoff,
		yoff:yoff,
		code:code,
	};



	self.draw=function(){
		let x=self.x+(self.xoff*64);
		let y=self.y+(self.yoff*64);
		x=(Math.floor(x/64))*64;
		y=(Math.floor(y/64))*64;
		console.log('mousepos.draw is working');
        console.log(x + "," + y);

		for(let key1 in Entity.list){
			let e=Entity.list[key1];
			if(e.x==x&e.y==y){
				e.remove=true;
			}
		}
			
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
		else if(self.code=='f'||self.code=='b'){
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
			for(let key in Entity.list){
				let e=Entity.list[key];
				if(e.x==x&&e.y==y){
					e.remove=true;
				}
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
