<html>
	<head>
		<!--drag_and_drop upload-->
		<script language="javascript" type="text/javascript">
			function handleReaderLoadEnd(e)
			{
				var data = e.target.result.split(',')[1]; //get the image data

				var xhr = new XMLHttpRequest();
				var url = "./drag_and_drop.php";  //This is the file due with the drag_and_drop upload
				xhr.open('POST', url, true);

				//You still need to add something here
				xhr.setRequestHeader('FILE_NAME', file_name);
				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				//End of adding something

				xhr.send(data);
			}

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

			function init()
			{
				dropbox.addEventListener("drop", function(e){
					e.stopPropagation();
					e.preventDefault();

					var file = e.dataTransfer.files[0]; //only one file at a time?
					var file_name = file.name;

					//You still need to add something here
					//End of adding something

					var reader = new FileReader(); //file API
					reader.onloadend = handleReaderLoadEnd; //init the reader event handlers
					reader.readAsDataURL(file); //begin the read operation
				}, false); //drop means some file is drop into the div called dropbox
			}

			window.addEventListener("load", init, false); //load means after the whole file is received by the client
		</script>
		<link href="./style.css" rel="stylesheet" type="text/css"/>
		<title>CSCI4140 Assignment 2</title>
	</head>

	<body>
		<?php echo "<a href='./reinit.php'>Reinint</a>";?>

		<div id="dropbox">Drop file here. One file at a time...</div>
	</body>
</html>