import { handleClientVolume } from './handlers/HandleClientVolume';
import { handlePrefetchPacket } from './handlers/HandlePrefetch';
import { handleMediaUpdate } from './handlers/HandleMediaUpdate';
import { handleCreateMedia } from './handlers/HandleCreateMedia';
import { handleDestroyMedia } from './handlers/HandleDestroyMedia';
import { handleProtocolVersion } from './handlers/HandleProtocolVersion';
import { HandleVoiceUnlock } from './handlers/voice/HandleVoicechatUnlock';
import { handlePlayerLocation } from './handlers/HandlePlayerLocation';
import { HandleVoiceSubscription } from './handlers/voice/HandleVoiceSubscription';
import { HandleVoiceDrop } from './handlers/voice/HandleVoiceDrop';
import { HandleVoicePeerMovement } from './handlers/voice/HandleVoicePeerMovement';
import { HandleMicToggleRequest } from './handlers/voice/HandleMicToggleRequest';
import { HandleVoiceBlur } from './handlers/voice/HandleVoiceBlur';
import { handleSpeakerCreate } from './handlers/speakers/HandleSpeakerCreate';
import { HandleSpeakerDestroy } from './handlers/speakers/HandleSpeakerDestroy';
import { HandleVoiceModerationStatus } from './handlers/voice/HandleVoiceModerationStatus';
import { HandleVoiceDeafen } from './handlers/voice/HandleToggleDeafenCommand';
import { HandleVoicePeerOptionsUpdate } from './handlers/voice/HandleVoicePeerOptionsUpdate';
import { HandleVoiceChannelList } from './handlers/voice/HandleVoiceChannelList';
import { HandleVoiceChannelStatus } from './handlers/voice/HandleVoiceChannelStatus';

export class HandlerRegistry {
  constructor(socket) {
    function registerClassHandler(channel, handlerFunction) {
      socket.registerHandler(channel, (data) => handlerFunction(data));
    }

    // protocol
    registerClassHandler('ClientVersionPayload', handleProtocolVersion);
    registerClassHandler('ClientPlayerLocationPayload', handlePlayerLocation);

    // media
    registerClassHandler('ClientPreFetchPayload', handlePrefetchPacket);
    registerClassHandler('ClientUpdateMediaPayload', handleMediaUpdate);
    registerClassHandler('ClientCreateMediaPayload', handleCreateMedia);
    registerClassHandler('ClientDestroyMediaPayload', handleDestroyMedia);
    registerClassHandler('ClientVolumePayload', handleClientVolume);

    // speaker
    registerClassHandler('ClientSpeakerCreatePayload', handleSpeakerCreate);
    registerClassHandler('ClientSpeakerDestroyPayload', HandleSpeakerDestroy);

    // voice
    registerClassHandler('ClientVoiceChatUnlockPayload', HandleVoiceUnlock);
    registerClassHandler('ClientVoiceSubscribePayload', HandleVoiceSubscription);
    registerClassHandler('ClientVoiceDropPayload', HandleVoiceDrop);
    registerClassHandler('ClientVoiceUpdatePeerLocationsPayload', HandleVoicePeerMovement);
    registerClassHandler('ClientVoiceChatToggleMicrophonePayload', HandleMicToggleRequest);
    registerClassHandler('ClientVoiceChatToggleDeafenPayload', HandleVoiceDeafen);
    registerClassHandler('ClientVoiceBlurUiPayload', HandleVoiceBlur);
    registerClassHandler('ClientModerationStatusPayload', HandleVoiceModerationStatus);
    registerClassHandler('ClientVoiceOptionsPayload', HandleVoicePeerOptionsUpdate);
    registerClassHandler('ClientChannelsDisplayPayload', HandleVoiceChannelList);
    registerClassHandler('ClientChannelStatusPayload', HandleVoiceChannelStatus);
  }
}
