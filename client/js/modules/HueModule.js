class HueModule {

    constructor(main, options) {
        this.hue = jsHue();
        this.bridges = [];
        this.isSsl = (document.location.href.startsWith("https://"));
        this.isLinked = false;
        this.currentBridge = null;
        this.currentUser = null;
        this.color = net.brehaut.Color;
        this.options = options;

        this.lights = [];

        const that = this;
        this.hue.discover().then(bridges => {
            bridges.forEach(bridge => {
                that.bridges.push(bridge);
                that.onDiscover();
            });
        }).catch(e => console.log('Error finding bridges', e));

        if (this.isSsl) {
            main.log("Failed to initiate Philips Hue integration since this web page is served over ssl. The user will be promted to downgrade to HTTP when a user interaction is made that is related to Hue");
        }
    }

    onDiscover() {
        if (this.bridges.length !== 0) {
            //bridges found
            openAudioMc.log(this.bridges.length + " hue bridges found");
            document.getElementById("hue-bridge-menu-button").style.display = "";
            if (this.isSsl) {
                document.getElementById("select-bridge").innerHTML = "<p><i>So close... yet so far...</i> Unfortunately, Philips Hue is not supported over SSL (https), please reaload this page over HTTP (in the address bar) to hue the hue integration.</p>";
                return;
            }

            if (this.options.userid != null) {
                document.getElementById("select-bridge").innerHTML = "<p>Loading auto connect.</p>";
                openAudioMc.getHueModule().startSetup();
            }
        } else {
            openAudioMc.log("No hue bridges found");
        }
    }

    startSetup() {
        const that = this;
        this.bridges.forEach(bridge => {
            that.linkBridge(bridge.internalipaddress);
        })
    }

    onConnect() {
        const that = this;
        document.getElementById("select-bridge").innerHTML = "<p>Preparing user..</p>";
        this.currentUser.getGroups().then(groups => {
            document.getElementById("select-bridge").innerHTML = "<p>" + openAudioMc.getMessages().hueConnected + "</p>" +
                "<select oninput='openAudioMc.getHueModule().selectGroup(this.value)' class=\"blue-select\" id='brige-list'><option value=\"\" disabled selected id='default-group'>Select a group</option></select>";
            for (var key in groups) {
                document.getElementById("brige-list").innerHTML += "<option>" + groups[key].name + "</option>";
                if (that.options.group != null && groups[key].name === that.options.group) {
                    this.updateSelector(groups[key].name);
                    this.selectGroup(groups[key].name);
                }
            }
        });
    }

    updateSelector(name) {
        setTimeout(function () {
            document.getElementById("default-group").selected = false;
            document.getElementById("brige-list").value = name;
        }, 200);
    }

    selectGroup(value) {
        Cookies.set("huegroup", value);
        const that = this;
        this.currentUser.getGroups().then(groups => {
            for (var key in groups) {
                if (groups[key].name === value) {
                    that.lights = [];
                    for (var id in groups[key].lights) {
                        id++;
                        that.lights.push(id);
                        that.setLight(id, "rgba(58,50,238,0.5)");
                    }
                }
            }
        });
    }

    colorToHueHsv(color) {
        const jqc = this.color(color).toHSV();
        return {
            "on": (((jqc.alpha * 2) * 127.5) !== 0),
            "hue": Math.floor(65535 * jqc.hue / 360),
            "sat": Math.floor(jqc.saturation * 255),
            "bri": Math.round((jqc.alpha * 2) * 127.5)
        }
    }

    setUserId(id) {
        Cookies.set('hueid', id);
    }

    setLight(id, rgb) {
        let query = [];
        if (typeof  id == "number") {
            query.push(this.lights[id-1]);
        } else if (id.startsWith("[")) {
            JSON.parse(id).forEach(target => {
                query.push(this.lights[target-1]);
            });
        } else {
            query.push(this.lights[parseInt(id)-1]);
        }
        query.forEach(light => {
            this.currentUser.setLightState(light, this.colorToHueHsv(rgb)).then(data => {});
        });
    }

    linkBridge(bridgeIp, precheck) {
        document.getElementById("select-bridge").innerHTML = "<p>Preparing setup..</p>";

        if (precheck == null && this.options.userid != null) {
            document.getElementById("select-bridge").innerHTML = "<p>Logging in..</p>";
            this.currentUser = this.hue.bridge(bridgeIp).user(this.options.userid);
            this.currentUser.getGroups().then(data => {
                //check result
                if (data[0] != null && data[0].error == null) {
                    this.linkBridge(bridgeIp, "error");
                } else {
                    openAudioMc.log("Linked with hue bridge after trying to connect with the old username");
                    this.isLinked = true;
                    this.onConnect();
                }
            });
            //check the user
            return;
        }

        this.currentBridge = this.hue.bridge(bridgeIp);
        if (this.currentBridge == null) {
            openAudioMc.log("Invalid bridge IP");
            return;
        }

        const that = this;
        let linkAttempts = 0;
        let linkTask = -1;

        linkTask = setInterval(() => {
            function cancel() {
                clearInterval(linkTask);
            }

            linkAttempts++;
            if (linkAttempts > 60) {
                cancel();
                document.getElementById("select-bridge").innerHTML = "<p>Could not connect to your hue bridge after 60 seconds, did you press the link button?</p><span class=\"button\" onclick=\"openAudioMc.getHueModule().startSetup();\" style=\"color: white;\">Click here to try again</span>";
                openAudioMc.log("Failed to authenticate with bridge in 60 seconds.");
                return;
            }

            let sec = (60 - linkAttempts);
            document.getElementById("select-bridge").innerHTML = "<p>" + openAudioMc.getMessages().hueLinking.replace("%sec%", sec) + "</p>";

            that.currentBridge.createUser("OpenAudioMc#WebClient")
                .then(data => {
                    if (data[0].error != null) {
                        if (data[0].error.type === 101) {
                            //link button not pressed
                        } else {
                            //unexpected error
                            cancel();
                            openAudioMc.log("Unexpected error while connecting: " + data[0].error.type);
                        }
                    } else if (data[0].success != null) {
                        that.currentUser = that.currentBridge.user(data[0].success.username);
                        openAudioMc.log("Linked with hue bridge after " + linkAttempts + " attempt(s).");
                        that.isLinked = true;
                        that.onConnect();
                        cancel();
                    }
                });
        }, 1000);
    }

}