function Car(){
	//网格坐标
	this.grid_x = 0;
	this.grid_y = 0;
	this.grid_width = 0;
	this.grid_height = 0;
	this.grid_vx = 0;
	this.grid_vy = 0;
	//目标网格
	this.grid_destion_x = 0;
	this.grid_destion_y = 0;
	//坐标
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.ax = 0;
	this.ay = 0;
	this.destion_x = 0;
	this.destion_y = 0;
	this.map_x = 0;
	this.map_y = 0;
	//角度值
	this.angle = 0;				//小车的当前朝向
	this.destion_angle = 0;		//小车的目标朝向
	
	this.character = new FGAMES.Character();
	//地图数据
	this.map_data_current;
	//-------------------------------------------------
	var is_turn = false;
	var is_run = true;
	
	this.init = function(imgs){
		this.character.init(imgs);
	}
	this.setMapData = function(d){
		this.map_data_current = d;
		if(this.map_data_current)
		{
		//	console.log("have data");
		}
		else
		{
		//	console.log("not have data");
		}
	}
	this.setGridPosition = function(x, y){
		this.grid_x = x;
		this.grid_y = y;
		this.x = x * this.grid_width;
		this.y = y * this.grid_height;
	}
	this.setDestionGridPosition = function(x, y){
		//
		this.grid_destion_x = x;
		this.grid_destion_y = y;
		this.destion_x = x * this.grid_width;
		this.destion_y = y * this.grid_height;
		
		this.vx = (Math.random() + 1) *(this.grid_destion_x - this.grid_x);
		this.vy = (Math.random() + 1) *(this.grid_destion_y - this.grid_y);
		is_run = true;
	}
	this.addFrame = function(frame){
		this.character.addFrame(frame);
	}
	this.draw = function(context){
		this.character.x = this.x;
		this.character.y = this.y;
		this.grid_x = Math.round(this.x / this.grid_width);
		this.grid_y = Math.round(this.y / this.grid_height);
		
		
		//计算角度值
		this.character.rotate(this.angle);
		this.angle = this.angle + (this.destion_angle - this.angle) / 10;
		this.character.setRotatePosition(this.character.getImageWidth() / 2, this.character.getImageHeight() / 2);
		
		this.character.draw(context);
		
		this.logicalProcessing();
	}
	this.frame = function(){
	//	console.log("run:"+is_run + " turn:"+is_turn);
		//判断小车是否旋转完毕
		if(is_turn == true && (this.destion_angle - this.angle) <= 0.001)
		{
			is_turn = false;
		}
		if(is_run == true && Math.abs(this.destion_x - this.x) <= 4 && Math.abs(this.destion_y - this.y) <= 4)
		{
			this.grid_x = this.grid_destion_x;
			this.grid_y = this.grid_destion_y;
			this.x = this.grid_x * this.grid_width;
			this.y = this.grid_y * this.grid_height;
			is_run = false;
		//	console.log("run ++++++++++++++++++++");
		}
		
		//如果小车没有在转换
		if(is_turn == false)
		{
			this.x += this.vx;
			this.y += this.vy;
			this.vx += this.ax;
			this.vy += this.ay;
			this.grid_vx = (this.vx > 0)?1:((this.vx < 0)?-1:0);
			this.grid_vy = (this.vy > 0)?1:((this.vy < 0)?-1:0);
		}
		this.character.frame();
	}
	this.logicalProcessing = function(){
	//	console.log("grid_x:"+this.grid_x + " gird_y:"+this.grid_y);
		//小车跑出了地图区域
		if(this.gird_x >= this.map_data_current[0].length || this.grid_x < 0 || this.grid_y >= this.map_data_current.length || this.grid_y < 0)
		{
			this.grid_x = 0;
			this.grid_y = 9;
			this.grid_vx = 1;
			this.grid_vy = 0;
		//	console.log(this.grid_x);
			this.x = this.grid_x * this.grid_width;
			this.y = this.grid_y * this.grid_height;
			this.vx = (Math.random() + 1) * this.grid_vx;
			this.vy = (Math.random() + 1) * this.grid_vy;
			this.ax = 0;
			this.ay = 0;
		}
		//小车正在奔跑，或者小车正在转弯，此时小车不进行任何逻辑处理
		if((is_turn == true || is_run == true) || this.map_data_current == null)
		{
			return;
		}
		else
		{
			//在四个方向上找出小车的下个位置
			var temp_forward = new Array();
			if(this.grid_y + 1 < this.map_data_current.length && this.map_data_current[this.grid_y + 1][this.grid_x].f == 0)
				temp_forward.push({
					vx:0,
					vy:1,
					grid_x:this.grid_x,
					grid_y:this.grid_y + 1,
					angle:Math.PI
				});
			if(this.grid_y - 1 >= 0 && this.map_data_current[this.grid_y - 1][this.grid_x].f == 0)
				temp_forward.push({
					vx:0,
					vy:-1,
					grid_x:this.grid_x,
					grid_y:this.grid_y - 1,
					angle:0
				});
			if(this.grid_x + 1 < this.map_data_current[0].length && this.map_data_current[this.grid_y][this.grid_x + 1].f == 0)
				temp_forward.push({
					vx:1,
					vy:0,
					grid_x:this.grid_x + 1,
					grid_y:this.grid_y,
					angle:Math.PI / 2
				});
				
			if(this.grid_x - 1 >= 0 && this.map_data_current[this.grid_y][this.grid_x - 1].f == 0)
				temp_forward.push({
					vx:-1,
					vy:0,
					grid_x:this.grid_x - 1,
					grid_y:this.grid_y,
					angle:Math.PI / 2 + Math.PI
				});
			//表明有至少两个路，删除掉小车原来的行走方式
			if(temp_forward.length >= 2)
			{
				for(var i = 0; i < temp_forward.length - 1; i ++)
				{
					if(temp_forward[i].vx == -this.grid_vx && temp_forward[i].vy == -this.grid_vy)
					{
						var t = temp_forward[i];
						temp_forward[i] = temp_forward[temp_forward.length - 1];
						temp_forward[temp_forward.length - 1] = t;
					}
				}
				//删除掉原来运行方向相反的
				temp_forward.pop();			//剔除掉小车原来的行驶路径
			}
			
			var index = Math.round(Math.random() * (temp_forward.length - 0.51));
			
			//如果方向与之前的一样，则不需要转弯
			if( this.grid_vx == temp_forward[index].vx &&
				this.grid_vy == temp_forward[index].vy &&
				this.destion_angle == temp_forward[index].angle)
			{
				
			}
			else
			{
				this.destion_angle = temp_forward[index].angle;
				//设置标记为转弯
				is_turn = true;		
			}
			//行驶到小车的下一个目标的初始化
				this.grid_destion_x = temp_forward[index].grid_x;
				this.grid_destion_y = temp_forward[index].grid_y;
				
				this.grid_vx = temp_forward[index].vx;
				this.grid_vy = temp_forward[index].vy;
				
				this.vx = this.grid_vx*3;//(Math.random() + 1) * this.grid_vx;
				this.vy = this.grid_vy*3;//(Math.random() + 1) * this.grid_vy;
				
				this.ax = 0;
				this.ay = 0;
			
				this.destion_x = this.grid_width * temp_forward[index].grid_x;
				this.destion_y = this.grid_height * temp_forward[index].grid_y;
				is_run = true;
			///-------------------------------------------------------
			while(temp_forward.length){
				temp_forward.pop();
			}
			temp_forward = null;			//销毁数据
		}
		
	}
}
//任务对象
function Task(){
	this.task_progress = 0;
	this.task_accept = false;
	this.task_count = 3;			//任务总数量
	
	//任务列表：描述以及是否完成
	this.task_list = [
	
	{describe:"先去珍稀动物保护协会看看吧！", completion:false},					//0
	{describe:"再去找珍稀动物保护协会的长官完成他所说的检验", completion:false},		//1
	{describe:"离开珍稀动物保护协会", completion:false},						//2
	{describe:"与周围的npc对话，看看能不能得到什么线索", completion:false},			//3
	{describe:"前往肉贩市场，找寻线索", completion:false},						//4
	{describe:"前往北边的安多县（注意：在当前地图的上方）", completion:false},		//5
	{describe:"前往安多县", completion:false},								//6
	{describe:"去和药店门口的医生对话，看看能不能得到什么有用的线索", completion:false},	//7
	{describe:"前往可可西里（注意：在当前地图的右上方）", completion:false},			//8
	{describe:"那边有一群可疑的人，去看看！", completion:false},					//9
	{describe:"那边有一群可以的人，去看看", completion:false},									//10
	{describe:"去南边的灌木丛解救被困住的动物", completion:false},						//11
	{describe:"恭喜您，已经通关了！", completion:false}						//12
	];
	
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.visible = false;
	this.image_background = null;
	this.fontsize = 25;
	this.button = new Array();
	this.text = null;
	this.init = function(){
		this.button[0] = new FGAMES.Button("确定");
		this.button[0].setWidth(this.w-20);
		this.button[0].setHeight(40);
		this.button[0].setPosition(this.x + (this.w-this.button[0].getWidth())/2, this.y + this.h-this.button[0].getHeight());
		this.button[0].setDefaultBackgroundImage("img/button1.png");
		this.button[0].setOnTouchBackgroundImage("img/button1_click.png");
		
		this.button[0].addOnClickListener(function(){
			task.visible = false;
			task.text = null;
		});
		
		this.image_background = new Image();
		this.image_background.src = "img/dialog_text_background.png";
	}
	this.Constructor = function(){
		return this.button;
	//	return [this.button[1],this.button[2],this.button[3]];
	}
	//对象销毁，并且返回要从场景里删除的对象
	this.Destructor = function(){
		return this.button;
	}
	
	this.draw = function(context){
		if(this.visible == true)
		{
			context.drawImage(this.image_background,
				0, 0, this.image_background.width, this.image_background.height,
				this.x, this.y, this.w, this.h);
			context.fillStyle = "rgb(200, 200, 100)";
			context.font = "italic "+this.fontsize+"px arial,sans-serif";
			var t;
			if(this.text == null)
				t = this.task_list[this.task_progress].describe;
			else
				t = this.text;
			//一行可以容纳的字
			var line_count = Math.round(this.w/this.fontsize-1.0);
			var yy = 0;
			while(t.length > line_count)
			{
				var tt = t.substr(0, line_count);
				context.fillText(tt, this.x, this.y+yy);
				t = t.substr(line_count, t.length);
				yy += this.fontsize;
			}
			if(t.length > 0)
			{
				context.fillText(t, this.x, this.y + yy);
			}
			
			//设置按钮可见
			for(var i = 0; i < this.button.length; i ++)
			{
				this.button[i].visible = true;
			}
		}
		else
		{
			for(var i = 0; i < this.button.length; i ++)
				this.button[i].visible = false;
		}
	}
	this.TaskIsCompletion = function(i){
		return this.task_list[i].completion;
	}
	this.getTaskProgress = function(){
		return this.task_progress;
	}
	this.getTaskCount = function(){
		return this.task_count;
	}
}

