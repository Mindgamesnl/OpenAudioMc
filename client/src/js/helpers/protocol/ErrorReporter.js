import {fetch} from "../../../libs/github.fetch";
import {API_ENDPOINT} from "./ApiEndpoints";

export function ReportError(message, playerName, callback) {
    fetch(API_ENDPOINT.ERROR_REPORTING, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            playerName: playerName,
            message: "build __BUILD_VERSION__: " + message
        })
    })
        .then((res) => {
            if (callback != null) {
                callback()
            }
            res.json().then((result) => {
                console.log("Reported error. Reponse was: " + JSON.stringify(result))
            });
        })
        .catch(() => {
            console.log("An error occoured while reporting another error. Weird.")
        })
}
