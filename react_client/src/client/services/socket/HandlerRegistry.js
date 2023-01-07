import {handleClientVolume} from "./handlers/HandleClientVolume";

export class HandlerRegistry {

    constructor(socket) {
        function registerClassHandler(channel, handlerFunction) {
            socket.registerHandler(channel, (data) => handlerFunction(data));
        }

        registerClassHandler("ClientVolumePayload", handleClientVolume);
    }
}