// Updated PeerStream.js
import { trackVoiceGainNode, untrackVoiceGainNode, VoiceModule } from '../VoiceModule';
import { WorldModule } from '../../world/WorldModule';
import { getGlobalState, setGlobalState } from '../../../../state/store';
import { Hark } from '../../../util/hark';
import { ConnectionClosedError } from '../errors/ConnectionClosedError';
import {
  CustomSpatialRenderer,
  applySpatialRendererSettings,
  untrackSpatialRenderer,
} from '../../rendering/CustomSpatialRenderer';

export class PeerStream {
  constructor(peerStreamKey, volume, useSpatialAudio) {
    this.peerStreamKey = peerStreamKey;
    this.volume = volume;
    this.volBooster = 1.5;
    this.harkEvents = null;
    this.spatialRendererId = null;
    this.globalVolumeNodeId = null;
    this.useSpatialAudio = useSpatialAudio;
    this.spatialRenderer = null;

    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.masterOutputNode = null;
    this.mediaStream = null;
    this.listenerDeafend = false;
  }

  // callback has a boolean attached to it, true if the stream loaded, or false if it got rejected
  startStream(callback) {
    // request the stream
    const streamRequest = VoiceModule.peerManager.requestStream(this.peerStreamKey);

    const streamReadyHandler = async (stream) => {
      this.audio_elem = new Audio();
      this.audio_elem.autoplay = true;
      this.audio_elem.muted = true;
      this.audio_elem.srcObject = stream;

      // player context
      const ctx = WorldModule.player.audioCtx;
      this.gainNode = ctx.createGain();
      this.setVolume(this.volume);
      this.gainNode.gain.value = (this.volume / 100) * this.volBooster;

      // Workaround for the Chrome bug
      await this.audio_elem.play();
      this.sourceNode = ctx.createMediaStreamSource(stream);
      this.mediaStream = stream;

      // speaking indicator
      this.harkEvents = new Hark(stream);
      this.harkEvents.setThreshold(-75);
      this.harkEvents.on('speaking', () => {
        setGlobalState({ voiceState: { peers: { [this.peerStreamKey]: { speaking: true } } } });
      });

      this.harkEvents.on('stopped_speaking', () => {
        setGlobalState({ voiceState: { peers: { [this.peerStreamKey]: { speaking: false } } } });
      });

      this.globalSink = ctx.createGain();
      this.globalVolumeNodeId = trackVoiceGainNode(this.globalSink);
      this.globalSink.connect(ctx.destination);

      this.updateSpatialAudioSettings();

      // mute if voicechat is deafened
      if (getGlobalState().settings.voicechatDeafened) {
        this.listenerDeafend = true;
        // update vol
        this.setVolume(this.volume);
      }

      callback(true);
    };

    // bind context
    streamRequest.onFinish(streamReadyHandler.bind(this));

    streamRequest.onReject((e) => {
      callback(false, new ConnectionClosedError(e));
    });
  }

  updateSpatialAudioSettings() {
    const ctx = WorldModule.player.audioCtx;

    // reset source node
    if (this.sourceNode !== null) {
      this.sourceNode.disconnect();
    }

    // Remove existing spatial renderer from tracking
    if (this.spatialRendererId !== null) {
      untrackSpatialRenderer(this.spatialRendererId);
    }

    // Disconnect and remove existing spatial renderer
    if (this.spatialRenderer !== null) {
      this.spatialRenderer.disconnect();
      this.spatialRenderer = null;
    }

    // Create new spatial audio components based on the updated settings
    if (this.useSpatialAudio) {
      // Create new spatial renderer with max distance from global state
      this.spatialRenderer = new CustomSpatialRenderer(
        ctx,
        getGlobalState().voiceState.radius,
      );

      // Apply and track settings for the spatial renderer
      this.spatialRendererId = applySpatialRendererSettings(
        this.spatialRenderer,
        getGlobalState().voiceState.radius,
      );

      // Set the position of the spatial renderer
      this.setLocation(this.x, this.y, this.z, true);

      // Connect the source to the spatial renderer
      this.sourceNode.connect(this.gainNode);
      this.gainNode.disconnect();

      // Connect the gain node to the spatial renderer
      this.spatialRenderer.connect(this.gainNode);

      // Connect the output of the spatial renderer to the global sink
      this.spatialRenderer.connectOutput(this.globalSink);
    } else {
      // If not using spatial audio, reconnect directly to gain node and then to destination
      this.sourceNode.connect(this.gainNode);
      this.gainNode.disconnect();
      this.gainNode.connect(this.globalSink);
    }
  }

  enableSpatialAudio(useSpatialAudio) {
    // Update spatial audio settings
    this.useSpatialAudio = useSpatialAudio;

    // Update the spatial audio settings without recreating the entire stream
    this.updateSpatialAudioSettings();
  }

  setMuteOverride(muted) {
    this.listenerDeafend = muted;
    // update vol
    this.setVolume(this.volume);
  }

  setLocation(x, y, z, update) {
    this.x = x;
    this.y = y;
    this.z = z;

    if (this.useSpatialAudio && this.spatialRenderer && update) {
      this.spatialRenderer.setPosition(x, y, z);
    }
  }

  setVolume(volume) {
    this.volume = volume;
    if (this.gainNode != null) {
      this.gainNode.gain.value = this.listenerDeafend ? 0 : (volume / 100) * this.volBooster;
    }
  }

  stop() {
    if (this.spatialRendererId !== null) {
      untrackSpatialRenderer(this.spatialRendererId);
      untrackVoiceGainNode(this.globalVolumeNodeId);
    }

    // Disconnect all nodes
    if (this.sourceNode) {
      this.sourceNode.disconnect();
    }
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode.gain.value = 0;
    }
    if (this.spatialRenderer) {
      this.spatialRenderer.disconnect();
    }
    if (this.globalSink) {
      this.globalSink.disconnect();
    }

    if (this.audio_elem) {
      this.audio_elem.srcObject = null;
      this.audio_elem.pause();
    }

    if (this.harkEvents !== null) {
      this.harkEvents.stop();
    }
  }
}