//背包对象
function Knapsack(){
	this.x = 0;
	this.y = 0;
	this.w = 400;
	this.h = 400;
	this.visible = false;
	this.draw = function(context){
		if(this.visible == false)
		{
			return;
		}
		context.fillStyle = "rgba(200, 200, 200, 0.5)";
		context.fillRect(this.x, this.y, this.w, this.h);
	}
	this.frame = function(context){
		
	}
	this.onmousedown = function(e){
		
	}
}
//-------------------文字对话框--------------------
function DialogText(obj){
	this.parent = obj;
	this.SCREEN_WIDTH = 1024;
	this.SCREEN_HEIGHT=  640;
	this.x = 0;
	this.y = 0;
	this.w = 100;
	this.h = 100;
	this.text;					//显示的文本
	this.all_text;
	this.text_before = null;
	this.text_after = null;
	this.text_index;
	this.fontsize = 40;			
	this.character_text = "";
	this.visible = false;
	this.show_count = 1;			//对话框显示次数
	this.current_show_index = 0;	//当前显示的是第几次
	this.call_function = null;
	
	this.image_background = null;
	this.setDialogShowCount = function(count){
		this.show_count = count;
	}
	this.setCallFunc = function(call){
		this.call_function = call;
	}
	this.setPosition = function(pos){
		this.x = pos.x;
		this.y = pos.y;
		this.w = pos.w;
		this.h = pos.h;
	}
	this.setWindow = function(window){
		//设置窗口的大小
		this.SCREEN_WIDTH = window.w;
		this.SCREEN_HEIGHT = window.h;
		//根据窗口的大小自动显示文字对话框的位置和大小
		this.w = this.SCREEN_WIDTH * 2 / 3;				//文字对话框的宽度是窗口的2/3
		this.h = this.SCREEN_HEIGHT / 4;				//文字对话框的高度是窗口的1/4
		this.x = (this.SCREEN_WIDTH - this.w)/2			
		this.y = (this.SCREEN_HEIGHT - this.h - 10) - 55;		
		if(this.image_background == null)
		{
			this.image_background = new Image();
			this.image_background.src = "img/dialog_text_background.png";
		}
	}
	this.getType = function(){
		return 'Button';
	}
	this.setTextSimple = function(t){
		//
	}
	this.setText =  function(t){
		if(t == null)
		{
			this.all_text = null;
			return ;
		}
		if(t instanceof Array)
		{
			//将过长的文字分解掉
			var tt = new Array();
			//计算一页对话框能够显示多少文字
			var acount = Math.round(this.w/this.fontsize-1.0)*Math.round(this.h/this.fontsize-1.0);
			for(var i = 0; i < t.length; i ++)
			{
				var temp = t[i].context;
				while(this.fontsize*temp.length>acount)
				{
					tt[tt.length] = new Array();
					tt[tt.length - 1].name = t[i].name;
					tt[tt.length - 1].context = temp.substring(0, acount);
					temp = temp.substring(acount, temp.length);
				}
				if(temp.length > 0)
				{
					tt[tt.length] = new Array();
					tt[tt.length - 1].name = t[i].name;
					tt[tt.length - 1].context = temp;
				}
			}
			this.all_text = tt;
			this.text = this.all_text[0].context;
			this.character_text = this.all_text[0].name;
			this.text_index = 0;
		}
		else
		{
			this.text_index = 0;
			this.text = t.context;
			this.character_text = t.name;
		}
	}
	//之前
	this.setTextBefore = function(t){
		this.text_before = t;
		this.setText(t);
	}
	//之后
	this.setTextAfter = function(t){
		this.text_after = t;
	}
	this.setCharacterText = function(t){
		//this.character_text = t;
	}
	this.frame = function(){
		
	}
	this.call_onclicklistener = function(e){
		if(this.visible == false)
			return ;
		
		if(this.all_text instanceof Array)
		{
			
			if(this.text_index >= this.all_text.length - 1)
			{
				this.text_index = -1;
				this.visible = false;				//对话完，设置对话框不显示
			}
			this.text_index += 1;
			this.text = this.all_text[this.text_index].context;
			this.character_text = this.all_text[this.text_index].name;
		}
		else
		{
			this.visible = false;
		}
	}
	this.onkeydown = function(e){
		if(this.visible == false)
			return ;
		if(e.keyCode == 32)
		{
			if(this.all_text instanceof Array)
			{
				if(this.text_index >= this.all_text.length - 1)
				{
					this.text_index = -1;
					this.visible = false;				//对话完，设置对话框不显示
					//调用完成函数
					if(this.call_function)
						this.call_function();
					
					//对话内容显示完毕
					if(this.current_show_index >= this.show_count - 1 && this.text_after != null)
					{
						
						this.all_text = this.text_after;		//设置显示"之后"文字
						this.text_index = -1;
					}
					else
						this.current_show_index += 1;
				}
				this.text_index += 1;
				if(this.text_index >= this.all_text.length)
					return ;
				this.text = this.all_text[this.text_index].context;
				this.character_text = this.all_text[this.text_index].name;
			}
			else
			{
				this.visible = false;
				if(this.call_function)
					this.call_function();
			}
		}
		
	}
	this.drawRotateRect = function(context, x, y, w, h, r){
		context.fillRect(x + r, y + r, w-2*r,h-2*r);
		//左右两边的填补矩形
		context.fillRect(x, y+r, r, h-r-r);
		context.fillRect(x+w-r, y+r, r,h-r-r);
		//上下两边的填补矩形
		context.fillRect(x+r, y, w-r-r, r);
		context.fillRect(x+r, y+h-r, w-r-r,r);
		context.beginPath();
		context.fillStyle = "rgba(200, 150, 40, 0.5)";
		//左上
		context.moveTo(x+r, y+r);
		context.arc(x+r,y+r,r,Math.PI, Math.PI+Math.PI/2, false);
		//左下
		context.moveTo(x+r,y+h-r);
		context.arc(x+r,y+h-r,r,Math.PI/2, Math.PI, false);
		//右上
		context.moveTo(x+w-r,y+r);
		context.arc(x+w-r,y+r,r,Math.PI+Math.PI/2, Math.PI*2, false);
		//右下
		context.moveTo(x+w-r,y+h-r);
		context.arc(x+w-r,y+h-r, r,0, Math.PI/2, false);
		
		context.fill();
	}
	this.draw = function(context){
		if(this.visible == false || this.text == null)
			return;
		context.textBaseline = "top";
		context.fillStyle = "rgba(50, 125, 10, 0.5)";
		if(this.image_background)
			context.drawImage(this.image_background,
				0, 0, this.image_background.width, this.image_background.height,
				this.x, this.y - this.h / 2 - 10, this.w / 3, this.h / 2);
		else
		context.fillRect(this.x, this.y - this.h / 2 - 10, this.w / 3, this.h / 2);
		if(this.image_background)
			context.drawImage(this.image_background,
				0, 0, this.image_background.width, this.image_background.height,
				this.x, this.y, this.w, this.h);
		else
			context.fillRect(this.x, this.y, this.w, this.h);
		//this.drawRotateRect(context, this.x, this.y, this.w, this.h, 30);
		context.fillStyle = "rgb(255, 255, 255)";
		
		context.font = (this.fontsize+10) + "px Arial";
		//context.font = (this.fontsize+10)+"px Courier New";
		//context.font = "italic bold 40px arial,sans-serif";
		context.fillText(this.character_text, this.x, this.y - this.h / 2 - 10);
		
		context.font = "bold "+this.fontsize+"px arial,sans-serif";
		context.font = "italic "+this.fontsize+"px arial,sans-serif";
		//context.font = this.fontsize + "px Arial";
		if(this.text.length * this.fontsize > this.w)
		{
			var count = Math.round(this.text.length * this.fontsize / (this.w - this.fontsize) + 0.5);
			var s = Math.round((this.w-this.fontsize) / this.fontsize);
			for(var i = 0; i < count;  i ++)
			{
				var t = this.text.substr(i * s, s);
				context.fillText(t, this.x, this.y + this.fontsize * i);
			}
		}
		else
		{
			context.fillText(this.text, this.x, this.y);
		}
	}
}


