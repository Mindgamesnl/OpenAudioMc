function enable() {
	client.setblank();
	console.log("Connecting to server with name: " + mcname);
	
	if (window.location.protocol == "http:") {
		//server is using a non ssl protocol
		mc_link.connect("ws://" + wshost);
	} else if (window.location.protocol == "https:") {
		//connect using ssl and websocket
		mc_link.connect("wss://" + wshost);
	} else {
		console.log("Protocol not supported!");
	}
	
	document.getElementById("display_name").innerHTML = "Hi there " + mcname + "!";
	
	current_bg = window.location.protocol + "//" + window.location.host + window.location.pathname.replace("index.php", "") + "css/bg.png";
	
	setTimeout(function(){
		if (connection_made === false) {
			document.getElementById("content").innerHTML = "<h1>Hmm, we can't find you in the server.</h1>";
			frontcontent = document.getElementById("content").innerHTML;
			
		}
	}, 3000);
	
	document.getElementById("MessageManager").style.display = "none";
	document.getElementById("LiveBox").style.display = "none";
	document.addEventListener('DOMContentLoaded', function () {
		if (!Notification) {
			alert(message.browserfail);
			return;
		}
		if (Notification.permission !== "granted")
			Notification.requestPermission();
	});
	
}

//setup vars
var mc_link = {}
client = {}
var play = {};
var openAudioChromCast = {}
volume = 20;
playcount = 0;
connection_made = false;
var UrlDataBase = {}

mc_link.connect = function(host) {
    var ws = new WebSocket(host);

    ws.onopen = function () {
        ws.send('{"command":"connect","user":"' + mcname + '"}');
    };

    ws.onmessage = function (evt) {
        client.Main(evt.data);
    }
    
    
    ws.onclose = function () {
        client.close();
    };

    ws.onerror = function (err) {
        client.close();
    };

}


client.setblank = function() {
	frontcontent = document.getElementById("content").innerHTML;
	document.getElementById("content").innerHTML = "<h1>Connecting...</h1>"
}

client.close = function() {
	document.getElementById("display_name").innerHTML = "Whoops, we lost connection to the server! please reload this page.";
	document.getElementById("content").innerHTML = "<center>Error.</center>";
	play.stop();
}





client.Main = function(awesomecode) {
	json = JSON.parse(awesomecode);
	if (connection_made === false) {
		document.getElementById("content").innerHTML = frontcontent;
		connection_made = true;
	}
	
	if (json.command == "puush_meld") {
		play.send(json.message);
	}
	
	if (json.command == "startlive") {
		document.getElementById("LiveBox").style.display = "";
			soundManager.stop('live');
			soundManager.destroySound('live');
			var mySoundObject = soundManager.createSound({
				id: "live",
				url: json.src,
				volume: volume,
				autoPlay: true,
			});
	}
		
		if (json.command == "stoplive") {
			document.getElementById("LiveBox").className = "animated bounceOutUp";
	document.getElementById("LiveBox").style.display = "";
			soundManager.stop('live');
			soundManager.destroySound('live');
		}
	
	if (json.command == "setvolume") {
        client.set_volume(json.target)
    }
	
	
	if (json.command == "pause") {
		client.pause(json.src);
	}
	
	if (json.command == "resume") {
		client.resume(json.src);
	}
	
	if (json.command == "play") {
		if (json.line == "play") {
			UrlDataBase["play"] = json.src;
			play.normal(json.src);
		} else if (json.line == "loop") {
			UrlDataBase["loop"] = json.src;
			play.loop(json.src);
		} else if (json.line == "region") {
			UrlDataBase["region"] = json.src;
			play.region(json.src);
		}
	}
	
	if (json.command == "loadfile") {
		play.loadfile(json.src);
	}
	
	if (json.command == "setbg") {
		play.setbg(json.code);
	}
	
	if (json.command == "playloaded") {
		play.loadedfile();
	}
	
	if (json.command == "stopregion") {
		play.stopregion();
	}
	
	
	if (json.command == "stop") {
		play.stop();
	}
	
}


