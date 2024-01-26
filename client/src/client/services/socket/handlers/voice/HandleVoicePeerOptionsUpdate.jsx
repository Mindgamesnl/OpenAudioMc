import { VoiceModule } from '../../../voice/VoiceModule';
import { peerOptionsFromObj } from '../../../voice/peers/VoicePeerOptions';

export function HandleVoicePeerOptionsUpdate(data) {
  const { targetPeerKey, options } = data;

  const peer = VoiceModule.peerMap.get(targetPeerKey);

  if (!peer) {
    // eslint-disable-next-line no-console
    console.warn(`Peer ${targetPeerKey} not found`);
  }

  // force feed the options, which we'll need to translate first
  const parsedOptions = peerOptionsFromObj(options);
  peer.updateOptions(parsedOptions);
}