function TransmitPoint(){
	FGAMES.Character.call(this, arguments);
	this.xr = 100;
	this.yr = 40;
	this.cx = 0;
	this.cy = 0;
	this.angle = 0;
	this.count = 10;
	this.visible = true;
	this.image = null;
	this.draw = function(context){
		if(this.visible == false)
			return;
		//console.log("fafd");
		this.cx = this.x + this.width/2;
		this.cy = this.y + this.height/2;
		if(this.image)
		{
			context.drawImage(this.image, 
				0, 0, this.image.width, this.image.height,
				this.cx-this.xr, this.cy-this.yr, this.xr*2, this.yr*2
			);
		}
		context.fillStyle = "rgba(56, 245, 80, 0.7)";
		//context.fillRect(this.x, this.y, this.width, this.height);
		for(var i = 0; i < this.count;  i ++)
		{
			var xx = this.cx + this.xr * Math.cos(Math.PI * 2 / this.count * i + this.angle);
			var yy = this.cy - 25 + this.yr * Math.sin(Math.PI * 2 / this.count * i + this.angle);
			//console.log("x:"+xx);
			//console.log("y:"+yy);
			context.fillRect(xx, yy, 2, 15);
		}
		this.angle += 0.01;
	}
}

//栅栏对象
function Fence(){
	FGAMES.Character.call(this, arguments);
	
	this.REPEAT_X = 1;
	this.REPEAT_Y = 2;
	this.REPEAT_X_Y = 4;
	
	this.n = 1;					//重复的次数
	this.x_n = 1;				//x轴方向上的重复次数
	this.y_n = 1;				//y轴方向上的重复次数
	this.repeat_mode = 1;
	this.is_reverse = false;
	
	this.not_show_indexs = null;
	
	this.images = new Array();
	this.show_images = new Array();
	
	this.addImage = function(path){
		for(var i = 0; i < path.length; i ++)
		{
			this.images[this.images.length] = new Image();
			this.images[this.images.length - 1].src = path[i];
		}
	}
	this.addShowImage = function(frame){
		/* i
		 * x,y,w,h
		 * dx,dy,dw,dh
		 */
		this.show_images[this.show_images.length] = frame;
	}
	this.setRepeatMode = function(mode){
		this.repeat_mode = mode;
	}
	this.setNoShowIndex = function(indexs){
		this.not_show_indexs = indexs;				//设置不显示索引
	}
	this.setRepeatCount = function(count){
		this.n = count;
		if(this.repeat_mode == this.REPEAT_X)
		{
			this.x_n = count;
		}
		else if(this.repeat_mode == this.REPEAT_Y)
		{
			this.x_n = count;
		}
		else if(this.repeat_mode == this.REPEAT_X_Y)
		{
			this.x_n = count;
			this.y_n = count;
		}
	}
	this.setRepeatXCount = function(count){
		this.x_n = count;
	}
	this.setRepeatYCount = function(count){
		this.y_n = count;
	}
	this.getRepeatCount = function(){
		if(this.repeat_mode == this.REPEAT_X)
			return this.x_n;
		else if(this.repeat_mode == this.REPEAT_Y)
			return this.y_n;
		else if(this.repeat_mode == this.REPEAT_X_Y)
			return {x:this.x_n, y:this.y_n};
	}
	
	this.pdraw = this.draw;
	this.draw = function(context){
		//console.log("mode:"+this.repeat_mode + "  repeat:"+this.REPEAT_X);
		var flag = true;
		if(this.repeat_mode == this.REPEAT_X)
		{
			for(var i = 0; i < this.n; i = i + 1)
			{
			//	console.log(i);
				flag = true;
				if(this.not_show_indexs)
					for(var j = 0; j < this.not_show_indexs.length; j ++)
					{
						if(i == this.not_show_indexs[j])
						{
							flag = false;
							break;
						}
					}
				if(flag == true)
					this.pdraw(context);
				if(this.is_reverse == true)
					this.x = this.x - this.getWidth();
				else
					this.x = this.x + this.getWidth();
			}
			if(this.is_reverse == true)
				this.x = this.x + this.getHeight() * this.n;	
			else
				this.x = this.x - this.getWidth()* this.n;
	
		}
		else if(this.repeat_mode == this.REPEAT_Y)
		{
			for(var i = 0; i < this.n; i += 1)
			{
				flag = true;
				if(this.not_show_indexs)
					for(var j = 0; j < this.not_show_indexs.length; j ++)
					{
						if(i == this.not_show_indexs[j])
						{
							flag = false;
							break;
						}
					}
				if(flag == true)
					this.pdraw(context);
				if(this.is_reverse == true)
					this.y -= this.getHeight();
				else
					this.y += this.getHeight();
	
			}
			if(this.is_reverse == true)
				this.y += this.getHeight() * this.n;
			else
				this.y -= this.getHeight() * this.n;
		}
		else if(this.repeat_mode == this.REPEAT_X_Y)
		{
			for(var i = 0; i < this.y_n; i += 1)
			{
				for(var j = 0; j < this.x_n; j += 1)
				{
					this.pdraw(context);
					this.x += this.getWidth();
				}
				this.y += this.getHeight();
			}
			this.x -= this.getWidth() * this.x_n;
			this.y -= this.getHeight() * this.y_n;
		}
		//
		for(var i = 0; i < this.show_images.length; i ++)
		{
			//context.fillRect(0, 0, 300, 400);
			context.drawImage(this.images[this.show_images[i].i], 
				this.show_images[i].x, this.show_images[i].y, this.show_images[i].w, this.show_images[i].h,
				this.x+this.show_images[i].dx, this.y-this.center_y+this.show_images[i].dy,this.show_images[i].dw,this.show_images[i].dh);
		}
	}
}

	//物体角色(NPC)
