
/*第4个游戏---没事套个圈*/
function game_4(){

	this.logic = function(){
		
		btn.logic();
		for (var index = 0; index < gifts.length; index ++) {
			gifts[index].logic();
		}
		quan.logic();
	}

	this.paint = function(){
		paintTitle("没事套个圈");
		
		context.fillStyle = "rgb(250,20,250)";
		context.arc(100, 100, 100, 0, Math.PI * 2, false);
		quan.paint();
		btn.paint();
		for (var index = 0; index < gifts.length; index ++) {
			gifts[index].paint();
		}
		
		paintBackLevel();
		showJieguo();
	}
	
	

	var Quan = function(){
	
		this.x = 250;
		this.y = 480;
		this.r = 80;
		this.action = 0; //0待命，1，上升，2，下落
		this.a = 1;
		
		this.logic = function(){
			switch(this.action){
			case 1:
				this.y -= this.a;
				this.a++;
				if(this.y <= 100){
					this.action = 2;
					this.a = 1;
				}
				break;
			case 2:
				this.y += this.a;
				this.a++;
				if(this.y >= 480){
					this.action = 0;
					this.a = 1;
				}
				break;
			
			}
		}
		
		this.paint = function()
		{
			drawArc(game_x + this.x, game_y + this.y, this.r);
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
				if(quan.action == 0)quan.action = 1;
				resetDownPointer();	
			}
		}
		
		this.paint = function()
		{
			if(isMoveRect(game_x + x, game_y + y, w, 30)){
				context.fillStyle = "rgb(110,180,120)";
				context.fillRect(game_x + x, game_y + y, w, 30);		
			}
			context.font = "16px serif";		
			context.strokeText(text, game_x + x + 10, game_y + y + 20);
		}
		
	}
	
	var quan = new Quan();
	var btn = new Button(400, 540, "Go",40);
	
	var catchNum = 0;
	
	
	var Gift = function(x, y, text, w, sudu){
		this.go = false;
		
		this.logic = function()
		{
			if(this.go == false){
				return;
			}
			if(isRectInArc(x,y,w,30,quan.x,quan.y,quan.r)){
					var index = gifts.indexOf(this);
					if(index > 0){
						gifts[index - 1].go = true;
					}
					this.go = false;
					catchNum ++;
					x = 10;
					y = 500 - catchNum * 40;
					fenshu += fenzhi[index];
					quan.action = 2;
					pause(1000); //界面暂停一会。。
				}
				else if(x <= - 2 * w){
					var index = gifts.indexOf(this);
					if(index > 0){
						gifts[index - 1].go = true;
					}
					gifts.splice(index, 1);
				}
				x -= sudu; //移动
		}
		
		this.paint = function()
		{
			context.fillStyle = "rgb(90,110,180)";
			context.fillRect(game_x + x, game_y + y, w, 30);		
			context.font = "16px serif";		
			context.fillStyle = "rgb(250,210,210)";
			context.fillText(text, game_x + x + 10, game_y + y + 20);
		}
	
	}
	
	var names = ["七贱", "六莫", "五虞", "四亨","三林","二花","小宜"];
	
	var gifts = new Array();
	for(var i = 0; i < 7; i ++){
		gifts.push(new Gift(700, 100 + i * 50, names[i],60, 1 + (7 - i)));
	}
	gifts[6].go = true;
	
	
	//打分
	var fenzhi = [28, 25, 20, 15, 8, 3, 1];
	var fenshu = 0;
	
	function showJieguo(){
		context.fillStyle = "rgb(210,20,80)";
   		context.font = "45px serif";
		context.fillText(fenshu + "分", game_x + 600, game_y + 560);
	}
}

