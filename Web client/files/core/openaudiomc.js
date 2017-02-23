onload = enable

var openaudio = {};
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
var HueDefaultColor = "rgba(255,255,255,150)";
var isHueOn = true;
var HueTestTry = 0;
var hue_lights = {};
var StopHueLoop = false;
var hue_start_animation = true;

function enable() {

	if (window.location.protocol == "http:") {
	} else if (window.location.protocol == "https:") {
		reloadNonSsl();
	} else {
		console.info("Protocol not supported!");
	}



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

	if (Notification.permission !== "granted") {
			Notification.requestPermission();
	}

	document.getElementById("hue_modal_text").innerHTML = "<h2>Starting hue...</h2><h3>Please wait.</h3>";
}


socketIo.connect = function() {
	var socket = io.connect(socket_io, {
		secure: true
	});
	closedwreason = false;
	socket.on('command', function(msg) {
		if (msg == "connectionSuccess") {
			status_span.innerHTML = "Connected as " + mcname + "! Welcome! :)";
			status_span.className = "status-span status-success";
		} else if (msg == "not_in_server") {
			status_span.innerHTML = "You're not connected to the server...";
			status_span.className = "status-span status-error"
		} else if (msg == "connected") {
			loop_hue_connection();
		} else {
			openaudio.decode(msg);
		}
	});



	socket.on('oaError', function(msg) {
		if (msg == "server-offline") {
			closedwreason = true;
			status_span.innerHTML = "Server is offline.";
			status_span.className = "label label-danger";
			console.log("Received offline server data");
		} else if (msg == "kicked") {
			closedwreason = true;
			status_span.innerHTML = "Invalid url.";
			status_span.className = "label label-danger";
			document.getElementById("box").className = document.getElementById("box").className + " animated bounceOutUp";
			swal({
				title: "Invalid connection!",
				text: "Sorry but your url is not valid :( Please request a new url via <b>/audio</b> or <b>/connect</b>.",
				showCancelButton: false,
				allowOutsideClick: false,
				allowEscapeKey: false,
				showConfirmButton: false,
				html: true
			}, function() {});
		}
	});



	socket.on('disconnect', function() {
		console.log("Disconnect");
	});



	socket.on('connect', function() {
		socketIo.log("Connecting as:\nUser: " + mcname + "\nId: " + clientID + "\nToken: " + clientTOKEN);
		closedwreason = false;
		socket.emit("message", '{"type":"client","clientid":"' + clientID + '","user":"' + mcname + '","key":"' + clientTOKEN + '"}');
	});
}



