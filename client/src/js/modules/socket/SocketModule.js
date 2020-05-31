import {Utils} from "../../helpers/utils/Utils";
import {AlertBox} from "../ui/Notification";

export class SocketModule {

    constructor(main, host) {
        this.handlers = {};
        this.openAudioMc = main;
        this.callbacksEnabled = false;

        if (Utils.getParameter().data == null) {
            main.debugPrint("data is empty");
            main.getUserInterfaceModule().setMessage("<h3>Invalid url. Please connect via the server, by executing <b><u>/audio</u></b></h3>");
            return;
        }

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
            main.userInterfaceModule.openApp();
            main.getUserInterfaceModule().setMessage(this.openAudioMc.getMessages().welcomeMessage);
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
            main.getMediaManager().destroySounds(null, true);
            
            that.state = "closed";

            main.voiceModule.handleSocketClosed();

            main.userInterfaceModule.kickScreen();

            setTimeout(() => {
                main.getMediaManager().sounds = {};
            }, 1010);
        });

        this.socket.on("data", data => {
            let packages = data.type.split(".");
            let payloadType = packages[packages.length - 1];
            if (that.handlers[payloadType] != null) that.handlers[payloadType](data.payload);
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

        this.socket.on('resub-to-player-in-call', (uuid) => {
            const room = main.voiceModule.room;
            if (room != null) {
                room.resubToPlayer(uuid);
            }
        });

        this.socket.on('member-left-call', (uuidOfLeavingClient) => {
            const room = main.voiceModule.room;
            if (room != null) {
                room.handleMemberLeaving(uuidOfLeavingClient);
            }
        });

        this.socket.connect();
    }

    send(event, data) {
        if (this.callbacksEnabled) {
            console.log("[OpenAudioMc] Submitting value for " + event);
            this.socket.emit(event, data);
        } else {
            console.log("[OpenAudioMc] could not satisfy callback " + event + " because the protocol is outdated");
        }
    }

    registerHandler(channel, f) {
        this.handlers[channel] = f;
    }

}
