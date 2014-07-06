
/*johnny�������*/
function game_5(){

	var state = 0;

	this.logic = function(){
		
		switch(state){
		case 0:
			heng.x += 5;
			if(heng.x >= 220){
				state = 1;
			}
			break;
		case 1:
			if(johnny.x >= 520){
				johnny.x -= 5;
			}else{
				if(isDownGameView()){
				state = 2;
				resetDownPointer();
			}
			}
			break;
		case 2:
			if(isDownGameView()){
				state ++;
				resetDownPointer();
			}
			break;
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
		case 10:
		case 11:
		case 12:
		case 13:
		case 14:
		case 15:
		case 16:
			if(isDownGameView()){
				state ++;
				resetDownPointer();
			}
			break;
		case 17:
			if(heng.x < johnny.x - 60){
				heng.x += 5;
			}else{
				heng.x = johnny.x - 60;
				heng.x += 5;
				johnny.x += 5;
			}
			if(heng.x >= 800){
				state ++;
			}
			break;
		case 18:
		
			break;	
				
		}
		
	}

	this.paint = function(){
		paintTitle("johnny�������");
		paintBackLevel();
		
		switch(state){
		case 0:
			heng.paint();
			break;
		case 1:
			heng.paint();
			johnny.paint();
			break;
		case 2:
			heng.paint();
			johnny.paint();
			
			var texts = ["���֣��þò�������"];
			paintSay(game_x + 460, game_y + 325, 180, 80, texts);  //johnny����--�����֣��þò�������
			break;
		case 3:
			heng.paint();
			johnny.paint();
			var texts = ["������׽���ֵܡ�", "��Υ�ˣ������æɶ�أ�"];
			paintSay(game_x + 150, game_y + 325, 190, 80, texts);  //�෢��--��׽���ֵܣ���Υ�ˡ���
			break;
		case 4:
			heng.paint();
			johnny.paint();
			
			var texts = ["���������ë���ˣ�","ÿ���������У��ٺ١���"];
			paintSay(game_x + 440, game_y + 325, 220, 80, texts);  
			break;
		case 5:
			heng.paint();
			johnny.paint();
			var texts = ["�ۣ���ë�򣬲�����", "��˵����ë��������������У�","Ů��������Ů���ǲ���ѽ��"];
			paintSay(game_x + 120, game_y + 310, 240, 105, texts);  
			break;
		case 6:
			heng.paint();
			johnny.paint();
			
			var texts = ["���ţ���ë��ȷʵ����������","�Ĺ�Ч�����ܶ������塢", "�������顢(ʡ��һ����)"];
			paintSay(game_x + 425, game_y + 310, 240, 105, texts);  
			break;
		case 7:
			heng.paint();
			johnny.paint();
			var texts = ["�����治����Ҳ��ѧ�ˡ�", "����Ӧ����ô�����أ�"];
			paintSay(game_x + 135, game_y + 315, 210, 100, texts);  
			break;
		case 8:
			heng.paint();
			johnny.paint();
			
			var texts = ["���������ģ����һ��ʼ�յĲ��ԣ�","����������ǳ����ѡ�", "", "�ؼ�ע�����㣺",
				 "1�������տգ����������ָ���ξͿ��ԡ�","2�����ֺ���ס�˵���λ��һ����"];
			paintSay(game_x + 400, game_y + 210, 305, 200, texts);  
			break;
		case 9:
			heng.paint();
			johnny.paint();
			var texts = ["Ŷ�����������ġ�", "����أ�"];
			paintSay(game_x + 135, game_y + 315, 210, 100, texts);  
			break;
		case 10:
			heng.paint();
			johnny.paint();
			
			var texts = ["��ξ�Ҫ��ϰ��Զ���ˣ�","��Զ����������ë�����Ļ�����","","��Ҫע�����㣺",
				 "1�����������ʱ��Ҫ����","", "2���Ӷ���ʱ��Ҫ��ת���������Ҫ��","û�������ת�Ļ���������С�ܶࡣ"];
			paintSay(game_x + 415, game_y + 160, 280, 255, texts);  
			break;
		case 11:
			heng.paint();
			johnny.paint();
			var texts = ["�ƺ����Ǻ��Ѷ��", "˵˵ɱ��"];
			paintSay(game_x + 135, game_y + 315, 210, 100, texts);  
			break;
		case 12:
			heng.paint();
			johnny.paint();
			
			var texts = ["ɱ���Ҫ�������£�","","1��׼��ɱ��֮ǰ�Ȳ��������ǰ���ҽ��ں�","���ٺ���ʹ����������ǰ�Ϸ���ͬʱ�ػ����ġ�","",
				 "2��ɱ��ǰ��������ɹ��Σ�����ʹ������ȫ���������","", "3������Ҫ���ɣ������ֱ�֮��Ҫ�з�϶����ɱ���",
				 "˲���ս�����ʹ��ɱ��", "","4��ɱ��ʱ�ֱ���ֱ�������Ҫ�����ܵĸߡ�"];
			paintSay(game_x + 350, game_y + 120, 405, 296, texts);  
			break;
		case 13:
			heng.paint();
			johnny.paint();
			var texts = ["�����������鷳����", "��������ʲô��"];
			paintSay(game_x + 135, game_y + 315, 210, 100, texts);  
			break;
		case 14:
			heng.paint();
			johnny.paint();
			
			var texts = ["��ë����������࣬","���������򣬸��ֲ�������","","(�ӵ������ţ���������)","",
				 "�ף�Ī�Ӻ���ȥ��ݸ���ȥ����"];
			paintSay(game_x + 410, game_y + 210, 280, 210, texts);  
			break;
		case 15:
			heng.paint();
			johnny.paint();
			var texts = ["ѽ����ݸ���õط�ѽ����", "�ߣ�һ�𰡣��Һþ�ûȥ�ˡ���"];
			paintSay(game_x + 120, game_y + 315, 240, 100, texts);  
			break;
		case 16:
			heng.paint();
			johnny.paint();
			
			var texts = ["�������ߡ���"];
			paintSay(game_x + 460, game_y + 325, 180, 80, texts);  
			break;
		case 17:
			heng.paint();
			johnny.paint();
			break;
		case 18:
			
			break;	
		}
	}
	
	
	
	var man = function(x, y, name, w){
		this.x = x; 
		this.paint = function()
		{
			context.fillStyle = "rgb(210,210,210)";
			context.fillRect(game_x + this.x, game_y + y, w, 40);
			context.fillStyle = "rgb(0,0,0)";
			context.font = "16px serif";
			context.fillText(name, game_x + this.x + 10, game_y + y + 25);
		}
	}
	
	var heng = new man(0, 450, "��", 40);
	var johnny = new man(800, 450, "Johnny", 70);
}

