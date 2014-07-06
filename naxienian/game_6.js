
/*第5个游戏---maple数学软件*/
function game_6(){

	var labels = new Array();
	var gezis = new Array();
	var drag_label ; //当前正在拖动的标签

	this.logic = function(){
		for(var i = 0; i < labels.length;i++){
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
				for(var j = 0; j < gezis.length; j++){
					var gezi = gezis[j];
					
					var l = findLabel(gezi.x + (83 - 70) / 2, gezi.y + (83 - 70) / 2);
					
					if(l == null && gezi.isInRect(drag_label.x + 30, drag_label.y + 30)){
						drag_label.x = gezi.x + (83 - 70) / 2;
						drag_label.y = gezi.y + (83 - 70) / 2;
						gezi.value = drag_label.value;
					}
				}
					
				drag_label = null;
			}
		}
		
	}

	

	this.paint = function(){
	
		paintTitle("maple数学软件");
		
		//draw block
		context.fillStyle = "rgb(110,180,120)";
		drawLine(game_x + 275, game_y + 120, game_x + 275 + 250, game_y + 120 );
		drawLine(game_x + 275, game_y + 120 + 83, game_x + 275 + 250, game_y + 120 + 83);
		drawLine(game_x + 275, game_y + 120 + 169, game_x + 275 + 250, game_y + 120 + 169);
		drawLine(game_x + 275, game_y + 120 + 250, game_x + 275 + 250, game_y + 120 + 250);
		drawLine(game_x + 275, game_y + 120, game_x + 275, game_y + 120 + 250);
		drawLine(game_x + 275 + 83, game_y + 120, game_x + 275 + 83, game_y + 120 + 250);
		drawLine(game_x + 275 + 169, game_y + 120 , game_x + 275 + 169, game_y + 120 + 250);
		drawLine(game_x + 275 + 250, game_y + 120 , game_x + 275 + 250, game_y + 120 + 250);
		
		//paint label
		for(var i = 0; i < labels.length;i++){
			labels[i].paint();
		}
		
		paintBackLevel();
		
		if(check()){
			context.fillStyle = "rgb(210,20,80)";
   			context.font = "45px serif";
			context.fillText("OK !!!", game_x + 600, game_y + 560);
		}
		context.fillStyle = "rgb(70,10,30)";
		context.font = "14px serif";
		context.fillText("提示：移动数字到方格内，使得横、纵、斜，三条线上数字之和均为15!", game_x + 60, game_y + 560);
	}
	

	//定义名片label对象
	var Label = function(x,y,value){  
		this.x = x; this.y = y; 
		this.value = value;
		this.size = 70;
		
		this.paint = function(){
			context.fillStyle = "rgb(110,180,120)"
			context.fillRect(game_x + this.x, game_y + this.y, this.size, this.size);
			context.fillStyle = "rgb(250,250,250)"
			context.font = "40px serif";
			context.fillText(value, game_x + this.x + 25, game_y + this.y + 48);
		}

	

		this.logic = function(){
			if(isDownRect(game_x + this.x, game_y + this.y, this.size, this.size)){ //如果点中了
					drag_label = this;
					lmx = dx;
					lmy = dy;
					resetDownPointer();
					resetUpPointer();
				}
		}
	}

	
	var Gezi = function(x, y){
		this.x = x; 
		this.y = y;
		this.value = 0;
		this.isInRect = function (px,py){
			return isPointInRect(px,py,x,y,83,83);
		}
	}


	
	
	
	for(var i = 1; i < 10; i ++)
	{
		labels.push(new Label(-35 + i * 80, 400, i));
	}
	
	function findLabel(x,y)
	{
		for(var i = 0; i < 9; i ++)
		{
			var l = labels[i];
			if(l.x == x && l.y == y){
				return l;
			}
		}
		return null;
	}
	
	gezis.push(new Gezi(275, 120));
	gezis.push(new Gezi(275, 120 + 83));
	gezis.push(new Gezi(275, 120 + 169));
	gezis.push(new Gezi(275 + 83, 120));
	gezis.push(new Gezi(275 + 83, 120 + 83));
	gezis.push(new Gezi(275 + 83, 120 + 169));
	gezis.push(new Gezi(275 + 169, 120));
	gezis.push(new Gezi(275 + 169, 120 + 83));
	gezis.push(new Gezi(275 + 169, 120 + 169));
	
	
	function check()
	{
		if(gezis[0].value + gezis[1].value + gezis[2].value != 15)return false;
		if(gezis[3].value + gezis[4].value + gezis[5].value != 15)return false;
		if(gezis[6].value + gezis[7].value + gezis[8].value != 15)return false;
		
		if(gezis[0].value + gezis[3].value + gezis[6].value != 15)return false;
		if(gezis[1].value + gezis[7].value + gezis[4].value != 15)return false;
		if(gezis[2].value + gezis[5].value + gezis[8].value != 15)return false;
		
		if(gezis[0].value + gezis[4].value + gezis[8].value != 15)return false;
		if(gezis[2].value + gezis[4].value + gezis[6].value != 15)return false;
		
		return true;
	}
	
	
}

