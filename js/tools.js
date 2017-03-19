function FPS(){
	var start_time = 0;
	var end_time = 0;
	var fps = 0;
	var frame = 0;
	this.start = function(){
		//get start time
		start_time = Date.parse(new Date());
	}
	this.end = function(){
		//get end time
		end_time = Date.parse(new Date());
	}
	this.frame = function(){
		//end_time = Date.parse(new Date()  );
		end_time = new Date().getTime();
		if(end_time >= start_time + 1000)
		{
			fps = frame;
			frame = 0;
			start_time = end_time;
		}
		else
			frame ++;
	}
	this.getFps = function(){
		return fps;
	}
}
var FTools = new Object();
FTools.Vector2DNormal = function(x, y){
	var dis = Math.sqrt(x*x+y*y);
	return {x:x/dis, y:y/dis};
}
FTools.Vector1DNormal = function(dis){
	if(dis > 0)
		return 1;
	else if(dis < 0)
		return -1;
	else
		return 0;
}
FTools.addMapFlag = function(map_data, flag){
	for(var i = 0; i < map_data.length; i ++)
	{
		for(var j = 0; j < map_data[0].length; j ++)
		{
			map_data[i][j].f = flag[i][j];
		}
	}
}
FTools.SetMapData = function(format, data){
	var map_data = new Array();
	for(var i = 0; i < data.length; i ++)
	{
		map_data[i] = new Array();
		for(var j = 0; j < data[0].length; j ++)
		{
			//x:0,y:0,width:63,height:50, i:3, f:0
			map_data[i][j] = new Object();
			map_data[i][j].x=format.x; map_data[i][j].y=format.y;
			map_data[i][j].width=format.width;map_data[i][j].height=format.height;
			map_data[i][j].i=format.i; map_data[i][j].f=data[i][j];
		}
	}
	return map_data;
}
//设置地图数据(扩展版本，根据地图数据标志位(0/1),数据显示，格式模板)
FTools.SetMapDataEx = function(flag,show,res){
	var map_data = new Array();
	for(var i = 0; i < show.length; i ++)
	{
		map_data[i] = new Array();
		for(var j = 0; j < show[0].length; j ++)
		{
			map_data[i][j] = new Object();
			map_data[i][j].x = res[show[i][j]].x;map_data[i][j].y = res[show[i][j]].y;
			map_data[i][j].width=res[show[i][j]].width;map_data[i][j].height=res[show[i][j]].height;
			map_data[i][j].i=res[show[i][j]].i;
 			map_data[i][j].f = flag[i][j];
		}
	}
	return map_data;
}
function FAjax(){
	this.xmlhttp;
	this.func;
	this.text;
	this.init = function(){
		if(window.XMLHttpRequest)
		{
			this.xmlhttp = new XMLHttpRequest();
		}
		else
		{
			this.xmlhttp = new ActiveObject("Microsoft.XMLHTTP");
		}
	}
	this.reader = function(url,text, onfunc){
		this.func = onfunc;
		var xmlhttp;
		if(window.XMLHttpRequest)
		{
			xmlhttp = new XMLHttpRequest();
		}
		else
		{
			xmlhttp = new ActiveObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState == 4 && xmlhttp.status==200)
			{
				onfunc(xmlhttp.responseText);
			}
			else
			{
				
			}
		}; 
		xmlhttp.open("POST", url, true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send(text);
	}
	this.onCompletion = function(){
		if(this.xmlhttp.readyState == 4 && this.xmlhttp.status==200)
		{
			
		}
		else
		{
			
		}
	}
}
