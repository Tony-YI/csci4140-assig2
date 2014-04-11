var mouse_x = 0;
var mouse_y = 0;
var dir = ""; //n/s/w/e/ne/nw/se/sw
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

	var image_large = document.getElementById('image_large'); //td
	var image = document.getElementById('image'); //img

	//diff_x = image_large.offsetLeft - e.clientX;
	//diff_y = image_large.offsetTop - e.clientY;

	o_width = image.offsetWidth;
	o_height = image.offsetHeight;

	if(dir.indexOf('n')) //n direction
	{
		console.log("offsetTop " + image_large.offsetTop);
		console.log("offsetHeight " + image_large.offsetTop);

	}
}