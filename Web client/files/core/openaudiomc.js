 openaudio = {};
var socketIo = {};
var ui = {};
var fadingData = {};
var stopFading = {};
var isFading = {};
var volume = 20;
var FadeEnabled = true;
var newest_region = 0;
var last_region_id = 1;
var hue_connected = {};
var MyHue = new huepi();
var HueDefaultColor = "rgba(255	,255,255,150)";
var isHueOn = true;
var HueTestTry = 0;
var hue_lights = {};
var hue_enabled = false;
var StopHueLoop = false;
var hue_start_animation = true;
var audio = [];
var soundcloud_title = "-";
var soundcloud_icon = "files/images/soundcloud-2.png";
var soundcloud_url = "https://soundcloud.com/stream";

function SetDesignColor(code) {
	document.getElementById("box").style = "background-color: "+code+";";
}

document.body.onkeydown = function(data){

	if (data.key == "ArrowDown" || data.key == "ArrowLeft") {
		var slider = document.getElementById("slider");
		slider.value = slider.value - 1;
		openaudio.set_volume(slider.value);
		sliderValue(slider.value);
	}

	if (data.key == "h") {
		if (hue_enabled) {
			openhue();
		} else {
			swal("Hue is disabled.");
		}
	}

	if (data.key == "ArrowUp" || data.key == "ArrowRight") {
		var slider = document.getElementById("slider");
		var val = ++slider.value;
		slider.value = val;
		openaudio.set_volume(slider.value);
		sliderValue(slider.value);
	}
}

function loadAllFromJson(pack) {
	var json = JSON.parse(pack);
	var jsfiles = json.js;
	var cssfiles = json.css;
	for (var i = 0; i < jsfiles.length; i++) {
			addJs(jsfiles[i]);
	}
	for (var i2 = 0; i2 < cssfiles.length; i2++) {
			addCss(cssfiles[i2]);
	}
}

var langpack = {};
langpack.hue = {};
langpack.message = {};
langpack.notification = {};

langpack.message.welcome = "Connected as %name%! Welcome! :)";
langpack.message.notconnected = "You're not connected to the server...";
langpack.message.server_is_offline = "Server is offline.";
langpack.message.inavlid_url = "Invalid url.";
langpack.message.invalid_connection = "Invalid connection!";
langpack.message.reconnect_prompt = "Sorry but your url is not valid :( Please request a new url via <b>/audio</b> or <b>/connect</b>.";
langpack.message.socket_closed = "Disconnected from the server, please wait";
langpack.message.mobile_qr = "Qr code for mobile client";
langpack.message.listen_on_soundcloud = "Listen on soundcloud!";

langpack.notification.header = "OpenAudioMc | %username%";
langpack.notification.img = 'files/images/footer_logo.png';

langpack.hue.disabled = "philips hue lights are disabled by the server admin!";
langpack.hue.please_link = "<h2>philips hue lights detected!</h2><h3>Please press the link button!</h3>";
langpack.hue.connecting = "<h2>Connecting to hue bridge...</h2>";
langpack.hue.re_search_bridge = "<h2>No philips hue bridge found :(</h2><h4>Searching for a hue bridge in your network...</h4>";
langpack.hue.cant_connect = "<h2>Could not connect to hue bridge :(</h2>";
langpack.hue.not_found = "<h2>No philips hue bridge found :(</h2>";
langpack.hue.connected_with_bridge = "<h3>You are now connected with your %bridgename% bridge.<br />have fun! :)</h3>";



soundManager.setup({
	defaultOptions: {
		onfinish: function() {
			handleSoundEnd(this.id);
		}
	}
});

function handleSoundEnd(fullId) {
	var id = fullId.split("_")[2];
	if (id != "undefined") {
		var whisper = {};
		whisper.command = "SoundEnded";
		whisper.id = id;
		openaudio.whisper(JSON.stringify(whisper));
	}
}

function enable() {
	//setup vars
	status_span = document.getElementById("status-span");
	volume_text = document.getElementById("volume");

	if (getCookie("volume") != null) {
		openaudio.set_volume(getCookie("volume"));
	}

	//setup session data
	var [a, b] = session.split(':');
	clientID = a;
	clientTOKEN = b;

	//connect to the craftmend server
	socketIo.connect();
	document.getElementById("DetectHueButton").style.display = "none";

	document.getElementById("skull").src = "https://crafatar.com/avatars/" + mcname + "?overlay";

	if (Notification.permission !== "granted") {
		Notification.requestPermission();
	}

	document.getElementById("hue_modal_text").innerHTML = "<h2>"+langpack.hue.disabled+"</h2>";
}


