import { getGlobalState } from '../../state/store';

export function closeSessionTab() {
  if (getGlobalState().isClaimed) {
    // force reload to a state without auth
    window.location.href = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  } else {
    window.location.href = 'https://openaudiomc.net';
  }
}
