<%@page import="dao.ItemsDAO"%>
<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8"%>
<%@ page import="entity.Items" %>  
<% 
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head> 
    <base href="<%=basePath%>">
    <title>My JSP 'cart.jsp' starting page</title>
 	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="css/styles.css"> 
   <link type="text/css" rel="stylesheet" href="css/style1.css" />
  </head>
  
  <body>
  <div class="tou">
    <h1>作品详情</h1>
    <div class="tou-1"><a href="index.jsp">首页</a> >> <a href="list.jsp">作品列表</a></div>
  
    </div>
   <div id="shopping" style="padding-top:20px;">
   <form action="" method="">		
			<table>
				<tr>
					<th>商品名称</th>
				</tr>
				<!-- 循环的开始 -->
				     <% 
				     	request.setCharacterEncoding("ISO8859_1");
				     	String key = request.getParameter("key");
				     	key = new String(key.getBytes("ISO8859_1"),"utf-8");
				    	 ItemsDAO itemsDao = new ItemsDAO(); 
				    	 ArrayList<Items> items = itemsDao.getItemsByKey(key);
				         if(items!=null){
					         Iterator<Items> it = items.iterator();
					         
					         while(it.hasNext())
					         {
					            Items i = it.next();
				     %> 
				<tr name="products" id="product_id_1">
					<td class="thumb"><img src="images/<%=i.getPicture()%>" /><a href="details.jsp?id=<%=i.getId()%>""><%=i.getName()%></a></td>
	
				</tr>
				     <% 
					         }
				         }
				     %>
				<!--循环的结束-->
				
			</table>
			<div class="button"><input type="submit" value="" /></div>
		</form>
	</div>
  </body>
</html>
