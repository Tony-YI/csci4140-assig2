<html>
	<head>
		<!--album display script-->
		<script language="javascript" type="text/javascript" src="./javascript/album_display.js"></script>
		<!--drag_and_drop upload-->
		<script language="javascript" type="text/javascript" src="./javascript/drag_and_drop.js"></script>
		<!--init script-->
		<script language="javascript" type="text/javascript" src="./javascript/init.js"></script>
		<link href="./css/style.css" rel="stylesheet" type="text/css"/>
		<title>CSCI4140 Assignment 2</title>
	</head>

	<body>

		<div id="display">
		<?php
			require './lib.php';

			echo "<a href='./reinit.php'>Reinint</a>";
			//display_all_img();
		?>

		<div class="img_slot">
			<img class="edit" src="./img/edit.png"/>
			<img class="delete" src="./img/delete.png"/>
				<div class="img">
					<img class="image" src="./img/1.jpg" filename="1.jpg"/>
				</div>
		</div>

		</div>

		<div id="dropbox">Drop file here. One file at a time...</div>
		<br/>
		<progress id="progress_bar" value="0" max="100"></progress>

		<div>
			<p>Console</p>
			<p id="file_name"></p>
			<p id="file_exist_flag"></p>
			<p id="file_type_flag"></p>
			<p id="file_size_flag"></p>
			<p id="mysql_error"></p>
		</div>
	</body>
</html>