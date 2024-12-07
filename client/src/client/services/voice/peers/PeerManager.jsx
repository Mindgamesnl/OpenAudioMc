/* eslint-disable no-case-declarations */
/* eslint-disable no-console */
import { toast } from 'react-toastify';
import { getGlobalState, setGlobalState, store } from '../../../../state/store';
import { VoiceModule, VoiceStatusChangeEvent } from '../VoiceModule';
import { RtcPacket } from './protocol';
import { playInternalEffect } from '../../media/util';
import { PromisedChannel } from '../data/PromisedChannel';
import { SocketManager } from '../../socket/SocketModule';
import * as PluginChannel from '../../../util/PluginChannel';
import { getTranslation } from '../../../OpenAudioAppContainer';
import { debugLog, feedDebugValue, incrementDebugValue } from '../../debugging/DebugService';
import { DebugStatistic } from '../../debugging/DebugStatistic';
import { MagicValues } from '../../../config/MagicValues';

export class PeerManager {
  constructor() {
    this.peerConnection = null;
    this.dataChannel = null;
    this.lastNegotiationRequest = null;
    this.trackQueue = new Map();
    this.waitingPromises = new Map();
    this.micStream = null;
    this.connectedOnce = false;
    this.isNegotiating = false;
    this.negotiationQueue = [];
    this.messageQueue = [];
    this.reconnectionAttempts = 0;
    this.maxReconnectionAttempts = 3;
    this.connectionTimeout = null;

    this.connectRtc = this.connectRtc.bind(this);
    this.sendMetaData = this.sendMetaData.bind(this);
    this.setMute = this.setMute.bind(this);

    let lastStateMuted = false;
    let lastStateDeafened = false;

    this.unsub = store.subscribe(() => {
      const { settings } = store.getState();
      if (settings.voicechatMuted !== lastStateMuted) {
        lastStateMuted = settings.voicechatMuted;
        this.setMute(lastStateMuted);
      }

      if (settings.voicechatDeafened !== lastStateDeafened) {
        lastStateDeafened = settings.voicechatDeafened;
        this.setDeafened(lastStateDeafened);
      }
    });
  }

  processMessageQueue() {
    if (this.dataChannel?.readyState === 'open') {
      while (this.messageQueue.length > 0) {
        const message = this.messageQueue.shift();
        try {
          this.dataChannel.send(message);
        } catch (error) {
          console.error('Error sending queued message:', error);
          this.messageQueue.unshift(message);
          break;
        }
      }
    }
  }

  sendMetaData(data) {
    if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
      this.messageQueue.push(data);
      return;
    }