socketIo.log = function(data) {
	console.info("[Socket.Io] " + data);
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



function openSettings(htmlSettings) {
	$("#UserBox").fadeTo("slow", 0.1, function() {
		swal({
			title: "HTML <small>Title</small>!",
			text: "A custom <span style='color: #F8BB86'>html<span> message.",
			html: true
		}, function() {
			$("#UserBox").fadeTo("slow", 1, function() {});
		});
	});
}



openaudio.decode = function(msg) {
	request = JSON.parse(msg);

	if (request.src != null) {
		if (request.src.includes("soundcloud.com")) {
			var scurl = request.src;
			request.src = "http://api.craftmend.com/soundcloud/?file=" + scurl;
		}
	}

	if (request.command == "play_normal")
	{
		openaudio.play(request.src);
	}
	else if (request.command == "stop")
	{
		openaudio.playAction("stop");
		try {loadedsound.stop();} catch(e) {}
		try {soundManager.stop('loop');
	soundManager.destroySound('loop');} catch(e) {}
	}
	else if (request.type == "hue")
	{
		//Philips hue related stuff
	}
	else if (request.command == "message")
	{
		//Browser messages
		openaudio.message(request.string);
	}
	else if (request.command == "loop")
	{
		openaudio.loop(request.src);
	}
	else if (request.type == "region")
	{
		//Regions relateed stuff
		if (request.command == "stopRegion")
		{
			openaudio.stopregion();
		}
		else if (request.command == "startRegion")
		{
			openaudio.playregion(request.src);
		}
		else if (request.command == "stopOldRegion")
		{
			stopOldRegion();
		}
	}
	else if (request.command == "volume")
	{
		fadeAllTarget(request.volume);
	}
	else if (request.type == "buffer")
	{
		if (request.command == "play")
		{
			openaudio.playbuffer();
		}
		else if (request.command == "create")
		{
			openaudio.createBuffer(request.src);
		}
	}
	else if (request.command == "hue")
	{
		if (request.type == "set")
		{
			var values = request.target.split(':');
			var colorcode = values[0];
			try {
				//light is specified
				var light = values[1];
				hue_set_color(colorcode, light);
			} catch(e) {
				//no light code
				hue_set_color(colorcode);
			}
		}
		else if (request.type == "reset")
		{
			hue_set_color(HueDefaultColor);
		}
		else if (request.type == "blink")
		{
		for (var key in MyHue.Lights) {
				if (MyHue.Lights.hasOwnProperty(key)) {
					if (hue_lights[key].enabled) {
						MyHue.LightAlertLSelect(key);
					}
				}
			}
		}
		else if (request.type == "cyclecolors")
		{
		for (var key in MyHue.Lights) {
				if (MyHue.Lights.hasOwnProperty(key)) {
					if (hue_lights[key].enabled) {
						MyHue.LightEffectColorloop(key);
					}
				}
			}
		}
		else if (request.type == "stop")
		{
		for (var key in MyHue.Lights) {
			if (MyHue.Lights.hasOwnProperty(key)) {
				if (hue_lights[key].enabled) {
					MyHue.LightAlertNone(key);
					MyHue.LightEffectNone(key);
				}
			}
		}
		}
	}
	else if (request.command == "setbg")
	{
		if (request.type == "set")
		{
			document.body.background = request.target;
		}
		else if (request.type == "reset")
		{
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



openaudio.regionAction = function(action_is_fnc) {
	for (var i = 0; i < listSounds().split(',').length; i++) {
		listSounds().split(',')[i] = listSounds().split(',')[i].replace(/^\s*/, "").replace(/\s*$/, "");
		if (listSounds().split(',')[i].indexOf("region") !== -1) {

			if (action_is_fnc === "stop") {
				fadeIdOut(listSounds().split(',')[i]);
			}

		}
	}
}



openaudio.playregion = function(src_fo_file) {
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



openaudio.stopregion = function() {
	openaudio.regionAction("stop");
}



openaudio.play = function(src_fo_file) {
	var soundId = "play";
	if (isFading[soundId] === true) {
		stopFading[soundId] = true;
	}
	soundManager.createSound({
		id: "play_" + Math.floor(Math.random() * 60) + 1,
		url: src_fo_file,
		volume: volume,
		autoPlay: true,
	});
}




openaudio.set_volume = function(volume_var) {
	if (volume_var > 100) {
		document.getElementById("slider").value = 100;
		volume_text.innerHTML = "Volume: 100%";
		soundManager.setVolume(100);
		document.getElementById("volumevalue").innerHTML = 100;
		document.getElementById("volumevalue").style.left = 100 * 2.425 + 'px';
		volume = 100;
	} else if (volume_var < 0) {
		document.getElementById("slider").value = 0;
		volume_text.innerHTML = "Volume: 0%";
		soundManager.setVolume(0);
		volume = 0;
		document.getElementById("volumevalue").innerHTML = 0;
		document.getElementById("volumevalue").style.left = 0 * 2.425 + 'px';
	} else {
		document.getElementById("slider").value = volume_var;
		document.getElementById("volumevalue").innerHTML = volume_var;
		document.getElementById("volumevalue").style.left = volume_var * 2.425 + 'px';
		volume = volume_var;
		soundManager.setVolume(volume_var);
	}
}



openaudio.set_volume2 = function(volume_var) {
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



openaudio.playbuffer = function() {
	try {
		loadedsound.play({
			volume: volume
		});
	} catch(e) {

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
		var notification = new Notification("OpenAudioMc | %username%".replace(/%username%/g, mcname), {
			icon: 'files/images/footer_logo.png',
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

		if (FadeEnabled) {
			isFading[soundId] = true;
			backAudio.animate({
				value: volumeTarget
			}, {
				duration: 1000,
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
			client.set_volume(volumeTarget);
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
						document.getElementById("hue_modal_text").innerHTML = "<h2>philips hue lights detected!</h2><h3>Please press the link button!</h3>";
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
		document.getElementById("hue_modal_text").innerHTML = "<h2>Connecting to hue bridge...</h2>";
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



function reloadNonSsl() {
	console.log("Reloading...")
	setTimeout(1500, function() {
		console.log("Reloaded")
		window.location = document.URL.replace("https://", "http://");
	});
	window.location = document.URL.replace("https://", "http://");
}



function showqr() {
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
