import {handleCreateMedia} from "./handlers/HandleCreateMedia";
import {handleNotification} from "./handlers/HandleNotification";
import {handleProtocolVersion} from "./handlers/HandleProtocolVersion";
import {handleClientVolume} from "./handlers/HandleClientVolume";
import {handleDestroyMedia} from "./handlers/HandleDestroyMedia";
import {handleHuePayload} from "./handlers/HandleHue";
import {handleMediaUpdate} from "./handlers/HandleMediaUpdate";
import {handlePlayerLocation} from "./handlers/HandlePlayerLocation";
import {handleSpeakerCreation} from "./handlers/HandleSpeakerCreation";
import {handleSpeakerDestroy} from "./handlers/HandleSpeakerDestroy";
import {handlePrefetchPacket} from './handlers/HandlePrefetch'
import {HandleVoiceUnlock} from "./handlers/HandleVoicechatUnlock";
import {HandleVoiceChatSubscription} from "./handlers/HandleVoicechatSubscription";
import {HandleVoiceChatDrop} from "./handlers/HandleVoicechatDrop";
import {HandleVoicePeerLocationUpdate} from "./handlers/HandleVoicePeerLocationUpdate";

export class Handlers {

    constructor(openAudioMc) {
        function registerClassHandler(channel, handlerFunction) {
            openAudioMc.socketModule.registerHandler(channel, (data) => handlerFunction(openAudioMc, data));
        }

        // general protocol
        registerClassHandler("ClientVersionPayload", handleProtocolVersion);
        registerClassHandler("NotificationPayload", handleNotification);
        registerClassHandler("HueColorPayload", handleHuePayload);
        registerClassHandler("ClientPlayerLocationPayload", handlePlayerLocation);

        // speakers
        registerClassHandler("ClientSpeakerCreatePayload", handleSpeakerCreation);
        registerClassHandler("ClientSpeakerDestroyPayload", handleSpeakerDestroy);

        // media
        registerClassHandler("ClientPreFetchPayload", handlePrefetchPacket);
        registerClassHandler("ClientUpdateMediaPayload", handleMediaUpdate);
        registerClassHandler("ClientCreateMediaPayload", handleCreateMedia);
        registerClassHandler("ClientDestroyMediaPayload", handleDestroyMedia);
        registerClassHandler("ClientVolumePayload", handleClientVolume);

        // voice
        registerClassHandler("ClientVoiceChatUnlockPayload", HandleVoiceUnlock)
        registerClassHandler("ClientVoiceSubscribePayload", HandleVoiceChatSubscription)
        registerClassHandler("ClientVoiceDropPayload", HandleVoiceChatDrop)
        registerClassHandler("ClientVoiceUpdatePeerLocationsPayload", HandleVoicePeerLocationUpdate)
    }
}
