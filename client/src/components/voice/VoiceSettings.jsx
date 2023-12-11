import React from 'react';
import { connect } from 'react-redux';
import AdvancedVoiceSettings from './AdvancedVoiceSettings';
import { setGlobalState } from '../../state/store';
import { reRenderAllGainNodes, VoiceModule } from '../../client/services/voice/VoiceModule';
import { Tooltip } from '../tooltip/tooltip';
import ExtraVoiceSettings from './ExtraVoiceSettings';
import { msg } from '../../client/OpenAudioAppContainer';
import { PipVector } from '../dpip/PipVector';
import { VoiceMicButton } from '../icons/VoiceMic';
import { VoiceDeafenButton } from '../icons/VoicechatDeafenButton';

class VoiceSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      advancedSettings: false,
    };

    this.onVolumeChange = this.onVolumeChange.bind(this);
    this.toggleAdvancedSettings = this.toggleAdvancedSettings.bind(this);
    this.toggleMicMute = this.toggleMicMute.bind(this);
    this.togglePiP = this.togglePiP.bind(this);
    this.toggleDeafen = this.toggleDeafen.bind(this);
  }

  onVolumeChange(e) {
    setGlobalState({ settings: { voicechatVolume: e.target.value } });
    reRenderAllGainNodes();

    // were we deafened? then we need to unmute
    if (this.props.voicechatDeafened) {
      this.toggleDeafen();
    }
  }

  togglePiP() {
    setGlobalState({ settings: { voicePiPEnabled: !this.props.voicePiPEnabled } });
  }

  toggleAdvancedSettings() {
    this.setState({ advancedSettings: !this.state.advancedSettings });
  }

  toggleMicMute() {
    const muted = !this.props.voicechatMuted;
    setGlobalState({ settings: { voicechatMuted: muted } });
  }

  toggleDeafen() {
    const deafened = !this.props.voicechatDeafened;
    setGlobalState({ settings: { voicechatDeafened: deafened } });

    // apply to current streams
    VoiceModule.peerMap.forEach((peer) => {
      peer.stream.setMuteOverride(deafened);
    });
  }

  render() {
    // are we moderating? then only show that banner
    if (this.props.voiceState.isModerating) {
      return (
        <div className="content-section  pt-5">
          <div className="content-wrapper-box audio-content full bg-red-800">
            <div className="content-wrapper-context full">
              <div className="content-text full">
                <div className="text-center">
                  <p className="soft-text">
                    {msg('vc.youAreModerating')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    let micButton = <VoiceMicButton onClick={this.toggleMicMute} muted={false} />;
    if (this.props.voicechatMuted) {
      micButton = <VoiceMicButton onClick={this.toggleMicMute} muted />;
    }

    let deafenButton = <VoiceDeafenButton onClick={this.toggleDeafen} deafened={false} />;
    if (this.props.voicechatDeafened) {
      deafenButton = <VoiceDeafenButton onClick={this.toggleDeafen} deafened />;
    }

    // check if documentPictureInPicture is supported
    const isPipSupported = document.pictureInPictureEnabled;

    const pipEnabled = this.props.voicePiPEnabled;
    const togglePipButton = (
      <button
        className={`content-pill green status-button text-center mr-2 ${!pipEnabled ? '' : '!bg-blue-600'}`}
        onClick={this.togglePiP}
        type="button"
      >
        <PipVector />
      </button>
    );

    let uuid;
    if (this.props.currentUser && this.props.currentUser.uuid) {
      uuid = this.props.currentUser.uuid;
    } else {
      // setup placeholder
      uuid = '00000000-0000-0000-0000-000000000000';
    }

    return (
      <div className="w-full flex justify-center align-middle lg:pb-5 lg:pt-2">
        <div className="content-section flex justify-center lg:w-5/6">
          <div className="flex content-card-collection items-stretch">
            <div className="w-full md:w-2/3 lg:w-1/3 content-card small-card order-2 2xl:order-1">
              <span className="content-card-content-border-bottom">
                <img
                  alt="Speaking indictor"
                  className={`avatar  ${this.props.voiceState.isSpeaking ? ' speaking' : ''}${this.props.voicechatMuted ? ' muted-self' : ''} !rounded-xl`}
                  src={`https://visage.surgeplay.com/face/512/${uuid}`}
                />
                {msg('vc.myStatus')}
              </span>
              <div className="content-card-buttons w-full">
                <div className="flex justify-center w-full">
                  {isPipSupported ? togglePipButton : null}

                  {/* show the mic as disabled if we are server muted */}
                  <div className={`${this.props.voiceState.isMutedServerSide ? 'disabled-bt' : ''}`}>
                    {micButton}
                  </div>

                  {deafenButton}

                  <Tooltip
                    title={msg('vc.noMicInputYetTitle')}
                    text={msg('vc.noMicInputYetBody')}
                    visible={!this.props.voiceState.microphoneTriggeredOnce && this.props.voiceState.microphoneSanityPrompt}
                  >
                    <button
                      className="ml-2 content-pill status-button green text-center"
                      onClick={this.toggleAdvancedSettings}
                      type={this.state.advancedSettings ? 'button' : 'submit'}
                    >
                      <svg
                        className="h-8 text-gray-900 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="3" />
                        <path
                          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                        />
                      </svg>
                    </button>
                  </Tooltip>
                </div>
              </div>

              {this.props.voicechatDeafened ? (
                <div className="text-center pt-2">
                  <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                    <span className="flex rounded-full font-bold">
                      <svg className="fill-current h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg>
                    </span>
                    <span className="font-semibold mr-2 text-left flex-auto">{msg('vc.deafened')}</span>
                  </div>
                </div>
              ) : null}

              <div className="content-card-buttons w-full">
                <div className="w-full content-pill status-button green text-center inline">
                  <div className="flex justify-center w-full">

                    <svg
                      className="h-8 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>

                    <input
                      onInput={this.onVolumeChange}
                      className="common-rounded-top common-rounded-bottom w-full"
                      type="range"
                      min="0"
                      max="120"
                      step="1"
                      value={this.props.voicechatVolume}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/3 order-1 2xl:order-2 p-0">

              <AdvancedVoiceSettings />

            </div>
          </div>
          {this.state.advancedSettings ? <div className="py-5"><ExtraVoiceSettings /></div> : null}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(VoiceSettings);

function mapStateToProps(state) {
  return {
    voicechatMuted: state.settings.voicechatMuted,
    voicechatDeafened: state.settings.voicechatDeafened,
    voicechatVolume: state.settings.voicechatVolume,
    voicePiPEnabled: state.settings.voicePiPEnabled,
    voiceState: state.voiceState,
    currentUser: state.currentUser,
  };
}
