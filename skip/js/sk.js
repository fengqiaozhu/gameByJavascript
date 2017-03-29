//第一次的思路出现问题,用了p标签作为砖块,发现一个问题:砖块的摆放需要很精确的计算,计算量大,并且拼凑太多,所以弃用

	var board = document.getElementById("board");//获取board对象
	var board_w = window.getComputedStyle(board,null);//获取board的样式
	
	var ball = document.getElementById("ball");//获取board对象
	var ball_w = window.getComputedStyle(ball,null);//获取board的样式
	
	var ball_l = [0,0,0,0];//将小球的位置放入数组ball_l中;
	
	var last_left;//用于计算速度
	var t1,t2,t3;//计时器
	var sp_x = 5;//小球运动水平速度
	var sp_y = 5;//垂直速度
	
	var arr_block = new Array();//砖块数组，用来显示砖块以及统计桌面上的砖块
	var bA_w = 800;//游戏窗口宽
	var bA_h = 600;//游戏窗口高

	var b_height = 40;//砖块高
	var b_width = 100;//砖块宽

	var board_height = 20;//下方板高

	var ball_width = 20;//小球宽
	var ball_height = 20;//小球高
	
	var g_level = 1;

document.onkeydown = function(event) //键盘控制下方板的左右移动；
{	
	var board_left = board_w.left;
	var e = event||window.event||arguments.callee.caller.arguments[0];
	function edge()//获取边界
	{

	}
	switch(e.keyCode)
	{
		case 37:
			board.style.left = (parseFloat(board_left) - 30)+"px";//调节下方板的移动速度
			break;
		case 39:
			board.style.left = (parseFloat(board_left) + 30)+"px";
			break;
		default:
			break;
	}
	var speed = Math.abs((parseFloat(board_left)-parseFloat(last_left)))/5;//计算下方板的移动速度
	console.log(speed);
}



window.onload = function()//每500ms更新一次下方板的当前位置
{
	last_left = board_w.left;
	setTimeout(arguments.callee, 500);
}




