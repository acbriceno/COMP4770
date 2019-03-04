saveLevel=function(w,h){
	let level;
	let x=0;
	let y=0;
	for(let i=0;i<w*h;i++){
		//if to test if entity is there
		//add it to a string
		if(x<w){
			x+=32;
		}
		else{
			x=0;
			y+=32;
		}
	}
}