import React from "react";
import PropTypes from "prop-types";
import "./voicecard.css"
import {VoiceModule} from "../../client/services/voice/VoiceModule";
import Cookies from "js-cookie";
import {getVolumeForPeer} from "../../client/services/voice/peers/VoicePeer";

export class VoicePeerRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            volume: getVolumeForPeer(this.props.uuid)
        }

        this.onVolumeInput = this.onVolumeInput.bind(this);
    }

    static propTypes = {
        streamKey: PropTypes.string.isRequired,
        name: PropTypes.string,
        uuid: PropTypes.string,
        muted: PropTypes.bool,
        speaking: PropTypes.bool
    }

    onVolumeInput(e) {
        this.setState({volume: e.target.value})
        // attempt to find the peer
        let peer = VoiceModule.peerMap.get(this.props.streamKey);
        if (peer) {
            peer.stream.setVolume(e.target.value);
            // save to cookie
            Cookies.set('voice-volume-' + this.props.uuid, e.target.value, {expires: 365});
        }
    }

    render() {
        // get props
        const {name, volume, muted, speaking, uuid} = this.props;

        let avatarClass = "avatar mid-avatar";
        if (speaking) {
            avatarClass += " speaking";
        }

        return (
            <li>
                <div>
                    <img src={"https://visage.surgeplay.com/bust/512/" + uuid} className={avatarClass} alt={"Avatar for " + name}/>
                </div>
                <div className="flex-1">
                    <div className="flex items-center">
                        <h1 className={"mb-2"}>
                            {muted && <svg className="red inline"
                                           viewBox="0 0 24 24" fill="none"
                                           stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                           strokeLinejoin="round">
                                <line x1="1" y1="1" x2="23" y2="23"/>
                                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>
                                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/>
                                <line x1="12" y1="19" x2="12" y2="23"/>
                                <line x1="8" y1="23" x2="16" y2="23"/>
                            </svg>}
                            {name}
                            <small className="soft-text">({this.state.volume}% volume)</small>
                        </h1>
                    </div>
                    <div>
                        <input
                            className="volume-slider tiny-slider" onChange={this.onVolumeInput}
                            type="range" min="0" max="140" step="1" value={this.state.volume}/></div>
                </div>
            </li>
        );
    }
}