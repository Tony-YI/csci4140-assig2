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
	global $db_host, $db_name, $db_username, $db_password;
	//$dbh = new PDO('mysql:host=localhost;dbname=test', $username, $password);
	$db_source = "mysql:host=$db_host;";

	global $debug;
	if($debug == 1)
	{
		echo "$db_source";
	}

	$db_obj = new PDO($db_source, $db_username, $db_password);

	//$query = $dbh->prepare(“UPDATE client SET pass=‘cool’ WHERE  user=‘tywong’”);
	$query1 = $db_obj->prepare("CREATE DATABASE $db_name;");
	$query1->execute();

	$query2 = $db_obj->prepare("SET GLOBAL time_zone = '-5:00';");
	$query2->execute();
	$db_obj = NULL;
}

function drop_db()
{
	echo "1";

	global $db_host, $db_name, $db_username, $db_password;
	$db_source = "mysql:host=$db_host;";
	
	echo "2";

	try
	{
		echo "3";

		$db_obj = new PDO($db_source, $db_username, $db_password);

		echo "4";
		$db_obj->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		echo "5";
		$query = $db_obj->prepare("DROP DATABASE $db_name;");
		$query->execute();

		echo "6";
	}

	catch(PDOException $e)
	{
		echo "haha";
	}

	echo "7";
	$db_obj = NULL;
}

function db_execute($query)
{
	global $db_host, $db_name, $db_username, $db_password;
	$db_source = "mysql:host=$db_host;dbname=$db_name";
	$db_obj = new PDO($db_source, $db_username, $db_password);
	
	$q = $db_obj->prepare($query);
	$q->execute();
	$db_obj = NULL;
}
/********************************************/

?>