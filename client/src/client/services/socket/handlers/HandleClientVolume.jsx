import { setGlobalState } from '../../../../state/store';

export function handleClientVolume(data) {
  let target = data.volume;

  // is it falsy or maybe 0? then set it to 0 explicitly
  if (!target) target = 0;

  setGlobalState({
    settings: {
      normalVolume: target,
    },
  });
}
