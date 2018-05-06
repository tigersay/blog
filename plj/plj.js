
/*游戏逻辑*/
function plj(){

	var state = 0;//状态0，初始菜单阶段。为1，表示是拼写阶段。 2为散花阶段。 3,佐罗出现
	
	var type_pinxie = 1; //拼写类型，1表示是整体拼写，初始位置都比较随机。 2表示是有序拼写，初始位置固定某点。3是刷墙出现。4是点击出现。
	var pinxie_index = 0; //当前正在拼写的笔画，这个用于有序拼写的类型。
	
	var labels = new Array(); //组成字的笔画
	var fenmos = new Array(); //要消失的粉末
	
	this.logic = function(){
		
		
		//拼写阶段
		if(state == 1){
			
			if(type_pinxie == 1 || type_pinxie == 3 || type_pinxie == 4){
				for(var i = labels.length - 1; i >= 0; i--){
					var l = labels[i];
					l.logic();
				}
				var pinxie = checkpinxie();
				if(pinxie == true)state = 2;
			}
			else if(type_pinxie == 2){
				var l = labels[pinxie_index];
				l.logic();
				if(l.zhongxin_x == 0 && l.zhongxin_y == 0){
					if(pinxie_index < labels.length - 1){
						pinxie_index ++;
					}else{
						state = 2;
					}
				}
			}
			
		}
		if(state == 2){
			for(var i = fenmos.length - 1; i >= 0; i--){
				var l = fenmos[i];
				l.logic();
			}
			if(fenmos.length == 0 && labels.length == 0){
				state = 3;
			}
		}
		if(state == 3){
			bahuobali_x += 1;
			if(bahuobali_x > 1600){
				bahuobali_x = -1000;
			}
		}
	}

	this.paint = function(){
		
		if(state == 0){
			context.font = "bold 35px 宋体";  
			
			context.fillStyle = "black";  
            context.fillText("请点击选择：",530,120); 
            
			context.strokeRect(520, 180, 250, 60);
			context.strokeRect(520, 260, 250, 60);
			context.strokeRect(520, 340, 250, 60);
			context.strokeRect(520, 420, 250, 60);
			
            context.fillStyle = "blue";  
            context.fillText("一：混拼模式",530,220);  
            context.fillText("二：书写模式",530,300);  
            context.fillText("三：刷墙模式",530,380);  
            context.fillText("四：点击模式",530,460); 
			return;
		}
		
		
		//paint label
		var len = labels.length;
		if(state == 1 && type_pinxie == 2){
			len = pinxie_index + 1;
		}
		
		for(var i = 0; i < len;i++){
			labels[i].paint();
		}
		for(var i = fenmos.length - 1; i >= 0; i--){
			var l = fenmos[i];
			l.paint();
		}
		if(state == 2 && hastip == false){
			context.font = "bold 35px 宋体";  
            context.fillStyle = "blue";  
            context.fillText("按下鼠标试试",30,500);  
		}
		if(state == 3){
			drawImage();
			
			context.font = "bold 35px 宋体";  
            context.fillStyle = "blue";  
            context.fillText("你好，我是传说中的巴霍巴利王，",bahuobali_x + 580,250); 
            context.fillText("来电影院看我吧。。。",bahuobali_x + 580,300); 
            
            context.fillText("我是大美女！",bahuobali_x - 260,480); 
            context.fillText("你没我好看！",bahuobali_x - 260,530); 
		}
		
	}
	var hastip = false;
	var bahuobali_x = -1000; //巴霍巴利初始位置

	//定义笔画对象
	var Label = function(x1,y1,x2,y2){  
		this.x1 = x1; this.y1 = y1; 
		this.x2 = x2; this.y2 = y2; 
		
		//颜色随机
		this.color = "red";
		var temp = Math.round(Math.random() * 5);
		if(temp == 1){
			this.color = "yellow";
		}else if(temp == 2){
			this.color = "green";
		}else if(temp == 3){
			this.color = "black";
		}else if(temp == 4){
			this.color = "blue";
		}
		
		//初始位置
		if(type_pinxie == 1){
			this.zhongxin_x = Math.round(Math.random() * 1000);
			this.zhongxin_y = Math.round(Math.random() * 1000);
			
			//初始位置的左右上下设置
			var temp2 = Math.round(Math.random());
			if(temp2 == 0){
				this.zhongxin_x = 0 - this.zhongxin_x;
			}
			temp2 = Math.round(Math.random());
			if(temp2 == 0){
				this.zhongxin_y = 0 - this.zhongxin_y;
			}
		}else if(type_pinxie == 2){
			this.zhongxin_x = 3;
			this.zhongxin_y = 3;
		}else if(type_pinxie == 3){
			this.zhongxin_x = 0 - this.x2;
			this.zhongxin_y = 0 - this.y2;
		}else if(type_pinxie == 3){
			this.zhongxin_x = -100 - this.x2;
			this.zhongxin_y = -100 - this.y2;
		}
		
		
		
		//绘制
		this.paint = function(){
		   // 设置线条的颜色
	       context.strokeStyle = this.color;
	       // 设置线条的宽度
	       context.lineWidth = 5;
	       // 绘制直线
	       context.beginPath();
	       // 起点
	       context.moveTo(this.zhongxin_x + this.x1, this.zhongxin_y + this.y1);
	       // 终点
	       context.lineTo(this.zhongxin_x + this.x2, this.zhongxin_y + this.y2);
	       context.closePath();
	       context.stroke();
		}


		this.logic = function(){
			if(state == 1 && type_pinxie != 4){
				var ux = 1;
				var uy = 1;
				
				if(this.zhongxin_x < 0){
					this.zhongxin_x += ux;
				}
				if(this.zhongxin_x > 0){
					this.zhongxin_x -= ux;
				}
				if(this.zhongxin_y < 0){
					this.zhongxin_y += uy;
				}
				if(this.zhongxin_y > 0){
					this.zhongxin_y -= uy;
				}
			}
			
		}
	}
	
	var pinxie_temp4 = 0; //拼写阶段，点击模式下用来记录已经处理了多少个，当还差10个的时候直接让全部完成。

	//在鼠标点击时，开始执行下一步
	this.next = function(dx, dy){
		
		if(state == 0){
			if(isDownRect(520, 180, 250, 60)){
				state = 1;
				type_pinxie = 1;
				initLable();
			}
			if(isDownRect(520, 260, 250, 60)){
				state = 1;
				type_pinxie = 2;
				initLable();
			}
			if(isDownRect(520, 340, 250, 60)){
				state = 1;
				type_pinxie = 3;
				initLable();
			}
			if(isDownRect(520, 420, 250, 60)){
				state = 1;
				type_pinxie = 4;
				initLable();
			}
			return;
		}
		
		//点击模式
		if(state == 1 && type_pinxie == 4){
			for (var i = labels.length - 1; i > 0; i--){
				var temp = labels[i];
				if(
					(Math.abs(temp.x1 - dx) < 100 && Math.abs(temp.y1 - dy) < 100) ||
					(Math.abs(temp.x2 - dx) < 100 && Math.abs(temp.y2 - dy) < 100) || pinxie_temp4 > labels.length - 10
				){
					temp.zhongxin_x = 0;
					temp.zhongxin_y = 0;
					pinxie_temp4 ++;
				}
			}
		}
		
		if(state == 2){
			hastip = true;
		
			var count = 0;
			for (var i = labels.length - 1; i > 0; i--)
			{
				var temp = labels[i];
				if(
					(Math.abs(temp.x1 - dx) < 30 && Math.abs(temp.y1 - dy) < 30) ||
					(Math.abs(temp.x2 - dx) < 30 && Math.abs(temp.y2 - dy) < 30)
				){
					var fenmo = new Fenmo(temp.x1, temp.y1, temp.x2, temp.y2, temp.color);
					fenmos.push(fenmo);
					
					labels.splice(i,1);
					count = count + 1;
				}
			}
			//说明点击了空地，那就调用另一个方法，花洒花洒。。
			if(count < 2){
				huasa();
			}
		}
		
	};


	//花洒
	function huasa(){
		for (var i = 36; i > 0; i--)
		{
			var len = labels.length;
			
			var ran = Math.round(Math.random() * len);
			if(len < 20){
				ran = 0;
			}
			var temp = labels[ran];
			
			var fenmo = new Fenmo(temp.x1, temp.y1, temp.x2, temp.y2, temp.color);
			fenmos.push(fenmo);
			
			labels.splice(ran,1);
		}
	};

	//检查拼写完成没有
	function checkpinxie()
	{
		for (var i = labels.length - 1; i > 0; i--)
		{
			var temp = labels[i];
			if(temp.zhongxin_x != 0 || temp.zhongxin_y != 0){
				return false;
			}
		}
		return true;
	}



	//定义粉末对象
	var Fenmo = function(x1,y1,x2,y2,color){  
		this.x1 = x1; this.y1 = y1; 
		this.x2 = x2; this.y2 = y2; 
		
		this.color = color;
		
		//水平方向
		this.ux = Math.round(Math.random() * 18);
		var temp2 = Math.round(Math.random());
		if(temp2 == 0){
			this.ux = 0 - this.ux;
		}
		
		//垂直方向的初始速度
		this.uy = 0 - Math.round(Math.random() * 20);
		
		//绘制
		this.paint = function(){
		   // 设置线条的颜色
	       context.strokeStyle = this.color;
	       // 设置线条的宽度
	       context.lineWidth = 5;
	       // 绘制直线
	       context.beginPath();
	       // 起点
	       context.moveTo(this.x1, this.y1);
	       // 终点
	       context.lineTo(this.x2, this.y2);
	       context.closePath();
	       context.stroke();
		}


		this.logic = function(){
			this.x1 = this.x1 + this.ux;
			this.x2 = this.x2 + this.ux;
			this.y1 = this.y1 + this.uy;
			this.y2 = this.y2 + this.uy;
			
			this.uy = this.uy + 1;//加速度
			
			//出了屏幕
			if(this.y1 > 800 && this.y2 > 800){
				fenmos.splice(fenmos.indexOf(this),1);
			}
			
		}
	}





	var img = new Image();
	img.src="zuoluo.png";
	var img2 = new Image();
	img2.src="plj.jpg";
	  
	function drawImage() {
	  context.drawImage(img,bahuobali_x + 60,60,500,500);
	  context.drawImage(img2,bahuobali_x - 260,120,197,315);
	}





	function initLable(){



	//初始化笔画
	
	labels.push(new Label(91,63,94,62));labels.push(new Label(94,62,97,62));labels.push(new Label(97,62,102,62));
	labels.push(new Label(102,62,107,62));labels.push(new Label(107,62,111,62));labels.push(new Label(111,62,119,62));
	labels.push(new Label(119,62,129,62));labels.push(new Label(129,62,138,62));labels.push(new Label(138,62,144,62));
	labels.push(new Label(144,62,150,62));labels.push(new Label(150,62,158,62));labels.push(new Label(158,62,162,62));
	labels.push(new Label(162,62,166,62));labels.push(new Label(166,62,169,62));
	labels.push(new Label(169,62,171,62));labels.push(new Label(171,62,172,62));
	
	labels.push(new Label(129,28,129,31));labels.push(new Label(129,31,129,33));labels.push(new Label(129,33,129,36));
	labels.push(new Label(129,36,129,39));labels.push(new Label(129,39,129,42));labels.push(new Label(129,42,129,45));
	labels.push(new Label(129,45,129,49));labels.push(new Label(129,49,129,52));labels.push(new Label(129,52,129,55));
	labels.push(new Label(129,55,129,58));labels.push(new Label(129,58,129,61));labels.push(new Label(129,61,129,64));
	labels.push(new Label(129,64,129,66));labels.push(new Label(129,66,129,69));labels.push(new Label(129,69,129,70));
	labels.push(new Label(129,70,129,71));labels.push(new Label(129,71,129,73));labels.push(new Label(129,73,129,74));
	labels.push(new Label(129,74,129,75));labels.push(new Label(129,75,129,77));labels.push(new Label(129,77,129,78));
	labels.push(new Label(129,78,129,79));labels.push(new Label(129,79,129,81));labels.push(new Label(129,81,129,82));
	labels.push(new Label(129,82,129,85));labels.push(new Label(129,85,129,86));labels.push(new Label(129,86,129,87));
	labels.push(new Label(129,87,129,89));labels.push(new Label(129,89,129,90));labels.push(new Label(129,90,129,91));
	labels.push(new Label(129,91,129,92));
	
	labels.push(new Label(81,91,82,90));labels.push(new Label(82,90,83,89));labels.push(new Label(83,89,85,89));
	labels.push(new Label(85,89,88,89));labels.push(new Label(88,89,93,89));labels.push(new Label(93,89,96,88));
	labels.push(new Label(96,88,100,88));labels.push(new Label(100,88,103,88));labels.push(new Label(103,88,108,88));
	labels.push(new Label(108,88,115,88));labels.push(new Label(115,88,123,88));labels.push(new Label(123,88,131,88));
	labels.push(new Label(131,88,142,90));labels.push(new Label(142,90,150,91));labels.push(new Label(150,91,158,92));
	labels.push(new Label(158,92,165,92));labels.push(new Label(165,92,171,92));labels.push(new Label(171,92,177,92));
	labels.push(new Label(177,92,182,92));labels.push(new Label(182,92,185,92));labels.push(new Label(185,92,190,92));
	labels.push(new Label(190,92,193,92));labels.push(new Label(193,92,195,92));labels.push(new Label(195,92,198,92));
	labels.push(new Label(198,92,199,92));


	labels.push(new Label(90,116,90,117));labels.push(new Label(90,117,90,119));labels.push(new Label(90,119,90,121));
	labels.push(new Label(90,121,90,123));labels.push(new Label(90,123,91,125));labels.push(new Label(91,125,91,127));
	labels.push(new Label(91,127,92,130));labels.push(new Label(92,130,93,133));labels.push(new Label(93,133,94,137));
	labels.push(new Label(94,137,94,140));labels.push(new Label(94,140,95,144));labels.push(new Label(95,144,95,148));
	labels.push(new Label(95,148,95,150));labels.push(new Label(95,150,96,151));labels.push(new Label(86,114,88,114));
	labels.push(new Label(88,114,90,114));labels.push(new Label(90,114,93,114));labels.push(new Label(93,114,96,114));
	labels.push(new Label(96,114,99,114));labels.push(new Label(99,114,102,114));labels.push(new Label(102,114,107,114));
	labels.push(new Label(107,114,111,114));labels.push(new Label(111,114,119,114));labels.push(new Label(119,114,124,114));
	labels.push(new Label(124,114,130,114));labels.push(new Label(130,114,136,114));labels.push(new Label(136,114,142,115));
	labels.push(new Label(142,115,145,115));labels.push(new Label(145,115,148,116));labels.push(new Label(148,116,151,116));
	labels.push(new Label(151,116,153,116));labels.push(new Label(153,116,155,116));labels.push(new Label(155,116,156,117));
	labels.push(new Label(156,117,157,117));
	
	labels.push(new Label(152,112,152,115));labels.push(new Label(152,115,152,119));labels.push(new Label(152,119,152,122));
	labels.push(new Label(152,122,152,126));labels.push(new Label(152,126,152,128));labels.push(new Label(152,128,152,131));
	labels.push(new Label(152,131,152,134));labels.push(new Label(152,134,152,135));labels.push(new Label(152,135,152,136));
	labels.push(new Label(152,136,151,136));labels.push(new Label(151,136,151,137));labels.push(new Label(151,137,151,138));
	labels.push(new Label(151,138,151,139));labels.push(new Label(151,139,150,139));labels.push(new Label(150,139,150,140));
	labels.push(new Label(93,139,94,140));labels.push(new Label(94,140,95,140));labels.push(new Label(95,140,96,140));
	labels.push(new Label(96,140,98,140));labels.push(new Label(98,140,103,140));labels.push(new Label(103,140,106,140));
	labels.push(new Label(106,140,110,140));labels.push(new Label(110,140,116,140));labels.push(new Label(116,140,121,140));
	labels.push(new Label(121,140,126,141));labels.push(new Label(126,141,131,142));labels.push(new Label(131,142,134,142));
	labels.push(new Label(134,142,139,143));labels.push(new Label(139,143,141,143));labels.push(new Label(141,143,144,143));
	labels.push(new Label(144,143,145,143));labels.push(new Label(145,143,146,143));labels.push(new Label(146,143,147,143));
	labels.push(new Label(147,143,148,143));labels.push(new Label(148,143,149,143));labels.push(new Label(149,143,150,143));
	labels.push(new Label(150,143,151,143));
	
	labels.push(new Label(105,167,106,167));labels.push(new Label(106,167,108,169));labels.push(new Label(108,169,109,170));
	labels.push(new Label(109,170,111,173));labels.push(new Label(111,173,113,174));labels.push(new Label(113,174,115,177));
	labels.push(new Label(115,177,118,182));labels.push(new Label(118,182,121,187));labels.push(new Label(121,187,123,190));
	labels.push(new Label(123,190,124,192));labels.push(new Label(124,192,126,196));labels.push(new Label(126,196,126,197));
	labels.push(new Label(126,197,127,200));labels.push(new Label(127,200,128,201));labels.push(new Label(128,201,129,203));
	labels.push(new Label(151,165,150,166));labels.push(new Label(150,166,150,168));labels.push(new Label(150,168,149,170));
	labels.push(new Label(149,170,148,172));labels.push(new Label(148,172,146,176));
	labels.push(new Label(146,176,145,178));labels.push(new Label(145,178,144,181));labels.push(new Label(144,181,143,184));
	labels.push(new Label(143,184,140,189));labels.push(new Label(140,189,138,190));labels.push(new Label(138,190,138,192));
	labels.push(new Label(138,192,137,192));labels.push(new Label(137,192,137,193));labels.push(new Label(137,193,135,194));
	labels.push(new Label(135,194,134,194));labels.push(new Label(134,194,133,196));

	labels.push(new Label(72,212,72,211));labels.push(new Label(72,211,73,211));labels.push(new Label(73,211,74,211));
	labels.push(new Label(74,211,77,210));labels.push(new Label(77,210,80,209));labels.push(new Label(80,209,83,208));
	labels.push(new Label(83,208,87,208));labels.push(new Label(87,208,91,207));labels.push(new Label(91,207,97,206));
	labels.push(new Label(97,206,105,205));labels.push(new Label(105,205,115,204));labels.push(new Label(115,204,122,203));
	labels.push(new Label(122,203,130,200));labels.push(new Label(130,200,139,199));labels.push(new Label(139,199,147,199));
	labels.push(new Label(147,199,156,197));labels.push(new Label(156,197,162,197));labels.push(new Label(162,197,166,197));
	labels.push(new Label(166,197,172,196));labels.push(new Label(172,196,175,196));labels.push(new Label(175,196,177,195));
	labels.push(new Label(177,195,179,194));labels.push(new Label(179,194,180,194));
	
	labels.push(new Label(236,55,235,57));labels.push(new Label(235,57,233,60));labels.push(new Label(233,60,232,65));
	labels.push(new Label(232,65,229,68));labels.push(new Label(229,68,228,70));labels.push(new Label(228,70,226,74));
	labels.push(new Label(226,74,225,77));labels.push(new Label(225,77,224,78));labels.push(new Label(224,78,222,81));
	labels.push(new Label(222,81,222,83));labels.push(new Label(222,83,220,85));labels.push(new Label(220,85,219,87));
	labels.push(new Label(219,87,217,90));labels.push(new Label(217,90,216,92));labels.push(new Label(216,92,215,94));
	labels.push(new Label(215,94,214,95));labels.push(new Label(214,95,214,96));labels.push(new Label(214,96,213,96));
	
	
	
	
	
	//中间撇
	labels.push(new Label(250,87,250,88));labels.push(new Label(250,88,249,93));labels.push(new Label(249,93,248,96));labels.push(new Label(248,96,247,99));labels.push(new Label(247,99,246,102));labels.push(new Label(246,102,245,105));labels.push(new Label(245,105,242,109));labels.push(new Label(242,109,241,110));labels.push(new Label(241,110,240,113));labels.push(new Label(240,113,238,117));labels.push(new Label(238,117,237,120));labels.push(new Label(237,120,235,123));labels.push(new Label(235,123,233,125));labels.push(new Label(233,125,232,127));labels.push(new Label(232,127,231,128));labels.push(new Label(231,128,230,130));labels.push(new Label(230,130,228,133));labels.push(new Label(228,133,226,135));labels.push(new Label(226,135,223,138));labels.push(new Label(223,138,222,138));labels.push(new Label(222,138,222,139));labels.push(new Label(222,139,221,140));labels.push(new Label(221,140,220,142));labels.push(new Label(220,142,219,142));labels.push(new Label(219,142,219,143));
	labels.push(new Label(219,143,218,143));labels.push(new Label(218,143,217,144));labels.push(new Label(217,144,216,144));
	
	
	labels.push(new Label(270,134,269,135));labels.push(new Label(269,135,268,138));
	labels.push(new Label(268,138,265,146));labels.push(new Label(265,146,261,153));labels.push(new Label(261,153,256,161));
	labels.push(new Label(256,161,252,169));labels.push(new Label(252,169,245,181));labels.push(new Label(245,181,240,190));
	
	labels.push(new Label(240,190,233,200));labels.push(new Label(233,200,228,206));
	labels.push(new Label(228,206,225,211));labels.push(new Label(225,211,221,216));
	labels.push(new Label(221,216,217,218));labels.push(new Label(217,218,212,222));labels.push(new Label(212,222,209,225));
	labels.push(new Label(209,225,205,226));labels.push(new Label(205,226,204,227));
	labels.push(new Label(204,227,203,228));
	labels.push(new Label(203,228,202,228));labels.push(new Label(202,228,200,228));

	labels.push(new Label(329,56,329,55));labels.push(new Label(329,55,331,55));labels.push(new Label(331,55,333,54));
	labels.push(new Label(333,54,338,54));labels.push(new Label(338,54,344,53));labels.push(new Label(344,53,352,53));
	labels.push(new Label(352,53,360,53));labels.push(new Label(360,53,368,53));labels.push(new Label(368,53,380,52));
	labels.push(new Label(380,52,390,52));labels.push(new Label(390,52,404,52));labels.push(new Label(404,52,430,52));
	labels.push(new Label(430,52,441,52));labels.push(new Label(441,52,450,52));labels.push(new Label(450,52,458,54));
	labels.push(new Label(458,54,464,54));labels.push(new Label(464,54,471,54));labels.push(new Label(471,54,477,55));
	labels.push(new Label(477,55,480,55));labels.push(new Label(480,55,483,55));labels.push(new Label(483,55,484,55));
	labels.push(new Label(484,55,485,55));
	
	
	labels.push(new Label(334,82,333,83));labels.push(new Label(333,83,333,88));labels.push(new Label(333,88,333,94));
	labels.push(new Label(333,94,332,101));labels.push(new Label(332,101,330,109));labels.push(new Label(330,109,330,121));
	labels.push(new Label(330,121,329,134));labels.push(new Label(329,134,328,146));labels.push(new Label(328,146,328,159));
	labels.push(new Label(328,159,327,170));labels.push(new Label(327,170,327,178));labels.push(new Label(327,178,327,186));
	labels.push(new Label(327,186,327,194));labels.push(new Label(327,194,327,197));labels.push(new Label(327,197,327,200));
	labels.push(new Label(327,200,327,201));
	labels.push(new Label(327,201,327,202));labels.push(new Label(327,202,327,203));
	

	labels.push(new Label(336,85,338,85));labels.push(new Label(338,85,341,85));labels.push(new Label(341,85,343,84));
	labels.push(new Label(343,84,346,84));labels.push(new Label(346,84,351,84));labels.push(new Label(351,84,354,84));
	labels.push(new Label(354,84,356,84));labels.push(new Label(356,84,360,84));labels.push(new Label(360,84,362,84));
	labels.push(new Label(362,84,366,84));labels.push(new Label(366,84,369,84));labels.push(new Label(369,84,372,84));
	labels.push(new Label(372,84,373,84));labels.push(new Label(373,84,374,84));labels.push(new Label(374,84,375,84));
	labels.push(new Label(375,84,376,84));


	labels.push(new Label(376,84,376,85));labels.push(new Label(376,85,375,87));labels.push(new Label(375,87,375,89));
	labels.push(new Label(375,89,375,92));labels.push(new Label(375,92,374,95));labels.push(new Label(374,95,374,99));
	labels.push(new Label(374,99,374,102));labels.push(new Label(374,102,373,108));labels.push(new Label(373,108,373,114));
	labels.push(new Label(373,114,373,123));labels.push(new Label(373,123,373,128));labels.push(new Label(373,128,373,139));
	labels.push(new Label(373,139,373,147));labels.push(new Label(373,147,373,155));labels.push(new Label(373,155,373,161));
	labels.push(new Label(373,161,373,165));labels.push(new Label(373,165,373,170));labels.push(new Label(373,170,373,174));
	labels.push(new Label(373,174,373,179));labels.push(new Label(373,179,373,182));labels.push(new Label(373,182,374,184));
	labels.push(new Label(374,184,374,187));labels.push(new Label(374,187,374,188));labels.push(new Label(374,188,374,189));
	labels.push(new Label(374,189,374,191));


	


	labels.push(new Label(340,120,341,119));labels.push(new Label(341,119,343,119));labels.push(new Label(343,119,345,119));
	labels.push(new Label(345,119,346,119));labels.push(new Label(346,119,349,119));labels.push(new Label(349,119,352,119));
	labels.push(new Label(352,119,353,119));labels.push(new Label(353,119,356,120));labels.push(new Label(356,120,357,120));
	labels.push(new Label(357,120,359,121));labels.push(new Label(359,121,359,122));labels.push(new Label(359,122,360,122));
	labels.push(new Label(360,122,361,123));labels.push(new Label(361,123,362,123));
	labels.push(new Label(411,86,411,87));labels.push(new Label(411,87,411,93));labels.push(new Label(411,93,411,101));
	labels.push(new Label(411,101,411,109));labels.push(new Label(411,109,411,119));labels.push(new Label(411,119,411,131));
	labels.push(new Label(411,131,410,143));labels.push(new Label(410,143,409,155));labels.push(new Label(409,155,408,165));
	labels.push(new Label(408,165,407,173));labels.push(new Label(407,173,407,176));labels.push(new Label(407,176,405,181));
	labels.push(new Label(405,181,405,184));labels.push(new Label(405,184,404,187));labels.push(new Label(404,187,404,189));
	labels.push(new Label(404,189,403,190));labels.push(new Label(403,190,403,191));
	
	labels.push(new Label(414,90,415,90));labels.push(new Label(415,90,416,90));labels.push(new Label(416,90,418,90));
	labels.push(new Label(418,90,419,90));labels.push(new Label(419,90,421,88));labels.push(new Label(421,88,425,88));
	labels.push(new Label(425,88,428,88));labels.push(new Label(428,88,432,88));labels.push(new Label(432,88,437,88));
	labels.push(new Label(437,88,442,88));labels.push(new Label(442,88,447,88));labels.push(new Label(447,88,454,88));
	labels.push(new Label(454,88,463,90));labels.push(new Label(463,90,468,92));labels.push(new Label(468,92,477,93));
	labels.push(new Label(477,93,483,94));labels.push(new Label(483,94,489,95));labels.push(new Label(489,95,492,95));
	labels.push(new Label(492,95,494,95));labels.push(new Label(494,95,495,95));
	
	
	labels.push(new Label(482,96,482,100));labels.push(new Label(482,100,482,103));labels.push(new Label(482,103,482,109));
	labels.push(new Label(482,109,482,115));labels.push(new Label(482,115,482,122));labels.push(new Label(482,122,483,134));
	labels.push(new Label(483,134,484,144));labels.push(new Label(484,144,484,152));labels.push(new Label(484,152,485,159));
	labels.push(new Label(485,159,485,167));labels.push(new Label(485,167,485,175));labels.push(new Label(485,175,485,183));
	labels.push(new Label(485,183,486,188));labels.push(new Label(486,188,486,192));labels.push(new Label(486,192,486,195));
	labels.push(new Label(486,195,486,198));labels.push(new Label(486,198,486,201));

	labels.push(new Label(435,123,436,123));labels.push(new Label(436,123,438,123));labels.push(new Label(438,123,440,123));
	labels.push(new Label(440,123,444,125));labels.push(new Label(444,125,448,129));labels.push(new Label(448,129,452,130));
	labels.push(new Label(452,130,459,136));labels.push(new Label(459,136,463,138));labels.push(new Label(463,138,465,140));
	labels.push(new Label(465,140,468,142));labels.push(new Label(468,142,471,144));labels.push(new Label(471,144,473,144));
	labels.push(new Label(473,144,474,145));labels.push(new Label(474,145,476,146));labels.push(new Label(476,146,477,146));


	labels.push(new Label(611,44,611,46));labels.push(new Label(611,46,610,49));labels.push(new Label(610,49,608,55));
	labels.push(new Label(608,55,605,65));labels.push(new Label(605,65,602,74));labels.push(new Label(602,74,597,84));
	labels.push(new Label(597,84,594,92));labels.push(new Label(594,92,591,97));labels.push(new Label(591,97,588,104));
	labels.push(new Label(588,104,586,108));labels.push(new Label(586,108,583,112));labels.push(new Label(583,112,580,116));
	labels.push(new Label(580,116,579,117));labels.push(new Label(579,117,578,119));

	labels.push(new Label(580,115,581,115));labels.push(new Label(581,115,583,115));labels.push(new Label(583,115,585,119));
	labels.push(new Label(585,119,588,123));labels.push(new Label(588,123,593,129));labels.push(new Label(593,129,597,136));
	labels.push(new Label(597,136,605,144));labels.push(new Label(605,144,608,148));labels.push(new Label(608,148,614,154));
	labels.push(new Label(614,154,621,160));labels.push(new Label(621,160,626,165));labels.push(new Label(626,165,632,169));
	labels.push(new Label(632,169,636,173));labels.push(new Label(636,173,640,176));labels.push(new Label(640,176,645,178));
	labels.push(new Label(645,178,646,179));labels.push(new Label(646,179,648,181));
	labels.push(new Label(648,181,649,181));
labels.push(new Label(626,104,626,105));labels.push(new Label(626,105,626,110));labels.push(new Label(626,110,625,115));
labels.push(new Label(625,115,622,121));labels.push(new Label(622,121,617,131));labels.push(new Label(617,131,614,141));
labels.push(new Label(614,141,608,151));labels.push(new Label(608,151,603,159));labels.push(new Label(603,159,597,168));
labels.push(new Label(597,168,593,174));labels.push(new Label(593,174,586,182));labels.push(new Label(586,182,583,186));
labels.push(new Label(583,186,577,191));labels.push(new Label(577,191,573,194));labels.push(new Label(573,194,571,195));
labels.push(new Label(571,195,569,195));labels.push(new Label(569,195,568,195));

labels.push(new Label(560,98,562,97));labels.push(new Label(562,97,574,94));labels.push(new Label(574,94,584,92));
labels.push(new Label(584,92,595,90));labels.push(new Label(595,90,607,88));labels.push(new Label(607,88,620,87));
labels.push(new Label(620,87,632,84));labels.push(new Label(632,84,644,83));labels.push(new Label(644,83,654,81));
labels.push(new Label(654,81,663,80));labels.push(new Label(663,80,670,79));labels.push(new Label(670,79,674,79));
labels.push(new Label(674,79,678,78));labels.push(new Label(678,78,681,78));
labels.push(new Label(695,46,695,48));labels.push(new Label(695,48,695,51));labels.push(new Label(695,51,695,55));
labels.push(new Label(695,55,694,61));labels.push(new Label(694,61,694,67));labels.push(new Label(694,67,693,76));

labels.push(new Label(693,76,693,82));labels.push(new Label(693,82,693,88));labels.push(new Label(693,88,693,93));
labels.push(new Label(693,93,693,96));







labels.push(new Label(693,46,695,46));labels.push(new Label(695,46,699,46));
labels.push(new Label(699,46,704,46));labels.push(new Label(704,46,711,46));labels.push(new Label(711,46,716,46));
labels.push(new Label(716,46,723,46));labels.push(new Label(723,46,730,46));labels.push(new Label(730,46,734,46));
labels.push(new Label(734,46,739,46));labels.push(new Label(739,46,745,46));labels.push(new Label(745,46,748,46));
labels.push(new Label(748,46,750,46));labels.push(new Label(750,46,753,46));labels.push(new Label(753,46,754,46));
labels.push(new Label(757,46,757,48));labels.push(new Label(757,48,757,50));labels.push(new Label(757,50,755,54));
labels.push(new Label(755,54,754,61));labels.push(new Label(754,61,753,65));labels.push(new Label(753,65,752,70));
labels.push(new Label(752,70,750,78));labels.push(new Label(750,78,749,81));labels.push(new Label(749,81,749,87));
labels.push(new Label(749,87,748,91));labels.push(new Label(748,91,748,92));labels.push(new Label(748,92,748,93));
labels.push(new Label(748,93,747,95));
labels.push(new Label(690,92,690,91));labels.push(new Label(690,91,695,90));labels.push(new Label(695,90,698,89));
labels.push(new Label(698,89,704,87));labels.push(new Label(704,87,711,86));labels.push(new Label(711,86,718,84));
labels.push(new Label(718,84,726,83));labels.push(new Label(726,83,733,82));labels.push(new Label(733,82,740,81));
labels.push(new Label(740,81,744,81));labels.push(new Label(744,81,747,81));labels.push(new Label(747,81,749,80));
labels.push(new Label(749,80,750,80));labels.push(new Label(750,80,752,80));

labels.push(new Label(692,109,692,110));labels.push(new Label(692,110,692,112));labels.push(new Label(692,112,692,116));
labels.push(new Label(692,116,692,121));labels.push(new Label(692,121,692,127));labels.push(new Label(692,127,692,133));
labels.push(new Label(692,133,692,144));labels.push(new Label(692,144,690,158));labels.push(new Label(690,158,687,184));
labels.push(new Label(687,184,686,192));labels.push(new Label(686,192,684,199));labels.push(new Label(684,199,684,206));
labels.push(new Label(684,206,683,211));labels.push(new Label(683,211,682,212));labels.push(new Label(682,212,682,213));
labels.push(new Label(682,213,682,214));

labels.push(new Label(688,109,689,109));labels.push(new Label(689,109,691,109));labels.push(new Label(691,109,694,108));
labels.push(new Label(694,108,696,108));labels.push(new Label(696,108,699,108));labels.push(new Label(699,108,702,108));
labels.push(new Label(702,108,706,108));labels.push(new Label(706,108,710,108));labels.push(new Label(710,108,713,108));
labels.push(new Label(713,108,717,108));labels.push(new Label(717,108,721,108));labels.push(new Label(721,108,723,108));
labels.push(new Label(723,108,726,109));labels.push(new Label(726,109,728,109));labels.push(new Label(728,109,729,109));
labels.push(new Label(735,108,735,109));labels.push(new Label(735,109,735,112));labels.push(new Label(735,112,735,115));
labels.push(new Label(735,115,735,121));labels.push(new Label(735,121,735,129));labels.push(new Label(735,129,735,139));
labels.push(new Label(735,139,735,150));labels.push(new Label(735,150,735,160));labels.push(new Label(735,160,735,171));
labels.push(new Label(735,171,735,183));labels.push(new Label(735,183,735,191));labels.push(new Label(735,191,735,198));
labels.push(new Label(735,198,735,207));labels.push(new Label(735,207,735,210));labels.push(new Label(735,210,735,215));
labels.push(new Label(735,215,735,218));labels.push(new Label(735,218,735,220));labels.push(new Label(735,220,735,221));
labels.push(new Label(735,221,735,222));

labels.push(new Label(692,134,692,133));labels.push(new Label(692,133,695,133));labels.push(new Label(695,133,697,133));
labels.push(new Label(697,133,702,133));labels.push(new Label(702,133,705,133));labels.push(new Label(705,133,709,133));
labels.push(new Label(709,133,713,133));labels.push(new Label(713,133,716,133));labels.push(new Label(716,133,719,133));
labels.push(new Label(719,133,724,133));labels.push(new Label(724,133,728,135));labels.push(new Label(728,135,730,135));
labels.push(new Label(730,135,733,135));labels.push(new Label(733,135,734,135));labels.push(new Label(734,135,735,136));

labels.push(new Label(690,162,691,162));labels.push(new Label(691,162,692,162));labels.push(new Label(692,162,694,162));
labels.push(new Label(694,162,697,162));labels.push(new Label(697,162,701,162));labels.push(new Label(701,162,704,161));
labels.push(new Label(704,161,709,160));labels.push(new Label(709,160,715,160));labels.push(new Label(715,160,718,160));
labels.push(new Label(718,160,721,160));labels.push(new Label(721,160,725,160));labels.push(new Label(725,160,728,160));
labels.push(new Label(728,160,729,160));labels.push(new Label(729,160,730,160));labels.push(new Label(730,160,733,160));
labels.push(new Label(733,160,734,160));labels.push(new Label(734,160,735,160));


//冒号：
labels.push(new Label(817,141,822,143));labels.push(new Label(822,143,823,143));labels.push(new Label(823,143,825,145));
labels.push(new Label(825,145,828,146));labels.push(new Label(828,146,830,147));labels.push(new Label(830,147,832,148));
labels.push(new Label(832,148,833,148));labels.push(new Label(833,148,834,148));labels.push(new Label(834,148,834,149));
labels.push(new Label(814,187,817,187));labels.push(new Label(817,187,823,191));labels.push(new Label(823,191,826,193));
labels.push(new Label(826,193,831,196));labels.push(new Label(831,196,836,200));labels.push(new Label(836,200,839,202));
labels.push(new Label(839,202,841,203));labels.push(new Label(841,203,844,204));labels.push(new Label(844,204,845,204));



//节日快乐
labels.push(new Label(280,299,282,299));labels.push(new Label(282,299,288,299));labels.push(new Label(288,299,293,299));labels.push(new Label(293,299,300,299));labels.push(new Label(300,299,309,298));labels.push(new Label(309,298,317,297));labels.push(new Label(317,297,332,297));labels.push(new Label(332,297,345,296));labels.push(new Label(345,296,365,296));labels.push(new Label(365,296,412,294));labels.push(new Label(412,294,422,294));labels.push(new Label(422,294,432,294));labels.push(new Label(432,294,440,294));labels.push(new Label(440,294,445,293));labels.push(new Label(445,293,448,293));labels.push(new Label(448,293,450,293));
labels.push(new Label(333,272,333,273));labels.push(new Label(333,273,333,276));labels.push(new Label(333,276,333,279));labels.push(new Label(333,279,332,282));labels.push(new Label(332,282,331,288));labels.push(new Label(331,288,331,292));labels.push(new Label(331,292,331,299));labels.push(new Label(331,299,331,305));labels.push(new Label(331,305,331,313));labels.push(new Label(331,313,331,318));labels.push(new Label(331,318,331,323));labels.push(new Label(331,323,331,326));labels.push(new Label(331,326,331,328));labels.push(new Label(331,328,331,330));labels.push(new Label(331,330,331,333));labels.push(new Label(331,333,331,335));labels.push(new Label(331,335,331,336));labels.push(new Label(331,336,331,337));labels.push(new Label(331,337,331,338));labels.push(new Label(331,338,331,339));

labels.push(new Label(395,269,395,271));labels.push(new Label(395,271,395,275));labels.push(new Label(395,275,395,282));labels.push(new Label(395,282,394,290));labels.push(new Label(394,290,394,297));labels.push(new Label(394,297,394,302));labels.push(new Label(394,302,394,309));labels.push(new Label(394,309,393,316));labels.push(new Label(393,316,392,326));labels.push(new Label(392,326,392,330));labels.push(new Label(392,330,392,333));labels.push(new Label(392,333,392,336));labels.push(new Label(392,336,392,339));labels.push(new Label(392,339,392,341));labels.push(new Label(392,341,392,342));labels.push(new Label(392,342,392,343));
labels.push(new Label(303,347,306,347));labels.push(new Label(306,347,311,347));labels.push(new Label(311,347,317,347));labels.push(new Label(317,347,325,347));labels.push(new Label(325,347,336,348));labels.push(new Label(336,348,347,348));labels.push(new Label(347,348,360,348));labels.push(new Label(360,348,375,348));labels.push(new Label(375,348,389,349));labels.push(new Label(389,349,405,349));labels.push(new Label(405,349,420,350));labels.push(new Label(420,350,432,351));labels.push(new Label(432,351,444,353));labels.push(new Label(444,353,454,356));labels.push(new Label(454,356,464,357));labels.push(new Label(464,357,470,358));labels.push(new Label(470,358,473,358));labels.push(new Label(473,358,474,358));labels.push(new Label(474,358,476,358));
labels.push(new Label(457,358,457,359));labels.push(new Label(457,359,457,362));labels.push(new Label(457,362,457,365));labels.push(new Label(457,365,455,371));labels.push(new Label(455,371,453,376));labels.push(new Label(453,376,452,379));labels.push(new Label(452,379,451,383));labels.push(new Label(451,383,450,387));labels.push(new Label(450,387,448,390));labels.push(new Label(448,390,447,393));labels.push(new Label(447,393,447,398));labels.push(new Label(447,398,447,401));labels.push(new Label(447,401,447,403));labels.push(new Label(447,403,447,404));labels.push(new Label(447,404,447,405));labels.push(new Label(447,405,446,405));
labels.push(new Label(371,358,371,361));labels.push(new Label(371,361,371,366));labels.push(new Label(371,366,369,374));labels.push(new Label(369,374,368,384));labels.push(new Label(368,384,367,394));labels.push(new Label(367,394,365,403));labels.push(new Label(365,403,364,416));labels.push(new Label(364,416,361,435));labels.push(new Label(361,435,359,448));labels.push(new Label(359,448,357,460));labels.push(new Label(357,460,357,472));labels.push(new Label(357,472,356,480));labels.push(new Label(356,480,356,488));labels.push(new Label(356,488,356,496));labels.push(new Label(356,496,356,502));labels.push(new Label(356,502,356,506));labels.push(new Label(356,506,356,508));labels.push(new Label(356,508,356,510));
labels.push(new Label(561,287,561,290));labels.push(new Label(561,290,561,295));labels.push(new Label(561,295,561,326));labels.push(new Label(561,326,561,340));labels.push(new Label(561,340,562,390));labels.push(new Label(562,390,563,404));labels.push(new Label(563,404,563,428));labels.push(new Label(563,428,563,438));labels.push(new Label(563,438,563,443));labels.push(new Label(563,443,563,447));labels.push(new Label(563,447,563,450));labels.push(new Label(563,450,563,451));labels.push(new Label(563,451,563,453));
labels.push(new Label(564,294,564,293));labels.push(new Label(564,293,568,292));labels.push(new Label(568,292,574,291));labels.push(new Label(574,291,580,290));labels.push(new Label(580,290,585,289));labels.push(new Label(585,289,593,288));labels.push(new Label(593,288,602,286));labels.push(new Label(602,286,615,286));labels.push(new Label(615,286,622,286));labels.push(new Label(622,286,633,286));labels.push(new Label(633,286,638,286));labels.push(new Label(638,286,641,286));labels.push(new Label(641,286,643,287));labels.push(new Label(643,287,645,288));labels.push(new Label(645,288,646,288));
labels.push(new Label(643,282,643,283));labels.push(new Label(643,283,643,287));labels.push(new Label(643,287,643,290));labels.push(new Label(643,290,643,297));labels.push(new Label(643,297,643,307));labels.push(new Label(643,307,644,319));labels.push(new Label(644,319,644,334));labels.push(new Label(644,334,644,347));labels.push(new Label(644,347,644,367));labels.push(new Label(644,367,644,382));labels.push(new Label(644,382,644,400));labels.push(new Label(644,400,644,415));labels.push(new Label(644,415,644,429));labels.push(new Label(644,429,644,437));labels.push(new Label(644,437,644,445));labels.push(new Label(644,445,644,451));labels.push(new Label(644,451,644,456));labels.push(new Label(644,456,644,459));labels.push(new Label(644,459,644,461));
labels.push(new Label(558,363,559,363));labels.push(new Label(559,363,562,363));labels.push(new Label(562,363,566,362));labels.push(new Label(566,362,572,362));labels.push(new Label(572,362,577,362));labels.push(new Label(577,362,585,362));labels.push(new Label(585,362,592,362));labels.push(new Label(592,362,601,362));labels.push(new Label(601,362,608,362));labels.push(new Label(608,362,619,362));labels.push(new Label(619,362,625,363));labels.push(new Label(625,363,628,364));labels.push(new Label(628,364,632,364));labels.push(new Label(632,364,635,365));labels.push(new Label(635,365,636,365));labels.push(new Label(636,365,637,366));
labels.push(new Label(565,445,566,444));labels.push(new Label(566,444,568,443));labels.push(new Label(568,443,571,443));labels.push(new Label(571,443,576,443));labels.push(new Label(576,443,584,443));labels.push(new Label(584,443,590,443));labels.push(new Label(590,443,596,443));labels.push(new Label(596,443,602,442));labels.push(new Label(602,442,610,442));labels.push(new Label(610,442,616,442));labels.push(new Label(616,442,620,442));labels.push(new Label(620,442,623,443));labels.push(new Label(623,443,626,444));labels.push(new Label(626,444,629,445));labels.push(new Label(629,445,632,446));labels.push(new Label(632,446,634,446));labels.push(new Label(634,446,635,447));labels.push(new Label(635,447,636,447));

labels.push(new Label(773,273,773,276));labels.push(new Label(773,276,772,281));labels.push(new Label(772,281,772,286));labels.push(new Label(772,286,772,294));labels.push(new Label(772,294,770,304));labels.push(new Label(770,304,770,316));labels.push(new Label(770,316,768,327));labels.push(new Label(768,327,766,340));labels.push(new Label(766,340,764,357));labels.push(new Label(764,357,763,369));labels.push(new Label(763,369,760,383));labels.push(new Label(760,383,758,393));labels.push(new Label(758,393,756,404));labels.push(new Label(756,404,755,415));labels.push(new Label(755,415,753,423));labels.push(new Label(753,423,751,441));labels.push(new Label(751,441,750,444));labels.push(new Label(750,444,750,449));labels.push(new Label(750,449,749,451));labels.push(new Label(749,451,749,452));labels.push(new Label(749,452,749,453));
labels.push(new Label(752,341,751,341));labels.push(new Label(751,341,749,343));labels.push(new Label(749,343,748,346));labels.push(new Label(748,346,744,349));labels.push(new Label(744,349,741,353));labels.push(new Label(741,353,737,358));labels.push(new Label(737,358,733,360));labels.push(new Label(733,360,727,364));labels.push(new Label(727,364,725,366));labels.push(new Label(725,366,723,368));labels.push(new Label(723,368,719,371));labels.push(new Label(719,371,718,372));labels.push(new Label(718,372,717,373));labels.push(new Label(717,373,714,374));labels.push(new Label(714,374,713,375));
labels.push(new Label(799,338,799,339));labels.push(new Label(799,339,799,341));labels.push(new Label(799,341,800,345));labels.push(new Label(800,345,802,352));labels.push(new Label(802,352,804,358));labels.push(new Label(804,358,805,364));labels.push(new Label(805,364,808,372));labels.push(new Label(808,372,808,378));labels.push(new Label(808,378,809,381));labels.push(new Label(809,381,811,386));labels.push(new Label(811,386,811,388));labels.push(new Label(811,388,813,389));labels.push(new Label(813,389,813,390));
labels.push(new Label(843,299,845,298));labels.push(new Label(845,298,848,298));labels.push(new Label(848,298,854,296));labels.push(new Label(854,296,861,295));labels.push(new Label(861,295,868,295));labels.push(new Label(868,295,876,295));labels.push(new Label(876,295,888,293));labels.push(new Label(888,293,896,293));labels.push(new Label(896,293,901,293));labels.push(new Label(901,293,907,293));labels.push(new Label(907,293,911,293));labels.push(new Label(911,293,913,293));labels.push(new Label(913,293,914,293));labels.push(new Label(914,293,916,293));labels.push(new Label(916,293,916,294));
labels.push(new Label(913,292,913,294));labels.push(new Label(913,294,913,297));labels.push(new Label(913,297,914,308));labels.push(new Label(914,308,914,314));labels.push(new Label(914,314,915,337));labels.push(new Label(915,337,915,343));labels.push(new Label(915,343,916,350));labels.push(new Label(916,350,916,351));labels.push(new Label(916,351,916,352));
labels.push(new Label(829,350,831,350));labels.push(new Label(831,350,834,349));labels.push(new Label(834,349,838,348));labels.push(new Label(838,348,845,347));labels.push(new Label(845,347,850,347));labels.push(new Label(850,347,857,347));labels.push(new Label(857,347,868,347));labels.push(new Label(868,347,885,347));labels.push(new Label(885,347,893,347));labels.push(new Label(893,347,906,347));labels.push(new Label(906,347,916,347));labels.push(new Label(916,347,921,347));labels.push(new Label(921,347,927,347));labels.push(new Label(927,347,931,347));labels.push(new Label(931,347,933,347));labels.push(new Label(933,347,934,347));labels.push(new Label(934,347,935,347));

labels.push(new Label(875,261,876,264));labels.push(new Label(876,264,876,270));labels.push(new Label(876,270,876,278));labels.push(new Label(876,278,875,289));labels.push(new Label(875,289,873,301));labels.push(new Label(873,301,871,313));labels.push(new Label(871,313,871,329));labels.push(new Label(871,329,869,347));labels.push(new Label(869,347,869,359));labels.push(new Label(869,359,869,368));labels.push(new Label(869,368,868,376));labels.push(new Label(868,376,867,384));labels.push(new Label(867,384,865,393));labels.push(new Label(865,393,864,401));labels.push(new Label(864,401,859,409));labels.push(new Label(859,409,857,415));labels.push(new Label(857,415,853,422));labels.push(new Label(853,422,849,430));labels.push(new Label(849,430,844,437));labels.push(new Label(844,437,841,440));labels.push(new Label(841,440,839,444));labels.push(new Label(839,444,836,446));labels.push(new Label(836,446,835,448));labels.push(new Label(835,448,833,449));labels.push(new Label(833,449,831,452));labels.push(new Label(831,452,830,452));labels.push(new Label(830,452,830,453));labels.push(new Label(830,453,829,454));labels.push(new Label(829,454,828,454));labels.push(new Label(828,454,827,454));

labels.push(new Label(872,359,873,359));labels.push(new Label(873,359,874,360));labels.push(new Label(874,360,876,362));labels.push(new Label(876,362,881,367));labels.push(new Label(881,367,890,376));labels.push(new Label(890,376,900,385));labels.push(new Label(900,385,912,395));labels.push(new Label(912,395,921,406));labels.push(new Label(921,406,931,416));labels.push(new Label(931,416,941,426));labels.push(new Label(941,426,948,432));labels.push(new Label(948,432,957,441));labels.push(new Label(957,441,965,447));labels.push(new Label(965,447,972,455));labels.push(new Label(972,455,977,459));labels.push(new Label(977,459,980,461));labels.push(new Label(980,461,984,464));

labels.push(new Label(1164,229,1163,232));labels.push(new Label(1163,232,1160,235));labels.push(new Label(1160,235,1154,239));labels.push(new Label(1154,239,1148,244));labels.push(new Label(1148,244,1140,249));labels.push(new Label(1140,249,1131,254));labels.push(new Label(1131,254,1122,258));labels.push(new Label(1122,258,1111,264));labels.push(new Label(1111,264,1102,267));labels.push(new Label(1102,267,1091,272));labels.push(new Label(1091,272,1080,277));labels.push(new Label(1080,277,1070,280));labels.push(new Label(1070,280,1063,283));labels.push(new Label(1063,283,1056,285));labels.push(new Label(1056,285,1049,288));labels.push(new Label(1049,288,1046,290));labels.push(new Label(1046,290,1044,290));labels.push(new Label(1044,290,1043,290));labels.push(new Label(1043,290,1042,290));

labels.push(new Label(1045,288,1045,289));labels.push(new Label(1045,289,1045,290));labels.push(new Label(1045,290,1045,299));labels.push(new Label(1045,299,1045,307));labels.push(new Label(1045,307,1045,320));labels.push(new Label(1045,320,1045,331));labels.push(new Label(1045,331,1045,351));labels.push(new Label(1045,351,1045,360));labels.push(new Label(1045,360,1045,367));labels.push(new Label(1045,367,1045,372));labels.push(new Label(1045,372,1045,375));labels.push(new Label(1045,375,1045,380));labels.push(new Label(1045,380,1045,381));labels.push(new Label(1045,381,1045,383));
labels.push(new Label(1046,368,1046,367));labels.push(new Label(1046,367,1047,367));labels.push(new Label(1047,367,1055,366));labels.push(new Label(1055,366,1061,364));labels.push(new Label(1061,364,1069,363));labels.push(new Label(1069,363,1076,362));labels.push(new Label(1076,362,1086,362));labels.push(new Label(1086,362,1098,361));labels.push(new Label(1098,361,1112,361));labels.push(new Label(1112,361,1128,361));labels.push(new Label(1128,361,1143,361));labels.push(new Label(1143,361,1155,361));labels.push(new Label(1155,361,1167,361));labels.push(new Label(1167,361,1180,361));labels.push(new Label(1180,361,1191,361));labels.push(new Label(1191,361,1201,361));labels.push(new Label(1201,361,1208,361));labels.push(new Label(1208,361,1212,361));labels.push(new Label(1212,361,1214,361));labels.push(new Label(1214,361,1215,361));


labels.push(new Label(1122,282,1122,295));labels.push(new Label(1122,295,1122,311));labels.push(new Label(1122,311,1122,329));labels.push(new Label(1122,329,1122,343));labels.push(new Label(1122,343,1122,361));labels.push(new Label(1122,361,1122,403));labels.push(new Label(1122,403,1121,420));labels.push(new Label(1121,420,1120,437));labels.push(new Label(1120,437,1120,449));labels.push(new Label(1120,449,1119,460));labels.push(new Label(1119,460,1119,469));labels.push(new Label(1119,469,1119,476));labels.push(new Label(1119,476,1119,479));labels.push(new Label(1119,479,1119,481));labels.push(new Label(1119,481,1119,483));
labels.push(new Label(1094,391,1093,391));labels.push(new Label(1093,391,1092,392));labels.push(new Label(1092,392,1089,396));labels.push(new Label(1089,396,1089,399));labels.push(new Label(1089,399,1086,405));labels.push(new Label(1086,405,1083,408));labels.push(new Label(1083,408,1078,416));labels.push(new Label(1078,416,1074,422));labels.push(new Label(1074,422,1071,425));labels.push(new Label(1071,425,1069,427));labels.push(new Label(1069,427,1063,432));labels.push(new Label(1063,432,1059,436));labels.push(new Label(1059,436,1056,439));labels.push(new Label(1056,439,1052,441));labels.push(new Label(1052,441,1048,444));labels.push(new Label(1048,444,1044,446));labels.push(new Label(1044,446,1041,449));labels.push(new Label(1041,449,1036,450));labels.push(new Label(1036,450,1033,452));labels.push(new Label(1033,452,1032,453));labels.push(new Label(1032,453,1030,453));

labels.push(new Label(1147,390,1149,390));labels.push(new Label(1149,390,1156,393));labels.push(new Label(1156,393,1160,397));labels.push(new Label(1160,397,1163,400));labels.push(new Label(1163,400,1168,406));labels.push(new Label(1168,406,1172,409));labels.push(new Label(1172,409,1182,419));labels.push(new Label(1182,419,1185,423));labels.push(new Label(1185,423,1189,426));labels.push(new Label(1189,426,1193,431));labels.push(new Label(1193,431,1199,437));labels.push(new Label(1199,437,1204,441));labels.push(new Label(1204,441,1206,443));labels.push(new Label(1206,443,1208,446));labels.push(new Label(1208,446,1210,446));labels.push(new Label(1210,446,1212,449));


//感叹号
labels.push(new Label(1317,296,1316,297));labels.push(new Label(1316,297,1316,305));labels.push(new Label(1316,305,1315,309));labels.push(new Label(1315,309,1314,317));labels.push(new Label(1314,317,1313,325));labels.push(new Label(1313,325,1311,333));labels.push(new Label(1311,333,1310,342));labels.push(new Label(1310,342,1307,351));labels.push(new Label(1307,351,1306,359));labels.push(new Label(1306,359,1305,368));labels.push(new Label(1305,368,1303,375));labels.push(new Label(1303,375,1303,381));labels.push(new Label(1303,381,1302,388));labels.push(new Label(1302,388,1302,394));labels.push(new Label(1302,394,1300,402));labels.push(new Label(1300,402,1300,408));labels.push(new Label(1300,408,1299,413));labels.push(new Label(1299,413,1298,417));labels.push(new Label(1298,417,1298,420));labels.push(new Label(1298,420,1297,425));labels.push(new Label(1297,425,1297,428));labels.push(new Label(1297,428,1297,429));labels.push(new Label(1297,429,1296,430));labels.push(new Label(1296,430,1296,431));
labels.push(new Label(1294,454,1294,455));labels.push(new Label(1294,455,1294,456));labels.push(new Label(1294,456,1294,457));labels.push(new Label(1294,457,1294,458));labels.push(new Label(1294,458,1295,459));labels.push(new Label(1295,459,1295,460));labels.push(new Label(1295,460,1295,461));

}


}

