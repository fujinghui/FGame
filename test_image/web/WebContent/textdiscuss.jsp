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
	<link href="css/lunbo.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="js/lhgcore.js"></script>
    <script type="text/javascript" src="js/lhgdialog.js"></script>
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
    <h1>商品详情</h1>
    <div class="tou-1"><a href="index.jsp">首页</a> >> <a href="index.jsp">评论信息</a></div>
    </div>
   </div>
   <div class="content">
    <center>
      <h2>评论信息</h2>
     <% 
             DiscussDAO discussDao = new DiscussDAO();
    		 Discuss discuss = discussDao.getdiscuss(Integer.parseInt(request.getParameter("textid")));
             if(discuss!=null)
             {
          %>
      <div class="pinglunlist2">
      <section>
      <aside>
      <img src="images/touxiang.png" style="widht:50px;height:50px;border:1px #FFF solid;border-radius:50%;">
      <h4><%=discuss.getName() %></h4>
      </aside>
      <article>
      	<%=discuss.getContent() %>
      </article>
      </section>
      </div>
      <br/>
       <% 
            }
          %>
          
          <% 
             DiscussDAO discussDao1 = new DiscussDAO();
      ArrayList<Discuss> list = discussDao1.getAllTextdiscussById(Integer.parseInt(request.getParameter("textid")));
      if(list!=null&&list.size()>0)
      {
          for(int i=0;i<list.size();i++)
          {
             Discuss discuss1 = list.get(i);
  %>   
          
          <div class="pinglunlist3">
          <section>
      <aside>
      <img src="images/touxiang.jpg" style="widht:25px;height:25px;border:1px #FFF solid;border-radius:50%;">
      <h4><%=discuss1.getName() %></h4>
      </aside>
      <article>
      	<%=discuss1.getTextcontent() %>
      </article>
      </section>
          </div>
          
           <%
                   }
              } 
          %>
          
      <div class="pinglun">
      <h3>我要评论这个信息</h3>
      <form action="servlet/DiscussServlet?action=cctextdis" method="post" >
      <textarea id="pjcontent" name="pjcontent">
             请输入你的评价...
      </textarea>
      <br/>
      <input type="submit" value="评论" id="tjpl" class="tjpl" onclick="return yanzheng()">
      <input type="hidden" value="<%=discuss.getTextid() %>" name="id">
      <%
      if(request.getSession().getAttribute("name")!=null)
    	{
    		String name=(String)request.getSession().getAttribute("name");%>
    		<input type="hidden" value=<%=name %> name="xingming">
    		<%} %>
      </form>
      <br/><br/>
      </div>
      <script>
      var a=document.getElementById("pjcontent");
      var b=document.getElementById("tjpl");
      a.addEventListener("focus", function(){
    	  b.style.display="block";
    	  a.style.height="80px";
    	  a.value="";
    	  a.style.color="#000";
      }, false)
      a.addEventListener("blur", function(){
    	  a.style.height="30px";
    	  a.style.color="#999";
      }, false)

      </script>
    </center>
    </div>
 
  </body>
</html>
