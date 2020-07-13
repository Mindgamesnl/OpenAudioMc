import {setPageOverlay} from "./ui/Overlay";
import {MainLogic} from "./app/MainLogic";

setPageOverlay("Starting app..")
let token = window.location.href.split("show=")[1];

if (token == null) {
    expiredMessage();
} else {
    // start app, and try to login
    setPageOverlay("Logging in..")
    fetch("https://plus.openaudiomc.net/worker-proxy/shows/?show=" + token)
        .then(async (httpRes) => {
            let response = await httpRes.json();
            if (response.errors.length > 0) {
                expiredMessage();
                return;
            }

            setPageOverlay("Downloading resources..")

            new MainLogic(response.response.data)
        })
        .catch(error => {
            throw error;
            setPageOverlay("Network error. Please try again later.")
        })
}

function expiredMessage() {
    setPageOverlay('<span style="color:red">Invalid (or expired) show!</span>' +
        '<br />Use <small style="background-color: #3b3857; border-radius: 4px;padding: 5px;">/oa show upload</small> to upload and start a session')
}