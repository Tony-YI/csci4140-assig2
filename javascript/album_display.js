//mouse is moved on the image slot
function img_slot_mouse_on(e)
{
	e.preventDefault();
	e.stopPropagation();

	window.clearInterval(periodic); //remove the periodic update function

	//console.log(e.type +": "+ e.target);
	e.target.children[0].style.display = "inline";
	e.target.children[1].style.display = "inline";
	e.target.children[2].children[0].style.border = "2px solid red";
	return null;
}

//mouse is move out the image slot
function img_slot_mouse_off(e)
{
	e.preventDefault();
	e.stopPropagation();

	console.log('aaaaaaaa');

	periodic = window.setInterval(update_img, 5000);

	//console.log(e.type +": "+ e.target);
	e.target.children[0].style.display = "none";
	e.target.children[1].style.display = "none";
	e.target.children[2].children[0].style.border = "0px";
	return null;
}

//mouse click on the edit
function edit_click(e)
{
	e.preventDefault();
	e.stopPropagation();

	console.log("EDIT is clicked.");

	var parent = e.target.parentNode;
	var img = parent.children[2].children[0];
	var file_name = img.getAttribute('file_name'); //filename is the attribute predefined	

	var img_des = window.prompt("Please enter the new description here. Should be less than 50 characters.");

	if(img_des == null)
	{
		console.log("Edit image description canceled.");
		return;
	}

	//new image description is not empty
	console.log("New image description is received: " + img_des);

	//replace the special characters
	var final_img_des = new String;
	for(var i = 0; i < 50 && i < img_des.length; i++)
	{
		final_img_des += img_des[i];
	}

	//final_img_des = final_img_des.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
	console.log("New description converted: " + final_img_des);

	//send to the server
	var xhr = new XMLHttpRequest();

	xhr.open('POST', './update_description.php', true); //true means AJAX, open a connection to this php file

	xhr.setRequestHeader('img_des', final_img_des);
	xhr.setRequestHeader('file_name', file_name);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //this is required in order to pretend to be a form submittion

	xhr.send(); //send the XHR to the server

	//deal with the data received from server
	xhr.onreadystatechange = function()
	{
		if(xhr.status == 200 && xhr.readyState == 4) //200OK and send XHR successfully
		{
			console.log("XHR response: " + xhr.responseText);

			try
			{
				var response = JSON.parse(xhr.responseText);
			}
			catch(e)
			{
				console.log(e);
				return; //exit the function
			}

			update_img();

			console.log("File Name: " + response.file_name);
			console.log("MYSQL ERROR: " + response.mysql_error);

			if(response.file_name)
			{
				document.getElementById('file_name').innerHTML = 'File Name: '+response.file_name;
			}
			else //clear the old data
			{
				document.getElementById('file_name').innerHTML = null;
			}
			if(response.file_type_flag)
			{
				document.getElementById('file_type_flag').innerHTML = 'File Type Flag: '+response.file_type_flag;
			}
			else
			{
				document.getElementById('file_type_flag').innerHTML = null;
			}
			if(response.file_size_flag)
			{
				document.getElementById('file_size_flag').innerHTML = 'File Size Flag: '+response.file_size_flag;
			}
			else
			{
				document.getElementById('file_size_flag').innerHTML = null;
			}
			if(response.mysql_error)
			{
				document.getElementById('mysql_error').innerHTML = 'MYSQL Error Flag: '+response.mysql_error;
			}
			else
			{
				document.getElementById('mysql_error').innerHTML = null;
			}
			if(response.file_exist_flag)
			{
				document.getElementById('file_exist_flag').innerHTML = 'File Existance Flag: '+response.file_exist_flag;
			}
			else
			{
				document.getElementById('file_exist_flag').innerHTML = null;
			}
		}
	};
}

