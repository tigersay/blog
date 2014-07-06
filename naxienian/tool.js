
/*
* ��ֱ��
*/
function drawLine(x1,y1,x2,y2){
	context.beginPath();
	context.moveTo(x1,y1);
	context.lineTo(x2,y2);
	context.closePath();
	context.stroke();
}


/*
* ���Ժ� --- ���Ĳ����ǵ׵�����
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
* ����� --- ���Ĳ����ǵ�һ���׵�����
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
* �ж�ĳ�����Ƿ���ĳ��������
*/
function isPointInRect(px,py, rx,ry,rw,rh){
	if(px >= rx && px <= rx + rw && py >= ry && py <= ry + rh){return true;}
	return false;
}

/*
* ���һ��Բ
*/
function fillArc(x,y,r){
	context.beginPath();
	context.arc(x, y, r, 0, Math.PI * 2, false);
	context.closePath();
	context.fill();
}

/*
* ��һ��Բ
*/
function drawArc(x,y,r){
	context.beginPath();
	context.arc(x, y, r, 0, Math.PI * 2, false);
	context.closePath();
	context.stroke();
}

//�жϵ��Ƿ���Բ�ڣ�ax��ay��Բ��
function isPointInArc(px,py,ax,ay,ar)
{
	return (px - ax) * (px - ax) + (py - ay) * (py - ay) < ar * ar;
}

//�жϷ����Ƿ���Բ�ڣ�px��py�Ǿ������Ͻ�, ax��ay��Բ��
function isRectInArc(px,py,pw,ph,ax,ay,ar)
{
	if(isPointInArc(px,py,ax,ay,ar) == false)return false;
	if(isPointInArc(px + pw,py + ph,ax,ay,ar) == false)return false;
	if(isPointInArc(px,py + ph,ax,ay,ar) == false)return false;
	if(isPointInArc(px + pw,py,ax,ay,ar) == false)return false;
	return true;
}

	/*��һ��˵���Ŀ��м�ͷָ���·���˵����*/
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

	/*��һ����˵�Ļ�*/
	function paintSay(x, y, w, h, texts)
	{
		paintKuang(x, y, w, h);
		for(var i = 0; i < texts.length; i++){
			context.font = "16px serif";
			context.fillText(texts[i], x + 10, y + 25 + 25 * i);
		}
	}
