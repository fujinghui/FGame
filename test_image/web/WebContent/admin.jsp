<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8"%>
<%@page import="dao.ItemsDAO"%> 
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
    <script language="javascript">
	    function delcfm() {
	        if (!confirm("确认要删除？")) {
	            window.event.returnValue = false;
	        }
	    }
   </script>
  </head>
  
  <body style="width:100%;height:100%;background-image: url(./images/beijing.jpg)">
   <div class="tou">
   <h1>处理页面</h1>
   	<div class="tou-1"><a href="dengluhou.jsp">管理页面</a> </div>
   </div>
   <div id="shopping" style="padding-top:30px;">
   <form   action="" method="post">
			<table>
				<tr>
					<th>商品名称</th>
					<th>操作</th>
				</tr>
				     <% 
				    	 ItemsDAO itemsDao = new ItemsDAO(); 	
				       	 ArrayList<Items> items = itemsDao.getAllItems();
				         Iterator<Items> it = items.iterator();
				         
				         while(it.hasNext())
				         {
				            Items i = it.next();
				     %> 
				<tr  id="product_id_1">
					<td class="thumb"><img src="images/<%=i.getPicture()%>" /><a href=""><%=i.getName()%></a></td>
                    <td class="delete"> 
					  <a href="servlet/ItemsServlet?action=delete&id=<%=i.getId()%>" onclick="delcfm();">删除</a>
					  <br/>					                  
					  <a href="update.jsp?id=<%=i.getId()%>" >修改</a> 				                  
					</td>
				</tr>
				     <% 
				         }
				     %>
				
			</table>
			<div class="button"><input type="submit" value="" /></div>
		</form>
	</div>
  </body>
</html>
