import ClientTokenSet from "../../helpers/libs/ClientTokenSet";
import {DebugPanel, WhenDebugging} from "../../debug";
import {oalog} from "../../helpers/log";
import {replaceProperty} from "../../helpers/domhelper";
import {OpenAudioEnv} from "../../OpenAudioMc";

let whenConnectHandler = [];
let whenConnectConnected = false;

export function WhenConnected(call) {
    if (!whenConnectConnected) {
        whenConnectHandler.push(call)
        return
    }
    call();
}


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
            console.log("Bad auth todo")
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
            main.socketModule.state = "ok";
            this.hasConnected = true;
            this.outgoingQueue.forEach((waiting) => {
                this.send(waiting.key, waiting.value);
            });
            for (let i = 0; i < whenConnectHandler.length; i++) {
                whenConnectHandler[i]()
            }
            whenConnectConnected = true;
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

            replaceProperty("{{ oam.loader_style }}", "display: -;", "style")
            replaceProperty("{{ oam.login_style }}", "display: -;", "style")
            replaceProperty("{{ oam.loader_status }}", "display: none;", "style")

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
