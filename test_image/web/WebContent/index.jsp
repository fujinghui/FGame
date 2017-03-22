<%@ page language="java" import="java.util.*" contentType="text/html; charset=utf-8"%>
<%@ page import="entity.Items"%>
<%@ page import="dao.ItemsDAO"%>
<%@ page import="entity.Discuss"%>
<%@ page import="dao.DiscussDAO"%>
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
    		  alert("请先登陆后再来发布吧！");
    		  return false;
    	  }
      }
 </script>
  </head>
  
  <body style="background:url('images/beijing.jpg');background-size:100%;">
  <script>

  </script>
<div class="top navbar navbar-inverse navbar-fixed-top">

<a href="javascript:;" id="gwc"></a>
<nav>
	<ul>
    	
    	<%
    	if(request.getSession().getAttribute("name")!=null)
    	{
    		String name=(String)request.getSession().getAttribute("name");%>
    		<li style="width:100px;"><a class="list" href="list.jsp" style="width:100px;">所有作品</a></li>
    		<li style="width:100px;"><a class="list" href="discuss.jsp" style="width:100px;">所有评论</a></li>
    		<li style="width:100px;"><a class="list" href="#fabu" style="width:100px;">发布作品</a></li>
    		<li><a href="#" data-toggle="modal" data-target="#about-modal">关于</a></li>
    		<li><a href="zhuxiao.jsp" style="width:60px;">退出</a></li>
    		<li id='dr' style="margin-right:30px;"><%=name %></li>
    		
    	<%}else{%>
    		<li style="width:100px;"><a class="list" href="list.jsp" style="width:100px;">所有作品</a></li>
    		<li style="width:100px;"><a class="list" href="discuss.jsp" style="width:100px;">所有评论</a></li>
    		<li style="width:100px;"><a class="list" href="#fabu" style="width:100px;">发布作品</a></li>
    		<li><a href="#" data-toggle="modal" data-target="#about-modal">关于</a></li>
    		<li id='dr'><a href="login1.jsp">登陆</a></li>
        	<li id='zc'><a href="login1.jsp">注册</a></li>
    	<%} %>
    </ul>
</nav>
</div>
<div class="sousuo" style="margin-top:70px;">
<img src="images/logo.png" align="middle" style="width:40px;height:80px">
<b style="font-size:40px; font-weight:500px;">青花瓷</b>

<div><p id="time" style="padding-top:12px;"></p></div>
<script>
setInterval(time,100);
function time(){
var mytime=new Date();
var nowtime=mytime.getTime();
var hour=mytime.getHours();
var minute=mytime.getMinutes();
var second=mytime.getSeconds();
var days=mytime.getDay();
if(hour<10){hour="0"+hour.toString();}
if(minute<10){minute="0"+minute.toString();}
if(second<10){second="0"+second.toString();}
document.getElementById("time").innerText=hour+":"+minute+":"+second;
}
</script>
</div>

<div class="zhong">
<h4>关注生态  共同分享</h4>
<h2>迈向青花瓷的第一步</h2>
<form action="" method="post" class="sousuo">
<input type="text" placeholder="请输入搜索的作品" id="key" name="search" required><input type="button" id="queding" value="搜索">
</form>
<script>
	 	var key = document.getElementById("key");
	 	var queding = document.getElementById("queding");
	 	queding.addEventListener("click",function(){
	    var path = "servlet/CartServlet?action=search&key=" + key.value;
	    window.location.href = path},false)
 </script>
</div>

<div class="tuijian">
<div class="biaoti">
<h1>精选作品<h1>
<p>合作伙伴和开源组织提供的高质量作品</p>
<a href="list.jsp">查看全部</a>
</div>
<% 
             ItemsDAO itemDao = new ItemsDAO();
             Items item = itemDao.getItemsById(Integer.parseInt("1"));
             if(item!=null)
             {
          %>
<div class="tui tui1">
 <a href="details.jsp?id=<%=item.getId()%>">
 <img src="images/<%=item.getPicture()%>" style="border-radius:10px;" width="160" height="250"/>
 <h3><%=item.getName() %></h3>
 </a>
</div>
 <% 
            }
          %>
          

<% 
             ItemsDAO itemDao2 = new ItemsDAO();
             Items item2 = itemDao.getItemsById(Integer.parseInt("2"));
             if(item2!=null)
             {
          %>
<div class="tui tui2">
<a href="details.jsp?id=<%=item2.getId()%>">
 <img src="images/<%=item2.getPicture()%>" style="border-radius:10px;" width="160" height="250"/>
 <h3><%=item2.getName() %></h3>
 </a>
</div>
 <% 
            }
          %>
