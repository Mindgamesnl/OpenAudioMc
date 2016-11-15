<?php
//Openaudio port generator


$completed = false;
$runs = 0;
do {
	$host = $_SERVER['REMOTE_ADDR'];
	$port = rand(1185, 1200);
	$timeout = 2;
	$tbegin = microtime(true); 
	$fp = fsockopen($host, $port, $errno, $errstr, $timeout); 
	$responding = 1;
	if (!$fp) { $responding = 0; } 
	$tend = microtime(true);
	fclose($fp);
	$mstime = ($tend - $tbegin) * 1000;
	$mstime = round($mstime, 2);
	if($responding) {
	} else {
		if ($runs = 0) {
			$runs++;
		} else {
			echo $port;
			$completed = true;
		}
	}
} while (completed === false);
?>
