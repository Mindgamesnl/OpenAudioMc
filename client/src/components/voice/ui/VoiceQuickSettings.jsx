import React from 'react';
import { connect } from 'react-redux';
import { Volume2, Mic, MicOff } from 'lucide-react';
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

    let avatarStyling;
    if (this.props.isSpeaking) {
      avatarStyling = 'border-green-400 shadow-lg shadow-green-400/25';
    } else if (this.props.voicechatMuted) {
      avatarStyling = 'border-red-400 shadow-lg shadow-red-400/25';
    } else {
      avatarStyling = 'border-gray-600';
    }

    return (
      <div className="space-y-4">
        {/* User Status */}
        <div className="text-center space-y-3">
          <div className="relative inline-block">
            <img
              alt="Your avatar"
              className={`w-16 h-16 rounded-xl border-2 transition-all duration-200 ${avatarStyling}`}
              src={`https://visage.surgeplay.com/face/512/${uuid}`}
            />
            {this.props.isSpeaking ? (
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center"
              >
                <Mic className="w-3 h-3 text-white" />
              </div>
            ) : null}
            {this.props.voicechatMuted ? (
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-gray-900 flex items-center justify-center"
              >
                <MicOff className="w-3 h-3 text-white" />
              </div>
            ) : null}
          </div>
          <div className="text-sm text-gray-300 font-medium">
            {msg('vc.myStatus')}
          </div>
        </div>

        {/* Control Buttons */}
        <div className={`grid gap-3 ${!this.props.peersHidden ? 'grid-cols-3' : 'grid-cols-2'}`}>
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

        {/* Voice Volume Control */}
        <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-5">
          <div className="flex items-center space-x-3 mb-4">
            <div
              className="p-2 bg-blue-500 bg-opacity-20 rounded-lg border border-blue-500 border-opacity-30 flex-shrink-0"
            >
              <Volume2 className="border-blue-500, border-opacity-30" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-200">Voice Volume</div>
              <div className="text-xs text-gray-400">
                {this.props.voicechatVolume}
                %
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              {/* Background track */}
              <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                {/* Progress fill */}
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-200 ease-out"
                  style={{ width: `${Math.min((this.props.voicechatVolume / 120) * 100, 100)}%` }}
                />
              </div>

              {/* Slider input */}
              <input
                onInput={this.onVolumeChange}
                className="absolute inset-0 w-full h-3 opacity-0 cursor-pointer"
                type="range"
                min="0"
                max="120"
                step="1"
                value={this.props.voicechatVolume}
              />

              {/* Custom thumb */}
              <div
                className="absolute top-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-blue-500 transform -translate-y-1/2 transition-all duration-200 pointer-events-none"
                style={{
                  left: `calc(${Math.min((this.props.voicechatVolume / 120) * 100, 100)}% - 10px)`,
                }}
              />
            </div>

            {/* Labels */}
            <div className="flex justify-between text-xs text-gray-400">
              <span>0%</span>
              <span>100%</span>
              <span>120%</span>
            </div>
          </div>
        </div>

        {(this.props.voicePiPEnabled && !this.props.peersHidden)
          ? <DocumentPictureInPicture><VoiceChatPiP /></DocumentPictureInPicture> : null}
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
