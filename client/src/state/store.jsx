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
  clientSupportsVoiceChat: false, // not valid https
  browserSupportsVoiceChat: false, // no webrtc at all
  browserSupportIsLimited: false, // operagx, broken settings?
  bucketFolder: null,

  inputModal: {
    visible: false,
    title: '',
    message: '',
    callback: null,
  },

  settings: {
    prefetchMedia: true,
    normalVolume: 35,
    voicechatVolume: 100,
    voicechatMuted: false,
    voicechatSurroundSound: true,
    voicechatMonitoringEnabled: false,
    microphoneSensitivity: 75,
    automaticSensitivity: false,
    fadeAudio: true,

    voicechatChimesEnabled: true,
    interpolationEnabled: true,
    spatialRenderingMode: 'new',
    rolloffFactor: 0.5,

    preferredMicId: 'default',

    backgroundImage: null,
    accentColor: null,
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

  // view states
  isLoading: true,
  isBlocked: false, // whenever an account is temporarily blocked (rate-limiting, abuse)
  isPersonalBlock: false, // whenever this user is personally rate-limited or blocked (due to for example, dmca abuse)
  loadingState: 'Preparing to load OpenAudioMc',
  fixedFooter: null,
  navbarDetails: true,
  currentTab: 0,

  translationBanner: null, // null or {detectedAs: 'en', toEn: 'to en', keep: 'keep', reset: function() {}}
  langFile: null, // current lang file
  lang: {}, // gets loaded from the lang file, changes cause a full UI re-render
};

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
    for (const key in settings) {
      if (Object.prototype.hasOwnProperty.call(settings, key) && shouldSettingSave(key)) {
        Cookies.set(`setting_${key}`, settings[key], { expires: 365 });
      }
    }
  }
}

export function getGlobalState() {
  return store.getState();
}

// hacky, but easy reducer
function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_STATE':
      return mergeObjects(state, action.stateUpdates);
    case 'SET_LANG_MESSAGE':
      if (action.payload.key === undefined || action.payload.value === undefined) {
        console.error('Invalid lang message');
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

function mergeObjects(obj1, obj2) {
  // remove null values
  for (const key in obj1) {
    if (obj1[key] === null) {
      delete obj1[key];
    }
  }

  return {
    ...{
      ...obj1,
      ...obj2,
      ...Object.keys(obj1).reduce((acc, key) => {
        if (obj2[key] && typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          acc[key] = mergeObjects(obj1[key], obj2[key]);
        }
        return acc;
      }, {}),
    },
  };
}

// toggle debug mode when the D key is pressed
document.addEventListener('keydown', (e) => {
  if (e.key === 'd') {
    setGlobalState({ debug: !getGlobalState().debug });
  }
});

// eslint-disable-next-line no-underscore-dangle
const devtoolsExt = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(appReducer, devtoolsExt);
