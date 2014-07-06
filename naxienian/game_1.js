
/*��һ����Ϸ---Ⱥ��С����*/
function game_1(){

	var questions = new Array();
	var answers = new Array();

	this.logic = function(){
		for (var index = 0; index < answers.length; index ++) {
			answers[index].logic();
		}
	}

	this.paint = function(){
		
		paintTitle("群情知多少");
		
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
		context.fillText("���", game_x + 350, game_y + 560);
		//back main menu
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
			if(isDownRect(game_x + x, game_y + y, w, 40)){  //�����
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
	
	
	questions.push(new Question(100, 100, "1, 小花是男是女？", new Array("��", "Ů", "���з�Ů", "����˵"), new Array(30,30,80,60)));
	questions.push(new Question(100, 180, "2, ˭û����Ⱥ����", new Array("����", "joy", "linda", "tiger"), new Array(40,40,55,55)));
	questions.push(new Question(100, 260, "3, Ī�Ӻ�СĪ��ɶ��ϵ��", new Array("�ֵ�", "����", "ͬѧ", "����"), new Array(40,40,40,40)));
	questions.push(new Question(100, 340, "4, �ĸ��һ��ɱ���ͣ�", new Array("��", "johnny", "С��", "��ʯ��"), new Array(30,70,40,55)));
	questions.push(new Question(100, 420, "5, ȥ��Ⱥ�ڱ����һ���ǣ�", new Array("linda", "ɽ��", "ССţ", "��������"), new Array(55,40,55,80)));


	var flags = new Array();
	var fenshu = 0;
	var dafen = false;
	
	function enter()
	{
		fenshu = 0;
		flags[0] = (answers[0].select == true);
		flags[1] = (answers[6].select == true);
		flags[2] = (answers[11].select == true);
		flags[3] = (answers[13].select == true);
		flags[4] = (answers[19].select == true);
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
		context.fillText(fenshu + "��", game_x + 600, game_y + 560);
	}
	
	
}

