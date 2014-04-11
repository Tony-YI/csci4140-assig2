function init()
{
	update_img();

	document.getElementById('dropbox').addEventListener("drop", drop, false); //drop means some file is drop into the div called dropbox
	document.getElementById('dropbox').addEventListener("dragover", dragOver, false); //dragover means there is a file over the div
	document.getElementById('dropbox').addEventListener("dragleave", dragLeave, false); //file is leaved

	/*
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
	*/
}

document.addEventListener("load", periodic_update_img, false);
window.addEventListener("load", init, false); //load means after the whole html file is received by the client