import { getGlobalState, setGlobalState } from '../../../../../state/store';

export function HandleMicToggleRequest() {
  const isMuted = getGlobalState().settings.voicechatMuted;
  setGlobalState({ settings: { voicechatMuted: !isMuted } });
}
