function init()
{
	document.getElementById('dropbox').addEventListener("drop", drop, false); //drop means some file is drop into the div called dropbox
	document.getElementById('dropbox').addEventListener("dragover", dragOver, false); //dragover means there is a file over the div
	document.getElementById('dropbox').addEventListener("dragleave", dragLeave, false); //file is leaved
}

window.addEventListener("load", init, false); //load means after the whole html file is received by the client