/**
 * ���ɵ���Ŀ¼
 */
function createMenu(){
	var menu_bar = document.getElementById("header");
	menu_bar.innerHTML = "<div id=\"daohang\"> " +
			"<ul>" +
			"<li><a href=\"index.html\">��ҳ</a></li>" +
			"<li><a href=\"blog.html\">����</a></li>" +
			"<li><a href=\"app.html\">Ӧ��</a></li>" +
			"<li><a href=\"weibo_10.html\">΢��</a></li>" +
			"</ul></div>";
}

/**
 * ����΢��ҳ���е��·�Ŀ¼
 * @currMonth : 
 */
function createWeiboMonthMenu(currMonth){
	var menu_bar = document.getElementById("monthlist");
	menu_bar.innerHTML = "<span id=\"seven\" class=\"month\"><a href=\"weibo_7.html\">2014��7��</a></span>" +
			"<span id=\"eight\" class=\"month\"><a href=\"weibo_8.html\">2014��8��</a></span>" +
			"<span id=\"nine\" class=\"month\"><a href=\"weibo_9.html\">2014��9��</a></span>" +
			"<span id=\"ten\" class=\"month\"><a href=\"weibo_10.html\">2014��10��</a></span>" ;
	
	var curr = document.getElementById(currMonth);
	curr.style.background = "#ababcd";
	var h = curr.getElementsByTagName("a");
	h.href = "#";
}