import React from 'react';
import './generalcettings.css';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { getTranslation, msg } from '../../../client/OpenAudioAppContainer';
import {
  addMicVolumeListener,
  removeMicVolumeListener,
} from '../../../client/services/voice/processing/MicrophoneProcessor';
import { setGlobalState } from '../../../state/store';
import { VoiceModule } from '../../../client/services/voice/VoiceModule';
import { applyPannerProperties, pannerTrackers } from '../../../views/client/pages/settings/SettingsPage';

class GeneralVoiceSettings extends React.Component {
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
    this.toggleSurroundSound = this.toggleSurroundSound.bind(this);
    this.monitoringInput = this.monitoringInput.bind(this);
    this.toggleEchoCancellation = this.toggleEchoCancellation.bind(this);
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

  toggleEchoCancellation() {
    setGlobalState({ settings: { voiceEchoCancellation: !this.props.voiceEchoCancellation } });
    VoiceModule.restartVoiceChat();
  }

  toggleSurroundSound() {
    setGlobalState({ settings: { voicechatSurroundSound: !this.props.surroundSound } });

    // update all peers
    Object.keys(this.props.voiceState.peers).forEach((peerId) => {
      const peerInstance = VoiceModule.peerMap.get(peerId);
      if (peerInstance && peerInstance.stream) {
        peerInstance.stream.enableSpatialAudio(!this.props.surroundSound);
      }
    });
  }

  monitoringInput(e) {
    setGlobalState({ settings: { voicechatMonitoringEnabled: e.target.checked } });
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

  toggleRollOff(e) {
    const toggledOn = e.target.checked;

    let changedValue = 0.5;

    if (toggledOn) {
      changedValue = 1;
    }

    // make new settings box
    const newSettings = {};
    newSettings.rolloffFactor = changedValue;
    setGlobalState({ settings: newSettings });

    Object.keys(pannerTrackers).forEach((key) => {
      applyPannerProperties(pannerTrackers[key], pannerTrackers[key].maxDistance);
    });
  }

  render() {
    const mics = Object.values(this.props.voiceState.mics);
    const currentMic = this.props.preferredMicId;

    return (
      <div className="m-5 text-gray-300">
        <div className="vc-settings-header">
          <h1>VoiceChat settings</h1>
        </div>

        <div className="text-left pl-2">
          <div className="p-2">
            <label className="inline-flex items-center me-5 cursor-pointer" htmlFor="fade-to-zero">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                id="fade-to-zero"
                checked={this.props.rolloffFactor === 1}
                onChange={this.toggleRollOff}
              />
              <div
                className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"
              />
              <span className="ms-3 text-sm font-medium">
                {msg('vc.settings.completelyFadePeers')}
              </span>
            </label>

            <label className="inline-flex items-center me-5 cursor-pointer" htmlFor="enable-monitoring">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                id="enable-monitoring"
                onChange={this.monitoringInput}
                checked={this.props.monitoringEnabled}
              />
              <div
                className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"
              />
              <span className="ms-3 text-sm font-medium">
                {msg('vc.settings.monitoring.title')}
              </span>
            </label>

            <label className="inline-flex items-center me-5 cursor-pointer" htmlFor="enable-spatialaudio">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                id="enable-spatialaudio"
                onClick={this.toggleSurroundSound}
                checked={this.props.surroundSound}
              />
              <div
                className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"
              />
              <span className="ms-3 text-sm font-medium">
                {msg('vc.settings.surround.toggle')}
              </span>
            </label>

            <label className="inline-flex items-center me-5 cursor-pointer" htmlFor="autoSensitivity">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                id="autoSensitivity"
                onChange={this.micAutoSensitivityInput}
                checked={this.props.autoMicSensitivity}
              />
              <div
                className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"
              />
              <span className="ms-3 text-sm font-medium">
                {msg('vc.automaticAdjustments')}
              </span>
            </label>

            <label className="inline-flex items-center me-5 cursor-pointer" htmlFor="echoCancelation">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                id="echoCancelation"
                onChange={this.toggleEchoCancellation}
                checked={this.props.voiceEchoCancellation}
              />
              <div
                className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"
              />
              <span className="ms-3 text-sm font-medium">
                {msg('settings.voicechat.echocancel.title')}
              </span>
            </label>

            <form className="max-w-sm mx-auto pr-2">
              <div className="content-card-content pb-2">
                {getTranslation(null, 'vc.aboutInput')}
              </div>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={currentMic}
                onChange={this.selectMic}
              >
                {mics.map((device) => (
                  <option key={device.id} value={device.id}>{device.name}</option>
                ))}
              </select>
            </form>

            <div className="w-full relative z-0 h-6 mt-2">
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

            <Tooltip
              title={msg('vc.noMicInputYetTitle')}
              text={msg('vc.noMicInputYetBody')}
              visible={!this.props.voiceState.microphoneTriggeredOnce && this.props.voiceState.microphoneSanityPrompt}
            />

            <div
              className="pt-2"
              dangerouslySetInnerHTML={{ __html: msg('vc.aboutSensitivity') }}
            />

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(GeneralVoiceSettings);

function mapStateToProps(state) {
  return {
    rolloffFactor: state.settings.rolloffFactor,
    surroundSound: state.settings.voicechatSurroundSound,
    monitoringEnabled: state.settings.voicechatMonitoringEnabled,
    autoMicSensitivity: state.settings.automaticSensitivity,
    microphoneSensitivity: state.settings.microphoneSensitivity,
    preferredMicId: state.settings.preferredMicId,
    voiceState: state.voiceState,
    voiceEchoCancellation: state.settings.voiceEchoCancellation,
  };
}
