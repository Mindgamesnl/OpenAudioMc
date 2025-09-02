import React from 'react';
import { connect } from 'react-redux';
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
      <div className="absolute inset-0">
        {/* Invisible circular slider overlay */}
        <input
          onChange={this.onInput}
          value={this.props.volume}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
          type="range"
          min="0"
          max="100"
          step="1"
          style={{
            background: 'transparent',
          }}
        />
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