socketIo.connect = function() {
	socket = io.connect(socket_io, {
		secure: true
	});
	closedwreason = false;
	socket.on('command', function(msg) {
		socketIo.log("Reiceived command.");
		if (msg == "connectionSuccess") {
			status_span.innerHTML = langpack.message.welcome.replace("%name%", mcname);
			status_span.className = "status-span status-success";
		} else if (msg == "not_in_server") {
			status_span.innerHTML = langpack.message.notconnected;
			status_span.className = "status-span status-error"
		} else if (msg == "connected") {

		} else {
			openaudio.decode(msg);
		}
	});

	socket.on('oaCss', function(msg) {
		if (msg != null) {
			var msg = JSON.parse(msg);
			var arrayLength = msg.length;
			for (var i = 0; i < arrayLength; i++) {
				addCss(msg[i]);
			}
		}
	});

	socket.on('oaJs', function(msg) {
		if (msg != null) {
			var msg = JSON.parse(msg);
			var arrayLength = msg.length;
			for (var i = 0; i < arrayLength; i++) {
				addJs(msg[i]);
			}
		}
	});

	socket.on('oaSettings', function(msg) {
		if (msg != null) {
			var settings = JSON.parse(msg);
			addJs("https://rawgit.com/OpenAudioMc/Lang-packs/master/"+settings.language+".js");
			setTimeout(function() {
				if (settings.hue != "off") {
					loop_hue_connection();
					hueicon = new trayItem("fa-lightbulb-o", "openhue");
					hue_enabled = true;
				} else {
					document.getElementById("hue_modal_text").innerHTML = "<h2>"+langpack.hue.disabled+"</h2>";
				}
				status_span.innerHTML = langpack.message.welcome.replace("%name%", mcname);
				document.getElementById("client-title").innerHTML = settings.Title;
				document.title = settings.Title;
				if (settings.bg == "") {
				} else {
					document.body.background = settings.bg;
				}
				if (settings.logo == "") {
					document.getElementById("logo").src = "files/images/footer_logo.png";
				} else {

					(function() {
							var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
							link.type = 'image/x-icon';
							link.rel = 'shortcut icon';
							link.href = settings.logo	;
							document.getElementsByTagName('head')[0].appendChild(link);
					}());
					document.getElementById("logo").src = settings.logo;
				}

			}, 1000);
		}
	});

	socket.on('oaError', function(msg) {
		socketIo.log("Received error.");
		if (msg == "server-offline") {
			closedwreason = true;
			status_span.innerHTML = langpack.message.server_is_offline;
			status_span.className = "label label-danger";
			socketIo.log("Received offline server data");
		} else if (msg == "kicked") {
			closedwreason = true;
			status_span.innerHTML = langpack.message.inavlid_url;
			status_span.className = "label label-danger";
			document.getElementById("box").className = document.getElementById("box").className + " animated bounceOutUp";
			swal({
				title: langpack.message.invalid_connection,
				text: langpack.message.reconnect_prompt,
				showCancelButton: false,
				allowOutsideClick: false,
				allowEscapeKey: false,
				showConfirmButton: false,
				html: langpack.message.reconnect_prompt
			}, function() {});
		} else {
			var message = JSON.parse(msg);

			//Whoah, why is thi in the code?
			//So we can ban servers/users who use openaudio for bad things
			//You can remove it if you wanna :3

			if (message.command == "banned") {
				swal({
					title: "Oh no, it looks like this server is banned :(",
					text: "Ban info: " + message.message,
					showCancelButton: false,
					allowOutsideClick: false,
					allowEscapeKey: false,
					showConfirmButton: false,
					html: "Ban info: " + message.message
				}, function() {});
			}
		}
	});



	socket.on('disconnect', function() {
		socketIo.log("Disconnected!");
		status_span.innerHTML = langpack.message.socket_closed;
		status_span.className = "status-span status-danger";
	});



	socket.on('connect', function() {
		console.info("[Socket.io] Connected!");
		socketIo.log("Connecting as: User: " + mcname + " Id: " + clientID + " Token: " + clientTOKEN);
		closedwreason = false;
		socket.emit("message", '{"type":"client","clientid":"' + clientID + '","user":"' + mcname + '","key":"' + clientTOKEN + '"}');
		socketIo.log("Message send.");
	});
}



openaudio.whisper = function(message) {
	socket.emit("whisperToServer", message);
	console.info("[Socket.io] Whisper send.");
}

socketIo.log = function(data) {
	console.info("[Socket.Io] " + data);
}



function listSounds() {
	var obj = soundManager.sounds;
	var str = '';
	for (var p in obj) {
		if (obj.hasOwnProperty(p)) {
			if (soundManager.getSoundById(p).metadata. !== true) {
				str += p + ",";
			}
		}
	}
	return str;
}

function listSpeakerSounds() {
	var obj = soundManager.sounds;
	var str = '';
	for (var p in obj) {
		if (obj.hasOwnProperty(p)) {
			if (soundManager.getSoundById(p).metadata.speaker !== false) {
				str += p + ",";
			}
		}
	}
	return str;
}


openaudio.skipTo = function(id, timeInS) {
	openaudio.setIdAtribute(id, function(fullID) {
		var s = parseInt(timeInS);
		var t = s * 1000;
		soundManager.setPosition(fullID, t);
	});
}


function openhue() {
	$('#Hue').modal('show');
}


