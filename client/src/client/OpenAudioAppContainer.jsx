import React from 'react';

import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import {
  getGlobalState, setGlobalState, shouldSettingSave, store,
} from '../state/store';
import { ReportError } from './util/ErrorReporter';
import ClientTokenSet from './login/ClientTokenSet';
import { MessageModule } from './translations/MessageModule';
import { API_ENDPOINT } from './config/ApiEndpoints';
import { MediaManager } from './services/media/MediaManager';
import { SocketManager } from './services/socket/SocketModule';
import { reportVital } from './util/vitalreporter';
import { WorldModule } from './services/world/WorldModule';
import { debugLog } from './services/debugging/DebugService';
import { FadeToCtx, OAC } from '../components/contexts';
import { VERSION } from '../build';
import { isValidHttps } from './util/sslcheck';
import { SeededTestData } from './config/TestData';

class OpenAudioAppContainer extends React.Component {
  static contextType = FadeToCtx;

  constructor(props) {
    super(props);

    this.handleGlobalClick = this.handleGlobalClick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.attemptLoginWithTokenSet = this.attemptLoginWithTokenSet.bind(this);
    this.bootApp = this.bootApp.bind(this);

    OAC.attemptLoginWithTokenSet = this.attemptLoginWithTokenSet;
    OAC.bootApp = this.bootApp;

    this.state = {
      didUnlock: false,
      allowedToUnlock: false,
    };

    // initialize capabilities
    setGlobalState({
      browserSupportsVoiceChat: isVoicechatCompatible(),
      clientSupportsVoiceChat: isValidHttps(),
    });

    const { settings } = getGlobalState();
    // loop over all object keys
    Object.keys(settings).forEach((key) => {
      if (!shouldSettingSave(key)) return;

      // get cookie value
      const cookieValue = Cookies.get(`setting_${key}`);
      if (cookieValue == null) return;
      let parsed = cookieValue;
      if (typeof settings[key] === 'number') {
        parsed = parseFloat(cookieValue);
      }

      if (typeof settings[key] === 'boolean') {
        parsed = cookieValue === 'true';
      }

      setGlobalState({
        settings: {
          [key]: parsed,
        },
      });
    });
  }

  componentDidMount() {
    if (getGlobalState().ignoreUrlToken) {
      return;
    }

    // check if the current url has testMode as a variable
    const url = new URL(window.location.href);
    const testMode = url.searchParams.get('testMode');
    if (testMode != null) {
      setBgColor('#8B7355');
      // set the global state to test mode
      setGlobalState(SeededTestData);
      MessageModule.handleCountry('gb');
      return;
    }

    setGlobalState({ loadingState: 'Loading language files...' });
    const sessionLoader = new ClientTokenSet();

    MessageModule.loadDefault()
      .then(() => {
        setGlobalState({ loadingState: 'Attempting login' });
      })
      .then(() => sessionLoader.initialize())
      // load player token
      .then((tokenSet) => {
        if (tokenSet == null) {
          ReportError(`A faulty login attempt was done at ${window.location.host}`, 'Steve');
          setGlobalState({
            isLoading: false,
            currentUser: null,
          });
          return;
        }
        // eslint-disable-next-line consistent-return
        return tokenSet;
      })

      // load server
      .then(this.attemptLoginWithTokenSet)
      .catch((e) => {
        setGlobalState({ isLoading: false });
        fatalToast(`Your current link has expired. Please run /audio again to get a new link. Error: ${e.message}`);
        reportError(e);
        return null;
      });
  }

  handleGlobalClick() {
    if (this.props.currentUser == null) return;
    if (this.state.allowedToUnlock) {
      if (!this.state.didUnlock) {
        // initialize OpenAudio
        this.bootApp();
      }
    }
  }

