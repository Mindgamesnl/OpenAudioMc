import React from "react";
import {getTranslation, OAC} from "../../client/OpenAudioAppContainer";
import {connect} from "react-redux";
import {VoicePeer} from "./VoicePeer";

class VoicePeerBox extends React.Component {
    static contextType = OAC;

    render() {
        let c = this.context;

        let peers = Object.values(this.props.voicePeers).map((peer) => {
            return <VoicePeer name={peer.name} uuid={peer.uuid} speaking={peer.speaking} muted={peer.muted}/>
        });

        // split array in two
        let half = Math.ceil(peers.length / 2);
        let left = peers.slice(0, half);
        let right = peers.slice(half, peers.length);

        return (
            <div className="content-section">
                <div className="content-section-title">{getTranslation(c, "vc.peerTable")}</div>
                <div className="content-card-collection">
                    <div className="content-card voicechat-player-card">
                        <ul>
                            {left}
                        </ul>
                    </div>
                    <div className="content-card voicechat-player-card">
                        <ul>
                            {right}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}
export default connect(mapStateToProps())(VoicePeerBox);
function mapStateToProps(state) {
    return {
        voicePeers: state.voiceState.peers,
    };
}