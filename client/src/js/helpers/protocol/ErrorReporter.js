import {fetch} from "../../../libs/github.fetch";

export function ReportError(message, playerName) {
    fetch("https://plus.openaudiomc.net/cf-log/production", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            playerName: playerName,
            message: message
        })
    })
        .then((res) => {
            res.json().then((result) => {
                console.log("Reported error. Reponse was: " + JSON.stringify(result))
            });
        })
        .catch(() => {
            console.log("An error occoured while reporting another error. Weird.")
        })
}