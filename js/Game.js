var scene_first_pass;
var map_first_pass;
var lead_first_pass;

var place_name = null;

var rect;						//对话框

var map_grid_width = 65, map_grid_height = 55;
var knap;						//背包对象
function init_first_pass(){
	//设置主角的属性
	lead_first_pass = new LeadCharacter();		//继承自FGAMES.Character();
	lead_first_pass.is_lead = true;				//标记是主角
	lead_first_pass.left = 0;
	lead_first_pass.right = 0;
	lead_first_pass.up = 0;
	lead_first_pass.down = 0;
	
	lead_first_pass.init(['img/leading.png', 'img/lead_qiang.png']);
	lead_first_pass.addFrame({i:0, x:0, y:0, width:141, height:250});
	lead_first_pass.addFrame({i:0, x:142, y:0, width:141, height:250});
	lead_first_pass.addFrame({i:0, x:283, y:0, width:141, height:250});
	lead_first_pass.addFrame({i:0, x:425, y:0, width:141, height:250});
	lead_first_pass.addFrame({i:0, x:567, y:0, width:141, height:250});
	lead_first_pass.addFrame({i:0, x:709, y:0, width:141, height:250});
	
	lead_first_pass.addFrame({i:0, x:0, y:255, width:141, height:250});
	lead_first_pass.addFrame({i:0, x:142, y:255, width:141, height:250});
	lead_first_pass.addFrame({i:0, x:283, y:255, width:141, height:250});
	lead_first_pass.addFrame({i:0, x:425, y:255, width:141, height:250});
	lead_first_pass.addFrame({i:0, x:567, y:255, width:141, height:250});
	lead_first_pass.addFrame({i:0, x:709, y:255, width:141, height:250});
	//拿枪的动作
	lead_first_pass.addFrame({i:1, x:20, y:0, width:130, height:244});
	lead_first_pass.addFrame({i:1, x:150*1, y:0, width:150, height:244});
	lead_first_pass.addFrame({i:1, x:150*2, y:0, width:150, height:244});
	lead_first_pass.addFrame({i:1, x:150*3+10, y:0, width:140, height:244});
	
	lead_first_pass.setShowFrameRange(1, 1);			//默认停止动作
	lead_first_pass.setWH(40, 80);
	lead_first_pass.setUpdateTime(200);
	lead_first_pass.setPosition(0 * map.getGridWidth(), 9 * map.getGridHeight());
	lead_first_pass.center_x = 0; lead_first_pass.center_y = 80;
	lead_first_pass.addKeyAction({key:65, frame:{
		up:{start:12, end:12},
		left:{start:13, end:13},
		down:{start:14, end:14},
		right:{start:15, end:15}
	}, update_time:400});
	//背包对象
	knap = new Knapsack();
	knap.visible = false;
	map.show_table_line = false;
	scene_first_pass = new FGAMES.Scene();
	/*
	 * 默认为传统的动画模式，此处设置为新的动画模式(之后的游戏场景切换均采用新的(2.0?)动画模式)，
	 * 其实也就是为了兼容之前自己写的代码(太恶心啦，你知道吗，为了兼容，代码我自己都快看不懂了。)
	 */
	scene_first_pass.setTraditionAnimation(false);
	//scene_first_pass.setAnimationBackgroundColor(40, 60, 70);
	scene_first_pass.setAnimationBackgroundColor(255, 255, 255);
	scene_first_pass.setCanvas(canvas);
	scene_first_pass.setBackgroundColor(255, 255, 255);
	scene_first_pass.setBackgroundImage('img/background_image.png');
	//往场景里添加显示物体
	scene_first_pass.add(map);
	scene_first_pass.add(knap);
	//scene_first_pass.addKeyDown(FirstKeyDown);			//添加键盘按下处理
	//scene_first_pass.addKeyUp(FirstKeyUp);				//添加键盘松开处理
	scene_first_pass.addMouseDown(FirstMouseDown);
//	scene_first_pass.renderBuffer();						//现将图像渲染到缓冲区中
//	scene_first_pass.enterScene(first_pass_draw);
	for(var i = 0; i < menu_button.length; i ++)
	{
		scene_first_pass.add(menu_button[i]);
	}
	scene_first_pass.add(menu);
	scene_first_pass.add(task);
	//scene_first_pass.removeObject(menu);
	//设置菜单不显示
	menu.visible = false;
	

	load_from_server();
	first_pass_draw();
}
function npc_ai_init(){
	lead_first_pass.setAIShowFrame({
		left:{start:3, end:5},
		right:{start:0, end:2},
		up:{start:9, end:11},
		down:{start:6, end:8}});
	npcs_main[2].setAIShowFrame({
		left:{start:0, end:3},
		right:{start:0, end:3},
		up:{start:0, end:3},
		down:{start:0, end:3}
	});
	lead_first_pass.ai_speed = 2;
	npcs_main[0].ai_speed = 1;
	npcs_main[0].setAIPath([
		{x:2,y:8,grid_width:map_grid_width,grid_height:map_grid_height},
		{x:3,y:8},{x:4,y:8},{x:4,y:7}
		]);
	npcs_main[0].ai_loop_reverse = true;
	npcs_main[0].ai_loop = true;
	npcs_main[0].setAIEnable(true);		//开启AI
	
	npc_car.setAIPath(
			[{x:0,y:14,grid_width:map_grid_width,grid_height:map_grid_height},
			{x:1,y:14},{x:2,y:14},{x:3,y:14},{x:4,y:14},{x:5,y:14},
			{x:6,y:14},{x:7,y:14},{x:8,y:14},{x:9,y:14}
			]);
	npc_car.ai_loop = false;
	npc_car.ai_speed = 2;
	npc_car.setAICallFunc(function(){
	});
}
function npc_dialog_init(){
	//设置NPC文字对话内容
	//主场景里的npc对话内容初始化
	npcs_main[0].dialog_text.setWindow({w:canvas.width, h:canvas.height});
	npcs_main[0].dialog_text.setTextAfter([{name:"肉贩子", context:"没话了"}, {name:"主角", context:"我也没话了"}]);
	npcs_main[0].dialog_text.visible = false;
	
	npcs_main[0].dialog_text.setText(FRes.String.dialog.dialog_7);
	npcs_main[0].dialog_text.setTextAfter([
		{name:"", context:"................."}]);
	
	npcs_main[1].dialog_text.setWindow({w:canvas.width, h:canvas.height});
	//npc2.dialog_text.setCharacterText("主角");
	npcs_main[1].dialog_text.setText([{name:"主角", context:"我是谁？"}, {name:"幽灵", context:"你猜你 是谁？ "}]);
	npcs_main[1].dialog_text.visible = false;
	//初始化
	//设置主场景里的“老乡”的对话内容
	npcs_main[3].dialog_text.setWindow({w:canvas.width, h:canvas.height});
	if(game_progress == 3)			//进度3
	{
		npcs_main[3].dialog_text.setText(FRes.String.dialog2.dialog_6);
	}
	else if(game_progress > 3)
	{
		npcs_main[3].dialog_text.setText(FRes.String.dialog2.dialog_7);
	}
	else
	{
		//不显示对话内容
		npcs_main[3].dialog_text.setText(null);
	}
	
	//设置屠宰场里的npc对话内容
	npcs_slaughter[0].dialog_text.setWindow({w:canvas.width, h:canvas.height});
	npcs_slaughter[0].dialog_text.setText(FRes.String.dialog.dialog_12);
	//npcs_slaughter[0].dialog_text.setCallFunc(function(){		
		//flash_game_car.style.display = "";
		//game_pause = false;
		//更改当前屠夫npc的对话内容
		npcs_slaughter[0].dialog_text.setText(FRes.String.dialog.dialog_9);
		npcs_slaughter[0].dialog_text.setCallFunc(function(){});
		
		npcs_slaughter[12].dialog_text.setWindow({w:canvas.width, h:canvas.height});

		if(game_progress == 4)
		{
			npcs_slaughter[12].dialog_text.setText(FRes.String.dialog2.dialog_8);
			npcs_slaughter[12].dialog_text.setCallFunc(function(){
				npcs_slaughter[12].dialog_text.setText(FRes.String.dialog2.dialog_9);
				npcs_slaughter[12].dialog_text.setCallFunc(function(){});
				game_progress = 5;
			});
		}
		else if(game_progress > 4)
		{
			npcs_slaughter[12].dialog_text.setText(FRes.String.dialog2.dialog_9);
			npcs_slaughter[12].dialog_text.setCallFunc(function(){});
		}
		else
		{
			npcs_slaughter[12].dialog_text.setText(null);
		}
	//});
	
	npcs_slaughter[0].dialog_text.visible = false;
	//设置动物保护协会对话内容
	npcs_animal_protect[0].dialog_text.setWindow({w:canvas.width, h:canvas.height});
	if(game_progress == 0){				//进度0，玩家刚刚进入游戏
		npcs_animal_protect[0].dialog_text.setText(FRes.String.dialog2.dialog_1);
		npcs_animal_protect[0].dialog_text.setCallFunc(function(){
			flash_game_find.style.display = "";
			game_pause = true;
		});
	}
	else if(game_progress == 1)			//进度1，玩家没有完成测验
	{
		npcs_animal_protect[0].dialog_text.setText(FRes.String.dialog2.dialog_2);
		npcs_animal_protect[0].dialog_text.setCallFunc(function(){
			flash_game_find.style.display = "";
			game_pause = true;
		});
	}
	else if(game_progress >= 2)			//进度2，玩家已经完成了测验
	{
		npcs_animal_protect[0].dialog_text.setText(FRes.String.dialog2.dialog_5);
		npcs_animal_protect[0].dialog_text.setCallFunc(function(){
			
		});
	}
	//犯罪分子的对话内容
	npcs_crime[0].dialog_text.setWindow({w:canvas.width, h:canvas.height});
	npcs_crime[0].dialog_text.setText([
		{name:FRes.String.staff, context:" "}
	]);
	npcs_crime[0].dialog_text.setCallFunc(function(){
		flash_game_beng.style.display = "";
		game_pause = false;
	});
	
	//系统对话框
//	system_dialog = new DialogText(null);
//	system_dialog.setWindow({w:canvas.width, h:canvas.height});
//	system_dialog.setText(FRes.String.dialog.dialog_1);
	//默认加载一个系统对话框
	scene_first_pass.add(system_dialog);
}
//进入动画
function home_scene_enter(){
	console.log("start---------------------ends");
	map.clear();
	map.clearTransmitPoint();
	map.setMapData(map_data_enter);
	map.add(lead_first_pass);			//添加主角
	map.add(npcs_main[2]);				//添加长官npc
	map.add(system_dialog);
	lead_first_pass.setAIPath([
		{x:0,y:7,grid_width:map_grid_width,grid_height:map_grid_height},
		{x:1,y:7},{x:2,y:7},{x:3,y:7},{x:4,y:7},{x:5,y:7},{x:6,y:7},{x:7,y:7},{x:7,y:6}]);
	lead_first_pass.setAIEnable(true);
	lead_first_pass.ai_speed = 2;
	lead_first_pass.ai_loop = false;
	lead_first_pass.setAICallFunc(function(){
		system_dialog.visible = true;
		system_dialog.setCallFunc(function(){
			system_dialog.visible = false;
			scene_first_pass.exitScene(function(){
				lead_first_pass.setPosition(0, 550);
				home_scene_map();
			});
		});
	});
	npcs_main[2].setAIPath([
		{x:10,y:0,grid_width:map_grid_width,grid_height:map_grid_height},
		{x:10,y:1},{x:10,y:2},{x:10,y:3},{x:9,y:3},{x:8,y:3},{x:7,y:3},{x:7,y:4},{x:7,y:5}]);
	npcs_main[2].ai_speed = 2;
	npcs_main[2].ai_loop = false;
	npcs_main[2].setAIEnable(true);
		npcs_main[2].setAICallFunc(function(){
	});	
	scene_first_pass.enterScene(function(){});
}

