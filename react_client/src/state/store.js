import { createStore } from 'redux';

const initialState = {
    // app instance
    app: null,

    // state - null for the login screen
    currentUser: {
        'userName': 'Toetje',
        'uuid': "2fb3a3e2-64ca-433d-8692-ff9d35bc6f92"
    },

    settings: {
        normalVolume: 35,
        voicechatVolume: 100,
        voicechatMuted: false,
        voicechatSurroundSound: true,
        voicechatMonitoringEnabled: false,
        microphoneSensitivity: 0,
        automaticSensitivity: true,
    },

    voiceState: {
        isSpeaking: false,
        serverHasModeration: false,
    },

    // click lock
    clickLock: true,

    // view states
    isLoading: true,
    loadingState: 'Preparing to load OpenAudioMc',


    translationBanner: null, // null or {detectedAs: 'en', toEn: 'to en', keep: 'keep', reset: function() {}}
    lang: {
        emptyDefault: 'emptyDefault',
    }
};

export function setGlobalState(stateUpdates) {
    store.dispatch({ type: 'SET_STATE', stateUpdates });
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

export const store = createStore(appReducer);