import { createStore } from 'redux';
import Cookies from "js-cookie";

const initialState = {
    // state - null for the login screen
    currentUser: null,

    relay: {
        endpoint: null,
        connected: false,
        connecting: false,
    },

    isPremium: false,

    settings: {
        prefetchMedia: true,
        normalVolume: 35,
        voicechatVolume: 100,
        voicechatMuted: false,
        voicechatSurroundSound: true,
        voicechatMonitoringEnabled: false,
        microphoneSensitivity: 69,
        automaticSensitivity: true,
        fadeAudio: true,

        voicechatChimesEnabled: true,
        interpolationEnabled: true,
        streamermodeEnabled: false,
        spatialRenderingMode: 'new',
        rolloffFactor: 0.5,

        preferredMicId: "default",
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
        isTemporarilyDisabled: false,
        enabled: false,
        ready: false,
        isSpeaking: false,
        serverHasModeration: false,
        streamServer: null,
        streamKey: null,
        radius: 25,
        mics: [], // cached list of microphones
        peers: {}, // set of peers, mapped by stream key, {name, uuid, speaking, muted, loading}
    },

    build: {
        build: 2002,
        compiler: 'Mats',
        isProd: true
    },

    // click lock
    clickLock: true,

    // view states
    isLoading: true,
    loadingState: 'Preparing to load OpenAudioMc',


    translationBanner: null, // null or {detectedAs: 'en', toEn: 'to en', keep: 'keep', reset: function() {}}
    langFile: null, // current lang file
    lang: {} // gets loaded from the lang file, changes cause a full UI re-render
};

export function setGlobalState(stateUpdates) {
    store.dispatch({ type: 'SET_STATE', stateUpdates });

    // save to cookies
    if (stateUpdates.hasOwnProperty("settings")) {
        const settings = stateUpdates.settings;
        for (let key in settings) {
            if (settings.hasOwnProperty(key)) {
                Cookies.set("setting_" + key, settings[key], { expires: 365 });
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
                console.error("Invalid lang message");
                return state;
            }
            return {
                ...state,
                lang: {
                    ...state.lang,
                    [action.payload.key]: action.payload.value
                }
            };
        default:
            return state;
    }
}

function mergeObjects(obj1, obj2) {
    // remove null values
    for (let key in obj1) {
        if (obj1[key] === null) {
            delete obj1[key];
        }
    }

    return {...{
        ...obj1,
        ...obj2,
        ...Object.keys(obj1).reduce((acc, key) => {
            if (obj2[key] && typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                acc[key] = mergeObjects(obj1[key], obj2[key]);
            }
            return acc;
        }, {}),
    }};
}

export const store = createStore(appReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());