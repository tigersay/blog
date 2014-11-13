/**
 * 生成导航目录
 */
function createMenu(){
	var menu_bar = document.getElementById("header");
	menu_bar.innerHTML = "<div id=\"daohang\"> " +
			"<ul>" +
			"<li><a href=\"index.html\">Home</a></li>" +
			"<li><a href=\"blog.html\">Blog</a></li>" +
			"<li><a href=\"app.html\">App</a></li>" +
			"<li><a href=\"weibo_11.html\">Weibo</a></li>" +
			"</ul></div>";
}


/**
 * 生成导航目录
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
	menu_bar.innerHTML = "<span id=\"seven\" class=\"month\"><a href=\"weibo_7.html\">2014年7月</a></span>" +
			"<span id=\"eight\" class=\"month\"><a href=\"weibo_8.html\">2014年8月</a></span>" +
			"<span id=\"nine\" class=\"month\"><a href=\"weibo_9.html\">2014年9月</a></span>" +
			"<span id=\"ten\" class=\"month\"><a href=\"weibo_10.html\">2014年10月</a></span>" +
			"<span id=\"eleven\" class=\"month\"><a href=\"weibo_11.html\">2014年11月</a></span>" ;
	
	var curr = document.getElementById(currMonth);
	curr.style.background = "#ababcd";
	var h = curr.getElementsByTagName("a");
	h.href = "#";
}