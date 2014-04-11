var mouse_x = 0; //x coordination of mouse
var mouse_y = 0; //y coordination of mouse
var dir = ""; //n/s/w/e/ne/nw/se/sw direction
var o_width = 0;
var o_height = 0;

//mouse is down
function resize(e)
{
	e.stopPropagation();
	e.preventDefault();

	console.log("Resizing");

	dir = e.target.id;
	mouse_x = e.clientX;
	mouse_y = e.clientY;

	console.log("direction is " + dir + " mouse_x is " + mouse_x + ", mouse_y is " + mouse_y);

	var display_large = document.getElementById('display_large'); //div
	var image = document.getElementById('image'); //img

	//diff_x = display_large.offsetLeft - e.clientX;
	//diff_y = display_large.offsetTop - e.clientY;

	o_width = image.offsetWidth;
	o_height = image.offsetHeight;

	if(dir.indexOf('n') >= 0) //n direction
	{
		console.log("offsetTop " + display_large.offsetTop);
		console.log("offsetHeight " + display_large.offsetTop);

	}
}