//主要场景的地图资源
function home_scene_map(){
	current_scene  ="home_scene_map()";
	place_name = "拉萨市";
	
	map.clear();
	map.clearTransmitPoint();
	map.setMapData(map_data_home1);
	map.add(npcs_main[3]);
	//添加树木
	for(var i = 0; i < trees.length; i += 1)
		map.add(trees[i]);
	//添加房子
	for(var i = 0; i < houses.length; i += 1)
		map.add(houses[i]);
	//设置地图的属性
	//添加主角
	map.add(lead_first_pass);
	//添加传送点
	map.addTransmitPoint({x:400, y:390, w:100, h:50, show:true});		
	map.addTransmitPoint({x:1048, y:498, w:80, h:30, show:true});		//添加商铺传送点
	//map.addTransmitPoint({x:1270, y:495, w:20, h:50, show:true});
	//map.addTransmitPoint({x:900, y:716, w:100, h:20, show:true});
	map.addTransmitPoint({x:1170, y:20, w:65, h:30, show:true});		//安多县
	//设置传送点的回调函数
	map.setTransmitPointCallFunc(function(i){
		if(i == 0)					//中国珍稀动物保护协会
		{
			scene_first_pass.exitScene(function(){
				animal_protect_house_map();
			});
		}
		else if(i == 1)				//屠宰场										//进入屠宰场的房子里
		{
			//退出场景动画
			scene_first_pass.exitScene(function(){
				map.x = 100;
				map.y = 220;
				lead_first_pass.setPosition(370, 820);
				slaughter_house_map();
			});
		}
		else if(i == 22)						//可可西里
		{
			scene_first_pass.exitScene(function(){
				map.x = 0;
				map.y = 0;
				lead_first_pass.setPosition(0, 200);
				//field_kekexili_map();
				real_time_game_map();		//暂时是跳转到最后一个游戏关卡
			});
		}
		else if(i == 33)						//犯罪分子房间
		{
			scene_first_pass.exitScene(function(){
				map.x = 0;
				map.y = 0;
				lead_first_pass.setPosition(0, 200);
				crime_house_map();
			});
		}
		else if(i == 2)						//安多县的路上
		{
			scene_first_pass.exitScene(function(){
				map.x = 0;
				map.y = 300;
				lead_first_pass.setPosition(800, 1000);
				anduo_road_map();
			});
		}
	});
	map.setWidth(65);
	map.setHeight(55);
	if(game_progress == 12)			//游戏通关
	{
		
	}
	scene_first_pass.enterScene(function(){
		
	});
}
//中国野生动物保护协会的房内地图资源
function animal_protect_house_map(){
	current_scene = "animal_protect_house_map()";
	place_name = "珍稀动物保护协会";
	lead_first_pass.setPosition(0, 350);
	map.clear();
	map.clearTransmitPoint();
	map.setMapData(map_data_animal_protect_house);
	map.add(lead_first_pass);
	map.x = 0;
	//添加传送点
	map.addTransmitPoint({x:0, y:280, w:30, h:80, show:true});
//	map.addTransmitPoint({x:700, y:150, w:30, h:100, show:true});
	map.setTransmitPointCallFunc(function(i){
		if(i == 0)
		{
			scene_first_pass.exitScene(function(){
				lead_first_pass.setPosition(460, 400);
				if(game_progress == 2)		//只有当玩家完成了此次的任务之后才会出现一次
				{
					system_dialog.setText(FRes.String.dialog_system.dialog_1);
					system_dialog.visible = true;
					game_progress = 3;		//到进度3
					music_hint.play();
				}
				home_scene_map();
			});
		}
		else if(i == 1)
		{
		//	system_dialog.visible = false;
		}
	});
	//添加npc
	for(var i = 0; i < npcs_animal_protect.length; i ++)
	{
		map.add(npcs_animal_protect[i]);
	}
	map.setWidth(map_grid_width);
	map.setHeight(map_grid_height);
	
	for(var i = 0; i < wall_animal_protect.length; i ++)
	{
			map.add(wall_animal_protect[i]);
	}
	map.removeObject(wall_animal_protect[1]);
	map.removeObject(wall_animal_protect[2]);
	wall_animal_protect[0].setRepeatCount(Math.round(map_data_animal_protect_house[0].length * map_grid_width / wall_animal_protect[0].getWidth() + 0.5));
	wall_animal_protect[5].setRepeatCount(wall_animal_protect[0].getRepeatCount());
	wall_animal_protect[5].setPosition(0, map_data_animal_protect_house.length * map_grid_width-wall_animal_protect[5].getHeight()+30);


	wall_animal_protect[6].setPosition(0, map_data_animal_protect_house.length * map_grid_height);
	wall_animal_protect[7].setPosition(map_data_animal_protect_house[0].length * map_grid_width-wall_animal_protect[7].getWidth(), map_data_animal_protect_house.length * map_grid_height);
	//设置右边的墙的位置
	wall_animal_protect[3].setPosition(map_data_animal_protect_house[0].length * map_grid_width - wall_animal_protect[3].getWidth() * wall_animal_protect[3].getRepeatCount(), 420);	
	wall_animal_protect[4].setPosition(wall_animal_protect[3].x - wall_animal_protect[4].getWidth(), 420);
//	flash_game_find.style.display = "";
//	flash_game_find.style.left = "0px";
//	flash_game_find.style.top = canvas_y + "px";
//	flash_game_find.width = canvas.width;
//	flash_game_find.height =  canvas.height;
	//flash_game_find.stop();
	scene_first_pass.enterScene(function(){});
}


