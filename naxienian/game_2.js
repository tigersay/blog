
/*第2个游戏---如何来打球*/
function game_2(){

	var questions = new Array();
	var answers = new Array();

	this.logic = function(){
		for (var index = 0; index < answers.length; index ++) {
			answers[index].logic();
		}
	}

	this.paint = function(){
		
		paintTitle("如何来打球");
		
		for (var index = 0; index < questions.length; index ++) {
			questions[index].paint();
		}
		for (var index = 0; index < answers.length; index ++) {
			answers[index].paint();
		}
		
		for (var index = 0; index < 5; index++) {
			context.fillStyle = "rgb(0,0,0)";
			drawLine(game_x + 130, game_y + 180 + index * 80, game_x + 600, game_y + 180 + index * 80);	
		}
		
		paintBackLevel();
		
		//enter button
		if(isMoveRect(game_x + 340, game_y + 540, 60, 30)){
			context.fillStyle = "rgb(110,180,120)";
			context.fillRect(game_x + 340, game_y + 540, 60, 30);		
		}
   		context.fillStyle = "rgb(10,20,20)";
   		context.font = "18px serif";
		context.fillText("打分", game_x + 350, game_y + 560);
		//enter menu
		if(isDownRect(game_x + 340, game_y + 540, 60, 30)){
			enter();
			resetDownPointer();
		}
		
		//show jieguo
		if(dafen)showJieguo();
	}



	var Question = function(x, y, text, items, ws){
		
		for (var index = 0; index < items.length; index++) {
			var temp = items[index];
			var answer = new Answer(x + 90 + index * 110, y + 40, temp, ws[index]);
			answers.push(answer);
		}
		
		this.paint = function()
		{
			context.fillStyle = "rgb(10,20,20)";
   			context.font = "18px serif";
			context.fillText(text, game_x + x + 20, game_y + y + 28);
		}
	}
	
	var Answer = function(x, y, text, w){
		this.select = false;
		
		this.logic = function()
		{
			if(isDownRect(game_x + x, game_y + y, w, 40)){  //点击后
				if(this.select == false){
					var i = answers.indexOf(this) + 1;
					for (var index = 0; index < 4; index++) {
						var temp = (Math.ceil(i / 4) - 1) * 4 + index;
						answers[temp].select = false;
					}
					this.select = true;
				}else{
					this.select = false;
				}
				resetDownPointer();
			}
		}
		
		this.paint = function()
		{
			if(this.select){
				context.fillStyle = "rgb(210,120,280)";
				context.fillRect(game_x + x, game_y + y, w, 28);
			}
		
			context.fillStyle = "rgb(10,20,80)";
   			context.font = "16px serif";
			context.fillText(text, game_x + x + 5, game_y + y + 20);
			
		}
	}
	
	
	questions.push(new Question(100, 100, "1, 我们在哪个球馆打球？", new Array("永利", "彩虹", "弘体", "科新"), new Array(40,40,40,40)));
	questions.push(new Question(100, 180, "2, 球馆最近的地铁站是哪个？", new Array("江南西", "昌岗", "沙园", "宝岗大道"), new Array(55,40,55,80)));
	questions.push(new Question(100, 260, "3, 每周哪两天打球？", new Array("周一周日", "周三周五", "周二周六", "周七周八"), new Array(80,80,80,80)));
	questions.push(new Question(100, 340, "4, 周二打球是几点开始？", new Array("五点", "六点", "七点", "八点"), new Array(40,40,40,40)));
	questions.push(new Question(100, 420, "5, 现在群里打的是哪种球？", new Array("奔驰", "易迅", "狮威", "冰泉"), new Array(40,40,40,40)));


	var flags = new Array();
	var fenshu = 0;
	var dafen = false;
	
	function enter()
	{
		fenshu = 0;
		flags[0] = (answers[2].select == true);
		flags[1] = (answers[7].select == true);
		flags[2] = (answers[10].select == true);
		flags[3] = (answers[15].select == true);
		flags[4] = (answers[18].select == true);
		for(var i = 0; i < 5; i++){
			if(flags[i])fenshu += 20;
		}
		dafen = true;
	}
	
	function showJieguo(){
		for(var i = 0; i < 5; i++){
			if(flags[i]){
				context.fillStyle = "rgb(0,250,0)";
				drawDui(game_x + 650, game_y + 170 + i * 80);
			}else{
				context.fillStyle = "rgb(250,0,0)";
				drawCuo(game_x + 650, game_y + 170 + i * 80);
			}
		}
		context.fillStyle = "rgb(210,20,80)";
   		context.font = "45px serif";
		context.fillText(fenshu + "分", game_x + 600, game_y + 560);
	}
	
	
}