openaudio.decode = function(msg) {
	request = JSON.parse(msg);
	if (request.command == "play_normal") {
		if (request.src.includes("soundcloud.com")) {
			var scurl = request.src;
			getSoundcloud(scurl, function(newurl) {
				request.src = newurl;
				openaudio.play(request.src);
			});
		} else {
			openaudio.play(request.src);
		}
	} else if (request.command == "stop") {
		openaudio.playAction("stop");
		try {
			loadedsound.stop();
		} catch (e) {}
		try {
			soundManager.stop('loop');
			soundManager.destroySound('loop');
		} catch (e) {}
		try {
			soundManager.stop('AutoDj');
			soundManager.destroySound('AutoDj');
		} catch (e) {}
	} else if (request.command == "custom") {
		var str = request.string;
		console.log("Custom json for developers: " + str);
	} else if (request.command == "loadmod") {
		if (request.type == "css") {
			addCss(request.src);
		} else if (request.type == "js") {
			addJs(request.src);
		}
	} else if (request.command == "playlist") {
		var myStringArray = request.array;
		var arrayLength = myStringArray.length;
		PlayList_songs = {};
		for (var i = 0; i < arrayLength; i++) {
			var song = myStringArray[i];
			if (song.includes("soundcloud.com")) {
				var scurl2 = request.src;
				getSoundcloud(scurl2, function(newurl) {
					song = newurl;
				});
			}
			if (song.includes("soundcloud.com")) {
				var scurl = request.src;
				getSoundcloud(scurl, function(newurl) {
					AutoDj.AddSong(newurl);
				});
			} else {
				AutoDj.AddSong(song);
			}
			var valid = true;
		}
		if (valid) {
			AutoDj.AddedCount = 1;
			AutoDj.IdOfNowPlaying = 1;
			AutoDj.LoadAll();
			AutoDj.PlayNext();
		} else {
			console.error("error while loading autodj")
		}
	} else if (request.command == "message") {
		//Browser messages
		openaudio.message(request.string);
	} else if (request.command == "speaker") {
		if (request.type == "add") {
			if (request.src.includes("soundcloud.com")) {
			var scurl = request.src;
			getSoundcloud(scurl, function(newurl) {
					openaudio.newspeaker(newurl, "speaker", request.time, request.volume);
			});
		} else {
			openaudio.newspeaker(request.src, "speaker", request.time, request.volume);
		}
		} else if (request.type == "volume") {
			for (var i = 0; i < listSpeakerSounds().split(',').length; i++) {
			listSpeakerSounds().split(',')[i] = listSpeakerSounds().split(',')[i].replace(/^\s*/, "").replace(/\s*$/, "");
				if ((listSpeakerSounds().split(',')[i].indexOf("speaker_") !== -1)) {
					soundManager.setVolume(listSpeakerSounds().split(',')[i],request.volume);
				}
			}
		} else if (request.type == "stop") {
			openaudio.removeSpeaker("speaker");
		} else if (request.type == "stopall") {
			openaudio.removeSpeaker("speaker");
		}
	} else if (request.command == "skipto") {
		//skip to
		openaudio.skipTo(request.id, request.timeStamp);
	} else if (request.command == "setvolumeid") {
		openaudio.set_directed_volume(request.id, request.volume);
	} else if (request.command == "play_normal_id") {
		if (request.src.includes("soundcloud.com")) {
			var scurl = request.src;
			getSoundcloud(scurl, function(newurl) {
				openaudio.play(newurl, request.id, request.time);
			});
		} else {
			openaudio.play(request.src, request.id, request.time);
		}
	} else if (request.command == "stop_id") {
		openaudio.stop_id(request.id);
	} else if (request.command == "toggle") {
		//I KNOW TOOGLE IS A TYPO
		openaudio.toogle_id(request.id);
	} else if (request.command == "loop") {
		if (request.src.includes("soundcloud.com")) {
			var scurl = request.src;
			getSoundcloud(scurl, function(newurl) {
				openaudio.loop(newurl);
			});
		} else {
			openaudio.loop(request.src);
		}
	} else if (request.type == "region") {
		//Regions relateed stuff
		if (request.command == "stopRegion") {
			openaudio.stopregion();
		} else if (request.command == "startRegion") {

			if (request.src.includes("soundcloud.com")) {
				var scurl = request.src;
				getSoundcloud(scurl, function(newurl) {
					openaudio.playregion(newurl);
				});
			} else {
				openaudio.playregion(request.src);
			}
		} else if (request.command == "stopOldRegion") {
			stopOldRegion();
		}
	} else if (request.command == "volume") {
		fadeAllTarget(request.volume);
	} else if (request.type == "buffer") {
		if (request.command == "play") {
			openaudio.playbuffer();
		} else if (request.command == "create") {

			if (request.src.includes("soundcloud.com")) {
				var scurl = request.src;
				getSoundcloud(scurl, function(newurl) {
					openaudio.createBuffer(newurl);
				});
			} else {
				openaudio.createBuffer(request.src);
			}
		}
	} else if (request.command == "hue") {
		if (request.type == "set") {
			var values = request.target.split(':');
			var colorcode = values[0];
			try {
				//light is specified
				var light = values[1];
				hue_set_color(colorcode, light);
			} catch (e) {
				//no light code
				hue_set_color(colorcode);
			}
		} else if (request.type == "reset") {
			hue_set_color(HueDefaultColor);
		} else if (request.type == "blink") {
			for (var key in MyHue.Lights) {
				if (MyHue.Lights.hasOwnProperty(key)) {
					if (hue_lights[key].enabled) {
						MyHue.LightAlertLSelect(key);
					}
				}
			}
		} else if (request.type == "cyclecolors") {
			for (var key in MyHue.Lights) {
				if (MyHue.Lights.hasOwnProperty(key)) {
					if (hue_lights[key].enabled) {
						MyHue.LightEffectColorloop(key);
					}
				}
			}
		} else if (request.type == "stop") {
			for (var key in MyHue.Lights) {
				if (MyHue.Lights.hasOwnProperty(key)) {
					if (hue_lights[key].enabled) {
						MyHue.LightAlertNone(key);
						MyHue.LightEffectNone(key);
					}
				}
			}
		}
	} else if (request.command == "setbg") {
		if (request.type == "set") {
			document.body.background = request.target;
		} else if (request.type == "reset") {
			document.body.background = "";
		}
	}
}



