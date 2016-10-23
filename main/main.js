function enable() {
	client.setblank();
	console.log("Connecting to server with name: " + mcname);
	mc_link.connect("ws://" + wshost);


	document.getElementById("display_name").innerHTML = "Hi there " + mcname + "!";
	
	
	setTimeout(function(){
		if (connection_made === false) {
			document.getElementById("content").innerHTML = "<h1>Hmm, we can't find you in the server.</h1>";
			frontcontent = document.getElementById("content").innerHTML;
			
		}
	}, 3000);
	
	document.addEventListener('DOMContentLoaded', function () {
    if (!Notification) {
        alert(message.browserfail);
        return;
    }
    if (Notification.permission !== "granted")
        Notification.requestPermission();
});
}
	
	
var mc_link = {}
client = {}
var play = {};
volume = 20;
playcount = 0;
connection_made = false;

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
	
	if (json.command == "setvolume") {
        client.set_volume(json.target)
    }
	
	
	if (json.command == "play") {
		if (json.line == "play") {
			play.normal(json.src);
		} else if (json.line == "loop") {
			play.loop(json.src);
		} else if (json.line == "region") {
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
	loop_active = false;
	soundManager.destroySound('loop');
	soundManager.destroySound('play');
	soundManager.stop('loop');
	soundManager.stop('play');
}


play.send = function(bericht) {
      if (Notification.permission !== "granted") { Notification.requestPermission(); } else {
		      bericht = bericht.replace(/_/g, " ");
			  bericht = bericht.replace(/%username%/g, mcname);
          var notification = new Notification(mcname + " | OpenAudioMc", {
              icon: 'http://cravatar.eu/helmavatar/' + mcname + '/600.png',
              body: bericht,
          });
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
		//reset the bg
		document.body.style.background = 'url("' + window.location.protocol + "//" + window.location.host + window.location.pathname.replace("index.php", "") + "css/bg.png" + '")';
		console.log(window.location.protocol + "//" + window.location.host + window.location.pathname.replace("index.php", "") + "css/bg.png");
	} else {
		if(bgTargetCode.indexOf('.png') >= 0 || bgTargetCode.indexOf('.jpg') >= 0 || bgTargetCode.indexOf('.jpeg') >= 0 || bgTargetCode.indexOf('.gif') >= 0){
			//target is a image
			document.body.style.background = bgTargetCode;
		} else {
			//target is css code
			document.body.style.background = bgTargetCode;
		}
	}
}

onload=enable