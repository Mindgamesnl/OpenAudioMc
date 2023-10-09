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

    // loop over channels and call tick()
    setInterval(() => {
      this.tick();
    }, 250);
  }

  tick() {
    this.channels.forEach((channel) => {
      channel.tick();
    });

    // manually tick ambiance sound
    if (this.ambianceSoundMedia != null) {
      this.ambianceSoundMedia.tick();
    }
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
    debugLog(`Removing channel ${channelName}`);
    let channel;
    if (channelName instanceof Channel) {
      channel = channelName;
    } else {
      channel = this.channels.get(channelName);
    }

    if (channel != null) {
      channel.destroy();
      this.channels.delete(channel.channelName);
    }
    this.updatePlayingSounds();
  }

  getChannels() {
    // return immutable copy as boxed, to still provide utils such as forEach
    // which is fine, because channels should never be modified outside of this class
    return Array.from(this.channels.values());
  }

  addChannel(channel) {
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
  }
}
