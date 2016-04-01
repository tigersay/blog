
/**
 * 生成导航目录
 */
function createMenu(){
	var menu_bar = document.getElementById("header");
	menu_bar.innerHTML = "<div id=\"daohang\"> " +
			"<ul>" +
			"<li><a href=\"http://tigersay.github.io/blog/index.html\">Home</a></li>" +
			"<li><a href=\"http://tigersay.github.io/blog/blog.html\">Blog</a></li>" +
			"<li><a href=\"http://tigersay.github.io/blog/app.html\">App</a></li>" +
			"<li><a href=\"http://tigersay.github.io/blog/weibo/weibo_16_04.html\">Weibo</a></li>" +
			"</ul></div>";
}


/**
 * 生成底部栏
 */
function createFooter(){
	//var menu_bar = document.getElementById("footer");
	//menu_bar.innerHTML = "<div id=\"footer\">Hello, My friend, Welcome here,Have a good time!</div><br><br>";
}




/**
 * 生成微博页面中的月份目录
 * @currMonth : 当前月份。
 */
function createWeiboMonthMenu(currMonth){
	var menu_bar = document.getElementById("monthlist");
	var content = "<div class=\"bannian\"><span id=\"seven\" class=\"month\"><a href=\"weibo_7.html\">2014年7月</a></span>" +
	"<span id=\"eight\" class=\"month\"><a href=\"weibo_8.html\">2014年8月</a></span>" +
	"<span id=\"nine\" class=\"month\"><a href=\"weibo_9.html\">2014年9月</a></span>" +
	"<span id=\"ten\" class=\"month\"><a href=\"weibo_10.html\">2014年10月</a></span>" +
	"<span id=\"eleven\" class=\"month\"><a href=\"weibo_11.html\">2014年11月</a></span>" +
	"<span id=\"twelve\" class=\"month\"><a href=\"weibo_12.html\">2014年12月</a></span></div>" +
	"<div class=\"bannian\">" + 
	"<span id=\"15_01\" class=\"month\"><a href=\"weibo_15_01.html\">2015年1月</a></span>" +
	"<span id=\"15_02\" class=\"month\"><a href=\"weibo_15_02.html\">2015年2月</a></span>"  + 
	"<span id=\"15_03\" class=\"month\"><a href=\"weibo_15_03.html\">2015年3月</a></span>" +
	"<span id=\"15_04\" class=\"month\"><a href=\"weibo_15_04.html\">2015年4月</a></span>" +
	"<span id=\"15_05\" class=\"month\"><a href=\"weibo_15_05.html\">2015年5月</a></span>" + 
	"<span id=\"15_06\" class=\"month\"><a href=\"weibo_15_06.html\">2015年6月</a></span></div>" + 
	"<div class=\"bannian\">" + 
	"<span id=\"15_07\" class=\"month\"><a href=\"weibo_15_07.html\">2015年7月</a></span>" +
	"<span id=\"15_08\" class=\"month\"><a href=\"weibo_15_08.html\">2015年8月</a></span>" +
	"<span id=\"15_09\" class=\"month\"><a href=\"weibo_15_09.html\">2015年9月</a></span>" + 
	"<span id=\"15_10\" class=\"month\"><a href=\"weibo_15_10.html\">2015年10月</a></span>" +
	"<span id=\"15_11\" class=\"month\"><a href=\"weibo_15_11.html\">2015年11月</a></span>" +
	"<span id=\"15_12\" class=\"month\"><a href=\"weibo_15_12.html\">2015年12月</a></span></div>" +
	"<div class=\"bannian\">" + 
	"<span id=\"16_01\" class=\"month\"><a href=\"weibo_16_01.html\">2016年1月</a></span>" + 
	"<span id=\"16_02\" class=\"month\"><a href=\"weibo_16_02.html\">2016年2月</a></span>" +
	"<span id=\"16_03\" class=\"month\"><a href=\"weibo_16_03.html\">2016年3月</a></span>" +
	"<span id=\"16_04\" class=\"month\"><a href=\"weibo_16_04.html\">2016年4月</a></span>" 
	;
	
	
	content = content + "</div>";
	menu_bar.innerHTML = content;
	var curr = document.getElementById(currMonth);
	curr.style.background = "#ababcd";
	var h = curr.getElementsByTagName("a");
	h.href = "#";
}