<html>
	<head>
		<script language="javascript" type="text/javascript">
			function handleReaderLoadEnd(e)
			{
				var data = e.target.result.split(',')[1]; <!--//get the image data-->
				var xhr = new XMLHttpRequest();
				xhr.open('POST', url, true);
				xhr.send(data);
			}

			function drop(e)
			{
				e.stopPropagation();
				e.preventDefault();

				var file = e.dataTransfer.files[0]; <!--//only one file at a time?-->
				var filename = file.name;

				<!--//You still need to add something here-->
				<!--//End of adding something-->

				var reader = new FileReader(); <!--//file API-->
				reader.onloadend = handleReaderLoadEnd; <!--//init the reader event handlers-->
				reader.readAsDataURL(file); <!--//begin the read operation-->
			}

			function init()
			{
				dropbox.addEventListener("drop", drop, false); <!--//drop means some file is drop into the div called dropbox-->
			}

			window.addEventListener("load", init, false); <!--//load means after the whole file is received by the client-->
		</script>
		<link href="./style.css" rel="stylesheet" type="text/css"/>
		<title>CSCI4140 Assignment 2</title>
	</head>

	<body>
		<?php echo "<a href='./reinit.php'>Reinint</a>";?>
		<div id="dropbox">Drop file here. One file at a time...</div>
	</body>
</html>