<% 
             ItemsDAO itemDao3 = new ItemsDAO();
             Items item3 = itemDao.getItemsById(Integer.parseInt("3"));
             if(item3!=null)
             {
          %>
<div class="tui tui3">
<a href="details.jsp?id=<%=item3.getId()%>">
 <img src="images/<%=item3.getPicture()%>" style="border-radius:10px;" width="160" height="250"/>
 <h3><%=item3.getName() %></h3>
 </a>
</div>
 <% 
            }
          %>
</div>
<div class="tuijian2">
<div class="biaoti2">
<h1>精选评论<h1>
<p>合作伙伴和开源组织提供的高质量评论</p>
<a href="discuss.jsp">查看全部</a>
</div>
<% 
             DiscussDAO discussDao = new DiscussDAO();
    		 Discuss discuss = discussDao.getdiscuss(Integer.parseInt("1"));
             if(discuss!=null)
             {
          %>
<div class="tui4 tui5">
<a href="textdiscuss.jsp?textid=<%=discuss.getTextid() %>">
<h3><%=discuss.getName() %></h3>
<p><%=discuss.getContent()%></p>
</a>
</div>
 <% 
            }
          %>
<% 
             DiscussDAO discussDao2 = new DiscussDAO();
    		 Discuss discuss2 = discussDao.getdiscuss(Integer.parseInt("2"));
             if(discuss2!=null)
             {
          %>
<div class="tui4 tui6">
<a href="textdiscuss.jsp?textid=<%=discuss2.getTextid() %>">
<h3><%=discuss2.getName() %></h3>
<p><%=discuss2.getContent()%></p>
</a>
</div>
 <% 
            }
          %>
<% 
             DiscussDAO discussDao3 = new DiscussDAO();
    		 Discuss discuss3 = discussDao.getdiscuss(Integer.parseInt("3"));
             if(discuss3!=null)
             {
          %>
<div class="tui4 tui7">
<a href="textdiscuss.jsp?textid=<%=discuss3.getTextid() %>">
<h3><%=discuss3.getName() %></h3>
<p><%=discuss3.getContent()%></p>
</a>
</div>
 <% 
            }
          %>
<% 
             DiscussDAO discussDao4 = new DiscussDAO();
    		 Discuss discuss4 = discussDao.getdiscuss(Integer.parseInt("4"));
             if(discuss4!=null)
             {
          %>
<div class="tui4 tui8">
<a href="textdiscuss.jsp?textid=<%=discuss4.getTextid() %>">
<h3><%=discuss4.getName() %></h3>
<p><%=discuss4.getContent()%></p>
</a>
</div>
 <% 
            }
          %>
</div>

<div>
<div class="fabu" id="fabu">
<form action="servlet/ItemsServlet?action=add1" method="post" enctype="multipart/form-data">
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
		<!-- 特性 -->

		<hr class="feature-divider" style="width:1170px;margin-left:-15px;">
<div class="modal fade" id="about-modal" tabindex="-1" role="dialog"
			aria-labelledby="modal-label" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
						</button>
						<h4 class="modal-title" id="modal-label">关于</h4>
					</div>
					<div class="modal-body">
						<p>青花瓷又称白地青花瓷，常简称青花，中华陶瓷烧制工艺的珍品。是中国瓷器的主流品种之一，属釉下彩瓷。青花瓷是用含氧化钴的钴矿为原料，在陶瓷坯体上描绘纹饰，再罩上一层透明釉，经高温还原焰一次烧成。钴料烧成后呈蓝色，具有着色力强、发色鲜艳、烧成率高、呈色稳定的特点。原始青花瓷于唐宋已见端倪，成熟的青花瓷则出现在元代景德镇的湖田窑。明代青花成为瓷器的主流。清康熙时发展到了顶峰。明清时期，还创烧了青花五彩、孔雀绿釉青花、豆青釉青花、青花红彩、黄地青花、哥釉青花等衍生品种。</p>
                </div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">了解了</button>
					</div>
				</div>
			</div>
		</div>

		<footer>
			<p class="pull-right">
				<a href="#top">back top</a>
			</p>

			<p>&copy; 2016 qht</p>
		</footer>

<script src="js/jquery-1.11.1.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script>
		$(function() {
			//$('#ad-carousel').carousel();
			$('#menu-nav .navbar-collapse a').click(function(e) {
				var href = $(this).attr('href');
				var tabId = $(this).attr('data-tab');
				if ('#' !== href) {
					e.preventDefault();
					var offset = $(href).offset().top;
					$(document).scrollTop(offset - 70);
					if (tabId) {
						$('#feature-tab a[href=#' + tabId + ']').tab('show');
					}
				}
			});
		});
	</script>	
  </body>
</html>
