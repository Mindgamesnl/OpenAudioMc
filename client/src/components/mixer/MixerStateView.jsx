import React from 'react';
import { OaStyleCard } from '../card/OaStyleCard';
import { MediaManager } from '../../client/services/media/MediaManager';

import './mixerstateview.css';

export default class MixerStateView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [],
      loop: -1,
    };
  }

  componentDidMount() {
    this.setState({
      loop: setInterval(() => {
        this.setState({
          channels: Array.from(MediaManager.mixer.getChannels()),
        });
      }, 500),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.loop);
  }

  onlyFileName(path) {
    if (path == null) return 'null';
    return path.split('/').pop().split('.').shift();
  }

  render() {
    if (this.state.channels.length === 0) return (<OaStyleCard title="Mixer State" width="2">No channels</OaStyleCard>);

    const channels = this.state.channels.map((channel, index) => (
      <li key={index}>
        <h1 className="text-black">{channel.channelName}</h1>
        <ul>
          Tags:
          {JSON.stringify(channel.tags)}
        </ul>
        <ul>
          Volume:
          {channel.channelVolume}
        </ul>
        <ul className="list-disc">
          <h1>Sounds:</h1>
          {channel.sounds.map((sound, sIndex) => (
            <li key={sIndex}>
              <h2>
                <i>
                  Sound
                  {sIndex}
                </i>
              </h2>
              <ul>
                <li>
                  <b>Loop</b>
                  :
                  {' '}
                  {String(sound.loop)}
                </li>
                <li>
                  <b>Source</b>
                  :
                  {' '}
                  {this.onlyFileName(sound.rawSource)}
                </li>
                <li>
                  <b>Loaded</b>
                  :
                  {' '}
                  {String(sound.loaded)}
                </li>
                <li>
                  <b>Started Loading</b>
                  :
                  {' '}
                  {String(sound.startedLoading)}
                </li>
                <li>
                  <b>Had Error</b>
                  :
                  {' '}
                  {String(sound.hadError)}
                </li>
                <li>
                  <b>Trackable</b>
                  :
                  {' '}
                  {String(sound.trackable)}
                </li>
                <li>
                  <b>Is Destroyed</b>
                  :
                  {' '}
                  {String(sound.destroyed)}
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </li>
    ));

    return (
      <OaStyleCard title="Mixer State" width="2">
        <ul className="list-disc text-black">
          {channels}
        </ul>
      </OaStyleCard>
    );
  }
}
