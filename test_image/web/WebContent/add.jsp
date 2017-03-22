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
   <h1>添加页面</h1>
   	<div class="tou-1"><a href="index.jsp" style="text-decoration:none;">首页</a> >> <a href="admin.jsp" style="text-decoration:none;">管理页面</a></div>
   </div>
<!-- 顶部导航 --> 

    	<nav>
		<form class="form-horizontal" role="form" method="post" action="servlet/ItemsServlet?action=add" enctype="multipart/form-data">
		  <div class="form-group">
			<label for="firstname" class="col-sm-2 control-label">名称</label>
			<div class="col-sm-10">
			  <input type="text" class="form-control" id="name" placeholder="请修改名称" name="name">
			</div>
		  </div>
		  <div class="form-group">
			<label for="lastname" class="col-sm-2 control-label">价格</label>
			<div class="col-sm-10">
			  <input type="text" class="form-control" id="price" placeholder="请修改价格" name="price">
			</div>
		  </div>
		  <div class="form-group">
			<label for="lastname" class="col-sm-2 control-label">城市</label>
			<div class="col-sm-10">
			  <input type="text" class="form-control" id="city" placeholder="请修改城市" name="city">
			</div>
		  </div>
		  <div class="form-group">
			<label for="lastname" class="col-sm-2 control-label">数量</label>
			<div class="col-sm-10">
			  <input type="text" class="form-control" id="number" placeholder="请修改数量" name="number">
			</div>
		  </div>
		  <div class="form-group">
			<label for="lastname" class="col-sm-2 control-label">图片</label>
			<div class="col-sm-10">
			  <input type="file" class="form-control" id="pic"  name="pic">
			</div>
		  </div>
		  <div class="form-group">
			<div class="col-sm-offset-2 col-sm-10">
			  <button type="submit" class="btn btn-default">确认添加</button>
			</div>
		  </div>
		  <div class="form-group">
			
		  </div>
		</form>
	</nav>

</body>
</html>