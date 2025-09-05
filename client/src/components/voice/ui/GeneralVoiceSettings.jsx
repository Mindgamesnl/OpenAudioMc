import React from 'react';
import { MicVocal } from 'lucide-react';
import './generalcettings.css';
import { connect } from 'react-redux';
import { msg } from '../../../client/OpenAudioAppContainer';
import {
  addMicVolumeListener,
  removeMicVolumeListener,
} from '../../../client/services/voice/processing/MicrophoneProcessor';
import { setGlobalState } from '../../../state/store';
import { VoiceModule } from '../../../client/services/voice/VoiceModule';

class GeneralVoiceSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listenerId: null,
      isAboveThreshold: false,
      currentMicVolume: 0,
    };

    this.micSensitiveInput = this.micSensitiveInput.bind(this);
    this.micAutoSensitivityInput = this.micAutoSensitivityInput.bind(this);
    this.selectMic = this.selectMic.bind(this);
    this.monitoringInput = this.monitoringInput.bind(this);
    this.toggleEchoCancellation = this.toggleEchoCancellation.bind(this);
  }

  componentDidMount() {
    if (!this.state.listenerId) {
      const id = addMicVolumeListener((volume, isActive) => {
        // volume is now 0-100 normalized
        this.setState({
          currentMicVolume: volume,
          isAboveThreshold: isActive,
        });
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

  render() {
    const mics = Object.values(this.props.voiceState.mics);
    const currentMic = this.props.preferredMicId;

    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3 pb-4 border-b border-white border-opacity-10">
          <div className="p-2 bg-purple-500 bg-opacity-20 rounded-lg border border-purple-500 border-opacity-30">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white">Voice Settings</h2>
        </div>

        {/* Settings Grid */}
        <div className="space-y-5">

          {/* Microphone Selection */}
          <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl p-5 border border-white border-opacity-5">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-500 bg-opacity-20 rounded-lg border border-green-500 border-opacity-30">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-200">Microphone Device</h3>
                <p className="text-xs text-gray-400">Select which microphone to use</p>
              </div>
            </div>
            <select
              className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 transition-colors"
              value={currentMic}
              onChange={this.selectMic}
            >
              {mics.map((device) => (
                <option key={device.id} value={device.id}>{device.name}</option>
              ))}
            </select>
          </div>

          {/* Microphone Threshold Settings */}
          <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl p-5 border border-white border-opacity-5">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500 bg-opacity-20 rounded-lg border border-blue-500 border-opacity-30">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-200">{msg('vc.settings.micActivation.title')}</h3>
                  <p className="text-xs text-gray-400">{msg('vc.settings.micActivation.body')}</p>
                </div>
              </div>

              {/* Auto Sensitivity Toggle */}
              <div className="flex items-center justify-between p-3 bg-black bg-opacity-30 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-200">{msg('vc.settings.micActivationAuto.title')}</div>
                  <div className="text-xs text-gray-400">{msg('vc.settings.micActivationAuto.body')}</div>
                </div>
                <label className="inline-flex items-center cursor-pointer" htmlFor="autoSensitivityToggle">
                  <input
                    id="autoSensitivityToggle"
                    type="checkbox"
                    className="sr-only peer"
                    onChange={this.micAutoSensitivityInput}
                    checked={this.props.autoMicSensitivity}
                  />
                  <div className="relative w-11 h-6 bg-gray-700 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>

              {/* Manual Sensitivity Control */}
              {!this.props.autoMicSensitivity && (
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-200">{msg('vc.settings.micActivationManual.title')}</div>
                  <div className="text-xs text-gray-400 mb-3">{msg('vc.settings.micActivationManual.body')}</div>

                  {/* Microphone Level Indicator */}
                  <div className="relative h-8 bg-gray-700 rounded-lg overflow-hidden">
                    {/* Current microphone level */}
                    <div
                      className={`h-full transition-all duration-100 ${this.state.isAboveThreshold ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${this.state.currentMicVolume}%` }}
                    />

                    {/* Threshold line - now based on sensitivity setting */}
                    <div
                      className="absolute top-0 w-1 h-full bg-red-400 transition-all duration-200"
                      style={{ left: `${this.props.microphoneSensitivity}%` }}
                    />

                    {/* Labels */}
                    <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-medium text-white">
                      <span>Quiet</span>
                      <span>Loud</span>
                    </div>
                  </div>

                  {/* Threshold Slider */}
                  <div className="space-y-2">
                    <input
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      onInput={this.micSensitiveInput}
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={this.props.microphoneSensitivity}
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>More Sensitive</span>
                      <span>Less Sensitive</span>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className={`text-center p-2 rounded-lg ${this.state.isAboveThreshold ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-gray-500 bg-opacity-20 text-gray-400'}`}>
                    {this.state.isAboveThreshold ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
                        </svg>
                        <span className="text-sm font-medium">{msg('vc.settings.micActivationManual.active')}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
                          <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <span className="text-sm font-medium">{msg('vc.settings.micActivationManual.inactive')}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Other Settings */}
          <div className="grid grid-cols-1 gap-4">

            {/* Monitoring */}
            <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-500 bg-opacity-20 rounded-lg border border-yellow-500 border-opacity-30">
                    <MicVocal className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-200">{msg('vc.settings.monitoring.title')}</div>
                    <div className="text-xs text-gray-400">{msg('vc.settings.monitoring.body')}</div>
                  </div>
                </div>
                <label className="inline-flex items-center cursor-pointer" htmlFor="monitoringToggle">
                  <input
                    id="monitoringToggle"
                    type="checkbox"
                    className="sr-only peer"
                    onChange={this.monitoringInput}
                    checked={this.props.monitoringEnabled}
                  />
                  <div className="relative w-11 h-6 bg-gray-700 rounded-full peer peer-focus:ring-4 peer-focus:ring-yellow-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600" />
                </label>
              </div>
            </div>

            {/* Echo Cancellation */}
            <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500 bg-opacity-20 rounded-lg border border-purple-500 border-opacity-30">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-200">{msg('settings.voicechat.echocancel.title')}</div>
                    <div className="text-xs text-gray-400">Reduce echo and feedback</div>
                  </div>
                </div>
                <label className="inline-flex items-center cursor-pointer" htmlFor="echoCancellationToggle">
                  <input
                    id="echoCancellationToggle"
                    type="checkbox"
                    className="sr-only peer"
                    onChange={this.toggleEchoCancellation}
                    checked={this.props.voiceEchoCancellation}
                  />
                  <div className="relative w-11 h-6 bg-gray-700 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600" />
                </label>
              </div>
            </div>

          </div>

          {/* Help Text */}
          {(!this.props.voiceState.microphoneTriggeredOnce && this.props.voiceState.microphoneSanityPrompt) ? (
            <div className="bg-amber-500 bg-opacity-10 border border-amber-500 border-opacity-30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-amber-500 bg-opacity-20 rounded-lg border border-amber-500 border-opacity-30 flex-shrink-0">
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-amber-400 mb-1">{msg('vc.noMicInputYetTitle')}</h3>
                  <p className="text-sm text-amber-300">{msg('vc.noMicInputYetBody')}</p>
                </div>
              </div>
            </div>
          ) : null}

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
