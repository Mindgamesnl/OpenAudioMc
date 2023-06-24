export class WrappedUserMedia {

    constructor() {
        this.successCallback = alert;
        this.errorCallback = alert;
    }

    getUserMedia(preferedDeviceId = null) {

        let argument = {
            audio: {
                    noiseSuppression: true,
                    // sampleRate: 64000,
                    echoCancellation: true,
                    autoGainControl: false,
                    channelCount: 1,
                }
        }

        if (preferedDeviceId) {
            argument.audio.deviceId = {exact: preferedDeviceId}
        }

        if (navigator.getUserMedia != null) {
            navigator.getUserMedia(argument, this.successCallback, this.errorCallback);
            return;
        }

        if (navigator.webkitGetUserMedia != null) {
            navigator.webkitGetUserMedia(argument, this.successCallback, this.errorCallback);
            return;
        }

        if (navigator.mediaDevices.getUserMedia != null) {
            navigator.mediaDevices.getUserMedia(argument)
                .then(hasStream => this.successCallback(hasStream))
                .catch(error => this.errorCallback(error));
            return;
        }

        if (navigator.msGetUserMedia != null) {
            navigator.msGetUserMedia(argument, this.successCallback, this.errorCallback);
            return;
        }

        console.error("Unknown user media platform!");
    }

}

