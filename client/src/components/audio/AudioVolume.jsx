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
      <div className="flex justify-center">
        <div className="flex overflow-hidden w-3/4 pt-4">
          <div className="pt-2 pb-8 relative z-10 lg:w-full">
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
              <div className="sm:text-center lg:text-left">
                <h1 className="font-extrabold tracking-tighter pb-4 text-5xl">
                  {msg('home.audioControls')}
                </h1>
                <p
                  className="text-base sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl lg:mx-0"
                  dangerouslySetInnerHTML={{ __html: msg('home.volumeContext') }}
                />
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <form className="w-11/12">
                    <label
                      className="uppercase font-bold text-lg"
                      htmlFor="volume-slider"
                    >
                      Audio
                      Volume:
                      {' '}
                      {this.props.volume}
                      %
                      <span className="float-right text-green-400 font-normal">{this.props.hasPlayingMedia ? getTranslation(null, 'navbar.isPlaying') : null}</span>
                    </label>
                    <div className="pt-1">
                      <input
                        onChange={this.onInput}
                        value={this.props.volume}
                        className="rounded-lg overflow-hidden appearance-none bg-gray-200 h-4 w-full main-vol-slider common-rounded"
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                      />
                    </div>
                  </form>
                </div>
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
