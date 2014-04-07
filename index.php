<html>
	<head>
		<title>CSCI4140 Assignment 2</title>
	</head>

	<body>
		<?php echo "<a href='./reinit.php'>Reinint</a>";?>
		<?php
		require "./lib.php";
		echo "<h1>reinitiating...</h1>";
		drop_db();
		echo "<h1>Done</h1>";
		?>
	</body>
</html>