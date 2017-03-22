<%@page import="entity.Items"%>
<%@page import="dao.ItemsDAO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html> 
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
 <link href="css/bootstrap.min.css" rel="stylesheet">
  <link href="css/mystyle.css" rel="stylesheet">
  <link href="css/styles.css" rel="stylesheet">
</head>
<body style="background:url('images/beijing.jpg');background-size:100%">
<div class="tou">
   <h1>更新页面</h1>
   	<div class="tou-1"><a href="dengluhou.jsp" style="text-decoration:none;">首页</a> >> <a href="admin.jsp" style="text-decoration:none;">管理页面</a></div>
   </div>
<%
	String id = request.getParameter("id");
%>
<!-- 顶部导航 -->
		<%
			ItemsDAO dao = new ItemsDAO();
			Items item = dao.getItemsById(Integer.parseInt(request.getParameter("id")));
		%>
    	<nav>
		<form class="form-horizontal" role="form" method="post" action="servlet/ItemsServlet?action=update&id=<%=id %>" >
		  <div class="form-group">
			
			<div class="col-sm-10">
			 <label for="firstname" class="col-sm-2 control-label">标题:</label>&nbsp;&nbsp;<input type="text" class="form-control" id="name" placeholder="请修改名称" value="<%=item.getName() %>" name="name">
			</div>
		  </div>
		  <div class="form-group">

			<div class="col-sm-10">
			  <label for="lastname" class="col-sm-2 control-label">说明:</label>&nbsp;&nbsp;<textarea  class="form-control" id="price" placeholder="请修改说明" value="<%=item.getPrice() %>" name="price"><%=item.getPrice() %>
		</textarea></div>
		  </div>
		  <div class="form-group">
		
			<div class="col-sm-10">
			  <label for="lastname" class="col-sm-2 control-label">电话:</label>&nbsp;&nbsp;<input type="text" class="form-control" id="city" placeholder="请修改城市" value="<%=item.getCity() %>" name="city">
			</div>
		  </div>
		  <div class="form-group">
			<div class="col-sm-offset-2 col-sm-10">
			  <button type="submit" class="btn btn-default">确认修改</button>
			</div>
		  </div>
		  <div class="form-group">
			
		  </div>
		</form>
	</nav>

</body>
</html>