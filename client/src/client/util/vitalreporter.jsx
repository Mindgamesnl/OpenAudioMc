import { getGlobalState } from '../../state/store';
import { VERSION } from '../../build';
import { getTranslation } from '../OpenAudioAppContainer';
import { API_ENDPOINT } from '../config/ApiEndpoints';

export async function reportVital(message) {
  const u = getGlobalState().currentUser;
  const { userName, uuid } = u || { userName: 'unknown', uuid: 'unknown' };

  const serverName = getTranslation(null, 'serverName');

  const currentDomain = window.location.hostname;

  message += ` | ${currentDomain} | ${VERSION.build} | ${serverName}`;

  await fetch(API_ENDPOINT.VITALS, {
    method: 'POST',
    body: JSON.stringify({
      playerName: userName,
      uuid,
      text: message,
    }),
  });
}