    try {
      this.dataChannel.send(data);
    } catch (error) {
      console.error('Error sending metadata:', error);
      this.messageQueue.push(data);
    }
  }

  setDeafened(state) {
    if (state) {
      VoiceModule.pushSocketEvent(VoiceStatusChangeEvent.SELF_DEAFEN);
    } else {
      VoiceModule.pushSocketEvent(VoiceStatusChangeEvent.SELF_UNDEAFEN);
    }

    VoiceModule.peerMap.forEach((peer) => {
      peer.stream.setMuteOverride(state);
    });
  }

  async connectRtc(micStream) {
    this.cleanup();

    const globalState = getGlobalState();
    const { currentUser } = globalState;
    this.micStream = micStream;

    let endpoint = globalState.voiceState.streamServer;
    if (!endpoint.endsWith('/')) {
      endpoint += '/';
    }

    endpoint += 'webrtc/confluence/sdp'
      + `/m/${currentUser.publicServerKey}`
      + `/pu/${currentUser.uuid}`
      + `/pn/${currentUser.userName}`
      + `/sk/${globalState.voiceState.streamKey}`;

    this.peerConnection = new RTCPeerConnection();

    this.setupConnectionHandlers();
    this.setupDataChannel();
    this.listenForTracks();

    this.connectionTimeout = setTimeout(() => {
      if (!this.connectedOnce) {
        this.handleConnectionTimeout();
      }
    }, 10000);

    try {
      const tracks = micStream.getTracks();
      // eslint-disable-next-line no-restricted-syntax
      for (const track of tracks) {
        this.peerConnection.addTrack(track, micStream);
      }

      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);

      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ sdp: btoa(JSON.stringify(this.peerConnection.localDescription)) }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status code ${response.status}`);
      }

      const jr = await response.json();
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(JSON.parse(atob(jr.Sdp))),
      );
    } catch (error) {
      console.error('RTC connection error:', error);
      VoiceModule.panic('There was an error while handling offer exchange', error);
      this.handleConnectionFailure(error);
    }

    setTimeout(() => {
      if (!this.connectedOnce) {
        if (navigator.userAgent.match(/Opera|OPR\//)) {
          toast.error(getTranslation(null, 'vc.operaWarning'), {
            position: 'bottom-right',
            autoClose: 50000,
            theme: 'dark',
          });
          setGlobalState({ browserSupportIsLimited: true });
        }
      }
    }, 5000);
  }

  setupConnectionHandlers() {
    this.peerConnection.oniceconnectionstatechange = () => {
      debugLog(`ICE connection state: ${this.peerConnection.iceConnectionState}`);
      if (this.peerConnection.iceConnectionState === 'connected') {
        this.handleConnectionEstablished();
      } else if (this.peerConnection.iceConnectionState === 'disconnected') {
        this.handleDisconnection();
      } else if (this.peerConnection.iceConnectionState === 'failed') {
        this.handleConnectionFailure();
      }
    };

    this.peerConnection.onconnectionstatechange = () => {
      debugLog(`Connection state: ${this.peerConnection.connectionState}`);
    };
  }

  setupDataChannel() {
    this.dataChannel = this.peerConnection.createDataChannel('eb', {
      ordered: true,
      maxRetransmits: 3,
    });

    this.dataChannel.onopen = () => {
      debugLog('DataChannel opened');
      this.processMessageQueue();
    };

    this.dataChannel.onclose = () => {
      debugLog('DataChannel closed');
    };

    this.dataChannel.onerror = (error) => {
      console.error('DataChannel error:', error);
    };

    this.registerDataChannel(this.dataChannel);
  }

  handleConnectionEstablished() {
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }
    this.reconnectionAttempts = 0;
  }

  handleConnectionTimeout() {
    debugLog('Connection timeout');
    if (this.reconnectionAttempts < this.maxReconnectionAttempts) {
      this.reconnect();
    } else {
      VoiceModule.panic('Failed after multiple attempts, server rejected connection, slot or integrity error');
    }
  }

  handleDisconnection() {
    debugLog('Connection disconnected');
    if (this.reconnectionAttempts < this.maxReconnectionAttempts) {
      this.reconnect();
    }
  }

  handleConnectionFailure(error = null) {
    debugLog('Connection failed:', error);
    if (this.reconnectionAttempts < this.maxReconnectionAttempts) {
      this.reconnect();
    } else {
      VoiceModule.panic('Connection failed after multiple attempts', error);
    }
  }

  async reconnect() {
    debugLog(`Attempting reconnection (attempt ${this.reconnectionAttempts + 1}/${this.maxReconnectionAttempts})`);
    this.reconnectionAttempts++;

    const delay = Math.min(1000 * 2 ** (this.reconnectionAttempts - 1), 10000);
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, delay));

    if (this.micStream) {
      this.connectRtc(this.micStream);
    }
  }

  cleanup() {
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }

    if (this.dataChannel) {
      try {
        this.dataChannel.close();
      } catch (error) {
        console.error('Error closing data channel:', error);
      }
    }

    if (this.peerConnection) {
      try {
        this.peerConnection.close();
      } catch (error) {
        console.error('Error closing peer connection:', error);
      }
    }

    this.messageQueue = [];
    this.negotiationQueue = [];
    this.isNegotiating = false;
  }

  registerDataChannel(dataChannel) {
    dataChannel.addEventListener('message', async (event) => {
      try {
        const message = event.data;
        const rtcPacket = new RtcPacket().fromString(message);
        incrementDebugValue(DebugStatistic.VB_EVENTS);

        switch (rtcPacket.getEventName()) {
          case 'REQUEST_NEG_INIT':
            await this.initializeRenegotiation();
            break;

          case 'NEGOTIATION_RESPONSE':
            const raw = rtcPacket.trimmed();
            const response = JSON.parse(raw);
            try {
              await this.peerConnection.setRemoteDescription(
                new RTCSessionDescription(JSON.parse(atob(response.sdp))),
              );
              this.handleRenagEnd();
              this.dataChannel.send(
                new RtcPacket()
                  .setEventName('CLIENT_CONFIRMED_NEG')
                  .serialize(),
              );
            } catch (error) {
              console.error('Error handling negotiation response:', error);
            }
            break;

          case 'PROCESS_OFFER':
            this.lastNegotiationRequest = performance.now();
            const offer = JSON.parse(rtcPacket.trimmed());
            try {
              await this.peerConnection.setRemoteDescription(
                new RTCSessionDescription(JSON.parse(atob(offer.sdp))),
              );
              const answer = await this.peerConnection.createAnswer();
              let packet = new RtcPacket()
                .setEventName('PROCESS_RESPONSE')
                .serialize();
              packet += btoa(JSON.stringify(answer));
              this.dataChannel.send(packet);
              await this.peerConnection.setLocalDescription(answer);
            } catch (error) {
              VoiceModule.panic('Couldn\'t process offer', error);
            }
            break;

          case 'CONFIRM_NEGOTIATION':
            this.handleRenagEnd();
            break;

          case 'OK':
            this.onStart();
            if (getGlobalState().settings.voicechatChimesEnabled) {
              playInternalEffect('assets/unmute.mp3');
            }
            break;

          case 'REJECT_REQUEST':
            const target = rtcPacket.getParam('owner');
            if (this.waitingPromises.has(target)) {
              this.waitingPromises.get(target).handleError('Request got denied by the server');
              this.waitingPromises.delete(target);
            }
            break;

          case 'CONFIRM_REQUEST':
            this.trackQueue.set(rtcPacket.getParam('streamid'), rtcPacket.getParam('owner'));
            break;

          case 'MIC_STREAM_BLOCKED':
            setGlobalState({ voiceState: { isMutedServerSide: true } });
            break;

          case 'MIC_STREAM_ENABLED':
            setGlobalState({ voiceState: { isMutedServerSide: false } });
            break;

          case 'CONTEXT_EVENT':
            this.contextEvent(rtcPacket);
            break;

          case 'IDENTIFY_SELF':
            const { build } = getGlobalState();
            this.dataChannel.send(
              new RtcPacket()
                .setEventName('VERSION')
                .setParam('build', `${build.build}`)
                .setParam('author', build.compiler)
                .setParam('isProd', `${build.isProd}`)
                .serialize(),
            );
            break;

          default:
            console.warn('Unknown RTC event:', rtcPacket.getEventName());
            break;
        }
      } catch (error) {
        console.error('Error processing data channel message:', error);
      }
    });
  }

  async initializeRenegotiation() {
    try {
      if (this.isNegotiating) {
        this.negotiationQueue.push(() => this.initializeRenegotiation());
        return;
      }

      this.isNegotiating = true;
      this.lastNegotiationRequest = performance.now();

      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);

      let packet = new RtcPacket()
        .setEventName('KICKSTART_RENEG')
        .serialize();
      packet += JSON.stringify({ sdp: btoa(JSON.stringify(this.peerConnection.localDescription)) });

      this.sendMetaData(packet);
    } catch (error) {
      console.error('Negotiation failed:', error);
      VoiceModule.panic('Failed to create offer for renegotiation', error);
    } finally {
      this.isNegotiating = false;
      this.processNegotiationQueue();
    }
  }

  processNegotiationQueue() {
    if (this.negotiationQueue.length > 0 && !this.isNegotiating) {
      const nextNegotiation = this.negotiationQueue.shift();
      nextNegotiation();
    }
  }

  onStart() {
    setGlobalState({
      voiceState: { ready: true, loading: false },
    });

    setTimeout(() => {
      setGlobalState({
        voiceState: { microphoneSanityPrompt: true },
      });
    }, MagicValues.VOICE_CANT_HEAR_YOU_TIMEOUT);

    SocketManager.send(PluginChannel.RTC_READY, { enabled: true });
    this.connectedOnce = true;
  }

  contextEvent(eventPacket) {
    const type = eventPacket.getParam('type');
    const peer = eventPacket.getParam('who');

    if (peer == null) {
      return;
    }

    switch (type) {
      case 'client-muted':
        setGlobalState({ voiceState: { peers: { [peer]: { muted: true } } } });
        break;

      case 'client-unmuted':
        setGlobalState({ voiceState: { peers: { [peer]: { muted: false } } } });
        break;

      default:
        console.warn('Unknown context event:', type);
        break;
    }
  }

  handleRenagEnd() {
    if (this.lastNegotiationRequest != null) {
      const now = performance.now();
      const time = Math.ceil(now - this.lastNegotiationRequest);
      debugLog(`Renegotiation took ${time} MS - ${time > 500 ? 'Warning! Renegotiation took too long!' : ''}`);
    }
  }

  listenForTracks() {
    this.peerConnection.addEventListener('track', (e) => {
      for (let i = 0; i < e.streams.length; i++) {
        if (e.streams[i].id === 'dead-mans-track') {
          return;
        }
        e.track.onended = () => {
          if (this.dataChannel?.readyState === 'open') {
            this.dataChannel.send(new RtcPacket()
              .setEventName('SCHEDULE_RENAG')
              .serialize());
          }
        };
        this.onInternalTrack(e.streams[i], false, e.track);
      }
    });
  }

  onInternalTrack(track, isRetry, mst) {
    const trackid = track.id;
    feedDebugValue(DebugStatistic.CACHED_STREAMS, this.peerConnection.getReceivers().length);

    if (!track.active) {
      return;
    }

    if (!this.trackQueue.has(trackid)) {
      return;
    }

    const owner = this.trackQueue.get(trackid);
    const promise = this.waitingPromises.get(owner);

    if (promise == null) {
      if (!isRetry) {
        setTimeout(() => {
          this.onInternalTrack(track, true, mst);
        }, 1000);
      }
      return;
    }

    promise.handleData(track);
    this.waitingPromises.delete(owner);
    this.trackQueue.delete(trackid);
  }

  dropStream(peerKey) {
    if (!this.dataChannel || this.dataChannel.readyState !== 'open') return;

    this.sendMetaData(new RtcPacket()
      .setEventName('DROP_STREAM')
      .setParam('owner', peerKey)
      .serialize());
  }

  requestStream(peerKey) {
    if (this.dataChannel?.readyState === 'open') {
      const promise = new PromisedChannel();
      this.waitingPromises.set(peerKey, promise);

      this.sendMetaData(new RtcPacket()
        .setEventName('REQUEST_STREAM')
        .setParam('owner', peerKey)
        .serialize());

      return promise;
    }

    const promise = new PromisedChannel();
    promise.handleError(`Connection is ${this.dataChannel?.readyState || 'not initialized'}`);
    return promise;
  }

  getChannelNames() {
    if (!this.peerConnection) {
      return [];
    }
    const names = [];
    this.peerConnection.getTransceivers().forEach((transceiver) => {
      let receiverString = '???';
      if (transceiver.receiver.track) {
        receiverString = `${transceiver.receiver.track.id}/${transceiver.receiver.track.label}`;
      }
      names.push(`${transceiver.direction}|${receiverString}`);
    });
    return names;
  }

  gatherDebugState() {
    return {
      peerConnection: this.peerConnection ? this.peerConnection.connectionState : '(null)',
      dataChannel: this.dataChannel ? this.dataChannel.readyState : '(null)',
      'peers:': VoiceModule.peerMap.size,
      trackQueue: this.trackQueue.size,
      voiceState: getGlobalState().voiceState,
      settings: getGlobalState().settings,
      reconnectionAttempts: this.reconnectionAttempts,
      isNegotiating: this.isNegotiating,
      negotiationQueueLength: this.negotiationQueue.length,
      messageQueueLength: this.messageQueue.length,
    };
  }

  setMute(state) {
    if (!this.micStream) return;

    if (state) {
      if (getGlobalState().settings.voicechatChimesEnabled) {
        playInternalEffect('assets/mute.mp3');
      }
    } else if (getGlobalState().settings.voicechatChimesEnabled) {
      playInternalEffect('assets/unmute.mp3');
    }

    for (let i = 0; i < this.micStream.getAudioTracks().length; i++) {
      this.micStream.getAudioTracks()[i].enabled = !state;
    }

    if (state) {
      VoiceModule.pushSocketEvent(VoiceStatusChangeEvent.MIC_MUTE);
      this.sendMetaData(new RtcPacket()
        .setEventName('CONTEXT_EVENT')
        .setParam('type', 'muted-stream')
        .serialize());
    } else {
      VoiceModule.pushSocketEvent(VoiceStatusChangeEvent.MIC_UNMTE);
      this.sendMetaData(new RtcPacket()
        .setEventName('CONTEXT_EVENT')
        .setParam('type', 'unmuted-stream')
        .serialize());
    }
  }

  stop() {
    this.cleanup();
    if (this.micStream) {
      this.micStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    this.unsub();
  }
}
