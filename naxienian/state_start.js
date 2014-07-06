
/*开始界面*/
function state_start(){

	var labels = new Array();
	var drag_label ; //当前正在拖动的标签

	this.logic = function(){
		for(var i = labels.length - 1; i >= 0; i--){
			var l = labels[i];
			l.logic();
		}
		//拖拽标签
		if(drag_label != null){
			drag_label.x += (mx - lmx);
			drag_label.y += (my - lmy);			
			lmx = mx;
			lmy = my;  //在这里设置上一次拖动处理的位置。
			if(isUpRect(game_x , game_y , game_w, game_h)){
					drag_label = null;
			}
		}
		
		//如果点到了开始游戏按钮
		if(isUpRect(game_x + 440, game_y + 500, 100, 40)){
			game_state = 1;
			resetUpPointer();
		}
		//如果点到了about按钮
		if(isUpRect(game_x + 560, game_y + 500, 100, 40)){
			for(var i = 0; i < labels.length;i++){
				var l = labels[i];
				l.disappear = true;
			}
		}
	}

	this.paint = function(){
		//paint label
		for(var i = 0; i < labels.length;i++){
			labels[i].paint();
		}
		
		//画一个横条
		context.fillStyle = "rgb(150,200,150)";
		context.fillRect(game_x + 120, game_y + 500, 560, 40);
		context.fillStyle = "rgb(10,20,18)";
		context.font = "italic 20px serif";
		context.strokeText("No Ball, No We!", game_x + 180, game_y + 526);

		//画按钮 -- start
		if(isMoveRect(game_x + 440, game_y + 500, 100, 40)){
			context.fillStyle = "rgb(100,240,100)";
		}else{
			context.fillStyle = "rgb(100,200,60)";
		}
		context.fillRect(game_x + 440, game_y + 500, 100, 40);
		context.fillStyle = "rgb(10,10,10)"
		context.font = "16px serif";
		context.fillText("start", game_x + 466, game_y + 524);
		// --about
		if(isMoveRect(game_x + 560, game_y + 500, 100, 40)){
			context.fillStyle = "rgb(240,100,200)";
		}else{
			context.fillStyle = "rgb(200,100,160)";
		}
		context.fillRect(game_x + 560, game_y + 500, 100, 40);
		context.fillStyle = "rgb(10,10,10)"
		context.font = "16px serif";
		context.fillText("about", game_x + 596, game_y + 524);
		
		//show about 
		//点了about按钮后，所有标签开始消失。。消失完，就会触发屏幕中间显示一段话。。
		if(labels.length == 0){
			context.fillStyle = "rgb(0,0,0)"
			context.font = "20px serif";
			context.fillText("We meet and know because of yumaoqiu. ", game_x + 160, game_y + 180);
			context.fillText("Yumaoqiu will with our all life. ", game_x + 160, game_y + 180 + 40);
			context.fillText("But we,,,maybe oneday we are stranger... ", game_x + 160, game_y + 180 + 80);
			context.fillText("Enjoy the yumaoqiu,my firend,,,and, Good luck! ", game_x + 160, game_y + 180 + 120);
			context.fillText("---- tiger, 2014-4-1 ", game_x + 420, game_y + 180 + 160);
			
			if(counter < 1400){
				context.fillStyle = "rgb(210,250,250)"
				context.fillRect(game_x + 160, counter / 3, 460,(420 - counter / 3));  
				counter ++;
			}
			
		}
	}
	
	var counter = 550;

	//定义名片label对象
	var Label = function(x,y,name,sex,width){  //sex为0表示男，为1表示女
		this.x = x; this.y = y; 
		//js好奇怪，如果上面这一行不注释掉，在下面的代码里，x和this.x所指示的将不是同一个对象，，不小心就会出错。。
		
		this.paint = function(){
			context.fillStyle = "rgb(0,160,100)"
			if(sex == 1)context.fillStyle = "rgb(160,1,100)"
			context.fillRect(game_x + this.x, game_y + this.y, width, 30);
			context.fillStyle = "rgb(250,250,250)"
			context.font = "16px serif";
			context.fillText(name, game_x + this.x + 10, game_y + this.y + 20);
			//context.fillStyle = "rgb(250,50,250)"
			//context.fillText(this.x + "," + this.y, game_x + this.x + 5, game_y + this.y + 40);
		}

	
		this.disappear = false; //是否正在消失
		var a = 1; //消失时的加速度

		this.logic = function(){
			
			if(this.disappear == false){
				if(isDownRect(game_x + this.x, game_y + this.y, width, 40)){ //如果点中了
					if(isRight){  //右键点击就开始消失
						this.disappear = true;
					}else{
						//左键的话，执行拖拽
						drag_label = this;
						lmx = dx;
						lmy = dy;
					}
					resetDownPointer();
					resetUpPointer();
				}
			}else{
				a ++;
				if(sex == 0){
					this.y += a;
					if(this.y > game_h + 20){labels.splice(labels.indexOf(this),1);} //splics方法从第一个参数表示的索引删起，删除的数目由第二个参数确定。
				}else{
					this.y -= a;
					if(this.y < - 60){labels.splice(labels.indexOf(this),1);}
				}
				this.paint();
			}
			
		}
	}

	labels.push(new Label(510, 70, "tiger", 0, 60));
	labels.push(new Label(300, 70, "linda", 1, 60));
	labels.push(new Label(455, 260, "lee", 0, 40));
	labels.push(new Label(300, 150, "小宜", 1, 60));
	labels.push(new Label(510, 310, "Bliss7", 0, 60));
	labels.push(new Label(245, 260, "joy", 1, 40));
	labels.push(new Label(390, 340, "亨", 0, 33));
	labels.push(new Label(300, 110, "三林", 1, 60));

	labels.push(new Label(510, 110, "山鸡", 0, 60));
	labels.push(new Label(510, 270, "johnny", 0, 60));
	labels.push(new Label(445, 70, "莫子", 0, 60));
	labels.push(new Label(220, 300, "牧", 1, 33));
	labels.push(new Label(300, 190, "ziteng", 1, 60));
	labels.push(new Label(300, 270, "maple", 1, 60));
	
	labels.push(new Label(230, 220, "土豆", 1, 60));
	labels.push(new Label(170, 70, "高妹", 1, 60));
	labels.push(new Label(185, 180, "晴天娃娃", 1, 90));
	labels.push(new Label(235, 70, "幽静", 1, 60));
	
	labels.push(new Label(470, 390, "Happy603", 0, 93));
	labels.push(new Label(395, 180, "宁静致远", 0, 90));
	labels.push(new Label(510, 230, "cloud", 0, 60));
	
	labels.push(new Label(380, 70, "大黄蜂", 0, 60));
	labels.push(new Label(450, 430, "巴塞罗那", 0, 90));
	labels.push(new Label(510, 350, "kenry", 0, 60));
	labels.push(new Label(510, 190, "小莫", 0, 60));
	
	labels.push(new Label(300, 230, "一休", 1, 60));
	labels.push(new Label(300, 310, "elaine", 1, 60));
	labels.push(new Label(300, 350, "青宁", 1, 60));
	labels.push(new Label(270, 390, "咖啡语茶", 1, 90));
	labels.push(new Label(230, 430, "君临天下", 1, 90));
	labels.push(new Label(510, 150, "青石板", 0, 60));
	
	labels.push(new Label(180, 340, "闲", 1, 33));
	labels.push(new Label(440, 220, "海洋", 0, 60));
	labels.push(new Label(430, 300, "DJ", 0, 40));
	
	
	
	
}

