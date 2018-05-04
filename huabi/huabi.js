
/*画笔游戏逻辑*/
function huabi(){

	var labels = new Array();
	
	this.logic = function(){
		for(var i = labels.length - 1; i >= 0; i--){
			var l = labels[i];
			l.logic();
		}
		
	}

	this.paint = function(){
		//paint label
		for(var i = 0; i < labels.length;i++){
			labels[i].paint();
		}
	}
	

	//定义笔画对象
	var Label = function(x1,y1,x2,y2){  
		this.x1 = x1; this.y1 = y1; 
		this.x2 = x2; this.y2 = y2; 
		//js好奇怪，如果上面这一行不注释掉，在下面的代码里，x和this.x所指示的将不是同一个对象，，不小心就会出错。。
		
		this.paint = function(){
		   // 设置线条的颜色
	       context.strokeStyle = 'red';
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
			
		}
	}

	
	
	//在鼠标拖拽时，添加线段
	this.add = function(a,b,c,d){
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		labels.push(new Label(this.a, this.b, this.c, this.d));
	}
	
}

