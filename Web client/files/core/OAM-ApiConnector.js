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
			addJs("https://rawgit.com/OpenAudioMc/Lang-packs/master/" + settings.language + ".js");
			if (settings.asound != null) {
				ambiance = settings.asound;
			} else {
				ambiance = "";
			}
			
			if (settings.ambdelay != null) {
				ambdelay = settings.ambdelay;
			}

			if (settings.twitter != "" && settings.twitter != null) {
				twitterIcon = new trayItem("fa-twitter", "openTwitter");
				twitter = settings.twitter;
			}
			
			if (settings.minime == "on" && settings.twitter != null) {
				if (tinyWindow == "(none)") {
					minimeicon = new trayItem("fa-window-minimize", "openSmallWindow");
				}
			}

			
			
			if (settings.qrcode != null && settings.qrcode != "off") {
				$.getScript("files/js/qrcode.js", function() {qrbutton = new trayItem("fa-qrcode", "showqr");});
			}

			if (settings.youtube != "" && settings.youtube != null) {
				youtubeIcon = new trayItem("fa-youtube-play", "openYt");
				youtube = settings.youtube;
			}
			if (settings.website != "" && settings.website != null) {
				websiteIcon = new trayItem("fa-globe", "openSite");
				website = settings.website;
			}
			if (settings.uicolor != null && settings.uicolor != "") {
				document.getElementById("sc-title").style.background = "#" + settings.uicolor;
				document.getElementById("sc-cover").style.border = "6px solid " + "#" + settings.uicolor;
				openaudio.color("#" + settings.uicolor);
				iconcolor = settings.uicolor;
				document.getElementById("icons").color = "'#" + settings.uicolor + "'";
				$('#icons').find('li').each(function() {
					this.style.color = "#" + settings.uicolor
				});
			}
			setTimeout(function() {
				if (settings.hue != "off") {
          $.getScript("files/core/OAM-Hue.js", function() {
            loop_hue_connection();
					hueicon = new trayItem("fa-lightbulb-o", "openhue");
					hue_enabled = true;
          });
				} else {
					document.getElementById("hue_modal_text").innerHTML = "<h2>" + langpack.hue.disabled + "</h2>";
				}
				status_span.innerHTML = langpack.message.welcome.replace("%name%", mcname);
				document.getElementById("client-title").innerHTML = settings.Title;
				document.title = settings.Title;
				if (settings.bg == "") {} else {
					document.body.background = settings.bg;
				}
				if (settings.logo == "") {
					document.getElementById("logo").src = "files/images/footer_logo.png";
				} else {

					(function() {
						var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
						link.type = 'image/x-icon';
						link.rel = 'shortcut icon';
						link.href = settings.logo;
						document.getElementsByTagName('head')[0].appendChild(link);
					}());
					document.getElementById("logo").src = settings.logo;
				}

			}, 1000);
		} else {
			ba = new trayItem("fa-warning", "showPlus");
			ba = new trayItem("fa-warning", "showPlus");
			ba = new trayItem("fa-warning", "showPlus");
			ba = new trayItem("fa-warning", "showPlus");
			ba = new trayItem("fa-warning", "showPlus");
			swal('Account info!','This web site has not been claimed yet!<br /><a style="color:red" href="https://plus.openaudiomc.net/">click here to claim this account</a>!<br /> It only takes 1 minute of your time.','error');
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