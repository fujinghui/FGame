<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8" %>
<%@ page import="entity.Items"%>
<%@ page import="entity.Discuss"%>
<%@ page import="dao.ItemsDAO"%>
<%@ page import="dao.DiscussDAO"%>

<%
String path = request.getContextPath();//获得当前的项目根目录路径
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>详情页</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="css/styles.css">
	<link href="css/main.css" rel="stylesheet" type="text/css">
	<link href="css/index.css" rel="stylesheet" type="text/css">
	<link href="css/lunbo.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="js/lhgcore.js"></script>
    <script type="text/javascript" src="js/lhgdialog.js"></script>
    <script type="text/javascript">
      function yanzheng(){
    	  var name=<%=session.getAttribute("name")%>;
    	  if(name!=null){
    		  return true;
    	  }else{
    		  alert("请先登陆后再来发布吧！");
    		  return false;
    	  }
      }
    </script>
  </head>
  
  <body style="background:url(images/beijing.jpg);filter:alpha(opacity=50)">
  <div class="all">
  	<div class="tou">
    <h1 style="margin-left:600px;">发布作品</h1>
    <div class="tou-1" style="width:1366px;"><a href="dengluhou.jsp">管理页面</a> >> <a href="index.jsp">发布作品</a></div>
  
    </div>
   </div>
   <div class="fabu" id="fabu">
<form action="servlet/ItemsServlet?action=add" method="post" enctype="multipart/form-data">
<fieldset>
	<legend>发布界面</legend>
<label>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</label><input type="text" name="name">
<br/><br/>
<label>文字描述</label><textarea rows="4" cols="34" name="price"></textarea>
<br/><br/>
<label>联系方式</label><input type="text" name="city">
<br/><br/>
<label>上传海报</label><input type="file" name="pic">
<br/><br/>
<input type="submit" value="提交" onclick="return yanzheng()">
</fieldset>
</form>
<div>
</div>
</body>
</html>