openaudio.playAction = function(action_is_fnc) {
	for (var i = 0; i < listSounds().split(',').length; i++) {
		listSounds().split(',')[i] = listSounds().split(',')[i].replace(/^\s*/, "").replace(/\s*$/, "");
		if (listSounds().split(',')[i].indexOf("play_") !== -1) {
			if (action_is_fnc === "stop") {
				fadeIdOut(listSounds().split(',')[i]);
			}
		}
	}
}


openaudio.setGlobalVolume = function(volume) {
	for (var i = 0; i < listSounds().split(',').length; i++) {
		listSounds().split(',')[i] = listSounds().split(',')[i].replace(/^\s*/, "").replace(/\s*$/, "");
		try {
			soundManager.getSoundById(listSounds().split(',')[i]).setVolume(volume);
		} catch (e) {
			//no sounds avalible
		}
	}
}



openaudio.regionAction = function(action_is_fnc) {
	for (var i = 0; i < listSounds().split(',').length; i++) {
		listSounds().split(',')[i] = listSounds().split(',')[i].replace(/^\s*/, "").replace(/\s*$/, "");
		if (listSounds().split(',')[i].indexOf("oa_region_") !== -1) {
			if (action_is_fnc === "stop") {
				fadeIdOut(listSounds().split(',')[i]);
			}
		}
	}
}