//mouse click on the edit
function delete_click(e)
{
	e.preventDefault();
	e.stopPropagation();

	console.log("DELETE is clicked.");

	var parent = e.target.parentNode;
	var img = parent.children[2].children[0];
	var file_name = img.getAttribute('file_name'); //filename is the attribute predefined	

	var delete_option = window.confirm("Are you sure to DELETE this image?");

	console.log("delete_option: " + delete_option);

	if(!delete_option)
	{
		console.log("delete_option: Cancel");
		return;
	}

	console.log("delete_option: OK");

	//send xhr to the server
	var xhr = new XMLHttpRequest();

	xhr.open('POST', './delete_image.php', true); //true means AJAX, open a connection to this php file

	xhr.setRequestHeader('file_name', file_name);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //this is required in order to pretend to be a form submittion

	xhr.send(); //send the XHR to the server

	//deal with the data received from server
	xhr.onreadystatechange = function()
	{
		if(xhr.status == 200 && xhr.readyState == 4) //200OK and send XHR successfully
		{
			console.log("XHR response: " + xhr.responseText);

			try
			{
				var response = JSON.parse(xhr.responseText);
			}
			catch(e)
			{
				console.log(e);
				return; //exit the function
			}

			update_img();

			console.log("File Name: " + response.file_name);
			console.log("MYSQL ERROR: " + response.mysql_error);

			if(response.file_name)
			{
				document.getElementById('file_name').innerHTML = 'File Name: '+response.file_name;
			}
			else //clear the old data
			{
				document.getElementById('file_name').innerHTML = null;
			}
			if(response.file_type_flag)
			{
				document.getElementById('file_type_flag').innerHTML = 'File Type Flag: '+response.file_type_flag;
			}
			else
			{
				document.getElementById('file_type_flag').innerHTML = null;
			}
			if(response.file_size_flag)
			{
				document.getElementById('file_size_flag').innerHTML = 'File Size Flag: '+response.file_size_flag;
			}
			else
			{
				document.getElementById('file_size_flag').innerHTML = null;
			}
			if(response.mysql_error)
			{
				document.getElementById('mysql_error').innerHTML = 'MYSQL Error Flag: '+response.mysql_error;
			}
			else
			{
				document.getElementById('mysql_error').innerHTML = null;
			}
			if(response.file_exist_flag)
			{
				document.getElementById('file_exist_flag').innerHTML = 'File Existance Flag: '+response.file_exist_flag;
			}
			else
			{
				document.getElementById('file_exist_flag').innerHTML = null;
			}
		}
	};
}

