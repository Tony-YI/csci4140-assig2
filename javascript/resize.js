var original_mouse_x = 0; //x coordination of mouse
var original_mouse_y = 0; //y coordination of mouse
var dir = ""; //n/s/w/e/ne/nw/se/sw direction
var o_width = 0;
var o_height = 0;

//mouse is down
function resize_mouse_down(e)
{
	e.stopPropagation();
	e.preventDefault();

	console.log("Resizing");

	dir = e.target.id;
	original_mouse_x = e.clientX;
	original_mouse_y = e.clientY;

	console.log("direction is " + dir + " original_mouse_x is " + original_mouse_x + ", original_mouse_y is " + original_mouse_y);

	var display_large = document.getElementById('display_large'); //div
	var image = document.getElementById('image'); //img
	o_width = image.offsetWidth;
	o_height = image.offsetHeight;

	if(dir.indexOf('n') >= 0) //n direction
	{
		//console.log("offsetTop " + display_large.offsetTop);
		//console.log("offsetHeight " + display_large.offsetHeight);
		if(display_large.offsetBottom) //already exist this style
		{
			display_large.style.bottom = display_large.offsetBottom + 'px';
		}
		else
		{
			display_large.style.bottom = (window.innerHeight - display_large.offsetHeight - display_large.offsetTop) + 'px';
		}

		display_large.style.top = 'auto';
		display_large.style.height = 'auto';
	}

	if(dir.indexOf('w') >= 0) //w direction
	{
		if(display_large.offsetRight) //already exist this style
		{
			display_large.style.right = display_large.offsetRight + 'px';
		}
		else
		{
			display_large.style.right = (window.innerWidth - display_large.offsetWidth - display_large.offsetLeft) + 'px';
		}

		display_large.style.left = 'auto';
		display_large.style.width = 'auto';
	}

	if(dir.indexOf('e') >= 0) //e direction
	{
		if(display_large.offsetLeft)
		{
			display_large.style.left = display_large.offsetLeft + 'px';
		}
		else
		{
			display_large.style.left = (window.innerWidth - display_large.offsetWidth - display_large.offsetRight) + 'px';
		}

		display_large.style.right = 'auto';
		display_large.style.width = 'auto';
	}

	if(dir.indexOf('s') >= 0) //s direction
	{
		if(display_large.offsetTop)
		{
			display_large.style.top = display_large.offsetTop + 'px';
		}
		else
		{
			display_large.style.top = (window.innerHeight - display_large.offsetHeight - display_large.offsetBottom) + 'px';
		}
		display_large.style.bottom = 'auto';
		display_large.style.height = 'auto';
	}

	display_large.addEventListener("mousemove", resize_mouse_move, false);
	display_large.addEventListener("mouseup", resize_mouse_up, false);
	document.addEventListener("mousemove", resize_mouse_move, false);
	document.addEventListener("mouseup", resize_mouse_up, false);
	window.addEventListener("mousemove", resize_mouse_move, false);
	window.addEventListener("mouseup", resize_mouse_up, false);
}

function resize_mouse_move(e)
{
	e.stopPropagation();
	e.preventDefault();

	var current_mouse_x = e.clientX;
	var current_mouse_y = e.clientY;

	var display_large = document.getElementById('display_large'); //div
	var image = document.getElementById('image'); //img

	if(dir == 'nw')
	{
		image.style.width = (o_width + (original_mouse_x - current_mouse_x)) + 'px';
		image.style.height = (o_height + (original_mouse_y - current_mouse_y)) + 'px';
	}
	if(dir == 'n')
	{
		image.style.width = o_width;
		image.style.height = (o_height + (original_mouse_y - current_mouse_y)) + 'px';
	}
	if(dir == 'ne')
	{
		image.style.width = (o_width + (current_mouse_x - original_mouse_x)) + 'px';
		image.style.height = (o_height + (original_mouse_y - current_mouse_y)) + 'px';
	}
	if(dir == 'w')
	{
		image.style.height = o_height;
		image.style.width = (o_width + (original_mouse_x - current_mouse_x)) + 'px';
	}
	if(dir == 'e')
	{
		image.style.height = o_height;
		image.style.width = (o_width + (current_mouse_x - original_mouse_x)) + 'px';
	}
	if(dir == 'sw')
	{
		image.style.width = (o_width + (original_mouse_x - current_mouse_x)) + 'px';
		image.style.height = (o_height + (current_mouse_y - original_mouse_y)) + 'px';
	}
	if(dir == 's')
	{
		image.style.width = o_width;
		image.style.height = (o_height + (current_mouse_y - original_mouse_y)) + 'px';
	}
	if(dir == 'se')
	{
		image.style.width = (o_width + (current_mouse_x - original_mouse_x)) + 'px';
		image.style.height = (o_height + (current_mouse_y - original_mouse_y)) + 'px';
	}

	console.log("resize_mouse_move: " + dir);
}

function resize_mouse_up(e)
{
	e.stopPropagation();
	e.preventDefault();

	console.log("Finish resizing");

	var display_large = document.getElementById('display_large'); //div
	var image = document.getElementById('image'); //img

	//remove event listener
	display_large.removeEventListener("mousemove", resize_mouse_move, false);
	display_large.removeEventListener("mouseup", resize_mouse_up, false);
	document.removeEventListener("mousemove", resize_mouse_move, false);
	document.removeEventListener("mouseup", resize_mouse_up, false);
	window.removeEventListener("mousemove", resize_mouse_move, false);
	window.removeEventListener("mouseup", resize_mouse_up, false);

	dir = "";
	original_mouse_x = 0;
	original_mouse_y = 0;
}