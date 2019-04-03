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
		if(screen=='game'){
			//console.log('hi');
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
		else if(screen=='le'){
			//console.log('good so far');
			ctxLE.save();
			let x = self.x;
			let y = self.y;
			x+=mousePos.xoff*64;
			y+=mousePos.yoff*64;
			ctxLE.drawImage(self.img,x,y,self.w,self.h);
			ctxLE.restore();
		}
            else if (screen=='overworld'){
                  ctx.save();
                  let x = self.x;
                  let y = self.y;
                  ctx.drawImage(self.img, x, y, self.w, self.h);
                  ctx.restore();
            }
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

	self.testCollisionBB=function(rect,entity){
		let rect2={
			x:entity.x-entity.w/2,
			y:entity.y-entity.h/2,
			width:entity.w,
			height:entity.h,
		}
		return testCollisionRects(rect,rect2);
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
	self.maxSpd=2;
	self.dmg=dmg;
	self.code=code;
	self.atkCnt=0;
	self.weap=1;
	self.xSpd=0;
	self.ySpd=0;

	/*self.draw=function() {
		if(screen=='game'){
			ctx.save();
		}
		else if(screen=='le'){
			ctxLE.save();
		}
		let x=self.x-player.x;
		let y=self.y-player.y;
		x+=W/2;
		y+=H/2;
		x-=self.w/2;
		y-=self.h/2;


		let framew=self.img.width/4;
		let frameh=self.img.height/28;
		//console.log('can i find');
		/*if(self.type='p'){
			frameh=frameh/2
		}*//*
		let aim=self.aimAngle;
		if(aim<0){
			aim=aim+360;;
		}
		let dir=0;
		if(aim>=90&&aim<270){
			dir=1;
		}
		//console.log(img);
		let cnt=Math.floor(self.spriteCnt)%4;
		if(self.weap==0){
			if(dir==0){
				dir=6;
			}
			else{
				dir=13;
			}
		}
		else{
			if(dir==0){
				dir=20;
			}
			else{
				dir=27;
			}
		}
		if(screen=='game'){
			ctx.drawImage(self.img,cnt*framew,dir*frameh,framew,frameh,x,y,self.w,self.h);
			ctx.restore();
		}
		else if(screen=='le'){
			ctxLE.drawImage(self.img,cnt*framew,dir*frameh,framew,frameh,self.x,self.y,self.w,self.h);
			ctxLE.restore();
		}
	}*/

	self.updatePosition=function() {
		let move=true;
		let moveG=true;
		if(screen=='le' || screen == 'menu'){
			self.downPress=false;
			self.upPress=false;
			self.leftPress=false;
			self.rightPress=false;
			moveG=false;
		}
            if (screen == 'overworld'){
                  moveG = false;

            }
		//console.log(self.ySpd);
		let leftBump={x:self.x-32,y:self.y,width:10,height:10};
		let rightBump={x:self.x+32,y:self.y,width:10,height:10};
		let upBump={x:self.x,y:self.y-32,width:10,height:10};
		let downBump={x:self.x,y:self.y+32,width:10,height:10};
		for(let key11 in Platform.list){
			if(self.testCollisionBB(downBump,Platform.list[key11])){
				moveG=false;
				self.ySpd=0;
			}
		}
		if(moveG){
			self.ySpd-=1;
			self.y-=self.ySpd;
		}
		if(self.ySpd<-10){
			self.ySpd=-10;
		}
		if(self.rightPress){
			for(let key11 in Platform.list){
				if(self.testCollisionBB(rightBump,Platform.list[key11])){
					move=false;
				}
			}
			if(move){
				self.x+=self.maxSpd;
			}
			else{
				self.x-=self.maxSpd;
			}
		}
		if(self.leftPress){
			for(let key11 in Platform.list){
				if(self.testCollisionBB(leftBump,Platform.list[key11])){
					move=false;
				}
			}
			if(move){
				self.x-=self.maxSpd;
			}
			else{
				self.x+=self.maxSpd;
			}
		}
		if(screen=='game'){
			if(self.upPress){
				for(let key11 in Platform.list){
					if(self.testCollisionBB(upBump,Platform.list[key11])){
						move=false;
					}
					if(self.ySpd!==0){
							move=false;
						}
				}
				if(move){
					self.ySpd=3*self.maxSpd;
					self.y-=self.maxSpd;
					self.y-=self.ySpd;
				}
				else{
					//self.y+=self.maxSpd;
				}
			}
		}
		if(screen=='overworld'){
			if(self.upPress){
				for(let key11 in Platform.list){
					if(self.testCollisionBB(upBump,Platform.list[key11])){
						move=false;
					}
				}
				if(move){
					self.y-=self.maxSpd;
				}
				else{
					self.y+=self.maxSpd;
				}
			}
			if(self.downPress){
				for(let key11 in Platform.list){
					if(self.testCollisionBB(downBump,Platform.list[key11])){
						move=false;
					}
				}
				if(move){
					self.y+=self.maxSpd;
				}
				else{
					self.y-=self.maxSpd;
				}
			}
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
		if(screen=='game'){
			if(self.atkCnt>25){
				self.atkCnt=0;
				Projectile.generate(self);
			}
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

	self.updateAim=function(){
		var diffX = player.x - self.x;
		var diffY = player.y - self.y;

		self.aimAngle = Math.atan2(diffY,diffX) / Math.PI * 180
	}

	self.updateKey=function(){
		var diffX = player.x - self.x;
		var diffY = player.y - self.y;

		self.rightPress = diffX > 3;
		self.leftPress = diffX < -3;
		self.downPress = diffY > 3;
		self.upPress = diffY < -3;
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
			if(screen=='game'){
				if(rand>=5){
					Upgrade.generate(Enemy.list[key])
				}
			}
			delete Enemy.list[key];
		}
	}
}

Enemy.generate=function(x,y){
	let h=64;
	let w=64;
	let id=Math.random();
	let hp=10;
	let atkSpd=0.5;
	let dmg=100;
	//using player img as placeholder
	if(FAC=="phil"){
		let img1=Img.philEnemy;
		Enemy(id,x,y,w,h,img1,hp,atkSpd,dmg,'e');
	}
	else if(FAC=="phy"){
		let img2=Img.phyEnemy;
		Enemy(id,x,y,w,h,img2,hp,atkSpd,dmg,'e');
	}
	else if(FAC=="math"){
		let img3=Img.mathEnemy;
		Enemy(id,x,y,w,h,img3,hp,atkSpd,dmg,'e');
	}
	else if(FAC=="cs"){
		let img4=Img.csEnemy;
		Enemy(id,x,y,w,h,img4,hp,atkSpd,dmg,'e');
	}
}

Enemy.facChange=function(){
	for(let key33 in Enemy.list){
		let e=Enemy.list[key33];
		let ex=e.x;
		let ey=e.y;
		e.remove=true;
		Enemy.generate(ex,ey);
	}
}

Assignment=function(id,x,y,w,h,img,hp,dmg){
	let self=Enemy(id,x,y,w,h,img,hp,dmg,'a');
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

Assignment.generate=function(x,y){
	let h=64;
	let w=64;
	let id=Math.random();
	let hp=30;
	let atkSpd=1;
	let dmg=3;
	//using player img as placeholder
	let img=Img.philEnemy;
	Assignment(id,x,y,w,h,img,hp,dmg);
}

Midterm=function(id,x,y,w,h,img,hp,dmg){
	let self=Enemy(id,x,y,w,h,img,hp,dmg,'m');
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

Midterm.generate=function(x,y){
	let h=64;
	let w=64;
	let id=Math.random();
	let hp=50;
	let atkSpd=1;
	let dmg=7;
	//using player img as placeholder
	let img=Img.midterm;
	Midterm(id,x,y,w,h,img,hp,dmg);
}

Final=function(id,x,y,w,h,img,hp,dmg){
	let self=Enemy(id,x,y,w,h,img,hp,dmg,'l');
	Final.list[id]=self;

	self.onDeath=function(){
		self.remove=true;
		//levelCompleted();
	}
}

Final.update=function(){
	for(let key9 in Final.List){
		Final.list[key9].update();
	}
	for(let key9 in Final.list){
		if(Final.list[key9].remove){
			if(screen=='game'){
				levelCompleted();
			}
		}
	}
}

Final.list={};

Final.generate=function(x,y){
	let h=64;
	let w=64;
	let id=Math.random();
	let hp=10;
	let atkSpd=2;
	let dmg=15;
	//using player img as placeholder
	let img=Img.philEnemy;
	Final(id,x,y,w,h,img,hp,dmg);
}

Player=function(x,y){
	let img=Img.playerLevel;
	let self=Actor('Player','myId',x,y,64,64,img,100,5,5,'p');
	self.maxSpd=5;
	self.lMouseClick=false;
	self.rMouseClick=false;
	self.asgScore=0;
	self.mid=false;
	self.grapplePress=false;
	self.weap=1;

	let super_update=self.update;
	self.update=function(){
		super_update();
		if(screen=='game'){
			if(self.rightPress||self.leftPress){
				self.spriteCnt+=0.2;
			}
			if(self.lMouseClick){
				self.performAttack();
			}
		}
		if(screen=='overworld'){
			if(self.rightPress||self.leftPress||self.upPress||self.downPress){
				self.spriteCnt+=0.2;
			}
		}
	}

	self.draw=function(){
		if(screen=='game'||screen=='overworld'){
			ctx.save();
		}
		else if(screen=='le'){
			ctxLE.save();
		}
		let x=self.x;
		let y=self.y;
		if(screen=='game'){
			x=x-player.x;
			y=y-player.y;
			x+=W/2;
			y+=H/2;
			x-=self.w/2;
			y-=self.h/2;
		}
		else if(screen=='le'){
			x+=mousePos.xoff*64;
			y+=mousePos.yoff*64;
		}
            //console.log(x + ", " + y);
            if (x < -25) {
                  console.log("over the edge");
            }
		let framew=self.img.width/4;
		let frameh=self.img.height/28;
		//console.log('can i find');
		/*if(self.type='p'){
			frameh=frameh/2
		}*/
		let aim=self.aimAngle;
		if(aim<0){
			aim=aim+360;;
		}
		let dir=0;
		if(aim>=90&&aim<270){
			dir=1;
		}
		//console.log(img);
		let cnt=Math.floor(self.spriteCnt)%4;
		if(self.weap==0){
			if(dir==0){
				dir=6;
			}
			else{
				dir=13;
			}
		}
		else{
			if(dir==0){
				dir=20;
			}
			else{
				dir=27;
			}
		}
		if(screen=='game' || screen == 'overworld'){
			ctx.drawImage(self.img,cnt*framew,dir*frameh,framew,frameh,x,y,self.w,self.h);
			ctx.restore();
		}
		else if(screen=='le'){
			ctxLE.drawImage(self.img,cnt*framew,dir*frameh,framew,frameh,x,y,self.w,self.h);
			ctxLE.restore();
		}
	}

	self.onDeath=function(){
		levelFailed();
	}

	return self;
}

Player.generate=function(x,y){
	Player(x,y);
}

Projectile=function(id,x,y,spdX,spdY,w,h,img,hostile,dmg){
	let self=Entity('projectile',id,x,y,w,h,img);
	self.timer=0;
	self.hostile=hostile;
	self.spdX=spdX;
	self.spdY=spdY;
	self.remove=false;
	self.dmg=dmg;

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
					Enemy.list[key2].hp-=self.dmg;
				}
			}
		}
		else if(self.hostile==true){
			if(self.testCollision(player)){
				self.remove=true;
				player.hp-=self.dmg;
			}
		}
		for(let key3 in Platform.list){
			if(self.testCollision(Platform.list[key3])){
				if(Platform.list[key3].imp==false){
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
	let h=5;
	let w=32;
	let id=Math.random();
	let hostile=true;
	let aim=actor.aimAngle;
	let dmg=actor.dmg;
	if(aim<0){
		aim=aim+360;;
	}
	let dir=0;
	if(aim>=90&&aim<270){
		dir=1;
	}
	let img1=Img.penLeft;
	let img2=Img.penRight;
	if(dir==1){
		img=Img.penLeft;
	}
	if(actor.type=='Player'){
		hostile=false;
	}
	//console.log("Angle: "+angle);
	let spdX=Math.cos(aim/180*Math.PI)*7;
	let spdY=Math.sin(aim/180*Math.PI)*7;
	if(dir==1){
		Projectile(id,x,y,spdX,spdY,w,h,img1,hostile,dmg);
	}
	else{
		Projectile(id,x,y,spdX,spdY,w,h,img2,hostile,dmg);
	}
}

Upgrade=function(id,x,y,w,h,cat,img){
		let self=Entity('upgrade',id,x,y,w,h,img);
		self.cat=cat;
		Upgrade.list[id]=self;
}

Upgrade.list={}

Upgrade.update=function(){
	for(let key5 in Upgrade.list){
		Upgrade.list[key5].update();
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
	let img=Img.upgrade;

	Upgrade(id,x,y,w,h,cat,img);

}

Platform=function(type,id,x,y,img,code,smash,imp){
	let self=Entity(type,id,x,y,64,64,img);
	self.code=code;
	self.smash=smash;
	self.imp=imp;
	self.remove=false;
	Platform.list[id]=self;

}

Platform.list={};

Platform.update=function(){
	for(let key4 in Platform.list){
		let p = Platform.list[key4];
		p.update();
		if(p.remove){
			delete Platform.list[key4];
		}
	}
}

Platform.generate=function(x,y,code){
	imp=false;
	smash=false;
	id=Math.random();
	type='plat';
	//player img as placeholder
	img1=Img.platform;
	img2=Img.breakable;
	if(code=='b'){
		smash=true;
		Platform(type,id,x,y,img2,code,smash,imp);
	}
	else{
		Platform(type,id,x,y,img1,code,smash,imp);
	}
}
