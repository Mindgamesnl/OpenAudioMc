import { API_ENDPOINT } from '../config/ApiEndpoints';
import { VERSION } from '../../build';

export function ReportError(message, playerName) {
  fetch(API_ENDPOINT.ERROR_REPORTING, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      playerName,
      message: `build ${VERSION.build}: ${message}`,
    }),
  });
}
