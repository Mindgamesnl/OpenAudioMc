<?php
include('mc-link.php');

$host = '93.186.192.54'; // Server host name or IP
$port = 8888;                      // Port rcon is listening on
$password = 'PizzaPannekoekKoffie1985'; // rcon.password setting set in server.properties
$timeout = 3;                       // How long to timeout.
$rcon = new Rcon($host, $port, $password, $timeout);
if ($rcon->connect())
{
    $rcon->send_command("sudo " . htmlspecialchars(strip_tags($_GET["name"]), ENT_QUOTES, 'UTF-8') . " speeldoosje region-sync");
}


?>