  async attemptLoginWithTokenSet(tokenSet) {
    if (tokenSet == null) return;
    setGlobalState({
      currentUser: {
        userName: tokenSet.name,
        uuid: tokenSet.uuid,
        token: tokenSet.token,
        publicServerKey: tokenSet.publicServerKey,
        scope: tokenSet.scope,
      },
      loadingState: `Welcome ${tokenSet.name}! Loading your data...`,
    });

    debugLog(`Token '${tokenSet.token}' loaded for user '${tokenSet.name}'`);

    const { publicServerKey } = tokenSet;

    // fetch server data
    const serverDataRaw = await fetch(`${API_ENDPOINT.GET_SETTINGS + publicServerKey}?name=${tokenSet.name}`);

    if (serverDataRaw.status !== 200) {
      ReportError(`Failed to get server details from ${publicServerKey} at ${window.location.host}`, tokenSet.name);
      setGlobalState({
        isLoading: false,
        currentUser: null,
      });
      fatalToast(`Failed to get server details from ${publicServerKey}`);
      throw new Error(`Failed to get server details from ${publicServerKey}`);
    }

    let serverData = await serverDataRaw.json();
    if (serverData.error !== 'NONE') {
      ReportError(`Failed to get server details from ${publicServerKey} at ${window.location.host}`, tokenSet.name);
      setGlobalState({
        isLoading: false,
        currentUser: null,
      });
      fatalToast(`Failed to get server details from ${publicServerKey}! Please try again later or contact support.`);
      throw new Error(`Failed to get server details from ${publicServerKey}`);
    }

    serverData = serverData.response;

    // is the server banned or locked out?
    if (serverData.banned) {
      setGlobalState({
        isBlocked: true,
        isPersonalBlock: (serverData.isPersonalBlock != null && serverData.isPersonalBlock), // is it the account, or me?
        isLoading: false,
      });
      // don't continue loading
      reportVital('metrics:accountlocked');
      return;
    }

    if (serverData.isVoicechatEnabled) {
      setGlobalState({
        voiceState: {
          serverHasVoiceChat: true,
        },
      });
    }

    if (serverData.useTranslations) {
      const localLanguage = navigator.language || navigator.userLanguage;
      const language = localLanguage.split('-')[0];
      debugLog(`Detected language: ${language}`);
      await MessageModule.handleCountry(language);
    } else {
      debugLog('Translations disabled, skipping language detection');
      setGlobalState({
        // overwrite some messages
        lang: {
          'home.welcome': serverData.welcomeMessage,
          'home.activateText': serverData.startButton,
          'home.header': serverData.activeMessage,
        },
      });
    }

    debugLog(`Server: ${serverData.displayName} (${publicServerKey})`);
    debugLog(`Server is premium: ${serverData.isPatreon}`);
    debugLog(`Server bucket folder: ${serverData.bucketFolder}`);

    setGlobalState({
      lang: { serverName: serverData.displayName },
      isPremium: serverData.isPatreon || serverData.voicechatSlots > 10,
      bucketFolder: serverData.bucketFolder,
      isClaimed: serverData.isClaimed,
      settings: { serverTitle: serverData.title, serverDisplayName: serverData.displayName },
    });

    setBgColor(serverData.color);
    document.title = serverData.title;

    if (serverData.startSound !== '') {
      MediaManager.startSound = serverData.startSound;
    }

    if (serverData.ambianceSound !== '') {
      await MediaManager.setupAmbianceSound(serverData.ambianceSound);
    }

    if (serverData.backgroundImage !== '') {
      setBgImage(serverData.backgroundImage);
    }

    if (serverData.logoImage !== '') {
      setGlobalState({ settings: { logoImage: serverData.logoImage } });
      document.getElementById('site-icon').href = serverData.logoImage;
      document.getElementById('site-image').href = serverData.logoImage;
    }

    setGlobalState({
      voiceState: {
        peersHidden: !serverData.showVoicePeers,
      },
      navbarDetails: serverData.showNavbarDetails,
    });

    // is the server offline? cancel now
    if (serverData.relayEndpoint == null) {
      ReportError(`Server ${publicServerKey} is offline at ${window.location.host}`, tokenSet.name);
      setGlobalState({
        isLoading: false,
        currentUser: null,
      });
      fatalToast(`Failed to connect with ${publicServerKey}! Please try a new link from /audio, or contact server staff if the issue persists.`);
      throw new Error(`Server ${publicServerKey} is offline`);
    } else {
      setGlobalState({
        relay: {
          endpoint: serverData.relayEndpoint,
        },
      });
    }

    reportVital('metrics:prodlogin');

    setGlobalState({ isLoading: false });
    this.setState({ allowedToUnlock: true });
    this.context.fadeToComponent(null);

    // eslint-disable-next-line no-underscore-dangle
    if (VERSION.isDev() && window._devUnlock) {
      // eslint-disable-next-line no-underscore-dangle
      setGlobalState({ voiceState: { autoJoinVoiceChat: window._devUnlockWithVoice } });
      this.bootApp();
    }
  }

  bootApp() {
    WorldModule.initPlayer();
    MediaManager.postBoot();
    SocketManager.connectToServer(getGlobalState().relay.endpoint);
    setGlobalState({ clickLock: false });
    this.setState({ didUnlock: true });

    // store dev vars
    if (VERSION.isDev()) {
      // eslint-disable-next-line no-underscore-dangle
      window._devTokenCache = getGlobalState().currentUser;
      // eslint-disable-next-line no-underscore-dangle
      window._devUnlock = true;
      // eslint-disable-next-line no-underscore-dangle
      window._devUnlockWithVoice = getGlobalState().voiceState.autoJoinVoiceChat;
    }
  }

  render() {
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className="h-screen" onClick={this.handleGlobalClick}>
        <OAC.Provider value={store.getState()}>
          {this.props.children}
        </OAC.Provider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    clickLock: state.clickLock,
    isLoading: state.isLoading,
    loadingState: state.loadingState,
    lang: state.lang,
    renderId: state.renderId,
  };
}

export default connect(mapStateToProps)(OpenAudioAppContainer);

function fatalToast(message) {
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });
}

export function getTranslation(context, message) {
  if (context == null) {
    context = getGlobalState();
  }
  let m = context.lang[message];

  if (m === undefined) {
    // eslint-disable-next-line no-console
    console.error(`Missing translation for: ${message}`);
    return `<${message}>`;
  }

  if (context.currentUser) {
    m = m.replace('%player', context.currentUser.userName);
    m = m.replace('%name', context.currentUser.userName);
  }
  return m;
}

export function msg(message) {
  return getTranslation(null, message);
}

export function setBgColor(col) {
  if (col === '#000000') return;

  const colorsToUpdate = [
    '--strangerDangerRedAccent',
    '--primary-accent',
  ];

  colorsToUpdate.forEach((color) => {
    document.documentElement.style.setProperty(color, col);
  });

  setGlobalState({ settings: { accentColor: col } });
}

window.debugSetBgColor = setBgColor;

function setBgImage(bg) {
  // if (bg.endsWith("mp4") && result.response.isPatreon) {
  //     // use mp4
  //     document.getElementById("video-bg-wrapper").style.display = "";
  //     document.getElementById("video-element").innerHTML +=  `<source src="` + bg + `" id="video-bg-src" type="video/mp4">`
  //     setTimeout(() => {
  //         document.getElementById("video-element").play()
  //     }, 300);
  // } else {
  // use bg image
  document.documentElement.style.setProperty('--background-image', `url("${bg}")`);
  setGlobalState({ settings: { backgroundImage: bg } });
  // }
}

function isVoicechatCompatible() {
  if (typeof RTCPeerConnection === 'undefined') {
    return false;
  }
  return true;
}
