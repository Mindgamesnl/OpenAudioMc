import { API_ENDPOINT } from '../config/ApiEndpoints';
import { getGlobalState, setGlobalState } from '../../state/store';

export const AUDIO_ENDPOINTS = {
  PROXY: API_ENDPOINT.CONTENT_PROXY,
  YOUTUBE: API_ENDPOINT.YOUTUBE_PROXY,
  DRIVE: API_ENDPOINT.DRIVE_PROXY,
};

export class AudioSourceProcessor {
  constructor() {
    this.startedRandomly = false;
    this.lastIndex = 0;
  }

  async translate(sourceOg) {
    let source = this.handleRandomizedPlaylist(sourceOg);
    const { publicServerKey } = getGlobalState().currentUser;

    // filter old
    try {
      if (source.startsWith('files:')) {
        // it's somehow local and unprocessed, could be because its a playlist
        return `https://usercontent.openaudiomc.net/uploads/${getGlobalState().bucketFolder}/${source.replace('files:', '')}`;
      }

      if (source.startsWith('local:')) {
        // it's somehow local and unprocessed, could be because its a playlist
        source = `https://media.openaudiomc.net/direct/${publicServerKey}?fileName=${source.replace('local:', '')}`;
      }

      // translate direct media CDN to always use the current session server, and ignore whatever the server used
      // it could be wrong due to bungee or perhaps even fraud
      if (source.includes('media.openaudiomc.net/direct')) {
        // replace the UUID
        const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
        return source.replace(uuidRegex, publicServerKey);
      }

      if (source.includes('media.openaudiomc.net')) return sourceOg;
      source = source.replace('https://api.openaudiomc.net/stream.php?u=', '');

      // work around for the old google docs system, for those who didn't update yet
      if (source.includes('http://docs.google.com/uc?export=open&id=')) {
        source = source.replace('http://docs.google.com/uc?export=open&id=', AUDIO_ENDPOINTS.DRIVE);
      }
      if (source.includes('https://docs.google.com/uc?export=open&id=')) {
        source = source.replace('https://docs.google.com/uc?export=open&id=', AUDIO_ENDPOINTS.DRIVE);
      }
      if (source.includes('https://drive.google.com/')) {
        // eslint-disable-next-line prefer-destructuring
        source = source.split('file/d/')[1];
        source = AUDIO_ENDPOINTS.DRIVE + source.split('/view')[0];
      }

      // handle youtube proxy, if peeps are interested in that but don't know how to
      // basically for those who can't or wont read documentatino lmao
      this.isYoutube = false;
      if (source.includes('youtube.')) {
        let ytId = source.split('v=')[1];

        if (ytId.includes('&')) {
          // eslint-disable-next-line prefer-destructuring
          ytId = ytId.split('&')[0];
        }

        source = AUDIO_ENDPOINTS.YOUTUBE + ytId;
        this.isYoutube = true;
      } else if (source.includes('youtu.be')) {
        const ytId = source.split('.be/')[1];
        source = AUDIO_ENDPOINTS.YOUTUBE + ytId;
        this.isYoutube = true;
      }

      // handle soundcloud
      if (source.includes('soundcloud.com')) {
        // update now playing too
        const scRequest = await fetch(`https://media.openaudiomc.net/2/soundcloud?u=${source}`);
        const jsonBody = await scRequest.json();
        // eslint-disable-next-line no-prototype-builtins
        if (jsonBody.hasOwnProperty('stream')) {
          setGlobalState({
            soundcloud: {
              title: `${jsonBody.artist} - ${jsonBody.title}`,
              image: jsonBody.photo,
              link: jsonBody.link,
              visible: true,
            },
          });
          return jsonBody.stream;
        }
      }

      // if the page is SSL, but source is http, then proxy it, but only if it is http at all
      if (window.location.protocol === 'https:') {
        if (source.includes('http') && !source.includes('https://')) {
          source = AUDIO_ENDPOINTS.PROXY + source;
        }
      }
    } catch (e) {
      return sourceOg;
    }

    // let tokenSet = new ClientTokenSet().fromCache();
    //
    // // append possible authentication, just good to send along
    // // first one might be special
    // if (source.includes("?")) {
    //     source += "&openAudioPlayerName=" + tokenSet.name;
    // } else {
    //     source += "?openAudioPlayerName=" + tokenSet.name;
    // }
    //
    // source += "&openAudioToken=" + tokenSet.token;
    // source += "&openAudioPublicServerKey=" + tokenSet.publicServerKey;

    return source;
  }

  handleRandomizedPlaylist(input) {
    if (input.startsWith('[') && input.endsWith(']')) {
      const sources = JSON.parse(input);
      if (!this.startedRandomly) {
        const randomIndex = Math.floor(Math.random() * sources.length);
        this.lastIndex = randomIndex;
        this.startedRandomly = true;
        return sources[randomIndex];
      }
      // bump index
      this.lastIndex++;
      if ((this.lastIndex) > sources.length - 1) {
        this.lastIndex = 0;
      }
      return sources[this.lastIndex];
    }
    return input;
  }
}
