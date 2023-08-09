import { setGlobalState } from '../../../../state/store';

export function handleClientVolume(data) {
  const target = data.volume;
  setGlobalState({
    settings: {
      normalVolume: target,
    },
  });
}
