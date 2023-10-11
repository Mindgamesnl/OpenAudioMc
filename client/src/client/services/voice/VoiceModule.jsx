import { toast } from 'react-toastify';
import { PeerManager } from './peers/PeerManager';
import { getGlobalState, setGlobalState, store } from '../../../state/store';
import { makeid } from '../../util/random';
import { getTranslation } from '../../OpenAudioAppContainer';
import { WrappedUserMedia } from './util/WrappedUserMedia';
import { MicrophoneProcessor } from './processing/MicrophoneProcessor';
import { SocketManager } from '../socket/SocketModule';
import * as PluginChannel from '../../util/PluginChannel';
import { VoicePeer } from './peers/VoicePeer';
import { feedDebugValue } from '../debugging/DebugService';
import { DebugStatistic } from '../debugging/DebugStatistic';
import { setTab } from '../../../components/tabwindow/TabWindow';
import { StringifyError } from '../../util/errorreformat';

const gainTrackers = {};

export function untrackVoiceGainNode(id) {
  delete gainTrackers[id];
}

function updateVoiceGain(gainNode) {
  // update node property from VOICECHAT_VOLUME
  gainNode.gain.value = getGlobalState().settings.voicechatVolume / 100;
}

export function reRenderAllGainNodes() {
  Object.values(gainTrackers).forEach((gainNode) => {
    updateVoiceGain(gainNode);
  });
}

export function trackVoiceGainNode(gainNode) {
  updateVoiceGain(gainNode);
  const id = makeid(5);
  gainTrackers[id] = gainNode;
  return id;
}

