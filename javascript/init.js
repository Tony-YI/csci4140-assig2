function console(response)
{
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
	return false;


function init()
{
	document.getElementById('dropbox').addEventListener("drop", drop, false); //drop means some file is drop into the div called dropbox
	document.getElementById('dropbox').addEventListener("dragover", dragOver, false); //dragover means there is a file over the div
	document.getElementById('dropbox').addEventListener("dragleave", dragLeave, false); //file is leaved

	//add event listener to the image slots
	var num_of_img_slot = document.getElementsByClassName("img_slot");
	for(var i = 0; i < num_of_img_slot.length; i++)
	{
		num_of_img_slot[i].addEventListener("mouseenter", img_slot_mouse_on, false);//false means top-down.
		num_of_img_slot[i].addEventListener("mouseleave", img_slot_mouse_off, false);
		//num_of_img_slot[i].addEventListener("click", img_click, false);
	}

	//add event listener to the image
	var num_of_img = document.getElementsByClassName("image");
	for(var i = 0; i < num_of_img.length; i++)
	{
		num_of_img[i].addEventListener("click", img_click, false);
	}

	//add event listener to the edit
	var num_of_edit = document.getElementsByClassName("edit");
	for(var i = 0; i < num_of_edit.length; i++)
	{
		num_of_edit[i].addEventListener("click", edit_click, false);
	}

	//add event listener to the delete
	var num_of_delete = document.getElementsByClassName("delete");
	for(var i = 0; i < num_of_delete.length; i++)
	{
		num_of_delete[i].addEventListener("click", delete_click, false);
	}

	//init the height of the page
	var num_of_image = document.getElementsByClassName("image");
	var display_height = document.getElementById("display");
	display_height.style.height = Math.ceil(num_of_image.length / 4) * 210 + "px";
}

window.addEventListener("load", init, false); //load means after the whole html file is received by the client