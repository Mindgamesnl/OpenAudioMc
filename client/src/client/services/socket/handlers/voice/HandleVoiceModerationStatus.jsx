import { setGlobalState } from '../../../../../state/store';

export function HandleVoiceModerationStatus(data) {
  const isMod = data.isModerating;

  setGlobalState({
    voiceState: {
      isModerating: isMod,
    },
  });
}
