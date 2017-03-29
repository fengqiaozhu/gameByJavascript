
	
	var board = document.getElementById("board");//获取board对象
	var board_w = window.getComputedStyle(board,null);//获取board的样式

	var ball = document.getElementById("ball");//获取board对象
	var ball_w = window.getComputedStyle(ball,null);//获取board的样式

	var last_left;//用于计算速度
	var t1,t2,t3;//计时器
	var sp_x = 5;
	var sp_y = 3;

document.onkeydown = function(event) //控制下方板的左右移动；
{	
	
	var board_left = board_w.left;
	var e = event||window.event||arguments.callee.caller.arguments[0];
	function edge()//获取边界
	{

	}
	
	switch(e.keyCode)
	{
		case 37:
			board.style.left = (parseFloat(board_left) - 15)+"px";
			break;
		case 39:
			board.style.left = (parseFloat(board_left) + 15)+"px";
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
	// console.log(last_left);
	setTimeout(arguments.callee, 500);
}




function auto_move()
{
	var b_top = parseFloat(ball_w.bottom);
	var b_left = parseFloat(ball_w.left);
	if (parseFloat(ball_w.right)<=0) 
	{
		// ball.style.right = "0px";
		sp_x = -1*sp_x; 
	}
	if (parseFloat(ball_w.top)<=0) 
	{
		// ball.style.right = "0px";
		sp_y = -1*sp_y; 
	}
	if (parseFloat(ball_w.left)<=0) 
	{
		// ball.style.right = "0px";
		sp_x = -1*sp_x; 
	}
	if (parseFloat(ball_w.bottom)<=0) 
	{
		// ball.style.right = "0px";
		sp_y = -1*sp_y; 
	}
	ball.style.bottom = (b_top + sp_y)+"px";
	ball.style.left = (b_left +sp_x)+"px";
	setTimeout(arguments.callee, 10);
	console.log(parseFloat(ball_w.right));
}


//碰撞

function against()
{
	var disp = document.body.clientWidth;
	console.log(disp);
	
}