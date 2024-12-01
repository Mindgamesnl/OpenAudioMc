// Updated HandleVoiceChannelList function
import {
  store,
  voiceChannelAdd,
  voiceChannelAll,
  voiceChannelPatch,
  voiceChannelRemove,
} from '../../../../../state/store';

export function HandleVoiceChannelList({ channels, operation }) {
  switch (operation) {
    case 'ALL':
      store.dispatch(voiceChannelAll(channels));
      break;
    case 'ADD':
      store.dispatch(voiceChannelAdd(channels));
      break;
    case 'REMOVE':
      store.dispatch(voiceChannelRemove(channels));
      break;
    case 'PATCH':
      store.dispatch(voiceChannelPatch(channels));
      break;
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
}
