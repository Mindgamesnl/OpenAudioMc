import React from 'react';
import { connect } from 'react-redux';
import { getTranslation, msg } from '../../client/OpenAudioAppContainer';
import { setGlobalState } from '../../state/store';
import './audiovolume.css';

class AudioVolume extends React.Component {
  constructor(props) {
    super(props);
    this.onInput = this.onInput.bind(this);
  }

  onInput(element) {
    // update state
    setGlobalState({ settings: { normalVolume: element.target.value } });
  }

  render() {
    return (
      <div className="space-y-6">
        {/* Title Section */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            {msg('home.audioControls')}
          </h1>
          <p
            className="text-lg text-gray-300 leading-relaxed max-w-2xl"
            dangerouslySetInnerHTML={{ __html: msg('home.volumeContext') }}
          />
        </div>

        {/* Volume Control Section */}
        <div className="bg-black bg-opacity-30 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-10">
          <div className="space-y-4">
            {/* Volume Label and Status */}
            <div className="flex justify-between items-center">
              <label
                className="text-lg font-semibold text-white tracking-wide"
                htmlFor="volume-slider"
              >
                Audio Volume:
                {' '}
                <span className="text-2xl font-bold text-white">
                  {this.props.volume}
                  %
                </span>
              </label>
              {this.props.hasPlayingMedia ? (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 font-medium text-sm">
                    {getTranslation(null, 'navbar.isPlaying')}
                  </span>
                </div>
              ) : null}
            </div>

            {/* Modern Volume Slider */}
            <div className="relative">
              <input
                onChange={this.onInput}
                value={this.props.volume}
                className="w-full h-3 rounded-full appearance-none bg-gray-700 bg-opacity-50 backdrop-blur-sm main-vol-slider common-rounded cursor-pointer transition-all duration-300 hover:bg-opacity-70"
                type="range"
                min="0"
                max="100"
                step="1"
                id="volume-slider"
                style={{
                  '--slider-percentage': `${this.props.volume}%`,
                }}
              />
              {/* Volume level indicator */}
              <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AudioVolume);

function mapStateToProps(state) {
  return {
    volume: state.settings.normalVolume,
    settings: state.settings,
    hasPlayingMedia: state.hasPlayingMedia,
  };
}
