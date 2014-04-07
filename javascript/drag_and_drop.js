function drop(e)
{
	e.stopPropagation();
	e.preventDefault();

	var file = e.dataTransfer.files[0]; //only one file at a time?
	var file_name = file.name;

	//You still need to add something here
	//End of adding something

	var reader = new FileReader(); //file API
	reader.onloadend = handleReaderLoadEnd(e, file_name); //init the reader event handlers
	reader.readAsDataURL(file); //begin the read operation
}

function handleReaderLoadEnd(e, file_name)
{
	var data = e.target.result.split(',')[1]; //get the image data

	var xhr = new XMLHttpRequest();

	xhr.open('POST', './drag_and_drop.php', true);	//This is the file due with the drag_and_drop upload.
													//true means async.
	
	alert("Fuckkkkkk1");

	//You still need to add something here
	xhr.setRequestHeader('FILE_NAME', file_name);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//End of adding something

	//xhr.send(data);

	alert("Fuckkkkkk2");
}

function dragOver(e)
{
	e.preventDefault();
	e.stopPropagation();
	e.target.style.border = "solid 5px red";
}
function dragLeave(e)
{
	e.preventDefault();
	e.stopPropagation();
	e.target.style.border = "solid 1px red";
}