
/*johnny羽球课堂*/
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
		paintTitle("johnny羽球课堂");
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
			
			var texts = ["亨兄，好久不见啊。"];
			paintSay(game_x + 460, game_y + 325, 180, 80, texts);  //johnny发言--“亨兄，好久不见。”
			break;
		case 3:
			heng.paint();
			johnny.paint();
			var texts = ["哈哈，捉你兄弟。", "久违了，最近在忙啥呢？"];
			paintSay(game_x + 150, game_y + 325, 190, 80, texts);  //亨发言--“捉你兄弟，久违了。”
			break;
		case 4:
			heng.paint();
			johnny.paint();
			
			var texts = ["最近迷上羽毛球了，","每天疯狂练球中，嘿嘿。。"];
			paintSay(game_x + 440, game_y + 325, 220, 80, texts);  
			break;
		case 5:
			heng.paint();
			johnny.paint();
			var texts = ["哇，羽毛球，不错额。。", "听说打羽毛球的男生都是靓仔，","女生都是美女，是不是呀？"];
			paintSay(game_x + 120, game_y + 310, 240, 105, texts);  
			break;
		case 6:
			heng.paint();
			johnny.paint();
			
			var texts = ["嗯嗯，羽毛球确实有美颜修身","的功效，还能锻炼身体、", "愉悦心情、(省略一万字)"];
			paintSay(game_x + 425, game_y + 310, 240, 105, texts);  
			break;
		case 7:
			heng.paint();
			johnny.paint();
			var texts = ["听着真不错，我也想学了。", "新手应该怎么入门呢？"];
			paintSay(game_x + 135, game_y + 315, 210, 100, texts);  
			break;
		case 8:
			heng.paint();
			johnny.paint();
			
			var texts = ["首先是握拍，如果一开始握的不对，","后续提升会非常困难。", "", "关键注意两点：",
				 "1，掌心握空，最后两个手指握牢就可以。","2，保持和握住菜刀的位置一样。"];
			paintSay(game_x + 400, game_y + 210, 305, 200, texts);  
			break;
		case 9:
			heng.paint();
			johnny.paint();
			var texts = ["哦，首先是握拍。", "其次呢？"];
			paintSay(game_x + 135, game_y + 315, 210, 100, texts);  
			break;
		case 10:
			heng.paint();
			johnny.paint();
			
			var texts = ["其次就要练习高远球了，","高远球是所有羽毛球技术的基础！","","主要注意两点：",
				 "1，拍面最后触球时，要正。","", "2，挥动的时候要旋转，这个很重要。","没有这个旋转的话，力量会小很多。"];
			paintSay(game_x + 415, game_y + 160, 280, 255, texts);  
			break;
		case 11:
			heng.paint();
			johnny.paint();
			var texts = ["似乎不是很难额。。", "说说杀球。"];
			paintSay(game_x + 135, game_y + 315, 210, 100, texts);  
			break;
		case 12:
			heng.paint();
			johnny.paint();
			
			var texts = ["杀球的要领有以下：","","1，准备杀球之前先侧身，左脚在前，右脚在后。","快速后退使击球点在你的前上方，同时回环引拍。","",
				 "2，杀球前身体后仰成弓形，这样使你用上全身的力量。","", "3，握拍要放松，手心手柄之间要有缝隙，在杀球的",
				 "瞬间握紧拍子使劲杀球", "","4，杀球时手臂伸直，击球点要尽可能的高。"];
			paintSay(game_x + 350, game_y + 120, 405, 296, texts);  
			break;
		case 13:
			heng.paint();
			johnny.paint();
			var texts = ["这听起来好麻烦。。", "还有其它什么吗。"];
			paintSay(game_x + 135, game_y + 315, 210, 100, texts);  
			break;
		case 14:
			heng.paint();
			johnny.paint();
			
			var texts = ["羽毛球技术还有许多，","比如搓球吊球，各种步法。。","","(接到个短信，，看了下)","",
				 "咦，莫子喊我去东莞额，你去不？"];
			paintSay(game_x + 410, game_y + 210, 280, 210, texts);  
			break;
		case 15:
			heng.paint();
			johnny.paint();
			var texts = ["呀，东莞，好地方呀。。", "走，一起啊，我好久没去了。。"];
			paintSay(game_x + 120, game_y + 315, 240, 100, texts);  
			break;
		case 16:
			heng.paint();
			johnny.paint();
			
			var texts = ["哈哈，走。。"];
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
	
	var heng = new man(0, 450, "亨", 40);
	var johnny = new man(800, 450, "Johnny", 70);
}