function Npc(){
		this.visible = true;
		//继承自Character类
		FGAMES.Character.call(this, arguments);
		//NPC类自带的特殊属性及其行为
		this.is_npc = true;			//标记当前类是一个npc类
		
		this.dialog_text = new DialogText(this);	//对话框文字
		this.dialog_range = {w:50,h:50};		//对话范围
		this.is_show_bubble = false;			//是否显示人物上方的气泡
		this.is_show_dialog = false;			//是否显示人物的对话框
		//对象
		this.image_dialog_bubble = new Image();	//
		this.image_dialog_bubble.src = "img/bubble.png";
		
		//获得父类的方法
		this.pdraw = this.draw;
		this.bubble_move_x = 0;
		this.bubble_move_y = 0;
		this.draw = function(context){
			if(this.visible == false)
				return;
			this.pdraw(context);
			//显示人物上方的气泡（如果该任务存在对话内容的话）
			if(this.is_show_bubble == true && this.dialog_text.all_text != null)
			{
					context.drawImage(this.image_dialog_bubble, 0, 0, this.image_dialog_bubble.width, this.image_dialog_bubble.height,
						this.x+this.bubble_move_x+(this.getWidth())/2, this.y+this.bubble_move_y-this.center_y-20,40,20
					);
			}
			else if(this.tussle)
				this.tussle.draw(context);
			//npc的显示对话框
			//this.dialog_text.draw(context);
		}
		this.pframe = this.frame;
		this.frame = function(){
			
			if(this.visible == false)
				return;
			this.pframe();
			if(this.tussle)
			{
				this.tussle.frame(context);
			}
		}
}

