class HueModule {

    constructor(main) {
        this.hue = jsHue();
        this.bridges = [];
        this.isSsl = (document.location.href.startsWith("https://"));
        this.isLinked = false;
        this.currentBridge = null;
        this.currentUser = null;

        const that = this;
        this.hue.discover().then(bridges => {
            bridges.forEach(bridge => {
                that.bridges.push(bridge.internalipaddress);
                that.onDiscover();
            });
        }).catch(e => console.log('Error finding bridges', e));

        if (this.isSsl) {
            main.log("Failed to initiate PhilipsHue integration since this web page is served over ssl. The user will be promted to downgrade to HTTP when a user interaction is made that is related to Hue");
        }
    }

    onDiscover() {
        if (this.bridges.length !== 0) {
            //bridges found
            openAudioMc.log(this.bridges.length + " hue bridges found");
        } else {
            openAudioMc.log("No hue bridges found");
        }
    }

    linkBridge(bridgeIp) {
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
            if (linkAttempts > 30) {
                cancel();
                openAudioMc.log("Failed to authenticate with bridge in 30 seconds.");
                return;
            }

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
                        cancel();
                    }
                });
        }, 1000);
    }

}