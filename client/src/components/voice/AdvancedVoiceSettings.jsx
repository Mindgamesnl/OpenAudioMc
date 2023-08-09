import React from 'react';
import { connect } from 'react-redux';
import { getTranslation } from '../../client/OpenAudioAppContainer';
import { setGlobalState } from '../../state/store';
import {
  addMicVolumeListener,
  removeMicVolumeListener,
} from '../../client/services/voice/processing/MicrophoneProcessor';

class AdvancedVoiceSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listenerId: null,
      isAboveThreshold: false,
      currentMicVolume: 0,
      micMax: 0,
    };

    this.micSensitiveInput = this.micSensitiveInput.bind(this);
    this.micAutoSensitivityInput = this.micAutoSensitivityInput.bind(this);
    this.selectMic = this.selectMic.bind(this);
  }

  componentDidMount() {
    if (!this.state.listenerId) {
      const id = addMicVolumeListener((volume, isActive, threshold, lowestRecorded) => {
        // is volume over the max measured volume?
        let tempMax = this.state.micMax;
        if (volume > this.state.micMax) {
          tempMax = volume;
          this.setState({ micMax: volume });
        }

        // rescale volume to percentage
        let scaled = (volume / tempMax) * 100;

        // scaled might still be over 100, so clamp it
        if (scaled > 100) {
          scaled = 100;
        }
        this.setState({ currentMicVolume: scaled, isAboveThreshold: isActive, lowestRecorded: Math.abs(lowestRecorded) });
      });
      this.setState({ listenerId: id });
    }
  }

  componentWillUnmount() {
    if (this.state.listenerId) {
      removeMicVolumeListener(this.state.listenerId);
    }
  }

  micAutoSensitivityInput(e) {
    setGlobalState({ settings: { automaticSensitivity: e.target.checked } });
  }

  micSensitiveInput(e) {
    setGlobalState({ settings: { microphoneSensitivity: e.target.value } });
  }

  selectMic(e) {
    setGlobalState({ settings: { preferredMicId: e.target.value } });
  }

  render() {
    const mics = Object.values(this.props.voiceState.mics);
    const currentMic = this.props.preferredMicId;

    return (
      <div className="flex w-full flex-wrap md:flex-wrap md:h-full">
        <div className="w-full md:w-2/3 content-card h-full">
          <span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {' '}
              <line
                x1="4"
                y1="21"
                x2="4"
                y2="14"
              />
              {' '}
              <line
                x1="4"
                y1="10"
                x2="4"
                y2="3"
              />
              {' '}
              <line
                x1="12"
                y1="21"
                x2="12"
                y2="12"
              />
              {' '}
              <line x1="12" y1="8" x2="12" y2="3" />
              {' '}
              <line
                x1="20"
                y1="21"
                x2="20"
                y2="16"
              />
              {' '}
              <line
                x1="20"
                y1="12"
                x2="20"
                y2="3"
              />
              {' '}
              <line
                x1="1"
                y1="14"
                x2="7"
                y2="14"
              />
              {' '}
              <line x1="9" y1="8" x2="15" y2="8" />
              {' '}
              <line
                x1="17"
                y1="16"
                x2="23"
                y2="16"
              />
            </svg>
            {getTranslation(null, 'vc.sensitivity')}
          </span>
          <div
            className="content-card-content content-card-content-border-bottom"
            dangerouslySetInnerHTML={{ __html: getTranslation(null, 'vc.aboutSensitivity') }}
          />
          <div className="content-card-buttons w-full">
            <div className="w-full">
              <div className="flex">
                <div className="w-full relative z-0">
                  <div
                    className={`h-full common-rounded rounded-r-xl ${this.state.isAboveThreshold ? ' bg-green-500' : ' bg-blue-400'}`}
                    style={{ width: `${this.state.currentMicVolume}%` }}
                  />
                  <div className="absolute inset-0 flex justify-center items-center z-10">
                    <input
                      className="volume-slider opacity-70 w-full h-full reversedRange inline "
                      onInput={this.micSensitiveInput}
                      type="range"
                      min="0"
                      max={this.state.lowestRecorded}
                      step="1"
                      value={this.props.microphoneSensitivity}
                    />
                  </div>
                </div>
                <label className="content-pill status-button inline w-2/4 my-0" htmlFor="autoSensitivity">
                  <input
                    id="autoSensitivity"
                    type="checkbox"
                    onChange={this.micAutoSensitivityInput}
                    checked={this.props.autoMicSensitivity}
                  />
                  <span className="inline px-2">{getTranslation(null, 'vc.automaticAdjustments')}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 content-card h-full flex">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
              />
              <path
                d="M19 10v2a7 7 0 0 1-14 0v-2"
              />
              <line
                x1="12"
                y1="19"
                x2="12"
                y2="23"
              />
              <line
                x1="8"
                y1="23"
                x2="16"
                y2="23"
              />
            </svg>
            {getTranslation(null, 'vc.input')}
          </span>
          <div className="content-card-content content-card-content-border-bottom">
            {getTranslation(null, 'vc.aboutInput')}
          </div>
          <select
            className="align-bottom soft-tex content-pill"
            value={currentMic}
            onChange={this.selectMic}
          >
            {mics.map((device) => (
              <option key={device.id} value={device.id}>{device.name}</option>
            ))}
          </select>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps)(AdvancedVoiceSettings);

function mapStateToProps(state) {
  return {
    surroundSound: state.settings.voicechatSurroundSound,
    monitoringEnabled: state.settings.voicechatMonitoringEnabled,
    autoMicSensitivity: state.settings.automaticSensitivity,
    microphoneSensitivity: state.settings.microphoneSensitivity,
    preferredMicId: state.settings.preferredMicId,
    voiceState: state.voiceState,
  };
}
