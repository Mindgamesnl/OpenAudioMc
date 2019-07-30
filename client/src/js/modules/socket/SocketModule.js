import {Utils} from "../../helpers/Utils";

export class SocketModule {

    constructor(main, host) {
        this.handlers = {};
        this.openAudioMc = main;

        main.getUserInterfaceModule().setMessage("Loading data..");
        main.getUserInterfaceModule().showVolumeSlider(false);

        if (Utils.getParameter().data == null) {
            main.debugPrint("data is empty");
            main.getUserInterfaceModule().setMessage("<h3>Invalid url. Please connect via the server, by executing <b><u>/audio</u></b></h3>");
            return;
        }

        main.getUserInterfaceModule().setMessage("Connecting and authenticating, please wait.");

        main.debugPrint("Username: " + main.tokenSet.name);
        main.debugPrint("Player uuid: " + main.tokenSet.uuid);
        main.debugPrint("Server uuid: " + main.tokenSet.publicServerKey);
        main.debugPrint("Token: " + main.tokenSet.token);

        this.state = "loading";

        // fetch relay


        this.authHeader = "" +
            "type=client&" +
            "n=" + main.tokenSet.name + "&" +
            "player=" + main.tokenSet.uuid + "&" +
            "s=" + main.tokenSet.publicServerKey + "&" +
            "p=" + main.tokenSet.token;

        main.debugPrint(this.authHeader);

        const that = this;
        this.socket = io(host, {query: that.authHeader, autoConnect: false});

        this.socket.on("connect", () => {
            main.getUserInterfaceModule().setMessage(this.openAudioMc.getMessages().welcomeMessage);
            main.getUserInterfaceModule().showVolumeSlider(true);
            main.socketModule.state = "ok";
        });

        this.socket.on("time-update", (time) => {
            let data = time.split(":");
            let hoursOffset = parseInt(data[1]);
            let timeStamp = parseInt(data[0]);
            this.openAudioMc.getTimeService().sync(timeStamp, hoursOffset);
        });

        this.socket.on("disconnect", () => {
            main.debugPrint("closed");
            for (let key in main.getMediaManager().sounds) {
                if (!main.getMediaManager().sounds.hasOwnProperty(key)) continue;
                main.getMediaManager().sounds[key].setVolume(0, 1000);
                setTimeout(function () {
                    main.getMediaManager().sounds[key].destroy();
                }, 1005);
            }

            main.getUserInterfaceModule().showVolumeSlider(true);
            main.getUserInterfaceModule().setMessage(this.openAudioMc.getMessages().errorMessage);
            that.state = "closed";

            main.voiceModule.handleSocketClosed();

            setTimeout(() => {
                main.getMediaManager().sounds = {};
            }, 1010);
        });

        this.socket.on("data", data => {
            if (that.handlers[data.type] != null) that.handlers[data.type](data.payload);
        });

        this.socket.on('join-call', (joinCallPacket) => {
            let roomId = joinCallPacket.room;
            let assignedCallServer = joinCallPacket.server;
            let callAccessToken = joinCallPacket.accessToken;
            let callMembers = joinCallPacket.members;

            let memberNames = [];
            for (const member of callMembers) {
                memberNames.push(member.name);
            }

            main.voiceModule.promptCall(assignedCallServer, roomId, callAccessToken, memberNames, callMembers);
        });

        this.socket.on('member-left-call', (uuidOfLeavingClient) => {
            const room = main.voiceModule.room;
            if (room != null) {
                room.handleMemberLeaving(uuidOfLeavingClient);
            }
        });

        this.socket.connect();
    }

    registerHandler(channel, f) {
        this.handlers[channel] = f;
    }

}
