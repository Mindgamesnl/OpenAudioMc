<?php
    /*
     *  OpenAudioMC
     *  Author: Mindgamesnl 
     */
	 
	if (file_get_contents('https://api.mojang.com/users/profiles/minecraft/'.$mc_user) !== "") {

		if ($_GET['name'] == NULL) {
			echo "<center><h1>Connect using /audio in the server!</h></center>";
		} else {
			$mcname = $_GET['name'];
			include("php/inc/index.php");
		}

	} else {
		echo "<center><h1>Connect using /audio in the server!</h></center>";
	}
?>