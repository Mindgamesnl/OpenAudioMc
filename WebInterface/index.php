<?php
/*
 *  OpenAudioMC
 *  Author: Mindgamesnl 
 */

//Ignore the mojang error

error_reporting(0);

include('php/data/save.php');

function getUserIP() {
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];
    
    if (filter_var($client, FILTER_VALIDATE_IP)) {
        $ip = $client;
    } elseif (filter_var($forward, FILTER_VALIDATE_IP)) {
        $ip = $forward;
    } else {
        $ip = $remote;
    }
    return $ip;
}



if (file_get_contents("php/data/save.txt") === "true") {
  
  if (htmlspecialchars(strip_tags($_GET["googlecaststream"]), ENT_QUOTES, 'UTF-8') == "true") {
    
  
   $mc_user = $_GET['user'];
    if (file_get_contents('https://api.mojang.com/users/profiles/minecraft/' . $mc_user) !== "") {
        if ($_GET['user'] == NULL) {
            echo "<center><h1>Error while loading cast client</p></center>";
        } else {
            $mcname = $_GET['user'];
            $sport  = file_get_contents("php/data/wsdata.txt");
            $identity = getUserIP();
            $googlecast = true;
            include("php/inc/openaudio.php");
        }
    } else {
        include("php/inc/login.php");
    }
  } else {
    $mc_user = $_GET['user'];
    
    if (file_get_contents('https://api.mojang.com/users/profiles/minecraft/' . $mc_user) !== "") {
        if ($_GET['user'] == NULL) {
           include("php/inc/login.php");
        } else {
            $mcname = $_GET['user'];
            $sport  = file_get_contents("php/data/wsdata.txt");
            //nog niet in gebruik maar zit er vast in
            $identity = getUserIP();
            $googlecast = false;
            include("php/inc/openaudio.php");
        }
    } else {
        include("php/inc/login.php");
    }
  }
} else if (file_get_contents("php/data/save.txt") === "hosting") {
  
    //client is setup to act as a webhosting server
  if (is_numeric(htmlspecialchars(strip_tags($_GET["wsdata"]), ENT_QUOTES, 'UTF-8'))) {  
    if (htmlspecialchars(strip_tags($_GET["googlecaststream"]), ENT_QUOTES, 'UTF-8') == "true") {


       $mc_user = $_GET['user'];
        if (file_get_contents('https://api.mojang.com/users/profiles/minecraft/' . $mc_user) !== "") {
            if ($_GET['user'] == NULL) {
                echo "<center><h1>Error while loading cast client</p></center>";
            } else {
                $mcname = $_GET['user'];
                $sport  = htmlspecialchars(strip_tags($_GET["wsdata"]), ENT_QUOTES, 'UTF-8');
                $identity = getUserIP();
                $googlecast = true;
                include("php/inc/openaudio.php");
            }
        } else {
            include("php/inc/login.php");
        }
      } else {
        $mc_user = $_GET['user'];
        if (file_get_contents('https://api.mojang.com/users/profiles/minecraft/' . $mc_user) !== "") {
            if ($_GET['user'] == NULL) {
               include("php/inc/login.php");
            } else {
                $mcname = $_GET['user'];
                $sport = htmlspecialchars(strip_tags($_GET["wsdata"]), ENT_QUOTES, 'UTF-8');
                //nog niet in gebruik maar zit er vast in
                $identity = getUserIP();
                $googlecast = false;
                include("php/inc/openaudio.php");
            }
        } else {
            include("php/inc/login.php");
        }
      }
  } else {
    echo "<center><h1>invalid server ";
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