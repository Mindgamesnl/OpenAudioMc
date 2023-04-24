import {SocketManager} from "../SocketModule";

export function handleProtocolVersion(data) {
    const revision = parseInt(data.protocolRevision);

    if (revision >= 2) {
        // enable callbacks
        SocketManager.callbacksEnabled = true;
    }
}