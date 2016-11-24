<?php
    /*
     *  OpenAudioMC
     *  Author: Mindgamesnl 
     */

	 //Ignore the mojang error
	 error_reporting(0);

	include('php/data/save.php');

	if (file_get_contents("php/data/save.txt") === "true") {

	$mc_user = $_GET['user'];
		if (file_get_contents('https://api.mojang.com/users/profiles/minecraft/'.$mc_user) !== "") {
			if ($_GET['user'] == NULL) {
				echo "<center><h1>Connect using /audio in the server!</h></center>";
			} else {
				$mcname = $_GET['user'];
				$sport = file_get_contents("php/data/wsdata.txt");
				include("php/inc/openaudio.php");
			}
		} else {
			echo "<center><h1>Connect using /audio in the server!</h></center>";
		}
	} else {
		
		if ($_GET['setup'] === "2") {
			include('php/inc/setupcheck.php');
		} else if ($_GET['setup'] === "3") {
			if ($_GET["wsdata"] == "") {
				echo "invalid";
			} else {
				file_put_contents("php/data/save.txt", "true");
				file_put_contents("php/data/wsdata.txt", $_GET["wsdata"]);
				echo "<h1>Saving data...</h1><script>location.reload();</script>";
				
			}
		} else {
			include('php/inc/setup.php');
		}
	}
?>