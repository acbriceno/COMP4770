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

Actor=function(type,id,x,y,w,h,img,hp,atkSpd,dmg,code){
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
	self.dmg=dmg;
	self.code=code;
	
	self.draw=function() {}
	
	self.updatePosition=function() {}
	
	self.onDeath=function(){}
	
	self.performAttack=function(){}
	
	return self;
	
}

Enemy=function(id,x,y,w,h,img,hp,atkSpd,dmg,code){
	let self=Actor('enemy',id,x,y,w,h,img,hp,atkSpd,dmg,code);
	Enemy.list[id]=self;
	self.remove=flase;
	
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
		if(Enemy.list[key].toRemove){
			let rand=(Math.random())*10
			if(rand>=5){
				Upgrade.generate(Enemy.list[key])
			}
			delete Enemy.list[key];
		}
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

Projectile=function(id,x,y,spdX,spdY,w,h,hostile){
	let self=Entity('projectile',id,x,y,w,h,Img.projectile);
	self.timer=0;
	self.hostile=hostile;
	self.spdX=spdX;
	self.spdY=spdY;
	self.remove=false;
	
	let super_update=self.update;
	self.update=function(){
		super_update();
		self.timer++;
		self.remove=false;
		if(self.timer>80)
			self.remove=true;
		if(self.hostile==false){
			for(let key2 in Enemy.list){
				if(self.testCollision(Enemy.list[key2])){
					self.remove=true;
					Enemy.list[key2].hp-=1;
				}
			}
		}
		else if(self.hstile==true){
			if(self.testCollision(player)){
				self.remove=true;
				player.hp-=0;
			}
		}
		for(let key3 in Platform.list){
			if(self.testCollision(Platform.list[key3])){
				if(Platform.list[key2].imp){
					self.remove=true;
				}
			}
		}
	}
	
	self.updatePosition=function(){
		self.x+=self.spdX;
		self.y+=self.spdY;
	}
	
	Projectile.list[id]=self;
}

Projectile.list={};

Projectile.update=function(){
	for(let key4 in Projectile.list){
		let p = Projectile.list[key4];
		p.update();
		if(p.remove){
			delete Projectile.list[key4];
		}
	}
}

Projectile.generate = function(actor,aim){
	let x=actor.x;
	let y=actor.y;
	let h=20;
	let w=40;
	let id=Math.random();
	let hostile=true;
	let angle;
	if(aim!==undefined){
		angle=aim;
	}
	else {
		angle=actor.aimAngle;
	}
	
	if(actor.type!==p){
		hostile=false;
	}
	
	let spdX=Math.cos(angle/180*Math.PI)*5;
	let spdY=Math.sin(angle/180*Math.PI)*5;
	Projectile(id,x,y,spdX,spdY,w,h,hostile);
}

Upgrade=function(id,x,y,w,h,cat,img){
		let self=Entity('upgrade',id,x,w,img);
		self.cat=cat;
		Upgrade.list[id]=self;
}

Upgrade.list={}

Upgrade.update=function(){
	for(var key5 in Upgrade.list){
		Upgrade,list[key5].update();
		let collision=player.testCollision(Upgrade.list[key5]);
		if(collision){
			//add information fro what happens based on what kind of upgrade
			delete Upgrade.list[key5];
		}
	}
}

Upgrade.generate=function(enemy){
	let x=enemy.x;
	let y=enemy.y;
	let h=32;
	let w=32;
	let id=Math.random();
	//ad logic for choosing the type of upgrade
	let cat;
	let img;
	
	Upgrade(id,x,y,cat,img)
	
}

Platform=function(type,id,x,y,img,code,smash,imp){
	let self=Entity(type,id,x,y,64,64,img);
	let code=code;
	lef smash=smash;
	let imp=imp;
	Platform.list[id]=self;
}

Platform.list={};