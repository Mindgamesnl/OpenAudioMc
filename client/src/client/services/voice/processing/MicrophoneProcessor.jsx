import GainController from 'mediastream-gain';
import { AudioCableMiddleware } from './AudioCableMiddleware';
import { getGlobalState, setGlobalState, store } from '../../../../state/store';
import { WorldModule } from '../../world/WorldModule';
import { VoiceModule } from '../VoiceModule';
import { RtcPacket } from '../peers/protocol';
import { Hark } from '../../../util/hark';
import { makeid } from '../../../util/random';
import { feedDebugValue } from '../../debugging/DebugService';
import { DebugStatistic } from '../../debugging/DebugStatistic';
import { MagicValues } from '../../../config/MagicValues';

const micVolumeListeners = {};

export function addMicVolumeListener(callback) {
  const id = makeid(10);
  micVolumeListeners[id] = callback;
  return id;
}

export function removeMicVolumeListener(id) {
  delete micVolumeListeners[id];
}

function invokeMicVolumeListeners(volume, isActive, threshold, lowestVolume) {
  Object.values(micVolumeListeners).forEach((callback) => {
    callback(volume, isActive, threshold, lowestVolume);
  });
}

export class MicrophoneProcessor {
  constructor(stream) {
    if (!stream) throw new Error('Stream is required');

    this.stream = stream;
    this.startedTalking = null;
    this.shortTriggers = 0;
    this.isStreaming = false;
    this.isSpeaking = false;
    this.isMuted = false;
    this.destroyed = false;
    this.monitoringReady = false;

    this.micTriggerCount = 0;
    this.micSanityPassed = false;

    this.setupAudioContext();
    this.setupHarkEvents();
    this.setupGainController();

    this.loadDefaults();
    this.monitoringVolume = 100;
    this.longSessions = 0;

    this.setupStateManagement();
    this.setupTrackProcessing();
    this.initializeCheckLoop();

    // refresh loop for when vc is ready
    let wasReady = false;
    this.readyUpdateCheck = setInterval(() => {
      if (VoiceModule.isReady() && !wasReady) {
        wasReady = true;
        clearInterval(this.readyUpdateCheck);

        // check hark, are we talking? then attempt to update the state
        if (this.isSpeaking) {
          this.handleSpeakingStart();
        }
      }
    }, 1000);
  }

  setupAudioContext() {
    const ctx = WorldModule.player.audioCtx;
    if (!ctx) throw new Error('Audio context not initialized');
    this.audioContext = ctx;
  }

  setupHarkEvents() {
    let speakingTimeout;

    this.harkEvents = new Hark(this.stream, {
      audioContext: this.audioContext,
      threshold: -50,
      interval: 25,
      history: 6,
    });

    this.harkEvents.on('speaking', () => {
      if (this.destroyed) return;
      this.handleSpeakingStart();
    });

    this.harkEvents.on('stopped_speaking', () => {
      if (this.destroyed) return;
      this.handleSpeakingStop();
    });

    this.harkEvents.on('volume_change', (volume, threshold) => {
      // Force speaking state if volume is consistently high
      if (volume > threshold + 10 && !this.isSpeaking) {
        clearTimeout(speakingTimeout);
        this.handleSpeakingStart();
      }
    });

    let lowestVolume = 0;
    let volumeChangeI = 0;

    this.harkEvents.on('volume_change', (volume, threshold) => {
      if (this.destroyed) return;

      volumeChangeI++;

      if (volume < lowestVolume && lowestVolume > -Infinity && volume > -Infinity) {
        lowestVolume = volume;
      }

      const normalizedOutput = Math.min(100, 100 - ((volume / lowestVolume) * 100));

      if (volumeChangeI > 100) {
        feedDebugValue(DebugStatistic.MICROPHONE_LOUDNESS, normalizedOutput);
        volumeChangeI = 0;
      }

      invokeMicVolumeListeners(normalizedOutput, this.isSpeaking, threshold, lowestVolume);
    });
  }

  setupGainController() {
    this.gainController = new GainController(this.stream);
    this.gainController.on();
  }

  setupStateManagement() {
    let lastMonitoringState = false;
    this.lastAutoAdjustmentsState = false;
    let lastStateMuted = false;

    const onSettingsChange = () => {
      if (this.destroyed) return;

      const { settings } = store.getState();

      if (settings.voicechatMonitoringEnabled !== lastMonitoringState && this.monitoringReady) {
        lastMonitoringState = settings.voicechatMonitoringEnabled;
        this.enableMonitoringCheckbox(lastMonitoringState);
      }

      if (settings.microphoneSensitivity !== this.lastAutoAdjustmentsState) {
        this.lastAutoAdjustmentsState = settings.microphoneSensitivity;
        this.updateSensitivity(this.lastAutoAdjustmentsState);
      }

      if (settings.voicechatMuted !== lastStateMuted) {
        lastStateMuted = settings.voicechatMuted;
        // eslint-disable-next-line no-unused-expressions
        lastStateMuted ? this.onMute() : this.onUnmute();
      }
    };

    this.unsubscribe = store.subscribe(onSettingsChange);
    onSettingsChange();
  }

