//setup vars
var isFading = {};
var plays = {};
var settings = {};
var Dashboard = {};
var mc_link = {};
var BungeeCord = {};
var uiExtra = {};
var fadingData = {};
var stopFading = {};
var newest_region = 0;
var hue_connected = {};
var MyHue = new huepi();
var HueDefaultColor = "rgba(255,255,255,150)";
var isHueOn = true;
var HueTestTry = 0;
var hue_lights = {};
var StopHueLoop = false;
var hue_start_animation = true;
var last_region_id = 1;
var currentFadingLineRegion = 1;
var client = {};
var play = {};
var ssl_error = "Sorry but ssl is not supported, redirecting to non ssl version (please wait)";
var UrlDataBase = {};
var openAudioChromeCast = {};
var FadeEnabled = true;
var connection_made = false;
var volume = 20;



function enable() {
	client.setblank();

	if (googlecastmode == 1) {
		//disable some ui stuff for tv'screen
		document.getElementById("voltextparant").innerHTML = '<div id="voltextparant"><h1><div id="volume"><small>Volume:</small> 20%</div></h1></div>';
		document.getElementById("sliderparant").style.display = "none";
		document.getElementById("cogparent").style.display = "none";
		//document.getElementById("headerparent").style.display = "none";
	}

	document.getElementById("cast_logo").style.display = "none";
	document.getElementById("streaming_status").style.display = "none";
	document.getElementById("hue_status").style.display = "none";
	document.getElementById("HueControlls").style.display = "none";
	document.getElementById("DetectHueButton").style.display = "none";

	if (Notification.permission !== "granted") {
		document.getElementById("noBrowserMessages").style.display = "";
	}

	Dashboard.setStreamOffline();

	/*
	leaving the openaudio credits would be nice but no one is holding you back from removing it
	*/
	console.info("\n--==[OpenAudioMc]==--\nOpenAudioMc by: Mindgamesnl\nSpigot: https://www.spigotmc.org/resources/openaudiomc.30691/\nGithub: https://github.com/Mindgamesnl/OpenAudioMc\n--==[OpenAudioMc]==--\n\n");
	
	settings.setDefault();
	settings.apply();
	
	console.info("Connecting to server with name: " + mcname);

	if (window.location.protocol == "http:") {
		//server is using a non ssl protocol
		mc_link.connect("ws://" + wshost);
	} else if (window.location.protocol == "https:") {
		//connect using ssl and websocket
		swal({
			title: "SSL ERROR",
			text: ssl_error,
			CancelButton: false,
			allowOutsideClick: false,
			allowEscapeKey: false,
			showConfirmButton: false,
			html: true
		}, function() {});
		reloadNonSsl();
	} else {
		console.info("Protocol not supported!");
	}

	//hi there
	document.getElementById("display_name").innerHTML = messages.status_not_connected.replace(/%username%/g, mcname);

	current_bg = window.location.protocol + "//" + window.location.host + window.location.pathname.replace("index.php", "") + "Images/bg.png";

	setTimeout(function() {
		if (connection_made === false) {
			//Player not found
			document.getElementById("status").innerHTML = messages.not_found.replace(/%username%/g, mcname);
		}
	}, 3000);

	document.addEventListener('DOMContentLoaded', function() {
		if (!Notification) {
			alert(message.browserfail);
			return;
		}
		if (Notification.permission !== "granted") {
			Notification.requestPermission();
		}
	});

	document.getElementById("loading_screen").style.display = "none";
	
	if ((settings.get("hue_enabled") === "true")) {
		//Yup, hue is enabled
		document.getElementById("hue_modal_text").innerHTML = "<h2>Starting hue...</h2><h3>Please wait.</h3>";
		loop_hue_connection();
	} else {
		document.getElementById("hue_modal_text").innerHTML = "<h2>Philips hue connection is disabled in the settings</h2>";
	}
	
}




function bungeecord_send(bungeeip) {
	client.setblank();

	if (googlecastmode == 1) {
		//disable some ui stuff for tv'screen
		document.getElementById("voltextparant").innerHTML = '<div id="voltextparant"><h1><div id="volume"><small>Volume:</small> 20%</div></h1></div>';
		document.getElementById("sliderparant").style.display = "none";
		document.getElementById("cogparent").style.display = "none";
		//document.getElementById("headerparent").style.display = "none";
	}

	document.getElementById("cast_logo").style.display = "none";
	document.getElementById("streaming_status").style.display = "none";

	/*
	leaving the openaudio credits would be nice but no one is holding you back from removing it
	*/
	console.info("\n--==[OpenAudioMc]==--\nOpenAudioMc by: Mindgamesnl\nSpigot: https://www.spigotmc.org/resources/openaudiomc.30691/\nGithub: https://github.com/Mindgamesnl/OpenAudioMc\n--==[OpenAudioMc]==--\n\n");

	console.info("Connecting to other server with name: " + mcname);

	wshost = bungeeip;
	if (window.location.protocol == "http:") {
		//server is using a non ssl protocol
		mc_link.connect("ws://" + bungeeip);
	} else if (window.location.protocol == "https:") {
		//connect using ssl and websocket
		mc_link.connect("wss://" + bungeeip);
	} else {
		console.info("Protocol not supported!");
	}

	//hi there
	document.getElementById("status").innerHTML = "Status: <font style='color:Red;'>Switching hosts</font>";

	current_bg = window.location.protocol + "//" + window.location.host + window.location.pathname.replace("index.php", "") + "Images/bg.png";

	document.addEventListener('DOMContentLoaded', function() {
		if (!Notification) {
			alert(message.browserfail);
			return;
		}
		if (Notification.permission !== "granted")
			Notification.requestPermission();
	});

	document.getElementById("loading_screen").style.display = "none";
}