function slaughter_house_map(){
	current_scene = "slaughter_house_map()";
	place_name = "肉贩市场";
	map.clear();
	map.clearTransmitPoint();
	map.setMapData(map_data_house_slaughter);
	map.add(lead_first_pass);			//将主角添加进来
	//scene_first_pass.add(system_dialog);
	//system_dialog.visible = true;
	//system_dialog.setCallFunc(function(){
		//alert("对话完毕！");
	//});
	//添加桌子
	for(var i = 0; i < desks.length; i ++)
	{
		map.add(desks[i]);
	}
	//添加栅栏
	for(var i = 0; i < walls_slaughter.length; i ++)
	{
		map.add(walls_slaughter[i]);
	}
	walls_slaughter[0].setPosition(0, map_data_house_slaughter.length * map.getGridHeight());
	walls_slaughter[0].setRepeatCount(Math.round(map.getGridWidth()*map_data_house_slaughter[0].length/walls_slaughter[0].getWidth() + 0.5));
	//设置墙壁填充整个地图宽度
	walls_slaughter[2].setRepeatCount(Math.round(map.getGridWidth()*map_data_house_slaughter[0].length/walls_slaughter[0].getWidth()+0.5));
	//设置下方墙壁的位置
	walls_slaughter[3].setPosition(0, map_data_house_slaughter.length * map.getGridHeight());
	walls_slaughter[3].setRepeatCount(Math.round(map.getGridWidth() * map_data_house_slaughter[3].length/walls_slaughter[3].getWidth() + 0.5));
	//设置左边的墙壁的坐标
	walls_slaughter[6].setPosition(map_data_house_slaughter[0].length * map.getGridWidth()-walls_slaughter[6].getRepeatCount()*walls_slaughter[6].getWidth(), 550);
	walls_slaughter[7].setPosition(map_data_house_slaughter[0].length * map.getGridWidth()-walls_slaughter[6].getWidth()*(walls_slaughter[6].getRepeatCount()+1), 550);
	
	for(var i = 0; i < npcs_slaughter.length; i ++)
	{
		map.add(npcs_slaughter[i]);
	}
	npcs_slaughter[0].setPosition(750, 260);
	map.addTransmitPoint({x:350, y:800, w:100, h:30, show:true});
	map.setTransmitPointCallFunc(function(i){
		map.x = 250;
		map.y = 0;
		lead_first_pass.setPosition(1050, 510);
		scene_first_pass.exitScene(function(){
			home_scene_map();
		});
	});
	
	scene_first_pass.enterScene(function(){});
}