  initializeCheckLoop() {
    this.checkLoop = setInterval(() => {
      if (!this.isSpeaking || this.destroyed) return;

      const timeActive = Date.now() - this.startedTalking;
      const secondsTalked = timeActive / 1000;

      if (secondsTalked > 10) {
        this.longSessions++;
        this.startedTalking = Date.now();
      }

      if (this.longSessions > 1) {
        this.decreaseSensitivity();
        this.longSessions = 0;
        this.startedTalking = Date.now();
      }
    }, 500);
  }

  handleSpeakingStart() {
    this.isSpeaking = true;
    this.startedTalking = Date.now();
    this.setMonitoringVolume(this.monitoringVolume);

    if (!this.isMuted) {
      this.startStreaming();
    }
  }

  stop() {
    this.harkEvents.stop();
    clearInterval(this.checkLoop);
    clearInterval(this.readyUpdateCheck);
  }

  handleSpeakingStop() {
    const timeActive = Date.now() - this.startedTalking;
    const secondsTalked = timeActive / 1000;

    if (secondsTalked < 1.5) {
      this.shortTriggers++;
      if (this.shortTriggers > 25) {
        this.decreaseSensitivity();
        this.shortTriggers = 0;
      }
    } else {
      this.shortTriggers = 0;
    }

    this.isSpeaking = false;

    if (!this.isMuted) {
      this.stopStreaming();
    }
  }

  startStreaming() {
    if (this.isStreaming || !VoiceModule.isReady()) return;

    this.isStreaming = true;
    VoiceModule.peerManager.sendMetaData(
      new RtcPacket()
        .setEventName('DISTRIBUTE_RTP')
        .serialize(),
    );

    setGlobalState({ voiceState: { isSpeaking: true } });
    this.updateMicSanityCheck();
    clearTimeout(this.haltRtpTask);
  }

  stopStreaming() {
    if (!this.isStreaming) return;

    this.haltRtpTask = setTimeout(() => {
      if (this.monitoringGainnode) this.monitoringGainnode.gain.value = 0;
      if (!VoiceModule.isReady() || this.destroyed) return;
      if (this.isSpeaking) return;
      this.isStreaming = false;
      VoiceModule.peerManager.sendMetaData(
        new RtcPacket()
          .setEventName('HALT_RTP')
          .serialize(),
      );
      setGlobalState({ voiceState: { isSpeaking: false } });
    }, 500);
  }

  updateMicSanityCheck() {
    this.micTriggerCount++;
    if (this.micTriggerCount >= MagicValues.VOICE_CANT_HEAR_YOU_THRESHOLD) {
      this.micSanityPassed = true;
      setGlobalState({ voiceState: { microphoneTriggeredOnce: true } });
    }
  }

  updateSensitivity(toPositive) {
    const target = -Math.abs(toPositive);
    this.harkEvents.setThreshold(target);
    this.currentThreshold = this.harkEvents.getThreshold();

    this.lastAutoAdjustmentsState = toPositive;
    setGlobalState({ settings: { microphoneSensitivity: toPositive } });
  }

  decreaseSensitivity() {
    if (!getGlobalState().settings.automaticSensitivity) return;
    const current = Math.abs(this.currentThreshold);
    this.updateSensitivity(current - 5);
  }

  onMute() {
    this.isMuted = true;
    if (this.isSpeaking) {
      this.stopStreaming();
    }
  }

  onUnmute() {
    this.isMuted = false;
    if (this.isSpeaking) {
      this.startStreaming();
    }
  }

  loadDefaults() {
    let presetVolume = getGlobalState().settings.microphoneSensitivity;
    if (presetVolume != null) {
      presetVolume = parseInt(presetVolume, 10);
      this.harkEvents.setThreshold(presetVolume);
    }
    this.currentThreshold = this.harkEvents.getThreshold();
    this.isSpeaking = false;
    this.harkEvents.setInterval(50);
  }

  setMonitoringVolume(vol) {
    this.monitoringVolume = vol;
    if (this.monitoringGainnode) {
      this.monitoringGainnode.gain.value = vol / 100;
    }
  }

  setupTrackProcessing() {
    this.monitoringAudio = new Audio();
    this.monitoringAudio.muted = true;
    this.monitoringAudio.autoplay = true;
    this.monitoringAudio.volume = 1;

    this.output = this.audioContext.createMediaStreamDestination();
    this.monitoringAudio.srcObject = this.output.stream;
    this.monitoringGainnode = this.audioContext.createGain();

    this.enableMonitoringCheckbox = (allow) => {
      this.monitoringAudio.muted = !allow;
    };

    const src = this.audioContext.createMediaStreamSource(this.stream);
    const shiftMiddleware = new AudioCableMiddleware();
    shiftMiddleware.link(this.audioContext, src, this.output);

    // eslint-disable-next-line no-console
    this.monitoringAudio.play().catch(console.error);
    this.monitoringReady = true;
  }

  destroy() {
    this.destroyed = true;
    clearInterval(this.checkLoop);
    this.harkEvents.stop();
    this.unsubscribe?.();

    if (this.monitoringAudio) {
      this.monitoringAudio.pause();
      this.monitoringAudio.srcObject = null;
    }

    if (this.gainController) {
      this.gainController.off();
    }

    Object.keys(micVolumeListeners).forEach((key) => {
      delete micVolumeListeners[key];
    });
  }
}