client.pause = function(line) {
	if (line == "play") {
		if (UrlDataBase[line] != "none") {
			//Is playing
			soundManager.pause(line);
		}
	} else if (line == "loop") {
		if (UrlDataBase[line] != "none") {
			//Is playing
			soundManager.pause(line);
		}
	} else if (line == "region") {
		if (UrlDataBase[line] != "none") {
			//Is playing
			soundManager.pause(line);
		}
	} else {
		if (UrlDataBase["play"] == line) {
			soundManager.pause("play");
		}
		
		if (UrlDataBase["loop"] == line) {
			soundManager.pause("loop");
		}
		
		if (UrlDataBase["region"] == line) {
			soundManager.pause("region");
		}
	}
}



client.resume = function(line) {
	if (line == "play") {
		if (UrlDataBase[line] != "none") {
			//Is playing
			soundManager.resume(line);
		}
	} else if (line == "loop") {
		if (UrlDataBase[line] != "none") {
			//Is playing
			soundManager.resume(line);
		}
	} else if (line == "region") {
		if (UrlDataBase[line] != "none") {
			//Is playing
			soundManager.resume(line);
		}
	} else {
		if (UrlDataBase["play"] == line) {
			soundManager.resume("play");
		}
		
		if (UrlDataBase["loop"] == line) {
			soundManager.resume("loop");
		}
		
		if (UrlDataBase["region"] == line) {
			soundManager.resume("region");
		}
	}
}


client.set_volume = function(volume_var) {
	if (volume_var > 100) {
		document.getElementById("slider").value = 100;
		document.getElementById("volume").innerHTML = 'Volume: 100%';
		soundManager.setVolume(100);
		volume = 100;
	} else if (volume_var < 0) {
		document.getElementById("slider").value = 0;
		document.getElementById("volume").innerHTML = 'Volume: 0%';
		soundManager.setVolume(0);
		volume = 0;
	} else {
		document.getElementById("slider").value = volume_var;
		volume = volume_var;
		document.getElementById("volume").innerHTML = 'Volume: ' + volume_var + '%'
		soundManager.setVolume(volume_var);

	}
}


play.stopregion = function() {
	UrlDataBase["region"] = "none";
	soundManager.stop('region');
	soundManager.destroySound('region');
}


play.region = function(src_fo_file) {
	soundManager.stop('region');
	soundManager.destroySound('region');
		loop_active = true;
        var regionsound = soundManager.createSound({
            id: "region",
            volume: volume,
            url: src_fo_file
        });
            function loopSound(sound) {
                sound.play({
                    onfinish: function () {
                        loopSound(sound);
                    }
                });
            }
        loopSound(regionsound);
}



play.normal = function(src_fo_file) {
	soundManager.stop('play');
	soundManager.destroySound('play');
	var mySoundObject = soundManager.createSound({
		id: "play",
		onfinish: function() {UrlDataBase["play"] = "none";},
		url: src_fo_file,
		volume: volume,
		autoPlay: true,
	});
}

play.loop = function(src_fo_file) {
	soundManager.stop('loop');
		soundManager.destroySound('loop');
	    loop_active = true;
        var loopnu = soundManager.createSound({
            id: "loop",
            volume: volume,
            url: src_fo_file
        });
            function loopSound(sound) {
                sound.play({
                    onfinish: function () {
                        loopSound(sound);
                    }
                });
            }
        loopSound(loopnu);
}


play.stop = function() {
	UrlDataBase["loop"] = "none";
	UrlDataBase["region"] = "none";
	UrlDataBase["play"] = "none";
	
	loop_active = false;
	soundManager.destroySound('loop');
	soundManager.destroySound('play');
	soundManager.stop('loop');
	soundManager.stop('play');
}


