import { trackVoiceGainNode, untrackVoiceGainNode, VoiceModule } from '../VoiceModule';
import { WorldModule } from '../../world/WorldModule';
import { getGlobalState, setGlobalState } from '../../../../state/store';
import { applyPannerSettings, untrackPanner } from '../../../../views/client/pages/settings/SettingsPage';
import { Position } from '../../../util/math/Position';
import { Vector3 } from '../../../util/math/Vector3';
import { Hark } from '../../../util/hark';
import { ConnectionClosedError } from '../errors/ConnectionClosedError';

export class PeerStream {
  constructor(peerStreamKey, volume, useSpatialAudio) {
    this.peerStreamKey = peerStreamKey;
    this.volume = volume;
    this.volBooster = 1.5;
    this.harkEvents = null;
    this.pannerId = null;
    this.globalVolumeNodeId = null;
    this.useSpatialAudio = useSpatialAudio;
    this.pannerNode = null;

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

    // Remove existing panner nodes from tracking
    if (this.pannerId !== null) {
      untrackPanner(this.pannerId);
    }

    // Disconnect and remove existing panner nodes
    if (this.pannerNode !== null) {
      this.pannerNode.disconnect();
      this.pannerNode = null;
    }

    // Create new panner nodes based on the updated spatial audio settings
    if (this.useSpatialAudio) {
      this.pannerNode = ctx.createPanner();
      this.pannerId = applyPannerSettings(
        this.pannerNode,
        getGlobalState().voiceState.radius,
      );
      this.setLocation(this.x, this.y, this.z, true);
      this.gainNode.disconnect();
      this.sourceNode.connect(this.gainNode);
      this.gainNode.connect(this.pannerNode);

      // Connect panner node to global sink
      this.pannerNode.connect(this.globalSink);
    } else {
      // If not using spatial audio, reconnect directly to gain node
      this.sourceNode.connect(this.gainNode);
      this.gainNode.disconnect();
      this.gainNode.connect(ctx.destination);
      // Connect gain node to global sink
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

    if (this.useSpatialAudio && this.pannerNode && update) {
      const position = new Position(new Vector3(x, y, z));
      position.applyTo(this.pannerNode);
    }
  }

  setVolume(volume) {
    this.volume = volume;
    if (this.gainNode !== null) {
      this.gainNode.gain.value = this.listenerDeafend ? 0 : (volume / 100) * this.volBooster;
    }
  }

  stop() {
    if (this.pannerId !== null) {
      untrackPanner(this.pannerId);
      untrackVoiceGainNode(this.globalVolumeNodeId);
    }

    if (this.masterOutputNode !== null) {
      const ctx = WorldModule.player.audioCtx;
      this.masterOutputNode.disconnect(ctx.destination);
    }

    if (this.gainNode) {
      this.gainNode.gain.value = 0;
    }

    if (this.audio_elem) {
      this.audio_elem.pause();
    }

    if (this.harkEvents !== null) {
      this.harkEvents.stop();
    }
  }
}
