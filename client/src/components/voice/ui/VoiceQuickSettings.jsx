import React from 'react';
import { connect } from 'react-redux';
import { setGlobalState } from '../../../state/store';
import { reRenderAllGainNodes } from '../../../client/services/voice/VoiceModule';
import { msg } from '../../../client/OpenAudioAppContainer';
import { PipVector } from '../../dpip/PipVector';
import { VoiceMicButtonContent } from '../../icons/VoiceMic';
import { VoiceDeafenButtonContent } from '../../icons/VoicechatDeafenButton';
import { VoicePageButton } from '../../buttons/VoicePageButton';
import { DocumentPictureInPicture } from '../../dpip/DocumentPictureInPicture';
import VoiceChatPiP from '../../dpip/VoiceChatPiP';

import './quicksettings.css';

class VoiceQuickSettings extends React.Component {
  constructor(props) {
    super(props);

    this.onVolumeChange = this.onVolumeChange.bind(this);
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

  toggleMicMute() {
    const muted = !this.props.voicechatMuted;
    setGlobalState({ settings: { voicechatMuted: muted } });
  }

  toggleDeafen() {
    const deafened = !this.props.voicechatDeafened;
    setGlobalState({ settings: { voicechatDeafened: deafened }, voiceState: { deafenedBefore: true } });
  }

  render() {
    // are we moderating? then only show that banner
    if (this.props.isModerating) {
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

    // check if documentPictureInPicture is supported
    const isPipSupported = document.pictureInPictureEnabled;

    const pipEnabled = this.props.voicePiPEnabled;

    let uuid;
    if (this.props.currentUser && this.props.currentUser.uuid) {
      uuid = this.props.currentUser.uuid;
    } else {
      // setup placeholder
      uuid = '00000000-0000-0000-0000-000000000000';
    }

    return (
      <div className="w-full">
        <div
          className={`avatar-container ${this.props.isSpeaking ? ' speaking' : ''}${this.props.voicechatMuted ? ' muted-self' : ''}`}
        >
          <img
            alt="Speaking indicator"
            className="avatar !rounded-xl"
            src={`https://visage.surgeplay.com/face/512/${uuid}`}
          />
          {msg('vc.myStatus')}
        </div>

        <div className={`grid gap-2 mt-2 ${!this.props.peersHidden ? 'grid-cols-3' : 'grid-cols-2'}`}>

          <VoicePageButton
            highlighted={this.props.voicechatMuted}
            highlightRed
            isDisabled={this.props.isMutedServerSide}
            onClick={this.toggleMicMute}
          >
            <VoiceMicButtonContent muted={this.props.voicechatMuted} />
          </VoicePageButton>

          <VoicePageButton
            highlighted={this.props.voicechatDeafened}
            highlightRed
            onClick={this.toggleDeafen}
          >
            <VoiceDeafenButtonContent deafened={this.props.voicechatDeafened} />
          </VoicePageButton>

          {!this.props.peersHidden ? (
            <VoicePageButton
              highlighted={pipEnabled}
              highlightGreen
              isDisabled={!isPipSupported}
              onClick={this.togglePiP}
            >
              <PipVector />
            </VoicePageButton>
          ) : null}
        </div>

        <div className="content-card-buttons mt-2 w-full">
          <div className="w-full content-pill status-button" style={{ backgroundColor: 'var(--dark-primary-background) !important' }}>
            <div className="flex w-full">
              <svg
                className="h-8 pr-6"
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
                className="w-full"
                style={{ borderRadius: '8px' }}
                type="range"
                min="0"
                max="120"
                step="1"
                value={this.props.voicechatVolume}
              />
            </div>
          </div>
        </div>

        {(this.props.voicePiPEnabled && !this.props.peersHidden) ? <DocumentPictureInPicture><VoiceChatPiP /></DocumentPictureInPicture> : null}
      </div>
    );
  }
}

export default connect(mapStateToProps)(VoiceQuickSettings);

function mapStateToProps(state) {
  return {
    voicechatMuted: state.settings.voicechatMuted,
    voicechatDeafened: state.settings.voicechatDeafened,
    voicechatVolume: state.settings.voicechatVolume,
    voicePiPEnabled: state.settings.voicePiPEnabled,
    isModerating: state.voiceState.isModerating,
    isMutedServerSide: state.voiceState.isMutedServerSide,
    isSpeaking: state.voiceState.isSpeaking,
    currentUser: state.currentUser,
    peersHidden: state.voiceState.peersHidden,
  };
}
