<?php

$Api = '{"ver":"1.0","clientJS":"https://craftmendserver.eu:3000/socket.io/socket.io.js","socket":"https://craftmendserver.eu:3000/","secureSocket":"https://craftmendserver.eu:3000/"}';

if ($Api == "" || $Api == null) {
	include("files/pages/api_server_offline.php");
} else {
	
	//API IS ONLINE
	
	$json = json_decode($Api);
	$socket_io_js = $json->clientJS;
	$socket_io_host = $json->secureSocket;
	$server_version = $json->ver;
	
	$mcuser = htmlspecialchars(strip_tags($_GET["name"]), ENT_QUOTES, 'UTF-8');
	$sessionToken = htmlspecialchars(strip_tags($_GET["session"]), ENT_QUOTES, 'UTF-8');
	
	if (strpos($sessionToken, ':') !== false) {
		//token is a valid token
		$uuid = "melk";
		
		if ($uuid == "") {
			include("files/pages/no_user.php");
		} else {
			
			//ok
			include("files/pages/main.php");
			
			
		}
	} else {
		include("files/pages/no_user.php");
	}	
}

?>
