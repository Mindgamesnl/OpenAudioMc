import { getGlobalState, setGlobalState } from '../../../../../state/store';
import { VoiceModule } from '../../../voice/VoiceModule';

export function HandleVoiceDeafen() {
  const newState = !getGlobalState().settings.voicechatDeafened;
  setGlobalState({ settings: { voicechatDeafened: newState }, voiceState: { deafenedBefore: true } });
  VoiceModule.peerManager.setDeafened(newState);
}
