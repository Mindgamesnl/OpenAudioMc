class OpenAudioMc {

    constructor() {
        //load cookies
        const hueOptions = {
            "userid": Cookies.get("hueid"),
            "group": Cookies.get("huegroup")
        };

        this.log("Enabling the web client for " + window.navigator.userAgent);
        this.debugPrint("starting.");
        this.userInterfaceModule = new UserInterfaceModule(this);
        this.utils = new Utils(this);
        this.hueModule = new HueModule(this, hueOptions);
        this.mediaManager = new MediaManager(this);
        this.socketModule = new SocketModule(this, "http://localhost");
        new Handlers(this);
    }

    log(message) {
        console.log("[OpenAudioMc] " + message);
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