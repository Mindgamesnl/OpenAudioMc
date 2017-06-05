/*
 * Copyright (C) 2017 Mindgamesnl
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

console.log('%c Welcome to OpenAudioMc ', 'background: blue; color: white; display: block;font-size:80px');
console.log("%c WARNING! If someone told you to copy/paste something here you have an 11/10 chance you're being scammed. ", 'background: black; color: RED; display: block;font-size:20px');
logInit("You may see a message like '[Violation] Forced reflow while executing JavaScript took Xms', Please ignore it since it is coused by lovely socketio.")

function loadBg() {
  var LiturkeyColorsInc = ["#f5d65a","#39e2b0","#3fbe98","#a743c4","#5f5cea","#ea5c5c"];
  var item = LiturkeyColorsInc[Math.floor(Math.random()*LiturkeyColorsInc.length)];
	document.body.style.backgroundColor = item;
}

ui = {};
var issmall = getUrlVar("small") == null;
var debug = getUrlVar("debug") == null;


ui.color = function(code) {
	$("#footer").animate({"background-color":code},{duration:1000});
	$("#box").animate({"background-color":code},{duration:500});
}

tinyWindow = getUrlVar("tinyWindow");


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
	$.getScript("files/core/OAM-Core.js", function() {
			logInit("Login-sucess");
			enable();
			loadBg();
	});
}

function logInit(msg) {
  console.info("[Init] " + msg);
}
