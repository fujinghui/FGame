
function real_time_game_map(){
	current_scene = "real_time_game_map()";
	lead_first_pass.setPosition(6*65,55);
	place_name = null;
	//设置地图属性
	map.clear();
	map.clearTransmitPoint();
	map.setMapData(map_data_real_time_game);
	map.show_table_line = false;
	//往地图里添加对象
	map.add(lead_first_pass);

	//添加障碍物
	for(var i = 0; i < stones.length; i ++)
		map.add(stones[i]);
	//添加传送点
	map.addTransmitPoint({x:6*65,y:20,w:65,h:35,show:true});
	map.addTransmitPoint({x:22*65,y:21*55,w:65,h:55,show:true,auto:false,is_in:false});
	map.setTransmitPointCallFunc(function(i){
		if(i == 0)
		{
			if(game_progress != 11)
			scene_first_pass.exitScene(function(){
				map.x = 0;
				map.y = 80;
				lead_first_pass.setPosition(920, 650);
				kekexili_map();
			});
		}
		else if(i == 1)
		{
			//所有敌人都已经杀死
			if(scoring.save_animal_count == 3&&
			scoring.kill_enemy_count == 3)
			{
				//玩家完成了游戏，进入到主界面
				scene_first_pass.exitScene(function(){
						map.x = 0;
						map.y = 0;
						
						//移除当前场景里的一些（场景）对象
						scene_first_pass.removeObject(mini_map);
						scene_first_pass.removeObject(scoring);
						scene_first_pass.exitScene(function(){
							lead_first_pass.tussle = null;			//删除打斗类
							lead_first_pass.setPosition(0, 500);
							home_scene_map();
						});
					});
			}
			else if(scoring.save_animal_count < 3)
			{
				system_dialog.setWindow({w:canvas.width, h:canvas.height});
				system_dialog.setText(FRes.String.dialog2.dialog_18);
				system_dialog.setCallFunc(function(){});
			}
			else if(scoring.kill_enemy_count < 3)
			{
				system_dialog.setWindow({w:canvas.width, h:canvas.height});
				system_dialog.setText(FRes.String.dialog2.dialog_17);
				system_dialog.setCallFunc(function(){});
			}
		}
	});
	
	if(game_progress != 11)				//玩家不在正常的游戏进度进入到了当前场景
	{
		return ;
	}
	
	//往小地图里添加对象
	for(var i = 0; i < npcs_real_time.length; i ++)
		mini_map.addCrime(npcs_real_time[i]);
	for(var i = 0; i < npcs_animals_save.length; i ++)
		mini_map.addAnimal(npcs_animals_save[i]);
	mini_map.leader = lead_first_pass;
	scene_first_pass.add(mini_map);
	scene_first_pass.add(scoring);							//往场景里添加计分器
	
	lead_first_pass.tussle = new Tussle(lead_first_pass);
	lead_first_pass.tussle.map_data = map_data_real_time_game;
	lead_first_pass.tussle.map_grid_width = map.getGridWidth();
	lead_first_pass.tussle.map_grid_height = map.getGridHeight();
	
	lead_first_pass.tussle.setDieCallFunc(function(obj){
		system_dialog.setText(FRes.String.dialog.dialog_11);
		//system_dialog.text_index = 0;
		system_dialog.visible = true;
	});
	//添加npc
	for(var i = 0; i < npcs_real_time.length; i ++)
	{
		map.add(npcs_real_time[i]);
		//添加打斗对象
		npcs_real_time[i].tussle = new Tussle(npcs_real_time[i]);
		npcs_real_time[i].tussle.map_data = map_data_real_time_game;
		npcs_real_time[i].tussle.map_grid_width = map.getGridWidth();
		npcs_real_time[i].tussle.map_grid_height = map.getGridHeight();
		
		npcs_real_time[i].tussle.setDieCallFunc(function(obj){
			map.removeObject(this.parent);
			mini_map.remove(this.parent);
			//当前犯罪分子死亡，开启牢笼
			for(var i = 0; i < this.parent.die_expose_position.length; i ++)
			{
				map.removeObject(map_data_real_time_game[this.parent.die_expose_position[i].y][this.parent.die_expose_position[i].x].object);	
				map_data_real_time_game[this.parent.die_expose_position[i].y][this.parent.die_expose_position[i].x].object = null;
			//	map_data_real_time_game[this.parent.die_expose_position[i].y][this.parent.die_expose_position[i].x].object.visible = false;
				map_data_real_time_game[this.parent.die_expose_position[i].y][this.parent.die_expose_position[i].x].f = 0;
			}
			this.parent.die_expose_position = null;
			
			scoring.kill_enemy_count += 1;			//主角杀死的动物数量加1
		});
		
		lead_first_pass.tussle.addEnemy(npcs_real_time[i]);
		npcs_real_time[i].tussle.addEnemy(lead_first_pass);
	}
	//添加要解救的动物
	for(var i = 0; i < npcs_animals_save.length; i ++)
	{
		map.add(npcs_animals_save[i]);
		//设置对话结束回调函数(即：解救完一只动物 )
		npcs_animals_save[i].dialog_text.setCallFunc(function(){
			scoring.save_animal_count += 1;
			//map.removeObject(this.parent);
			this.parent.visible = false;
			//this.parent.visible = false;
			mini_map.remove(this.parent);
			if(scoring.save_animal_count == npcs_animals_save.length)
			{
				game_progress == 12;									//到达游戏进度12
				system_dialog.setText(FRes.String.dialog2.dialog_end);
				system_dialog.visible = true;
				system_dialog.setCallFunc(function(){
									//玩家完成了游戏，进入到主界面
					scene_first_pass.exitScene(function(){
						map.x = 0;
						map.y = 0;
							
							//移除当前场景里的一些（场景）对象
						scene_first_pass.removeObject(mini_map);
						scene_first_pass.removeObject(scoring);
						scene_first_pass.exitScene(function(){
							lead_first_pass.tussle = null;			//删除打斗类
							lead_first_pass.setPosition(0, 530);
							home_scene_map();
						});
					});
				});
			}
		});
	}
	
	real_time_npc_ai_init();
	scene_first_pass.enterScene(function(){});
}

