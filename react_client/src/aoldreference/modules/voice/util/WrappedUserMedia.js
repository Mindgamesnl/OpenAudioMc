export class WrappedUserMedia {

    constructor() {
        this.successCallback = alert;
        this.errorCallback = alert;
    }

    getUserMedia(argument) {
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
            nnavigator.msGetUserMedia(argument, this.successCallback, this.errorCallback);
            return;
        }

        console.error("Unknown user media platform!");
    }

}

