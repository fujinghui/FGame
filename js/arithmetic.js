			function FStack(){
				this.stack = new Array();
				
				this.LARGEN_MODE = 1;
				this.LESS_MODE = 2;
				this.fsort_mode = 0;
				this.begin_index = -1;		//排序的起始和结束索引
				
				this.setSortMode = function(mode){
					this.fsort_mode = mode;
				}
				this.begin = function(){
					this.begin_index = this.stack.length;
				}
				this.end = function(){
					this.begin_index = -1;
				}
				this.push = function(obj){
					if(this.begin_index == -1)
					{
						this.stack[this.stack.length] = obj;
					}
					else
					{
					//	console.log(this.fsort_mode);
						if(this.fsort_mode == this.LARGEN_MODE)
						{
						//	console.log("dasf");
							var k = obj.v;
							var i = this.stack.length;
							var ei = i;
							while(i > this.begin_index && k < this.stack[i - 1].v)
							{
								this.stack[i] = this.stack[i-1];
								i = i - 1;
							}
							this.stack[i] = obj;
						}
						else if(this.fsort_mode == this.LESS_MODE)
						{
							var k = obj.v;
							var i = this.stack.length;
							var ei = i;
							while(i > this.begin_index && k > this.stack[i - 1].v)
							{
								this.stack[i] = this.stack[i - 1];
								i = i - 1;
							}
							this.stack[i] = obj;
						}
					}
				}
				this.pop = function(){
					if(this.stack.length == 0)
						return null;
					var r = this.stack[this.stack.length - 1];
					
					this.stack.pop();
					return r;
				}
				this.empty = function(){
					if(this.stack.length == 0)
						return true;
					return false;
				}
				this.exists = function(obj){
					for(var i = 0; i < this.stack.length; i ++)
					{
						if(this.stack[i] == obj)
							return true;
					}
					return false;
				}
			}


			function AXin(sp, ep, map){
				var path = new Array();
				var stack = new FStack();			//开启列表
				var close_list = new FStack();		//关闭列表
				var fs = {x:sp.x, y:sp.y, h:Math.abs(ep.x-sp.x)+Math.abs(ep.y-sp.y), g:0};
				fs.f = fs.h + fs.g;
				fs.v = fs.h + fs.g;
				//e=0表示该方块加入到了关闭列表中
				//map[sp.y][sp.x].e = 0;		//设置地图起始坐标加入到关闭列表中
				var x = sp.x, y = sp.y;
				//添加第一个点
				path[0] = fs;
				while(1)
				{
					x = fs.x; y = fs.y;
					//console.log("x:"+x+" y:"+y);
					var flag = 0;
					stack.setSortMode(stack.LESS_MODE);
					stack.begin();
					//left
					//这条路没有被加入到关闭列表中，并且这条路可以走的通
					if(x - 1 >= 0 && close_list.exists(map[y][x-1]) == false && map[y][x - 1].f == 0)
					{
						flag += 1;
						var t = {x:x-1, y:y, h:Math.abs(ep.x-x+1)+Math.abs(ep.y-y), g:fs.g+1};
						t.f = t.g + t.h;
						t.v = t.f;
						stack.push(t);
					}
					if(x + 1 < map[0].length && close_list.exists(map[y][x+1]) == false && map[y][x +1].f == 0)
					{
						flag += 1;
						var t = {x:x+1, y:y, h:Math.abs(ep.x-x-1)+Math.abs(ep.y-y), g:fs.g+1};
						t.f = t.g + t.h;
						t.v = t.f;
						stack.push(t);
					}
					if(y - 1 >= 0 && close_list.exists(map[y-1][x]) == false &&map[y - 1][x].f == 0)
					{
						flag += 1;
						var t = {x:x, y:y-1, h:Math.abs(ep.x-x)+Math.abs(ep.y-y+1), g:fs.g+1};
						t.f = t.g + t.h;
						t.v = t.f;
						stack.push(t);
					}
					if(y + 1 < map.length && close_list.exists(map[y+1][x]) == false && map[y + 1][x].f == 0)
					{
						flag += 1;
						var t = {x:x, y:y+1, h:Math.abs(ep.x-x)+Math.abs(ep.y-y-1), g:fs.g+1};
						t.f = t.g + t.h;
						t.v = t.f;
						stack.push(t);
					}
					stack.end();
					//将当前方格加入到路径中
					if(flag == 0)
					{
						path.pop();
						fs = path[path.length - 1];
						if(fs == null)
						{
							var tp = stack.pop();
							if(tp == null)
							{
								return null;
								break;
							}
							fs = tp;
						}
					}
					else
					{
						//正常情况
						var tp = stack.pop();
						if(tp == null)
						{
							return null;
							break;
						}
						fs = tp;
						path[path.length] = tp;
						//console.log("x:"+tp.x+" y:"+tp.y);
					}
					//加入到关闭列表中
					close_list.push(map[tp.y][tp.x]);
					
				//	map[tp.y][tp.x].f = 2;			//标记当前路径为路过
				//	map[tp.y][tp.x].e = 0;			//标记当前方格
				//	map[tp.y][tp.x].g = fs.g;
				//	map[tp.y][tp.x].h = fs.h;
					
					if(tp.x == ep.x && tp.y == ep.y)
					{
						while((tp=stack.pop()) != null);
						//{
						//	map[tp.y][tp.x].g = tp.g;
						//	map[tp.y][tp.x].h = tp.h;
						//}
						break;
					}
				}
				return path;
			}