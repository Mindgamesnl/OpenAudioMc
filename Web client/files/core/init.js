function loadBg() {
  var LiturkeyColorsInc = ["#f5d65a","#39e2b0","#3fbe98","#a743c4","#5f5cea","#ea5c5c"];
  var item = LiturkeyColorsInc[Math.floor(Math.random()*LiturkeyColorsInc.length)];
  $("#body").animate({"background-color":item},{duration:1000});
}

ui = {};
var issmall = getUrlVar("small") == null;
var debug = getUrlVar("debug") == null;


ui.color = function(code) {
	$("#footer").animate({"background-color":code},{duration:1000});
	$("#box").animate({"background-color":code},{duration:500});
}


console.info("You like to look under the hood? Why not help us ? :-) https://github.com/Mindgamesnl/OpenAudioMc")

function getUrlVar(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  //use invalid char so it triggers error
  return "(none)";
}

if (getUrlVar("session").includes(":")) {
  var username = getUrlVar("name");
  if (username.length >= 3) {
    if (/^\w+$/i.test(username)) {
      //save to load, i gues?
      if (apijson != null) {
        logInit("Trying login.");
        try {
          var api = apijson;
          session = getUrlVar("session");
          socket_io = api.socket;
          mcname = getUrlVar("name");
          socketio_client_js = api.clientJS;
          enableMain(api.clientJS);
        } catch (e) {
          console.error(e);
          location.href = "files/pages/serverError.html";
          logInit("Login fail!");
        }
      } else {
        location.href = "files/pages/serverError.html";
        logInit("Failed to get api data.");
      }
    } else {
      //invalid url
      location.href = "files/pages/urlError.html";
      logInit("Invalid url.");
    }
  } else {
    //invalid url
    location.href = "files/pages/urlError.html";
    logInit("Invalid url.");
  }
} else {
  //invalid url
  location.href = "files/pages/urlError.html";
  logInit("Invalid url.");
}

function enableMain(clientJs) {
  $.getScript(clientJs, function() {
    $.getScript("files/core/openaudiomc.js", function() {

        logInit("Login-sucess");
        enable();
        loadBg();

    });
  });
}

function logInit(msg) {
  console.info("[Init] " + msg);
}
