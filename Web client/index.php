<?php

$Api = curl_get_contents("http://foute.kabouter.craftmend.com:3000/");

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
		$mojang = curl_get_contents('https://api.mojang.com/users/profiles/minecraft/' . $mcuser);
		$mojangjson = json_decode($mojang);
		$uuid = $mojangjson->id;
		
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

function curl_get_contents($url)
{
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
  $data = curl_exec($ch);
  curl_close($ch);
  return $data;
}
?>