//mouse click then show the image
function img_click(e)
{
	e.preventDefault();
	e.stopPropagation();

	console.log("IMAGE is clicked.");

	var file_name = e.target.getAttribute('file_name');
	var img_path = e.target.getAttribute('path');
	var img_width = e.target.getAttribute('img_width');
	var img_height = e.target.getAttribute('img_height');

	var image_background = document.createElement('div');
	image_background.id = 'image_background';
	image_background.addEventListener("click", cancle_image_large, false);

	var display_large = document.createElement('div');
	display_large.id = 'display_large';

	var table = document.createElement('table');
	table.id = ('table');

	//row 1 of table
	var row_1 = document.createElement('tr');
	var nw = document.createElement('td');
	nw.id = 'nw';
	nw.addEventListener("mousedown", resize_mouse_down, false);
	var n = document.createElement('td');
	n.id = 'n';
	n.addEventListener("mousedown", resize_mouse_down, false);
	var ne = document.createElement('td');
	ne.id = 'ne';
	ne.addEventListener("mousedown", resize_mouse_down, false);
	row_1.appendChild(nw);
	row_1.appendChild(n);
	row_1.appendChild(ne);

	//row 2 of table
	var row_2 = document.createElement('tr');
	var w = document.createElement('td');
	w.id = 'w';
	w.addEventListener("mousedown", resize_mouse_down, false);

	var image_large = document.createElement('td');
	image_large.id = 'image_large';
	var img = document.createElement('img');
	img.id = 'image';
	img.src = img_path;
	img.addEventListener("mousedown", image_mouse_down, false);

	var com_width = window.innerWidth * 0.6;
	var com_height = window.innerHeight * 0.6;
	var final_width = 0;
	var final_height = 0;

	if(img_width <= com_width && img_height <= com_height) //no need to resize_mouse_down
	{
		final_width = img_width;
		final_height = img_height;
	}

	if(img_width <= com_width && img_height > com_height) //set height as reference
	{
		final_width = com_height;
		final_height = img_width / (img_height / com_height);
	}

	if(img_width > com_width && img_height <= com_height) //set width as reference
	{
		final_width = com_width;
		final_height = img_height / (img_width / com_width);
	}

	if(img_width > com_width && img_height > com_height)
	{
		var temp_width = img_width;
		var temp_height = img_height;
		while(temp_width > com_width || temp_height > com_height)
		{
			temp_width /= 2;
			temp_height /= 2;
		}

		final_width = temp_width;
		final_height = temp_height;
	}

	img.style.width = final_width + "px";
	img.style.height = final_height + "px";

	img.setAttribute('img_width', img_width);
	img.setAttribute('img_height', img_height);

	display_large.style.left = (window.innerWidth - final_width)/2 - 33/2 + "px"; //33 is achieve by "eyes"
	display_large.style.top = (window.innerHeight - final_height)/2 - 33/2 + "px"; //33 is achieve by "eyes"
	
	
	image_large.appendChild(img);

	var e = document.createElement('td');
	e.id = 'e';
	e.addEventListener("mousedown", resize_mouse_down, false);
	row_2.appendChild(w);
	row_2.appendChild(image_large);
	row_2.appendChild(e);

	//row 3 of table
	var row_3 = document.createElement('tr');
	var sw = document.createElement('td');
	sw.id = 'sw';
	sw.addEventListener("mousedown", resize_mouse_down, false);
	var s = document.createElement('td');
	s.id = 's';
	s.addEventListener("mousedown", resize_mouse_down, false);
	var se = document.createElement('td');
	se.id = 'se';
	se.addEventListener("mousedown", resize_mouse_down, false);
	row_3.appendChild(sw);
	row_3.appendChild(s);
	row_3.appendChild(se);

	table.appendChild(row_1);
	table.appendChild(row_2);
	table.appendChild(row_3);

	display_large.appendChild(table);

	document.getElementById('anchor').appendChild(image_background);
	document.getElementById('anchor').appendChild(display_large);

	try
	{
		document.body.addEventListener("onmousewheel", disable, false);
		console.log('heh1');
	}
	catch(error)
	{
		console.log("Scrolling: " + err);
	}
	try
	{
		document.body.addEventListener("DOMMouseScroll", disable, false);
		console.log('heh2');
	}
	catch(error)
	{
		console.log("Scrolling: " + err);
	}
}

var diff_x = 0;
var diff_y = 0;
function image_mouse_down(e)
{
	e.stopPropagation();
	e.preventDefault();

	console.log('image_mouse_down');

	var display_large = document.getElementById('display_large');
	
	display_large.addEventListener("mousemove", image_mouse_move, false);
	display_large.addEventListener("mouseup", image_mouse_up, false);
	document.addEventListener("mousemove", image_mouse_move, false);
	document.addEventListener("mouseup", image_mouse_up, false);
	window.addEventListener("mousemove", image_mouse_move, false);
	window.addEventListener("mouseup", image_mouse_up, false);

	diff_x = display_large.offsetLeft - e.clientX;
	diff_y = display_large.offsetTop - e.clientY;
}

function image_mouse_move(e)
{
	e.stopPropagation();
	e.preventDefault();

	console.log('image_mouse_move');

	var display_large = document.getElementById('display_large');

	//using diff_x or diff_y is because we can't use display_large.offset* in mousemove event
	if(e.clientX + diff_x > 0 && e.clientX + diff_x < (window.innerWidth - display_large.offsetWidth))
	{
		display_large.style.left = (e.clientX + diff_x) + 'px';
	}
	else if(e.clientX + diff_x < 0)
	{
		display_large.style.left = '0px';
	}
	else if(e.clientX + diff_x > window.innerWidth - display_large.offsetWidth)
	{
		display_large.style.left = (window.innerWidth - display_large.offsetWidth) + 'px';
	}

	if(e.clientY + diff_y > 0 && e.clientY + diff_y < (window.innerHeight - display_large.offsetHeight))
	{
		display_large.style.top = (e.clientY + diff_y) + 'px';
	}
	else if(e.clientY + diff_y < 0)
	{
		display_large.style.top = '0px';
	}
	else if(e.clientY + diff_y > window.innerHeight - display_large.offsetHeight)
	{
		display_large.style.top = (window.innerHeight - display_large.offsetHeight) + 'px';
	}
}

