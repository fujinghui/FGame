function Fgame(){
	//角色引擎
	this.Character = function(){
		//基本属性值
		this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.ax = 0;
		this.ay = 0;
		//默认当前角色的中心点
		this.center_x = 0;
		this.center_y = 0;
		var width = 0, height = 0;
		var images = new Array();
		var show_index = 0;
		var update_time = 0;
		
		this.current_show_frame = null;
		var start_index = 0, end_index = 0;
		var show_frame = new Array();				//显示的一帧的数据
		//与转转有关的变量
		var rotate_x = 0, rotate_y = 0, rotate_angle = 0.0;
		/*
		 * update_time=0 表示动画的更新是根据每帧进行变化的
		 * update_tiem>0 表示动画的更新是根据时间变化的
		 */
		var old_time = 0, new_time = 0;
		
		this.is_npc = false;	//判断当前角色是否是一个npc
		this.name = null;
		this.LEFT = 1;
		this.RIGHT = 2;
		this.DOWN = 3;
		this.UP = 4;
		this.forward = 2;
		
		//自动寻路所用到的变量
		this.ai_path = null;
		this.ai_enable = false;
		this.ai_pause = false;
		this.ai_call_func = null;			//回调函数
		this.ai_loop = false;				//是否循环
		this.ai_loop_reverse = false;		//如果循环，是否反向
		this.ai_speed = 0.5;
		this.ai_speed_x = 0;				//ai的速度
		this.ai_speed_y = 0;
		this.ai_left_frame = null;			//向左显示的帧
		this.ai_right_frame = null;			//向右显示的帧
		this.ai_up_frame = null;			//向上显示的帧
		this.ai_down_frame = null;			//向下显示的帧
		
		this.ai_current_index = 0;			//当前已经走到哪一步了
		this.ai_next_index = 0;				//下一步要走的路
		this.ai_grid_width = 0;				//AI系统网格宽度
		this.ai_grid_height = 0;			//AI系统网格高度
		
		this.ai_is_run = false;				//角色是否处理正在行走状态
		this.show_images = new Array();
		//其他插件类
		this.others = new Array();
		this.init = function(imgs){
			for(var i = 0; i < imgs.length; i ++)
			{
				images[i] = new Image();
				images[i].src = imgs[i];
			}
			//在没有添加显示帧的时候，默认显示从头到尾
			start_index = 0;
			end_index = 0;
			//start_index = 0;
			//end_index = imgs.length - 1;
		}
		this.addShowImage = function(img){
			//i,sx,sy,sw,wh,dx,dy,dw,dh
			this.show_images[this.show_images.length] = img;
		}
		//AI系统
		//设置路径			
		this.setAIPath = function(path){					//设置要行走的路径
			this.ai_path = path;
		}
		this.IntNormal = function(s){
			if(s > 0)
				return 1;
			else if(s < 0)
				return -1;
			else
				return 0;
		}
		this.setAIEnable = function(f){						//是否开启AI系统
			this.ai_enable = f;
			if(f == true && this.ai_path)			//开启了AI
			{
				this.ai_grid_width = this.ai_path[0].grid_width;
				this.ai_grid_height = this.ai_path[0].grid_height;
				
				this.x = this.ai_path[0].x * this.ai_grid_width;
				this.y = this.ai_path[0].y * this.ai_grid_height;
				this.ai_current_index = 0;
				this.ai_next_index = 1;
				//出错关闭ai系统
				if(this.ai_path[this.ai_current_index].x != this.ai_path[this.ai_next_index].x &&
					this.ai_path[this.ai_current_index].y != this.ai_path[this.ai_next_index].y
				)
				{
					this.ai_enable = false;
					return ;
				}
				//在y轴有速度
				if(this.ai_path[this.ai_current_index].x == this.ai_path[this.ai_next_index].x)
				{
					this.ai_speed_x = 0;
					this.ai_speed_y = this.IntNormal(this.ai_path[this.ai_next_index].y-this.ai_path[this.ai_current_index].y) * this.ai_speed;
				}
				else		//在x轴有速度
				{
					this.ai_speed_x = this.IntNormal(this.ai_path[this.ai_next_index].x-this.ai_path[this.ai_current_index].x) * this.ai_speed;
					this.ai_speed_y = 0;
				}
				
				if(this.ai_speed_x < 0 && this.ai_left_frame)
					this.setShowFrameRange(this.ai_left_frame.start, this.ai_left_frame.end);
				else if(this.ai_speed_x > 0 && this.ai_right_frame)
					this.setShowFrameRange(this.ai_right_frame.start, this.ai_right_frame.end);
				else if(this.ai_speed_y < 0 && this.ai_up_frame)
					this.setShowFrameRange(this.ai_up_frame.start, this.ai_up_frame.end);
				else if(this.ai_speed_y > 0 && this.ai_down_frame)
					this.setShowFrameRange(this.ai_down_frame.start, this.ai_down_frame.end);
				
				this.ai_is_run = true;
			}
		}
		this.setAIShowFrame = function(f){
			//{start:0, end:1}
			this.ai_left_frame = f.left;
			this.ai_right_frame = f.right;
			this.ai_up_frame = f.up;
			this.ai_down_frame = f.down;
		}
		this.setAICallFunc = function(func){
			this.ai_call_func = func;
		}
		//设置当前角色类要显示的图片区间
		this.setShowFrameRange = function(s_index, e_index){
			//如果之前的开始index与现在设置的index不相同，则设置当前方向
			if(start_index != s_index)
				show_index = s_index;
			
			start_index = s_index;
			end_index = e_index;
			this.current_show_frame = {start:s_index, end:e_index};
		}
		this.getShowFrameRange = function(){
			return {start:start_index, end:end_index};
		}
		this.addFrame = function(frame){
			//帧的格式
			/*
			 * i:先显示的图片的索引
			 * x:
			 * y:
			 * width:
			 * height:
			 */
			show_frame[show_frame.length] = frame;
		}
		this.setPosition = function(cx, cy){
			this.x = cx;
			this.y = cy;
		}
		this.call_end_frame_func = null;
		this.setCallEndFrameFunc = function(func){
			this.call_end_frame_func = func;
		}
		this.frame = function(){
			if(update_time > 0)
			{
				//new_time = Date.parse(new Date());		//s
				new_time = new Date().getTime();
				if(new_time >= old_time + update_time)
				{
					old_time = new_time;
					show_index ++;
				}
			}
			else
			{
				show_index ++;
			}
			if(show_index > end_index)
			{
				show_index = start_index;
				//调用结束函数
				if(this.call_end_frame_func)
					this.call_end_frame_func(start_index, end_index);
			}
			
			//处理AI系统
			if(this.ai_enable == true && this.ai_pause == false)
			{
				//AI还正在处于行走过程中
				if(this.ai_is_run == true)
				{
					var tx = Math.round((this.x)/this.ai_grid_width-0.5);
					var ty = Math.round((this.y)/this.ai_grid_height-0.5);
				//	console.log("tx:" + tx + " ty:" + ty);
					//角色到达目的地
					if(tx == this.ai_path[this.ai_next_index].x
					&& ty == this.ai_path[this.ai_next_index].y
					&& Math.abs(this.x-(tx*this.ai_grid_width))<2*this.ai_speed
					&& Math.abs(this.y -(ty*this.ai_grid_height))<2*this.ai_speed)
					{
						this.ai_current_index = this.ai_next_index;
						this.ai_next_index += 1;
						
						this.ai_is_run = false;
				//		console.log("to");
					}
					this.x += this.ai_speed_x;
					this.y += this.ai_speed_y;
				}
				else	//角色到达下一个目的地，然后进行逻辑处理
				{
					//角色已经走到了路径的最后
					if(this.ai_current_index + 1 == this.ai_path.length)
					{
						//循环路径，重置角色位置
						if(this.ai_loop == true)
						{
							if(this.ai_loop_reverse == true)
							{
								var i = 0;
								//逆向
								while(i < this.ai_path.length / 2)
								{
									var t = this.ai_path[i];
									this.ai_path[i] = this.ai_path[this.ai_path.length - 1 - i];
									this.ai_path[this.ai_path.length - 1 - i] = t;
									i = i + 1;
								}
							}
							this.ai_current_index = 0;
							this.ai_next_index = 1;
							
							this.x = this.ai_path[0].x * this.ai_grid_width;
							this.y = this.ai_path[0].y * this.ai_grid_height;
							
							if(this.ai_path[this.ai_current_index].x != this.ai_path[this.ai_next_index].x &&
							this.ai_path[this.ai_current_index].y != this.ai_path[this.ai_next_index].y
							)
							{
								this.ai_enable = false;
								return ;
							}
							//在y轴有速度
							if(this.ai_path[this.ai_current_index].x == this.ai_path[this.ai_next_index].x)
							{
								this.ai_speed_x = 0;
								this.ai_speed_y = this.IntNormal(this.ai_path[this.ai_next_index].y-this.ai_path[this.ai_current_index].y) * this.ai_speed;
							}
							else		//在x轴有速度
							{
								this.ai_speed_x = this.IntNormal(this.ai_path[this.ai_next_index].x-this.ai_path[this.ai_current_index].x) * this.ai_speed;
								this.ai_speed_y = 0;
							}
							
							this.ai_is_run = true;
						}
						else
						{
							//设置停止帧
							this.ai_enable = false;			//关闭ai系统
							this.ai_speed_x = 0;
							this.ai_speed_y = 0;
							
							var n = Math.round((this.getShowStartIndex()+1) / 3 - 0.5)*3;
							this.setShowFrameRange(n+1, n+1);
						
						}
						
						if(this.ai_call_func)
							this.ai_call_func();
					//	return ;
					}
					else									//角色只是到达下一个目的地，计算角色的下一个要到达的地方
					{
						//出错关闭ai系统
						if(this.ai_path[this.ai_current_index].x != this.ai_path[this.ai_next_index].x &&
							this.ai_path[this.ai_current_index].y != this.ai_path[this.ai_next_index].y
						)
						{
							this.ai_enable = false;
							return ;
						}
						//在y轴有速度
						if(this.ai_path[this.ai_current_index].x == this.ai_path[this.ai_next_index].x)
						{
							this.ai_speed_x = 0;
							this.ai_speed_y = this.IntNormal(this.ai_path[this.ai_next_index].y-this.ai_path[this.ai_current_index].y) * this.ai_speed;
						}
						else		//在x轴有速度
						{
							this.ai_speed_x = this.IntNormal(this.ai_path[this.ai_next_index].x-this.ai_path[this.ai_current_index].x) * this.ai_speed;
							this.ai_speed_y = 0;
						}
						
						this.ai_is_run = true;
					}
					
					if(this.ai_speed_x < 0 && this.ai_left_frame)
						this.setShowFrameRange(this.ai_left_frame.start, this.ai_left_frame.end);
					else if(this.ai_speed_x > 0 && this.ai_right_frame)
						this.setShowFrameRange(this.ai_right_frame.start, this.ai_right_frame.end);
					else if(this.ai_speed_y < 0 && this.ai_up_frame)
						this.setShowFrameRange(this.ai_up_frame.start, this.ai_up_frame.end);
					else if(this.ai_speed_y > 0 && this.ai_down_frame)
						this.setShowFrameRange(this.ai_down_frame.start, this.ai_down_frame.end);
					
				}
			}
			
			//console.log("show_index2:"+show_index);
		}
		//判断这个物体是否在另一个物体的
		this.near_distance = 30;
		this.isNear = function(other){
			if(Math.abs(this.x+width/2-other.x-other.getWidth()/2) <= other.near_distance
			&& Math.abs(this.y-other.y) <= other.near_distance)
				return true;
			return false;
			
		}
		this.setWH = function(w, h){
			width = w;
			height = h;
		}
		this.getHeight = function(){
			return height;
		}
		this.getWidth = function(){
			return width;
		}
		this.getImageWidth = function(){
			if(show_frame.length > 0)
			{
				return show_frame[show_index].width;
			}
			else
			{
				return images[show_index].width;
			}
		}
		this.getImageHeight = function(){
			if(show_frame.length > 0)
			{
				return show_frame[show_index].height;
			}
			else  
			{
				return images[show_index].height;
			}
		}
		this.getFrameLength = function(){
			return show_frame.length;
		}
		this.getShowStartIndex = function(){
			return start_index;
		}
		this.getShowEndIndex = function(){
			return end_index;
		}
		this.setUpdateTime = function(time){
			update_time = time;
		}
		this.setRotatePosition = function(xx, yy){
			rotate_x = xx;
			rotate_y = yy;
		}
		this.rotate = function(angle){
			rotate_angle = angle;
		}
		
		this.getRotateAngle = function(){
			return rotate_angle;
		}
		//获取当前角色在网格中的坐标(X轴)
		this.getGridX = function(grid_width){
			return Math.round((this.x)/grid_width-0.5)
		
		}
		//上同(Y轴)
		this.getGridY = function(grid_height){
			return Math.round(this.y/grid_height-0.5);
		}
		
		this.draw = function(context){
			context.save();						//save canvas
			context.translate(this.x + rotate_x, this.y + rotate_y);
			context.rotate(rotate_angle);
			context.translate(-(this.x + rotate_x), -(this.y + rotate_y));
			//如果没有添加显示帧，那么就直接显示显示图片
			if(show_frame.length == 0)
			{
				
				if(width == 0 || height == 0)
				{
					context.drawImage(images[show_index], this.x, this.y);
					width = images[show_index].width;
					height = images[show_index].height;
				}
				else
					context.drawImage(images[show_index], 0, 0, images[show_index].width, images[show_index].height,
					this.x - this.center_x, this.y - this.center_y,
					width, height
					);
			}
			else
			{
				if(width == 0 || height == 0)
				{
					//显示的大小为原始图片的大小
					context.drawImage(images[show_frame[show_index].i], show_frame[show_index].x, show_frame[show_index].y,
						show_frame[show_index].width, show_frame[show_index].height,
						this.x - this.center_x, this.y - this.center_y, 
						show_frame[show_index].width, show_frame[show_index].height);
					//设置显示的宽和高
					width = show_frame[show_index].width;
					height = show_frame[show_index].height;
				}
				else
				{
				//	console.log("show_index:"+show_index + "   start:" + start_index + " end:" + end_index);
					//显示的大小为用户设置的角色类的大小
				//	console.log(show_index);
					context.drawImage(images[show_frame[show_index].i], show_frame[show_index].x, show_frame[show_index].y,
						show_frame[show_index].width, show_frame[show_index].height,
						this.x - this.center_x, this.y - this.center_y, 
						width, height
					);
				}
			}
			
			
			for(var i = 0; i < this.show_images.length; i ++)
			{
			//	console.log(this.show_images[i].i);
				context.drawImage(images[this.show_images[i].i],
					this.show_images[i].sx, this.show_images[i].sy, this.show_images[i].sw, this.show_images[i].sh,
					this.show_images[i].dx+this.x, this.show_images[i].dy+this.y, this.show_images[i].dw, this.show_images[i].dh);
			}
			this.x += this.vx;
			this.y += this.vy;
			this.vx += this.ax;
			this.vy += this.ay;
			if(this.name)
			{
				context.fillStyle = "rgb(0,0,0)";
				context.font = "25px Arial";
				context.textBaseline = "top";
				context.fillText(this.name, 
				this.x-this.center_x+(this.getWidth()-context.measureText(this.name).width)/2,
				this.y-this.center_y-25);
			}
			context.restore();
		}
		this.getType = function(){
			return 'Character';
		}
	}
	this.Quare = function(){
		this.draw = function(context){
			//console.log("Quare draw");
		}
		this.frame = function(){
			//this.this.Character();
		}
		this.getType = function(){
			return 'Quare';
		}
	}
	//地图对象
	this.Map = function(){	
		//默认的宽和高的数量
		var W_COUNT = 12, H_COUNT = 8;
		//渲染的宽高
		var RENDER_WIDTH = 1024, RENDER_HEIGHT = 600;
		//每个地图网格的宽和高
		var width = 65, height = 55;
		
		//地图数据
		this.map_data = new Array();
		this.map_width = 0;
		this.map_height = 0;
		var image_data = new Array();			//保存所有地图所用到的图片资源
		//地图的中心坐标
		this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		//渲染列表
		this.render_list = new Array();
		this.render_list_npc = new Array();				//npc渲染列表(不渲染，只用作逻辑处理)
		this.render_list_npc_dialog_text = new Array();	//npc的对话框
		this.render_lead = null;
		//辅助开发
		this.show_table_line = false;
		//地图中的传送点
		this.transmit_point = new Array();
		this.transmit_point_call_func = null;
		this.is_fouces_transmit_point = false;
		this.transmit_point_index = -1;
		/*
		 * 格式：{x:1,y:1,w:100,h:100, show:true}
		 */
		//是否处理键盘和鼠标事件的标记
		this.is_dealwith_keydown = true;
		this.is_dealwith_keyup = true;
		this.is_dealwith_mousedown = true;
		this.is_dealwith_mouseup = true;
		this.is_dealwith_mousemove = true;
		this.add = function(render){
			this.render_list[this.render_list.length] = render;
			//如果是npc，则添加到npc列表中
			if(render.is_npc && render.is_npc == true)
			{
				this.render_list_npc[this.render_list_npc.length] = render;
				this.render_list_npc_dialog_text[this.render_list_npc_dialog_text.length] = render.dialog_text;
			}
			//如果是主角，则添加到主角列表中
			else if(render.is_lead && render.is_lead == true)
				this.render_lead = render;
		}
		this.removeObject = function(obj){
			var i;
			for(i = 0; i < this.render_list.length; i ++)
			{
				if(this.render_list[i] === obj)			//找到了该物体
				{
					break;
				}
			}
			//找到了该对象
			if(i < this.render_list.length)
			{
				this.render_list[i] = this.render_list[this.render_list.length - 1];
				this.render_list.pop();
				//如果要删除的对象是主角
				if(obj.is_lead && obj.is_lead == true)
					this.render_lead = null;
				//如果要删除的对象是NPC
				if(obj.is_npc &&obj.is_npc == true)
				{
					var j;
					for(j = 0; j < this.render_list_npc.length; j ++)
					{
						if(this.render_list_npc[j] === obj)
						{
							break;
						}
					}
					if(j < this.render_list_npc.length)
					{
						this.render_list_npc[j] = this.render_list_npc[this.render_list_npc.length - 1];
						this.render_list_npc.pop();
					}
				}
			}
		}
		//地图默认处理键盘按键事件
		this.onkeydown = function(e){
			
		//	console.log("is deal:"+this.is_dealwith_keydown);
			//处理主角走到npc旁边的对话框
			if(this.render_lead && e.keyCode == 32)
			{
				for(var i = 0; i < this.render_list_npc.length; i ++)
				{
					//主角正好在
					//if(this.render_lead.x >= this.render_list_npc[i].x && 
					//	this.render_lead.x <= this.render_list_npc[i].x + this.render_list_npc[i].dialog_range.w &&
					//	this.render_lead.y >= this.render_list_npc[i].y &&
					//	this.render_lead.y <= this.render_list_npc[i].y + this.render_list_npc[i].dialog_range.h
					//)
					if(this.render_list_npc[i].visible==true&&this.render_list_npc[i].is_show_bubble == true 
					&& this.render_list_npc[i].dialog_text.all_text != null)
					{
						
						
						//console.log("v:"+this.render_list_npc[i].dialog_text.visible);
						console.log("v1:"+this.render_list_npc[i].dialog_text);
						//如果对话框已经显示了，则调用对话框的键盘处理事件。否则只是让对话框显示
						if(this.render_list_npc[i].dialog_text.visible == true)
						{
							console.log("v2:"+this.render_list_npc[i].dialog_text);
							this.render_list_npc[i].dialog_text.onkeydown(e);
							console.log("v2:"+this.render_list_npc[i].dialog_text);
							//对话完毕，让其他物体可以处理当前事件
							if(this.render_list_npc[i] && this.render_list_npc[i].dialog_text!=null&& this.render_list_npc[i].dialog_text.visible == false)
							{
								this.is_dealwith_keydown = true;
							}
						}
						else
						{
						//	console.log("--");
							this.render_list_npc[i].dialog_text.visible = true;
						//	this.render_list_npc_dialog_text[i].visible = true;
						//	console.log("v:"+this.render_list_npc[i].visible);
							this.is_dealwith_keydown = false;				//让其他的物体不能够处理当前事件
						}
						console.log("deal:"+this.is_dealwith_keydown);
						console.log("npc show:"+this.render_list_npc[i].dialog_text.visible);
						console.log("--------------");
					}
				}
			}
			if(this.is_dealwith_keydown == false)
				return;
			//存在主角对象
			if(this.render_lead)
			{
				if(this.render_lead.is_operator == false)
				{
					if(e.keyCode == 39)					//right
					{
						this.render_lead.right = 1;
						this.render_lead.vx = 2;
						this.render_lead.vy = 0;
						this.render_lead.setShowFrameRange(0, 2);
						this.render_lead.setUpdateTime(150);
						this.render_lead.forward = this.render_lead.RIGHT;
					}
					else if(e.keyCode == 37)			//left
					{
						this.render_lead.left = 1;
						this.render_lead.vx = -2;
						this.render_lead.vy = 0;
						this.render_lead.setShowFrameRange(3, 5);
						this.render_lead.setUpdateTime(150);
						this.render_lead.forward = this.render_lead.LEFT;
					}
					else if(e.keyCode == 38)			//up
					{
						this.render_lead.up = 1;
						this.render_lead.vy = -2;
						this.render_lead.vx = 0;
						this.render_lead.setShowFrameRange(9, 11);
						this.render_lead.setUpdateTime(150);
						this.render_lead.forward = this.render_lead.UP;
					}
					else if(e.keyCode == 40)			//down
					{
						this.render_lead.down = 1;
						this.render_lead.vy = 2;
						this.render_lead.vx = 0;
						this.render_lead.setShowFrameRange(6, 8);
						this.render_lead.setUpdateTime(150);
						this.render_lead.forward = this.render_lead.DOWN;
					}
					else
					{
					//	this.render_lead.up = 0;
					//	this.render_lead.down = 0;
					//	this.render_lead.left = 0;
					//	this.render_lead.right = 0;
					}
				}
				else
				{
					//设置角色应该往哪走
					if(e.keyCode == 39)					//right
					{
						this.render_lead.right = 1;
					}
					else if(e.keyCode == 37)			//left
					{
						this.render_lead.left = 1;
					}
					else if(e.keyCode == 38)			//up
					{
						this.render_lead.up = 1;
					}
					else if(e.keyCode == 40)			//down
					{
						this.render_lead.down = 1;
					}
				}
			}
			
			//调用下一层按键处理函数
			for(var i = 0; i < this.render_list.length; i ++)
			{
				if((this.render_list[i].visible == null || this.render_list[i].visible && this.render_list[i].visible == true) && this.render_list[i].onkeydown)
				{
					this.render_list[i].onkeydown(e);	
				}
			}
			//传送点
			if(e.keyCode == 32 && this.is_fouces_transmit_point == true)
			{
				this.transmit_point_call_func(this.transmit_point_index);
				this.is_fouces_transmit_point = false;
			}
		}
		this.onkeyup = function(e){
			var is_opeartor_flag = false;
			if(this.render_lead)
			{
				var code = e.keyCode;
				if(code == 39)						//right
				{
					this.render_lead.right = 0;
					is_opeartor_flag = true;
				}
				else if(code == 37)
				{
					this.render_lead.left = 0;
					is_opeartor_flag = true;
				}
				else if(code == 38)
				{
					this.render_lead.up = 0;
					is_opeartor_flag = true;
				}
				else if(code == 40)
				{
					this.render_lead.down = 0;
					is_opeartor_flag = true;
				}
				
				if(this.render_lead.left == 1)
				{
					this.render_lead.vx = -2;
					this.render_lead.setShowFrameRange(3, 5);
				}
				else if(this.render_lead.right == 1)
				{
					this.render_lead.vx = 2;
					this.render_lead.setShowFrameRange(0, 2);
				}
				else
				{
					this.render_lead.vx = 0;
				}
				if(this.render_lead.up == 1)
				{
					this.render_lead.vy = -2;
					this.render_lead.setShowFrameRange(9, 11);
				}
				else if(this.render_lead.down == 1)
				{
					this.render_lead.vy = 2;
					this.render_lead.setShowFrameRange(6, 8);
				}
				else
				{
					this.render_lead.vy = 0;
				}
				
				//只有在角色完成了动作之后，才让角色执行下面的代码
				if(this.render_lead.is_operator == false)
				{
					//设置角色方向
					if(this.render_lead.vx > 0)
						this.render_lead.forward = this.render_lead.RIGHT;
					else if(this.render_lead.vx < 0)
						this.render_lead.forward = this.render_lead.LFET;
					else if(this.render_lead.vy > 0)
						this.render_lead.forward = this.render_lead.DOWN;
					else if(this.render_lead.vy < 0)
						this.render_lead.forward = this.render_lead.UP;
					
					if(is_opeartor_flag == true &&this.render_lead.left == 0 && this.render_lead.right == 0 
						&& this.render_lead.up == 0 && this.render_lead.down == 0)
					{
						var n = Math.round((this.render_lead.getShowStartIndex()+1) / 3 - 0.5)*3;
						this.render_lead.setShowFrameRange(n + 1, n + 1);
					}
					
				}
				this.vx = 0;
				this.vy = 0;
			}
			//调用
			for(var i = 0; i < this.render_list.length; i ++)
			{
				if(this.render_list[i].onkeyup){
					this.render_list[i].onkeyup(e);
				}
			}
		}
		this.getWidth = function(){
			return width * this.map_data[0].length;
		}
		this.getHeight = function(){
			return height * this.map_data.length;
		}
		//鼠标处理事件
		this.onmousedown = function(e){
			for(var i = 0; i < this.render_list.length; i ++)
			{
				if(this.render_list[i].onmousedown){
					this.render_list[i].onmousedown(e);
				}
			}
		}
		this.onmouseup = function(e){
			for(var i = 0; i < this.render_list.length; i ++)
			{
				if(this.render_list[i].onmouseup){
					this.render_list[i].onmouseup(e);
				}
			}
		}
		this.onmousemove = function(e){
			for(var i = 0; i < this.render_list.length; i ++)
			{
				if(this.render_list[i].onmousemove){
					this.render_list[i].onmousemove(e);
				}
			}
		}
		//清除所有的显示对象
		this.clear = function(){
			while(this.render_list.length > 0)
				this.render_list.pop();
			while(this.render_list_npc.length > 0)
				this.render_list_npc.pop();
			while(this.render_list_npc_dialog_text.length > 0)
				this.render_list_npc_dialog_text.pop();
			render_lead = null;
		}
		this.addImage = function(img){
			if(img)
				image_data.push(img);
		}
		this.setMapData = function(data){
			if(this.map_data)
				this.map_data = null;
			this.map_data = data;
			//获取整个地图的宽和高
			this.map_width = this.map_data[0].length * width;
			this.map_height = this.map_data.length * height;
		}
		this.setMap = function(x, y, data){
			if(map_data)
				map_data[y][x] = data;
		}
		//往地图中添加传送点
		this.addTransmitPoint = function(s){
			if(this.transmit_point == null)
				this.transmit_point = new Array();
			if(s.auto == null || s.auto == false)
			{
				var o = new TransmitPoint();
				o.image = new Image();
				o.image.src = "img/transmit_point.png";
				o.x = s.x;
				o.y = s.y;
				o.width = s.w; o.height = s.h;
				o.xr = parseInt(s.w/2); o.yr = parseInt(s.h/2);
				o.angle = 0;
				this.add(o);
			}
			this.transmit_point.push(s);
		}
		//设置传送点数据
		this.setTransmitPoint = function(s){
			//在添加设置传送点时，先清除之前的素有传送点数据
			while(this.transmit_point.length > 0)
				this.transmit_point.pop();
			this.transmit_point = null;
			this.transmit_point = s;
		}
		//清除掉所有的传送点
		this.clearTransmitPoint = function(){
			while(this.transmit_point.length > 0)
				this.transmit_point.pop();
		}
		this.removeTransmitPoint = function(index){
			if(index < this.transmit_point.length)
			{
				for(var i = index; i+1 < this.transmit_point.length; i ++)
				{
					this.transmit_point[i] = this.transmit_point[i+1];
				}
				this.transmit_point.pop();
			}
		}
		//设置传送点的回调函数
		this.setTransmitPointCallFunc = function(func){
			this.transmit_point_call_func = func;
		}
		//设置跳出主角要谈话的那个npc的对话框
		this.showNPCDialog = function(){

		}
		this.getGridWidth = function(){
			return width;
		}
		this.getGridHeight = function(){
			return height;
		}
		this.setWidth = function(w){
			width = w;
			if(this.map_data)
			{
				this.map_width = this.map_data[0].length * width;
			}
		}
		this.setHeight = function(h){
			height = h;
			if(this.map_data)
			{
				this.map_height = this.map_data.length * height;
			}
		}
		this.getType = function(){
			return 'Map';
		}
		//处理键盘事件
		this.onKeyDown2 = function(e){
			var code = e.keyCode;
			var map_width = 0, map_height = 0;
			if(this.map_data)
			{
				map_height = this.map_data.length * height;
				map_width = this.map_data[0].length * width;
			}
			if(code == 39)
			{
				this.x += 3;
			}
			else if(code == 37)
			{
				this.x -= 3;
			}
			else if(code == 38)
			{
				this.y -= 3;
			}
			else if(code == 40)
			{
				this.y += 3;
			}
			//-------------------
			if(this.x < 0)
				this.x = 0;
			if(map_width - this.x < RENDER_WIDTH)
				this.x = map_width - RENDER_WIDTH;
			if(this.y < 0)
				this.y = 0;
			if(map_height - this.y < RENDER_HEIGHT)
				this.y = map_height - RENDER_HEIGHT;
				
		}
		function sorts_insert(lists, start, end){			//使用插入排序对地图的对象进行排序
			var i, j;
			var k;
			
			for(i = 1; i <= end; i ++)
			{
				j = i;
				k = lists[j];
				while(j > 0 && k.y < lists[j - 1].y)
				{
					lists[j] = lists[j - 1];
					j = j - 1;
				}
				lists[j]= k;
			}
		}
		function sorts(lists, start, end){			//使用快速排序对地图的对象进行排序
			var k = start;
			//start += 1;
			var i, j;
			var position = 0;
			i = start + 1;
			j = end;
			if(start >= end)
				return;
			while(i < j)
			{
				while(lists[i].y <= lists[k].y && i < j)
					i = i + 1;
				while(lists[j].y >= lists[k].y && i < j)
					j = j - 1;
				var t = lists[i];
				lists[i] = lists[j];
				lists[j] = t;
			}
			if(lists[i].y > lists[k].y)
			{
				var t = lists[i - 1];
				lists[i - 1] = lists[k];
				lists[k] = t;
				position = i - 1;
			}
			else
			{
				var t = lists[i];
				lists[i] = lists[k];
				lists[k] = t;
				position = i;
			}
			sorts(lists, start, position - 1);
			sorts(lists, position + 1, end);
		}
		
		this.draw = function(context){
			var tx, ty;
			if(this.map_data)
			for(var i = 0; i < this.map_data.length; i ++)
			{
				for(var j = 0; j < this.map_data[i].length; j ++)
				{
					tx = j * width - this.x;								//求出当前这个方块在canvas上的坐标
					ty = i * height - this.y;
					if(this.map_data[i][j] && tx < RENDER_WIDTH && ty < RENDER_HEIGHT && tx + width > 0 && ty + height > 0)
					{
						if(this.map_data[i][j] instanceof Array)			//多个地图重叠
						{
							for(var index = 0; index < this.map_data[i][j].length; index ++)
							{
								context.drawImage(image_data[this.map_data[i][j][index].i], 
								this.map_data[i][j][index].x, this.map_data[i][j][index].y,
								this.map_data[i][j][index].width, this.map_data[i][j][index].height,
								tx, ty,
								width, height
								);
							}
						}
						else if(this.map_data[i][j].i == -1)
						{
							context.fillStyle = this.map_data[i][j].color;
							context.fillRect(tx, ty, width, height);
						}
						else												//一层地图
						{
							context.drawImage(
								image_data[this.map_data[i][j].i],
								this.map_data[i][j].x, this.map_data[i][j].y,
								this.map_data[i][j].width, this.map_data[i][j].height,				//原始图片获取的区域
								tx, ty,
								width, height													//要显示在canvas里的
							);
						}
					}
					if(this.show_table_line == true)
					{
						context.font = "20px Arial";
						context.strokeStyle = "rgba(0, 0, 0, 0.5)";
						context.textBaseline = "top";
						context.strokeRect(tx, ty, width, height);
						context.fillText(this.map_data[i][j].f+"", tx + (width-20)/2, ty + (height-20)/2);
					}				
				}
			}
			//绘制传送点
			for(var i = 0; i < this.transmit_point.length; i ++)
			{
				//如果传送点的绘制标记变量标记为显示的话
				if(this.transmit_point[i].show == true)
				{
					context.fillStyle = "rgb(255, 0, 0)";
			//		context.fillRect(this.transmit_point[i].x-this.x, this.transmit_point[i].y-this.y, 
			//			this.transmit_point[i].w, this.transmit_point[i].h
			//		);
//					context.fillRect(10 - this.x, 10 - this.y, 100, 100);
//					context.fill();
//					console.log("transmit point");
				}
			}
			
			//移动地图，并且使地图
			this.x += this.vx;
			this.y += this.vy;
			if(this.map_width - this.x < RENDER_WIDTH)
				this.x = this.map_width - RENDER_WIDTH;
			if(this.x < 0)
				this.x = 0;
			if(this.map_height - this.y < RENDER_HEIGHT)
				this.y = this.map_height - RENDER_HEIGHT;
			if(this.y < 0)
				this.y = 0;
			
			//对渲染列表中的物体进行排列
			sorts_insert(this.render_list, 0, this.render_list.length - 1);				//排列
			//开始渲染列表
			var show_count = 0;
			for(var i = 0; i < this.render_list.length; i ++)
			{
				//if(	this.map_data && 
				//	this.render_list[i].grid_x < this.map_data[0].length && 
				//	this.render_list[i].grid_y < this.map_data.length &&
				//	this.render_list[i].grid_x >= 0 && this.render_list[i].grid_y >= 0)
				//{
					//将地图坐标转化为屏幕坐标
					this.render_list[i].x = this.render_list[i].x - this.x;
					this.render_list[i].y = this.render_list[i].y - this.y;
					
					//处理栏删的情况
					if(this.render_list[i] instanceof Fence)
					{
						
						if((this.render_list[i].is_reverse == false && 
							this.render_list[i].x-this.render_list[i].center_x <= RENDER_WIDTH &&
							this.render_list[i].x + this.render_list[i].getWidth()*this.render_list[i].x_n>= 0 &&
					 		this.render_list[i].y - this.render_list[i].center_y <= RENDER_HEIGHT &&
							this.render_list[i].y + this.render_list[i].getHeight() * this.render_list[i].y_n>= this.render_list[i].y-this.render_list[i].center_y
						)
						||
						(
							this.render_list[i].is_reverse == true && 
							this.render_list[i].x - this.render_list[i].center_x + this.render_list[i].getWidth()>= 0 &&
							this.render_list[i].x - this.render_list[i].getWidth()*this.render_list[i].x_n <= RENDER_WIDTH &&
					 		this.render_list[i].y - this.render_list[i].center_y >= this.render_list[i].y_n >= 0&&
							this.render_list[i].y - this.render_list[i].getHeight() * this.render_list[i].y_n - this.render_list[i].getHeight() <= RENDER_HEIGHT + this.render_list[i].center_y
						))
						{
							this.render_list[i].draw(context);
							show_count += 1;
						}
					}
					//处理普通物体的情况
					else if(this.render_list[i].x-this.render_list[i].center_x <= RENDER_WIDTH && 
						this.render_list[i].x + this.render_list[i].getWidth()>= 0 &&
					 	this.render_list[i].y -this.render_list[i].center_y<= RENDER_HEIGHT &&
						this.render_list[i].y + this.render_list[i].getHeight() >= this.render_list[i].y-this.render_list[i].center_y
					)
					{	
						this.render_list[i].draw(context);
						show_count += 1;
					}
					//逆转换，将屏幕坐标转换成地图坐标
					this.render_list[i].x = this.render_list[i].x + this.x;
					this.render_list[i].y = this.render_list[i].y + this.y;
					
					//只有当前的这个物体是npc或者主角的时候，才执行以下操作
					if(!(this.render_list[i].is_lead && this.render_list[i].is_lead == true))
						continue;
					//防止人物走出了屏幕
					if(this.render_list[i].x < 0)
						this.render_list[i].x = 0;
					if(this.render_list[i].y < 0)
						this.render_list[i].y = 0;
					if(this.render_list[i].x >= this.map_width - this.render_list[i].getWidth())
						this.render_list[i].x = this.map_width - this.render_list[i].getWidth();
					if(this.render_list[i].y >= this.map_height-1)
						this.render_list[i].y = this.map_height-1;
					//得到当前人物的网格坐标	
					var tgx = Math.round(this.render_list[i].x / width - 0.5);
					var tgy = Math.round(this.render_list[i].y / height - 0.5);
					
					if(this.render_list[i].vx < 0)
					{
						tgx = Math.round((this.render_list[i].x + 10)/ width - 0.5);
					}
					else if(this.render_list[i].vx > 0)
					{
						tgx = Math.round((this.render_list[i].x + this.render_list[i].getWidth() - 10)/width - 0.5);
					}
					
					if(this.render_list[i].vy < 0)
					{
						tgy = Math.round((this.render_list[i].y - 10) / height - 0.5);
						if(tgy < 0)
							tgy = 0;
						if(this.render_list[i].vx > 0)
							tgx = Math.round((this.render_list[i].x + this.render_list[i].getWidth() - 10)/ width - 0.5);
						else
							tgx = Math.round((this.render_list[i].x + 10)/ width - 0.5);
					}
					else if(this.render_list[i].vy > 0)
					{
					//	tgy = Math.round((this.render_list[i].y) / height - 0.5);
						if(this.render_list[i].vx > 0)
							tgx = Math.round((this.render_list[i].x + this.render_list[i].getWidth() - 10)/ width - 0.5);
						else
							tgx = Math.round((this.render_list[i].x + 10)/ width - 0.5);
					}
					//防止人物走到了不应该走的地方
				//	if(this.map_data[tgy][tgx] instanceof Array)
				//	{
				//		if(this.map_data[tgy][tgx][0].f == 1)
				//		{
				//			this.render_list[i].x -= this.render_list[i].vx;
				//			this.render_list[i].y -= this.render_list[i].vy;
				//		}
				//	}
					//人物没有走到不该走的地方，则移动主角
					if(this.map_data[tgy][tgx].f >= 1)
					{
						this.render_list[i].x -= this.render_list[i].vx;
						this.render_list[i].y -= this.render_list[i].vy;
					}
					//判断主角是否走到了npc旁边
					for(var ni = 0; ni < this.render_list_npc.length; ni ++)
					{
						if(this.render_list[i].isNear(this.render_list_npc[ni]) == true)
						{
							this.render_list_npc[ni].is_show_bubble = true;
							//如果该角色存在AI，则暂停其AI(并且该角色存在对话)
							if(this.render_list_npc[ni].ai_enable == true
							&& this.render_list_npc[ni].dialog_text.all_text != null)
							{
								this.render_list_npc[ni].ai_pause = true;
								//终止角色的动作
								if(this.render_list_npc[ni].temp == null)
								{
									this.render_list_npc[ni].temp = this.render_list_npc[ni].current_show_frame;
								
									this.render_list_npc[ni].setShowFrameRange(this.render_list_npc[ni].current_show_frame.start, 
																			this.render_list_npc[ni].current_show_frame.start);
								}	
								//console.log(this.render_list_npc[ni].temp.start + " "+ this.render_list_npc[ni].temp.end);
							}
						}
						else
						{
							//如果该角色存在AI,则开启其AI
							if(this.render_list_npc[ni].ai_enable == true)
								this.render_list_npc[ni].ai_pause = false;
							//恢复原来的动作
							if(this.render_list_npc[ni].temp)
							{
								//console.log("s:"+this.render_list_npc[ni].temp.start+"e:"+this.render_list_npc[ni].temp.end);
								
								this.render_list_npc[ni].setShowFrameRange(
									this.render_list_npc[ni].temp.start,
									this.render_list_npc[ni].temp.end);
								this.render_list_npc[ni].temp = null;			//销毁这个临时变量
							}
							this.render_list_npc[ni].is_show_bubble = false;
						}
					}
					//判断当前这个角色是不是主角
					//if(this.render_list[i].is_lead && this.render_list[i].is_lead == true)
					//{	
						//判断主角是否走到了传送点
						for(var ti = 0; ti < this.transmit_point.length; ti ++)
						{
							if(this.render_list[i].x+this.render_list[i].getWidth()/2 >= this.transmit_point[ti].x && this.render_list[i].x+this.render_list[i].getWidth()/2 <= this.transmit_point[ti].x + this.transmit_point[ti].w
							&&this.render_list[i].y >= this.transmit_point[ti].y && this.render_list[i].y <= this.transmit_point[ti].y + this.transmit_point[ti].h)
							{
								//调用到传送点回调函数
								if(this.transmit_point_call_func)
								{
									//自动弹出
									if(this.transmit_point[ti].auto &&
										this.transmit_point[ti].auto == true &&
										this.transmit_point[ti].is_in == false)
									{
										this.render_list[i].left = 0;this.render_list[i].right = 0;this.render_list[i].top = 0;this.render_list[i].bottom = 0;
										this.render_list[i].vx = 0;this.render_list[i].vy = 0;
										this.transmit_point[ti].is_in = true;
										this.transmit_point_call_func(ti);
									}
									else
									{
										//	this.transmit_point_call_func(ti);
										this.is_fouces_transmit_point = true;
										this.transmit_point_index = ti;
										
									}
								}
								break;
							}
							else			//主角没有走到这个传送点上
							{
								this.transmit_point[ti].is_in = false;
								this.is_fouces_transmit_point = false;
							}
						}
						
						var lead_x = 0, lead_y = 0;
						//计算主角的屏幕坐标
						if(this.render_list[i])
						{
							lead_x = this.render_list[i].x - this.x;
							lead_y = this.render_list[i].y - this.y;
							
							if(this.render_list[i].vx > 0 && lead_x >= RENDER_WIDTH * 2 / 3)
								this.vx = 2;
							else if(this.render_list[i].vx < 0 && lead_x <= RENDER_WIDTH / 3)
								this.vx = -2;
							if(this.map_height > RENDER_HEIGHT && this.render_list[i].vy < 0 && lead_y <= RENDER_HEIGHT / 3)
								this.vy = -2;
							if(this.map_height > RENDER_HEIGHT && this.render_list[i].vy > 0 && lead_y >= RENDER_HEIGHT * 2 / 3)
								this.vy = 2;
						}
					//}
				//}
			}
			//渲染npc对话框
			for(var i = 0; i < this.render_list_npc_dialog_text.length; i ++)
			{
				this.render_list_npc_dialog_text[i].draw(context);
			}
		/*	context.save();
		//	context.beginPath();
			context.rect(100,100,200,400);
			context.fill();
        	context.clip();   
			//console.log("show count:"+show_count);
			context.fillStyle = "rgba(100,100,100,0.5)";
			context.fillRect(0, 0, RENDER_WIDTH, RENDER_HEIGHT);
		
        	context.restore();
        	*/
		}
		this.frame = function(){
			for(var i = 0; i < this.render_list.length; i ++)
			{
				if(this.render_list[i].frame)
					this.render_list[i].frame();
			}
		}
	}
	//文字对象
	this.Text = function(t_text){
		var text = t_text;
		this.x = 0;
		this.y = 0;
		this.font_size = 15;
		this.font = "15px Arial";
		this.rotation = 0;
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.text_color = "rgba(0, 0, 0, 1)";
		//与旋转有关的变量
		this.rotate_center_x = 0;
		this.rotate_center_y = 0;
		this.rotate_angle = 0;
		//定时time变量
		var time_enable = false;
		//可变定时器变量
		var timer = null;
		var show_end_func = null;
		//其他变量
		this.isPause = false;
		//透明度变化动画的变量
		var alpha = 1;					//默认情况下是不透明的
		var v_alpha = 0;				//步进情况
		var v_alpha_value = 0.06;
		var alpha_enable = false;		//默认关闭透明度变化
		//文本逐个显示动画
		var show_index = 0;
		var this_text = text;
		var increase_enable = false;	//默认关闭逐个显示
		
		var timer_call_back_fun = function(t){		//定时器回调函数
			
			if(increase_enable == true)
			{
				if(show_index < text.length)
				{
					show_index += 1;
				}
				else
				{
				//	time_enable = false;			//关闭定时器
				//	timer.stopTimer();
					if(show_end_func)				//如果用户设置了定时器完成一个轮回的回调函数，则调用该回调函数
						show_end_func();			//调用结束函数
				}
			}
			if(alpha_enable == true)
			{
				alpha += v_alpha;
				if(alpha >= 1)
				{
					alpha = 1;
					v_alpha = -v_alpha_value;
				}
				else if(alpha <= 0)
				{
					alpha = 0;
					v_alpha = v_alpha_value;
				}
			}
		}
		var timer_call_back_end_fun = function(){
			//show_index = 0;
			timer.resetTimer();		//重启定时器
			//timer.setTimerEnable(true);
			timer.startTimer();
		}
		this.setEndFunc = function(func){
			show_end_func = func;
		}
		//安装定时器
		this.InstallTimer = function(new_timer){
			if(timer)
			{
				timer = null;
				timer = new_timer;
			}
			else
			{
				timer = new_timer;
			}
			//设置定时器回调函数
			timer.startTimer();			//设置开启定时器
			timer.setCallFunc(timer_call_back_fun);
			timer.setCallEndFunc(timer_call_back_end_fun);
		}
		//卸载定时器
		this.UnInstallTimer = function(){
			if(timer)
			{
				timer = null;
			}
		}
		
		var visible = true;			//可见性
		this.setFontSize = function(size){
			this.font_size = size;
			this.font = this.font_size + "px Arial";
		}
		
		this.getWidth = function(context){
			var temp_font = context.font;
			context.font = this.font;
			var max_width = 0;
			var temp_width;
			var texts = text.split("\n");
			for(var i = 0; i < texts.length; i ++)
			{
				temp_width = context.measureText(texts[i]).width;
				if(temp_width > max_width)
					max_width = temp_width;
			}
			context.font = temp_font;
			return max_width;
		}
		this.setTextColor = function(r, g, b){
			this.text_color = "rgba("+r+","+g+","+b+", 1)";
			this.r = r; this.g = g; this.b = b;
		}
	//	this.getTextWidth = function(){
	//		//return context.measureText(button_text).width
	//	}
		this.setVisible = function(flag){
			visible = flag;
		}
		//设置定时器的标志，并且开启定时器
		this.setTimerEnable = function(flag){
			time_enable = flag;
			if(time_enable == true)
			{
				timer.startTimer();
			}
			else
			{
				if(timer)
					timer.stopTimer();
			}
		}
		//逐个显示动画设置
		this.IncreaseEnable = function(enable){
			increase_enable = enable;
			if(enable)
			{
				show_index = 0;
				this_text = "";
			}
			else
			{
				this_text = text;
			}
		}
		//透明度动画显示
		this.AlphaEnable = function(enable){
			alpha_enable = enable;
			if(enable == true)
			{
				alpha = 1;
				v_alpha = -v_alpha_value;
			}
			else
			{
				alpha = 1;
				v_alpha = 0;
			}
		}
		this.pause = function(){
			timer.pauseTimer();
			this.isPause = true;
		}
		this.resume = function(){
			timer.resumeTimer();
			this.isPause = false;
		}
		
		this.resetText = function(){
			//如果存在定时器，并且开启了定时器，那么就重置文本空，
			//否则就重置文本为整个文字
			
			if(increase_enable == true)
			{
				show_index = 0;
				this_text = "";
			}
			else
			{
				this_text = text;
			}
		}
		this.draw = function(context){
			//文字不可见，不渲染
			if(visible == false)
			{
				return;
			}
			this.text_color = "rgba("+this.r+","+this.g+","+this.b+","+alpha+")";
		//	console.log(this.text_color);
			context.fillStyle = this.text_color;
			context.font = this.font;
			context.save();
			context.translate((this.x + this.rotate_center_x), (this.y + this.rotate_center_y));
			context.rotate(this.rotate_angle);
			context.translate(-(this.x + this.rotate_center_x), -(this.y + this.rotate_center_y));
			var temp_text = this_text.split("\n");
			for(var i = 0; i < temp_text.length; i ++)
			{
				context.fillText(temp_text[i], this.x, this.y + this.font_size + this.font_size * i);
			//	console.log(temp_text[i]);
			}
			//console.log(temp_text[0]);
			context.restore();
		}		
		this.frame = function(){
			//开启了定时器并且当前文字可见
			if(time_enable == true)
			{
				//如果存在用户自定义的定时器
				if(timer)
				{
					timer.frame();
					
					
					//存在逐个显示动画
					if(increase_enable == true)
						this_text = text.substr(0, show_index);
				}
			}
		}
	}
	
	this.Timer = function(){
		this.timers = new Array();
		//正在执行的Timer的临时变量
		var current_timer_index = 0;		//当前定时器的索引
		var start_time = 0, end_time = 0;	//
		var is_enable_timer = false;
		
		var call_back_func = null;			//定时器回调函数
		var call_back_end_func = null;		//定时器结束回调函数
		this.add  = function(time){
			this.timers.push(time);
		}
		this.setCallFunc = function(func){
			call_back_func = func;
		}
		this.setCallEndFunc = function(func){
			call_back_end_func = func;
		}
		
		this.remove = function(index_time){
			if(index_time >= this.timers.length)
				return;
			var t = this.timers[index_time];
			this.timers[index_time] = this.timers[this.timers.length - 1];
			this.timers[this.timers.length - 1] = t;
			this.timers.pop();
		}
		//重启定时器
		this.resetTimer = function(){
			current_timer_index = 0;
			start_time = 0;
			end_time = 0;
		}
		//开启定时器
		this.startTimer = function(){
			is_enable_timer = true;
		}
		//停止定时器
		this.stopTimer = function(){
			is_enable_timer = false;
		}
		var pause_time = 0;
		//暂停定时器
		this.pauseTimer = function(){
			is_enable_timer = false;
			pause_time = new Date().getTime();
		}
		//恢复定时器
		this.resumeTimer = function(){
			is_enable_timer = true;
			start_time = start_time +  new Date().getTime() - pause_time;
		}
		this.frame = function(){
			//定时器没有开启或者定时且结束
			if(is_enable_timer == false || current_timer_index >= this.timers.length)
			{
				return;
			}
			//第一次开启定时器
			if(start_time == 0)
			{
				start_time = new Date().getTime();
			}
			else
			{
				end_time = new Date().getTime();
				if(end_time >= this.timers[current_timer_index].time + start_time)
				{
					//定时器回调函数
					if(call_back_func)
					{
						//调用回调函数，传递当前的这个定时器对象和
						this.timers[current_timer_index].index = current_timer_index;
						call_back_func(this.timers[current_timer_index]);
					}
					current_timer_index = current_timer_index + 1;
					//定时器结束的回调函数
					if(current_timer_index >= this.timers.length && call_back_end_func)
					{
						is_enable_timer = false;		//结束定时器标签
					//	console.log("current time:" + this.timers[current_timer_index - 1].time + " time:" + (end_time - start_time));
						call_back_end_func();
					}
				}
			}
		}
	}
	
	this.Button = function(text){
		var button_text = text;
		this.x = 0;
		this.y = 0;
		//this.w = 100, this.h = 60;
		this.w = 0, this.h = 0;
		this.r = 15;
		this.click = false;					//表示被按下的标志
		
		this.background_is_exist = true;	///默认存在背景
		
		
		var text_size = 15;
		this.default_background_color = "rgb(200, 225, 200)";
		this.ontouch_background_color = "rgb(160, 180, 160)";
		var button_background_color = "rgb(200, 225, 200)";
		var button_text_color = "rgb(0, 0, 0)";
		
		var default_background_image = null;
		var ontouch_background_image = null;
		var button_background_image = null;
		
		this.is_in = false;				//鼠标进入了按钮
		this.visible = true;
		//用户定义的按钮回调函数
		var call_back_onclicklistener = null;
		var call_back_onmousedown = null;
		var call_back_onmouseup = null;
		var call_back_ontouch = null;
		
		var call_back_onin = null;
		var call_back_onout = null;
		
		var call_exit_button = null;		//退出按钮结束动画调用的函数
		var is_exit_button = false;			//是否是退出按钮动画
		var exit_partices = null;			//保存退出粒子
		
		//(系统)按钮回调函数
		this.call_onclicklistener = function(e){
			if(call_back_onclicklistener)
				call_back_onclicklistener(e);
		}
		this.call_onmousedown = function(e){
			if(call_back_onmousedown)
				call_back_onmousedown(e);
		}
		this.call_onmouseup = function(e){
			if(call_back_onmouseup)
				call_back_onmouseup(e);
		}
		this.call_ontouch = function(e){
			if(call_back_ontouch)
				call_back_ontouch(e);
		}
		this.call_onin = function(e){
			button_background_color = this.ontouch_background_color;
			button_background_image = ontouch_background_image;
			canvas.style.cursor = 'pointer';
			if(call_back_onin)
				call_back_onin(e);
		}
		this.call_onout = function(e){
			button_background_color = this.default_background_color;
			button_background_image = default_background_image;
			
			canvas.style.cursor = 'default';
			if(call_back_onout)
				call_back_onout(e);
		}
		
		this.setPosition = function(xx, yy){
			this.x = xx;
			this.y = yy;
		}
		this.setTextSize = function(size){
			text_size = size;
		}
		this.setTextColor = function(r, g, b){
			button_text_color = "rgb("+r+","+g+","+b+")";
		}
		this.setDefaultBackgroundColor = function(r, g, b){
			this.default_background_color = "rgb("+r+","+g+","+b+")";
			button_background_color = this.default_background_color;
		}
		this.setOnTouchBackgroundColor = function(r, g, b){
			this.ontouch_background_color = "rgb("+r+","+g+","+b+")";
		}
		this.setDefaultBackgroundImage = function(path){
			default_background_image = new Image();
			default_background_image.src = path;
			
			button_background_image = default_background_image;
		}
		this.setOnTouchBackgroundImage = function(path){
			ontouch_background_image = new Image();
			ontouch_background_image.src = path;
		}
		this.drawText = function(context){
			context.fillStyle = button_text_color;
			context.textBaseline = "top";
			context.font = text_size+"px Arial";
			//console.log(button_text)
			context.fillText(button_text, this.x + (this.w - context.measureText(button_text).width) / 2, this.y + (this.h - text_size) / 2);
			context.fill();
		}
		this.getWidth = function(){
			if(this.w > 0)
				return this.w;
			else if(button_text)
				return button_text.length*text_size + 40;
			return 0;
		}
		this.getHeight = function(){
			if(this.h > 0)
				return this.h;
			return 60;
		}
		this.setWidth = function(w){
			this.w = w;
		}
		this.setHeight = function(h){
			this.h = h;
		}
		this.setText = function(text){
			button_text = text;
		}
		this.draw = function(context){
			//用户进入退出动画
			//暂时未实现，，，，，，
			if(is_exit_button == true)
			{
				
			}
			if(this.visible == false)
				return;
			//console.log(this.visible);
			if(this.w < 2 * this.r)
				this.r = this.w / 2;
			if(this.h < 2 * this.r)
				this.r = this.h / 2;
			context.font = text_size + "px Arial";
			if(this.w == 0 || this.h == 0)
			{
				if(this.background_is_exist == true)
				{
					if(this.w <= 0)
						this.w = context.measureText(button_text).width + 40;
					if(this.h <= 0)
						this.h = 60;
				}
				else
				{
					if(this.w <= 0)
						this.w = context.measureText(button_text).width;
					if(this.h <= 0)
						this.h = text_size+20;
				}
			}
			//判断按钮是否存在背景
			if(this.background_is_exist == true)
			{
				if(button_background_image)
				{
					context.drawImage(button_background_image, 0, 0, button_background_image.width, button_background_image.height, 
					this.x, this.y, this.w, this.h
					);
				}
				else
				{
					context.fillStyle = button_background_color;//"rgb(205, 225, 205)";
					//context.fillStyle = "rgb(255,255,255)";
					//context.strokeStyle = "rgb(255, 255, 255)";
					context.lineWidth = 2;
					
					//context.beginPath();
					//context.moveTo(this.x + this.r, this.y);			
					//context.arcTo(this.x + this.w, this.y, this.x + this.w, this.y + this.r, this.r);
					//context.arcTo(this.x + this.w, this.y + this.h, this.x, this.y + this.h, this.r);
					//context.arcTo(this.x, this.y + this.h, this.x, this.y, this.r);
					//context.arcTo(this.x, this.y, this.x + this.w, this.y, this.r);
					//context.closePath();
					//context.stroke();
					context.fillRect(this.x,this.y,this.w,this.h);
					context.fill();
				}
			}
			
			this.drawText(context);
		//	context.font = text_size+"px Arial";
		//	context.fillText(button_text, this.x + (this.w - context.measureText(button_text).width) / 2, this.y);
		//	context.fill();
			//context.fillText("tindao yi", 100, 250);
			//context.stroke();
			//context.fillStyle = "rgb(255, 0, 0)";
			//context.fillRect(this.x, this.y, this.w, this.h);
		}
		this.exitButton = function(func){
			call_exit_button = func;
		}
		this.addOnClickListener = function(func){
			call_back_onclicklistener = func;
		}
		this.addMouseDown = function(func){
			call_back_onmousedown = func;
		}
		this.addMouseUp = function(func){
			call_back_onmouseup = func;
		}
		this.addOnTouch = function(func){
			call_back_ontouch = func;
		}
		this.addOnOut = function(func){
			call_back_onout = func;
		}
		this.addOnIn = function(func){
			call_back_onin = func;
		}
		
		this.getType = function(){
			return 'Button';
		}
	}
	this.ShowText = function(){
		var texts = new Array();		//所有添加的文字效果
		var show_index = 0;				//显示到第几个文字的索引
		this.x = 0;
		this.y = 0;
		this.add = function(text){
			texts[texts.length] = text;
		}
		this.draw = function(context){
			
			context.font = "40px Arial";
			context.strokeStyle = "rgb(255, 255, 255)";
			context.strokeRect(this.x, this.y - 40/3*2, 100, 30);
			context.stroke();
			
//			context.measureText(texts[show_index]).width, context.measureText(texts[show_index]).height
			context.fillStyle = "rgb(0, 0, 0)";
			context.fillText(texts[show_index]+" " + context.measureText(texts[show_index]).height, this.x, this.y);
		}
		this.frame = function(){
			
		}
		this.getShowIndx = function(){
			return show_index;
		}
		
		this.toLeft = function(){
			if(show_index == 0)
				show_index = texts.length - 1;
			else
				show_index = show_index - 1;
		}
		
		this.toRight = function(){
			show_index = (show_index + 1) % texts.length;
		}
		this.getType = function(){
			return 'ShowText';
		}
	}
	
	this.Scene = function(){
		var render_list = new Array();
		var canvas;
		var context;
		
		var canvas_buffer;
		var context_buffer;
		//放大镜canvas
		var canvas_big_mirror;
		var context_big_mirror;
		
		var background_color = null;		//"rgb(16, 16, 16)";		//默认背景透明
		var background_img;
		//场景退出进入时需要用到的
		var width_count = 16, height_count = 10;
		//进入场景时需要用到的
		var enter_completion_call_func;
		var enter_data = new Array();
		var enter_canvas, enter_context;
		//退出场景时需要用到的
		var exit_completion_call_func;
		var exit_data = new Array();
		var exit_canvas, exit_context;
		
		//事件处理列表
		var mouse_down_list = new  Array();
		var mouse_up_list = new Array();
		var key_down_list = new Array();
		var key_up_list = new Array();
		//放大镜位置信息
		var big_mirror_enable = false;				//是否开启放大镜效果
		var big_mirror_radius = 50;				//放大镜的半径
		var big_mirror_destion_x = 0;				//要放大的区域坐标
		var big_mirror_destion_y = 0;
		var big_mirror_x = 0;						//放大镜的坐标
		var big_mirror_y = 0;
		
		
		this.getWidth = function(){
			return canvas.width;
		}
		this.getHeight = function(){
			return canvas.height;
		}
		this.setCanvas = function(can){
			canvas = can;
			context = canvas.getContext("2d");
			
			canvas_buffer = document.createElement("canvas");
			canvas_buffer.width = canvas.width;
			canvas_buffer.height = canvas.height;
			
			context_buffer = canvas_buffer.getContext("2d");
			
			//鼠标事件
			//test&&typeof(test)=="function"
			canvas.onmouseover = sceneMouseover;
			canvas.onmousedown = sceneMousedown;
			canvas.onmousemove = sceneMousemove;
			canvas.onmouseup = sceneMouseup;
			document.onkeydown = sceneKeyDown;
			document.onkeyup = sceneKeyUp;
			//canvas.addEventListener('keydown', sceneKeyDown, true);
			canvas.focus();
		}
		this.setBackgroundImage = function(path){
			if(background_img)
			{
				background_img.src = path;
			}
			else
			{
				background_img = new Image();
				background_img.src = path;
			}
		}
		//放大镜函数
		this.setBigMirrorEnable = function(flag){
			big_mirror_enable = flag;
			if(big_mirror_enable == true)
			{
				if(canvas_big_mirror)
				{
					canvas_big_mirror = null;
					context_big_mirror = null;
				}
				canvas_big_mirror = document.createElement("canvas");
				canvas_big_mirror.width = canvas.width;
				canvas_big_mirror.height = canvas.height;
				context_big_mirror = canvas_big_mirror.getContext("2d");
			}
			else
			{
				//销毁canvas
				canvas_big_mirror = null;
				context_big_mirror = null;
			}
		}
		this.setBigMirrorPostion = function(x, y){
			big_mirror_x = x;
			big_mirror_y = y;
		}
		this.setBitMirrorDestionPosition = function(x, y){
			big_mirror_destion_x = x;
			big_mirror_destion_y = y;
		}
		this.setBigMirrorRadius = function(radius){
			big_mirror_radius = radius;
		}
		
		
		var down_time = 0;
		var up_time = 0;
		
		//添加鼠标事件处理函数
		this.addMouseDown = function(func){
			mouse_down_list[mouse_down_list.length] = func;
		}
		this.addMouseUp = function(func){
			mouse_up_list[mouse_up_list.length] = func;
		}
		//添加键盘事件处理函数
		this.addKeyDown = function(func){
			key_down_list[key_down_list.length] = func;
		}
		this.addKeyUp = function(func){
			key_up_list[key_up_list.length] = func;
		}
		
		
		//canvas事件处理鼠标
		function sceneMouseover(e){
		}
		function sceneMousedown(e){
			//调用其他添加进来的处理函数
			for(var i = 0; i < mouse_down_list.length; i ++)
			{
				mouse_down_list[i](e);
			}
			
			var bbpx = canvas.getBoundingClientRect();
			var x = e.clientX - bbpx.left;
			var y = e.clientY - bbpx.top;
			
			down_time = Date.parse(new Date());
			for(var i = 0; i < render_list.length; i ++)
			{
				if(render_list[i].onmousedown)
				{
					render_list[i].onmousedown(e);
				}
				if(render_list[i].getType)
				{
					if(render_list[i].getType() == 'Button' && render_list[i].visible == true)
					{
						if(x >= render_list[i].x && x <= render_list[i].x + render_list[i].w
						&& y >= render_list[i].y && y <= render_list[i].y + render_list[i].h
						)
						{
							render_list[i].onclick = true;
							if(render_list[i].call_onmousedown)
							{
								render_list[i].call_onmousedown({x:x - render_list[i].x, y:y - render_list[i].y});
							}
						}
					}
					else if(render_list[i].getType() == 'Map')
					{
						for(var ti = 0; ti < render_list[i].render_list_npc.length; ti ++)
						{
							var npct = render_list[i].render_list_npc[ti].dialog_text;
							if(x >= npct.x && x <= npct.x + npct.w
							&& y >=npct.y && y <= npct.y + npct.h
							){
								npct.onclick = true;
								if(npct.call_onmousedown)
								{
									//render_list[i].call_onmousedown({x:x-npct.x, y:y-pc.ty});
								}
							}
						}
					}
				}
			}
		}
		function sceneMouseup(e){
			//调用其他添加进来的处理函数
			for(var i = 0; i < mouse_up_list.length; i ++)
			{
				mouse_up_list[i](e);
			}
			var bbpx = canvas.getBoundingClientRect();
			var x = e.clientX - bbpx.left;
			var y = e.clientY - bbpx.top;
			up_time = Date.parse(new Date());
			for(var i = 0; i < render_list.length; i ++)
			{
				//鼠标弹起事件
				if(render_list[i].onmouseup)
				{
					render_list[i].onmouseup(e);
				}
				if(render_list[i].getType)
				{
					if(render_list[i].getType() == 'Button' && render_list[i].visible == true)
					{
						if(render_list[i].onclick == true)					//之前已经按下了该按钮
						if(x >= render_list[i].x && x <= render_list[i].x + render_list[i].w
						&& y >= render_list[i].y && y <= render_list[i].y + render_list[i].h
						)
						{
							//调用up事件
							if(render_list[i].call_onmouseup)
								render_list[i].call_onmouseup({x:x - render_list[i].x, y:y - render_list[i].y});
							//如果按下与松开的时间不超过500ms，则调用按下事件
							if(up_time - down_time < 140 && render_list[i].call_onclicklistener)
								render_list[i].call_onclicklistener({x:x - render_list[i].x, y:y - render_list[i].y});
						}
						//不管之前是否按下了该按钮，只要鼠标松开，就设置该标记为未按下
						render_list[i].onclick = false;
					}
					else if(render_list[i].getType() == 'Map')			//处理地图中的对话框
					{
						for(var ti = 0; ti < render_list[i].render_list_npc.length; ti ++)
						{
							var npct = render_list[i].render_list_npc[ti].dialog_text;
							if(npct.onclick == true)					//之前已经按下了该按钮
							if(x >= npct.x && x <= npct.x + npct.w
							&& y >=npct.y && y <= npct.y + npct.h
							)
							{
								//调用up事件
								if(npct.call_onmouseup)
									npct.call_onmouseup({x:x - npct.x, y:y - npct.y});
								//如果按下与松开的时间不超过500ms，则调用按下事件
								if(up_time - down_time < 140 && npct.call_onclicklistener)
									npct.call_onclicklistener({x:x - npct.x, y:y - npct.y});
							}
							//不管之前是否按下了该按钮，只要鼠标松开，就设置该标记为未按下
							npct.onclick = false;
						}
					}
				}
			}
		}
		
		function sceneMousemove(e){
			var bbpx = canvas.getBoundingClientRect();
			var x = e.clientX - bbpx.left;
			var y = e.clientY - bbpx.top;	
			
			//放大镜坐标
			if(big_mirror_enable == true)
			{
				big_mirror_destion_x = x;
				big_mirror_x = x;
				big_mirror_destion_y = y;
				big_mirror_y = y;
			}
			
			for(var i = 0; i < render_list.length; i ++)
			{
				//鼠标移动事件
				if(render_list[i].onmousemove)
				{
					render_list[i].onmousemove(e);
				}
				if(render_list[i].getType)
				{
					//处理按钮
					if(render_list[i].getType() == 'Button' && render_list[i].visible == true)
					{
						if(x >= render_list[i].x && x <= render_list[i].x + render_list[i].w
						&& y >= render_list[i].y && y <= render_list[i].y + render_list[i].h
						)
						{
							//调用ontouch函数
							if(render_list[i].call_ontouch)
								render_list[i].call_ontouch({x:x-render_list[i].x, y:y-render_list[i].y});
							//鼠标进入了该鼠标区域
							if(render_list[i].is_in == false)
							{
								render_list[i].is_in = true;
								render_list[i].call_onin();
							}
						}
						else
						{
							//鼠标离开的该按钮区域
							if(render_list[i].is_in == true)
							{
								render_list[i].is_in = false;
								render_list[i].call_onout();
							}
						}
					}
				}
			}
		}
		
		//键盘事件处理
		function sceneKeyDown(e){
			if(game_pause == true)
				return;
			//-------------
			for(var i = 0; i < render_list.length; i ++)
			{
				//如果存在对话框，并且该对话框正在显示，那么直接退出，不处理其他物体的的键盘按下事件
				if(render_list[i] instanceof DialogText)
				{
					if(render_list[i].visible == true)
					{
						render_list[i].onkeydown(e);
						return;
					}
				}
			}
			//处理用户自定义的键盘事件
			for(var i = 0; i < key_down_list.length; i ++)
			{
				key_down_list[i](e);
			}
			//处理添加进来的物理的键盘事件
			for(var i = 0; i < render_list.length; i ++)
			{
				if(render_list[i].onkeydown)
				{
					render_list[i].onkeydown(e);
				}
				/*
				 * if(render_list[i].onKeyDown)
				 * 		render_list[i].onKeyDown(e);
				 */
			}
		}
		function sceneKeyUp(e){
			for(var i = 0; i < key_up_list.length; i ++)
			{
				key_up_list[i](e);
			}
			//处理添加进来的物体的键盘弹起事件
			for(var i = 0; i < render_list.length; i ++)
			{
				if(render_list[i].onkeyup){
					render_list[i].onkeyup(e);
				}
			}
		}
		
		this.getCanvasBuffer = function(){
			return canvas_buffer;
		}
		this.getContextBuffer = function(){
			return context_buffer;
		}
		this.getCanvas = function(){
			return canvas;
		}
		this.getContext = function(){
			return context;
		}
		this.setBackgroundColor = function(r, g, b){
			//输入非法的数据，则直接将背景设为透明
			if(r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255)
				background_color = null;
			else
				background_color = "rgb("+r+","+g+","+b+")";
		}
		var is_enter_animation = false;
		var is_exit_animation = false;
		var is_tradition_animation = true;
		this.setTraditionAnimation = function(flag){
			is_tradition_animation = flag;
		}
		this.render = function(){
			if(is_tradition_animation == false)
			{	if(is_enter_animation == true)
				{
					enterSceneAnimation();
					return ;
				}
				else if(is_exit_animation == true)
				{
					exitSceneAnimation();
					return ;
				}
			}
			
			//如果有场景背景图，则显示场景背景图
			if(background_img)
			{
				context_buffer.drawImage(background_img, 0, 0);
			}
			else
			{
				if(background_color)		//存在背景颜色
				{
					context_buffer.fillStyle = background_color;
					context_buffer.fillRect(0, 0, canvas_buffer.width, canvas_buffer.height);
				}
				else						//此模式下背景透明
				{					
					context.clearRect(0, 0, canvas.width, canvas.height);
					context_buffer.clearRect(0, 0, canvas_buffer.width, canvas_buffer.height);
				}
			}
			for(var i = 0; i < render_list.length; i ++)
			{
				//if(render_list[i].visible && render_list[i].visible == true)
				render_list[i].draw(context_buffer);
				if(render_list[i].frame)
				{
					render_list[i].frame();
				}
			}
			if(big_mirror_enable == true)
			{
				//context.fillStyle = "rgb(255, 255, 0)";
				context_big_mirror.drawImage(canvas_buffer, 0, 0);
				
				context_buffer.save();
				context_buffer.lineWidth = 0.5;
				context_buffer.strokeStyle = "rgb(255,125, 125)";
				context_buffer.beginPath();
				context_buffer.arc(big_mirror_x, big_mirror_y, big_mirror_radius, 0, Math.PI * 2);
				context_buffer.stroke();
				context_buffer.clip();
				
				context_buffer.drawImage(canvas_big_mirror, 
					big_mirror_destion_x - big_mirror_radius,
					big_mirror_destion_y - big_mirror_radius, 
					big_mirror_radius * 2,
					big_mirror_radius * 2, 
					big_mirror_x - big_mirror_radius*2,
					big_mirror_y - big_mirror_radius*2,
					big_mirror_radius * 4,
					big_mirror_radius * 4);
				context_buffer.restore();
			}
			else
			{
				context_buffer.stroke();
				context_buffer.fill();
			}
			
		//	context_buffer.fill();
			
			context.drawImage(canvas_buffer, 0, 0);
		}
		this.renderBuffer = function(){			
			if(background_img)
			{
				context_buffer.drawImage(background_img, 0, 0);
			}
			else
			{
				context_buffer.fillStyle = background_color;
				context_buffer.fillRect(0, 0, canvas_buffer.width, canvas_buffer.height);
			}
			
			for(var i = 0; i < render_list.length; i ++)
			{
				render_list[i].draw(context_buffer);
				if(render_list[i].frame)
					render_list[i].frame();
			}
			//for(var i = 0; i < render_list.length; i ++)
			//{
			//	if(render_list[i].drawText)
			//	{
			//		render_list[i].drawText(context_buffer);
			//	}
			//}
			context_buffer.stroke();
			context_buffer.fill();
		}
		this.clearCanvasBuffer = function(){
			context_buffer.clearRect(0, 0, canvas_buffer.width, canvas_buffer.height);
			context.clearRect(0, 0, canvas.width, canvas.height);
		}
		//添加一个渲染物体
		this.add = function(o){
			render_list[render_list.length] = o;
			if(o.Constructor)				//存在构造函数
			{
				o.Constructor();
				var os = o.Constructor();
				if(os)
				for(var i = 0; i < os.length; i ++)
				{
					render_list[render_list.length] = os[i];
				//	os[i].visible = false;
				}
			}
			//将该
			//if(o instanceof FGAMES.Map)
			//{
			//	if(o.onkeydown)
			//		this.addKeyDown(o.onkeydown);
			//	for(var i = 0; i < o.render_list_npc.length; i ++)
			//		render_list[render_list.length] = o.render_list_npc[i].dialog_text;
			//}
		}
		//移除渲染列表中的obj
		this.removeObject = function(obj){
			for(var i = 0; i < render_list.length; i ++)
			{
				if(obj == render_list[i])
				{
					render_list[i] = render_list[render_list.length - 1];
					render_list.pop();
					if(obj.Destructor)				//存在析构函数
					{
						var os = obj.Destructor();
						
						if(os)
						for(var i = 0; i < os.length; i ++)
						{
							this.removeObject(os[i]);
						}
						
					}
					return ;
				}
			}
		}
		//移除索引为index处的物体
		this.removeIndex = function(index){
			var temp = render_list[index];
			render_list[index] = render_list[render_list.length - 1];
			render_list[render_list.length - 1] = temp;
			render_list.pop();
		}
		//将场景里的所有物体都移除
		this.clearAll = function(){
			while(render_list.length > 0)
				render_list.pop();
		}
		
		var animation_background_color = "rgb(255, 255, 255)";
		this.setAnimationBackgroundColor = function(r, g, b){
			animation_background_color = "rgb("+r+","+g+","+b+")";
		}
		
		var completion_count = 0;
		function enterAnimationInit1(){
			  var w = canvas_buffer.width / width_count;
			  var h = canvas_buffer.height / height_count;
			  //创建进入时的离屏canvas
			  enter_canvas = document.createElement("canvas");
			  enter_canvas.width = canvas.width; enter_canvas.height = canvas.height;
			  enter_context = enter_canvas.getContext("2d");
			  enter_context.drawImage(canvas_buffer, 0, 0);
			  
			  for(var y = 0;  y < height_count; y ++)
			  {
			  	enter_data[y] = new Array();
			  	for(var x = 0; x < width_count; x ++)
			  	{
			  		enter_data[y][x] = {
			  			start_y:y*h - enter_canvas.height,
			  			x:x * w,
			  			y:y * h,
			  			completion:false,
			  			vx:0,
			  			vy:0,
			  			ax:0,
			  			ay:Math.random() * 0.5 + 0.1,
			  			width:w,
			  			height:h,
			  			data:null
			  		};
			  		enter_data[y][x].data = enter_context.getImageData(x * w, y * h, w, h);
			  	}
			  }	
		}
		function enterAnimationIsCompletion1(){
			if(completion_count == width_count * height_count)
			{
				while(enter_data.length > 0)
					enter_data.pop();
				return true;
			//	enter_completion_call_func();
			}
			return false;
		}
		function enterAnimationDraw1(){
				context_buffer.fillStyle = animation_background_color;
				context_buffer.fillRect(0, 0, canvas_buffer.width, canvas_buffer.height);
				
				context.clearRect(0, 0, canvas.width, canvas.height);
				for(var y = 0; y < height_count; y ++)
				{
					for(var x = 0; x < width_count; x ++)
					{
						if(enter_data[y][x].completion == false)
						{
							if(enter_data[y][x].start_y >= enter_data[y][x].y)
							{
								enter_data[y][x].start_y = enter_data[y][x].y;
								enter_data[y][x].completion = true;
								completion_count ++;
							}
						}
						context_buffer.putImageData(enter_data[y][x].data, enter_data[y][x].x, enter_data[y][x].start_y);
						
						if(enter_data[y][x].completion == false)
						{
							enter_data[y][x].x += enter_data[y][x].vx; enter_data[y][x].vx += enter_data[y][x].ax;
							enter_data[y][x].start_y += enter_data[y][x].vy; enter_data[y][x].vy += enter_data[y][x].ay;
						}
					}
				}
				context.drawImage(canvas_buffer, 0, 0);
		}
		var x_count2 = 20;
		var current_x = 0;
		var current_move = -1;
		var canvas2, context2;
		function enterAnimationInit2(){
			current_x = Math.round(canvas_buffer.width / x_count2);
			canvas2 = document.createElement("canvas");
			canvas2.width = canvas_buffer.width; canvas2.height = canvas_buffer.height;
			context2 = canvas2.getContext("2d");
			
			context2.drawImage(canvas_buffer, 0, 0);
		}
		function enterAnimationDraw2(){
			var tw = Math.round(canvas_buffer.width / x_count2);
			//context.clearRect(0, 0, canvas.width, canvas.height);
			//context_buffer.clearRect(0, 0, canvas_buffer.width, canvas_buffer.height);
			context_buffer.drawImage(canvas2, 0, 0);
			context_buffer.fillStyle = animation_background_color;
			for(var i = 0; i < x_count2; i ++)
			{
				if(background_img)
					context_buffer.drawImage(background_img, i*tw,0,current_x,canvas_buffer.height,i*tw,0,current_x,canvas_buffer.height);		
				else
					context_buffer.fillRect(i * tw, 0, current_x, canvas_buffer.height);
			}
			context.drawImage(canvas_buffer, 0, 0);
			current_x += current_move;
		}
		function enterAnimationIsCompletion2(){
			if(current_x > 0)
			{
				return false;
			}
			else
			{
				context2 = null;
				canvas2 = null;
				return true;
			}
		}
		var x_count_3 = 10, y_count_3 = 10;
		var vx_3 = 0, vy_3 = 0;
		var max_x3 = 0, max_y3 = 0;
		var current_x_3 = 0, current_y_3 = 0;
		var canvas3, context3;
		
		function enterAnimationInit3(){
			canvas3 = document.createElement("canvas");
			canvas3.width = canvas_buffer.width; canvas3.height = canvas_buffer.height;
			context3 = canvas3.getContext("2d");
			context3.drawImage(canvas_buffer, 0, 0);
			
			max_x3 = canvas.width / x_count_3;
			max_y3 = canvas.height / y_count_3;
			current_x_3 = max_x3; current_y_3 = max_y3;
			vx_3 = max_x3 / 50;
			vy_3 = max_y3 / 50;
		}
		function enterAnimationDraw3(){
			context_buffer.fillStyle = animation_background_color;
			context_buffer.drawImage(canvas3, 0, 0);
			for(var i = 0; i < y_count_3; i ++)
			{
				for(var j = 0; j < x_count_3; j ++)
				{
					if(background_img)
						context_buffer.drawImage(
							background_img,
							j * max_x3, i * max_y3, current_x_3, current_y_3,
							j * max_x3, i * max_y3, current_x_3, current_y_3);
					else
						context_buffer.fillRect(j * max_x3, i * max_y3, current_x_3, current_y_3);
				}
			}
			context.drawImage(canvas_buffer, 0, 0);
			current_x_3 -= vx_3;
			current_y_3 -= vy_3;
		}
		function enterAnimationIsCompletion3(){
			if(current_x_3 <= 0 && current_y_3 <= 0)
				return true;
			return false;
		}
		
		
		function exitAnimationInit1(){
			var w = canvas_buffer.width / width_count;
			var h = canvas_buffer.height / height_count;
			//创建退出的离屏canvas
			exit_canvas  = document.createElement("canvas");
			exit_canvas.width = canvas.width; exit_canvas.height = canvas.height;
			exit_context = exit_canvas.getContext("2d");
			//向离屏canvavs上绘制图像数据
			//exit_context.fillStyle = "rgb(16, 16, 16)";
			//exit_context.fillRect(0, 0, exit_canvas.width, exit_canvas.height);
			exit_context.drawImage(canvas_buffer, 0, 0);
			
			for(var y = 0; y < height_count; y = y + 1)
			{
				exit_data[y] = new Array();
				for(var x = 0; x < width_count; x = x + 1)
				{
					exit_data[y][x] = {
						x:x * w,
						y:y * h,
						visible:true,
						vx:0,//-Math.random() * 2 + 1,
						vy:0,
						ax:0,
						ay:Math.random()*1 + 0.5,
						width:w,
						height:h,
						data:null
					};
					exit_data[y][x].data = exit_context.getImageData(x * w, y * h, w, h);
					//console.log("x:"+(x*w)+" y:"+(y*h)+" w:"+w+" h:"+h);
				}
			}
			canvas.style.background = "rgb(255, 255, 255)";
		}
		var exit_flag_1=  false;
		function exitAnimationDraw1(){
			var flag = false;
			context.clearRect(0, 0, canvas.width, canvas.height);
			context_buffer.clearRect(0, 0, canvas_buffer.width, canvas_buffer.height);
			
			for(var y = 0; y < height_count; y ++)
			{
				for(var x = 0; x < width_count; x ++)
				{
					if(exit_data[y][x].visible == true)	
					{
						context_buffer.putImageData(exit_data[y][x].data, exit_data[y][x].x, exit_data[y][x].y);
						
						exit_data[y][x].x += exit_data[y][x].vx; exit_data[y][x].y += exit_data[y][x].vy;
						exit_data[y][x].vx += exit_data[y][x].ax; exit_data[y][x].vy += exit_data[y][x].ay;
						
						if(exit_data[y][x].y > canvas_buffer.height)
						{
							exit_data[y][x].visible = false;
						}
						flag = true;
					}
				}
			}
			if(flag == false)
			{
				exit_flag_1 = true;					//动画可以退出了
				
			}
			//将缓冲的数据放到真正显示的canvas上
			context.drawImage(canvas_buffer, 0, 0);
			
		}
		function exitAnimationIsCompletion1(){
			if(exit_flag_1 == true)
			{
				//移除所有的对象
				while(exit_data.length > 0)
				{
					exit_data.pop();
				}
				//释放资源
				exit_context = null; exit_canvas = null;
			}
			return exit_flag_1;
		}
		
		var excount2 = 20;
		var e_current_x2 = 0;
		var e_move2 = 1;
		var e_tw2;
		function exitAnimationInit2(){
			e_current_x2 = 0; 
			e_tw2 = (canvas_buffer.width/excount2);
		}
		function exitAnimationDraw2(){
			var tw = Math.round(canvas_buffer.width/excount2);
			context_buffer.fillStyle = animation_background_color;
			for(var i = 0; i < excount2; i ++)
			{
				if(background_img)
					context_buffer.drawImage(background_img, i*tw,0,e_current_x2,canvas_buffer.height,i*tw,0,e_current_x2,canvas_buffer.height);		
				else
					context_buffer.fillRect(i*tw, 0, e_current_x2, canvas_buffer.height);
			}
			context.drawImage(canvas_buffer, 0, 0);
			e_current_x2 += e_move2;
		}
		function exitAnimationIsCompletion2(){
			if(e_current_x2 >= e_tw2)
				return true;
			else
				return false;
		}
		var exit_count_3 = 0;
		function exitAnimationInit3(){
			canvas3 = document.createElement("canvas");
			canvas3.width = canvas_buffer.width; canvas3.height = canvas_buffer.height;
			context3 = canvas3.getContext("2d");
			context3.drawImage(canvas_buffer, 0, 0);
			
			max_x3 = canvas.width / x_count_3;
			max_y3 = canvas.height / y_count_3;
			current_x_3 = 0; current_y_3 = 0;
			vx_3 = max_x3 / 50;
			vy_3 = max_y3 / 50;
			exit_count_3 = 0;
		}
		function exitAnimationDraw3(){
			context_buffer.fillStyle = animation_background_color;
			context_buffer.drawImage(canvas3, 0, 0);
			for(var i = 0; i < y_count_3; i ++)
			{
				for(var j = 0; j < x_count_3; j ++)
				{
					if(background_img)
						context_buffer.drawImage(
							background_img,
							j * max_x3, i * max_y3, current_x_3, current_y_3,
							j * max_x3, i * max_y3, current_x_3, current_y_3);
					else
						context_buffer.fillRect(j * max_x3, i * max_y3, current_x_3, current_y_3);
				}
			}
			context.drawImage(canvas_buffer, 0, 0);
			if(current_x_3 < max_x3 && current_y_3 < max_y3)
			{
				current_x_3 += vx_3;
				current_y_3 += vy_3;
			}
			else
			{
				exit_count_3 ++;
			}
		}
		function exitAnimationIsCompletion3(){
			if(current_x_3 >= max_x3 && current_y_3 >= max_y3 && exit_count_3 >= 30)
				return true;
			return false;
		}
		
		
		
		//场景进入动画(固定渲染格式)
		this.enterScene = function(enterCompletionFunc){
			enter_completion_call_func = enterCompletionFunc;
			this.renderBuffer();
			enterAnimationInit3();
			
			enterSceneAnimation();
			is_enter_animation = true;
		}
		function enterSceneAnimation(){
			//进入动画运行完毕，调用完成函数
			if(enterAnimationIsCompletion3() == true)		//动画结束
			{
				is_enter_animation = false;
				enter_completion_call_func();				//调用完成函数
			}
			else
			{
				
				enterAnimationDraw3()
				if(is_tradition_animation == true)
					requestAnimationFrame(enterSceneAnimation);
			}
		}
		//场景退出动画(固定渲染格式)
		this.exitScene = function(exitCompletionFunc){
			exit_completion_call_func = exitCompletionFunc;
			exitAnimationInit3();
			
			exitSceneAnimation();								//调用退出动画函数
			is_exit_animation = true;
		}
		function exitSceneAnimation(){
			if(exitAnimationIsCompletion3() == true)//动画结束
			{
				is_exit_animation = false;
				//调用完成函数
				exit_completion_call_func();
			}
			else
			{
				exitAnimationDraw3();
				if(is_tradition_animation == true)
					requestAnimationFrame(exitSceneAnimation);
			}
		}
	}
	
	//this.CreateCharacter = function(){
	//	return new this.Character();
	//}
	
	
	
}

Fgame.prototype.CreateCharacter = function(xx, yy){
	var c = new this.Character();
	c.setPosition(xx, yy);
	return c;
}

Fgame.prototype.CreateCharacter = function(){
	return new this.Character();
}
var FGAMES = new Fgame();
//实现继承
//FGAMES.Npc.prototype = new FGAMES.Character();				//继承prototype方法
//FGAMES.Npc.prototype.constructor = FGAMES.Npc;