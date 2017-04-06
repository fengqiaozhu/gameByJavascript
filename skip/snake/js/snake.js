var x = 0;
		var y = 0;
		var m,n;//食物位置
		var s_cells = new Array();
		var t;
		var direction = "";
		var score = 0;
		var color = ["ff0000","ff0033","ff0066","ff0099","ff00cc","ff00ff","ff33ff","ff33cc","ff3399","ff3366","ff3333","ff3300","ff6600","ff6633",
		"ff6666","ff6699","ff66cc","ff66ff","ff99ff","ff99cc","ff9999","ff9966","ff9933","ff9900","ffccff","ffcccc","ffcc99","ffcc66","ffcc33",
		"ffcc00","ffff00","ffff33","ffff66","ffff99","ffffcc","ffffff"]
		// 产生随机数，定位snake起始位置和刷新食物的位置；
		function random()
		{
			var num = Math.random()*40;
			num = parseInt(num,10);
			return num;
		}
		
		//刷新食物
		function food(dx,dy)
		{
			document.getElementById("room").rows[dx].cells[dy].style.background = "url(images/food.png) no-repeat center ";
		}

		//判断snake是否咬到自己
		function bite()
		{
			var ddx,ddy;
			for(var i = 0;i<=s_cells.length-1;i++)
			{
				ddx = s_cells[i][0];
				ddy = s_cells[i][1];
				if (x==ddx && ddy==y)
				{
					alert("GAME OVER!")
					return false;
				}
			}
		}

		//snake身体:数组s_cells();
		//整个吃的过程分三个部分，头、尾、加长;
		//即对数组s_cells()进行 删除、添加;
		function snake_body_add()
		{
			var insert = s_cells.splice(0,0,[x,y]);
		}
		function snake_body_remove()
		{
			var delet_ = s_cells.splice(s_cells.length-1,1);

		}

		//判断是否吃食了，如果吃了就加长，如果没有，就继续游走
		function eat_or_not()
		{
			var obj = document.getElementById("room").rows[y].cells[x];//获取当前td的背景色，进行判断是否有食物
			var style = null;
			if (window.getComputedStyle) 
			{
				style = window.getComputedStyle(obj,null); //非IE
			}else
			{
				style = obj.currentStyle;  //IE
			}
			var bg = style.backgroundColor;

			if (bg == "rgb(255, 255, 255)") //如果背景色为白色，那么就没有食物，继续前行
			{
				if (s_cells.length>1)
				{snake_body_remove();}
				snake_body_add();	
			}else
			{
				// 如果有食物，就将snake加长，并且刷新食物
				document.getElementById("room").rows[y].cells[x].background = "";
				snake_body_add();
				m = random();
				n = random();
				food(m,n);
				score +=10
				console.log("得分为："+score);	
			}
		}
		//自动浮游
		function auto_swim_right()
		{
			x++;
			bite();
			if (x>39) 
				{
					alert("GAME OVER!")
					return false;
				}	
			eat_or_not();
			move();	
			t = setTimeout(arguments.callee, 200);
		}
		function auto_swim_left()
		{
			x--;
			bite();
			if (x<0) 
				{
					alert("GAME OVER!")
					return false;
				}
			eat_or_not();
			move();
			t = setTimeout(arguments.callee, 200);
		}
		function auto_swim_up()
		{
			y--;
			bite();
			if (y<0) 
				{
					alert("GAME OVER!")
					return false;
				}
			eat_or_not();
			move();
			t = setTimeout(arguments.callee, 200);
		}

		function auto_swim_down()
		{
			y++;
			bite();
			if (y>39) 
				{
					alert("GAME OVER!")
					return false;
				}
			eat_or_not();
			move();
			t = setTimeout(arguments.callee, 200);
		}


		//清除定时器
		function clear(time)
		{
			clearTimeout(time);
		}
		

		//描画snake身体;
		//即给table填充颜色;
		function move()
		{
			for(var j = 0;j<=39;j++)   //刷新整个room
			{
				for(var k = 0;k<=39;k++)
				{
					if(j == m && k == n)//对食物所在的td进行忽略
					{
					}else
					{
						document.getElementById("room").rows[j].cells[k].style.background = "";
					}
				}
			}

			for(var i = 0;i<s_cells.length;i++)//对数组s_cells进行遍历，将snake显示出来
			{
				var a = s_cells[i][0];
				var b = s_cells[i][1];
				if(i>36){
					document.getElementById("room").rows[b].cells[a].style.background = "#"+color[72-i];
				}
				else{
					document.getElementById("room").rows[b].cells[a].style.background = "#"+color[i];
				}
			}
		}

		//设置snake起始位置
		window.onload = function()
		{
			x = random();
			y = random();
			m = random();
			n = random();
			snake_body_add();
			move();
			food(m,n);
		}

		//按键操作触发
		document.onkeydown = function(event)
		{
			var e = event||window.event||arguments.callee.caller.arguments[0];
				switch(e.keyCode)
				{
					case 37:   //left
						if (direction !="dir_x_r")
						{
							direction = "dir_x_l";//给按键响应添加方向标记，避免snake回头；
							clear(t);
							auto_swim_left();
						}
						break;
						
					case 38:   //up
						if (direction !="dir_y_d") 
						{
							direction = "dir_y_u";//给按键响应添加方向标记，避免snake回头；
							clear(t);
							auto_swim_up();
						}
						break;
					case 39:  //right
						if (direction != "dir_x_l")
						{
							direction = "dir_x_r";//给按键响应添加方向标记，避免snake回头；
							clear(t);
							auto_swim_right();
						}
						break;
					case 40:   //down
						if (direction != "dir_y_u") 
						{
							direction = "dir_y_d";//给按键响应添加方向标记，避免snake回头；
							clear(t);
							auto_swim_down();
						}
						break;
					default:
						break;
				}
		}