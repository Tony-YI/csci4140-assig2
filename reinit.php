<?php
/********************************
This is a .PHP file for CSCI4140 assignment 2.
This is a reinitiate script.
*********************************/
require "./lib.php";
echo "<h3>Dropping DataBase...";
drop_db();
echo "Done</h3>";

echo "<h3>Creating DataBase...";
create_db();
echo "Done</h3>";

echo "<h3>Creating Table...";
create_table();
echo "Done</h3>";

echo "<h3>Cleaning Storage...";
clean_storage();
echo "Done<h3/>";

echo "<h3>Initiating Storage...";
init_storage();
echo "Done<h3/>";

show();
?>