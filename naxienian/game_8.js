
/*二花要喝酒*/
function game_8(){

	var state = 0;
	var jius = new Array();

	this.logic = function(){
		for(var i = 0; i < jius.length;i++){
			var l = jius[i];
			l.logic();
		}
		for(var i = 0; i < zhongs.length;i++){
			var z = zhongs[i];
			z.logic();
		}
		
		//拖拽酒盅
		if(drag_zhong != null){
			drag_zhong.x += (mx - lmx);
			drag_zhong.y += (my - lmy);			
			lmx = mx;
			lmy = my;  //在这里设置上一次拖动处理的位置。
			if(isUpRect(game_x , game_y , game_w, game_h)){
					drag_zhong = null;
			}
		}
		
		switch(state){
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
			if(isDownGameView()){
				state ++;
				resetDownPointer();
			}
			break;
		case 6:
			if(isDownGameView()){
				state ++;
				resetDownPointer();
				hua.x = - 70;
				qi.x = 800;
				hua.y = 360;
				qi.y = 360;
			}
			break;
		case 7:
			if(hua.x < 330)hua.x += 5;
			if(qi.x > 420)qi.x -= 5;
			if(yu.x < 230)yu.x += 5;
			if(tiger.x > 520)tiger.x -= 5;
			if(banfeng.x < 330)banfeng.x += 5;
			if(longshu.x > 420)longshu.x -= 5;
			if(isDownGameView()){
				if(hua.x >= 330 && qi.x >= 420 && yu.x >= 230 && tiger.x <= 520 && banfeng.x >= 330 && longshu.x <= 420)state ++;
				resetDownPointer();
			}
			break;
		case 8:  //小燕子出现
			if(xiaoyanzi.x < 75)xiaoyanzi.x += 5;
			if(isDownGameView() && xiaoyanzi.x >= 75){
				state ++;
				resetDownPointer();
			}
			break;
		case 9:
			if(isDownGameView()){
				state ++;
				resetDownPointer();
			}
			break;
		case 10:
			if(isDownGameView()){
				state ++;
				resetDownPointer();
				showZhong();
			}
			break;
		case 11:
			if(isDownGameView()){
				state ++;
				resetDownPointer();
				showJiu();
				
				//state = 15;
			}
			break;
		case 12:
			jiu_buchong(); //酒的补充机制
			for(var i = 0; i < mans.length;i++){
				var m = mans[i];
				if(m.zuile() == false)return;
			}
			state ++;	//六个人都醉了以后，进入到下一状态，小燕子继续出现。。
			zhongs[0].x = 20; 
			zhongs[1].x = 20; 
			zhongs[2].x = 20; 
			zhongs[0].y = 200; 
			zhongs[1].y = 230; 
			zhongs[2].y = 260; 
			break;
		case 13:
			if(xiaoyanzi.x < 75)xiaoyanzi.x += 5;
			if(xiaoyanzi.x >= 75 && isDownGameView()){
				state ++;
				resetDownPointer();
			}
			break;
		case 14:
			if(isDownGameView()){
				state ++;
				resetDownPointer();
			}
			break;
		case 15:
			jiu_buchong(); //酒的补充机制
			zhongs[1].x = 100; 
			zhongs[1].y = 100; 
			if(xiaoyanzi.zuile()){
				zhongs[1].x = 20; 
				zhongs[1].y = 230;
				state ++;
				resetDownPointer();
			}
			break;
		case 16:
		case 18:
			if(isDownGameView()){
				state ++;
				resetDownPointer();
			}
			break;
		case 17:
			if(tiger.jiu > 0)tiger.jiu --;
			if(tiger.jiu == 0 && isDownGameView()){
				state ++;
				resetDownPointer();
			}
			break;
		}
		
	}

	this.paint = function(){
		for(var i = 0; i < jius.length;i++){
			var l = jius[i];
			l.paint();
		}
		
		for(var i = 0; i < zhongs.length;i++){
			var z = zhongs[i];
			z.paint();
		}
		
		
		switch(state){
		case 0:
			hua.paint();
			qi.paint();
			break;
		case 1:
			hua.paint();
			qi.paint();
			var texts = ["二花，过来夜宵。"];
			paintSay(game_x + 460, game_y + 325, 180, 80, texts);  
			break;
		case 2:
			hua.paint();
			qi.paint();
			var texts = ["这都半夜一点了。", "我准备睡了。。"];
			paintSay(game_x + 150, game_y + 325, 190, 80, texts); 
			break;
		case 3:
			hua.paint();
			qi.paint();
			var texts = ["来嘛，哥想喝酒了。", "烤鱼老地方，快点。。"];
			paintSay(game_x + 460, game_y + 325, 180, 80, texts);  
			break;
		case 4:
			hua.paint();
			qi.paint();
			var texts = ["好..", "我现在打车过去.", "你喊下另外几个。"];
			paintSay(game_x + 150, game_y + 300, 190, 100, texts); 
			break;
		case 5:
			hua.paint();
			qi.paint();
			var texts = ["(继续电话喊人。。)"];
			paintSay(game_x + 460, game_y + 325, 180, 80, texts);  
			break;
		case 6:
			paintTable();
			break;
		case 7:
			paintTable();
			hua.paint();
			qi.paint();
			yu.paint();
			longshu.paint();
			banfeng.paint();
			tiger.paint();
			break;
		case 8:
			paintTable();
			paintMan();
			xiaoyanzi.paint();
			break;
		case 9:
			paintTable();
			paintMan();
			xiaoyanzi.paint();
			var texts = ["这帮酒鬼。。", "又开始了。。"];
			paintSay(game_x + 50, game_y + 420, 120, 80, texts);  
			break;
		case 10:
			paintTable();
			paintMan();
			xiaoyanzi.paint();
			var texts = ["小燕子，我们要喝酒！！！"];
			paintSay(game_x + 300, game_y + 100, 210, 60, texts);  
			break;
		case 11:
			paintTable();
			paintMan();
			xiaoyanzi.paint();
			var texts = ["(拖动上面的酒盅)", "(给他们灌酒吧。。)", "我去给你们做个拍青瓜。。"];
			paintSay(game_x + 10, game_y + 400, 200, 100, texts);  
			break;
		case 12:
			paintTable();
			paintMan();
			if(xiaoyanzi.x > - 80){
				xiaoyanzi.paint();
				xiaoyanzi.x -= 4;
			}
			break;
		case 13:
			paintTable();
			paintMan();
			xiaoyanzi.paint();
			break;
		case 14:
			paintTable();
			paintMan();
			xiaoyanzi.paint();
			var texts = ["呀，全都醉了。", "我都还没喝呢。"];
			paintSay(game_x + 50, game_y + 420, 130, 80, texts);  
			break;
		case 15:
			paintTable();
			paintMan();
			xiaoyanzi.paint();
			break;
		case 16:
			paintTable();
			paintMan();
			xiaoyanzi.paint();
			
			context.font = "15px serif";
			context.fillText("所有人都醉了..", game_x + 300, game_y + 475);
			context.fillText("这时，木生火部长从旁边经过..", game_x + 300, game_y + 495);
			break;
		case 17:
			paintTable();
			paintMan();
			xiaoyanzi.paint();
			
			context.font = "15px serif";
			context.fillText("tiger, 一下酒醒了..", game_x + 300, game_y + 475);
			break;
		case 18:
			paintTable();
			paintMan();
			xiaoyanzi.paint();
			
			context.font = "15px serif";
			context.fillText("众人皆醉我独醒！", game_x + 300, game_y + 475);
			break;
		case 19:
			paintTable();
			paintMan();
			xiaoyanzi.paint();
			
			context.font = "15px serif";
			context.fillText("从此,江湖上流传着..", game_x + 300, game_y + 475);
			context.fillText("tiger灌倒了一桌子的传奇..", game_x + 300, game_y + 495);
			
			paintBackLevel();
			break;
		}
	}


	function paintMan(){
		hua.paint();
		qi.paint();
		yu.paint();
		longshu.paint();
		banfeng.paint();
		tiger.paint();
		
	}

	
	function paintTable(){
		context.fillStyle = "rgb(0,0,0)";
		context.strokeRect(game_x + 300, game_y + 250, 200, 100);
		if(state == 6 || state == 7){
			context.font = "18px serif";
			context.fillText("湖边烤鱼", game_x + 360, game_y + 305);
		}
	}
	
	
	
	var man = function(x, y, name, w, jiuliang){
		this.x = x; 
		this.y = y;
		this.w = w;
		this.jiu = 0;
		
		var temp = 0;
		
		this.hejiu = function()
		{
			if(this.jiu < 40){
				temp ++;
				this.jiu = temp / jiuliang;
			}
		}
		
		this.paint = function()
		{
			context.fillStyle = "rgb(210,210,210)";
			context.fillRect(game_x + this.x, game_y + this.y, w, 40);
			context.fillStyle = "rgb(110,110,110)";
			context.fillRect(game_x + this.x, game_y + this.y + 40 - this.jiu, w, this.jiu);
			context.fillStyle = "rgb(0,0,0)";
			context.font = "16px serif";
			context.fillText(name, game_x + this.x + 10, game_y + this.y + 25);
		}
		this.zuile = function(){
			return this.jiu >= 40;
		}
	}
	
	var hua = new man(220, 450, "Lee", 50, 1);
	var qi = new man(520, 450, "Bliss7", 70, 1);
	var banfeng = new man(-70, 200, "半疯", 60, 1);
	var longshu = new man(800, 200, "龙叔", 60, 1);
	var yu = new man(-70, 280, "虞", 50, 1);
	var tiger = new man(800, 280, "tiger", 60, 1);
	var xiaoyanzi = new man(-70, 540, "小燕子", 70, 1);
	
	var mans = [hua,qi,banfeng,longshu,yu,tiger];
	
	
	var Jiu = function(x, y, jiaodu){
		this.x = x;
		this.y = y;
		this.jiaodu = jiaodu;
		this.sudu = 4;
		
		var lx = 0, ly = 0;
		
		this.hasIn = false;
		
		this.logic = function(){
			
			if(this.x > 0 && this.y >= 0)this.hasIn = true;
			//如果进入过游戏屏幕，并且当前跑出了游戏区域，则删除掉它
			if(this.hasIn && isPointInRect(this.x, this.y , 0, 0, game_w + 10, game_h + 10) == false){
				jius.splice(jius.indexOf(this),1);
				return;
			}
			//如果碰到了酒盅，反射之
			if(isPointInRect(this.x, this.y , zhongs[0].x, zhongs[0].y, 60, 20))
			{
				this.jiaodu = 0 - this.jiaodu;
			}
			if(isPointInRect(this.x, this.y , zhongs[1].x, zhongs[1].y, 60, 20))
			{
				this.jiaodu = Math.PI / 2;
			}
			if(isPointInRect(this.x, this.y , zhongs[2].x, zhongs[2].y, 60, 20))
			{
				this.jiaodu =  Math.PI * 7 / 4;
			}
			//如果碰到了人
			for(var i = 0; i < mans.length; i++){
				if(isPointInRect(this.x, this.y, mans[i].x, mans[i].y, mans[i].w, 40)){
					mans[i].hejiu();
					jius.splice(jius.indexOf(this),1);
					return;
				}
			}
			if(state == 15 && isPointInRect(this.x, this.y, xiaoyanzi.x, xiaoyanzi.y, xiaoyanzi.w, 40)){
				xiaoyanzi.hejiu();
				jius.splice(jius.indexOf(this),1);
				return;
			}
			
			lx = this.x;
			ly = this.y;
			this.x += this.sudu * Math.cos(this.jiaodu);
			this.y += this.sudu * Math.sin(this.jiaodu);
		}
		
		this.paint = function(){
			if(this.x < 0 || this.y < 0)return;
			context.fillStyle = "rgb(210,210,210)";
			drawLine(game_x + lx, game_y + ly, game_x + this.x, game_y + this.y);
		}
	}
	
	
	
	function showJiu(){
		for (var index = 0; index < 30; index++) {
			jius.push(new Jiu(0 - 10 * index, 0 - 10 * index, Math.PI / 4));
		}
	}
	//酒的补充机制
	function jiu_buchong()
	{
		if(jius.length <= 10){
			for (var index = 0; index < 60 ; index ++) {
				jius.push(new Jiu(0 - 10 * index, 0 - 10 * index, Math.PI / 4));
			}
		}
	}
	
	var drag_zhong ;
	
	var Zhong = function(x, y, index){
		this.x = x;
		this.y = y;
		this.index = index;
		
		this.logic = function(){
			if(isDownRect(game_x + this.x, game_y + this.y, 60, 20)){ 
				drag_zhong = this;
				lmx = dx;
				lmy = dy;
				resetDownPointer();
				resetUpPointer();
			}
		}
		
		this.paint = function(){
			if(index == 0)context.fillStyle = "rgb(150,50,50)";
			if(index == 1)context.fillStyle = "rgb(50,150,50)";
			if(index == 2)context.fillStyle = "rgb(50,50,150)";
			context.fillRect(game_x + this.x, game_y + this.y, 60, 20);
		}
	}
	
	var zhongs = new Array();
	
	function showZhong(){
		zhongs.push(new Zhong(20, 200, 0));
		zhongs.push(new Zhong(20, 230, 1));
		zhongs.push(new Zhong(20, 260, 2));
	}
	
}

