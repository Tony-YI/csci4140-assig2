function drop(e)
{
	e.stopPropagation();
	e.preventDefault();

	var file = e.dataTransfer.files[0]; //only one file at a time?
	var file_name = file.name;

	//You still need to add something here
	//End of adding something

	var reader = new FileReader(); //file API
	reader.onloadend = handleReaderLoadEnd; //init the reader event handlers
	reader.readAsDataURL(file); //begin the read operation
}

function handleReaderLoadEnd(e)
{
	var data = e.target.result.split(',')[1]; //get the image data

	var xhr = new XMLHttpRequest();
	var url = "./drag_and_drop.php";  //This is the file due with the drag_and_drop upload
	xhr.open('POST', url, true);	//true means async.

	//You still need to add something here
	xhr.setRequestHeader('FILE_NAME', file_name);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//End of adding something

	xhr.send(data);
}

function dragOver(e)
{
	e.preventDefault();
	e.stopPropagation();
	e.target.style.border = "solid 5px";
	e.target.style.border.color = "red";
}
function dragLeave(e)
{
	e.preventDefault();
	e.stopPropagation();
	e.target.style.border.color = "red";
}