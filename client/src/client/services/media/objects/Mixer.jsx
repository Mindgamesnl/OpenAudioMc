import { Channel } from './Channel';
import { Sound } from './Sound';
import { getGlobalState, setGlobalState } from '../../../../state/store';
import { debugLog, feedDebugValue } from '../../debugging/DebugService';
import { DebugStatistic } from '../../debugging/DebugStatistic';

export class Mixer {
  constructor(mixerName) {
    this.mixerName = mixerName;
    this.channels = new Map();
    this.areSoundsPlaying = false;
    this.ambianceSoundMedia = null;
    this.recentSource = '/none';

    // functions mapped with channel-id. Once an id is no longer found in the playing queue, then it will
    // execute the function and remove it from the map
    this.destructionHandlers = {};

    // set with channel tags and scores
    // if scores are over 1, then the channel will be muted
    this.inhibbitors = {};

    // loop over channels and call tick()
    setInterval(() => {
      this.tick();
    }, 250);
  }

  tick(forceInstant = false) {
    this.channels.forEach((channel) => {
      channel.tick();
    });

    // manually tick ambiance sound
    if (this.ambianceSoundMedia != null) {
      this.ambianceSoundMedia.tick();
    }

    // go over all destruction handlers and execute them
    Object.keys(this.destructionHandlers).forEach((key) => {
      // is there still a channel with this id?
      if (this.channels.get(key) != null) return;
      const handler = this.destructionHandlers[key];
      if (handler != null) {
        debugLog(`Executing destruction handler for ${key}`);
        handler();
      }
      delete this.destructionHandlers[key];
    });

    // go over all channels and check if they should be inhibited
    this.channels.forEach((channel) => {
      let score = 0;
      channel.tags.forEach((value, tag) => {
        if (this.inhibbitors[tag] != null) {
          score += this.inhibbitors[tag];
        }
      });

      const fade = channel.getPrefferedFadeTime() > 5 && !forceInstant;

      if (score >= 1 && !channel.mutedByScore) {
        channel.mutedByScore = true;
        if (fade) {
          channel.fadeChannel(0, channel.getPrefferedFadeTime());
        } else {
          channel.setChannelVolume(0);
        }
      } else if (score === 0 && channel.mutedByScore) {
        channel.mutedByScore = false;
        if (fade) {
          channel.fadeChannel(channel.getOriginalVolume(), channel.getPrefferedFadeTime());
        } else {
          channel.setChannelVolume(channel.getOriginalVolume());
        }
      }
    });
  }

  incrementInhibitor(tag) {
    if (this.inhibbitors[tag] == null) {
      this.inhibbitors[tag] = 0;
    }
    this.inhibbitors[tag] += 1;
  }

  decrementInhibitor(tag) {
    if (this.inhibbitors[tag] == null) {
      this.inhibbitors[tag] = 0;
    }
    this.inhibbitors[tag] -= 1;
  }

  whenFinished(channelId, handler) {
    this.destructionHandlers[channelId] = handler;
  }

  updatePlayingSounds() {
    let foundPlayingSound = false;
    this.channels.forEach((channel) => {
      if (channel.hasSoundPlaying()) {
        foundPlayingSound = true;
      }
    });
    if (foundPlayingSound !== this.areSoundsPlaying) {
      this.playingStateChangeChanged(foundPlayingSound);
      this.areSoundsPlaying = foundPlayingSound;
    }

    feedDebugValue(DebugStatistic.MIXER_CHANNELS, this.channels.size);
  }

  playingStateChangeChanged(isSoundPlaying) {
    setGlobalState({
      hasPlayingMedia: isSoundPlaying,
    });
    if (this.ambianceSoundMedia == null) return;
    if (!isSoundPlaying) {
      // start
      this.ambianceSoundMedia.fadeChannel(getGlobalState().settings.normalVolume, 800, () => {});
    } else {
      // stop
      this.ambianceSoundMedia.fadeChannel(0, 800, () => {});
    }
  }

  async setupAmbianceSound(source) {
    // create media
    const channel = new Channel('ambiance-from-account');
    const ambianceMedia = new Sound();
    await ambianceMedia.load(source);
    channel.addSound(ambianceMedia);
    ambianceMedia.setLooping(true);
    ambianceMedia.setVolume(0);
    ambianceMedia.finalize().then(() => {
      ambianceMedia.finish();
    });
    channel.mixer = {};
    this.ambianceSoundMedia = channel;
    this.ambianceSoundMedia.mixer = {};
    this.ambianceSoundMedia.setChannelVolume(0);
    this.ambianceSoundMedia.updateFromMasterVolume();

    setTimeout(() => {
      this.updatePlayingSounds();
    }, 1000);
  }

  updateCurrent() {
    const current = [];
    this.channels.forEach((channel, key) => {
      const tags = [];
      channel.tags.forEach((value, tag) => {
        tags.push(tag);
      });

      if (channel.trackable) {
        current.push({
          name: key,
          tags,
        });
      }
    });

    // TODO: fix
    // TODO: Actually do this some day, has been on TODO for al ong while now, idiot
    // TODO: https://github.com/users/Mindgamesnl/projects/1#card-42495990
    // this.openAudioMc.socketModule.send(PluginChannel.CHANNELS_UPDATED, {
    //     "tracks": current
    // });
    this.updatePlayingSounds();
  }

  bumpVolumeChange() {
    this.channels.forEach((channel) => {
      channel.updateFromMasterVolume();
    });

    if (this.ambianceSoundMedia != null) {
      this.ambianceSoundMedia.updateFromMasterVolume();
    }
  }

  removeChannel(channelName) {
    let channel;
    if (channelName instanceof Channel) {
      channel = channelName;
    } else {
      channel = this.channels.get(channelName);
    }

    if (channel != null) {
      channel.destroy();
      this.channels.delete(channel.channelName);
      debugLog(`Removing channel ${channel.channelName}`);
    }
    this.updatePlayingSounds();
  }

  getChannels() {
    // return immutable copy as boxed, to still provide utils such as forEach
    // which is fine, because channels should never be modified outside of this class
    return Array.from(this.channels.values());
  }

  addChannel(channel) {
    // eslint-disable-next-line no-console
    console.warn(`Adding channel ${channel.channelName}`);
    if (channel instanceof Channel) {
      const channelId = channel.channelName;
      const existingChannel = this.channels.get(channelId);
      if (existingChannel != null) {
        existingChannel.destroy();
      }
      channel.registerMixer(this);
      this.channels.set(channelId, channel);

      // wait for it to fetch before updating debug data
      setTimeout(() => {
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const x in channel.sounds) {
          this.recentSource = channel.sounds[x].rawSource;
        }
      }, 1000);
    } else {
      throw new Error("Argument isn't a channel");
    }
    this.updatePlayingSounds();
    // eslint-disable-next-line no-console
    console.warn(`Added channel ${channel.channelName}`);
  }
}
