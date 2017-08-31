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

langpack = {};
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


OpenAudioCore = new function() {
    //Utils
    this.utilSet = function () {
        this.getUrlVariable = function (variable) {
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
        };

        this.addJs = function (url) {
            $.getScript(url, function() {
                console.info("[ModManager] Added js file.");
            });
        };

        this.addCss = function (url) {
            $('head').append('<link rel="stylesheet" href="' + url + '" type="text/css" />');
        };
    };


    //Session system
    this.sessionManager = function () {
        this.validateRequest = function() {
            if (OpenAudioCore.getUtilSet().getUrlVariable("session").includes(":")) {
                var username = OpenAudioCore.getUtilSet().getUrlVariable("name");
                if (username.length >= 3) {
                    if (/^\w+$/i.test(username)) {
                        //save to load, i gues?
                        if (apijson != null) {
                            logInit("Trying login.");
                            try {
                                var api = apijson;
                                OpenAudioCore.getSocketManager().__session = OpenAudioCore.getUtilSet().getUrlVariable("session");
                                OpenAudioCore.getSocketManager().__host = api.socket;
                                OpenAudioCore.getSocketManager().__name = OpenAudioCore.getUtilSet().getUrlVariable("name");
                                return true;
                            } catch (e) {}
                        }
                    }
                }
            }
            return false;
        }
    };


    //Event system for socket
    this.socketManager = function () {
        this.__name = null;
        this.__session = null;
        this.__host = null;
        this.__clientid = this.__session.split(':')[0];
        this.__clienttoken = this.__session.split(':')[0];
        this.__log = function (msg) {console.log("[SocketManager] " + msg);}
        this.__connected = false;
        this.__events = {};

        this.connect = function () {
            socket = io.connect(this.__host, {
                secure: true
            });

            socket.on('connect', function() {
                console.info("[Socket.io] Connected!");
                this.__connected = true;
                this.__log("Connecting as: User: " + this.__name + " Id: " + this.__clientid + " Token: " + this.__clienttoken);
                socket.emit("message", '{"type":"client","clientid":"' + this.__clientid + '","user":"' + this.__name + '","key":"' + this.__clienttoken + '"}');
            });

            socket.on('command', function(msg) {
                if (msg == "connectionSuccess") {
                    document.getElementById("status-span").innerHTML = langpack.message.welcome.replace("%name%", mcname);
                    document.getElementById("status-span").className = "status-span status-success";
                } else if (msg == "not_in_server") {
                    document.getElementById("status-span").innerHTML = langpack.message.notconnected;
                    document.getElementById("status-span").className = "status-span status-error"
                } else if (msg == "connected") {

                } else {
                    var request = JSON.parse(msg);
                    this.__fireEvent(request.command, request);
                }
            });

            socket.on('oaCss', function(msg) {
                if (msg != null) {
                    var msg = JSON.parse(msg);
                    var arrayLength = msg.length;
                    for (var i = 0; i < arrayLength; i++) {
                        OpenAudioCore.getUtilSet().addCss(msg[i]);
                    }
                }
            });

            socket.on('oaJs', function(msg) {
                if (msg != null) {
                    var msg = JSON.parse(msg);
                    var arrayLength = msg.length;
                    for (var i = 0; i < arrayLength; i++) {
                        OpenAudioCore.getUtilSet().addJs(msg[i]);
                    }
                }
            });

            socket.on('oaError', function(msg) {
                socketIo.log("Received error.");
                if (msg == "server-offline") {
                    document.getElementById("status-span").innerHTML = langpack.message.server_is_offline;
                    document.getElementById("status-span").className = "label label-danger";
                } else if (msg == "kicked") {
                    closedwreason = true;
                    document.getElementById("status-span").innerHTML = langpack.message.inavlid_url;
                    document.getElementById("status-span").className = "label label-danger";
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
                    //You can remove it if you wanna :3 (will only remove popup, client will still be disabled)
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
               this.__connected = false;
            });
        };

        this.whisper = function (message) {
            socket.emit("whisperToServer", message);
        };

        this.__fireEvent = function (key, data) {
            if (this.__events[key] != null) {
                this.__events[key](data);
            };
        }

        this.registerEvent = function (key, event) {
            this.__events[key] = event;
        };
    };


    //
    this.notificationManager = function () {
        this.post = function (text) {
            if (Notification.permission !== "granted") {
                Notification.requestPermission();
            } else {
                var notification = new Notification(langpack.notification.header.replace(/%username%/g, OpenAudioCore.getSocketManager.__name), {
                    icon: langpack.notification.img,
                    body: text
                });
            };
        };
    };


    //User interface (hooks in to html)
    this.userInterfaceManager = function () {
        this.__iconcolor = "#242424"

        this.oaPlusIcon = function(icon, callback) {
            this.ul = document.getElementById("icons");
            this.li = document.createElement("li");
            this.ul.appendChild(document.createTextNode(''));
            this.ul.appendChild(this.li);
            this.li.innerHTML = '<i class="fa ' + icon + ' fa-2x footer-icon fa-qr-check" aria-hidden="true" onclick="' + callback + '();"></i>';
            this.li.style.color = "#" + this.__iconcolor;
            this.destroy = function() {
                this.li.remove();
            }
        };

        this.setThemeColor = function(code) {
            $("#footer").animate({
                "background-color": code
            }, {
                duration: 1000
            });
            $("#box").animate({
                "background-color": code
            }, {
                duration: 500
            });
        };

        this.openTwitter = function () {window.open(OpenAudioCore.getOAPlusManager().__twitterUrl);};
        this.openYoutube = function () {window.open(OpenAudioCore.getOAPlusManager().__youtubeUrl);};
        this.openWebsite = function () {window.open(OpenAudioCore.getOAPlusManager().__websiteUrl);};
    };


    //OpenAudioMc plus link system
    this.openAudioPlusManager = function () {
        this.__twitterUrl = null;
        this.__youtubeUrl = null;
        this.__websiteUrl = null;
        this.__ambianceUrl = null;
        this.__ambianceDelay = null;

        this.init = function (msg) {
            if (msg != null) {
                var settings = JSON.parse(msg);
                addJs("https://rawgit.com/OpenAudioMc/Lang-packs/master/" + settings.language + ".js");
                if (settings.asound != null) {
                    OpenAudioCore.getOAPlusManager().__ambianceUrl = settings.asound;
                } else {
                    OpenAudioCore.getOAPlusManager().__ambianceUrl = "";
                }
                if (settings.ambdelay != null) {OpenAudioCore.getOAPlusManager().__ambianceDelay = settings.ambdelay;}
                if (settings.twitter != "" && settings.twitter != null) {
                    new trayItem("fa-twitter", "OpenAudioCore.getUiManager().openTwitter();");
                    OpenAudioCore.getOAPlusManager().__twitterUrl = settings.twitter;
                }
                if (settings.qrcode != null && settings.qrcode != "off") {
                    $.getScript("files/js/qrcode.js", function() {qrbutton = new trayItem("fa-qrcode", "showqr");});
                }
                if (settings.youtube != "" && settings.youtube != null) {
                    new trayItem("fa-youtube-play", "OpenAudioCore.getUiManager().openYoutube();");
                    OpenAudioCore.getOAPlusManager().__youtubeUrl = settings.youtube;
                }
                if (settings.website != "" && settings.website != null) {
                    new trayItem("fa-globe", "OpenAudioCore.getUiManager().openWebsite();");
                    OpenAudioCore.getOAPlusManager().__websiteUrl = settings.website;
                }
                if (settings.uicolor != null && settings.uicolor != "") {
                    document.getElementById("sc-title").style.background = "#" + settings.uicolor;
                    document.getElementById("sc-cover").style.border = "6px solid " + "#" + settings.uicolor;
                    OpenAudioCore.getUiManager().setThemeColor("#" + settings.uicolor);
                    OpenAudioCore.getUiManager().__iconcolor = settings.uicolor;
                    document.getElementById("icons").color = "'#" + settings.uicolor + "'";
                    $('#icons').find('li').each(function() {
                        this.style.color = "#" + settings.uicolor
                    });
                }
                if (settings.hue != "off") {
                    OpenAudioCore.getHueManager().start();
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
            } else {
                new trayItem("fa-warning", "showPlus");
                swal('Account info!','This web site has not been claimed yet!<br /><a style="color:red" href="https://plus.openaudiomc.net/">click here to claim this account</a>!<br /> It only takes 1 minute of your time.','error');
            }
        }
    };


    //philips hue manager
    this.philipsHueMan = function () {
        this.start = function () {
            
        }
    };


    //startup and main routine
    this.clientCoreMain = function () {

        this.start = function () {
            if (OpenAudioCore.getSessionManager().validateRequest()) {
                OpenAudioCore.getSocketManager().connect();
                document.getElementById("skull").src = "https://crafatar.com/avatars/" + OpenAudioCore.getSocketManager().__name + "?overlay";
                if (Notification.permission !== "granted") {
                    Notification.requestPermission();
                }
            } else {
                location.href = "files/pages/urlError.html";
            }
        };

    };

    this.___utilset = new this.utilSet();
    this.___sessionman = new this.sessionManager();
    this.___socketman = new this.socketManager();
    this.___userInterface = new this.userInterfaceManager();
    this.___oaplusman = new this.openAudioPlusManager();
    this.___ccm = new this.clientCoreMain();
    this.__notiman = new this.notificationManager(;)
    this.__hueman = new this.philipsHueMan();
    this.getUtilSet = function () {return this.___utilset;};
    this.getSessionManager = function () {return this.___sessionman;};
    this.getSocketManager = function () {return this.___socketman();};
    this.getUiManager = function () {return this.___userInterface;};
    this.getOAPlusManager = function () {return this.___oaplusman;};
    this.getHueManager = function () {return this.__hueman;};
    this.getMain = function () {return this.___ccm;};
    this.getNotificationManager = function () {return this.__notiman;};
};


//Handling of actual events
OpenAudioCore.getSocketManager().registerEvent("play_normal", function(arguments) {
    OpenAudioManager.getAudioManager().createSound(arguments.src);
});

OpenAudioCore.getSocketManager().registerEvent("stop", function (arguments) {
    OpenAudioManager.getAudioManager().stopAll();
});

OpenAudioCore.getSocketManager().registerEvent("playlist", function (arguments) {
   //TODO make playlist system
});

OpenAudioCore.getSocketManager().registerEvent("message", function (arguments) {
    OpenAudioCore.getNotificationManager().post(arguments.string);
});

OpenAudioCore.getSocketManager().registerEvent("speaker", function (arguments) {
   //TODO inplement speaker system
});

OpenAudioCore.getSocketManager().registerEvent("skipto", function (arguments) {
    OpenAudioManager.getAudioManager().getSound(arguments.id).jumpTo(arguments.timeStamp);
});

OpenAudioCore.getSocketManager().registerEvent("setvolumeid", function (arguments) {
   OpenAudioManager.getAudioManager().getSound(arguments.id).setVolume(arguments.volume);
});

OpenAudioCore.getSocketManager().registerEvent("forcevolume", function (arguments) {
    OpenAudioManager.getMain().setVolume(arguments.volume);
});

OpenAudioCore.getSocketManager().registerEvent("play_normal_id", function (arguments) {
   OpenAudioManager.getAudioManager().createSound(arguments.src, arguments.id);
   //TODO set to time
    //arguments.time
});

OpenAudioCore.getSocketManager().registerEvent("stop_id", function (arguments) {
   OpenAudioManager.getAudioManager().getSound(arguments.id).stop();
});

OpenAudioCore.getSocketManager().registerEvent("toggle", function (arguments) {
    OpenAudioManager.getAudioManager().getSound(arguments.id).toggle();
});

OpenAudioCore.getSocketManager().registerEvent("region", function (arguments) {
    if (arguments.type == "startRegion") {
        OpenAudioManager.getRegionManager().startRegion(arguments.src);
    } else {
        OpanAudioManager.getRegionManager().stopRegion();
    }
});

OpenAudioCore.getSocketManager().registerEvent("volume", function (arguments) {
   OpenAudioManager.getMain().setVolume(arguments.volume);
});

OpenAudioCore.getSocketManager().registerEvent("buffer", function (arguments) {
   if (arguments.type == "play") {
       if (OpenAudioManager.getAudioManager().getSound("oa_buffer") != null) {
           OpenAudioManager.getAudioManager().getSound("oa_buffer").play();
       } else if (arguments.type == "create") {
           OpenAudioManager.getAudioManager().createSound(arguments.src, "oa_buffer", false);
       }
   }
});

OpenAudioCore.getSocketManager().registerEvent("hue", function (arguments) {

});