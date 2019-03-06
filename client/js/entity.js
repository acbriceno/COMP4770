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

	self.draw=function(){
		ctx.save();
		let x = self.x - player.x;
		let y = self.y - player.y;
		x += W/2;
		y += H/2;
		x -= self.w/2;
		y -= self.h/2;
		ctx.drawImage(self.img,x,y,self.w,self.h);
		ctx.restore();
	}

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
		return testCollisionRects(rect1,rect2);
	}

	self.updatePosition=function(){}

	Entity.list[id]=self;
	
	return self;
}

Entity.list={};

Actor=function(type,id,x,y,w,h,img,hp,atkSpd,dmg,code){
	let self=Entity(type,id,x,y,w,h,img);
	self.hp=hp;
	self.hpTot=hp;
	self.atkSpd=atkSpd;
	self.aimAngle=0;
	self.spriteCnt=0;
	self.downPress=false;
	self.upPress=false;
	self.leftPress=false;
	self.rightPress=false;
	self.maxSpd=15;
	self.dmg=dmg;
	self.code=code;
	self.atkCnt=0;

	self.draw=function() {
		ctx.save();
		let x=self.x-player.x;
		let y=self.y-player.y;
		x+=W/2;
		y+=H/2;
		x-=self.w/2;
		y-=self.h/2;
		let framew=self.img.width/4;
		let frameh=self.img.height/7
		/*let aim=self.aimAngle;
		if(aim<0){
			aim=aim+360;;
		}
		console.log("aim= "+aim);
		let dir=0;
		if(aim>=90&&aim<180){
			dir=1;
		}
		console.log("dir= "+dir);
		if(dir=1){
			self.img=Img.playerGL;
		}
		else{
			self.img=Img.playerGR;
		}
		console.log(img);*/
		let cnt=Math.floor(self.spriteCnt)%4;
		ctx.drawImage(self.img,cnt*framew,6*frameh,framew,frameh,x,y,self.w,self.h);
		ctx.restore();

	}

	self.updatePosition=function() {
		if(overworld){
			if(self.rightPress)
				self.x+=self.maxSpd;
			else if(self.leftPress)
				self.x-=self.maxSpd
			else if(self.upPress)
				self.y-=self.maxSpd
			else if(self.downPress)
				self.y+=self.maxSpd
		}
	}

	let super_update=self.update;
	self.update=function(){
		super_update();
		self.atkCnt+=self.atkSpd;
		if(self.hp<=0){
			self.onDeath();
		}
	}

	self.onDeath=function(){}

	self.performAttack=function(){
		if(self.atkCnt>25){
			self.atkCnt=0;
			Projectile.generate(self);
		}
	}

	return self;

}

Enemy=function(id,x,y,w,h,img,hp,atkSpd,dmg,code){
	let self=Actor('enemy',id,x,y,w,h,img,hp,atkSpd,dmg,code);
	Enemy.list[id]=self;
	self.remove=false;

	let super_update=self.update;
	self.update=function(){
		super_update();
		self.updateAim();
		self.updateKey();
		self.performAttack();
	}

	self.updateAim=function(){}

	self.updateKey=function(){}

	let super_draw=self.draw;
	self.draw=function(){
		super_draw();

		//ctx.save();
		//logic for drawing enemies
		//ctx.restore();
	}

	self.onDeath=function(){
		self.remove=true;
	}

	return self;

}

Enemy.list={};

Enemy.update=function(){
	for(let key in Enemy.list){
		Enemy.list[key].update();
	}
	for(let key in Enemy.list){
		if(Enemy.list[key].remove){
			let rand=(Math.random())*10
			if(rand>=5){
				Upgrade.generate(Enemy.list[key])
			}
			delete Enemy.list[key];
		}
	}
}

Enemy.generate=function(x,y,code){
	let h=64;
	let w=64;
	let id=Math.random();
	let hp=10;
	let atkSpd=0.5;
	let dmg=1;
	//using player img as placeholder
	let img=Img.playerGL;
	Enemy(id,x,y,w,h,img,hp,atkSpd,dmg,code);
}