function reenable() {
	if (window.location.protocol == "http:") {
		//server is using a non ssl protocol
		mc_link.connect("ws://" + wshost);
	} else if (window.location.protocol == "https:") {
		//connect using ssl and websocket
		swal({
			title: "SSL ERROR",
			text: ssl_error,
			CancelButton: false,
			allowOutsideClick: false,
			allowEscapeKey: false,
			showConfirmButton: false,
			html: true
		}, function() {});
		reloadNonSsl();
	} else {
		console.info("Protocol not supported!");
	}
	console.info("Connecting to server with name: " + mcname);

	//hi there
	document.getElementById("display_name").innerHTML = messages.status_not_connected.replace(/%username%/g, mcname);

	setTimeout(function() {
		if (connection_made === false) {
			//Player not found
			document.getElementById("status").innerHTML = messages.not_found.replace(/%username%/g, mcname);
		}
	}, 3000);

	document.addEventListener('DOMContentLoaded', function() {
		if (!Notification) {
			alert(message.browserfail);
			return;
		}
		if (Notification.permission !== "granted")
			Notification.requestPermission();
	});
}



mc_link.connect = function(host) {
	try {
		ws = new WebSocket(host);
	} catch (err) {
		console.log("This browser does not support websocket, welp darnit");
	}

	ws.onopen = function() {
		ws.send('{"command":"connect","user":"' + mcname + '","sessionkey":"' + sessionToken + '","fadingEnabled":' + (settings.get("sound_fading") === "true") + ',"hueEnabled":' + (settings.get("hue_enabled") === "true") + '}');
	};

	ws.onmessage = function(evt) {
		client.Main(evt.data);
	}


	ws.onclose = function() {
		client.close();
	};

	ws.onerror = function(err) {
		client.close();
	};

}


client.setblank = function() {
	document.getElementById("status").innerHTML = messages.connecting.replace(/%username%/g, mcname);
}


client.close = function() {
	document.getElementById("status").innerHTML = messages.could_not_connect.replace(/%username%/g, mcname);
	hue_set_color("rgba(240, 92, 0)");
	hue_set_color("rgba(240, 92, 0)");
	reconnectpromt();
	play.stop();
}


