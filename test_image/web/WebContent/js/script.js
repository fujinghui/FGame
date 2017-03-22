window.onload=function(){ 
	setInterval(time,100);
	daohang();
	skip();
	list();
	}
function time(){
	var mytime=new Date();
	var weeks=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	var nowtime=mytime.getTime();
	var year=mytime.getFullYear();
	var month=mytime.getMonth()+1;
	var day=mytime.getDate();
	var hour=mytime.getHours();
	var minute=mytime.getMinutes();
	var second=mytime.getSeconds();
	var days=mytime.getDay();
	if(month<10){month="0"+month.toString();}
	if(day<10){day="0"+day.toString();}
	if(hour<10){hour="0"+hour.toString();}
	if(minute<10){minute="0"+minute.toString();}
	if(second<10){second="0"+second.toString();}
	document.getElementById("time").innerHTML="时间:"+year+"年"+month+"月"+day+"日"+hour+":"+minute+":"+second+" "+weeks[days];
	}
function daohang(){
	var a=document.getElementById("left");
	var b=a.getElementsByTagName("li");
	var	c=a.getElementsByTagName("section");
	b[0].addEventListener("mouseover",function(event){
			c[0].style.display="block";
			b[0].style.background="#F90"
			b[0].style.color="#000";		
	},false)
	c[0].addEventListener("mouseover",function(){
			c[0].style.display="block";
			b[0].style.background="#F90"
			b[0].style.color="#000";
	},false)
	b[0].addEventListener("mouseout",function(){
			c[0].style.display="none";
			b[0].style.background="#000"
			b[0].style.color="#FFF"
	},false)
	c[0].addEventListener("mouseout",function(){
			c[0].style.display="none";
			b[0].style.background="#000"
			b[0].style.color="#FFF"
	},false)
	b[1].addEventListener("mouseover",function(event){
			c[1].style.display="block";
			b[1].style.background="#F90"
			b[1].style.color="#000";		
	},false)
	c[1].addEventListener("mouseover",function(){
			c[1].style.display="block";
			b[1].style.background="#F90"
			b[1].style.color="#000";
	},false)
	b[1].addEventListener("mouseout",function(){
			c[1].style.display="none";
			b[1].style.background="#000"
			b[1].style.color="#FFF"
	},false)
	c[1].addEventListener("mouseout",function(){
			c[1].style.display="none";
			b[1].style.background="#000"
			b[1].style.color="#FFF"
	},false)
	b[2].addEventListener("mouseover",function(event){
			c[2].style.display="block";
			b[2].style.background="#F90"
			b[2].style.color="#000";		
	},false)
	c[2].addEventListener("mouseover",function(){
			c[2].style.display="block";
			b[2].style.background="#F90"
			b[2].style.color="#000";
	},false)
	b[2].addEventListener("mouseout",function(){
			c[2].style.display="none";
			b[2].style.background="#000"
			b[2].style.color="#FFF"
	},false)
	c[2].addEventListener("mouseout",function(){
			c[2].style.display="none";
			b[2].style.background="#000"
			b[2].style.color="#FFF"
	},false)
	b[3].addEventListener("mouseover",function(event){
			c[3].style.display="block";
			b[3].style.background="#F90"
			b[3].style.color="#000";		
	},false)
	c[3].addEventListener("mouseover",function(){
			c[3].style.display="block";
			b[3].style.background="#F90"
			b[3].style.color="#000";
	},false)
	b[3].addEventListener("mouseout",function(){
			c[3].style.display="none";
			b[3].style.background="#000"
			b[3].style.color="#FFF"
	},false)
	c[3].addEventListener("mouseout",function(){
			c[3].style.display="none";
			b[3].style.background="#000"
			b[3].style.color="#FFF"
	},false)
	b[4].addEventListener("mouseover",function(event){
			c[4].style.display="block";
			b[4].style.background="#F90"
			b[4].style.color="#000";		
	},false)
	c[4].addEventListener("mouseover",function(){
			c[4].style.display="block";
			b[4].style.background="#F90"
			b[4].style.color="#000";
	},false)
	b[4].addEventListener("mouseout",function(){
			c[4].style.display="none";
			b[4].style.background="#000"
			b[4].style.color="#FFF"
	},false)
	c[4].addEventListener("mouseout",function(){
			c[4].style.display="none";
			b[4].style.background="#000"
			b[4].style.color="#FFF"
	},false)
	var f=document.getElementById("gwc");
	var g=document.getElementById("bb");
	f.addEventListener("mouseover",function(){
		g.style.display="block";
		f.style.background="#666";
		f.style.color="#FFF";
	},false)
	f.addEventListener("mouseout",function(){
		g.style.display="none";
	},false)
	g.addEventListener("mouseover",function(){
		g.style.display="block";
		f.style.background="#666";
		f.style.color="#FFF";
	},false)
	g.addEventListener("mouseout",function(){
		g.style.display="none";
		f.style.background="#000";
		f.style.color="#F90";
	},false)
}

function skip(){
	var a=document.getElementById("dr");
	var b=document.getElementById("zc");
	a.addEventListener("click",function(){
		window.location.href="login1.jsp";
	},false)
	b.addEventListener("click",function(){
		window.location.href="login1.jsp";
	},false)
}