Assignment=function(id,x,y,w,h,img,hp,dmg,code){
	let self=Enemy(id,x,y,w,h,img,hp,dmg,code);
	Assignment.list[id]=self;
	self.remove=false;
}

Assignment.update=function(){
	for(let key7 in Assignment.List){
		Assignment.list[key7].update();
	}
	for(let key7 in Assignment.list){
		if(Assignment.list[key7].remove){
			player.asgScore++;
			delete Assignment.list[key7];
		}
	}
}

Assignment.list={};

Assignment.generate=function(x,y,code){
	let h=64;
	let w=64;
	let id=Math.random();
	let hp=30;
	let atkSpd=3;
	let dmg=3;
	//using player img as placeholder
	let img=Img.playerGL;
	Assignment(id,x,y,w,h,img,hp,dmg,code);
}

Midterm=function(id,x,y,w,h,img,hp,dmg,code){
	let self=Enemy(id,x,y,w,h,img,hp,dmg,code);
	Midterm.list[id]=self;
	self.remove=false;
}

Midterm.update=function(){
	for(let key8 in Midterm.List){
		Midterm.list[key8].update();
	}
	for(let key8 in Midterm.list){
		if(Midterm.list[key8].remove){
			//logic to save progress
			player.mid=true;
			delete Midterm.list[key8];
		}
	}
}

Midterm.list={};

Midterm.generate=function(x,y,code){
	let h=64;
	let w=64;
	let id=Math.random();
	let hp=50;
	let atkSpd=5;
	let dmg=7;
	//using player img as placeholder
	let img=Img.playerGL;
	Midterm(id,x,y,w,h,img,hp,dmg,code);
}

Final=function(id,x,y,w,h,img,hp,dmg,code){
	let self=Enemy(id,x,y,w,h,img,hp,dmg,code);
	Final.list[id]=self;
}

Final.update=function(){
	for(let key9 in Final.List){
		Final.list[key9].update();
	}
	for(let key9 in Final.list){
		if(Final.list[key9].remove){
			//logic to end the level
		}
	}
}

Final.list={};

Final.generate=function(x,y,code){
	let h=64;
	let w=64;
	let id=Math.random();
	let hp=100;
	let atkSpd=10;
	let dmg=15;
	//using player img as placeholder
	let img=Img.playerGL;
	Final(id,x,y,w,h,img,hp,dmg,code);
}

Player=function(x,y,weap,dir){
	let img=Img.playerGR;
	let self=Actor('p','myId',x,y,64,64,img,100,5,5,'p');
	self.maxSpd=10;
	self.lMouseClick=false;
	self.rMouseClick=false;
	self.asgScore=0;
	self.mid=false;
	self.grapplePress=false;

	let super_update=self.update;
	self.update=function(){
		super_update();
		if(self.rightPress||self.leftPress||self.upPress||self.downPress){
			self.spriteCnt+=0.2;
		}
		if(self.lMouseClick){
			self.performAttack();
		}
	}

	self.onDeath=function(){
		//logic to end level on player death
	}
	
	self.changeImg=function(){
		self
	}

	return self;
}

Player.generate=function(x,y){
	Player(x,y);
}

Projectile=function(id,x,y,spdX,spdY,w,h,hostile){
	let self=Entity('projectile',id,x,y,w,h,Img.playerGL);
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

Projectile.generate = function(actor){
	let x=actor.x;
	let y=actor.y;
	let h=20;
	let w=20;
	let id=Math.random();
	let hostile=true;
	let angle=actor.aimAngle;
	//if(aim!==undefined){
	//	angle=aim;
	//}
	//else {
	//	angle=actor.aimAngle;
	//}

	if(actor.type=='p'){
		hostile=false;
	}
	//console.log("Angle: "+angle);
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
	let smash=smash;
	let imp=imp;
	Platform.list[id]=self;
}

Platform.list={};

Platform.generate=function(x,y,code){
	imp=false;
	smash=flase;
	id=Math.random();
	type='plat';
	//player img as placeholder
	img=Img.player;
	//logic to take code and change breakable and impermiable if needed
	Platform(type,id,x,y,code,smash,imp);
}