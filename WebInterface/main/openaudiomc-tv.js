//Chromecast
try {
	applicationID = '795493C6';
	namespace = 'urn:x-cast:mindgamesnl.cast.openaudio';
	session = null;
	if (!chrome.cast || !chrome.cast.isAvailable) {
	setTimeout(initializeCastApi, 1000);
	}
} catch(err) {
	console.log("This browser does not support chromecast!");
}

function initializeCastApi() {
	var sessionRequest = new chrome.cast.SessionRequest(applicationID);
	var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
		sessionListener,
		receiverListener);
	chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

function onInitSuccess() {
	appendMessage("onInitSuccess");
}

function onError(message) {
	appendMessage("onError: " + JSON.stringify(message));
}

function onSuccess(message) {
	document.getElementById("cast_logo").style.display = "";
	document.getElementById("cast_logo").src = "Images/google-cast-logo-on.png";
	document.getElementById("streaming_status").style.display = "";
	document.getElementById("streaming_text").innerHTML = "Currently streaming to: <i>ChromeCast</i>";
	appendMessage("onSuccess: " + message);
}

function onStopAppSuccess() {
	appendMessage('onStopAppSuccess');
}

function sessionListener(e) {
	//appendMessage('New session ID:' + e.sessionId);
	session = e;
	session.addUpdateListener(sessionUpdateListener);
	session.addMessageListener(namespace, receiverMessage);
}

function sessionUpdateListener(isAlive) {
	var message = isAlive ? 'Session Updated' : 'Session Removed';
	message += ': ' + session.sessionId;
	console.log(message)
	appendMessage(message);
	if (!isAlive) {
		session = null;
	}
}

function receiverMessage(namespace, message) {
	appendMessage("receiverMessage: " + namespace + ", " + message);
}

function receiverListener(e) {
	if (e === 'available') {
		document.getElementById("cast_logo").style.display = "";
		appendMessage("receiver found");
	} else {
		appendMessage("receiver list empty");
	}
}

function stopApp() {
	session.stop(onStopAppSuccess, onError);
}

function sendMessage(message) {
	if (session != null) {
		session.sendMessage(namespace, message, onSuccess.bind(this, "Message sent: " + message), onError);
	} else {
		chrome.cast.requestSession(function(e) {
			session = e;
			session.sendMessage(namespace, message, onSuccess.bind(this, "Message sent: " + message), onError);
		}, onError);
	}
}

function appendMessage(message) {
	//console.log(message);

}

function transcribe(words) {
	sendMessage(words);
}

function stopStreaming() {
	document.getElementById("cast_logo").style.display = "";
	document.getElementById("cast_logo").src = "Images/google-cast-logo.png";
	document.getElementById("streaming_status").style.display = "none";
	document.getElementById("streaming_text").innerHTML = "Currently streaming to: <i>None</i>";
	document.getElementById("cast_logo").onclick = "";
}

function startCasting() {
	//send chromecast an instance of openaudio
	session = null;
	var generatejson = {}
	generatejson.mcname = mcname;
	generatejson.session = sessionToken;
	generatejson.src = window.location.protocol + "//" + window.location.host + window.location.pathname;
	packet = JSON.stringify(generatejson);

	sendMessage(packet);
	
}

function disableCastButton() {
	document.getElementById("cast_logo").onclick = "";
}

function stopallstraming() {
	session.stop(onStopAppSuccess, onError);
	document.getElementById("cast_logo").onclick = "startCasting();";
	stopStreaming();
}

function chromecastOffline() {
	document.getElementById("cast_logo").style.display = "none";
	document.getElementById("cast_logo").src = "Images/google-cast-logo.png";
	document.getElementById("streaming_status").style.display = "none";
	document.getElementById("streaming_text").innerHTML = "Currently streaming to: <i>None</i>";
}