var MyHue = new huepi();

function HueModule(scope) {

    this.connected = false;
    this.scope = scope;
    this.hue_lights = [];

    this._updateLights = function () {
        for (var key in MyHue.Lights) {
            if (MyHue.Lights.hasOwnProperty(key)) {
                this.hue_lights[key] = {};
                this.hue_lights[key].name = MyHue.Lights[key].name;
                this.hue_lights[key].state = MyHue.Lights[key].state;
                this.hue_lights[key].enabled = true;
            }
        }
    }

    this.setRgb = function(args, id) {
        if (this.connected) {
            try {
                if (id > 4 || id == null || this.hue_lights[id].enabled === false) {
                    var colorString = args,
                        colorsOnly = colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,\s*/);
                    red = parseInt(colorsOnly[0]);
                    green = parseInt(colorsOnly[1]);
                    blue = parseInt(colorsOnly[2]);
                    opacity = parseInt(colorsOnly[3]);
                    for (var key in MyHue.Lights) {
                        if (MyHue.Lights.hasOwnProperty(key)) {
                            if (this.hue_lights[key].enabled) {
                                MyHue.LightSetRGB(key, red, green, blue);
                                this.hue_lights[key].color2 = args;
                            }
                        }
                    }
                    if (opacity === 0) {
                        for (var key in MyHue.Lights) {
                            if (MyHue.Lights.hasOwnProperty(key)) {
                                if (this.hue_lights[key].enabled) {
                                    MyHue.LightOff(key);
                                }
                            }
                        }
                    } else {
                        for (var key in MyHue.Lights) {
                            if (MyHue.Lights.hasOwnProperty(key)) {
                                if (this.hue_lights[key].enabled) {
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
                    this.hue_lights[id].color2 = args;
                    if (opacity === 0) {
                        MyHue.LightOff(id);
                    } else {
                        MyHue.LightOn(id);
                        MyHue.LightSetBrightness(id, opacity);
                    }
                }
            } catch (e) {
                console.info("[Philips-Hue] Unable to decode hue color code... well shit. " + e);
            }
        }
    }

    this.connect = function (instance) {
        if (this.connected) {
            oa_ui_show_notification("Philips Hue Connect", lang.hue_already_connected, "normal");
            return;
        }
        if (!localStorage.MyHueBridgeIP) {
            MyHue.PortalDiscoverLocalBridges().then(function BridgesDiscovered() {
                MyHue.BridgeGetConfig().then(function BridgeConfigReceived() {
                    MyHue.BridgeGetData().then(function BridgeDataReceived() {
                        localStorage.MyHueBridgeIP = MyHue.BridgeIP;
                        oa_ui_show_notification("Philips Hue Connect", lang.connected_to_bridge.replace("%name%", MyHue.BridgeName), "normal");
                        instance._updateLights();
                        instance.connected = true;
                    }, function UnableToRetreiveBridgeData() {
                        MyHue.BridgeCreateUser().then(function BridegeUserCreated() {
                            localStorage.MyHueBridgeIP = MyHue.BridgeIP;
                            oa_ui_show_notification("Philips Hue Connect", lang.connected_to_bridge.replace("%name%", MyHue.BridgeName), "normal");
                            // Grabs proper light data
                            MyHue.LightsGetData().then(function LightsDataFound() {
                                instance._updateLights();
                            }, function UnableToGetLightData() {
                                oa_ui_show_notification("Unable To Grab Light Data", lang.unable_to_grab_light_data, "danger");
                            });
                            instance.connected = true;
                            return;
                        }, function UnableToCreateUseronBridge() {
                            oa_ui_show_notification("Philips Hue Connect", lang.hue_please_click, "normal");
                            return;
                        });
                    });
                }, function UnableToRetreiveBridgeConfig() {
                    oa_ui_show_notification("Philips Hue Connect", lang.hue_please_click, "normal");
                    return;
                });
            }, function UnableToDiscoverLocalBridgesViaPortal() {
                oa_ui_show_notification("Philips Hue Connect", lang.unable_to_connect, "danger");
                return;
            });
        } else {
            MyHue.BridgeIP = localStorage.MyHueBridgeIP;
            oa_ui_show_notification("Philips Hue Connect", lang.hue_connecting, "normal");
            MyHue.BridgeGetConfig().then(function CachedBridgeConfigReceived() {
                MyHue.BridgeGetData().then(function CachedBridgeDataReceived() {
                    oa_ui_show_notification("Philips Hue Connect", lang.connected_to_bridge.replace("%name%", MyHue.BridgeName), "normal");
                    // Grabs proper light data
                    MyHue.LightsGetData().then(function LightsDataFound() {
                        instance._updateLights();
                    }, function UnableToGetLightData() {
                        oa_ui_show_notification("Unable To Grab Light Data", lang.unable_to_grab_light_data, "danger");
                    });
                    instance.connected = true;
                }, function UnableToRetreiveCachedBridgeData() {
                    delete localStorage.MyHueBridgeIP;
                    oa_ui_show_notification("Philips Hue Connect", lang.unable_to_connect, "danger");
                    return;
                });
            }, function UnableToRetreiveCachedBridgeConfig() {
                delete localStorage.MyHueBridgeIP;
                oa_ui_show_notification("Philips Hue Connect", lang.unable_to_connect, "danger");
            });
        }
    }

    this.setBrightness = function (number) {
        for (var key in MyHue.Lights) {
            if (MyHue.Lights.hasOwnProperty(key)) {
                if (this.hue_lights[key].enabled) {
                    MyHue.LightSetBrightness(key, number);
                }
            }
        }
    }

}
