class OpenAudioMc {

    constructor() {
        //enable modules
        this.debugPrint("starting.");
        this.utils = new Utils(this);
        this.mediaManager = new MediaManager(this);
        this.userInterfaceModule = new UserInterfaceModule(this);
        this.socketModule = new SocketModule(this, "http://localhost");
        new Handlers(this);
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

function enable(button) {
    if (openAudioMc == null) {
        openAudioMc = new OpenAudioMc();
    }
}