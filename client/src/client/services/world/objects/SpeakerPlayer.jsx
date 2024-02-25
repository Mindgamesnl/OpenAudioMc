import { Channel } from '../../media/objects/Channel';
import { Sound } from '../../media/objects/Sound';
import { SPEAKER_2D } from '../constants/SpeakerType';
import { SpeakerRenderNode } from './SpeakerRenderNode';
import { MediaManager } from '../../media/MediaManager';
import { debugLog } from '../../debugging/DebugService';

/* eslint-disable no-console */

export class SpeakerPlayer {
  constructor(source, startInstant, doLoop = true, doPickup = true, cancelRegions = false) {
    this.id = `SPEAKER__${source}`;

    this.speakerNodes = new Map();
    this.source = source;
    this.startInstant = startInstant;
    this.doLoop = doLoop;
    this.doPickup = doPickup;
    this.cancelRegions = cancelRegions;

    debugLog('Speaker props: ', this.id, this.source, this.startInstant, this.doLoop, this.doPickup, this.cancelRegions, 'initialized: ', this.initialized);

    this.initialized = false;
    this.whenInitialized = [];
  }

  async initializeSpeaker() {
    const createdChannel = new Channel(this.id);
    createdChannel.trackable = true;
    createdChannel.setTag('SPEAKER');
    createdChannel.setTag(this.id);
    this.channel = createdChannel;

    const createdMedia = new Sound(this.source);
    this.media = createdMedia;
    this.media.withCors();

    if (this.cancelRegions) {
      MediaManager.mixer.incrementInhibitor('REGION');
    }

    MediaManager.mixer.whenFinished(this.id, () => {
      // undo inhibit
      if (this.cancelRegions) {
        debugLog('Decrementing region inhibit from speaker');
        MediaManager.mixer.decrementInhibitor('REGION');
      }
    });

    createdChannel.mixer = MediaManager.mixer;
    createdChannel.addSound(createdMedia);
    MediaManager.mixer.addChannel(createdChannel);

    await createdMedia.load(this.source);

    createdMedia.whenInitialized(() => {
      createdChannel.setChannelVolume(100);
      createdMedia.setLooping(this.doLoop);
      if (this.doPickup) {
        createdMedia.startDate(this.startInstant, true);
      }
      MediaManager.mixer.updateCurrent();

      createdMedia.finish();
    });

    await createdMedia.finalize();

    this.initialized = true;
  }

  removeSpeakerLocation(id) {
    const node = this.speakerNodes.get(id);
    if (node != null) {
      node.preDelete();
      this.speakerNodes.delete(id);
    }
  }

  updateLocation(closest, world, player) {
    if (closest.type === SPEAKER_2D) {
      this.media.load(this.source, true);
      const distance = closest.getDistance(world, player);
      const volume = this.convertDistanceToVolume(closest.maxDistance, distance);
      if (volume <= 0) {
        // assuming the range got updated so skipping it
        return;
      }
      this.channel.fadeChannel(volume, 100);
    } else if (!this.speakerNodes.has(closest.id)) {
      this.speakerNodes.set(closest.id, new SpeakerRenderNode(closest, world, player, this.media, this.source, this.channel));
    }
  }

  convertDistanceToVolume(maxDistance, currentDistance) {
    return Math.round(((maxDistance - currentDistance) / maxDistance) * 100);
  }

  remove() {
    if (!this.media.loaded) {
      console.log(`WARNING! wanted to stop ${this.id} but it isn't loaded yet`);
    }
    MediaManager.destroySounds(this.id, false, false, 500, () => {
      // check if it actually cleared, and if not, we should do it ourself
      if (!this.media.destroyed) {
        console.log('Failed to destroy a world sound, so I had to do it again.');
        this.media.destroy();
      }
    });
  }
}
