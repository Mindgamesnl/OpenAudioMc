import { Player } from './objects/Player';
import { SpeakerRenderFrame } from './objects/SpeakerRenderFrame';
import { SpeakerPlayer } from './objects/SpeakerPlayer';
import { SPEAKER_2D } from './constants/SpeakerType';
import { Vector3 } from '../../util/math/Vector3';

export const WorldModule = new class IWorldModule {
  constructor() {
    this.speakers = new Map();
    this.audioMap = new Map();
    this.player = null;
  }

  initPlayer() {
    this.player = new Player(this, new Vector3(0, 0, 0), 0, 0);
  }

  getSpeakerById(id) {
    return this.speakers.get(id);
  }

  addSpeaker(id, speakerData) {
    this.speakers.set(id, speakerData);
    this.renderAudio2D();
  }

  removeSpeaker(id) {
    // eslint-disable-next-line no-unused-vars,no-restricted-syntax
    for (const [_, player] of this.audioMap) {
      player.removeSpeakerLocation(id);
    }

    this.speakers.delete(id);
    // wait a bit before running cleanup
    setTimeout(() => {
      this.renderAudio2D();
    }, 600);
  }

  getSpeakerLocations() {
    const locations = [];
    this.speakers.forEach((speaker) => {
      locations.push(speaker.location);
    });
    return locations;
  }

  async getMediaForSource(source, startInstant, doLoop = true, doPickup = true) {
    const loaded = this.audioMap.get(source);
    if (loaded != null) return loaded;

    // dont create if we dont know about the fuckery
    if (startInstant == null) {
      return null;
    }

    const created = new SpeakerPlayer(source, startInstant, doLoop, doPickup);
    this.audioMap.set(source, created);
    await created.initialize();
    return created;
  }

  async removeMediaFromSource(source) {
    const found = await this.getMediaForSource(source);
    if (found == null) {
      return;
    }

    found.remove();
    this.audioMap.delete(source);
  }

  onLocationUpdate() {
    this.renderAudio2D();
  }

  isMediaUsed(source) {
    // eslint-disable-next-line no-restricted-syntax
    for (const value of this.speakers.values()) {
      if (value.source === source) return true;
    }
    return false;
  }

  async renderAudio2D() {
    const frames = [];

    // render all speakers and their frame
    this.speakers.forEach((speaker) => {
      const distance = speaker.getDistance(this, this.player);
      frames.push(new SpeakerRenderFrame(speaker.source, distance, speaker));
    });

    const closestForSources = new Map();
    // eslint-disable-next-line no-restricted-syntax
    for (const frame of frames) {
      const alternative = closestForSources.get(frame.source);
      // set if none
      if (alternative == null) {
        if (frame.speaker.type === SPEAKER_2D) {
          if (frame.distance <= frame.speaker.maxDistance) closestForSources.set(frame.source, frame);
        } else if (frame.distance <= frame.speaker.maxDistance) closestForSources.set(frame.source, [frame]);
        continue;
      }

      // replace if closer
      if (Array.isArray(alternative)) {
        alternative.push(frame);
        closestForSources.set(frame.source, alternative);
      } else if (alternative.distance > frame.distance) {
        if (frame.distance <= frame.speaker.maxDistance) closestForSources.set(frame.source, frame);
      }
    }

    // update closest
    // eslint-disable-next-line no-unused-vars,no-restricted-syntax
    for (const [id, result] of closestForSources) {
      let doFor;
      if (!Array.isArray(result)) {
        doFor = [result];
      } else {
        doFor = result;
      }

      // eslint-disable-next-line no-restricted-syntax
      for (const element of doFor) {
        // eslint-disable-next-line no-await-in-loop
        const media = await this.getMediaForSource(element.source, element.speaker.startInstant, element.speaker.doLoop, element.speaker.doPickup);
        media.updateLocation(element.speaker, this, this.player);
      }
    }

    // check for media that's unused by every speaker
    // eslint-disable-next-line no-restricted-syntax
    for (const [source] of this.audioMap) {
      if (!this.isMediaUsed(source)) {
        this.removeMediaFromSource(source);
      }
    }
  }
}();
