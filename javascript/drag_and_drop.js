function drop(e)
{
	e.stopPropagation();
	e.preventDefault();

	var file = e.dataTransfer.files[0]; //only one file at a time?
	var file_name = file.name;

	var reader = new FileReader(); //file API
	//init the reader event handlers
	reader.onloadend = (function(file){
			return function(e) {
				handleReaderLoadEnd(e,file);
				return null;
			};	
		})(file); //don't know why, just copy and paste
	//begin the read operation
	reader.readAsDataURL(file); 
}

function handleReaderLoadEnd(e, file)
{
	var data = e.target.result.split(',')[1]; //get the image data

	var xhr = new XMLHttpRequest();

	xhr.upload.addEventListener('progress', progress_bar, false);

	xhr.open('POST', './drag_and_drop.php', true);	//This is the file due with the drag_and_drop upload.
													//true means async.

	xhr.setRequestHeader('FILE_NAME', file.name);
	xhr.setRequestHeader('FILE_SIZE', file.size);
	xhr.setRequestHeader('FILE_TYPE', file.type);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //this is required in order to pretend to be a form submittion

	xhr.send(data);
}

function progress_bar(e)
{
	document.getElementById('progress_bar').value = e.loaded/e.total * 100;
}

function dragOver(e)
{
	e.preventDefault();
	e.stopPropagation();
	e.target.style.background = "red";
}
function dragLeave(e)
{
	e.preventDefault();
	e.stopPropagation();
	e.target.style.background = "white";
}