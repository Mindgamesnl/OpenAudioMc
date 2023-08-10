import { VoiceModule } from '../../../voice/VoiceModule';

export function HandleVoicePeerMovement(data) {
  for (let i = 0; i < data.updateSet.length; i++) {
    const update = data.updateSet[i];
    VoiceModule.peerLocationUpdate(update.streamKey, update.x, update.y, update.z);
  }
}
