
/*�ؿ�����*/
function state_level(){
	
	var levels = new Array();
	
	this.logic = function(){
		for (var index = 0; index < levels.length; index ++) {
			levels[index].logic();
		}
	}
	
	this.paint = function(){
		for (var index = 0; index < levels.length; index ++) {
			levels[index].paint();
		}
		
		//back button
		if(isMoveRect(game_x + 40, game_y + 530, 60, 30)){
			context.fillStyle = "rgb(110,180,120)";
			context.fillRect(game_x + 40, game_y + 530, 60, 30);		
		}
   		context.fillStyle = "rgb(10,20,20)";
   		context.font = "18px serif";
		context.fillText("back", game_x + 50, game_y + 550);
		//back main menu
		if(isDownRect(game_x + 40, game_y + 530, 60, 30)){
			game_state = 0;
			//console.log(game_state);
			resetDownPointer();
		}
	}
	
	
	var Level = function(x, y, name, index){ //index:��ǰ�ǵڼ���
		
		this.logic = function(){
			if(isDownRect(game_x + x, game_y + y, 200, 40)){  //���������ڸùؿ���
				game_state = 2;
				if(index == 1)state_game = new game_1();
				if(index == 2)state_game = new game_2();
				if(index == 3)state_game = new game_3();
				if(index == 4)state_game = new game_4();
				if(index == 5)state_game = new game_5();
				if(index == 6)state_game = new game_6();
				if(index == 7)state_game = new game_7();
				if(index == 8)state_game = new game_8();
				resetDownPointer();
			}
		}
		
		
		this.paint = function(){
			context.fillStyle = "rgb(110,180,120)";
			if(isMoveRect(game_x + x, game_y + y, 200, 40)){  //��������ͣ�ڸùؿ���
				context.fillStyle = "rgb(110,200,140)";
			}
   			context.fillRect(game_x + x, game_y + y, 200, 40);
   			context.fillStyle = "rgb(10,20,20)";
   			context.font = "18px serif";
			context.fillText(name, game_x + x + 20, game_y + y + 24);
		}
	}
	
	var names = ["1��Ⱥ��֪����", "2�����������", "3����Ů�ַֿ�", "4��û���׸�Ȧ", 
		"5��johnny�������", "6��maple��ѧ���", "7��Ѱ������ľ", "8��2013��Ŀ���"];  //���뱣֤��СΪż��
	for (var index = 0; index < names.length - 1; index+= 2) {
		levels.push(new Level(133, 50 + 30 * index, names[index], index + 1));
		levels.push(new Level(460, 50 + 30 * index, names[index + 1], index + 2));
	}
	
	
	
}