
/*��3����Ϸ---��Ů�ַֿ�*/
function game_3(){

	var labels = new Array();
	var drag_label ; //��ǰ�����϶��ı�ǩ

	this.logic = function(){
		for(var i = 0; i < labels.length;i++){
			var l = labels[i];
			l.logic();
		}
		//��ק��ǩ
		if(drag_label != null){
			drag_label.x += (mx - lmx);
			drag_label.y += (my - lmy);			
			lmx = mx;
			lmy = my;  //������������һ���϶������λ�á�
			if(isUpRect(game_x , game_y , game_w, game_h)){
					drag_label = null;
			}
		}
		
		
	}

	this.paint = function(){
	
		paintTitle("��Ů�ַֿ�");
		
		//draw block
		context.fillStyle = "rgb(110,180,120)";
		context.fillRect(game_x + 100, game_y + 120, 250, 250);
		context.fillStyle = "rgb(180,110,120)";
		context.fillRect(game_x + 450, game_y + 120, 250, 250);
		
		//paint label
		for(var i = 0; i < labels.length;i++){
			labels[i].paint();
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
		//enter menu
		if(isDownRect(game_x + 340, game_y + 540, 60, 30)){
			enter();
			resetDownPointer();
		}
		
		//show jieguo
		if(dafen)showJieguo();
	}
	

	//������Ƭlabel����
	var Label = function(x,y,name,sex,width){  //sexΪ0��ʾ�У�Ϊ1��ʾŮ
		this.x = x; this.y = y; this.sex = sex;this.width = width;
		//js����֣����������һ�в�ע�͵���������Ĵ����x��this.x��ָʾ�Ľ�����ͬһ�����󣬣���С�ľͻ������
		
		this.paint = function(){
			context.fillStyle = "rgb(10,10,100)"
			//if(sex == 1)context.fillStyle = "rgb(160,1,100)"
			context.fillRect(game_x + this.x, game_y + this.y, width, 30);
			context.fillStyle = "rgb(250,250,250)"
			context.font = "16px serif";
			context.fillText(name, game_x + this.x + 10, game_y + this.y + 18);
			//context.fillStyle = "rgb(250,50,250)"
			//context.fillText(this.x + "," + this.y, game_x + this.x + 5, game_y + this.y + 40);
		}

	

		this.logic = function(){
			if(isDownRect(game_x + this.x, game_y + this.y, width, 40)){ //���������
					//����Ļ���ִ����ק
					drag_label = this;
					lmx = dx;
					lmy = dy;
					resetDownPointer();
					resetUpPointer();
				}
		}
	}

	

	labels.push(new Label(420, 400, "����", 0, 45));
	labels.push(new Label(200, 450, "zhangtq", 0, 80));
	labels.push(new Label(370, 450, "miss��", 1, 90));
	labels.push(new Label(125, 400, "����", 1, 45));
	labels.push(new Label(200, 400, "����ɳĮ", 0, 93));
	labels.push(new Label(300, 450, "Ivy", 1, 45));
	labels.push(new Label(475, 450, "���밮��˿", 1, 100));
	labels.push(new Label(125, 450, "tom", 0, 45));
	labels.push(new Label(300, 400, "HelloKitty", 1, 100));
	labels.push(new Label(510, 400, "������", 0, 70));
	
	
	var fenshu = 0;
	var dafen = false;
	
	function enter()
	{
		fenshu = 0;
		for(var i = 0; i < 10; i++){
			var element = labels[i];
			if(element.sex == 0 && isPointInRect(element.x , element.y , 100, 120, 250 - element.width, 220)){
				fenshu += 10;
			}
			else if(element.sex == 1 && isPointInRect(element.x , element.y , 450, 120, 250 - element.width, 220)){
				fenshu += 10;
			}
		}
		dafen = true;
	}
	
	function showJieguo(){
		context.fillStyle = "rgb(210,20,80)";
   		context.font = "45px serif";
		context.fillText(fenshu + "��", game_x + 600, game_y + 560);
	}
	
	
	
	
}

