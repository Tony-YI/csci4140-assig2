<?php
/********************************
This is a .PHP file for CSCI4140 assignment 2.
This is a reinitiate script.
*********************************/
require "./lib.php";
echo "<h1>Dropping DataBase...";
drop_db();
echo "Done</h1>";
echo "<h1>Creating DataBase...";
create_db();
echo "Done</h1>";
echo "<h1>Creating Table...";
create_table();
echo "Done</h1>";
?>