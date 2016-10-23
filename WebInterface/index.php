<?php
    /*
     *  OpenAudioMC
     *  Author: Mindgamesnl 
     */
	 
	if (file_get_contents('https://api.mojang.com/users/profiles/minecraft/'.$mc_user) !== "") {
<<<<<<< HEAD
=======

>>>>>>> origin/master
		if ($_GET['name'] == NULL) {
			echo "<center><h1>Connect using /audio in the server!</h></center>";
		} else {
			$mcname = $_GET['name'];
			include("php/inc/index.php");
		}
<<<<<<< HEAD
=======

>>>>>>> origin/master
	} else {
		echo "<center><h1>Connect using /audio in the server!</h></center>";
	}
?>