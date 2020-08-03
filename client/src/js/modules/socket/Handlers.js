import {handleCreateMedia} from "./handlers/HandleCreateMedia";
import {handleDestroyPanel} from "./handlers/HandleDestroyPanel";
import {handleUpdateCard} from "./handlers/HandleUpdateCard";
import {handleCreateCard} from "./handlers/HandleCreateCard";
import {handleNotification} from "./handlers/HandleNotification";
import {handleProtocolVersion} from "./handlers/HandleProtocolVersion";
import {handleClientVolume} from "./handlers/HandleClientVolume";
import {handleDestroyMedia} from "./handlers/HandleDestroyMedia";
import {handleHuePayload} from "./handlers/HandleHue";
import {handleMediaUpdate} from "./handlers/HandleMediaUpdate";
import {handlePlayerLocation} from "./handlers/HandlePlayerLocation";
import {handleSpeakerCreation} from "./handlers/HandleSpeakerCreation";
import {handleSpeakerDestroy} from "./handlers/HandleSpeakerDestroy";

export class Handlers {

    constructor(openAudioMc) {
        function registerClassHandler(channel, handlerFunction) {
            openAudioMc.socketModule.registerHandler(channel, (data) => {
                handlerFunction(openAudioMc, data);
            });
        }

        registerClassHandler("ClientCreateMediaPayload", handleCreateMedia);
        registerClassHandler("ClientDestroyCardPayload", handleDestroyPanel);
        registerClassHandler("ClientUpdateCardPayload", handleUpdateCard);
        registerClassHandler("ClientCreateCardPayload", handleCreateCard);
        registerClassHandler("NotificationPayload", handleNotification);
        registerClassHandler("ClientVersionPayload", handleProtocolVersion)
        registerClassHandler("ClientVolumePayload", handleClientVolume)
        registerClassHandler("ClientDestroyMediaPayload", handleDestroyMedia)
        registerClassHandler("HueColorPayload", handleHuePayload)
        registerClassHandler("ClientUpdateMediaPayload", handleMediaUpdate)
        registerClassHandler("ClientPlayerLocationPayload", handlePlayerLocation)
        registerClassHandler("ClientSpeakerCreatePayload", handleSpeakerCreation)
        registerClassHandler("ClientSpeakerDestroyPayload", handleSpeakerDestroy)
    }
}