function image_mouse_up(e)
{
	e.stopPropagation();
	e.preventDefault();

	console.log('image_mouse_up');

	//remove event listener
	display_large.removeEventListener("mousemove", image_mouse_move, false);
	display_large.removeEventListener("mouseup", image_mouse_up, false);
	document.removeEventListener("mousemove", image_mouse_move, false);
	document.removeEventListener("mouseup", image_mouse_up, false);
	window.removeEventListener("mousemove", image_mouse_move, false);
	window.removeEventListener("mouseup", image_mouse_up, false);
}

//disable_scroll is predefined, we can't use it 
function disable(e)
{
	alert("Scrolling");

	e.stopPropagation();
	e.preventDefault();

	console.log("Scrolling");
}

function cancle_image_large(e)
{
	e.stopPropagation();
	e.preventDefault();

	try
	{
		document.body.removeEventListener("onmousewheel", disable, false);
	}
	catch(error)
	{
		console.log("Cancel image_large: " + error);
	}

	try
	{
		document.body.removeEventListener("DOMMouseScroll", disable, false);
	}
	catch(error)
	{
		console.log("Cancel image_large: " + error);
	}

	document.getElementById('anchor').removeChild(document.getElementById('display_large'));
	document.getElementById('anchor').removeChild(document.getElementById('image_background'));
}

//init the height of the page
function update_page_height()
{
	var num_of_image = document.getElementsByClassName("image");
	var display_height = document.getElementById("display");
	display_height.style.height = Math.ceil(num_of_image.length / 4) * 210 + "px";
}

//update album after upload
/*
<div id="display">
	<div class="img_slot">
		<img class="edit"/>
		<img class="delete">
		<div class="img">
			<img/>
		</div>
	</div>

	<div class="img_slot">
		<img class="edit"/>
		<img class="delete">
		<div class="img">
			<img/>
			<p/>
		</div>
	</div>
	.
	.
	.
</div>
*/

function update_img()
{
	console.log("Update image.");

	var xhr = new XMLHttpRequest();
	xhr.open('GET', './album_display.php', true); //true means AJAX

	//no need to send anything to server

	xhr.send();

	//deal whih the data send back from server

	xhr.onreadystatechange = function()
	{
		if(xhr.status == 200 && xhr.readyState == 4) //200OK and send XHR successfully
		{
			console.log("XHR response: " + xhr.responseText);

			try
			{
				var response = JSON.parse(xhr.responseText);
			}
			catch(e)
			{
				console.log(e);
				return; //exit the function
			}

			//remove all the old element
			document.getElementById("display").innerHTML = "";

			//dynamicaly generate html
			for(var i = 0; i < response.length; i++)
			{
				var img_slot = document.createElement("div");
				img_slot.className = "img_slot";
				img_slot.addEventListener("mouseenter", img_slot_mouse_on, false);//false means top-down.
				img_slot.addEventListener("mouseleave", img_slot_mouse_off, false);

				var _edit = document.createElement("img");
				_edit.className = "edit";
				_edit.src = "./img/edit.png";
				_edit.addEventListener("click", edit_click, false);

				var _delete = document.createElement("img");
				_delete.className = "delete";
				_delete.src = "./img/delete.png"
				_delete.addEventListener("click", delete_click, false);

				var img = document.createElement("div");
				img.className = "img";
	
				var image = document.createElement("img");
				image.className = "image";
				image.src = response[i].shortcut_path;
				image.setAttribute("file_name", response[i].file_name);
				image.setAttribute("title", response[i].img_description);
				image.setAttribute("path", response[i].img_path);
				image.setAttribute("img_width", response[i].img_width);
				image.setAttribute("img_height", response[i].img_height);
				image.addEventListener("click", img_click, false);

				var name = document.createElement("p");
				name.className = "name";
				name.innerHTML = response[i].file_name;

				document.getElementById('display').appendChild(img_slot);
				img_slot.appendChild(_edit);
				img_slot.appendChild(_delete);
				img_slot.appendChild(img);
				img.appendChild(image);
				img.appendChild(name);
			}

			update_page_height();
			

			console.log("MYSQL ERROR: " + response.mysql_error);
		}
	};
}