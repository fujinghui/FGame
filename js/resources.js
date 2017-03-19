var trees;
var houses;
var npc1;
var npc2;
var npc3, npc4;
var npc_car;
var fences;
var system_dialog;

var wall_animal_protect = new Array();

var trees_kekexili = new Array();
var desks = new Array();			//桌子
var stones = new Array();			//最后一个实时战斗游戏的障碍物
var trees_anduo_road = new Array();
var trees_anduo = new Array();
var houses_anduo = new Array();

var npcs_main = new Array();			//主要场景里的npc
var npcs_slaughter = new Array();		//屠宰场场景里的npc
var npcs_animal_protect = new Array();	//野生动物保护协会里的npc
var npcs_crime = new Array();			//犯罪分子房间里的npc
var npcs_animals_save = new Array();	//待拯救的动物
var npcs_real_time = new Array();		//实时对战最后一个关卡的npc
var npcs_drgustore = new Array();		//药店里的npc
var npcs_kekexili = new Array();		//可可西里的npc
var npcs_anduo = new Array();			//安多县的npcs

var mini_map = null;
//系统对话框
var system_dialog;
var scoring;
var menu_button = new Array();
var menu;
//音乐资源
var music_hint, music_backgorund;
function init_all_res(){
	myajax = new FAjax();
	menu = new Menu();
	menu.SCENE_WIDTH = canvas.width;
	menu.SCENE_HEIGHT = canvas.height;
	menu.MENU_WIDTH = 200;
	menu.MENU_HEIGHT = 300;
	menu.x = (menu.SCENE_WIDTH-menu.MENU_WIDTH)/2;
	menu.y = (menu.SCENE_HEIGHT-menu.MENU_WIDTH)/2;
	menu.init();
	menu.visible = false;
	//底下的菜单栏
	menu_button[0] = new FGAMES.Button("菜单");
	menu_button[0].setWidth(150);
	menu_button[0].setHeight(50);
	menu_button[0].setPosition(0, canvas.height - menu_button[0].getHeight());
	menu_button[0].addOnClickListener(function(){
		menu.visible = !menu.visible;
	})
	menu_button[1] = new FGAMES.Button("帮助");
	menu_button[1].setWidth(150);
	menu_button[1].setHeight(50);
	menu_button[1].setPosition(160, canvas.height - menu_button[1].getHeight());
	menu_button[1].addOnClickListener(function(){
		
	})
	/*
	var tt = "[\n";
	for(var i = 0; i < map_data_real_time_game.length; i ++)
	{
		tt+="["
		for(var j = 0; j < map_data_real_time_game.length; j ++)
		{
			tt = tt+""+map_data_real_time_game[i][j].f+",";
		}
		tt+="],\n"
	}
	tt+="]";
	alert(tt);
	console.log(tt);
	*/
	scoring = new Scoring(canvas.width, canvas.height);
	
	map_data_real_time_game=FTools.SetMapData({x:0,y:0,width:63,height:50,i:3,f:0},map_real_time);
	map_data_crime_house = FTools.SetMapData({x:0,y:0,width:63,height:50,i:3,f:0}, map_crime_test);
	map_data_anduo_road = FTools.SetMapDataEx(map_flag_anduo_road,map_show_anduo_road,map_res_anduo_road);
	map_data_anduo = FTools.SetMapDataEx(map_flag_anduo, map_show_anduo, map_res_anduo);
	map_data_drugstore = FTools.SetMapDataEx(map_flag_drugstore, map_show_drugstore, map_res_drugstore);
	map_data_kekexili = FTools.SetMapDataEx(map_flag_kekexili, map_show_kekexili, map_res_kekexili);
	//FTools.addMapFlag(map_data_anduo_road, map_flag_anduo_road);
	
	//小地图初始化
	mini_map = new MiniMap();
	mini_map.SCENE_WIDTH = canvas.width;
	mini_map.SCENE_HEIGHT = canvas.height;
	mini_map.MINI_MAP_WIDTH = canvas.width/4;
	mini_map.MINI_MAP_HEIGHT = canvas.height/4;
	mini_map.map_data = map_data_real_time_game;
	
	trees = new Array();
	trees[0] = new FGAMES.Character();
	trees[0].init(['img/trees.png']);
	trees[0].addFrame({i:0, x:320, y:100, width:160, height:170});
	trees[0].center_x = 0; trees[0].center_y = 170;
	trees[0].setPosition(140, 200);
	
	trees[1] = new FGAMES.Character();
	trees[1].init(['img/trees.png']);
	trees[1].addFrame({i:0, x:320, y:100, width:160, height:170});
	trees[1].center_x = 50; trees[1].center_y = 170;
	trees[1].setPosition(0, 200);
	
	trees[2] = new FGAMES.Character();
	trees[2].init(['img/trees.png']);
	trees[2].addFrame({i:0, x:380, y:360, width:80, height:170});
	trees[2].center_x = 0; trees[2].center_y = 170;
	trees[2].setPosition(400, 200);
	
	trees[3] = new FGAMES.Character();
	trees[3].init(['img/trees.png']);
	trees[3].addFrame({i:0, x:380, y:360, width:80, height:170});
	trees[3].center_x = 0; trees[3].center_y = 170;
	trees[3].setPosition(510, 450);
	
	trees[4] = new FGAMES.Character()
	trees[4].init(['img/trees.png']);
	trees[4].addFrame({i:0, x:380, y:360, width:80, height:170});
	trees[4].center_x = 0; trees[4].center_y = 170;
	trees[4].setPosition(320, 450);
	
	trees[5] = new FGAMES.Character()
	trees[5].init(['img/trees.png']);
	trees[5].addFrame({i:0, x:380, y:360, width:80, height:170});
	trees[5].center_x = 0; trees[5].center_y = 170;
	trees[5].setPosition(300, 600);
	
	trees[6] = new FGAMES.Character()
	trees[6].init(['img/trees.png']);
	trees[6].addFrame({i:0, x:380, y:360, width:80, height:170});
	trees[6].center_x = 0; trees[6].center_y = 170;
	trees[6].setPosition(800, 200);
	
	trees[7] = new FGAMES.Character()
	trees[7].init(['img/trees.png']);
	trees[7].addFrame({i:0, x:380, y:360, width:80, height:170});
	trees[7].center_x = 0; trees[7].center_y = 170;
	trees[7].setPosition(450, 670);
	
	trees[8] = new FGAMES.Character()
	trees[8].init(['img/trees.png']);
	trees[8].addFrame({i:0, x:380, y:360, width:80, height:170});
	trees[8].center_x = 0; trees[8].center_y = 170;
	trees[8].setPosition(70, 480);
	
	trees[9] = new FGAMES.Character();
	trees[9].init(['img/trees.png']);
	trees[9].addFrame({i:0, x:380, y:360, width:80, height:170});
	trees[9].center_x = 0; trees[9].center_y = 170;
	trees[9].setPosition(1000, 260);
	
	trees[10] = new FGAMES.Character();
	trees[10].init(['img/trees.png']);
	trees[10].addFrame({i:0, x:380, y:360, width:80, height:170});
	trees[10].center_x = 0; trees[10].center_y = 170;
	trees[10].setPosition(30, 580);
	
	trees[11] = new FGAMES.Character();
	trees[11].init(['img/trees.png']);
	trees[11].addFrame({i:0, x:310, y:290, width:90, height:80});
	trees[11].center_x = 0; trees[11].center_y = 60;
	trees[11].setPosition(110, 580);
	
	trees[12] = new FGAMES.Character();
	trees[12].init(['img/trees.png']);
	trees[12].addFrame({i:0, x:310, y:290, width:90, height:80});
	trees[12].center_x = 0; trees[12].center_y = 60;
	trees[12].setPosition(510,580);
	
	trees[13] = new FGAMES.Character();
	trees[13].init(['img/trees.png']);
	trees[13].addFrame({i:0, x:310, y:290, width:90, height:80});
	trees[13].center_x = 0; trees[13].center_y = 60;
	trees[13].setPosition(210, 580);
	
	trees[14] = new FGAMES.Character();
	trees[14].init(['img/trees.png']);
	trees[14].addFrame({i:0, x:310, y:290, width:90, height:80});
	trees[14].center_x = 0; trees[14].center_y = 60;
	trees[14].setPosition(410, 580);
	
	trees[15] = new FGAMES.Character();
	trees[15].init(['img/trees.png']);
	trees[15].addFrame({i:0, x:310, y:290, width:90, height:80});
	trees[15].center_x = 0; trees[15].center_y = 60;
	trees[15].setPosition(550, 100);
	
	trees[15] = new FGAMES.Character();
	trees[15].init(['img/trees.png']);
	trees[15].addFrame({i:0, x:310, y:290, width:90, height:80});
	trees[15].center_x = 0; trees[15].center_y = 60;
	trees[15].setPosition(660, 105);
	for(var i = 16; i < 22; i ++)
	{
		trees[i] = new FGAMES.Character();
		trees[i].init(['img/trees.png']);
		trees[i].addFrame({i:0, x:310, y:290, width:90, height:80});
		trees[i].center_x = 0; trees[i].center_y = 60;
		trees[i].setPosition(700 + (i-16)*90, 580);
	}
	
	
	
	/*
	for(var i = 22; i < 100; i ++)
	{
		trees[i] = new FGAMES.Character();
		trees[i].init(['img/trees.png']);
		trees[i].addFrame({i:0, x:380, y:360, width:75, height:170});
		trees[i].center_x = 0; trees[i].center_y = 170;
		trees[i].setPosition(Math.random() * map_data_home1[0].length * 65 - 20, Math.random() * map_data_home1.length * 55 - 80);
	}*/
	
	
	//初始化房子
	houses = new Array();
	houses[0] = new FGAMES.Character();
	houses[0].init(['img/houses.png']);
	houses[0].addFrame({i:0, x:0, y:0, width:520, height:400});
	houses[0].setWH(200, 160);
	houses[0].center_x = 0; houses[0].center_y = 160;
	houses[0].setPosition(0, 160);
	
	houses[1] = new FGAMES.Character();
	houses[1].init(['img/houses.png']);
	houses[1].addFrame({i:0, x:0, y:0, width:520, height:400});
	houses[1].setWH(200, 160);
	houses[1].center_x = 0; houses[1].center_y = 160;
	houses[1].setPosition(260, 160);
	
	houses[2] = new FGAMES.Character();
	houses[2].init(['img/houses.png']);
	houses[2].addFrame({i:0, x:0, y:0, width:520, height:380});
	houses[2].setWH(200, 160);
	houses[2].center_x = 0; houses[2].center_y = 160;
	houses[2].setPosition(460, 100);
	
	houses[3] = new FGAMES.Character();
	houses[3].init(['img/houses.png']);
	houses[3].addFrame({i:0, x:0, y:0, width:520, height:380});
	houses[3].setWH(200, 160);
	houses[3].center_x = 0; houses[3].center_y = 160;
	houses[3].setPosition(690, 100);
	
	houses[4] = new FGAMES.Character();
	houses[4].init(['img/houses.png']);
	houses[4].addFrame({i:0, x:0, y:0, width:520, height:380});
	houses[4].setWH(200, 160);
	houses[4].center_x = 0; houses[4].center_y = 160;
	houses[4].setPosition(980, 490);
	
	houses[5] = new FGAMES.Character();
	houses[5].init(['img/houses.png']);
	houses[5].addFrame({i:0, x:525, y:0, width:520, height:380});
	houses[5].setWH(300, 180);
	houses[5].center_x = 0; houses[5].center_y = 180;
	houses[5].setPosition(300, 390);
	houses[5].name = "珍稀动物保护协会";
	
	//犯罪贩子住的地方
	houses[6] = new FGAMES.Character();
	houses[6].init(['img/houses.png']);
	houses[6].addFrame({i:0, x:525, y:0, width:520, height:380});
	houses[6].setWH(300, 180);
	houses[6].center_x = 0; houses[6].center_y = 180;
	houses[6].setPosition(800, 715);
	
	houses_anduo[0] = new FGAMES.Character();
	houses_anduo[0].init(['img/houses.png']);
	houses_anduo[0].addFrame({i:0, x:0, y:0, width:520, height:380});
	houses_anduo[0].setWH(300, 180);
	houses_anduo[0].center_x = 0;houses_anduo[0].center_y = 180;
	houses_anduo[0].setPosition(160, 495);
	houses_anduo[0].name = "药店";
	
	
	for(var i = 0; i < 100; i ++)
	{
		trees_kekexili[i] = new FGAMES.Character();
		trees_kekexili[i].init(['img/trees.png']);
		trees_kekexili[i].addFrame({i:0, x:310, y:290, width:90, height:80});
		trees_kekexili[i].center_x = 0; trees_kekexili[i].center_y = 60;
		var x,y;
		do{
			x = Math.random() * 16 * 65 - 20
			y = Math.random() * 12 * 55;
		}while((y>=220-20&&y<=330+20)||(x>=13*65&&x<=15*65-20&&y>=330));
		trees_kekexili[i].setPosition(x,y);
	}
	
	for(var i = 0; i < 58; i ++)
	{
		trees_anduo_road[i] = new FGAMES.Character();
		trees_anduo_road[i].init(['img/trees.png']);
		trees_anduo_road[i].addFrame({i:0,x:310,y:290,width:90,height:80});
		trees_anduo_road[i].center_x = 0; trees_anduo_road[i].center_y = 60;
	}
	for(var i = 0; i < 8; i ++)
	{
		trees_anduo_road[i].setPosition(i * 100, 850);
	}
	for(var i = 0; i < 8; i ++)
	{
		trees_anduo_road[i+8].setPosition(i * 100, 750);
	}
	for(var i = 16; i < 20; i ++)
	{
		trees_anduo_road[i].setPosition(700, 50+(i-16)*55);
	}
	for(var i = 20; i < 28; i ++)
	{
		trees_anduo_road[i].setPosition(700, 300+(i-20)*55);
	}
	for(var i = 28; i < 33; i ++)
	{
		trees_anduo_road[i].setPosition(900, 50+(i-28)*55);
	}
	for(var i = 33; i < 44; i ++)
	{
		trees_anduo_road[i].setPosition(900, 380+(i-33)*55);
	}
	for(var i = 44; i < 51; i ++)
	{
		trees_anduo_road[i].setPosition((i-44)*100, 200);
	}
	for(var i = 51; i < 58; i ++)
	{
		trees_anduo_road[i].setPosition((i-51)*100, 300);
	}
	
	for(var i = 0; i < 72; i ++)
	{
		trees_anduo[i] = new FGAMES.Character();
		trees_anduo[i].init(['img/trees.png']);
		trees_anduo[i].addFrame({i:0,x:310,y:290,width:90,height:80});
		trees_anduo[i].center_x = 0; trees_anduo[i].center_y = 60;
		trees_anduo[i].setWH(90, 80);
	}
	for(var i = 0; i < 12; i ++)
	{
		trees_anduo[i].setPosition(i*100, 50);
	}
	for(var i = 12; i < 22; i ++)
	{
		trees_anduo[i].setPosition(120+(i-12)*100, 140);
	}
	for(var i = 22; i < 32; i ++)
	{
		trees_anduo[i].setPosition(120+(i-22)*100, 480);
	}
	for(var i = 32; i< 43; i ++)
	{
		trees_anduo[i].setPosition((i-32)*100, 590);
	}
	for(var i = 43; i < 52; i ++)
	{
		trees_anduo[i].setPosition(-10, 105+(i-43)*55);
	}
	for(var i = 52; i < 57; i ++)
	{
		trees_anduo[i].setPosition(120, 205+(i-52)*55);
	}
	for(var i = 57; i < 62; i ++)
	{
		trees_anduo[i].setPosition(1020, 205+(i-57)*55);
	}
	for(var i = 62; i < 72; i ++)
	{
		trees_anduo[i].setPosition(1160, 160+(i-62)*55);
	}
	//初始化桌子
	for(var i = 0; i < 14; i ++)
	{
		desks[i] = new FGAMES.Character();
		desks[i].init(['img/roads.png']);
		desks[i].setWH(90, 60);
		if(i < 7)
			desks[i].addFrame({i:0, x:260, y:0, width:307, height:200});
		else
			desks[i].addFrame({i:0, x:567, y:0, width:307, height:200})
		desks[i].center_x = 0; desks[i].center_y = 60;
		desks[i].setPosition(100+150 * (i%7), 150 + Math.round(i/7-0.5)*60);
	}
	//初始化最后一个关卡的地图资源
	var ti = 0;
	for(var i = 0; i < map_data_real_time_game.length; i ++)
	{
		for(var j = 0; j < map_data_real_time_game[0].length; j ++)
		{
			if(map_data_real_time_game[i][j].f == 1)
			{
				stones[ti] = new FGAMES.Character();
				stones[ti].init(['img/trees.png']);
				if(Math.random()>0.5)
				{
					stones[ti].addFrame({i:0, x:310, y:290, width:90, height:80});
					stones[ti].center_x = 0; stones[ti].center_y = 80;
					stones[ti].setWH(90, 100);
					stones[ti].setPosition(j*map.getGridWidth()-20, (i+1)*map.getGridHeight());
				}
				else
				{
					stones[ti].addFrame({i:0, x:380, y:360, width:80, height:170});
					stones[ti].center_x = 0; stones[ti].center_y = 170;
					stones[ti].setWH(80, 170);
					stones[ti].setPosition(j*map.getGridWidth()-10, (i+1)*map.getGridHeight());
				}
				map_data_real_time_game[i][j].object = stones[ti];
				ti = ti + 1;	
				
			}
		}
	}
	
	
	
	//初始化npc
	//主场景里的npc
	for(var i = 0; i < 4; i ++)
	{
		npcs_main[i] = new Npc();
		npcs_main[i].init(["other_res/test_character.png"]);
		npcs_main[i].addFrame({i:0, x:0, y:0, width:78, height:80});
		npcs_main[i].addFrame({i:0, x:0, y:80, width:78, height:70});
		npcs_main[i].addFrame({i:0, x:0, y:150, width:78, height:70});
		npcs_main[i].addFrame({i:0, x:0, y:220, width:78, height:64});
		npcs_main[i].setShowFrameRange(0, 1);
	 	npcs_main[i].setWH(78, 80);
		npcs_main[i].center_x = 0; npcs_main[i].center_y = 80;
		npcs_main[i].setUpdateTime(200);
	}
	
	npcs_main[0].setPosition(140, 500);			//
	npcs_main[1].setPosition(1200, 220);
	//npcs_main[2].setPosition(0, 0);			//长官
	//npcs_main[3].setPosition(650, 400);			//老汉
	//老汉npc设置
	npcs_main[3] = null;
	npcs_main[3] = new Npc();
	npcs_main[3].init(['img/laohan.png']);
	for(var i = 0; i < 7; i ++)
		npcs_main[3].addFrame({i:0, x:i*100, y:0, width:100, height:124});
	for(var i = 6; i >= 0; i --)
		npcs_main[3].addFrame({i:0, x:i*100, y:0, width:100, height:124});
	npcs_main[3].setShowFrameRange(0, 13);
	npcs_main[3].setWH(78, 80);
	npcs_main[3].center_x = 0; npcs_main[3].center_y = 80;
	npcs_main[3].setUpdateTime(200);
	npcs_main[3].setPosition(650, 400);
	
	//屠宰场npc资源初始化
	for(var is = 0; is < 15; is ++)
	{
		npcs_slaughter[is] = new Npc();
		npcs_slaughter[is].init(["img/tufu.png"]);
		for(var i = 0; i < 9; i += 1)
			npcs_slaughter[is].addFrame({i:0, x:100*i, y:0, width:100, height:100});
		for(var i = 8; i >= 0; i -= 1)
			npcs_slaughter[is].addFrame({i:0, x:100*i, y:0, width:100, height:100});
		for(var i = 0; i < 9; i += 1)
			npcs_slaughter[is].addFrame({i:0, x:100*i, y:100, width:100, height:100});
		for(var i = 8; i >= 0; i -= 1)
			npcs_slaughter[is].addFrame({i:0, x:100*i, y:100, width:100, height:100});
			
		npcs_slaughter[is].setShowFrameRange(0, 35);
		npcs_slaughter[is].setWH(80, 80);
		npcs_slaughter[is].center_x = 0; npcs_slaughter[is].center_y = 80;
		npcs_slaughter[is].setUpdateTime(100);
		npcs_slaughter[is].setPosition(120+150 * ((is-1)%7), 120 + Math.round((is-1)/7-0.5)*60);
	}
	//野生动物保护协会npc
	for(var i = 0; i < 1; i ++)
	{
		npcs_animal_protect[i] = new Npc();
		npcs_animal_protect[i].init(["img/zhangguan.png"]);
		for(var i1 = 0; i1 < 4; i1 ++)
			npcs_animal_protect[i].addFrame({i:0, x:i1*235, y:0, width:235, height:160});
		for(var i1 = 3; i1 >= 0; i1 --)
			npcs_animal_protect[i].addFrame({i:0, x:i1*235, y:0, width:235, height:160});
		
		//npcs_animal_protect[i].addFrame({i:0, x:0, y:80, width:78, height:70});
		//npcs_animal_protect[i].addFrame({i:0, x:0, y:150, width:78, height:70});
		//npcs_animal_protect[i].addFrame({i:0, x:0, y:220, width:78, height:70});
		npcs_animal_protect[i].setShowFrameRange(0, 3);
		npcs_animal_protect[i].setWH(235, 160);
		npcs_animal_protect[i].center_x = 0; npcs_animal_protect[i].center_y = 160;
		npcs_animal_protect[i].setUpdateTime(500);
		
		npcs_animal_protect[i].setPosition(100 + 78*(i%14), 300+80*Math.round(i/14-0.5));
		npcs_animal_protect[i].visible = true;
	}
	npcs_animal_protect[0].setPosition(800, 300);
	npcs_animal_protect[0].near_distance = 100;
//	npcs_animal_protect[0].setPosition(100, 200);
//	npcs_animal_protect[1].setPosition(200, 200);
//	npcs_animal_protect[2].setPosition(300, 200);
	//犯罪分子房间里的动画
	for(var i = 0; i < 2; i ++)
	{
		npcs_crime[i] = new Npc();
		npcs_crime[i].init(["other_res/test_character.png"]);
		npcs_crime[i].addFrame({i:0, x:0, y:0, width:78, height:80})
		npcs_crime[i].addFrame({i:0, x:0, y:80, width:78, height:70});
		npcs_crime[i].addFrame({i:0, x:0, y:150, width:78, height:70});
		npcs_crime[i].addFrame({i:0, x:0, y:220, width:78, height:70});
		npcs_crime[i].setShowFrameRange(0, 1);
		npcs_crime[i].setWH(78, 80);
		npcs_crime[i].center_x = 0; npcs_crime[i].center_y = 80;
		npcs_crime[i].setUpdateTime(200);
	//	npcs_crime[0].setPosition(400, 400);
	}
	npcs_crime[0].setPosition(400, 400);
	npcs_crime[1].setPosition(480, 400);
	
	for(var i = 0; i < 3; i ++)
	{
		npcs_real_time[i] = new Npc();
		npcs_real_time[i].init(["img/daolie"+(i+1)+".png"]);					//初始化图片
		//up
		for(var index = 0; index < 3; index ++)
			npcs_real_time[i].addFrame({i:0, x:index * 100, y:0, width:100, height:100});
		for(var index = 2; index >= 0; index --)
			npcs_real_time[i].addFrame({i:0, x:index * 100, y:0, width:100, height:100});
		//down
		for(var index = 0; index < 3; index ++)
			npcs_real_time[i].addFrame({i:0, x:index * 100, y:100, width:100, height:100});
		for(var index = 2; index >= 0; index --)
			npcs_real_time[i].addFrame({i:0, x:index * 100, y:100, width:100, height:100});
		//right
		for(var index = 0; index < 3; index ++)
			npcs_real_time[i].addFrame({i:0, x:index * 100, y:200, width:100, height:100});
		for(var index = 2; index >= 0; index --)
			npcs_real_time[i].addFrame({i:0, x:index * 100, y:200, width:100, height:100});
		//left
		for(var index = 0; index < 3; index ++)
			npcs_real_time[i].addFrame({i:0, x:index * 100, y:300, width:100, height:100});
		for(var index = 2; index >= 0; index --)
			npcs_real_time[i].addFrame({i:0, x:index * 100, y:300, width:100, height:100});
		npcs_real_time[i].setAIShowFrame({
			up:{start:0, end:5},
			down:{start:6, end:11},
			right:{start:12, end:17},
			left:{start:18, end:23}
		});
		//npcs_real_time[i].addFrame({i:0, x:0, y:80, width:78, height:70});
		
		npcs_real_time[i].setShowFrameRange(0, 4 * 6 - 1);
		npcs_real_time[i].setWH(78, 80);
		npcs_real_time[i].center_x = 0; npcs_real_time[i].center_y = 80;
		npcs_real_time[i].setUpdateTime(100);
		npcs_real_time[i].setPosition(500, 200);
	}
	npcs_real_time[0].die_expose_position = [{x:1,y:2}];
	npcs_real_time[1].die_expose_position = [{x:1,y:20}];
	npcs_real_time[2].die_expose_position = [{x:15,y:17}];
	for(var i = 0; i < 3; i ++)
	{
		npcs_animals_save[i] = new Npc();
		npcs_animals_save[i].init(["other_res/test_character.png"]);
		npcs_animals_save[i].addFrame({i:0, x:0, y:0, width:78, height:80});
		npcs_animals_save[i].addFrame({i:0, x:0, y:80, width:78, height:70});
		npcs_animals_save[i].setShowFrameRange(0, 1);
		npcs_animals_save[i].setWH(78, 80);
		npcs_animals_save[i].center_x = 0; npcs_animals_save[i].center_y = 80;
		npcs_animals_save[i].setUpdateTime(200);
		npcs_animals_save[i].setPosition(6*65, 100+100*i);
		npcs_animals_save[i].dialog_text.setWindow({w:canvas.width, h:canvas.height});
		npcs_animals_save[i].dialog_text.setText(FRes.String.dialog.dialog_real_time_animal);
	}
	npcs_animals_save[0].setPosition(1*65,1*55);
	npcs_animals_save[1].setPosition(1*65,21*55);
	npcs_animals_save[2].setPosition(15*65,18*55);
	//药店里的npc
	for(var i = 0; i < 1; i ++)
	{
		npcs_drgustore[i] = new Npc();
		npcs_drgustore[i].init(["other_res/test_character.png"]);
		npcs_drgustore[i].addFrame({i:0, x:0, y:0, width:78, height:80});
		npcs_drgustore[i].addFrame({i:0, x:0, y:80, width:78, height:70});
		npcs_drgustore[i].setShowFrameRange(0, 1);
		npcs_drgustore[i].setWH(78, 80);
		npcs_drgustore[i].center_x = 0; npcs_drgustore[i].center_y = 80;
		npcs_drgustore[i].setUpdateTime(200);
		npcs_drgustore[i].setPosition(500, 200);
	}
	//安多县的npc
	for(var i = 0; i < 1; i ++)
	{
		npcs_anduo[i] = new Npc();
		npcs_anduo[i].init(['img/doctor.png']);
		for(var index = 0; index < 9; index++)
		{
			npcs_anduo[i].addFrame({i:0, x:index * 200, y:0, width:200, height:200});
		}
		for(var index = 8; index >= 0; index --)
		{
			npcs_anduo[i].addFrame({i:0, x:index * 200, y:0, width:200, height:200});
		}
		npcs_anduo[i].setShowFrameRange(0, 16);
		npcs_anduo[i].setWH(120, 120);
		npcs_anduo[i].center_x = 0; npcs_anduo[i].center_y = 120;
		npcs_anduo[i].setUpdateTime(200);
		npcs_anduo[i].setPosition(470, 500);
	}
	//可可西里的npc
	for(var i = 0; i < 3; i ++)
	{
		npcs_kekexili[i] = new Npc();
		npcs_kekexili[i].init(["img/daolie1.png", "img/daolie2.png", "img/daolie3.png"]);
		for(var si = 0; si < 400; si += 100)
		{
			for(var di = 0; di < 300; di += 100)
			{
				npcs_kekexili[i].addFrame({i:i,x:di,y:si,width:100,height:100});
			}
		}
		npcs_kekexili[i].setShowFrameRange(0, 2);
		npcs_kekexili[i].setWH(100, 80);
		npcs_kekexili[i].center_x = 0; npcs_kekexili[i].center_y = 80;
		npcs_kekexili[i].setUpdateTime(200);
		npcs_kekexili[i].setPosition(600+60*i, 200);
	}
	
	
	//初始化屠夫房间的墙壁
	walls_slaughter = new Array();
	//墙壁上面
	
	walls_slaughter[0] = new Fence();
	walls_slaughter[0].init(['img/roads.png']);
	walls_slaughter[0].addFrame({i:0, x:0, y:130, width:135, height:150});
	walls_slaughter[0].setWH(50, 60);
	walls_slaughter[0].center_x = 0; walls_slaughter[0].center_y = 60;
	walls_slaughter[0].setPosition(600, 820);
	walls_slaughter[0].setRepeatCount(1);
	walls_slaughter[0].draw = function(){}
	
	walls_slaughter[1] = new Fence();
	walls_slaughter[1].init(['img/mj.png']);
	walls_slaughter[1].addFrame({i:0, x:875, y:290, width:60, height:80});
	walls_slaughter[1].setWH(50, 60);
	walls_slaughter[1].center_x = 0; walls_slaughter[1].center_y = 60;
	walls_slaughter[1].setPosition(10, 820);
	walls_slaughter[1].setRepeatCount(10);
	walls_slaughter[1].draw = function(){};
	
	//上方的墙壁
	walls_slaughter[2] = new Fence();
	walls_slaughter[2].init(['img/roads.png']);
	walls_slaughter[2].addFrame({i:0, x:0, y:282, width:175, height:255});
	walls_slaughter[2].setWH(50, 80);
	walls_slaughter[2].center_x = 0; walls_slaughter[2].center_y = 0;
	walls_slaughter[2].setPosition(0, 0);
	walls_slaughter[2].setRepeatCount(10);
	//下方的墙壁
	walls_slaughter[3] = new Fence();
	walls_slaughter[3].init(['img/roads.png']);
	walls_slaughter[3].addFrame({i:0, x:368, y:282, width:170, height:280});
	walls_slaughter[3].setWH(80, 140);
	walls_slaughter[3].center_x = 0; walls_slaughter[3].center_y = 140;
	walls_slaughter[3].setPosition(0, 0);
	walls_slaughter[3].setRepeatCount(0);
	walls_slaughter[3].setNoShowIndex([4, 5]);
	//左边的墙
	walls_slaughter[4] = new Fence();
	walls_slaughter[4].init(['img/roads.png']);
	walls_slaughter[4].addFrame({i:0, x:368, y:282, width:170, height:280});
	walls_slaughter[4].setWH(60, 100);
	walls_slaughter[4].center_x = 0; walls_slaughter[4].center_y = 100;
	walls_slaughter[4].setPosition(0, 330);
	walls_slaughter[4].setRepeatCount(10);
	
	walls_slaughter[5] = new Fence();
	walls_slaughter[5].init(['img/roads.png']);
	walls_slaughter[5].addFrame({i:0, x:554, y:283, width:230, height:280});
	walls_slaughter[5].setWH(60, 100);
	walls_slaughter[5].center_x = 0; walls_slaughter[5].center_y = 100;
	walls_slaughter[5].setPosition(10*60, 330);
	walls_slaughter[5].setRepeatCount(1);
	
	//右边的墙
	walls_slaughter[6] = new Fence();
	walls_slaughter[6].init(['img/roads.png']);
	walls_slaughter[6].addFrame({i:0, x:368, y:282, width:170, height:280});
	walls_slaughter[6].setWH(60, 100);
	walls_slaughter[6].center_x = 0; walls_slaughter[6].center_y = 100;
	walls_slaughter[6].setRepeatCount(10);
	
	walls_slaughter[7] = new Fence();
	walls_slaughter[7].init(['img/roads.png']);
	walls_slaughter[7].addFrame({i:0, x:540, y:571, width:170, height:280});
	walls_slaughter[7].setWH(60, 100)
	walls_slaughter[7].center_x = 0; walls_slaughter[7].center_y = 100;
	walls_slaughter[7].setPosition(0, 0);
	walls_slaughter[7].setRepeatCount(1);
	
	//墙壁
	//上面的墙壁
	wall_animal_protect[0] = new Fence();
	wall_animal_protect[0].init(['img/roads.png']);
	wall_animal_protect[0].addFrame({i:0, x:368, y:282, width:175, height:260});
	wall_animal_protect[0].setWH(100, 160);
	wall_animal_protect[0].center_x = 0; wall_animal_protect[0].center_y = 160;
	wall_animal_protect[0].setPosition(0, 140);
	wall_animal_protect[0].setRepeatCount(10);
	//设置墙壁上的图片
	wall_animal_protect[0].addImage(['img/animals.png']);
	wall_animal_protect[0].addShowImage({i:0,x:0,y:0,w:157,h:154,dx:50,dy:20,dw:90,dh:100});
	wall_animal_protect[0].addShowImage({i:0,x:185,y:60,w:180,h:90,dx:250,dy:40,dw:100,dh:60});
	wall_animal_protect[0].addShowImage({i:0,x:390,y:30,w:155,h:115,dx:450,dy:30,dw:100,dh:80});
	wall_animal_protect[0].addShowImage({i:0,x:580,y:40,w:150,h:110,dx:650,dy:30,dw:100,dh:80});
	wall_animal_protect[0].addShowImage({i:0,x:800,y:30,w:105,h:120,dx:850,dy:25,dw:80,dh:90});
	
	//左边的墙壁
	wall_animal_protect[1] = new Fence();
	wall_animal_protect[1].init(['img/roads.png']);
	wall_animal_protect[1].addFrame({i:0, x:368, y:282, width:170, height:260});
	wall_animal_protect[1].setWH(80, 140);
	wall_animal_protect[1].center_x = 0; wall_animal_protect[1].center_y = 140;
	wall_animal_protect[1].setPosition(0, 420);
	wall_animal_protect[1].setRepeatCount(5);
	wall_animal_protect[2] = new Fence();
	wall_animal_protect[2].init(['img/roads.png']);
	wall_animal_protect[2].addFrame({i:0, x:554, y:283, width:230, height:260});
	wall_animal_protect[2].setWH(110, 140);
	wall_animal_protect[2].center_x = 0; wall_animal_protect[2].center_y = 140;
	wall_animal_protect[2].setPosition(wall_animal_protect[1].getWidth()*wall_animal_protect[1].getRepeatCount(), 420);
	wall_animal_protect[2].setRepeatCount(1);
	//右边的墙壁
	wall_animal_protect[3] = new Fence();
	wall_animal_protect[3].init(['img/roads.png']);
	wall_animal_protect[3].addFrame({i:0, x:368, y:282, width:170, height:260});
	wall_animal_protect[3].setWH(80, 140);
	wall_animal_protect[3].center_x = 0; wall_animal_protect[3].center_y = 140;
	//wall_animal_protect[3].setPosition(0, 400);
	wall_animal_protect[3].setRepeatCount(8);
	wall_animal_protect[3].addImage(['img/animals.png']);
	wall_animal_protect[3].addShowImage({i:0,x:0,y:175,w:125,h:155,dx:50,dy:20,dw:70,dh:80});
	wall_animal_protect[3].addShowImage({i:0,x:185,y:175,w:145,h:155,dx:250,dy:20,dw:75,dh:80});
	wall_animal_protect[3].addShowImage({i:0,x:20,y:360,w:110,h:270,dx:480,dy:20,dw:45,dh:80});
	
	wall_animal_protect[4] = new Fence();
	wall_animal_protect[4].init(['img/roads.png']);
	wall_animal_protect[4].addFrame({i:0, x:540, y:570, width:170, height:260});
	wall_animal_protect[4].setWH(80, 140);
	wall_animal_protect[4].center_x = 0; wall_animal_protect[4].center_y = 140;
	//wall_animal_protect[4].setPosition(wall_animal_protect[1].getWidth()*wall_animal_protect[1].getRepeatCount(), 400);
	wall_animal_protect[4].setRepeatCount(1);
	
	//下边的墙
	wall_animal_protect[5] = new Fence();
	wall_animal_protect[5].init(['img/roads.png']);
	wall_animal_protect[5].addFrame({i:0, x:368, y:282, width:175, height:260});
	wall_animal_protect[5].setWH(100, 140);
	wall_animal_protect[5].center_x = 0; wall_animal_protect[5].center_y = 140;
	wall_animal_protect[5].setPosition(0, 0);
	wall_animal_protect[5].setRepeatCount(1);
	
	//wall_animal_protect[5].addImage(['img/animals.png']);
	//wall_animal_protect[5].addShowImage({i:0,x:185,y:175,w:145,h:155,dx:50,dy:20,dw:75,dh:80});
	//wall_animal_protect[5].addShowImage({i:0,x:20,y:360,w:110,h:270,dx:250,dy:20,dw:45,dh:80});
	//wall_animal_protect[5].addShowImage({i:0,x:0,y:0,w:157,h:154,dx:450,dy:20,dw:75,dh:80});
	//wall_animal_protect[5].addShowImage({i:0,x:390,y:30,w:155,h:115,dx:650,dy:20,dw:100,dh:80});
	//wall_animal_protect[5].addShowImage({i:0,x:800,y:30,w:105,h:120,dx:850,dy:25,dw:80,dh:90});

	
	//墙根
	wall_animal_protect[6] = new Fence();
	wall_animal_protect[6].init(['img/roads.png']);
	wall_animal_protect[6].addFrame({i:0, x:190, y:575, width:35, height:155});
	wall_animal_protect[6].setWH(20, 100);
	wall_animal_protect[6].center_x = 0; wall_animal_protect[6].center_y = 100;
	wall_animal_protect[6].setPosition(0, 0);
	wall_animal_protect[6].setRepeatMode(wall_animal_protect[6].REPEAT_Y);
	wall_animal_protect[6].is_reverse = true;
	wall_animal_protect[6].setRepeatCount(7);
	wall_animal_protect[6].setNoShowIndex([3]);
	
	wall_animal_protect[7] = new Fence();
	wall_animal_protect[7].init(['img/roads.png']);
	wall_animal_protect[7].addFrame({i:0, x:190, y:575, width:35, height:155});
	wall_animal_protect[7].setWH(20, 100);
	wall_animal_protect[7].center_x = 0; wall_animal_protect[7].center_y = 100;
	wall_animal_protect[7].setPosition(0, 0);
	wall_animal_protect[7].setRepeatMode(wall_animal_protect[7].REPEAT_Y);
	wall_animal_protect[7].is_reverse = true;
	wall_animal_protect[7].setRepeatCount(9);
	
	
	music_hint = new Audio("music/hint.mp3");
	music_hint.loop = false;
	music_hint.play();
	
	//music_backgorund = new Audio("music/background_music.mp3");
	//music_backgorund.loop = true;
	//music_backgorund.play();
	
	
	
	
	npc_car = new Npc();
	npc_car.init(['img/car.png']);
	npc_car.addFrame({i:0, x:0,y:0,width:395,height:280});
	npc_car.addFrame({i:0, x:405,y:0,width:395,height:280});
	npc_car.setWH(200, 125);
	npc_car.setShowFrameRange(0, 1);
	npc_car.center_x = 0; npc_car.center_y = 110;
	//npc_car.setPosition(100, 600);
	npc_car.setUpdateTime(300);
}