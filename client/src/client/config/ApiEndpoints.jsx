export const API_ENDPOINT = {
  // media stuff
  CONTENT_PROXY: 'https://media.openaudiomc.net/proxy?apiurl=',
  YOUTUBE_PROXY: 'https://media.openaudiomc.net/youtube?id=',
  SOUNDCLOUD_PROXY: 'https://media.openaudiomc.net/soundcloud?u=',
  DRIVE_PROXY: 'https://media.openaudiomc.net/googledrive?id=',

  // backend stuff
  VITALS: 'https://gateway.openaudiomc.net/api/v1/health-report',
  ERROR_REPORTING: 'https://gateway.openaudiomc.net/api/v1/error-report',
  CLIENT_SESSION_SERVER: 'https://gateway.openaudiomc.net/session',
  GET_SETTINGS: 'https://gateway.openaudiomc.net/api/v3/account-services/settings/',
  PREAUTH_WS: 'wss://gateway.openaudiomc.net/api/v1/client-preauth',

  PROD_CLIENT_VERSION: 'https://session.openaudiomc.net/metadata.json',
};
