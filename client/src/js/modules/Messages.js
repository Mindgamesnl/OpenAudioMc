export class Messages {

    constructor(main) {
        this.main = main;
        this.hueConnected = "You are now connected with your Philips Hue Lights! Please select your group (you can always change this later) and click \"player\" in the left bottem corner to return to the home menu.";
        this.hueLinking = "Press the link button on your hue bridge within %sec% seconds to connect.";
        this.hueWelcome = "Your Philips Hue lights have not yet been setup with OpenAudioMc. Doing so will give the minecraft server (limited) control over your selected lights to enhance your experience.";
        this.welcomeMessage = "You are now connected to the Minecraft server and ready to listen to the Audio. Enjoy the experience.";
        this.errorMessage = "We've lost connecting to the server you where connected to. If you have not logged out, please contact a server administrator to report this problem.";
    }

    apply() {
        if (document.getElementById("hue-welcome-message") != null) {
            document.getElementById("hue-welcome-message").innerHTML = this.hueWelcome;
        }

        if (this.main.socketModule.state === "ok") {
            document.getElementById("status-message").innerHTML = this.welcomeMessage;
        } else {
            document.getElementById("status-message").innerHTML = this.errorMessage;
        }
    }

}
