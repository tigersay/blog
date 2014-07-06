
/*��ʼ����*/
function state_start(){

	var labels = new Array();
	var drag_label ; //��ǰ�����϶��ı�ǩ

	this.logic = function(){
		for(var i = labels.length - 1; i >= 0; i--){
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
		
		//����㵽�˿�ʼ��Ϸ��ť
		if(isUpRect(game_x + 440, game_y + 500, 100, 40)){
			game_state = 1;
			resetUpPointer();
		}
		//����㵽��about��ť
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
		
		//��һ������
		context.fillStyle = "rgb(150,200,150)";
		context.fillRect(game_x + 120, game_y + 500, 560, 40);
		context.fillStyle = "rgb(10,20,18)";
		context.font = "italic 20px serif";
		context.strokeText("No Ball, No We!", game_x + 180, game_y + 526);

		//����ť -- start
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
		//����about��ť�����б�ǩ��ʼ��ʧ������ʧ�꣬�ͻᴥ����Ļ�м���ʾһ�λ�����
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

	//������Ƭlabel����
	var Label = function(x,y,name,sex,width){  //sexΪ0��ʾ�У�Ϊ1��ʾŮ
		this.x = x; this.y = y; 
		//js����֣����������һ�в�ע�͵���������Ĵ����x��this.x��ָʾ�Ľ�����ͬһ�����󣬣���С�ľͻ������
		
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

	
		this.disappear = false; //�Ƿ�������ʧ
		var a = 1; //��ʧʱ�ļ��ٶ�

		this.logic = function(){
			
			if(this.disappear == false){
				if(isDownRect(game_x + this.x, game_y + this.y, width, 40)){ //���������
					if(isRight){  //�Ҽ�����Ϳ�ʼ��ʧ
						this.disappear = true;
					}else{
						//����Ļ���ִ����ק
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
					if(this.y > game_h + 20){labels.splice(labels.indexOf(this),1);} //splics�����ӵ�һ��������ʾ������ɾ��ɾ������Ŀ�ɵڶ�������ȷ����
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
	labels.push(new Label(300, 150, "С��", 1, 60));
	labels.push(new Label(510, 310, "Bliss7", 0, 60));
	labels.push(new Label(245, 260, "joy", 1, 40));
	labels.push(new Label(390, 340, "��", 0, 33));
	labels.push(new Label(300, 110, "����", 1, 60));

	labels.push(new Label(510, 110, "ɽ��", 0, 60));
	labels.push(new Label(510, 270, "johnny", 0, 60));
	labels.push(new Label(445, 70, "Ī��", 0, 60));
	labels.push(new Label(220, 300, "��", 1, 33));
	labels.push(new Label(300, 190, "ziteng", 1, 60));
	labels.push(new Label(300, 270, "maple", 1, 60));
	
	labels.push(new Label(230, 220, "����", 1, 60));
	labels.push(new Label(170, 70, "����", 1, 60));
	labels.push(new Label(185, 180, "��������", 1, 90));
	labels.push(new Label(235, 70, "�ľ�", 1, 60));
	
	labels.push(new Label(470, 390, "Happy603", 0, 93));
	labels.push(new Label(395, 180, "������Զ", 0, 90));
	labels.push(new Label(510, 230, "cloud", 0, 60));
	
	labels.push(new Label(380, 70, "��Ʒ�", 0, 60));
	labels.push(new Label(450, 430, "��������", 0, 90));
	labels.push(new Label(510, 350, "kenry", 0, 60));
	labels.push(new Label(510, 190, "СĪ", 0, 60));
	
	labels.push(new Label(300, 230, "һ��", 1, 60));
	labels.push(new Label(300, 310, "elaine", 1, 60));
	labels.push(new Label(300, 350, "����", 1, 60));
	labels.push(new Label(270, 390, "�������", 1, 90));
	labels.push(new Label(230, 430, "��������", 1, 90));
	labels.push(new Label(510, 150, "��ʯ��", 0, 60));
	
	labels.push(new Label(180, 340, "��", 1, 33));
	labels.push(new Label(440, 220, "����", 0, 60));
	labels.push(new Label(430, 300, "DJ", 0, 40));
	
	
	
	
}

