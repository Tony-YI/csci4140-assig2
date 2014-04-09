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
		</div>
	</div>
	.
	.
	.
</div>
*/
//mouse is moved on the image slot
function img_slot_mouse_on(e)
{
	e.preventDefault();
	e.stopPropagation();

	//console.log(e.type +": "+ e.target);
	e.target.children[0].style.display = "inline";
	e.target.children[1].style.display = "inline";
	return null;
}

//mouse is move out the image slot
function img_slot_mouse_off(e)
{
	e.preventDefault();
	e.stopPropagation();

	//console.log(e.type +": "+ e.target);
	e.target.children[0].style.display = "none";
	e.target.children[1].style.display = "none";
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
	var file_name = img.getAttribute('filename'); //filename is the attribute predefined	

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

	final_img_des = final_img_des.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
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
	var file_name = img.getAttribute('filename'); //filename is the attribute predefined	

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

	alert("IMAGE");
}

//update album after upload
function update_img()
{
	alert("Update image after upload.");
}