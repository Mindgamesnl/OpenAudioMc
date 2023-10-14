import { createStore } from 'redux';
import Cookies from 'js-cookie';

// some settings shouldn't be saved persistently
export const UNSAVED_SETTINGS = [
  'voicechatMonitoringEnabled',
  'voicechatMuted',
];

const initialState = {
  platformInfo: {
    flow: 'none', // none, bedrock, java
    notificationsReady: false, // if notifications are ready to be shown
  },

  // state - null for the login screen
  currentUser: null,

  debug: false,
  ignoreUrlToken: false,

  relay: {
    endpoint: null,
    connected: false,
    connecting: false,
  },

  isPremium: false,
  isClaimed: false,
  clientSupportsVoiceChat: false, // not valid https
  browserSupportsVoiceChat: false, // no webrtc at all
  browserSupportIsLimited: false, // operagx, broken settings?
  bucketFolder: null,

  inputModal: {
    visible: false,
    title: '',
    message: '',
    callback: null,
    showCancel: true,
  },

  settings: {
    prefetchMedia: true,
    normalVolume: 35,
    voicePiPEnabled: false,
    voicechatVolume: 100,
    voicechatMuted: false,
    voicechatSurroundSound: true,
    voicechatMonitoringEnabled: false,
    microphoneSensitivity: 75,
    automaticSensitivity: false,
    fadeAudio: true,

    voiceEchoCancellation: false,
    voicechatChimesEnabled: true,
    interpolationEnabled: true,
    spatialRenderingMode: 'new',
    rolloffFactor: 0.5,
    distanceModel: 'exponential',

    preferredMicId: 'default',

    backgroundImage: null,
    logoImage: 'assets/logo.png',
    accentColor: null,
    serverTitle: null,
    serverDisplayName: null,
  },

  loadingOverlay: {
    visible: false,
    title: null,
    message: null,
    footer: null,
  },

  soundcloud: {
    visible: false,
    title: 'Cool song song',
    image: 'https://i1.sndcdn.com/artworks-NWsyJg2rpTy2imze-4ttQKA-t500x500.jpg',
    link: 'https://soundcloud.com/cool-songs/cool-song-song',
  },

  voiceState: {
    autoJoinVoiceChat: false,
    serverHasVoiceChat: false,
    peersHidden: false,
    isModerating: false,
    isTemporarilyDisabled: false,
    isMutedServerSide: false,
    enabled: false,
    ready: false,
    isSpeaking: false,
    serverHasModeration: false,
    microphoneSanityPrompt: false,
    microphoneTriggeredOnce: false,
    streamServer: null,
    streamKey: null,
    radius: 25,
    mics: [], // cached list of microphones
    peers: {}, // set of peers, mapped by stream key, {name, uuid, speaking, muted, loading}
  },

  build: {
    build: 2002,
    compiler: 'Mats',
    isProd: true,
  },

  // click lock
  clickLock: true,

  // general
  hasPlayingMedia: false,

  // view states
  isLoading: true,
  isBlocked: false, // whenever an account is temporarily blocked (rate-limiting, abuse)
  isPersonalBlock: false, // whenever this user is personally rate-limited or blocked (due to for example, dmca abuse)
  loadingState: 'Preparing to load OpenAudioMc',
  fixedFooter: null,
  navbarDetails: true,
  currentTab: 0,

  translationBanner: null, // null or {detectedAs: 'en', toEn: 'to en', keep: 'keep', reset: function() {}}
  langName: null, // current lang file
  lang: {}, // gets loaded from the lang file, changes cause a full UI re-render

  renderId: 0, // used to force a re-render
};

function mergeObjects(first, second) {
  // remove null values
  // loop with object.keys to avoid prototype pollution
  Object.keys(first).forEach((key) => {
    if (first[key] === null) {
      delete first[key];
    }
  });

  return {
    ...{
      ...first,
      ...second,
      ...Object.keys(first).reduce((acc, key) => {
        if (second[key] && typeof first[key] === 'object' && typeof second[key] === 'object') {
          acc[key] = mergeObjects(first[key], second[key]);
        }
        return acc;
      }, {}),
    },
  };
}

// hacky, but easy reducer
// eslint-disable-next-line
function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_STATE':
      return mergeObjects(state, action.stateUpdates);
    case 'SET_LANG_MESSAGE':
      if (action.payload.key === undefined || action.payload.value === undefined) {
        // eslint-disable-next-line no-console
        console.error('Invalid lang message', action.payload);
        return state;
      }
      return {
        ...state,
        lang: {
          ...state.lang,
          [action.payload.key]: action.payload.value,
        },
      };
    default:
      return state;
  }
}

// eslint-disable-next-line no-underscore-dangle
const devtoolsExt = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(appReducer, devtoolsExt);

export function shouldSettingSave(name) {
  for (let i = 0; i < UNSAVED_SETTINGS.length; i++) {
    const s = UNSAVED_SETTINGS[i];
    if (s.toLowerCase() === name.toLowerCase()) return false;
  }
  return true;
}

export function setGlobalState(stateUpdates) {
  store.dispatch({ type: 'SET_STATE', stateUpdates });

  // save to cookies
  if (Object.prototype.hasOwnProperty.call(stateUpdates, 'settings')) {
    const { settings } = stateUpdates;
    for (let i = 0; i < Object.keys(settings).length; i++) {
      const key = Object.keys(settings)[i];
      if (Object.prototype.hasOwnProperty.call(settings, key) && shouldSettingSave(key)) {
        Cookies.set(`setting_${key}`, settings[key], { expires: 365 });
      }
    }
  }
}

export function getGlobalState() {
  return store.getState();
}

// toggle debug mode when the D key is pressed
document.addEventListener('keydown', (e) => {
  if (e.key === 'd') {
    setGlobalState({
      debug: !getGlobalState().debug,
    });
  }
});
