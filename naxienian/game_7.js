
/*寻找紫藤木*/
function game_7(){

	var labels = new Array();
	
	this.logic = function(){
	
		if(hascheck && isDownRect(game_x,game_y,game_w,game_h)){
			hascheck = false;
		}
		
		for(var i = 0; i < labels.length;i++){
			var l = labels[i];
			l.logic();
		}
		btn.logic();
	}

	this.paint = function(){
		paintTitle("寻找紫藤木");
		btn.paint();
		//paint label
		for(var i = 0; i < labels.length;i++){
			labels[i].paint();
		}
		paintBackLevel();
		context.fillStyle = "rgb(70,10,30)";
		context.font = "14px serif";
		context.fillText("三林同学有六根木头，准备用其中的紫藤木做羽毛球拍! 但分不清哪一根是紫藤木。。", game_x + 60, game_y + 540);
		context.fillText("于是让它们各说了一句话，已知只有紫藤木说的是假话，请你帮三林找出紫藤木来。。", game_x + 60, game_y + 560);
	
		if(hascheck){
			if(ok){
				drawDui(game_x + 660, game_y + 320);
			}else{
				drawCuo(game_x + 660, game_y + 320);
			}
		}
		
	}

	
	
	//定义树木
	var Label = function(x,y,text,index){  
		this.x = x; 
		this.y = y; 
		this.w = 400;
		this.h = 50;
		this.index = index;
		this.focus = false;
		
		this.paint = function(){
			context.fillStyle = "rgb(160,108,35)"
			if(this.focus)context.fillStyle = "rgb(220,108,35)"
			context.fillRect(game_x + this.x, game_y + this.y, this.w, this.h);
			context.fillStyle = "rgb(240,240,240)"
			context.font = "18px serif";
			context.fillText(text, game_x + this.x + 35, game_y + this.y + 28);
		}

	

		this.logic = function(){
			if(isDownRect(game_x + this.x, game_y + this.y, this.w, this.h)){ //如果点中了
					if(focusLabel != null)focusLabel.focus = false;
					focusLabel = this;
					focusLabel.focus = true;
					resetDownPointer();
			}
		}
	}
	
	
	var focusLabel;
	
	var names = ["A: 三林很聪明", "B：ziteng很聪明", "C：A说的对", "D：ziteng打球不错",
		"E：ziteng不只聪明，而且打球不错","F：我是三林"];
	
	for(var i = 0; i < 6; i ++)
	{
		labels.push(new Label(150 , 120 + i * 60, names[i], i));
	}
	
	var ok = false;
	var hascheck = false;
	
	function check(){
		hascheck = true;
		if(focusLabel != null && focusLabel.index == 5){
			ok = true;
		}else{
			ok = false;
		}
	}
	
	/*
	* 按钮对象
	*/
	var Button = function(x, y, text, w)
	{
		this.logic = function()
		{
			if(isDownRect(game_x + x, game_y + y, w, 30)){
				check();
				resetDownPointer();	
			}
		}
		
		this.paint = function()
		{
			context.fillStyle = "rgb(110,160,120)";
			if(isMoveRect(game_x + x, game_y + y, w, 30)){
				context.fillStyle = "rgb(110,190,120)";
			}
			context.fillRect(game_x + x, game_y + y, w, 30);		
			context.font = "16px serif";	
			context.fillStyle = "rgb(0,0,0)";
			context.fillText(text, game_x + x + 10, game_y + y + 20);
		}
	}
	
	var btn = new Button(660, 450, "check",60);
	
}