//犯罪分子房间
function crime_house_map(){
	current_scene = "crime_house_map()";
	place_name = null;
	map.clear();
	map.clearTransmitPoint();
	map.setMapData(map_data_crime_house);
	//添加物体
	map.add(lead_first_pass);
	for(var i = 0; i < npcs_crime.length; i ++)
	{
		map.add(npcs_crime[i]);
	}
	map.addTransmitPoint({x:0,y:200,w:50,h:50,show:true});
	map.setTransmitPointCallFunc(function(i){
		lead_first_pass.setPosition(900, 726);
		scene_first_pass.exitScene(function(){
			map.x = 250;
			map.y = 150;
			home_scene_map();
		});
	});
	scene_first_pass.enterScene(function(){});
}
function anduo_road_map(){					//前往安多县的地图
	current_scene = "anduo_road_map()";
	//map.y = 600;
	//lead_first_pass.setPosition(0, 1000);
	place_name = "高速公路";
	map.clear();
	map.clearTransmitPoint();
	map.setMapData(map_data_anduo_road);
	//将主角添加进来
	map.add(lead_first_pass);
	for(var i = 0; i < trees_anduo_road.length; i ++)
	{
		map.add(trees_anduo_road[i]);
	}
	
	if(game_progress == 5)					//这个时候主人公刚得到线索要前往安多县
	{
		npc_car.setShowFrameRange(0, 1);
		npc_car.setAIEnable(true);
		map.add(npc_car);
		system_dialog.setWindow({w:canvas.width, h:canvas.height});
		system_dialog.setText(FRes.String.dialog2.dialog_10);
		system_dialog.visible = true;
		system_dialog.setCallFunc(function(){
			flash_game_car.style.display = "";
			game_pause = true;
		});
	}
	
	map.addTransmitPoint({x:800,y:40,w:100,h:30,show:true});
	map.addTransmitPoint({x:800,y:905,w:100,h:30,show:true});
	map.setTransmitPointCallFunc(function(i){
		if(i == 0){				//到达安多县
			scene_first_pass.exitScene(function(){
				map.x = 200;
				map.y = 0;
				lead_first_pass.setPosition(1120, 600);
				anduo_map();
			});
		}
		else if(i == 1)			//到达拉萨
		{
			scene_first_pass.exitScene(function(){
				map.x = 250;
				map.y = 0;
				lead_first_pass.setPosition(1190, 30);
				home_scene_map();
			});
		}
	});
	scene_first_pass.enterScene(function(){});
}
function anduo_map(){
	current_scene = "anduo_map()";
	//map.x = 200;
	//map.y = 0;
	//lead_first_pass.setPosition(1120, 600);
	map.clear();								//清理显示对象
	map.clearTransmitPoint();					//清理传送点
	map.setMapData(map_data_anduo);
	map.add(lead_first_pass);
	//添加npc
	for(var i = 0; i < npcs_anduo.length; i ++)
	{
		map.add(npcs_anduo[i]);
	}
	//添加房子
	for(var i = 0; i < houses_anduo.length; i ++)
	{
		map.add(houses_anduo[i]);
	}
	for(var i = 0; i < trees_anduo.length; i ++)
	{
		map.add(trees_anduo[i]);
	}
	//根据当前游戏进度设置系统提示对话	
	if(game_progress == 6)
	{
		system_dialog.setText(FRes.String.dialog2.dialog_12);
		system_dialog.visible = true;
		system_dialog.setCallFunc(function(){
			game_progress = 7;
		});
		
		//设置医生的对话内容
		npcs_anduo[0].dialog_text.setWindow({w:canvas.width, h:canvas.height});
		npcs_anduo[0].dialog_text.setText(FRes.String.dialog2.dialog_13);
		npcs_anduo[0].dialog_text.setCallFunc(function(){
			game_progress = 8;
			npcs_anduo[0].dialog_text.setWindow({w:canvas.width, h:canvas.height});
			npcs_anduo[0].dialog_text.setText(FRes.String.dialog2.dialog_14);
			npcs_anduo[0].dialog_text.setCallFunc(function(){});
		});
	}
	else if(game_progress == 7)
	{
		npcs_anduo[0].dialog_text.setWindow({w:canvas.width, h:canvas.height});
		npcs_anduo[0].dialog_text.setText(FRes.String.dialog2.dialog_13);
		npcs_anduo[0].dialog_text.setCallFunc(function(){
			game_progress = 8;
			npcs_anduo[0].dialog_text.setWindow({w:canvas.width, h:canvas.height});
			npcs_anduo[0].dialog_text.setText(FRes.String.dialog2.dialog_14);
			npcs_anduo[0].dialog_text.setCallFunc(function(){});
		});
	}
	else
	{
		npcs_anduo[0].dialog_text.setWindow({w:canvas.width, h:canvas.height});
		npcs_anduo[0].dialog_text.setText(FRes.String.dialog2.dialog_14);
		npcs_anduo[0].dialog_text.setCallFunc(function(){});
	}
	map.addTransmitPoint({x:1105,y:580,w:65,h:30,show:true});			//回到告诉公路
	//map.addTransmitPoint({x:265,y:495,w:100,h:20,show:true});			//医馆
	map.addTransmitPoint({x:1200,y:55,w:30,h:55,show:true});
	map.setTransmitPointCallFunc(function(i){
		if(i == 0)									//到高速公路
		{
			scene_first_pass.exitScene(function(){
				map.x = 0;
				map.y = 0;
				lead_first_pass.setPosition(820, 50);
				anduo_road_map();
			});
		}
		else if(i == 11)							//到药店
		{
			scene_first_pass.exitScene(function(){
				map.x = 0;
				map.y = 0;
				lead_first_pass.setPosition(0,170);
				drugstore_map();
			});
		}
		else if(i == 1)					//前往可可西里的路途
		{
			scene_first_pass.exitScene(function(){
				map.x = 0;
				map.y = 0;
				lead_first_pass.setPosition(0, 280);
				kekexili_map();
			});
		}
	});
	
	scene_first_pass.enterScene(function(){});
}
function drugstore_map(){
	place_name = "药店"
	map.clear();
	map.clearTransmitPoint();
	map.setMapData(map_data_drugstore);		//设置地图数据
	map.add(lead_first_pass);
	//添加npc
	for(var i = 0; i < npcs_drgustore.length; i ++)
	{
		map.add(npcs_drgustore[i]);
	}
	//设置npc谈话内容
	if(game_progress == 7)
	{
		npcs_drgustore[0].dialog_text.setWindow({w:canvas.width, h:canvas.height});
		npcs_drgustore[0].dialog_text.setText(FRes.String.dialog2.dialog_13);
		npcs_drgustore[0].dialog_text.setCallFunc(function(){
			game_progress = 8;
			npcs_drgustore[0].dialog_text.setText(FRes.String.dialog2.dialog_14);
		});
	}
	else
	{
		npcs_drgustore[0].dialog_text.setWindow({w:canvas.width, h:canvas.height});
		npcs_drgustore[0].dialog_text.setText(FRes.String.dialog2.dialog_14);
		npcs_drgustore[0].dialog_text.setCallFunc(function(){
		
		});
	}
	map.addTransmitPoint({x:0,y:100,w:30,h:100,show:true});
	map.setTransmitPointCallFunc(function(i){
		if(i == 0)					//回到安多县主地图
		{
			scene_first_pass.exitScene(function(){
				map.x = 0;
				map.y = 0;
				lead_first_pass.setPosition(300, 510);
				anduo_map();
			});
		}
	});
	scene_first_pass.enterScene(function(){});
}
function kekexili_map(){
	current_scene = "kekexili_map()";
	place_name = "可可西里";
	map.clear();
	map.clearTransmitPoint();
	map.setMapData(map_data_kekexili);
	for(var i = 0; i < trees_kekexili.length; i ++)
		map.add(trees_kekexili[i]);
	//add npc
	for(var i = 0; i < npcs_kekexili.length; i ++)
	{
		map.add(npcs_kekexili[i]);
	}
	//add leader
	map.add(lead_first_pass);
	map.addTransmitPoint({x:0,  y:230, w:30, h:90, show:true});
	if(game_progress == 8)
		map.addTransmitPoint({x:200,y:220, w:30, h:110, show:true, auto:true, is_in:false});
	map.addTransmitPoint({x:910,y:630,w:65,h:30,show:true});
	if(game_progress == 9)
		map.addTransmitPoint({x:640,y:220,w:100,h:30,show:true,auto:true,is_in:false});
	map.setTransmitPointCallFunc(function(i){
		console.log(i);
		if(i == 0)
		{
			scene_first_pass.exitScene(function(){
			//	lead_first_pass.setPosition(800, 100);
				map.x = 200;
				map.y = 0;
				lead_first_pass.setPosition(1200, 80);
				anduo_map();
			});
		}
		else if(game_progress==8&&i==1)
		{
			map.removeTransmitPoint(i);
			//添加犯罪分子的对话"传送点"
			map.addTransmitPoint({x:640,y:220,w:100,h:30,show:true,auto:true,is_in:false});
			system_dialog.setText(FRes.String.dialog2.dialog_15);
			system_dialog.visible = true;
			system_dialog.setCallFunc(function(){
				game_progress = 9;						//到达进度9
			});
		}
		else if(game_progress==9&&i==2)
		{
			map.removeTransmitPoint(i);
			system_dialog.setText(FRes.String.dialog2.dialog_16);
			system_dialog.visible = true;
			system_dialog.setCallFunc(function(){				//到达进度10（听完犯罪分子的对话）
				game_pause = true;
				game_progress = 10;
				flash_game_beng.style.display = "";
			});
		}
		else if(i == 1)
		{
			if(game_progress < 11)
			{	
				system_dialog.setText(FRes.String.dialog2.dialog_20);
				system_dialog.visible = true;
				system_dialog.setCallFunc(function(){});
			}
			else
			{
				scene_first_pass.exitScene(function(){
					///前往最后一个游戏关卡
					lead_first_pass.setPosition(5*65, 55);
					map.x = 0;//20*65-scene_first_pass.getWidth();
					map.y = 0;
					real_time_game_map();
				});
			}
		}
	});
	
	map.setWidth(map_grid_width);
	map.setHeight(map_grid_height);
	scene_first_pass.enterScene(function(){
		
	});

	if(game_progress == 8)
	{
		
	}
	scene_first_pass.enterScene(function(){});
}

