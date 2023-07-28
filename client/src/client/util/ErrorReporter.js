import {API_ENDPOINT} from "../config/ApiEndpoints";
import {VERSION} from "../../index";

export function ReportError(message, playerName, callback = () => {}) {
    fetch(API_ENDPOINT.ERROR_REPORTING, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            playerName: playerName,
            message: "build " + VERSION.build + ": " + message
        })
    })
}
