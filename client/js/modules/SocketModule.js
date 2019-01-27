class SocketModule {

    constructor(main, host) {
        this.handlers = {};

        main.getUserInterfaceModule().setMessage("Loading data..");
        main.getUserInterfaceModule().showVolumeSlider(false);

        if (Utils.getParameter().data == null) {
            main.debugPrint("data is empty");
            main.getUserInterfaceModule().setMessage("Oh no, the url you currently have entered does not contain the required data for the web client to function. Please go back to the minecraft server and request a new URL with  <b>/audio</b>");
            return;
        }

        main.getUserInterfaceModule().setMessage("Connecting to the OpenAudioMc api servers..");

        let query = atob(Utils.getParameter().data).split(":");
        main.debugPrint("Username: " + query[0]);
        main.debugPrint("Player uuid: " + query[1]);
        main.debugPrint("Server uuid: " + query[2]);
        main.debugPrint("Token: " + query[3]);

        this.username = query[0];
        this.playerUuid = query[1];
        this.severUuid = query[2];
        this.token = query[3];
        this.state = "loading";

        document.getElementById("username-display").innerText = this.username;

        this.authHeader = "" +
            "type=client&" +
            "n=" + this.username + "&" +
            "player=" + this.playerUuid + "&" +
            "s=" + this.severUuid + "&" +
            "p=" + this.token;

        main.debugPrint(this.authHeader);

        const that = this;
        this.socket = io(host, {query: that.authHeader, autoConnect: false});

        this.socket.on("connect", () => {
            main.getUserInterfaceModule().setMessage(openAudioMc.getMessages().welcomeMessage);
            main.getUserInterfaceModule().showVolumeSlider(true);
            main.socketModule.state = "ok";
        });

        this.socket.on("time-update", (time) => {
            let data = time.split(":");
            let hoursOffset = parseInt(data[1]);
            let timeStamp = parseInt(data[0]);
            openAudioMc.getTimeService().sync(timeStamp, hoursOffset);
        });

        this.socket.on("disconnect", () => {
            main.debugPrint("closed");
            for (let key in main.getMediaManager().sounds) {
                main.getMediaManager().sounds[key].setVolume(0, 1000);
                setTimeout(function () {
                    main.getMediaManager().sounds[key].destroy();
                }, 1005);
            }

            main.getUserInterfaceModule().showVolumeSlider(true);
            main.getUserInterfaceModule().setMessage(openAudioMc.getMessages().errorMessage);
            that.state = "closed";

            setTimeout(() => {
                main.getMediaManager().sounds = {};
            }, 1010);
        });

        this.socket.on("data", data => {
            if (that.handlers[data.type] != null) that.handlers[data.type](data.payload);
        });

        this.socket.connect();
    }

    registerHandler(channel, f) {
        this.handlers[channel] = f;
    }

}
