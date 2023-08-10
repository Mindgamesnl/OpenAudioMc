import { trackVoiceGainNode, untrackVoiceGainNode, VoiceModule } from '../VoiceModule';
import { WorldModule } from '../../world/WorldModule';
import { getGlobalState, setGlobalState } from '../../../../state/store';
import { applyPannerSettings, untrackPanner } from '../../../../views/client/pages/settings/SettingsPage';
import { Position } from '../../../util/math/Position';
import { Vector3 } from '../../../util/math/Vector3';
import { Hark } from '../../../util/hark';
import { ConnectionClosedError } from '../errors/ConnectionClosedError';

export class PeerStream {
  constructor(peerStreamKey, volume) {
    this.peerStreamKey = peerStreamKey;
    this.volume = volume;
    this.volBooster = 1.5;
    this.harkEvents = null;
    this.pannerId = null;
    this.globalVolumeNodeId = null;
    this.useSpatialAudio = getGlobalState().settings.voicechatSurroundSound;
    this.pannerNode = null;

    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.masterOutputNode = null;
    this.mediaStream = null;
  }

  // callback has a boolean attached to it, true if the stream loaded, or false if it got rejected
  startStream(callback) {
    // request the stream
    const streamRequest = VoiceModule.peerManager.requestStream(this.peerStreamKey);

    // when the stream is ready, we can start it
    streamRequest.onFinish(async (stream) => {
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
      const source = ctx.createMediaStreamSource(stream);
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

      // spatial audio handling, depends on the settings
      let outputNode = null;

      if (this.useSpatialAudio) {
        this.pannerNode = ctx.createPanner();
        this.pannerId = applyPannerSettings(this.pannerNode);
        this.setLocation(this.x, this.y, this.z, true);
        source.connect(this.gainNode);
        this.gainNode.connect(this.pannerNode);
        outputNode = this.pannerNode;
      } else {
        // just do gain
        source.connect(this.gainNode);
        outputNode = this.gainNode;
      }

      const globalVolumeGainNode = ctx.createGain();
      outputNode.connect(globalVolumeGainNode);
      this.globalVolumeNodeId = trackVoiceGainNode(globalVolumeGainNode);
      this.masterOutputNode = globalVolumeGainNode;
      globalVolumeGainNode.connect(ctx.destination);
      callback(true);
    });

    streamRequest.onReject((e) => {
      callback(false, new ConnectionClosedError(e));
    });
  }

  setLocation(x, y, z, update) {
    // is surround enabled?
    if (!this.useSpatialAudio) return;

    if (update && this.pannerNode !== null) {
      const position = new Position(new Vector3(x, y, z));
      position.applyTo(this.pannerNode);
    }
    this.x = x;
    this.y = y;
    this.z = z;
  }

  setVolume(volume) {
    this.volume = volume;
    if (this.gainNode !== null) {
      this.gainNode.gain.value = (volume / 100) * this.volBooster;
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
