import {handleClientVolume} from "./handlers/HandleClientVolume";
import {handlePrefetchPacket} from "./handlers/HandlePrefetch";
import {handleMediaUpdate} from "./handlers/HandleMediaUpdate";
import {handleCreateMedia} from "./handlers/HandleCreateMedia";
import {handleDestroyMedia} from "./handlers/HandleDestroyMedia";
import {handleProtocolVersion} from "./handlers/HandleProtocolVersion";
import {HandleVoiceUnlock} from "./handlers/HandleVoicechatUnlock";
import {handlePlayerLocation} from "./handlers/HandlePlayerLocation";

export class HandlerRegistry {

    constructor(socket) {
        function registerClassHandler(channel, handlerFunction) {
            socket.registerHandler(channel, (data) => handlerFunction(data));
        }

        // protocol
        registerClassHandler("ClientVersionPayload", handleProtocolVersion);
        registerClassHandler("ClientPlayerLocationPayload", handlePlayerLocation);

        // media
        registerClassHandler("ClientPreFetchPayload", handlePrefetchPacket);
        registerClassHandler("ClientUpdateMediaPayload", handleMediaUpdate);
        registerClassHandler("ClientCreateMediaPayload", handleCreateMedia);
        registerClassHandler("ClientDestroyMediaPayload", handleDestroyMedia);
        registerClassHandler("ClientVolumePayload", handleClientVolume);

        // voice
        registerClassHandler("ClientVoiceChatUnlockPayload", HandleVoiceUnlock)

    }
}