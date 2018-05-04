
/*
* 画直线
*/
function drawLine(x1,y1,x2,y2){
	context.beginPath();
	context.moveTo(x1,y1);
	context.lineTo(x2,y2);
	context.closePath();
	context.stroke();
}


/*
* 画对号 --- 传的参数是底点坐标
*/
function drawDui(x,y){
	context.beginPath();
	context.moveTo(x,y);
	context.lineTo(x - 30, y - 30);
	context.moveTo(x,y);
	context.lineTo(x + 60, y - 30);
	context.closePath();
	context.stroke();
}

/*
* 画错号 --- 传的参数是第一个底点坐标
*/
function drawCuo(x,y){
	context.beginPath();
	context.moveTo(x,y);
	context.lineTo(x + 50, y - 50);
	context.moveTo(x + 50,y);
	context.lineTo(x , y - 50);
	context.closePath();
	context.stroke();
}

/*
* 判断某个点是否在某个矩形内
*/
function isPointInRect(px,py, rx,ry,rw,rh){
	if(px >= rx && px <= rx + rw && py >= ry && py <= ry + rh){return true;}
	return false;
}

/*
* 填充一个圆
*/
function fillArc(x,y,r){
	context.beginPath();
	context.arc(x, y, r, 0, Math.PI * 2, false);
	context.closePath();
	context.fill();
}

/*
* 画一个圆
*/
function drawArc(x,y,r){
	context.beginPath();
	context.arc(x, y, r, 0, Math.PI * 2, false);
	context.closePath();
	context.stroke();
}

//判断点是否在圆内，ax、ay是圆心
function isPointInArc(px,py,ax,ay,ar)
{
	return (px - ax) * (px - ax) + (py - ay) * (py - ay) < ar * ar;
}

//判断方块是否在圆内，px、py是矩形左上角, ax、ay是圆心
function isRectInArc(px,py,pw,ph,ax,ay,ar)
{
	if(isPointInArc(px,py,ax,ay,ar) == false)return false;
	if(isPointInArc(px + pw,py + ph,ax,ay,ar) == false)return false;
	if(isPointInArc(px,py + ph,ax,ay,ar) == false)return false;
	if(isPointInArc(px + pw,py,ax,ay,ar) == false)return false;
	return true;
}

	/*画一个说话的框，有箭头指向下方的说话人*/
	function paintKuang(x, y, w, h){
		context.beginPath();
		context.moveTo(x,y);
		context.lineTo(x + w,y);
		context.lineTo(x + w,y + h);
		context.lineTo(x + w / 2 + 20,y + h);
		context.lineTo(x + w / 2,y + h + 20);
		context.lineTo(x + w / 2 - 20,y + h);
		context.lineTo(x, y + h);
		context.lineTo(x, y);
		context.closePath();
		context.stroke();
	}

	/*画一个人说的话*/
	function paintSay(x, y, w, h, texts)
	{
		paintKuang(x, y, w, h);
		for(var i = 0; i < texts.length; i++){
			context.font = "16px serif";
			context.fillText(texts[i], x + 10, y + 25 + 25 * i);
		}
	}