//打斗类
function Tussle(parent){
	this.is_send_bullet = true;
	this.health_point = 100;			//默认100生命值
	this.health_sub_speed = 2;			//血条减去的速度
	this.health_destion = 100;			//目标血条数
	
	this.health_bi = 0.6;
	this.bullets = new Array();		//{x:0,y:0,vx:0,vy:0,harm:0,start_x:0,start_y:0,distance:0};
	this.parent = parent;
	this.bullet_width = 10;
	this.bullet_height = 10;
	
	this.enemys = new Array();		//敌人
	this.die_call_func = null;
	this.attack_distance = 400;		//攻击距离
	this.die_object = null;			//是谁杀死了当前对象
	this.map_data = null;
	this.map_grid_width=0;
	this.map_grid_height=0;
	this.bullet_image = new Image();
	this.bullet_image.src = "img/bullet.png";
	this.addEnemy = function(s){
		this.enemys[this.enemys.length] = s;
	}
	this.clearEnemys = function(){
		while(this.enemys.length > 0)
			this.enemys.pop();
	}
	this.removeEnemy = function(s){
		for(var i = 0; i < this.enemys.length; i ++)
		{
			if(this.enemys[i] == s)
			{
				this.enemys[i] = this.enemys[this.enemys.length - 1];
				thsi.enemys.pop();
			}
		}
	}
	this.removeBullet = function(s){
		for(var i = 0; i < this.bullets.length; i ++)
		{
			if(this.bullets[i] == s)
			{
				this.bullets[i] = this.bullets[this.bullets.length - 1];
				this.bullets.pop();
				return ;
			}
		}
	}
	
	this.setDieCallFunc = function(func){
		this.die_call_func = func;
	}
	this.die_flag = false;
	//重新初始化
	this.init = function(){
		this.health_point = 100;
		this.health_destion = 100;
		this.die_flag = false;
	}
	//判断是否死亡
	this.isDie = function(){
		return (this.health_point<=0||this.health_destion<=0);
	}
	//var start
	this.draw = function(context){
		//减去地图坐标
		for(var i = 0; i < this.bullets.length; i ++)
		{
			/*
			 * 子弹的坐标需要转换成屏幕坐标
			 */
			context.save();
			this.bullets[i].x += this.bullets[i].vx;
			this.bullets[i].y += this.bullets[i].vy;
			context.fillStyle = "rgb(120, 40, 80)";
			//context.fillRect(this.bullets[i].x-map.x, this.bullets[i].y-map.y, this.bullet_width, this.bullet_height);
		//	context.translate(this.bullets[i].x+this.bullet_width/2, this.bullets[i].y+this.bullet_height/2);
			context.drawImage(this.bullet_image, 0, 0, 238, 238, this.bullets[i].x-map.x, this.bullets[i].y-map.y, this.bullet_width, this.bullet_height);
		//	context.rotate(this.bullets[i].angle);
		//	context.translate(-(this.bullets[i].x+this.bullet_width/2), -(this.bullets[i].y+this.bullet_height/2));

			
			context.restore();
			
			if(Math.abs(this.bullets[i].x-this.bullets[i].start_x) >= this.bullets[i].distance
			|| Math.abs(this.bullets[i].y-this.bullets[i].start_y) >= this.bullets[i].distance
			)
			{
				this.bullets[i] = this.bullets[this.bullets.length-1];
				this.bullets.pop();
			}
		}
		if(this.health_destion != this.health_point)
		{
			context.fillStyle = "rgb(20, 240, 30)";
			context.font = "20px Arial";
			context.textBaseline = "top";
			context.fillText("-"+Math.round(this.health_point-this.health_destion), this.parent.x-this.parent.center_x+this.parent.getWidth(), this.parent.y-this.parent.center_y-10);
		
		}
		
		context.strokeStyle = "rgb(0, 0, 0)";
		context.strokeRect(this.parent.x + (this.parent.getWidth() - 100 * this.health_bi)/2-1, this.parent.y-this.parent.getHeight()-20-1, 100*this.health_bi+2, 10+2);
		context.fillStyle = "rgb(250, 50, 50)";
		context.fillRect(this.parent.x+(this.parent.getWidth() - 100*this.health_bi)/2, this.parent.y-this.parent.getHeight()-20, this.health_point*this.health_bi, 10);
	}
	//设置2秒钟AI才能发射一次炮弹
	this.ai_send_bullet_time = 5000;			//ai每次发射炮弹的间隔时间
	this.ai_old_time = 0;
	this.frame = function(){
		if(this.health_point > this.health_destion + this.health_sub_speed)
		{
			this.health_point += (this.health_destion-this.health_point)/10;
		}
		else if(this.health_point < this.health_destion + this.health_sub_speed)
		{
			this.health_point = this.health_destion;
			//console.log("healt:"+this.health_point);
			if(this.health_point <= 0 && this.die_flag == true)
			{
				//该敌人已死亡，调用死亡回调函数
				this.die_call_func(this.die_object);
				this.die_flag = false;
			}
		}
		var tflag = true;
		//将敌人与当前的每一个子弹进行碰撞检测
		for(var j = 0; j < this.bullets.length&&tflag==true; j ++)
		{
			//判断是否有地图数据
			if(this.map_data)
			{
				var tx = Math.round(this.bullets[j].x/this.map_grid_width-0.5);
				var ty = Math.round(this.bullets[j].y/this.map_grid_height-0.5);
			//	console.log("tx:"+tx+" ty:"+ty);
				if(tx<0||ty<0||tx>=this.map_data[0].length||ty>=this.map_data.length||this.map_data[ty][tx].f == 1)
				{
					this.removeBullet(this.bullets[j]);
					break;
				}
			}
			//处理相碰撞情况
			for(var i = 0; i < this.enemys.length&&tflag==true; i += 1)
			{
				//只处理没有死亡的敌人
				if(this.enemys[i].tussle.isDie() == false)
				{
					if(this.bullets[j].x+this.bullet_width >= this.enemys[i].x-this.enemys[i].center_x && this.bullets[j].x <= this.enemys[i].x-this.enemys[i].center_x+this.enemys[i].getWidth()
					 &&this.bullets[j].y+this.bullet_height >= this.enemys[i].y-this.enemys[i].center_y+this.enemys[i].getHeight()/3 && this.bullets[j].y <= this.enemys[i].y-this.enemys[i].center_y+this.enemys[i].getHeight())
					{
						this.enemys[i].tussle.health_destion -= this.bullets[j].harm;
						this.removeBullet(this.bullets[j]);
						//设置杀死当前对象的对象
						if(this.enemys[i].tussle.health_destion <= 0)
						{
							this.enemys[i].tussle.die_object = this.enemys[i];
							this.enemys[i].tussle.die_flag = true;
						}
						tflag = false;
					}
				}
			}
		}
		//开启了ai
		if(this.parent.ai_enable == true && this.health_destion > 0)
		{
			//搜寻敌人
			for(var i = 0; i < this.enemys.length; i ++)
			{
				//假设此时发射炮弹，得到此时炮弹的x坐标和y坐标
				var tbx = this.parent.x-this.parent.center_x+(this.parent.getWidth()-this.bullet_width)/2;
				var tby = this.parent.y-this.parent.center_y+(this.parent.getHeight()-this.bullet_height)/2
				var vxx = (tbx+this.bullet_width >= this.enemys[i].x-this.enemys[i].center_x && tbx <= this.enemys[i].x-this.enemys[i].center_x+this.enemys[i].getWidth())?true:false;
				var vyy = (tby+this.bullet_height >= this.enemys[i].y-this.enemys[i].center_y+this.enemys[i].getHeight()/3 && tby <= this.enemys[i].y-this.enemys[i].center_y+this.enemys[i].getHeight())?true:false;
				//当前角色找到的敌人在同一条线上
				if(((!vxx&&vyy)||(vxx&&!vyy))
				&& Math.abs(this.parent.x-this.enemys[i].x)<=this.attack_distance
				&& Math.abs(this.parent.y-this.enemys[i].y)<=this.attack_distance)
				{
					var tox = 0, toy = 0;
					if(vyy == true)
						tox = this.enemys[i].x-this.parent.x;
					else if(vxx == true)
						toy = this.enemys[i].y-this.parent.y;
					//产生一个炮弹,只允许产生一个炮弹
					if(this.bullets.length == 0 && (new Date().getTime()>this.ai_old_time+this.ai_send_bullet_time))
					{
						this.ai_old_time = new Date().getTime();
						this.bullets.push({
							x:this.parent.x-this.parent.center_x+(this.parent.getWidth()-this.bullet_width)/2,
							y:this.parent.y-this.parent.center_y+(this.parent.getHeight()-this.bullet_height)/2,
							start_x:0,
							start_y:0,
							vx:FTools.Vector1DNormal(tox)*4,
							vy:FTools.Vector1DNormal(toy)*4,
							distance:this.attack_distance,
							harm:10,
						});
						this.bullets[this.bullets.length - 1].start_x = this.bullets[this.bullets.length - 1].x;
						this.bullets[this.bullets.length - 1].start_y = this.bullets[this.bullets.length - 1].y;
					}
				}
			}
		}
	}
}

