let player;

Entity=function(type,id,x,y,w,h,img){
	let self={
		type:type,
		id:id,
		x:x,
		y:y,
		w:w,
		h:h,
		img:img,
	};
	
	self.update=function(){
		self.updatePosition();
		self.draw();
	}
	
	self.draw=function(){}
	
	self.getDistance=function(entity2){
		let delx=self.x-entity2.x;
		let dely=self.y-entity2.y;
		return Math.sqrt(delx*delx+dely*dely);
	}
	
	self.testCollision=function(entity2){
		let rect1={
			x:self.x-self.w/2,
			y:self.y-self.h/2,
			width:self.w,
			height:self.h,
		}
		let rect2={
			x:entity2.x-entity2.w/2,
			y:entity2.y-entity2.h/2,
			width:entity2.w,
			height:entity2.h,
		}
		
	}
	
	self.updatePosition=function(){}
	
	return self;
}

Actor=function(type,id,x,y,w,h,img,hp,atkSpd){
	let self=Entity(type,id,x,y,w,h,img);
	self.hp=hp;
	self.atkSpd=atkSpd;
	self.aimAngle=0;
	self.spriteCnt=0;
	self.downPress=false;
	self.upPress=false;
	self.leftPress=false;
	self.rightPress=false;
	self.maxSpd=0;
	
	self.draw=function() {}
	
	self.updatePosition=function() {}
	
	self.onDeath=function(){}
	
	self.performAttack=function(){}
	
	return self;
	
}

Enemy=function(type,id,x,y,w,h,img,hp,atkSpd){
	let self=Actor('e',id,x,y,w,h,img,hp,atkSpd);
	Enemy.list[id]=self;
	self.toRemove=flase;
	
	let super_update=self.update;
	self.update=function(){
		super_update();
		self.updateAim();
		self.updateKeypress();
		self.performAttack();
	}
	
	self.updateAim=function(){}
	
	self.updateKey=function(){}
	
	let super_draw=self.draw;
	self.draw=function(){}
	
	self.onDeath=function(){
		self.toRemove=true;
	}
	
	return self;
	
}

Enemy.list={};

Enemy.update=function(){
	for(let key in Enemy.list){
		Enemy.list[key].update();
	}
	for(let key in Enemy.list){
		if(Enemy.list[key].toRemove)
			delete Enemy.list[key];
	}
}

Player=function(){
	let self=Actor('p','myId',50,40,50*1.5,70*1.5,Img.player,10,1);
	self.maxSpd=10;
	self.lMouseClick=false;
	self.rMouseClick=false;
	
	let super_update=self.update;
	self.update=function(){
		super_update();
	}
	
	self.onDeath=function(){}
	
	return self;
}

Bullet=function(id,x,y,spdX,spdY,w,h,hostile){
	let self=Entity('b',)
}