client.Main = function(awesomecode) {
	if (awesomecode === "invalidsession") {
		swal({
			title: "Invalid session!",
			text: "We think that you are not the real <i>" + mcname + " </i>.<br />Please request a new url via <b>/audio</b> or <b>/connect</b>.",
			showCancelButton: false,
			allowOutsideClick: false,
			allowEscapeKey: false,
			showConfirmButton: false,
			html: true
		}, function() {});
	} else {

		json = JSON.parse(awesomecode);

		if (json.src != null) {
			if (json.src.includes("soundcloud.com")) {
				var scurl = json.src;
				json.src = "http://api.craftmend.com/soundcloud/?file=" + scurl;
			}	
		}
		
		if (connection_made === false) {
			document.getElementById("status").innerHTML = messages.connected.replace(/%username%/g, mcname);
			connection_made = true;
		} else if (json.command == "puush_meld") {
			play.send(json.message);
		} else if (json.command == "reconnect") {
			bungeecord_send(json.code);
			wshost = json.code;
		} else if (json.command == "startlive") {
			Dashboard.setStreamOnline();
			soundManager.stop('live');
			soundManager.destroySound('live');
			var mySoundObject = soundManager.createSound({
				id: "live",
				url: json.src,
				volume: volume,
				autoPlay: true,
			});
		} else if (json.command == "kick") {
			window.location.replace("https://www.google.nl/");
		} else if (json.command == "stoplive") {
			Dashboard.setStreamOffline();
			fadeIdOut("live");
		} else if (json.command == "setvolume") {
			document.cookie = "volume=" + json.target;
			fadeAllTarget(json.target)
		} else if (json.command == "pause") {
			client.pause(json.src);
		} else if (json.command == "resume") {
			client.resume(json.src);
		} else if (json.command == "play") {
			if (json.line == "play") {
				UrlDataBase.play = json.src;
				play.normal(json.src);
			} else if (json.line == "loop") {
				UrlDataBase.loop = json.src;
				play.loop(json.src);
			} else if (json.line == "region") {
				UrlDataBase.region = json.src;
				play.region(json.src);
			}
		} else if (json.command == "loadfile") {
			play.loadfile(json.src);
		} else if (json.command == "setbg") {
			play.setbg(json.code);
		} else if (json.command == "playloaded") {
			play.loadedfile();
		} else if (json.command == "stopregion") {
			play.stopregion();
		} else if (json.command == "stop") {
			play.stop();
		} else if (json.command == "disconnect") {
			document.getElementById("status").innerHTML = messages.disconnected.replace(/%username%/g, mcname);
			play.playAction("stop");
			Dashboard.setStreamOffline();
			fadeIdOut("live");
			play.stopregion();
			play.stop();
			MyHue.GroupSetRGB(0, 240, 92, 0);
		} else if (json.command == "connect") {
			hue_set_color(HueDefaultColor);
			document.getElementById("status").innerHTML = messages.connected.replace(/%username%/g, mcname);
		} else if (json.command == "stopoldregion") {
			stopOldRegion();
		} else if (json.command == "setmotd") {
			Dashboard.setMOTD(json.src);
		} else if (json.command == "hue") {
			if (json.atribute === "set") {
				
				var values = json.target.split(':');
				var colorcode = values[0];
				try {
					//light is specified
					var light = values[1];
					hue_set_color(colorcode, light);
				} catch(e) {
					//no light code
					hue_set_color(colorcode);
				}
			} else if (json.atribute === "reset") {
				hue_on();
				hue_connected = true;
				hue_set_color(HueDefaultColor);
			} else if (json.atribute === "blink") {
				for (var key in MyHue.Lights) {
					if (MyHue.Lights.hasOwnProperty(key)) {
						if (hue_lights[key].enabled) {
							MyHue.LightAlertLSelect(key);
						}
					}
				}
			} else if (json.atribute === "cyclecolors") {
				for (var key in MyHue.Lights) {
					if (MyHue.Lights.hasOwnProperty(key)) {
						if (hue_lights[key].enabled) {
							MyHue.LightEffectColorloop(key);
						}
					}
				}
			} else if (json.atribute === "stophueeffect") {
				for (var key in MyHue.Lights) {
					if (MyHue.Lights.hasOwnProperty(key)) {
						if (hue_lights[key].enabled) {
							MyHue.LightAlertNone(key);
							MyHue.LightEffectNone(key);
						}
					}
				}
			}
		} else {
			console.info("[core] Invalid json command");
			//console.log(json);
		}
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
		if (UrlDataBase.play == line) {
			soundManager.pause("play");
		}

		if (UrlDataBase.loop == line) {
			soundManager.pause("loop");
		}

		if (UrlDataBase.region == line) {
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
		if (UrlDataBase.play == line) {
			soundManager.resume("play");
		}

		if (UrlDataBase.loop == line) {
			soundManager.resume("loop");
		}

		if (UrlDataBase.region == line) {
			soundManager.resume("region");
		}
	}
}




client.set_volume = function(volume_var) {
	if (volume_var > 100) {
		document.getElementById("slider").value = 100;
		document.getElementById("volume").innerHTML = messages.volume_max.replace(/{{VOLUME}}/g, volume_var);
		soundManager.setVolume(100);
		volume = 100;
	} else if (volume_var < 0) {
		document.getElementById("slider").value = 0;
		document.getElementById("volume").innerHTML = messages.volume_min.replace(/{{VOLUME}}/g, volume_var);
		soundManager.setVolume(0);
		volume = 0;
	} else {
		document.getElementById("slider").value = volume_var;
		volume = volume_var;
		document.getElementById("volume").innerHTML = messages.volume_var.replace(/{{VOLUME}}/g, volume_var);
		soundManager.setVolume(volume_var);

	}
}




client.set_volume_blind = function(volume_var) {
	if (volume_var > 100) {
		document.getElementById("slider").value = 100;
		soundManager.setVolume(100);
		volume = 100;
	} else if (volume_var < 0) {
		document.getElementById("slider").value = 0;
		soundManager.setVolume(0);
		volume = 0;
	} else {
		document.getElementById("slider").value = volume_var;
		volume = volume_var;
		soundManager.setVolume(volume_var);

	}
}




play.stopregion = function() {
	UrlDataBase.region = "none";
	play.regionAction("stop");
}




play.region = function(src_fo_file) {
	var soundId = "region";
	if (isFading[soundId] === true) {
		stopFading[soundId] = true;
	}


	loop_active = true;
	oldRegion = newest_region;
	last_region_id++;
	newest_region = last_region_id;
	var regionsound = soundManager.createSound({
		id: "region" + newest_region,
		volume: 0,
		url: src_fo_file
	});

	function loopSound(sound) {
		sound.play({
			onfinish: function() {
				loopSound(sound);
			}
		});
	}
	loopSound(regionsound);
	fadeIdTarget("region" + newest_region, volume);
}



function stopOldRegion() {
	fadeIdOut("region" + oldRegion);
}




function listSounds() {
	var obj = soundManager.sounds;
	var str = '';
	for (var p in obj) {
		if (obj.hasOwnProperty(p)) {
			str += p + ",";
		}
	}
	return str;
}



play.regionAction = function(action_is_fnc) {
	for (var i = 0; i < listSounds().split(',').length; i++) {
		listSounds().split(',')[i] = listSounds().split(',')[i].replace(/^\s*/, "").replace(/\s*$/, "");
		if (listSounds().split(',')[i].indexOf("region") !== -1) {

			if (action_is_fnc === "stop") {
				fadeIdOut(listSounds().split(',')[i]);
			}

		}
	}
}



play.playAction = function(action_is_fnc) {
	for (var i = 0; i < listSounds().split(',').length; i++) {
		listSounds().split(',')[i] = listSounds().split(',')[i].replace(/^\s*/, "").replace(/\s*$/, "");
		if (listSounds().split(',')[i].indexOf("play_") !== -1) {

			if (action_is_fnc === "stop") {
				fadeIdOut(listSounds().split(',')[i]);
			}

		}
	}
}




play.normal = function(src_fo_file) {
	var soundId = "play";
	if (isFading[soundId] === true) {
		stopFading[soundId] = true;
	}
	soundManager.createSound({
		id: "play_" + Math.floor(Math.random() * 60) + 1,
		onfinish: function() {
			UrlDataBase.play = "none";
		},
		url: src_fo_file,
		volume: volume,
		autoPlay: true,
	});
}




play.loop = function(src_fo_file) {
	var soundId = "loop";
	if (isFading[soundId] === true) {
		stopFading[soundId] = true;
	}

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
			onfinish: function() {
				loopSound(sound);
			}
		});
	}
	loopSound(loopnu);
}




