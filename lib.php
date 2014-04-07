<?php
/********************************
This is a .PHP file for CSCI4140 assignment 2.
In this file, all the php function call is inclued.
*********************************/

$debug = 1;

/***These functions are for PHP-MYSQL part***/
$db_host = $_ENV{'OPENSHIFT_MYSQL_DB_HOST'};
$db_username = $_ENV{"OPENSHIFT_MYSQL_DB_USERNAME"};
$db_password = $_ENV{"OPENSHIFT_MYSQL_DB_PASSWORD"};
$db_name = $_ENV{"OPENSHIFT_APP_NAME"};

function creat_db()
{
	//$dbh = new PDO('mysql:host=localhost;dbname=test', $username, $password);
	$db_source = "mysql:host=global $db_host;";

	if(debug == 1)
	{
		echo "$db_source";
	}

	$db_obj = new PDO($db_source, global $db_username, global $db_password);

	//$query = $dbh->prepare(“UPDATE client SET pass=‘cool’ WHERE  user=‘tywong’”);
	$query1 = $db_obj->prepare("CREATE DATABASE global $db_name;");
	$query1->execute();

	$query2 = $db_obj->prepare("SET GLOBAL time_zone = '-5:00';");
	$query2->execute();
	$db_obj = NULL;
}

function drop_db()
{
	$db_source = "mysql:host=global $db_host;";

	$db_obj = new PDO($db_source, global $db_username, global $db_password);

	$query = $db_obj->prepare("CREATE DATABASE global $db_name;");
	$query->execute();
	$db_obj = NULL;
}

function db_execute($query)
{
	$db_source = "mysql:host=global $db_host;dbname=global $db_name";
	$db_obj = new PDO($db_source, global $db_username, global $db_password);
	$q = $db_obj->prepare($query);
	$q->execute();
	$db_obj = NULL;
}
/********************************************/

?>