play.send = function(bericht) {
	
	
	
	var checkbox = document.getElementById("EnableBrowserNotifications");
	if (checkbox.checked) {
		      if (Notification.permission !== "granted") { Notification.requestPermission(); } else {
			  
		      bericht = bericht.replace(/_/g, " ");
			  bericht = bericht.replace(/%username%/g, mcname);
			  play.displayMessage(bericht);
			  	//ColorCodes in the text box
				bericht = bericht.replace(/&0/g, "");
				bericht = bericht.replace(/&1/g, "");
				bericht = bericht.replace(/&2/g, "");
				bericht = bericht.replace(/&3/g, "");
				bericht = bericht.replace(/&4/g, "");
				bericht = bericht.replace(/&5/g, "");
				bericht = bericht.replace(/&6/g, "");
				bericht = bericht.replace(/&7/g, "");
				bericht = bericht.replace(/&8/g, "");
				bericht = bericht.replace(/&9/g, "");
				var bericht2 = bericht;
				bericht2 = bericht2.replace(/&b/g, "");
				bericht2 = bericht2.replace(/&a/g, "");
				bericht2 = bericht2.replace(/&c/g, "");
				bericht2 = bericht2.replace(/&d/g, "");
				bericht2 = bericht2.replace(/&e/g, "");
				bericht2 = bericht2.replace(/&f/g, "");			  
          var notification = new Notification(mcname + " | OpenAudioMc", {
              icon: 'http://cravatar.eu/helmavatar/' + mcname + '/600.png',
              body: bericht2,
          });
			  }
    } else {
		bericht = bericht.replace(/_/g, " ");
		bericht = bericht.replace(/%username%/g, mcname);
		play.displayMessage(bericht);
	}
}	
	

play.loadfile = function(file_to_load) {
	loadedsound = soundManager.createSound({
		 id: 'loader',
		 url: file_to_load
	});
	soundManager.load('loader');
	loadedsound.load();
}


play.loadedfile = function() {
	loadedsound.play({
		volume: volume
	});
}


play.setbg = function(bgTargetCode) {
	console.log(bgTargetCode)
	if(bgTargetCode == "reset" || bgTargetCode == "default") {
		current_bg = window.location.protocol + "//" + window.location.host + window.location.pathname.replace("index.php", "") + "css/bg.png";
		//reset the bg
		document.body.style.background = 'url("' + window.location.protocol + "//" + window.location.host + window.location.pathname.replace("index.php", "") + "css/bg.png" + '")';
		console.log(window.location.protocol + "//" + window.location.host + window.location.pathname.replace("index.php", "") + "css/bg.png");
	} else {
		if(bgTargetCode.indexOf('.png') >= 0 || bgTargetCode.indexOf('.jpg') >= 0 || bgTargetCode.indexOf('.jpeg') >= 0 || bgTargetCode.indexOf('.gif') >= 0){
			//target is a image
			current_bg = bgTargetCode;
			document.body.style.background = "url(\""+bgTargetCode+"\")";
		} else {
			//target is css code
			document.body.style.background = bgTargetCode;
		}
	}
}








play.displayMessage = function(Text) {
	//create the box
	document.getElementById("MessageManager").className = "animated bounceInDown";
	document.getElementById("MessageManager").style.display = "";
	Text = Text.replace(/\n/g, "<br>");
	
	//ColorCodes in the text box
	Text = Text.replace(/&0/g, "<a style='color:#000000 ;'>");
	Text = Text.replace(/&1/g, "<a style='color:#0000AA ;'>");
	Text = Text.replace(/&2/g, "<a style='color:#00AA00 ;'>");
	Text = Text.replace(/&3/g, "<a style='color:#00AAAA ;'>");
	Text = Text.replace(/&4/g, "<a style='color:#AA0000 ;'>");
	Text = Text.replace(/&5/g, "<a style='color:#AA00AA ;'>");
	Text = Text.replace(/&6/g, "<a style='color:#FFAA00 ;'>");
	Text = Text.replace(/&7/g, "<a style='color:#AAAAAA ;'>");
	Text = Text.replace(/&8/g, "<a style='color:#00AA00 ;'>");
	Text = Text.replace(/&9/g, "<a style='color:#5555FF ;'>");
	var Text2 = Text;
	Text2 = Text2.replace(/&b/g, "<a style='color:2cf9e5 ;'>");
	Text2 = Text2.replace(/&a/g, "<a style='color:55FF55 ;'>");
	Text2 = Text2.replace(/&c/g, "<a style='color:FF5555 ;'>");
	Text2 = Text2.replace(/&d/g, "<a style='color:FF55FF ;'>");
	Text2 = Text2.replace(/&e/g, "<a style='color:FFFF55 ;'>");
	Text2 = Text2.replace(/&f/g, "<a style='color:FFFFFF ;'>");
	
	//enter message in the box
	document.getElementById("messageContent").innerHTML = Text2;
}














onload=enable