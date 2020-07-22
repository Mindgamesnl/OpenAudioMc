import UrlReader from "../../helpers/protocol/UrlReader";
import {strictlyShowCard} from "../../helpers/utils/StaticFunctions";

export class SocketModule {

    constructor(main, host) {
        this.handlers = {};
        this.openAudioMc = main;
        this.callbacksEnabled = false;
        this.supportsYoutube = false;
        this.hasConnected = false;
        this.outgoingQueue = [];

        if (UrlReader.getParameter().data == null) {
            console.log("Empty authentication")
            strictlyShowCard("kicked-card")
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
            main.socketModule.state = "ok";
            this.hasConnected = true;
            this.outgoingQueue.forEach((waiting) => {
                this.send(waiting.key, waiting.value);
            });
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

            strictlyShowCard("bad-auth-card")

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
        if (this.hasConnected) {
            if (this.callbacksEnabled) {
                console.log("[OpenAudioMc] Submitting value for " + event);
                this.socket.emit(event, data);
            } else {
                console.log("[OpenAudioMc] could not satisfy callback " + event + " because the protocol is outdated");
            }
        } else {
            this.outgoingQueue.push({
                key: event,
                value: data
            });
        }
    }

    registerHandler(channel, f) {
        this.handlers[channel] = f;
    }

}
