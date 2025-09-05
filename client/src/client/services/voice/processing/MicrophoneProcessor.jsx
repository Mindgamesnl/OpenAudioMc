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

    // New properties for improved sensitivity system
    this.volumeBuffer = [];
    this.bufferSize = 200; // Keep last 200 volume samples
    this.noiseFloor = -60; // Initial noise floor estimate
    this.speechLevel = -30; // Initial speech level estimate
    this.adaptiveOffset = 12; // dB offset above noise floor for threshold
    this.manualSensitivity = 50; // 0-100 scale for manual control

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
      threshold: -45, // Better default threshold
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

    this.harkEvents.on('volume_change', (volume) => {
      // Force speaking state if volume is consistently high
      if (volume > this.harkEvents.getThreshold() + 10 && !this.isSpeaking) {
        clearTimeout(speakingTimeout);
        this.handleSpeakingStart();
      }
    });

    let volumeChangeI = 0;

    this.harkEvents.on('volume_change', (volume) => {
      if (this.destroyed) return;

      volumeChangeI++;

      // Add volume to buffer for analysis
      this.volumeBuffer.push(volume);
      if (this.volumeBuffer.length > this.bufferSize) {
        this.volumeBuffer.shift();
      }

      // Update noise floor and speech level estimates
      this.updateNoiseAndSpeechLevels();

      // Calculate normalized volume for UI (0-100 scale)
      const normalizedVolume = this.calculateNormalizedVolume(volume);

      // Update threshold if in auto mode
      if (getGlobalState().settings.automaticSensitivity) {
        this.updateAdaptiveThreshold();
      }

      if (volumeChangeI > 100) {
        feedDebugValue(DebugStatistic.MICROPHONE_LOUDNESS, normalizedVolume);
        volumeChangeI = 0;
      }

      // Pass normalized volume, speaking state, current threshold, and noise floor to listeners
      invokeMicVolumeListeners(normalizedVolume, this.isSpeaking, this.harkEvents.getThreshold(), this.noiseFloor);
    });
  }

  updateNoiseAndSpeechLevels() {
    if (this.volumeBuffer.length < 50) return; // Need some data first

    // Sort buffer to find percentiles
    const sorted = [...this.volumeBuffer].sort((a, b) => a - b);

    // Noise floor: 10th percentile (low volumes)
    this.noiseFloor = sorted[Math.floor(sorted.length * 0.1)];

    // Speech level: 90th percentile (high volumes)
    this.speechLevel = sorted[Math.floor(sorted.length * 0.9)];

    // Ensure reasonable bounds
    this.noiseFloor = Math.max(this.noiseFloor, -80);
    this.noiseFloor = Math.min(this.noiseFloor, -20);
    this.speechLevel = Math.max(this.speechLevel, this.noiseFloor + 10);
  }

  calculateNormalizedVolume(currentVolume) {
    // Normalize volume to 0-100 scale based on noise floor and speech level
    if (this.speechLevel <= this.noiseFloor) {
      return currentVolume > this.noiseFloor ? 100 : 0;
    }

    const range = this.speechLevel - this.noiseFloor;
    const normalized = ((currentVolume - this.noiseFloor) / range) * 100;
    return Math.max(0, Math.min(100, normalized));
  }

  updateAdaptiveThreshold() {
    // Set threshold as noise floor + adaptive offset
    const newThreshold = this.noiseFloor + this.adaptiveOffset;

    // Smooth the threshold changes to avoid jitter
    const currentThreshold = this.harkEvents.getThreshold();
    const smoothedThreshold = currentThreshold * 0.9 + newThreshold * 0.1;

    this.harkEvents.setThreshold(smoothedThreshold);

    // Update stored sensitivity value for consistency
    const sensitivityValue = Math.abs(smoothedThreshold);
    setGlobalState({ settings: { microphoneSensitivity: sensitivityValue } });
  }

  setupGainController() {
    this.gainController = new GainController(this.stream);
    this.gainController.on();
  }

  setupStateManagement() {
    let lastMonitoringState = false;
    let lastSensitivityValue = null;
    let lastAutoMode = null;
    let lastStateMuted = false;

    const onSettingsChange = () => {
      if (this.destroyed) return;

      const { settings } = store.getState();

      if (settings.voicechatMonitoringEnabled !== lastMonitoringState && this.monitoringReady) {
        lastMonitoringState = settings.voicechatMonitoringEnabled;
        this.enableMonitoringCheckbox(lastMonitoringState);
      }

      // Handle sensitivity changes, but only in manual mode
      const currentAutoMode = settings.automaticSensitivity;
      if (currentAutoMode !== lastAutoMode) {
        lastAutoMode = currentAutoMode;
        if (currentAutoMode) {
          // Switched to auto mode - start adaptive threshold
          this.updateAdaptiveThreshold();
        } else {
          // Switched to manual mode - apply stored sensitivity
          this.updateSensitivity(settings.microphoneSensitivity || 50);
        }
      } else if (!currentAutoMode && settings.microphoneSensitivity !== lastSensitivityValue) {
        // Manual mode and sensitivity changed
        lastSensitivityValue = settings.microphoneSensitivity;
        this.updateSensitivity(lastSensitivityValue);
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

      // For very long sessions (>30 seconds), slightly decrease sensitivity
      // This helps if background noise is causing continuous triggering
      if (secondsTalked > 30) {
        this.longSessions++;
        if (this.longSessions > 2) {
          this.decreaseSensitivity();
          this.longSessions = 0;
          this.startedTalking = Date.now();
        }
      }
    }, 1000); // Check less frequently
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

  updateSensitivity(sensitivityValue) {
    // sensitivityValue is now 0-100, where 0 is most sensitive, 100 is least sensitive
    this.manualSensitivity = sensitivityValue;

    // Map 0-100 to threshold range (e.g., -20 to -70 dB)
    const minThreshold = -20; // Most sensitive (easiest to trigger)
    const maxThreshold = -70; // Least sensitive (hardest to trigger)

    const threshold = maxThreshold + ((minThreshold - maxThreshold) * (sensitivityValue / 100));

    this.harkEvents.setThreshold(threshold);
    this.currentThreshold = this.harkEvents.getThreshold();

    setGlobalState({ settings: { microphoneSensitivity: sensitivityValue } });
  }

  decreaseSensitivity() {
    if (!getGlobalState().settings.automaticSensitivity) return;

    // For short triggers, increase offset (make less sensitive)
    this.adaptiveOffset = Math.min(this.adaptiveOffset + 2, 30);
    this.updateAdaptiveThreshold();
  }

  increaseSensitivity() {
    if (!getGlobalState().settings.automaticSensitivity) return;

    // For cases where we might need to be more sensitive
    this.adaptiveOffset = Math.max(this.adaptiveOffset - 1, 5);
    this.updateAdaptiveThreshold();
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
    const { settings } = getGlobalState();
    const autoMode = settings.automaticSensitivity;

    if (autoMode) {
      // In auto mode, start with default threshold
      this.harkEvents.setThreshold(-50);
    } else {
      // In manual mode, use stored sensitivity value (0-100 scale)
      const sensitivity = settings.microphoneSensitivity || 50;
      this.updateSensitivity(sensitivity);
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