function auto_move()//自动弹跳+获取小球实时的位置+判断小球是否被接住了；
{
	var b_b = parseInt(ball_w.bottom);//小球的位置
	var b_l = parseInt(ball_w.left);
	var b_r = parseInt(ball_w.right);
	var b_t = parseInt(ball_w.top);
	
	var d_b = parseInt(board_w.bottom);//板的位置
	var d_l = parseInt(board_w.left);
	var d_r = parseInt(board_w.right);
	var d_t = parseInt(board_w.top);
	
	var ball_row;
	var ball_line;
	if (b_r<=0) 
	{
		sp_x = -1*sp_x; 
	}
	if (b_t<=0) 
	{
		sp_y = -1*sp_y; 
	}
	if (b_l<=0) 
	{
		sp_x = -1*sp_x; 
	}
	if (b_b<=0) 
	{
		alert("GameOver!");
		return false; 
	}
	ball.style.bottom = (b_b + sp_y)+"px";
	ball.style.left = (b_l +sp_x)+"px";
	
	if(b_b <= board_height && (b_l>=d_l && b_r>=d_r))//判断小球是否被接住了;
	{
		ball.style.bottom = b_b + 5 +"px";
		sp_y = -1*sp_y;
//		clearTimeout(t1);
//		auto_move();
	}
	t1 = setTimeout(arguments.callee, 30);//调节小球移动速度
	ball_l.splice(0,1,b_t);//向数组block_l中实时更新小球的位置；
	ball_l.splice(1,1,b_r);
	ball_l.splice(2,1,b_b);
	ball_l.splice(3,1,b_l);	
	
	if(parseInt(b_l/b_width) + parseInt(b_r/b_width) == 7)//获取小球所在列
	{
		ball_row = parseInt(b_l/100)+1
	}else{
		if(sp_x>0)
		{
			ball_row = parseInt(b_l/100)+2;
		}
		else
		{
			ball_row = parseInt(b_l/100)+1;
		}
//		if(b_width-b_l%b_width>=b_width-b_r%100)
//		{
//			ball_row = parseInt(b_l/100)+1;
//		}
//		else{
//			ball_row = parseInt(b_l/100)+2;
//		}
	}
	
	
	if(b_b>bA_h-b_height*7)//判断小球属于哪一行
	{
		if(parseInt(b_t/b_height) + parseInt((b_b-(bA_h-b_height*7))/b_height) == 6)//小球刚好在行内
		{
			ball_line = parseInt(b_t/b_height)+1;
		}
		else{//小球在两行中间时，判断小球属于哪一行
			if(b_height-b_t%b_height>b_height-(b_b-(bA_h-b_height*7))%b_height)
			{
				ball_line = parseInt(b_t/b_height)+1;
			}
			else{
				ball_line = parseInt(b_t/b_height)+2;
			}
		}
	}else 
	{
		if(b_b >= bA_h-b_height*7-ball_height)
		{
			ball_line = 7;
		}
	}
	
	
	if(ball_line != null)
	{
		for(var j=0;j< arr_block.length;j++)
		{
			if(b_t%b_height==0 && b_t != b_height*7 && sp_y>0)//小球上边碰撞到砖块的下边
			{
				if(arr_block[j][0]==ball_line-1 && arr_block[j][1]==ball_row)
				{
					ball.style.bottom = b_b - 5 +"px";
					sp_y = -1*sp_y;
					document.getElementById("cell_"+(ball_line-1)+"_"+ball_row).style.background = "none";
					arr_block.splice(j,1);
				}
			}
			else if(b_t == b_height*7 && sp_y>0)
			{
				if(arr_block[j][0]==ball_line && arr_block[j][1]==ball_row)
				{
					ball.style.bottom = b_b - 5 +"px";
					sp_y = -1*sp_y;
					document.getElementById("cell_"+ball_line+"_"+ball_row).style.background = "none";
					arr_block.splice(j,1);
				}
			}
			else if(b_b%b_height==0 && sp_y<0)//小球下边碰到砖块上边
			{
				if(arr_block[j][0]==ball_line+1 && arr_block[j][1]==ball_row)
				{
					ball.style.bottom = b_b + 5 +"px";
					sp_y = -1*sp_y;
					document.getElementById("cell_"+(ball_line+1)+"_"+ball_row).style.background = "none";
					arr_block.splice(j,1);
				}
			}
			else if(b_l%b_width ==0 && sp_x < 0)//小球左边碰到砖块右边
			{
				if(arr_block[j][0]==ball_line && arr_block[j][1]==ball_row-1)
				{
					ball.style.left = b_l + 5 +"px";
					sp_x = -1*sp_x;
					document.getElementById("cell_"+ball_line+"_"+(ball_row-1)).style.background = "none";
					arr_block.splice(j,1);
				}
			}
			else if(b_r%b_width ==0 && sp_x>0)//小球右边边碰到砖块左边
			{
				if(arr_block[j][0]==ball_line && arr_block[j][1]==ball_row+1)
				{
					ball.style.left = b_l - 5 +"px";
					sp_x = -1*sp_x;
					document.getElementById("cell_"+ball_line+"_"+(ball_row+1)).style.background = "none";
					arr_block.splice(j,1);
				}
			}
		}
	}
}
//布置关卡


function level()//第一关
{
	document.getElementById("l_num").innerHTML = g_level;
	var tds = document.getElementsByTagName("td");
	for (var m = 0;m<tds.length;m++) {
		tds[m].style.background = "none";
	}
	switch (g_level)
	{
		case 1:
            arr_block = [];
            for(var i=1;i<=7;i++)
            {
                for(var j=1;j<=8;j++)
                {
                    document.getElementById("cell_"+i+"_"+j).style.background = "url(img/block.png) no-repeat";
                    arr_block.push([i,j]);
                }
            }
            break;
		case 2:
            arr_block = [];
			for (var i=1;i<=7;i++)
			{
				if(i<=4)
				{
                    for(var j= 5-i;j<5+i;j++)
                    {
                        document.getElementById("cell_"+i+"_"+j).style.background = "url(img/block.png) no-repeat";
                        arr_block.push([i,j]);
                    }
				}
				else {
					for(var j = i-3;j< 13-i;j++)
					{
                        document.getElementById("cell_"+i+"_"+j).style.background = "url(img/block.png) no-repeat";
                        arr_block.push([i,j]);
					}
				}
			}
	}
    g_level += 1;
}

