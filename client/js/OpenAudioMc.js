class OpenAudioMc {

    constructor() {
        //enable modules
        this.debugPrint("starting.");
        this.utils = new Utils(this);
        this.mediaManager = new MediaManager(this);
        this.userInterfaceModule = new UserInterfaceModule(this);
        this.socketModule = new SocketModule(this, "http://localhost");
    }

    log(message) {
        console.log("[OpenAudioMc] " + message);
    }

    debugPrint(message) {
        document.write("(debug) " + message + "<br />");
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

    getUserInterfaceModule() {
        return this.userInterfaceModule;
    }

}

//enable
let  openAudioMc = null;
onload = function () {
    openAudioMc = new OpenAudioMc();
};