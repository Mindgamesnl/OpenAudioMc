<?php
    /*
     *  OpenAudioMC
     *  Author: Mindgamesnl 
     */
	$mc_user = $_GET['user'];
	if (file_get_contents('https://api.mojang.com/users/profiles/minecraft/'.$mc_user) !== "") {
		if ($_GET['user'] == NULL) {
			echo "<center><h1>Connect using /audio in the server!</h></center>";
		} else {
			$mcname = $_GET['user'];
			include("php/inc/index.php");
		}
	} else {
		echo "<center><h1>Connect using /audio in the server!</h></center>";
	}
?>