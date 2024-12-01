import { setGlobalState } from '../../../../../state/store';

export function HandleVoiceChannelStatus({ currentChannel }) {
  setGlobalState({ voiceChannels: { activeChannelId: currentChannel } });
}
