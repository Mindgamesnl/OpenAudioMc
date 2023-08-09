import React from 'react';
import { connect } from 'react-redux';
import { getTranslation } from '../../client/OpenAudioAppContainer';
import { setGlobalState } from '../../state/store';

class ExtraVoiceSettings extends React.Component {
  constructor(props) {
    super(props);

    this.toggleSurroundSound = this.toggleSurroundSound.bind(this);
    this.monitoringInput = this.monitoringInput.bind(this);
  }

  monitoringInput(e) {
    setGlobalState({ settings: { voicechatMonitoringEnabled: e.target.checked } });
  }

  toggleSurroundSound() {
    setGlobalState({ settings: { voicechatSurroundSound: !this.props.surroundSound } });
  }

  render() {
    const surroundText = !this.props.surroundSound ? getTranslation(null, 'vc.settings.surround.enable') : getTranslation(null, 'vc.settings.surround.disable');

    return (
      <div className="w-full flex">
        <div className="w-full lg:w-1/2 content-card">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path
                d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3"
              />
            </svg>
            {getTranslation(null, 'vc.positionalAudio')}
          </span>
          <div className="content-card-content content-card-content-border-bottom">
            {getTranslation(null, 'vc.aboutPositionalAudio')}
          </div>
          <div className="content-card-buttons">
            <button className="content-pill status-button green" onClick={this.toggleSurroundSound} type="button">
              {surroundText}
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 content-card">
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
            {getTranslation(null, 'vc.settings.monitoring.title')}
          </span>
          <div className="content-card-content content-card-content-border-bottom">
            {getTranslation(null, 'vc.settings.monitoring.about')}
          </div>
          <div className="content-card-buttons">
            <label className="content-pill status-button" htmlFor="monitoringEnabled">
              <input
                name="monitoringEnabled"
                type="checkbox"
                onChange={this.monitoringInput}
                checked={this.props.monitoringEnabled}
              />
              <span
                className="!inline !block"
              >
                {getTranslation(null, 'vc.settings.monitoring.toggle')}
              </span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ExtraVoiceSettings);

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
