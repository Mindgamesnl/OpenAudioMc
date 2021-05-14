import ClientTokenSet from "../../helpers/libs/ClientTokenSet";
import {strictlyShowCard, UiCards} from "../ui/UserInterfaceModule";
import {OpenAudioEnv} from "../../OpenAudioMc";
import {DebugPanel, WhenDebugging} from "../../debug";
import {oalog} from "../../helpers/log";

export class SocketModule {

    constructor(main, host) {
        this.handlers = {};
        this.openAudioMc = main;
        this.callbacksEnabled = false;
        this.supportsYoutube = false;
        this.hasConnected = false;
        this.outgoingQueue = [];
        this.inCount = 0;
        this.outCount = 0;

        WhenDebugging(() => {
            window.debugUi.addPanel(DebugPanel.SOCKET, () => "in=" + this.inCount + ", out=" + this.outCount + ", ok=" + this.socket.connected)
        })

        if (new ClientTokenSet().fromCache() == null) {
            console.log("Empty authentication")
            strictlyShowCard(UiCards.BAD_AUTH)
            return;
        }

        this.state = "loading";

        this.authHeader = "" +
            "type=client&" +
            "n=" + main.tokenSet.name + "&" +
            "player=" + main.tokenSet.uuid + "&" +
            "s=" + main.tokenSet.publicServerKey + "&" +
            "p=" + main.tokenSet.token;

        const that = this;
        this.socket = io(host, {query: that.authHeader, autoConnect: false, withCredentials: false});

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

            strictlyShowCard(UiCards.BAD_AUTH)

            setTimeout(() => {
                main.getMediaManager().sounds = {};
            }, 1010);

            main.voiceModule.shutDown();
        });

        this.socket.on("data", data => {
            let packages = data.type.split(".");
            let payloadType = packages[packages.length - 1];
            if (that.handlers[payloadType] != null) that.handlers[payloadType](data.payload);
            this.inCount++;
        });

        this.socket.connect();
    }

    send(event, data) {
        this.outCount++;
        if (this.hasConnected) {
            if (this.callbacksEnabled) {
                oalog("Submitting value for " + event);
                this.socket.emit(event, data);
            } else {
                oalog("could not satisfy callback " + event + " because the protocol is outdated");
                return
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
