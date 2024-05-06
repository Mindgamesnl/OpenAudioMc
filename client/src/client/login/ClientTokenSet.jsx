/* eslint-disable no-underscore-dangle */
import UrlReader from '../util/UrlReader';
import { API_ENDPOINT } from '../config/ApiEndpoints';
import { ReportError } from '../util/ErrorReporter';
import { setGlobalState } from '../../state/store';
import { VERSION } from '../../build';

export default class ClientTokenSet {
  constructor(publicServerKey, playerUUID, playerName, playerToken, scope) {
    this.publicServerKey = publicServerKey;
    this.uuid = playerUUID;
    this.name = playerName;
    this.token = playerToken;
    this.scope = scope;
    this.attempts = 0;
  }

  initialize() {
    return new Promise(((resolve) => {
      // are we in development mode
      if (VERSION.isDev()) {
        // do we have a dev cache?
        if (window._devTokenCache) {
          // eslint-disable-next-line no-console
          console.warn('Using dev token cache');
          resolve(window._devTokenCache);
          return;
        }
      }

      // mock login
      const url = window.location.href;
      if (url == null) {
        resolve(null);
        return;
      }
      if (url.split('?').length >= 2) {
        const params = UrlReader.getParametersFromUrl(url.split('?')[1]);

        // if the params does not contain shit, dont return shit either
        // fuck off
        if (params.data == null) {
          resolve(null);
          return;
        }

        const query = atob(params.data).split(':');

        // validate all data
        if (query.length !== 4) {
          resolve(null);
          return;
        } // must be 4 arguments
        const playerName = query[0];
        const playerUuid = query[1];
        const serverUuid = query[2];
        const playerToken = query[3];

        // validate the given data
        if (!(playerName != null && playerName.length <= 16 // player name cant be null and must be 16 chars or less
                    && playerUuid != null && playerUuid.length <= 40 // player uuid cant be null or less than 40 char
                    && serverUuid != null && serverUuid.length <= 40 // server uuid cant be null or less than 40 char
                    && playerToken != null && playerToken.length <= 5)) { // player token cant be null or less than 5 char
          resolve(null);
        }

        // all appears to be okay! thats good! give a session
        const out = new ClientTokenSet(serverUuid, playerUuid, playerName, playerToken);
        if (VERSION.isDev()) {
          window._devTokenCache = out;
        }
        resolve(out);
      } else if (url.split('#').length >= 2) {
        // try to load via fetch
        const token = url.split('#')[1];
        fetch(`${API_ENDPOINT.CLIENT_SESSION_SERVER}?token=${token}`, { cache: 'no-store' })
          .then((body) => {
            // is the response okay?
            if (body.status === 403) {
              setGlobalState({
                isBlocked: true,
                isPersonalBlock: true,
                isLoading: false,
              });
              ReportError('Invalid token', window.tokenCache.name);
              resolve(null);
              return;
            }

            if (body.status === 409) {
              setGlobalState({
                isLoading: false,
                isBlocked: true,
                isValidationError: true,
              });
              ReportError('Invalid token', window.tokenCache.name);
              resolve(null);
              return;
            }

            body.json().then((sessionValidationResponse) => {
              if (sessionValidationResponse.errors.length > 0) {
                if (this.attempts < 3) {
                  setGlobalState({ loadingState: `Logging in failed, attempt ${this.attempts + 1} of 3.` });

                  setTimeout(() => {
                    this.requestWasPreviouslyAttempted = true;
                    this.initialize()
                      .then(resolve);
                    this.attempts++;
                  }, 1000);
                } else {
                  resolve(null);
                }
                return;
              }
              const ses = sessionValidationResponse.response;

              const out = new ClientTokenSet(ses.publicKey, ses.playerUuid, ses.playerName, ses.session, ses.scope);
              if (VERSION.isDev()) {
                window._devTokenCache = out;
              }
              resolve(out);
            });
          })
          .catch((error) => {
            ReportError(`Something went while requesting tokens. Error: ${error.toJSON()}`, window.tokenCache.name);
          });
      } else {
        resolve(null);
      }
    }));
  }
}
