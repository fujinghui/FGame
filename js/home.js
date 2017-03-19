	function ProgressBarImage(){
		var progress_data = new Array();
		var start_x = 0, start_y = 0;
		var width = 0, height = 0;
		var pos = 0, progress = 0;
		var partices = new Array();
		var is_load = false;
		var is_produce_partices = true;
		this.init = function(context2, path, x, y){
			var img = new Image();
			var img_data;
			
			img.src = path;
			
			img.onload = function(){
				width = this.width;
				height = this.height;
				
				
				var canvas = document.createElement("canvas");
				canvas.width = 800; canvas.height = 600;
				var context = canvas.getContext("2d");
				
				context.drawImage(img, 0, 0);
				var temp = context.getImageData(0, 0, width, height);
				for(var i = 0; i < width; i ++)
				{
					progress_data[i] = new Array();
					for(var j = 0; j < height; j ++)
					{
						var index = (i + j * width) * 4;
						progress_data[i][j] = "rgba("+temp.data[index]+","+temp.data[index+1]+","+temp.data[index+2]+","+temp.data[index+3]+")";
					//	console.log(progress_data[i][j]);
					//	console.log("length:"+temp.data.length);
						//console.log(temp.data[0]+" "+temp.data[1]+" "+temp.data[2]+" "+temp.data[3] + temp.data[4]);
					//	progress_data[i][j] = "rgb("+temp.data[0]+","+temp.data[1]+","+temp.data[2]+")";
						//progress_data[i][j] = "rgb(255, 255, 255)";
					}
				}
				start_x = x;
				start_y = y;
				is_load = true;
			}
		}
		this.setProgress = function(pro){
			if(pro > 100)
				return ;
			progress = pro;
			pos = Math.round(progress * width / 100);
		}
		this.getProgress = function(){
			return progress;
		}
		this.draw = function(context){
			//绘制边框
			context.lineWidth = 0.5;
			context.strokeStyle = "rgb(200, 200, 200)";
			context.strokeRect(start_x - 1, start_y - 1, width + 2, height + 2);
			if(is_load)
			for(var i = 0; i < pos; i ++)
			{
				for(var j = 0; j < height; j ++)
				{
					//context.putImageData(progress_data[i][j], start_x + i, start_y + j);
					context.fillStyle = progress_data[i][j];
					context.fillRect(start_x + i, start_y + j, 1, 1);
				}
			}
			
			//绘制弹出的粒子
			if(is_load)
			for(var i = 0; i < partices.length; i ++)
			{
				//context.putImageData(partices[i].image_data, partices[i].x, partices[i].y);
				context.fillStyle = partices[i].image_data;
				context.fillRect(partices[i].x, partices[i].y, 2, 2);
				partices[i].x += partices[i].vx;
				partices[i].y += partices[i].vy;
				partices[i].vx += partices[i].ax;
				partices[i].vy += partices[i].ay;
			}
			if(pos > 0 && is_load && is_produce_partices)
			for(var i = 0; i < height; i ++)
			{
				partices.push({
						x:start_x + pos,
						y:start_y + i,
						vx:-Math.random() * 2 - 1,
						vy:-6,
						ax:0,
						ay:0.4,
						image_data:progress_data[pos - 1][i]
				});
			}
			if(is_load)
			for(i = 0; i < partices.length; i ++)
			{
				if(partices[i].y > start_y + height * 2)
				{
					partices[i] = partices[partices.length - 1];
					partices.pop();
				}
			}
			context.font = "15px Arial";
			context.fillStyle = "rgb(180, 230, 180)";
			context.fillText(progress + "%", start_x + width / 2, start_y + height * 2);
			
		}
		//设置进度条是否还产生粒子的函数
		this.setParticesProduces = function(flag){
			is_produce_partices = flag;
		}
		this.getParticesCount = function(){
			return partices.length;
		}
		this.frame = function(){
			
		}
		this.getType = function(){
			return 'ProgressBarImage';
		}
	}
	
	function ProgressBar(){
		var start_x = 0, start_y = 0;
		var width = 0, height = 0;
		var progress = 0, position = 0;
		var progress_data = new Array();
		var partices = new Array();
		
		var start_color_r = 205, start_color_g = 175, start_color_b = 60;
		var end_color_r = 255, end_color_g = 255, end_color_b = 255;
		var progress_r = 0, progress_g = 0, progress_b = 255;
		
		var is_produce_partices = true;			//默认产生粒子
		
		this.init = function(x, y, w, h){
			start_x = x; start_y = y;
			width = w;	height = h;
			for(var i = 0; i < w; i ++)
			{
				progress_data[i] = new Array();
				for(var j = 0; j < h; j ++)
				{
					//65 185 155
					progress_data[i][j] = "rgb("+
					(start_color_r-j*4 + Math.round(((255-start_color_r)*i)/width))+", "+
					(start_color_g-j*4 + Math.round(((255-start_color_g)*i)/width))+", "+
					(start_color_b+Math.round(((255-start_color_b)*i)/width))+")";
				}
			}
		}
		
		this.setProgress = function(pro){
			if(pro > 100)
				return;
			progress = pro;
			pos = Math.round(progress * width / 100);
		}
		
		this.getProgress = function(){
			return progress;
		}
		this.getParticesCount = function(){
			return partices.length;
		}
		
		this.draw = function(context){
			context.lineWidth = 0.5;
			context.strokeRect(start_x - 1, start_y - 1, width + 1, height + 2);
			for(var i = 0; i < pos; i ++)
			{
				for(var j = 0; j < height; j ++)
				{
					context.fillStyle = progress_data[i][j];
					context.fillRect(start_x + i, start_y + j, 1, 1);
				}
			}
			//绘制弹出的粒子
			for(var i = 0; i < partices.length; i ++)
			{
				context.fillStyle = partices[i].color;
				context.fillRect(partices[i].x, partices[i].y, 2, 1);
				partices[i].x += partices[i].vx;
				partices[i].y += partices[i].vy;
				partices[i].vx += partices[i].ax;
				partices[i].vy += partices[i].ay;
			}
			if(pos > 0 && is_produce_partices)
			for(var i = 0; i < height; i ++)
			{
				partices.push({
						x:start_x + pos,
						y:start_y + i,
						vx:-Math.random() * 2 - 1,
						vy:-6,
						ax:0,
						ay:0.4,
						color:progress_data[pos - 1][i]
				});
			}
			for(i = 0; i < partices.length; i ++)
			{
				if(partices[i].y > start_y + height * 2)
				{
					partices[i] = partices[partices.length - 1];
					partices.pop();
				}
			}
			
			context.font = "20px Arial";
			//context.fillStyle = "#ffffff";
			//context.fillText("")
			context.fillText(progress + "%", start_x + width / 2, start_y + 16);
		}
		this.setParticesProduces = function(flag){
			is_produce_partices = flag;
		}
		this.frame = function(){
			
		}
		this.getType = function(){
			return 'ProgressBar';
		}
	}
	
	
	
	function Load(){
		var load_current_count = 0, load_max_count = 0;
		this.load = function(res, callfunc){
			load_current_count = 0;
			load_max_count = res.length;
			for(var i = 0; i < res.length; i ++)
			{
				if(res[i].type == FILE_TYPE_IMAGE)
				{
					var img = new Image();
					img.src = res[i].path;
					img.index = i;
					img.onload = function(){
						load_current_count ++;
						
						res[this.index].object = this;
						
					//	console.log(load_current_count);
						
						//所有资源全部加载完毕，调用回调函数
						if(load_current_count == load_max_count)
							callfunc();
					}
				}
				else if(res[i].type == FILE_TYPE_JS)
				{
					var scr = document.createElement("script");
					scr.type = "text/javascript";
					scr.src = res[i].path;
					scr.index = i;
					scr.onload = function(){
						load_current_count ++;
						res[this.index].object = this;
						if(load_current_count == load_max_count)
							callfunc();
					}
					document.head.appendChild(scr);			//添加这一行后才会浏览器才会去加载js文件
				}
				else if(res[i].type == FILE_TYPE_MUSIC)
				{
					var music = new Audio(res[i].path);
					music.loop = false;
					music.index = i;
					music.onloadedmetadata = function(){
						load_current_count ++;
						
						
						res[this.index].object = this;			//加载音乐文件应该获取他的对象
						if(load_current_count == load_max_count)
						{
							callfunc();
						}
					}
				}
				else if(res[i].type == FILE_TYPE_SWF)
				{
					var swffs = document.createElement("object");
					swffs.type = "application/x-shockwave-flash";
					swffs.data = res[i].path;
					swffs.index = i;
					swffs.width = res[i].width;
					swffs.height = res[i].height;
				//	swffs.width = 100;
				//	swffs.height = 100;
				/*	swffs.onloadedmetadata = function(){
						load_current_count ++;
					//	console.log(load_current_count);
						res[this.index].object = this;
						console.log("--");
						if(load_current_count == load_max_count)
						{
							callfunc();
						}
					}
					*/
					document.body.appendChild(swffs);
					res[i].object=  swffs;
				}
			}
		}
		//获取已加载资源的数量
		this.getLoadCount = function(){
			return load_current_count;
		}
		//获取已加载资源的进度（0-100)
		this.getLoadProgress = function(){
			return Math.round(load_current_count * 100 / load_max_count)
		}
		this.getType = function(){
			return 'ProgressBarLoad';
		}
	}

