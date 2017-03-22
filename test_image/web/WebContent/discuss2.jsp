<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8" %>
<%@ page import="entity.Discuss"%>
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
	<script type="text/javascript" src="js/lhgcore.js"></script>
    <script type="text/javascript" src="js/lhgdialog.js"></script>
    <link href="css/lunbo.css" rel="stylesheet" type="text/css">
    
    <script type="text/javascript">
      function selflog_show(id)
      { 
         var num =  document.getElementById("number").value; 
         J.dialog.get({id: 'haoyue_creat',title: '购物成功',width: 600,height:400, link: '<%=path%>/servlet/CartServlet?id='+id+'&num='+num+'&action=add', cover:true});
      }
      function add()
      {
         var num = parseInt(document.getElementById("number").value);
         if(num<100)
         {
            document.getElementById("number").value = ++num;
         }
      }
      function sub()
      {
         var num = parseInt(document.getElementById("number").value);
         if(num>1)
         {
            document.getElementById("number").value = --num;
         }
      }
     
    </script>
	
    <style type="text/css">
	   hr{
	     
	     border-color:FF7F00; 
	   }
	   
	  	   span{
	     padding:0 2px;
	     border:1px #c0c0c0 solid;
	     cursor:pointer;
	   }
	   a{
	      text-decoration: none; 
	   }
	</style>
  </head>
  
  <body style="background:url('images/beijing.jpg');background-size:100%">
  <div class="all">
  	<div class="tou">
    <h1>评论展示</h1>
    <div class="tou-1"><a href="dengluhou.jsp">管理页面</a> >> <a href="index.jsp">评论列表</a></div>
 
    </div>
   </div>
   <div class="content">
    <center>
          <!-- 评论循环开始 -->
           <% 
           DiscussDAO discussDao = new DiscussDAO(); 
           ArrayList<Discuss> list = discussDao.getAllDiscuss();
               if(list!=null&&list.size()>0)
               {
	               for(int i=0;i<list.size();i++)
	               {
	                  Discuss discuss = list.get(i);
           %>   
          <div class="pinglunlist">
          <br/>
      <section>
      <aside>
      <img src="images/touxiang.png" style="widht:50px;height:50px;border:1px #FFF solid;border-radius:50%;">
      <h4><%=discuss.getName() %></h4>
      </aside>
      <article>
      	<%=discuss.getContent() %>
      </article>
      <a href="textdiscuss.jsp?textid=<%=discuss.getTextid() %>" class="chakan">查看</a>
      </section>
      <br/><br/>
      </div>
          <!-- 评论循环结束 -->
        
          <%
                   }
              } 
          %>
    </center>
    </div>
 
  </body>
</html>