//---------------------------------------------
//主角对象
function LeadCharacter(){
	//继承父类资源
	FGAMES.Character.call(this, arguments);
//	FGAMES.Character.apply(this, arguments);
//	var prop;
//	for(prop in FGAMES.Character.prototype){
//		var proto = this.constructor.prototype;
//		if(!proto[prop]){
//			proto[prop] = FGAMES.Character.prototype[prop];
//		}
//		proto[prop]["super"] = PeopleClass.prototype;
//	}

	//重载
	this.call_end_frame_temp = null;
	this.setCallEndFrameFuncParent = this.setCallEndFrameFunc;
	this.setCallEndFrameFunc = function(func){
		this.call_end_frame_temp = func;
	}
	
	this.key_action = new Array();
	this.addKeyAction = function(action){
		//action格式:
		//key:按键码
		//frame:显示帧(start, end)
		//update_time:刷新速度
		this.key_action[this.key_action.length] = action;
	}
	this.old_frame = null;
	this.is_operator = false;
	this.call_end_frame_func_2 = function(start, end){
		//在这里调用当前类要处理的事件
		if(this.old_frame)
		{
			if(this.old_frame.start == this.old_frame.end)
				this.setShowFrameRange(this.old_frame.start, this.old_frame.start);
			else
				this.setShowFrameRange(this.old_frame.start + 1, this.old_frame.start + 1);
			this.old_frame = null;
		}
		
		this.is_operator = false;
		if(this.right == 1)					//right
		{
			this.right = 1;
			this.vx = 2;
			this.setShowFrameRange(0, 2);
			this.setUpdateTime(150);
			this.forward = this.RIGHT;
		}
		else if(this.left == 1)			//left
		{
			this.left = 1;
			this.vx = -2;
			this.setShowFrameRange(3, 5);
			this.setUpdateTime(150);
			this.forward = this.LEFT;
		}
		else if(this.up == 1)			//up
		{
			this.up = 1;
			this.vy = -2;
			this.setShowFrameRange(9, 11);
			this.setUpdateTime(150);
			this.forward = this.UP;
		}
		else if(this.down == 1)			//down
		{
			this.down = 1;
			this.vy = 2;
			this.setShowFrameRange(6, 8);
			this.setUpdateTime(150);
			this.forward = this.DOWN;
		}
		
		this.setCallEndFrameFuncParent(null);
		//调用父类设置的回调函数
		if(this.call_end_frame_temp)
			this.call_end_frame_temp(start, end);
	}
	this.clearKeyAction = function(){
		//清除Key动作
		while(this.key_action.length > 0)
			this.key_action.pop();
	}
	//处理按键函数
	this.onkeydown = function(e){
		if(this.is_operator == true)
			return ;
		for(var i = 0; i < this.key_action.length; i ++)
		{
			if(e.keyCode == this.key_action[i].key)
			{
			//	console.log("frame:"+this.key_action[i].frame.start+"    "+this.key_action[i].frame.end);
				if(this.key_action[i].frame)
				{	
					if(this.old_frame == null)
						this.old_frame = this.getShowFrameRange();
					//根据角色的方向设置用户的动作
					if(this.forward == this.LEFT)
						this.setShowFrameRange(this.key_action[i].frame.left.start, this.key_action[i].frame.left.end);
					else if(this.forward == this.RIGHT)
						this.setShowFrameRange(this.key_action[i].frame.right.start, this.key_action[i].frame.right.end);
					else if(this.forward == this.UP)
					{
						this.setShowFrameRange(this.key_action[i].frame.up.start, this.key_action[i].frame.up.end);
					}
					else if(this.forward == this.DOWN)
						this.setShowFrameRange(this.key_action[i].frame.down.start, this.key_action[i].frame.down.end);
					this.is_operator = true;
					
				}
				if(this.key_action[i].update_time)
					this.setUpdateTime(this.key_action[i].update_time);	
				this.setCallEndFrameFuncParent(this.call_end_frame_func_2);
				//打斗类(发射炮弹)
				if(this.tussle)
				{
					this.tussle.bullets.push({
						x:this.x,
						y:this.y-this.getHeight()/2,
						start_x:this.x,
						start_y:this.y-this.getHeight()/2,
						vx:0,
						vy:0,
						distance:500,
						harm:50,
					});
					if(this.forward == this.LEFT)
					{
						this.tussle.bullets[this.tussle.bullets.length - 1].vx = -4;
						this.tussle.bullets[this.tussle.bullets.length - 1].x = this.x-this.tussle.bullet_width;
						this.tussle.bullets[this.tussle.bullets.length - 1].start_x = this.x-this.tussle.bullet_width;
						this.tussle.bullets[this.tussle.bullets.length - 1].y = this.y-this.center_y+(this.getHeight()-this.tussle.bullet_width)/2;
						this.tussle.bullets[this.tussle.bullets.length - 1].start_y = this.tussle.bullets[this.tussle.bullets.length-1].y;
						this.tussle.bullets[this.tussle.bullets.length - 1].angle = -Math.PI / 2;
					}
					else if(this.forward == this.RIGHT)
					{
						this.tussle.bullets[this.tussle.bullets.length - 1].vx = 4;
						this.tussle.bullets[this.tussle.bullets.length - 1].x = this.x + this.getWidth();
						this.tussle.bullets[this.tussle.bullets.length - 1].start_x = this.x+this.getWidth();
						this.tussle.bullets[this.tussle.bullets.length - 1].y = this.y-this.center_y+(this.getHeight()-this.tussle.bullet_width)/2;
						this.tussle.bullets[this.tussle.bullets.length - 1].start_y = this.tussle.bullets[this.tussle.bullets.length-1].y;
						this.tussle.bullets[this.tussle.bullets.length - 1].angle = Math.PI / 2;
					}
					else if(this.forward == this.DOWN)
					{
						this.tussle.bullets[this.tussle.bullets.length - 1].vy = 4;
						this.tussle.bullets[this.tussle.bullets.length - 1].x = this.x + (this.getWidth()-this.tussle.bullet_width)/2;
						this.tussle.bullets[this.tussle.bullets.length - 1].start_x = this.tussle.bullets[this.tussle.bullets.length - 1].x;
						this.tussle.bullets[this.tussle.bullets.length - 1].y = this.y-this.center_y+(this.getHeight()-this.tussle.bullet_width)/2;
						this.tussle.bullets[this.tussle.bullets.length - 1].start_y = this.tussle.bullets[this.tussle.bullets.length - 1].y;
						this.tussle.bullets[this.tussle.bullets.length - 1].angle = Math.PI;
					}
					else if(this.forward == this.UP)
					{
						this.tussle.bullets[this.tussle.bullets.length - 1].vy = -4;
						this.tussle.bullets[this.tussle.bullets.length - 1].x = this.x + (this.getWidth()-this.tussle.bullet_width)/2;
						this.tussle.bullets[this.tussle.bullets.length - 1].start_x = this.tussle.bullets[this.tussle.bullets.length - 1].x;
						this.tussle.bullets[this.tussle.bullets.length - 1].y = this.y-this.center_y+(this.getHeight()-this.tussle.bullet_width)/2;
						this.tussle.bullets[this.tussle.bullets.length - 1].start_y = this.tussle.bullets[this.tussle.bullets.length - 1].y;
						this.tussle.bullets[this.tussle.bullets.length - 1].angle = 1;
					}			//没有方向,销毁子弹
					else{
						this.tussle.bullets.pop();
					}
				}
				break;
			}
		}
	}
	
	this.pdraw = this.draw;
	this.tussle = null;
	this.draw = function(context){
		this.pdraw(context);
		if(this.tussle)
			this.tussle.draw(context);
	}
	
	this.pframe = this.frame;
	this.frame = function(){
		this.pframe();
		if(this.tussle)
			this.tussle.frame();
	}
}
//小地图对象
function MiniMap(){
	this.map_data = null;
	//场景的宽高
	this.SCENE_WIDTH = 0;
	this.SCENE_HEIGHT = 0;
	//小地图的宽和高
	this.MINI_MAP_WIDTH = 0;
	this.MINI_MAP_HEIGHT = 0;
	this.sx = 0;
	this.sy = 0;
	
	this.leader = null;				//主角
	this.npcs_crimes = new Array();	//犯罪分子
	this.npcs_animals = new Array();
	this.addCrime = function(obj){
		this.npcs_crimes.push(obj);
	}
	this.addAnimal = function(obj){
		this.npcs_animals.push(obj);
	}
	this.clearCrime = function(){
		while(this.npcs_crimes.length > 0)
			this.npcs_crimes.pop();
	}
	this.clearAnimal = function(){
		while(this.npcs_animals.length > 0)
			this.npcs_animals.pop();
	}
	this.remove = function(obj){
		for(var i = 0; i < this.npcs_crimes.length; i ++)
		{
			if(this.npcs_crimes[i] == obj)
			{
				this.npcs_crimes[i] = this.npcs_crimes[this.npcs_crimes.length - 1];
				this.npcs_crimes.pop();
				return ;
			}
		}
		for(var i = 0; i < this.npcs_animals.length; i ++)
		{
			if(this.npcs_animals[i] == obj)
			{
				this.npcs_animals[i] = this.npcs_animals[this.npcs_animals.length - 1];
				this.npcs_animals.pop();
				return ;
			}
		}
	}
	this.draw = function(context){
		this.sx = this.SCENE_WIDTH-this.MINI_MAP_WIDTH;
		this.sy = 0;
		context.fillStyle = "rgba(50, 200, 30, 0.5)";
		context.fillRect(this.sx, this.sy, this.MINI_MAP_WIDTH, this.MINI_MAP_HEIGHT);
		if(this.map_data)
		{
			var mw = this.MINI_MAP_WIDTH / (this.map_data[0].length);
			var mh = this.MINI_MAP_HEIGHT / (this.map_data.length);
			
			for(var i = 0; i < this.map_data.length; i ++)
			{
				for(var j = 0; j < this.map_data[0].length; j ++)
				{
					if(this.map_data[i][j].f == 1)
					{
						context.fillStyle = "rgb(45,50,70)";
						context.fillRect(this.sx+mw*j,this.sy+mh*i,mw,mh);
					}
				}
			}
			//在小地图上绘制出主角的位置
			if(this.leader)
			{
				context.fillStyle = "rgb(200, 50, 50)";
				context.fillRect(this.sx+this.leader.x*this.MINI_MAP_WIDTH/map.getWidth(),this.sy+this.leader.y*this.MINI_MAP_HEIGHT/map.getHeight()-mh/2,mw,mh);
			}
			//在小地图上绘制出犯罪分子的位置
			context.fillStyle = "rgb(20, 40, 200)";
			for(var i = 0; i < this.npcs_crimes.length; i ++)
			{
				//绘制会有死亡的npcs
				//if(!this.npcs_crimes.tussle.isDie())
				context.fillRect(this.sx+this.npcs_crimes[i].x*this.MINI_MAP_WIDTH/map.getWidth(), this.sy+this.npcs_crimes[i].y*this.MINI_MAP_HEIGHT/map.getHeight(), mw, mh);
			}
			//在小地图上绘制出要解救的动物的位置
			context.fillStyle = "rgb(200, 200, 20)";
			for(var i = 0; i < this.npcs_animals.length; i ++)
			{
				context.fillRect(this.sx+this.npcs_animals[i].x*this.MINI_MAP_WIDTH/map.getWidth(), this.sy+this.npcs_animals[i].y*this.MINI_MAP_HEIGHT/map.getHeight(), mw, mh);
			}
		}
	}
	this.frame = function(){
		
	}
}
function Scoring(width,height){
	this.save_animal_count = 0;					//解救的动物数量
	this.kill_enemy_count = 0;					//杀死的敌人数量
	this.screen_width = width;
	this.screen_height = height;
	this.draw = function(context){
		context.fillStyle = "rgb(255, 255, 255)";
		context.font = "25px Arial";
		context.textBaseline = "top";
		context.fillText(FRes.String.scoring1+this.kill_enemy_count, 520, 5);
		context.fillText(FRes.String.scoring2+this.save_animal_count, 520, 10+25);
	}
}

