
/*���Ǹ��򵥵İ���logic��paint�����ӣ�����������Ϸ������Է�������д*/
function state_temp(){

	var counter = 0, flag = 0;

	this.logic = function(){
		if(flag == 1){
			counter --;
		}else{
			counter ++;
		}
		if(flag == 0 && counter > 100){
			flag = 1;
		}else if(flag == 1 && counter < 0){
			flag = 0;
		}
	}

	this.paint = function(){
		context.fillStyle = "rgb(10,20,180)"
		context.fillRect(game_x + counter,240,10,10);
	}

	
}

