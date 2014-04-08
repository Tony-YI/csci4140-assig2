<html>
	<head>
		<!--drag_and_drop upload-->
		<script language="javascript" type="text/javascript" src="./javascript/drag_and_drop.js"></script>
		<script language="javascript" type="text/javascript" src="./javascript/init.js"></script>
		<link href="./css/style.css" rel="stylesheet" type="text/css"/>
		<title>CSCI4140 Assignment 2</title>
	</head>

	<body>
		<?php echo "<a href='./reinit.php'>Reinint</a>";?>

		<div id="dropbox">Drop file here. One file at a time...</div>
		<br/>
		<progress id="progress_bar" value="0" max="100"></progress>

		<div>
			<h3>Console</h3>
			<p id="file_name"></p>
			<p id="file_exist_flag"></p>
			<p id="file_type_flag"></p>
			<p id="file_size_flag"></p>
			<p id="mysql_error"></p>
		</div>
	</body>
</html>