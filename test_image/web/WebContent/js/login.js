window.onload=function(){
	setInterval(time,100);
	login();
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
function login(){
	var a=document.getElementById("zuo");
	var b=document.getElementById("you");
	var c=document.getElementById("zhuce");
	var d=document.getElementById("denglu");
	var f=document.getElementById("dr");
	var h=document.getElementById("huiyuandr");
	var g=document.getElementById("zc");
	a.addEventListener("click",function(){
		c.style.display="none";
		d.style.display="block";
	},false)
	b.addEventListener("click",function(){
		d.style.display="none";
		c.style.display="block";
	},false)
	f.addEventListener("click",function(){
		c.style.display="block";
		d.style.display="none";
	},false)
	g.addEventListener("click",function(){
		d.style.display="block";
		c.style.display="none";
	},false)
	}