//AI系统
function real_time_npc_ai_init(){
	//npcs_real_time[0].setAIPath([
	//	{x:5,y:3,grid_width:map_grid_width,grid_height:map_grid_height},
	//	{x:5,y:4},{x:6,y:4},{x:7,y:4}]);
	var path = AXin({x:2,y:3},{x:4,y:5},map_data_real_time_game);
	path[0].grid_width = map_grid_width; path[0].grid_height = map_grid_height;
	npcs_real_time[0].setAIPath(path);
	npcs_real_time[0].ai_speed = 1;
	npcs_real_time[0].ai_loop_reverse = true;
	npcs_real_time[0].ai_loop = true;
	npcs_real_time[0].setAIEnable(true);
	
	npcs_real_time[1].setAIPath([
		{x:1,y:19,grid_width:map_grid_width,grid_height:map_grid_height},
		{x:2,y:19},{x:3,y:19},{x:3,y:20},{x:3,y:21},{x:4,y:21},{x:5,y:21}
	]);
	npcs_real_time[1].ai_speed = 1;
	npcs_real_time[1].ai_loop_reverse = true;
	npcs_real_time[1].ai_loop = true;
	npcs_real_time[1].setAIEnable(true);
	
	//npcs_real_time[2].setAIPath([
	//	{x:7,y:10,grid_width:map_grid_width,grid_height:map_grid_height},
	//	{x:8,y:10},{x:9,y:10},{x:11,y:10}
	//]);
	path = AXin({x:9,y:19},{x:17,y:17},map_data_real_time_game);
	path[0].grid_width = map_grid_width;path[0].grid_height=map_grid_height;
	npcs_real_time[2].setAIPath(path);
	npcs_real_time[2].ai_speed = 1;
	npcs_real_time[2].ai_loop_reverse = true;
	npcs_real_time[2].ai_loop = true;
	npcs_real_time[2].setAIEnable(true);
	/*	
	var paths = AXin({x:3,y:1}, {x:10,y:7}, map_data_real_time_game);
	paths[0].grid_width=map_grid_width;
	paths[0].grid_height=map_grid_height;
	npcs_real_time[3].setAIPath(paths);//[
	//	{x:2,y:0,grid_width:map_grid_width,grid_height:map_grid_height},
	//	{x:3,y:0}
	//]);
	npcs_real_time[3].ai_speed = 1;
	npcs_real_time[3].ai_loop_reverse = true;
	npcs_real_time[3].ai_loop = true;
	npcs_real_time[3].setAIEnable(true);
	
	var paths = AXin({x:14,y:1},{x:17,y:5},map_data_real_time_game);
	paths[0].grid_width=map_grid_width;
	paths[0].grid_height=map_grid_height;
	npcs_real_time[4].setAIPath(paths);
	npcs_real_time[4].ai_speed = 1;
	npcs_real_time[4].ai_loop_reverse = true;
	npcs_real_time[4].ai_loop = true;
	npcs_real_time[4].setAIEnable(true);
	
	var paths = AXin({x:11,y:21},{x:21,y:18},map_data_real_time_game);
	paths[0].grid_width=map_grid_width;
	paths[0].grid_height=map_grid_height;
	npcs_real_time[5].setAIPath(paths);
	npcs_real_time[5].ai_speed = 1;
	npcs_real_time[5].ai_loop_reverse = true;
	npcs_real_time[5].ai_loop = true;
	npcs_real_time[5].setAIEnable(true);
	*/
}
