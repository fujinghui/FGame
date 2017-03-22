<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8"%>
<%@ page import="entity.Items"%>
<%@ page import="dao.ItemsDAO"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>首页</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="css/styles.css">
	<link rel="stylesheet" type="text/css" href="css/index.css">
	<link rel="stylesheet" type="text/css" href="css/geren.css">
<link rel="stylesheet" type="text/css" href="css/lunbo.css">
		<script src="js/script.js"></script>

<style>

</style>
<script>
 function yanzheng(){
    	  var name=<%=session.getAttribute("name")%>;
    	  if(name!=null){
    		  return true;
    	  }else{
    		  alert("请先登陆后再来评论吧！");
    		  return false;
    	  }
      }
 </script>
  </head>
  
  <body style="background:url('images/beijing.jpg');background-size:100%;transform">
  <script>

  </script>
<div class="top navbar navbar-inverse navbar-fixed-top">

<nav>
	<ul style="margin-right:20px;">
       	<%
    	if(request.getSession().getAttribute("name")!=null)
    	{
    		String name=(String)request.getSession().getAttribute("name");%>
    		<li><a href="zhuxiao.jsp" style="width:60px;">退出</a></li>
    		<li id='dr' style="margin-right:30px;"><%=name %></li>
    		<li><a href="index.jsp">首页</a></li>
    	<%}else{
    		response.sendRedirect("index.jsp");
    	 }%>
    </ul>
</nav>
</div>
<div class="guanli">
<section>
<a href="list2.jsp">
<article>

<article>
<h2>查看作品</h2>
</a>
</section>

<section>
<a href="discuss2.jsp">
<article>

<article>
<h2>查看评论</h2>
</a>
</section>

<section>
<a href="fabu.jsp">
<article>

<article>
<h2>发布作品</h2>
</a>
</section>

<section>
<a href="admin.jsp">
<article>

<article>
<h2>管理作品</h2>
</a>
</section>

</div>
</body>
</html>