//菜单系统
function Menu(){
	this.x = 0;
	this.y = 0;
	this.SCENE_WIDTH = 0;
	this.SCENE_HEIGHT = 0;
	this.MENU_WIDTH = 0;
	this.MENU_HEIGHT = 0;
	this.visible = false;
	
	//菜单对象
	this.button = new Array();
	//进行一些对象的初始化，并且返回要添加到场景里的对象
	this.init = function(){
		
	}
	this.Constructor = function(){
		
		return this.button;
	//	return [this.button[1],this.button[2],this.button[3]];
	}
	//对象销毁，并且返回要从场景里删除的对象
	this.Destructor = function(){
		return this.button;
	}
	this.init = function(){
		this.button[0] = new FGAMES.Button("任务");
		this.button[1] = new FGAMES.Button("音效（开）");
		this.button[1].enable_music = true;
		this.button[2] = new FGAMES.Button("保存游戏");
		this.button[3] = new FGAMES.Button("退出游戏");
		
		for(var i = 0; i < this.button.length; i ++)
		{
			this.button[i].setWidth(this.MENU_WIDTH-20);
			this.button[i].setHeight(60);
			this.button[i].setPosition(this.x+(this.MENU_WIDTH-this.button[i].getWidth())/2, 20+this.y + i*(this.button[i].getHeight()+10));	
			this.button[i].visible = false;
			if(i == 1)
			{
				this.button[i].setDefaultBackgroundImage('img/button2.png');
				this.button[i].setOnTouchBackgroundImage('img/button2_click.png');
			}
			else
			{
				this.button[i].setDefaultBackgroundImage('img/button1.png');
				this.button[i].setOnTouchBackgroundImage('img/button1_click.png');
			}
		}
		
	//	this.button[1].setPosition(this.x, this.y);
	//	this.button[2].setPosition(this.x+this.button[1].getWidth(), this.y);
	//	this.button[3].setPosition(this.x+this.button[1].getWidth()+this.button[2].getWidth(), this.y);
		
		
		this.button[0].addOnClickListener(function(){
			menu.visible = false;
			task.visible = true;
			task.task_progress = game_progress;
		});
	//	this.button[1].setDefaultBackgroundColor(255,255,255);
	//	this.button[1].setOnTouchBackgroundColor(255,255,0);
		
		this.button[1].addOnClickListener(function(e){
		//	console.log(menu.button[1].enable_music);
			if(menu.button[1].enable_music == true)
			{
				menu.button[1].setText("音效（关）");
				menu.button[1].enable_music = false;
			}
			else
			{
				menu.button[1].setText("音效（开）");
				menu.button[1].enable_music = true;
			}
		});
		//保存游戏
		this.button[2].addOnClickListener(function(e){
			myajax.reader(
			"SaveGame",
			"game_progress="+game_progress+"&current_scene="+current_scene+
			"&x="+(map.x*10000+lead_first_pass.x)+"&y="+(map.y*10000+lead_first_pass.y),
			function(text){
				alert(text);
			});
		});
		//退出游戏
		this.button[3].addOnClickListener(function(e){
			myajax.reader("logout.jsp",null,function(text){
				window.localtion.href="index.jsp";
			});
		});
	}
	this.draw = function(context){
		//只有当设置显示菜单时才显示
		//console.log(this.SCENE_HEIGHT);
		if(this.visible == true)
		{
			
			for(var i = 0; i < this.button.length; i ++)
			{
				this.button[i].visible = true;
			}
			context.fillStyle = "rgba(200, 200, 100, 0.5)";
			context.fillRect(this.x, this.y, this.MENU_WIDTH, this.MENU_HEIGHT);
			
		}
		else
		{
			for(var i = 0; i < this.button.length; i ++)
			{
				this.button[i].visible = false;
			}
		}
	}
	this.frame = function(){
		
	}
}


