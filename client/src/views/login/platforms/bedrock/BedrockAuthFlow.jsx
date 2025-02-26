/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { BaseSegmentedPage } from '../../../../components/layout/BaseSegmentedPage';
import { WrappedUserMedia } from '../../../../client/services/voice/util/WrappedUserMedia';
import { setGlobalState } from '../../../../state/store';
import { BedrockTokenHandle } from './BedrockTokenHandle';
import { FadeToCtx } from '../../../../components/contexts';


export let premadeAudioStream = null;

class BedrockAuthFlowContent extends React.Component {
  static contextType = FadeToCtx;

  static propTypes = {
    accentColor: PropTypes.string,
    serverDisplayName: PropTypes.string,
    logoImage: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      microphonePermissionsGranted: false,
      microphoneErrorMessage: null,
      microphoneOptions: [],
      selectedMicrophone: null,
      microphoneLoading: false,
    };

    this.requestMicrophonePermissions = this.requestMicrophonePermissions.bind(this);
    this.changeMicInput = this.changeMicInput.bind(this);
  }

  componentDidMount() {
    setGlobalState({ voiceState: { autoJoinVoiceChat: true }, ignoreUrlToken: true });
  }

  requestMicrophonePermissions() {
    this.setState({ microphoneLoading: true });
    const wrapped = new WrappedUserMedia();

    let success = function audioSuccess(stream) {
      premadeAudioStream = stream;
      this.setState({ microphonePermissionsGranted: true, microphoneErrorMessage: null });

      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const microphones = devices.filter((device) => device.kind === 'audioinput');
        const microphoneOptions = microphones.map((microphone) => ({ key: microphone.deviceId, value: microphone.label }));
        this.setState({ microphoneOptions, microphoneLoading: false });
      });
    };

    let failed = function audioFailure(error) {
      if (error.name === 'PermissionDeniedError' || error.name === 'NotAllowedError') {
        this.setState({
          microphonePermissionsGranted: false,
          microphoneErrorMessage: 'You denied the microphone permissions, please enable them in your browser settings',
          microphoneLoading: false,
        });
      } else {
        this.setState({
          microphonePermissionsGranted: false,
          microphoneErrorMessage: 'An unknown error occurred while requesting the microphone permissions, please try again later',
          microphoneLoading: false,
        });
      }
    };

    failed = failed.bind(this);
    success = success.bind(this);
    wrapped.successCallback = (success);
    wrapped.errorCallback = failed;

    wrapped.getUserMedia(this.state.selectedMicrophone);
  }

  changeMicInput(id) {
    if (premadeAudioStream) {
      premadeAudioStream.getTracks().forEach((track) => {
        track.stop();
      });
      premadeAudioStream = null;
    }

    this.setState({
      microphonePermissionsGranted: false,
      microphoneErrorMessage: 'Loading new microphone...',
      selectedMicrophone: id,
    }, this.requestMicrophonePermissions);
  }

  continue() {
    // push to global state
    setGlobalState({
      platformInfo: {
        flow: 'bedrock',
        notificationsReady: false,
      },
      settings: {
        preferredMicId: this.state.selectedMicrophone,
      },
    });

    this.context.fadeToComponent(<BedrockTokenHandle />);
  }

  render() {
    const meetsRequirements = this.state.microphonePermissionsGranted;
    const hasMicrophone = this.state.microphoneOptions.length > 0;
    const { serverDisplayName } = this.props;

    return (
      <>
        <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start space-y-8">
          <div className="text-center lg:text-left">
            <h1
              style={{ fontFamily: 'roboto' }}
              className="text-white text-4xl font-bold mt-6"
            >
              Minecraft: Bedrock Edition
            </h1>
            <h2 className="text-gray-400 text-2xl mt-2">{serverDisplayName}</h2>
            <p className="text-gray-400 mt-4 max-w-md">
              You need to provide the required permissions to connect with Bedrock Edition.
              This helps us automatically connect you in the future.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-7/12 max-w-2xl">
          <div
            className="backdrop-blur-xl bg-black bg-opacity-30 rounded-2xl p-8 border shadow-2xl"
            style={{ borderColor: 'var(--accent-color, #6366f1)', borderWidth: '1px' }}
          >
            <div className="flex flex-col space-y-6">
              <div className="mb-2">
                <h2 className="text-white text-xl font-bold">Microphone Permissions</h2>
                <p className="text-gray-400 text-sm mt-1">
                  We need access to your microphone to send your voice to other players
                </p>
              </div>

              <div className="flex flex-col space-y-4">
                {!this.state.microphonePermissionsGranted && !this.state.microphoneLoading && (
                  <button
                    onClick={this.requestMicrophonePermissions}
                    className="w-full py-3 bg-opacity-10 text-white font-medium relative overflow-hidden group rounded-lg"
                    style={{
                      backgroundColor: 'var(--accent-color, #6366f1)',
                      borderWidth: '1px',
                      borderColor: 'var(--accent-color, #6366f1)',
                    }}
                  >
                    <div
                      className="absolute inset-0 w-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                      style={{
                        backgroundColor: 'var(--accent-color, #6366f1)',
                        opacity: 0.2,
                      }}
                    />
                    <div className="relative flex items-center justify-center space-x-2">
                      <span>Enable Microphone</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </button>
                )}

                {this.state.microphoneLoading ? (
                  <div
                    className="w-full py-3 bg-opacity-10 text-white font-medium text-center rounded-lg"
                    style={{
                      backgroundColor: 'var(--accent-color, #6366f1)',
                      opacity: 0.6,
                    }}
                  >
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Loading...</span>
                    </div>
                  </div>
                ) : null}

                {this.state.microphonePermissionsGranted ? (
                  <div className="flex items-center space-x-3 text-green-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Microphone permissions granted</span>
                  </div>
                ) : null}

                {hasMicrophone ? (
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Select Microphone</label>
                    <select
                      className="w-full bg-black bg-opacity-60 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={(e) => this.changeMicInput(e.target.value)}
                      value={this.state.selectedMicrophone || ''}
                    >
                      <option value="" disabled>Choose a microphone</option>
                      {this.state.microphoneOptions.map((option) => (
                        <option key={option.key} value={option.key}>{option.value}</option>
                      ))}
                    </select>
                  </div>
                ) : null}

                {this.state.microphoneErrorMessage ? (
                  <div className="rounded-md bg-red-900 bg-opacity-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-300">Microphone Error</h3>
                        <div className="mt-2 text-sm text-red-200">{this.state.microphoneErrorMessage}</div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="pt-4 border-t border-gray-700" />

              {meetsRequirements ? (
                <button
                  onClick={this.continue.bind(this)}
                  className="w-full py-4 text-white font-medium relative overflow-hidden group rounded-lg"
                  style={{
                    backgroundColor: 'var(--accent-color, #6366f1)',
                  }}
                >
                  <div
                    className="absolute inset-0 w-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                    style={{
                      backgroundColor: 'var(--accent-color, #6366f1)',
                      opacity: 0.4,
                    }}
                  />
                  <div className="relative flex items-center justify-center space-x-2">
                    <span>Continue</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-4 bg-gray-800 bg-opacity-50 text-gray-400 font-medium rounded-lg cursor-not-allowed"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>Enable all permissions to continue</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export class BedrockAuthFlow extends React.Component {
  render() {
    return (
      <BaseSegmentedPage showVersion>
        <BedrockAuthFlowContent />
      </BaseSegmentedPage>
    );
  }
}