play.stop = function() {
	UrlDataBase.loop = "none";
	UrlDataBase.region = "none";
	UrlDataBase.play = "none";
	loop_active = false;
	play.playAction("stop");
	fadeIdOut("loop");
	fadeIdOut("region");
}




play.send = function(bericht) {
	var checkbox = document.getElementById("EnableBrowserNotifications");
	if (checkbox.checked) {
		if (Notification.permission !== "granted") {
			Notification.requestPermission();
			play.notifictationSound();
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
			var notification = new Notification(messages.message_header.replace(/%username%/g, mcname), {
				icon: 'Images/small_logo.png',
				body: bericht2,
			});
		} else {
			play.notifictationSound();
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
			var notification = new Notification(messages.message_header.replace(/%username%/g, mcname), {
				icon: 'Images/small_logo.png',
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
	if (bgTargetCode == "reset" || bgTargetCode == "default") {
		current_bg = window.location.protocol + "//" + window.location.host + window.location.pathname.replace("index.php", "") + "Images/bg.png";
		//reset the bg
		document.body.style.background = 'url("' + window.location.protocol + "//" + window.location.host + window.location.pathname.replace("index.php", "") + "Images/bg.png" + '")';
	} else {
		if (bgTargetCode.indexOf('.png') >= 0 || bgTargetCode.indexOf('.jpg') >= 0 || bgTargetCode.indexOf('.jpeg') >= 0 || bgTargetCode.indexOf('.gif') >= 0) {
			//target is a image
			current_bg = bgTargetCode;
			document.body.style.background = "url(\"" + bgTargetCode + "\")";
		} else {
			//target is css code
			document.body.style.background = bgTargetCode;
		}
	}
}




play.notifictationSound = function() {
	var mySoundObject = soundManager.createSound({
		id: "sytem_notifictationSound",
		url: "sounds/message.mp3",
		volume: volume,
		autoPlay: true,
	});
}




play.displayMessage = function(Text) {
	//create the box
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
	Dashboard.setMessage(Text2);
}



function reconnectpromt() {
	if (googlecastmode != 1) {
		swal({
			title: messages.connection_error_header.replace(/%username%/g, mcname),
			text: messages.connection_error_content.replace(/%username%/g, mcname),
			type: "error",
			showCancelButton: true,
			confirmButtonColor: "#FF851B",
			confirmButtonText: "Retry",
			closeOnConfirm: true,
			html: true
		}, function() {
			reenable();
		});
	}
}




//thanks to chrome bugs we need to detect if the browser is actife
var vis = (function() {
	var stateKey,
		eventKey,
		keys = {
			hidden: "visibilitychange",
			webkitHidden: "webkitvisibilitychange",
			mozHidden: "mozvisibilitychange",
			msHidden: "msvisibilitychange"
		};
	for (stateKey in keys) {
		if (stateKey in document) {
			eventKey = keys[stateKey];
			break;
		}
	}
	return function(c) {
		if (c) document.addEventListener(eventKey, c);
		return !document[stateKey];
	}
})();




vis(function() {
	if (vis()) {
		setTimeout(function() {
			FadeEnabled = true;
		}, 300);
	} else {
		FadeEnabled = false;
	}
});




var notIE = (document.documentMode === undefined),
	isChromium = window.chrome;
if (notIE && !isChromium) {
	$(window).on("focusin", function() {
		setTimeout(function() {
			FadeEnabled = true;
		}, 300);
	}).on("focusout", function() {
		FadeEnabled = false;
	});
} else {
	if (window.addEventListener) {} else {
		window.attachEvent("focus", function(event) {
			setTimeout(function() {
				FadeEnabled = true;
			}, 300);
		});
		window.attachEvent("blur", function(event) {
			FadeEnabled = false;
		});
	}
}



function isInt(n) {
	return Number(n) === n && n % 1 === 0;
}




//all the fading c
$(document).ready(function() {
	window.fadeIdOut = function(soundId) {
		var x = document.createElement("INPUT");
		x.setAttribute("type", "range");
		document.body.appendChild(x);
		x.id = soundId + "_Slider";
		x.min = 0;
		x.max = 100;
		x.value = volume;
		x.style = "display:none;";
		var backAudio = $('#' + soundId + "_Slider");
		document.getElementById('faders').appendChild(x);

		if (FadeEnabled === true && document.getElementById("EnableSoundFading").checked) {
			isFading[soundId] = true;
			backAudio.animate({
				value: 0
			}, {
				duration: getFadingSpeed(),
				step: function(currentLeft, animProperties) {
					//call event when a sound started
					if (stopFading[soundId] !== true) {
						soundManager.setVolume(soundId, currentLeft);
					}
				},
				done: function() {
					if (stopFading[soundId] !== true) {
						soundManager.stop(soundId);
						soundManager.destroySound(soundId);
					}
					isFading[soundId] = false;
					stopFading[soundId] = false;
					x.remove();
				}
			});
		} else {
			soundManager.stop(soundId);
			soundManager.destroySound(soundId);
			x.remove();
		}
	}




	window.fadeIdTarget = function(soundId, volumeTarget) {
		var x = document.createElement("INPUT");
		x.setAttribute("type", "range");
		document.body.appendChild(x);
		x.id = soundId + "_Slider_type_2";
		x.min = 0;
		x.max = 100;
		x.value = volume;
		x.style = "display:none;";
		var backAudio = $('#' + soundId + "_Slider_type_2");
		document.getElementById('faders').appendChild(x);

		if (FadeEnabled === true && document.getElementById("EnableSoundFading").checked) {
			isFading[soundId] = true;
			backAudio.animate({
				value: volumeTarget
			}, {
				duration: getFadingSpeed(),
				step: function(currentLeft, animProperties) {
					if (stopFading[soundId + "_Slider_type_2"] !== true) {
						soundManager.setVolume(soundId, currentLeft);
					}
				},
				done: function() {
					isFading[soundId] = false;
					stopFading[soundId] = false;
					soundManager.setVolume(soundId, volumeTarget);
					x.remove();
				}
			});
		} else {
			soundManager.setVolume(soundId, volumeTarget);
			x.remove();
		}
	}



	window.fadeAllTarget = function(volumeTarget) {
		var x = document.createElement("INPUT");
		x.setAttribute("type", "range");
		document.body.appendChild(x);
		x.id = "global_Slider_type_2";
		x.min = 0;
		x.max = 100;
		x.value = volume;
		x.style = "display:none;";
		var backAudio = $('#' + "global_Slider_type_2");
		document.getElementById('faders').appendChild(x);

		if (FadeEnabled === true && document.getElementById("EnableSoundFading").checked) {
			isFading["global_Slider_type_2"] = true;
			backAudio.animate({
				value: volumeTarget
			}, {
				duration: getFadingSpeed(),
				step: function(currentLeft, animProperties) {
					if (stopFading["global_Slider_type_2"] !== true) {
						client.set_volume_blind(currentLeft);
					}
				},
				done: function() {
					isFading["global_Slider_type_2"] = false;
					stopFading["global_Slider_type_2"] = false;
					client.set_volume(volumeTarget);
					x.remove();
				}
			});
		} else {
			client.set_volume(volumeTarget);
			x.remove();
		}
	}
});



settings.get = function(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) {
		return parts.pop().split(";").shift();
	}
}



settings.displaySkull = function(status) {
	if (status === true) {
		document.getElementById("skullframething").style.display = "";
		document.getElementById("contentBoxMain").className = "col-md-8";
	} else if (status === false) {
		document.getElementById("skullframething").style.display = "none";
		document.getElementById("contentBoxMain").className = "col-md-12";
	}
}



settings.setDefault = function() {
	if (settings.get("saved") !== "true") {
		console.info("Set settings to default (first time use)");
		document.cookie = "volume=20";
		document.cookie = "volume=normal";
		document.cookie = "show_skull=true";
		document.cookie = "smart_volume=true";
		document.cookie = "browser_notifications=true";
		document.cookie = "sound_fading=true";
		document.cookie = "sound_fading_speed=slow";
		document.cookie = "saved=true";
		document.cookie = "hue_enabled=true";
	}
}



settings.apply = function() {
	if ((settings.get("smart_volume") === "true")) {
		if (isInt(parseInt(settings.get("volume")))) {
			client.set_volume(Math.ceil(parseInt(settings.get("volume"))));
			document.getElementById("slider").value = parseInt(settings.get("volume"));
			document.getElementById("volume").innerHTML = messages.volume_var.replace(/{{VOLUME}}/g, settings.get("volume"));
		} else {
			client.set_volume(20);
			document.getElementById("slider").value = 20;
			document.getElementById("volume").innerHTML = messages.volume_var.replace(/{{VOLUME}}/g, 20);
		}

	}
	applyFadingSpeed(settings.get("sound_fading_speed"));
	document.getElementById("show_skull").checked = (settings.get("show_skull") === "true");
	settings.displaySkull((settings.get("show_skull") === "true"));
	document.getElementById("smart_volume").checked = (settings.get("smart_volume") === "true");
	document.getElementById("EnableBrowserNotifications").checked = (settings.get("browser_notifications") === "true");
	document.getElementById("EnableSoundFading").checked = (settings.get("sound_fading") === "true");
	document.getElementById("EnableHue").checked = (settings.get("hue_enabled") === "true");
}



settings.update = function() {
	document.cookie = "volume=" + volume;
	document.cookie = "show_skull=" + document.getElementById("show_skull").checked;
	document.cookie = "smart_volume=" + document.getElementById("smart_volume").checked;
	document.cookie = "browser_notifications=" + document.getElementById("EnableBrowserNotifications").checked;
	document.cookie = "sound_fading=" + document.getElementById("EnableSoundFading").checked;
	document.cookie = "volume_fading_speed=" + getFadingType();
	document.getElementById("EnableHue").checked = document.getElementById("EnableHue").checked;
	
}



function applyFadingSpeed(arg) {
	if (arg === "slow") {
		document.getElementById("fading_speed_slow").selected = true;
		document.getElementById("fading_speed_normal").selected = false;
		document.getElementById("fading_speed_fast").selected = false;
	} else if (arg === "normal") {
		document.getElementById("fading_speed_slow").selected = false;
		document.getElementById("fading_speed_normal").selected = true;
		document.getElementById("fading_speed_fast").selected = false;
	} else if (arg === "fast") {
		document.getElementById("fading_speed_slow").selected = false;
		document.getElementById("fading_speed_normal").selected = false;
		document.getElementById("fading_speed_fast").selected = true;
	}
}



function getFadingSpeed() {
	if (document.getElementById("fading_speed_slow").selected) {
		return 1000;
	} else if (document.getElementById("fading_speed_normal").selected) {
		return 500;
	} else if (document.getElementById("fading_speed_fast").selected) {
		return 100;
	}
}



function getFadingType() {
	if (document.getElementById("fading_speed_slow").selected) {
		return "slow";
	} else if (document.getElementById("fading_speed_normal").selected) {
		return "normal";
	} else if (document.getElementById("fading_speed_fast").selected) {
		return "fast";
	}
}



function reloadNonSsl() {
	console.log("Reloading...")
	setTimeout(1500, function() {
		console.log("Reloaded")
		window.location = document.URL.replace("https://", "http://");
	});
	window.location = document.URL.replace("https://", "http://");
}



function showqr() {
	$(function() {
		$('#modal').modal('toggle');
	});
	setTimeout(function() {
		swal({
			title: "Qr code for mobile client",
			text: '<center><div id="qrcode"></div></center>',
			CancelButton: false,
			allowOutsideClick: true,
			allowEscapeKey: true,
			showConfirmButton: true,
			html: true
		}, function() {});
		var qrcode = new QRCode(document.getElementById("qrcode"), {
			text: document.URL,
			width: 150,
			height: 150,
			colorDark: "#000000",
			colorLight: "#ffffff",
			correctLevel: QRCode.CorrectLevel.H
		});
	}, 500);

}


Dashboard.setMessage = function(html) {
	document.getElementById("messageContent").className = "label";
	document.getElementById("messageContent").innerHTML = html;
	document.getElementById("messageContent").className = "label animated tada";
}



Dashboard.setStreamOffline = function() {
	document.getElementById("liveButton").innerHTML = '<span class="label label-warning"><i class="fa fa-ban" aria-hidden="true"></i> Not online</span>';
}



Dashboard.setStreamOnline = function() {
	document.getElementById("liveButton").innerHTML = '<span class="label label-success"><i class="fa fa-wifi" aria-hidden="true"></i> Live</span> <span class="label label-danger" onclick="Dashboard.stopStreaming();"><i class="fa fa-ban" aria-hidden="true"></i> Stop</span>';
}



Dashboard.stopStreaming = function() {
	Dashboard.setStreamOffline();
	soundManager.stop("live");
	soundManager.destroySound("live");
}



Dashboard.requestPremmisions = function() {
	Notification.requestPermission();
}



Dashboard.setMOTD = function(Text) {
		document.getElementById("motd").style.display = "";
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

		document.getElementById("serverMotd").innerHTML = Text2;
		console.log("Server motd: " + Text2);
	}
	//google cast code is in openaudio-tv.js

onload = enable

function ConnectToHueBridge() {
	if (!localStorage.MyHueBridgeIP) { // No Cached BridgeIP?
		MyHue.PortalDiscoverLocalBridges().then(function BridgesDiscovered() {
			console.log('Bridge IP: ' + MyHue.BridgeIP);
			MyHue.BridgeGetConfig().then(function BridgeConfigReceived() {
				MyHue.BridgeGetData().then(function BridgeDataReceived() {
					localStorage.MyHueBridgeIP = MyHue.BridgeIP; // Cache BridgeIP
					on_hue_link();
				}, function UnableToRetreiveBridgeData() {
					console.log('Please press connect button on the hue Bridge');
					MyHue.BridgeCreateUser().then(function BridegeUserCreated() {
						localStorage.MyHueBridgeIP = MyHue.BridgeIP; // Cache BridgeIP
						on_hue_link(MyHue.BridgeName);
						return;
					}, function UnableToCreateUseronBridge() {
						document.getElementById("hue_modal_text").innerHTML = "<h2>philips hue lights detected!</h2><h3>Please press the link button!</h3>";
						return;
					});
				});
			}, function UnableToRetreiveBridgeConfig() {
				no_hue_link();
				document.getElementById("hue_text").innerHTML = "Failed to connect with the hue bridge :(";
				return;
			});
		}, function UnableToDiscoverLocalBridgesViaPortal() {
			no_hue_link();
			document.getElementById("hue_text").innerHTML = "Failed to connect with the hue bridge :(";
			return;
		});
	} else {
		console.log('Using Cached Bridge IP');
		MyHue.BridgeIP = localStorage.MyHueBridgeIP;
		console.log('Cached Bridge IP: ' + MyHue.BridgeIP);
		document.getElementById("hue_modal_text").innerHTML = "<h2>Connecting to hue bridge...</h2>";
		document.getElementById("hue_status").style.display = "";
		document.getElementById("hue_text").innerHTML = "Connecting to with hue bridge...";
		MyHue.BridgeGetConfig().then(function CachedBridgeConfigReceived() {
			MyHue.BridgeGetData().then(function CachedBridgeDataReceived() {
				on_hue_link(MyHue.BridgeName);
			}, function UnableToRetreiveCachedBridgeData() {
				delete localStorage.MyHueBridgeIP; // not Whitelisted anymore
				no_hue_link();
				document.getElementById("hue_text").innerHTML = "Failed to connect with the hue bridge :(";
				return;
			});
		}, function UnableToRetreiveCachedBridgeConfig() {
			delete localStorage.MyHueBridgeIP; // not found anymore
			no_hue_link();
			document.getElementById("hue_text").innerHTML = "Failed to connect with the hue bridge :(";
		});
	}
}


function no_hue_link() {
	document.getElementById("hue_modal_text").innerHTML = "<h2>No philips hue bridge found :(</h2><h4>Searching for a hue bridge in your network...</h4>";
	hue_start_animation = true;
}


function invalid_hue_link() {
	document.getElementById("DetectHueButton").style.display = "";
	document.getElementById("hue_modal_text").innerHTML = "<h2>Could not connect to hue bridge :(</h2>";
	StopHueLoop = true;
	window.clearInterval(hue_connect_loop);
}


function loop_hue_connection() {
	HueTestTry = 0;
	document.getElementById("DetectHueButton").style.display = "none";
	hue_connect_loop = window.setInterval(function() {
		HueTestTry++;
		console.log("Hue connect attempt: " + HueTestTry);
		if (!hue_connected || !StopHueLoop) {
			if (+HueTestTry < +5) {
				document.getElementById("DetectHueButton").style.display = "none";
				ConnectToHueBridge();
			} else {
				window.clearInterval(hue_connect_loop);
				console.log("Failed to detect hue bridge :(");
				document.getElementById("hue_modal_text").innerHTML = "<h2>No philips hue bridge found :(</h2>";
				document.getElementById("DetectHueButton").style.display = "";
			}
		} else {
			window.clearInterval(hue_connect_loop);
			console.log("Failed to detect hue bridge :(");
			document.getElementById("hue_modal_text").innerHTML = "<h2>No philips hue bridge found :(</h2>";
			document.getElementById("DetectHueButton").style.display = "";
		}
	}, 5000);
}


function on_hue_link(name) {
	if (hue_start_animation) {
		hue_get_lights();
		window.clearInterval(hue_connect_loop);
		console.log("Hue connected!");
		document.getElementById("HueControlls").style.display = "";
		document.getElementById("hue_modal_text").innerHTML = "<h3>You are now connected with your " + name + " bridge.<br />have fun! :)</h3>";
		document.getElementById("hue_status").style.display = "";
		document.getElementById("hue_text").innerHTML = "Connected with: <i>" + name + "</i>";
		hue_start_animation = false;
		setTimeout(function() {
			hue_off();
			setTimeout(function() {
				hue_on();
				hue_connected = true;
				hue_set_color(HueDefaultColor);
			}, 1000);
		}, 1000);
	}
}


function reset_hue() {
	hue_off();
	setTimeout(function() {
		hue_on();
		hue_connected = true;
		hue_set_color(HueDefaultColor);
	}, 500);
}


function hue_on() {
	for (var key in MyHue.Lights) {
		if (MyHue.Lights.hasOwnProperty(key)) {
			if (hue_lights[key].enabled) {
				MyHue.LightOn(key);
			}
		}
	}
}


function hue_off() {
		for (var key in MyHue.Lights) {
		if (MyHue.Lights.hasOwnProperty(key)) {
			if (hue_lights[key].enabled) {
				MyHue.LightOff(key);
			}
		}
	}
}


function hue_set_brightes(number) {
	for (var key in MyHue.Lights) {
		if (MyHue.Lights.hasOwnProperty(key)) {
			if (hue_lights[key].enabled) {
				MyHue.LightSetBrightness(key, number);
			}
		}
	}
}


function hue_get_lights() {
	for (var key in MyHue.Lights) {
		if (MyHue.Lights.hasOwnProperty(key)) {
			hue_lights[key] = {};
			hue_lights[key].name = MyHue.Lights[key].name;
			hue_lights[key].state = MyHue.Lights[key].state;
			hue_lights[key].enabled = true;
			hue_lights[key].color2 = HueDefaultColor;
			document.getElementById("HueLightList").innerHTML += '<div class="notice notice-success" onclick="hue_list_click_handeler(this);" id="ListLightHue_'+key+'"><strong id="ListLightHue_'+key+'_state">Enabled</strong> '+MyHue.Lights[key].name+'</div>'
		}
	}
}


function hue_list_click_handeler(object) {
	if (object.className === "notice notice-success") {
		//disable light
		
		var lightID = object.id.match(/\d+/)[0];
		hue_lights[lightID].enabled = false;
		object.className = "notice notice-danger";
		document.getElementById(object.id + "_state").innerHTML = "Disabled";
		hue_reset_state(lightID);
		
		
	} else {
		//enable light
		
		var lightID = object.id.match(/\d+/)[0];
		hue_lights[lightID].enabled = true;
		object.className = "notice notice-success";
		document.getElementById(object.id + "_state").innerHTML = "Enabled";
		hue_set_color(hue_lights[lightID].color2, lightID);
		
		
	}
}


function hue_reset_state(id) {
	var state = hue_lights[id].state;
	MyHue.LightSetBrightness(id, state.bri);
	MyHue.LightSetXY(id, state.xy[0], state.xy[1]);
	MyHue.LightAlertNone(id);
	MyHue.LightEffectNone(id);
}


function hue_set_color(args, id) {
	if (hue_connected) {
		try {
			if (id > 3 || id == null || hue_lights[id].enabled === false) {
				//for all lights
				var colorString = args,
				colorsOnly = colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,\s*/);
				red = parseInt(colorsOnly[0]);
				green = parseInt(colorsOnly[1]);
				blue = parseInt(colorsOnly[2]);
				opacity = parseInt(colorsOnly[3]);
				for (var key in MyHue.Lights) {
					if (MyHue.Lights.hasOwnProperty(key)) {
						if (hue_lights[key].enabled) {
							MyHue.LightSetRGB(key, red, green, blue);
							hue_lights[key].color2 = args;
						}
					}
				}
				if (opacity === 0) {
					for (var key in MyHue.Lights) {
						if (MyHue.Lights.hasOwnProperty(key)) {
							if (hue_lights[key].enabled) {
								MyHue.LightOff(key);
							}
						}
					}
				} else {
					for (var key in MyHue.Lights) {
						if (MyHue.Lights.hasOwnProperty(key)) {
							if (hue_lights[key].enabled) {
								MyHue.LightOn(key);
								MyHue.LightSetBrightness(key, opacity);
							}
						}
					}
				}
			} else {
				var colorString = args,
				colorsOnly = colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,\s*/);
				red = parseInt(colorsOnly[0]);
				green = parseInt(colorsOnly[1]);
				blue = parseInt(colorsOnly[2]);
				opacity = parseInt(colorsOnly[3])
				MyHue.LightSetRGB(id, red, green, blue);
				hue_lights[id].color2 = args;
				if (opacity === 0) {
					MyHue.LightOff(id);
				} else {
					MyHue.LightOn(id);
					MyHue.LightSetBrightness(id, opacity);
				}
			}
		} catch (e) {
			console.log("Unable to decode hue color code... well shit.");
		}
	}
}