openaudio.playregion = function(src_fo_file) {
	var soundId = "oa_region_";
	if (isFading[soundId] === true) {
		stopFading[soundId] = true;
	}


	loop_active = true;
	oldRegion = newest_region;
	last_region_id++;
	newest_region = last_region_id;
	var regionsound = soundManager.createSound({
		id: "oa_region_" + newest_region,
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
	fadeIdTarget("oa_region_" + newest_region, volume);
}



function stopOldRegion() {
	fadeIdOut("oa_region_" + oldRegion);
}



openaudio.stopregion = function() {
	openaudio.regionAction("stop");
}

openaudio.newspeaker = function(src_to_file, soundID, defaultTime, startingvoluem) {

	var id = "speaker_" + Math.floor(Math.random() * 60) + 1 + "_" + soundID;
	var soundId = "speaker";
	if (isFading[soundId] === true) {
		stopFading[soundId] = true;
	}
	var speakersound = soundManager.createSound({
		id: "speaker_ding",
		url: src_to_file,
		volume: startingvoluem,
		from: defaultTime*1000,
		autoPlay: true,
	});
	function loopSound(sound) {
		sound.play({
			onfinish: function() {
				loopSound(sound);
			}
		});
	}
	loopSound(speakersound);
	soundManager.getSoundById(id).metadata.speaker = true;
}


openaudio.removeSpeaker = function(id) {
	for (var i = 0; i < listSpeakerSounds().split(',').length; i++) {
			listSpeakerSounds().split(',')[i] = listSpeakerSounds().split(',')[i].replace(/^\s*/, "").replace(/\s*$/, "");
				if (listSpeakerSounds().split(',')[i].indexOf(id) !== -1 && (listSpeakerSounds().split(',')[i].indexOf("speaker_") !== -1)) {
					soundManager.destroySound("speaker_ding");
				}
			}
		}


openaudio.play = function(src_fo_file, soundID, defaultTime) {
	if (soundID === null) {
		var soundID = 'default';
	}

	if (defaultTime === null) {
		var defaultTime = 0;
	}

	var soundId = "play";
	if (isFading[soundId] === true) {
		stopFading[soundId] = true;
	}
	var mySoundObject = soundManager.createSound({
		id: "play_" + Math.floor(Math.random() * 60) + 1 + "_" + soundID,
		url: src_fo_file,
		volume: volume,
		from: defaultTime,
		autoPlay: true,
	});
}



openaudio.setIdAtribute = function(ID, callback) {
	if (!ID.includes("/")) {
		for (var i = 0; i < listSounds().split(',').length; i++) {
			listSounds().split(',')[i] = listSounds().split(',')[i].replace(/^\s*/, "").replace(/\s*$/, "");
			if (listSounds().split(',')[i].indexOf(ID) !== -1 && (listSounds().split(',')[i].indexOf("play_") !== -1 || listSounds().split(',')[i].indexOf("oa_region_") !== -1)) {
				callback(listSounds().split(',')[i])
			}
		}
	} else {
		var string = ID;
		string = string.split("/");
		var stringArray = [];
		for (var loopids = 0; loopids < string.length; loopids++) {
			stringArray.push(string[loopids]);
		}
		stringArray.forEach(function(entry) {
			for (var i = 0; i < listSounds().split(',').length; i++) {
				listSounds().split(',')[i] = listSounds().split(',')[i].replace(/^\s*/, "").replace(/\s*$/, "");
				if (listSounds().split(',')[i].indexOf(entry) !== -1 && (listSounds().split(',')[i].indexOf("play_") !== -1 || listSounds().split(',')[i].indexOf("oa_region_") !== -1)) {
					callback(listSounds().split(',')[i])
				}

			}
		});
	}
}


openaudio.set_directed_volume = function(volume, ID) {
	var volume = parseInt(volume);
	if (volume > 100) {
		openaudio.setIdAtribute(ID, function(fullID) {
			soundManager.setVolume(fullID, 100);
		});
	} else if (volume < 0) {
		openaudio.setIdAtribute(ID, function(fullID) {
			soundManager.setVolume(fullID, 0);
		});
	} else {
		openaudio.setIdAtribute(ID, function(fullID) {
			soundManager.setVolume(fullID, volume);
		});
	}
}



openaudio.stop_id = function(ID) {
	openaudio.setIdAtribute(ID, function(fullID) {
		fadeIdOut(fullID);
	});
}



openaudio.toogle_id = function(id) {
	openaudio.setIdAtribute(id, function(fullID) {
		soundManager.togglePause(fullID);
	});
}



openaudio.set_volume = function(volume_var) {
	volume_text = document.getElementById("volume");
	if (volume_var > 100) {
		document.getElementById("slider").value = 100;
		openaudio.setGlobalVolume(100);
		document.getElementById("volumevalue").innerHTML = 100;
		document.getElementById("volumevalue").style.left = 100 * 2.425 + 'px';
		volume = 100;
	} else if (volume_var < 0) {
		document.getElementById("slider").value = 0;
		openaudio.setGlobalVolume(0);
		volume = 0;
		document.getElementById("volumevalue").innerHTML = 0;
		document.getElementById("volumevalue").style.left = 0 * 2.425 + 'px';
	} else {
		document.getElementById("slider").value = volume_var;
		document.getElementById("volumevalue").innerHTML = volume_var;
		document.getElementById("volumevalue").style.left = volume_var * 2.425 + 'px';
		volume = volume_var;
		openaudio.setGlobalVolume(volume_var);
	}
}



openaudio.set_volume2 = function(volume_var) {
	if (volume_var > 100) {
		document.getElementById("slider").value = 100;
		openaudio.setGlobalVolume(100);
		volume = 100;
	} else if (volume_var < 0) {
		document.getElementById("slider").value = 0;
		openaudio.setGlobalVolume(0);
		volume = 0;
	} else {
		document.getElementById("slider").value = volume_var;
		volume = volume_var;
		openaudio.setGlobalVolume(volume_var);
	}
}



openaudio.playbuffer = function() {
	try {
		loadedsound.play({
			volume: volume
		});
	} catch (e) {

	}
}



openaudio.createBuffer = function(file_to_load) {
	loadedsound = soundManager.createSound({
		id: 'loader',
		url: file_to_load
	});
	soundManager.load('loader');
	loadedsound.load();
}



openaudio.message = function(text) {
	if (Notification.permission !== "granted") {
		Notification.requestPermission();
	} else {
		var notification = new Notification(langpack.notification.header.replace(/%username%/g, mcname), {
			icon: langpack.notification.img,
			body: text,
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

		if (FadeEnabled) {
			isFading[soundId] = true;
			backAudio.animate({
				value: 0
			}, {
				duration: 1000,
				step: function(currentLeft, animProperties) {
					//call event when a sound started
					if (stopFading[soundId] !== true) {
						try {
						soundManager.setVolume(soundId, currentLeft);} catch (e) {}
					}
				},
				done: function() {
					if (stopFading[soundId] !== true) {
							try {soundManager.stop(soundId);
						soundManager.destroySound(soundId);} catch (e) {}
					}
					isFading[soundId] = false;
					stopFading[soundId] = false;
					x.remove();
				}
			});
		} else {
			try {	soundManager.stop(soundId);
			soundManager.destroySound(soundId);} catch (e) {}
			x.remove();
		}
	}




	window.fadeIdTarget = function(soundId, volumeTarget) {
		var x = document.createElement("INPUT");
		x.setAttribute("type", "range");
		document.body.appendChild(x);
		x.id = soundId.replace(/\./g,'oapoint').replace(/\:/g,'oadubblepoint').replace(/\//g,'oaslash') + "_Slider_type_2";
		x.min = 0;
		x.max = 100;
		x.value = volume;
		x.style = "display:none;";
		var backAudio = $('#' + soundId.replace(/\./g,'oapoint').replace(/\:/g,'oadubblepoint').replace(/\//g,'oaslash') + "_Slider_type_2");
		document.getElementById('faders').appendChild(x);

		if (FadeEnabled) {
			isFading[soundId] = true;
			backAudio.animate({
				value: volumeTarget
			}, {
				duration: 1000,
				step: function(currentLeft, animProperties) {
					if (stopFading[soundId + "_Slider_type_2"] !== true) {
						soundManager.setVolume(soundId.replace(/\oapoint/g,'.').replace(/\oadubblepoint/g,':').replace(/\oaslas/g,'/'), currentLeft);
					}
				},
				done: function() {
					isFading[soundId] = false;
					stopFading[soundId] = false;
					soundManager.setVolume(soundId.replace(/\oapoint/g,'.').replace(/\oadubblepoint/g,':').replace(/\oaslas/g,'/'), volumeTarget);
					x.remove();
				}
			});
		} else {
			soundManager.setVolume(soundId.replace(/\oapoint/g,'.').replace(/\oadubblepoint/g,':').replace(/\oaslas/g,'/'), volumeTarget);
			x.remove();
		}
	}

	window.fadeIdOutWithSpeaker = function(soundId) {
		var x = document.createElement("INPUT");
		x.setAttribute("type", "range");
		document.body.appendChild(x);
		x.id = soundId.replace(/\./g,'oapoint').replace(/\:/g,'oadubblepoint').replace(/\//g,'oaslash') + "_Slider_type_2";
		x.min = 0;
		x.max = 100;
		x.value = volume;
		x.style = "display:none;";
		var backAudio = $('#' + soundId.replace(/\./g,'oapoint').replace(/\:/g,'oadubblepoint').replace(/\//g,'oaslash') + "_Slider_type_2");
		document.getElementById('faders').appendChild(x);

		if (FadeEnabled) {
			isFading[soundId] = true;
			backAudio.animate({
				value: 0
			}, {
				duration: 100,
				step: function(currentLeft, animProperties) {
					//call event when a sound started
					if (stopFading[soundId] !== true) {
						try {
						soundManager.setVolume(soundId.replace(/\oapoint/g,'.').replace(/\oadubblepoint/g,':').replace(/\oaslas/g,'/'), currentLeft);} catch (e) {}
					}
				},
				done: function() {
					if (stopFading[soundId] !== true) {
							try {soundManager.stop(soundId);
						soundManager.destroySound(soundId.replace(/\oapoint/g,'.').replace(/\oadubblepoint/g,':').replace(/\oaslas/g,'/'));} catch (e) {}
					}
					isFading[soundId] = false;
					stopFading[soundId] = false;
					x.remove();
				}
			});
		} else {
			try {	soundManager.stop(soundId.replace(/\oapoint/g,'.').replace(/\oadubblepoint/g,':').replace(/\oaslas/g,'/'));
			soundManager.destroySound(soundId.replace(/\oapoint/g,'.').replace(/\oadubblepoint/g,':').replace(/\oaslas/g,'/'));} catch (e) {}
			x.remove();
		}
	}


	window.fadeIdTargetSpeaker = function(soundId, volumeTarget) {
		var x = document.createElement("INPUT");
		x.setAttribute("type", "range");
		document.body.appendChild(x);
		x.id = soundId.replace(/\./g,'oapoint').replace(/\:/g,'oadubblepoint').replace(/\//g,'oaslash') + "_Slider_type_2";
		x.min = 0;
		x.max = 100;
		x.value = soundManager.getSoundById(soundId).volume;
		x.style = "display:none;";
		var backAudio = $('#' + soundId.replace(/\./g,'oapoint').replace(/\:/g,'oadubblepoint').replace(/\//g,'oaslash') + "_Slider_type_2");
		document.getElementById('faders').appendChild(x);

		if (FadeEnabled) {
			isFading[soundId] = true;
			backAudio.animate({
				value: volumeTarget
			}, {
				duration: 500,
				step: function(currentLeft, animProperties) {
					if (stopFading[soundId + "_Slider_type_2"] !== true) {
						soundManager.setVolume(soundId.replace(/\oapoint/g,'.').replace(/\oadubblepoint/g,':').replace(/\oaslas/g,'/'), currentLeft);
					}
				},
				done: function() {
					isFading[soundId] = false;
					stopFading[soundId] = false;
					soundManager.setVolume(soundId.replace(/\oapoint/g,'.').replace(/\oadubblepoint/g,':').replace(/\oaslas/g,'/'), volumeTarget);
					x.remove();
				}
			});
		} else {
			soundManager.setVolume(soundId.replace(/\oapoint/g,'.').replace(/\oadubblepoint/g,':').replace(/\oaslas/g,'/'), volumeTarget);
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

		if (FadeEnabled) {
			isFading["global_Slider_type_2"] = true;
			backAudio.animate({
				value: volumeTarget
			}, {
				duration: 1000,
				step: function(currentLeft, animProperties) {
					if (stopFading["global_Slider_type_2"] !== true) {
						openaudio.set_volume2(currentLeft);
					}
				},
				done: function() {
					isFading["global_Slider_type_2"] = false;
					stopFading["global_Slider_type_2"] = false;
					openaudio.set_volume(volumeTarget);
					x.remove();
				}
			});
		} else {
			openaudio.set_volume(volumeTarget);
			x.remove();
		}
	}
});



function ConnectToHueBridge() {
	if (!localStorage.MyHueBridgeIP) { // No Cached BridgeIP?
		MyHue.PortalDiscoverLocalBridges().then(function BridgesDiscovered() {
			MyHue.BridgeGetConfig().then(function BridgeConfigReceived() {
				MyHue.BridgeGetData().then(function BridgeDataReceived() {
					localStorage.MyHueBridgeIP = MyHue.BridgeIP; // Cache BridgeIP
					on_hue_link();
				}, function UnableToRetreiveBridgeData() {
					MyHue.BridgeCreateUser().then(function BridegeUserCreated() {
						localStorage.MyHueBridgeIP = MyHue.BridgeIP; // Cache BridgeIP
						on_hue_link(MyHue.BridgeName);
						return;
					}, function UnableToCreateUseronBridge() {
						document.getElementById("hue_modal_text").innerHTML = langpack.hue.please_link;
						return;
					});
				});
			}, function UnableToRetreiveBridgeConfig() {
				no_hue_link();

				return;
			});
		}, function UnableToDiscoverLocalBridgesViaPortal() {
			no_hue_link();

			return;
		});
	} else {
		MyHue.BridgeIP = localStorage.MyHueBridgeIP;
		document.getElementById("hue_modal_text").innerHTML = langpack.hue.connecting;
		MyHue.BridgeGetConfig().then(function CachedBridgeConfigReceived() {
			MyHue.BridgeGetData().then(function CachedBridgeDataReceived() {
				on_hue_link(MyHue.BridgeName);
			}, function UnableToRetreiveCachedBridgeData() {
				delete localStorage.MyHueBridgeIP; // not Whitelisted anymore
				no_hue_link();

				return;
			});
		}, function UnableToRetreiveCachedBridgeConfig() {
			delete localStorage.MyHueBridgeIP; // not found anymore
			no_hue_link();

		});
	}
}



function no_hue_link() {
	document.getElementById("hue_modal_text").innerHTML = langpack.hue.re_search_bridge;
	hue_start_animation = true;
}



function invalid_hue_link() {
	document.getElementById("DetectHueButton").style.display = "";
	document.getElementById("hue_modal_text").innerHTML = langpack.hue.cant_connect;
	StopHueLoop = true;
	window.clearInterval(hue_connect_loop);
}



function loop_hue_connection() {
	HueTestTry = 0;
	document.getElementById("DetectHueButton").style.display = "none";
	hue_connect_loop = window.setInterval(function() {
		HueTestTry++;
		console.info("[Philips-Hue] Hue connect attempt: " + HueTestTry);
		if (!hue_connected || !StopHueLoop) {
			if (+HueTestTry < +5) {
				document.getElementById("DetectHueButton").style.display = "none";
				ConnectToHueBridge();
			} else {
				window.clearInterval(hue_connect_loop);
				console.info("[Philips-Hue] Failed to detect hue bridge :(");
				document.getElementById("hue_modal_text").innerHTML = langpack.hue.not_found;
				document.getElementById("DetectHueButton").style.display = "";
			}
		} else {
			window.clearInterval(hue_connect_loop);
			console.info("[Philips-Hue] Failed to detect hue bridge :(");
			document.getElementById("hue_modal_text").innerHTML = langpack.hue.not_found;
			document.getElementById("DetectHueButton").style.display = "";
		}
	}, 5000);
}



function on_hue_link(name) {
	if (hue_start_animation) {
		hue_get_lights();
		window.clearInterval(hue_connect_loop);
		console.info("[Philips-Hue] Hue connected!");
		openaudio.whisper("hueConnected");
		document.getElementById("HueControlls").style.display = "";
		document.getElementById("hue_modal_text").innerHTML = langpack.hue.connected_with_bridge.replace("%bridgename%", name);
		hue_start_animation = false;
		setTimeout(function() {
			hue_off();
			setTimeout(function() {
				hue_on();
				hue_connected = true;
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
			document.getElementById("HueLightList").innerHTML += '<div class="notice notice-success" onclick="hue_list_click_handeler(this);" id="ListLightHue_' + key + '"><strong id="ListLightHue_' + key + '_state">Enabled</strong> ' + MyHue.Lights[key].name + '</div>'
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
			console.info("[Philips-Hue] Unable to decode hue color code... well shit.");
		}
	}
}



function showqr() {
	swal({
		title: langpack.message.mobile_qr,
		text: '<center><div id="qrcode"></div></center>',
		CancelButton: false,
		allowOutsideClick: true,
		allowEscapeKey: true,
		showConfirmButton: true,
		html: '<center><div id="qrcode"></div></center>'
	}, function() {});
	var qrcode = new QRCode(document.getElementById("qrcode"), {
		text: document.URL,
		width: 150,
		height: 150,
		colorDark: "#000000",
		colorLight: "#ffffff",
		correctLevel: QRCode.CorrectLevel.H
	});
}


function getCookie(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) {
		return parts.pop().split(";").shift();
	}
}

openaudio.loop = function(src_fo_file) {
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

function sliderValue(vol) {
	//Joww, it's ja boy liturkey doing all the math boi
	var output = document.querySelector("#volumevalue");
	output.value = vol;
	output.style.left = vol * 2.4 + 'px';
}


/*
AUTO DJ SCRIPT FROM
https://github.com/Mindgamesnl/SM2_Playlist_Thingy
*/
var AutoDj = {};
AutoDj.AddedCount = 1;
AutoDj.IdOfNowPlaying = 1;
AutoDj.AddSong = function(File) {
	PlayList_songs["_" + AutoDj.AddedCount] = {
		"File": File
	};
	this.AddedCount++
		PlayList_songs["_" + AutoDj.AddedCount] = "end";
}
AutoDj.LoadAll = function() {
	var thiscount = 1;
	while (PlayList_songs["_" + thiscount] != "end") {
		var this_item = PlayList_songs["_" + thiscount]
		AutoDj["SongData_" + thiscount] = {
			"File": this_item.File,
			"CanBePlayed": true
		}
		console.log("AutoDj: Song loaded with ID:" + thiscount)
		thiscount++
	}
	if (PlayList_songs["_" + thiscount] == "end") {
		var loadedcount = thiscount - 1
		console.log("AutoDj: Loading done (loaded a total of " + loadedcount + " songs.)")
	}
}
AutoDj.Check = function(song_id) {
	if (AutoDj["SongData_" + song_id] != null) {
		var thisdata = AutoDj["SongData_" + song_id];
		if (thisdata.CanBePlayed === true) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}
AutoDj.Play = function(FNC_ID) {
	if (this.Check(FNC_ID) === true) {
		var thisdata = AutoDj["SongData_" + FNC_ID];
		AutoDj.SoundManager_Play(thisdata.File)
	} else {
		console.log("not playing")
	}
}
AutoDj.SoundManager_Play = function(fnc_file) {
	var VolumeNow = this.Volume;
	soundManager.destroySound('AutoDj');
	var mySoundObject = soundManager.createSound({
		id: "AutoDj",
		url: fnc_file,
		volume: volume,
		autoPlay: true,
		onfinish: AutoDj.PlayNext
	});
}
AutoDj.PlayNext = function() {
	var VolgendeLiedje = AutoDj.IdOfNowPlaying + 1;
	if (AutoDj.Check(VolgendeLiedje) === true) {
		AutoDj.Play(VolgendeLiedje);
		AutoDj.IdOfNowPlaying++
	} else {
		AutoDj.IdOfNowPlaying = 1;
		AutoDj.Play(AutoDj.IdOfNowPlaying);

	}
}

function getSoundcloud(Url, callback) {
	console.info("[Soundcloud] Attempting api call!");
	$.getScript("https://craftmend.com/api_SSL/soundcloud/js.php?file=" + Url, function() {
		setTimeout(function() {
			var data = lastSoundCloud;
			if (data === "") {
				soundcloud_title = "-";
				soundcloud_icon = "files/images/sc-default.png";
				soundcloud_url = "https://soundcloud.com/stream";
				console.info("[Soundcloud] Failed to get sound.");
			} else {
				var api = data;
				soundcloud_title = api.title;
				soundcloud_icon = api.artwork_url;
				if (api.artwork_url == null) {
					if (api.avatar_url != null) {
						soundcloud_icon = api.avatar_url;
					} else {
						soundcloud_icon = "files/images/sc-default.png"
					}
				}
				soundcloud_url = api.permalink_url;
				callback("https://api.soundcloud.com/tracks/" + api.id + "/stream?client_id=a0bc8bd86e876335802cfbb2a7b35dd2");
				document.getElementById("sc-cover").src = soundcloud_icon;
				document.getElementById("sc-title").innerHTML = soundcloud_title;
				document.getElementById("sc-cover").style.display = "";
				document.getElementById("sc-title").style.display = "";
				console.info("[Soundcloud] Successfull api call!");
			}
		}, 50);
	});
}

function open_soundcloud() {
	swal({
		title: soundcloud_title,
		imageUrl: soundcloud_icon,
		showCancelButton: true,
		confirmButtonColor: "#3fa5ff",
		confirmButtonText: langpack.message.listen_on_soundcloud,
	}).then(function() {
		window.open(soundcloud_url);
	});
}

function addJs(url) {
	console.info("[ModManager] Attempting to add js file.");
	$.getScript(url, function() {
		console.info("[ModManager] Added js file.");
	});
}

function addCss(url) {
	console.info("[ModManager] Attempting to add css file.");
	$('head').append('<link rel="stylesheet" href="'+url+'" type="text/css" />');
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
	if(this[i] && this[i].parentElement) {
	    this[i].parentElement.removeChild(this[i]);
	}
    }
}


function trayItem(icon, callback) {
	this.ul = document.getElementById("icons");
  this.li = document.createElement("li");
  this.ul.appendChild(document.createTextNode(''));
  this.ul.appendChild(this.li);
	this.li.innerHTML = '<i class="fa '+icon+' fa-2x footer-icon fa-qr-check" aria-hidden="true" onclick="'+callback+'();"></i>';

	this.destroy = function() {
		this.li.remove();
	}
}
