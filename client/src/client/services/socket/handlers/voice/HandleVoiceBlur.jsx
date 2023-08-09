import { setGlobalState } from '../../../../../state/store';

export function HandleVoiceBlur(data) {
  setGlobalState({ voiceState: { isTemporarilyDisabled: data.blurred } });
}