function FirstKeyDown(e){
	var code = e.keyCode;
	var map_width = 0, map_height = 0;
	var grid_height = map.getGridHeight();
	var grid_width = map.getGridWidth();
	//获取地图的宽和高
	if(map.map_data)
	{
		map_height = map.map_data.length * grid_height;
		map_width = map.map_data[0].length * grid_width;
	}
	//console.log("key:"+e.keyCode);
}

function FirstMouseDown(e){
	var x = e.clientX;
	var y = e.clientY;
	var grid_x = Math.round((x + map.x)/map.getGridWidth()-0.5);
	var grid_y = Math.round((y + map.y)/map.getGridHeight()-0.5);
	var sp = {x:Math.round((lead_first_pass.x/map.getGridWidth()-0.5)),y:Math.round((lead_first_pass.y/map.getGridHeight()-0.5))};
	var ep = {x:grid_x, y:grid_y};
//	var path = AXin(sp, ep, map_data_home1);
//	path[0].grid_width = 65;
//	path[0].grid_height = 55;
//	lead_first_pass.setAIPath(path);
//	lead_first_pass.setAIEnable(true);
	
//	for(var i = 0; i < path.length; i ++)
//	{
//		console.log("x:"+path[i].x+" y:"+path[i].y);
//	}
	//console.log("e:"+e);
}
function FirstKeyUp(e){

}

function first_pass_draw(){
	if(game_pause == false)
	{
		scene_first_pass.render();
		if(place_name)
		{
			scene_first_pass.getContext().fillStyle = "rgb(0, 0, 0)";
			scene_first_pass.getContext().font = "25px Arial";
			scene_first_pass.getContext().textBaseline = "top";
			scene_first_pass.getContext().fillText(place_name, scene_first_pass.getCanvas().width-25*place_name.length, 0);
			scene_first_pass.getContext().fillText(user_name, 140, 0);
		}
		fps.frame();					//every frame call
		scene_first_pass.getContext().font = "20px Arial";
		scene_first_pass.getContext().fillText("fps:"+fps.getFps(), 0, 0);
	//	console.log("game progress:"+game_progress);
	}
	requestAnimationFrame(first_pass_draw);
}
