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
    <div class="tou-1"><a href="index.jsp">首页</a> >> <a href="index.jsp">商品列表</a></div>
  
    </div>
   </div>
   <div class="content">
    <center>
      <table width="1000" height="60" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <!-- 商品详情 -->
          <% 
             ItemsDAO itemDao = new ItemsDAO();
             Items item = itemDao.getItemsById(Integer.parseInt(request.getParameter("id")));
             if(item!=null)
             {
          %>
          <td valign="top">
             <table class="zhutu" cellpadding=10px cellspacing=10px>
               <tr>
                 <td rowspan="6" style="border:none;padding-right:50px;"><img src="images/<%=item.getPicture()%>" width="300" height="380"/></td>
               </tr>
               <tr>
                 <td><b><%=item.getName() %></b></td> 
               </tr>
               <tr>
                 <td>介绍：<%=item.getCity()%></td>
               </tr>
               <tr>
                 <td>电话：￥<%=item.getPrice() %></td>
               </tr>
              
               <tr>
               		<td></td>
               </tr>
             </table>
             
          </td>
          </tr>
          <% 
            }
          %>
          <% 
              String list ="";
              //从客户端获得Cookies集合
              Cookie[] cookies = request.getCookies();
              //遍历这个Cookies集合
              if(cookies!=null&&cookies.length>0)
              {
	              for(Cookie c:cookies)
	              {
	                  if(c.getName().equals("ListViewCookie"))
	                  {
	                     list = c.getValue();
	                  }
	              }
	          }
              
              list+=request.getParameter("id")+",";
              //如果浏览记录超过1000条，清零.
              String[] arr = list.split(",");
              if(arr!=null&&arr.length>0)
              {
                  if(arr.length>=1000)
                  {
                      list="";
                  }
              }
              Cookie cookie = new Cookie("ListViewCookie",list);
              response.addCookie(cookie);
          
          %>
          <!-- 浏览过的商品 -->
          <tr>
          <td align="center" style="background:#0080c0">
             <br>
             <b><font color="#FF7F00">您浏览过的作品</font></b><br>
             <!-- 循环开始 -->
             <% 
                ArrayList<Items> itemlist = itemDao.getViewList(list);
                if(itemlist!=null&&itemlist.size()>0 )
                {
                   System.out.println("itemlist.size="+itemlist.size());
                   for(Items i:itemlist)
                   {
                         
             %>
             <div class=xinxi-detail>
             <dl>
               <dt>
                 <a href="details.jsp?id=<%=i.getId()%>"><img src="images/<%=i.getPicture() %>" width="120" height="90" border="1"/></a>
               </dt>
               <dd class="dd_name"><%=i.getName() %></dd> 
             </dl>
             </div>
             <% 
                   }
                }
             %>
             <!-- 循环结束 -->
          </td>
        </tr>
      </table>
      <h2>评论列表</h2>
      <% 
             DiscussDAO discussDao = new DiscussDAO();
      ArrayList<Discuss> list3 = discussDao.getDiscussById(Integer.parseInt(request.getParameter("id")));
      if(list3!=null&&list3.size()>0)
      {
          for(int i=0;i<list3.size();i++)
          {
             Discuss discuss = list3.get(i);
  %>   
      <div class="pinglunlist">
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
      </div>
      <br/>
       <%
                   }
              } 
          %>
      <div class="pinglun">
      <h3>我要评论</h3>
      <form action="servlet/DiscussServlet?action=ccdis" method="post" >
      <textarea id="pjcontent" name="pjcontent">
             请输入你的评价...
      </textarea>
      <br/>
      <input type="submit" value="评论" id="tjpl" class="tjpl" onclick="return yanzheng()">
      <input type="hidden" value="<%=item.getId()%>" name="id">
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
