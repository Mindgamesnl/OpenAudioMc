import React from 'react';
import PropTypes from 'prop-types';
import { BlackoutPage } from '../../../../components/layout/BlackoutPage';
import { ButtonChecklistItem } from '../../../../components/checklist/ButtonChecklistItem';
import { WrappedUserMedia } from '../../../../client/services/voice/util/WrappedUserMedia';
import { StyledDropdown } from '../../../../components/form/StyledDropdown';
import { setGlobalState } from '../../../../state/store';
import { BedrockTokenHandle } from './BedrockTokenHandle';
import { FadeToCtx } from '../../../../components/contexts';

// eslint-disable-next-line import/no-mutable-exports
export let premadeAudioStream = null;

export class BedrockAuthFlow extends React.Component {
  static contextType = FadeToCtx;

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
      // destroy the stream
      premadeAudioStream = stream;
      this.setState({ microphonePermissionsGranted: true, microphoneErrorMessage: null });

      // discover microphones
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const microphones = devices.filter((device) => device.kind === 'audioinput');
        const microphoneOptions = microphones.map((microphone) => ({ key: microphone.deviceId, value: microphone.label }));
        this.setState({ microphoneOptions, microphoneLoading: false });
      });
    };

    let failed = function audioFailure(error) {
      // is it permission denied?
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
    // close the current stream
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

    return (
      <BlackoutPage className="overflow-y-scroll">
        <div className="bg-gradient-to-bl via-gray-900 from-stone-900 to-gray-900 overflow-y-auto overflow-auto">
          <div
            className="relative mx-auto xl:max-w-7xl py-12 px-6 lg:px-8 lg:py-8 xl:border-l-8 border-solid border-indigo-900 flex-none"
          >
            <div className="md:ml-auto">
              <h2 className="text-lg font-semibold text-gray-300">Connecting with</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Minecraft: Bedrock Edition
              </p>
              <p className="mt-3 text-lg text-gray-300">
                You need to give the required permissions to this page now, so we can connect you
                automatically in the future.
              </p>
              <div className="mt-8">
                <ButtonChecklistItem
                  text="Microphone Permissions"
                  subtext="We need to use your microphone to send your voice to other players."
                  buttonContent="Enable Microphone"
                  buttonOnClick={this.requestMicrophonePermissions}
                  showButton={!this.state.microphonePermissionsGranted && !this.state.microphoneLoading}
                  checked={this.state.microphonePermissionsGranted}
                  loading={this.state.microphoneLoading}
                />

                {hasMicrophone
                  ? (
                    <div className="pt-4 w-full flex justify-center">
                      <StyledDropdown
                        title="Select Microphone"
                        description="Select the microphone you want to use for voice chat."
                        options={this.state.microphoneOptions}
                        onChange={this.changeMicInput}
                      />
                    </div>
                  ) : null}

                {this.state.microphoneErrorMessage != null
                  ? (
                    <ErrorBox
                      title="Microphone Error"
                      description={this.state.microphoneErrorMessage}
                    />
                  )
                  : null}

                <div
                  className="border-t-2 mx-5 my-5 border-r-2 border-solid border-gray-700 rounded-full"
                />

                {meetsRequirements
                  ? (
                    <button
                      onClick={this.continue.bind(this)}
                      type="button"
                      className="bg-green-400 w-full py-4 px-2 rounded-md text-gray-900 mt-4"
                    >
                      Continue
                    </button>
                  )
                  : (
                    <button
                      type={meetsRequirements ? 'button' : 'submit'}
                      disabled
                      className="w-full bg-gray-800 py-4 px-2 rounded-md text-gray-400 mt-4"
                    >
                      You need to enable all permissions before you can continue
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </BlackoutPage>
    );
  }
}

function ErrorBox(props) {
  return (
    <div className="w-full flex justify-center">
      <div className="rounded-md bg-red-700 p-2 mt-4 w-1/2">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-200">{props.title}</h3>
            <div className="mt-2 text-sm text-red-200">
              {props.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ErrorBox.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

ErrorBox.defaultProps = {
  title: 'Error',
  description: 'An unknown error occurred',
};
