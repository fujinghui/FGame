<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link style="text/css" rel="stylesheet" href="css/login.css">
<script src="js/login.js"></script>
<title>Insert title here</title>
</head>
<body style="width:100%;height:100%;background-image: url(./images/beijing.jpg);background-size:100%;">
<div class="main">
<header>
	<ul>
		<li  class="login"><a href="index.jsp"><img src="images/logo.png" style="width:50px;height:100px"></a></li>
        <li>
        	<ul>
            	<li><h2>青花瓷</h2></li>
				<li><b>让世界充满爱的味道</b></li>
            </ul>
       </li>
	</ul>
</header>
<section id="denglu">
<form name="form1" method="post" action="UserServlet?action=login">
	<ul>	
		<li><h1>会员登录</h1></li>
        <li><input type="text" name="name" id="name" placeholder="手机号/609账号" required></li>
        <li><input type="password" name="pwd" id="pwd" placeholder="密码" required></li>
        <li><input type="radio" name="use" value="member" checked /><label>会员</label></li>
        <li class="drw"><input type="submit" value="登录" name="Submit" class="wq"/></li>
        <li style="margin-top:-40px;margin-left:-10px;"><a href="javascript:;" id="dr">注  册</a>
        	<a href="login.jsp">管理员登陆</a></li>
   	</ul>
   </form>
</section>
<p class="you" id="you">></p>
<p class="zuo" id="zuo"><</p>
<section id="zhuce">
<form name="form1" method="post" action="UserServlet?action=reg">
	<ul>	
		<li><h1>会员注册</h1></li>
        <li><input type="text" name="name" placeholder="手机号/qq邮箱" required></li>
        <li><input type="password" name="pwd" placeholder="密码" required></li>
        <li><input type="password" placeholder="确认密码" required/>
        <li><input type="text" name="realName" placeholder="真实姓名" required></li>
        <li class="drw2"><input type="submit" value="注册" name="Submit" class="wq"></li>
   	</ul>
</form>
</section>
<footer>
<p>欢迎访问 青花之韵  最终解释版权归河南省新乡学院所有</p>
<p id="time"></p>
</footer>
</div>
</body>
</html>