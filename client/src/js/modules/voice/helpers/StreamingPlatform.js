export class StreamingPlatform {

    constructor(argument, stream, onError) {
        if (navigator.getUserMedia != null) {
            navigator.getUserMedia(argument, stream, onError);
            return;
        }

        if (navigator.webkitGetUserMedia != null) {
            navigator.webkitGetUserMedia(argument, stream, onError);
            return;
        }

        if (navigator.mediaDevices.getUserMedia != null) {
            navigator.mediaDevices.getUserMedia(argument)
                .then(hasStream => stream(hasStream))
                .catch(error => onError(error));
            return;
        }

        if (navigator.msGetUserMedia != null) {
            nnavigator.msGetUserMedia(argument, stream, onError);
            return;
        }

        console.error("Unknown user media platform!");
    }

}