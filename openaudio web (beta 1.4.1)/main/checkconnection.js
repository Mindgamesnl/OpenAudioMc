function testing(wsip, wsport) {
	conerror = false;
	document.getElementById("content").innerHTML = "<h2>Connecting...</h2>";
	if (window.location.protocol == "http:") {
		//server is using a non ssl protocol
		connect("ws://" + wsip + ":" + wsport);
	} else if (window.location.protocol == "https:") {
		//connect using ssl and websocket
		connect("wss://" + wsip + ":" + wsport);
	} else {
		console.log("Protocol not supported!");
	}
	
		setTimeout(function() {
		if (conerror === true) {
			document.getElementById("content").innerHTML = "<h2 style='color:red;'>Invalid connection! please check your server info or restart the server and try again</h2>";
		} else {
			document.getElementById("content").innerHTML = "<h2 style='color:green;'>connection successful!</h2>";
			document.getElementById("next").style.display = "";
		}
	}, 3000);
	
}

function connect(host) {
	var ws = new WebSocket(host);
	ws.onopen = function() {
		//CONNECTION SUCCESS
		document.getElementById("content").innerHTML = "<h2 style='color:green;'>connection successful! loading...</h2>";
	};

	ws.onmessage = function(evt) {
		
	}


	ws.onclose = function() {
		conerror = true;
	};

	ws.onerror = function(err) {
		conerror = true;
	};
} 