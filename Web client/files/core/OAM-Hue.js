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
			setTimeout(function() {
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