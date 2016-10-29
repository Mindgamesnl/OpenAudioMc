<?php

if(file_get_contents('https://api.mojang.com/users/profiles/minecraft/'.$mc_user) !== "") {

if ($_GET['name'] == NULL) {
	include("php/inc/login.php");
} else {
$mcname = $_GET['name'];
include("php/inc/index.php");
}
} else {
include("php/inc/login.php");
}
?>












