import React from 'react';
import PropTypes from 'prop-types';
import './voicecard.css';
import Cookies from 'js-cookie';
import { VoiceModule } from '../../client/services/voice/VoiceModule';
import { getVolumeForPeer } from '../../client/services/voice/peers/VoicePeer';
import { PeerMutedSvg } from '../icons/peermuted';
import { ProximitySvg } from '../icons/proxsvg';
import { GlobalSvg } from '../icons/globalsvg';
import { msg } from '../../client/OpenAudioAppContainer';
import { VoicePageButton } from '../buttons/VoicePageButton';

import './voicepeerbox.css';

export class VoicePeerRow extends React.Component {
  static propTypes = {
    streamKey: PropTypes.string.isRequired,
    name: PropTypes.string,
    uuid: PropTypes.string,
    displayUuid: PropTypes.string,
    muted: PropTypes.bool,
    speaking: PropTypes.bool,
    loading: PropTypes.bool,
    hideVolume: PropTypes.bool,
    spatialAudio: PropTypes.bool,
  };

  static defaultProps = {
    name: 'Unknown',
    uuid: '00000000-0000-0000-0000-000000000000',
    displayUuid: '00000000-0000-0000-0000-000000000000',
    muted: false,
    speaking: false,
    loading: false,
    hideVolume: false,
    spatialAudio: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      volume: getVolumeForPeer(this.props.uuid),
    };

    this.onVolumeInput = this.onVolumeInput.bind(this);
    this.toggleMuteButton = this.toggleMuteButton.bind(this);
  }

  onVolumeInput(e) {
    this.setState({ volume: e.target.value });
    // attempt to find the peer
    const peer = VoiceModule.peerMap.get(this.props.streamKey);
    if (peer) {
      peer.stream.setVolume(e.target.value);
      // save to cookie
      Cookies.set(`voice-volume-${this.props.uuid}`, e.target.value, { expires: 365 });
    }
  }

  toggleMuteButton() {
    if (this.state.volume === 0) {
      this.onVolumeInput({ target: { value: 100 } });
    } else {
      this.onVolumeInput({ target: { value: 0 } });
    }
  }

  render() {
    // get props
    const {
      name, muted, speaking, displayUuid, loading,
    } = this.props;

    let avatarClass = 'avatar w-16 rounded-2xl';
    if (speaking) {
      avatarClass += ' speaking';
    }
    if (muted) {
      avatarClass += ' muted-self';
    }

    let parentClass = 'relative ml-0 mr-0';

    if (loading) {
      parentClass += ' animate-pulse';
    }

    const showVolume = !this.props.hideVolume;
    const { volume } = this.state;

    return (
      <li className={`flex flex-col items-center voice-card-modern flex-grow ${parentClass}`}>
        <div className="flex p-2 w-full">
          {loading ? (
            <div className="absolute inset-0 flex items-center z-20 justify-center bg-black rounded-md">
              <svg
                className="animate-spin -ml-1 mr-3 h-10 w-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <small>
                <i>
                  {msg('vc.peerLoading').replace('{name}', name)}
                </i>
              </small>
            </div>
          ) : null}
          <VoicePageButton
            onClick={this.toggleMuteButton}
            highlighted={volume === 0}
            highlightRed
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="m-0 !mr-0 !w-6"
            >
              {this.state.volume === 0
                ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
                  />
                )
                : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                  />
                )}
            </svg>
          </VoicePageButton>

          <div className="flex-1 order-2">
            <div className="flex items-center py-1">
              <h1 className="ml-2 flex-col break-all text-ellipsis overflow-hidden whitespace-nowrap pr-5">
                <div className="flex flex-row">
                  {this.props.spatialAudio ? (<ProximitySvg />) : <GlobalSvg />}
                  {muted ? (<PeerMutedSvg />) : null}
                </div>
                {name}
              </h1>
            </div>
          </div>

          <div className="flex-shrink-0 order-3 left-auto">
            <img
              src={`https://visage.surgeplay.com/face/512/${displayUuid}`}
              className={avatarClass}
              alt={`Avatar for ${name}`}
            />
          </div>
        </div>

        {showVolume ? (
          <input
            className="volume-slider tiny-slider w-full p-2"
            onChange={this.onVolumeInput}
            type="range"
            min="0"
            max="140"
            step="1"
            value={this.state.volume}
          />
        ) : null}
      </li>
    );
  }
}
