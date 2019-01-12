class OpenAudioMc {

    constructor() {
        //load cookies
        const hueOptions = {
            "userid": Cookies.get("hueid"),
            "group": Cookies.get("huegroup")
        };

        this.log("Enabling the web client for " + window.navigator.userAgent);
        this.debugPrint("starting.");
        this.messages = new Messages(this);
        this.userInterfaceModule = new UserInterfaceModule(this);
        this.utils = new Utils(this);
        this.hueModule = new HueModule(this, hueOptions);
        this.mediaManager = new MediaManager(this);
        this.socketModule = new SocketModule(this, "https://craftmendserver.eu");
        new Handlers(this);
        this.messages.apply();
    }

    log(message) {
        console.log("[OpenAudioMc] " + message);
    }

    getMessages() {
        return this.messages;
    }

    debugPrint(message) {
        this.log(message);
    }

    getUtils() {
        return this.utils;
    }

    getMediaManager() {
        return this.mediaManager;
    }

    getSocketModule() {
        return this.socketModule;
    }

    getHueModule() {
        return this.hueModule;
    }

    getUserInterfaceModule() {
        return this.userInterfaceModule;
    }

}

//enable
let  openAudioMc = null;

function enable() {
    if (openAudioMc == null) {
        openAudioMc = new OpenAudioMc();
    }
}