export const VoiceModule = new class IVoiceModule {
  constructor() {
    this.peerManager = new PeerManager();
    this.peerMap = new Map();
    this.loadedDeviceList = false;
    this.microphoneProcessing = null;
    this.isUpdatingMic = false;

    let lastPreferredMic = getGlobalState().settings.preferredMicId;
    let lastSurroundValue = getGlobalState().settings.voicechatSurroundSound;
    let onSettingsChange = () => {
      const state = getGlobalState().settings;
      if (lastPreferredMic !== state.preferredMicId) {
        lastPreferredMic = state.preferredMicId;
        if (!this.isUpdatingMic && this.isReady()) {
          this.changeInput(lastPreferredMic);
        }
      }

      if (lastSurroundValue !== state.voicechatSurroundSound) {
        lastSurroundValue = state.voicechatSurroundSound;
        if (this.isReady()) {
          this.onSurroundUpdate();
        }
      }
    };
    onSettingsChange = onSettingsChange.bind(this);
    store.subscribe(onSettingsChange);

    window.debugVoiceModule = this;
  }

  startVoiceChat() {
    setTab(1);
    this.showLoadingPopup();

    // try to get the device
    const deviceLoader = new WrappedUserMedia();

    // on success
    deviceLoader.successCallback = (stream) => {
      // update mic cache while we're at it
      navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
          const deviceMap = [];
          for (let i = 0; i < devices.length; i++) {
            const device = devices[i];
            if (device.kind === 'audioinput') {
              deviceMap.push({
                name: device.label,
                id: device.deviceId,
              });
            }
          }
          setGlobalState({ voiceState: { mics: deviceMap } });
        })
        .catch((err) => {
          this.panic();
          throw err;
        });

      // set the stream
      this.microphoneProcessing = new MicrophoneProcessor(stream);
      this.peerManager.connectRtc(stream);
      this.micStream = stream;
    };

    // on fail
    deviceLoader.errorCallback = (error) => {
      // reset the prefered mic, if we had one
      if (error.name === 'OverconstrainedError' || error instanceof OverconstrainedError || getGlobalState().settings.preferredMicId) {
        setGlobalState({ settings: { preferredMicId: null } });
        // try again
        this.startVoiceChat();
        toast.error('Preferred microphone not available, trying to use default microphone instead.');
        return;
      }

      // hide error popup
      setGlobalState({ loadingOverlay: { visible: false } });

      let stringifiedError = '<unknown>';
      // is it just a string?
      if (typeof error === 'string') {
        stringifiedError = error;
      } else {
        stringifiedError = StringifyError(error);
      }

      toast.error(`${getTranslation(null, 'vc.micErrorPopup')} ${stringifiedError}`, { autoClose: false });
    };

    deviceLoader.getUserMedia(getGlobalState().settings.preferredMicId);
  }

  onSurroundUpdate() {
    SocketManager.send(PluginChannel.RTC_READY, { enabled: false });

    setGlobalState({
      loadingOverlay: {
        visible: true,
        title: getTranslation(null, 'vc.reloadingPopupTitle'),
        message: getTranslation(null, 'vc.reloadingPopup'),
      },
      voiceState: {
        peers: [],
      },
    });

    setTimeout(() => {
      // hide the loading popup
      setGlobalState({ loadingOverlay: { visible: false } });
      SocketManager.send(PluginChannel.RTC_READY, { enabled: true });
    }, 2000);
  }

  panic() {
    setGlobalState({
      loadingOverlay: {
        visible: false,
      },
      voiceState: {
        enabled: false,
      },
    });
    toast.error('Voice chat has crashed, please reload the page to try again. Feel free to contact support if this keeps happening, as you might have a permission issue.', { autoClose: false });
  }

  isReady() {
    return getGlobalState().voiceState.ready;
  }

  showLoadingPopup() {
    setGlobalState({
      loadingOverlay: {
        visible: true,
        title: getTranslation(null, 'vc.startingPopupTitle'),
        message: getTranslation(null, 'vc.startingPopup'),
      },
    });
  }

  pushSocketEvent(event) {
    if (this.peerManager != null) {
      SocketManager.send(PluginChannel.RTC_READY, { event });
    }
  }

  changeInput() {
    if (this.peerManager) this.peerManager.setMute(false);
    if (this.peerManager) this.peerManager.stop();
    if (this.microphoneProcessing) this.microphoneProcessing.stop();
    SocketManager.send(PluginChannel.RTC_READY, { enabled: false });

    setGlobalState({
      loadingOverlay: {
        visible: true,
        title: getTranslation(null, 'vc.updatingMicPopupTitle'),
        message: getTranslation(null, 'vc.updatingMicPopup'),
      },
      voiceState: {
        peers: [],
      },
    });

    this.isUpdatingMic = true;
    this.peerManager = new PeerManager();
    setTimeout(() => {
      this.isUpdatingMic = false;
      this.startVoiceChat();
    }, 3500);
  }

  addPeer(playerUuid, playerName, playerStreamKey, location) {
    this.peerMap.set(playerStreamKey, new VoicePeer(playerName, playerUuid, playerStreamKey, location));
    feedDebugValue(DebugStatistic.VOICE_PEERS, this.peerMap.size);
  }

  peerLocationUpdate(playerStreamKey, x, y, z) {
    const peer = this.peerMap.get(playerStreamKey);
    if (peer) peer.updateLocation(x, y, z);
  }

  getPeerLocations() {
    const locations = [];
    // eslint-disable-next-line no-unused-vars,no-restricted-syntax
    for (const [_, peer] of this.peerMap) {
      if (peer.stream) {
        locations.push({
          x: peer.stream.x,
          y: peer.stream.y,
          z: peer.stream.z,
        });
      }
    }
    return locations;
  }

  removePeer(playerStreamKey) {
    const peer = this.peerMap.get(playerStreamKey);
    if (peer) {
      peer.stop();
      this.peerMap.delete(playerStreamKey);
    }
    feedDebugValue(DebugStatistic.VOICE_PEERS, this.peerMap.size);
  }

  removeAllPeers() {
    this.peerMap.forEach((peer, key) => {
      this.removePeer(key);
    });
  }

  shutdown() {
    if (this.peerManager) {
      this.peerManager.stop();
    }

    if (this.microphoneProcessing) {
      this.microphoneProcessing.stop();
    }

    if (this.micStream) {
      this.micStream.getTracks().forEach((track) => track.stop());
      // close the mic stream
    }

    this.removeAllPeers();
  }
}();

export const VoiceStatusChangeEvent = {
  MIC_MUTE: 'MICROPHONE_MUTED',
  MIC_UNMTE: 'MICROPHONE_UNMUTE',
};
