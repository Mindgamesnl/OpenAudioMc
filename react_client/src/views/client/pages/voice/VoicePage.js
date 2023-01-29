import React from "react";
import {ModerationWarning} from "../../../../components/voice/ModerationWarning";
import VoiceSettings from "../../../../components/voice/VoiceSettings";
import VoicePeerBox from "../../../../components/voice/VoicePeerBox";
import {DisabledRegionBanner} from "../../../../components/voice/DisabledRegionBanner";
import {connect} from "react-redux";

class VoicePage extends React.Component {
    render() {
        return (
            <div className="w-full">
                {this.props.voiceState.serverHasModeration && <ModerationWarning />}
                <VoiceSettings />
                {this.props.voiceState.isTemporarilyDisabled && <DisabledRegionBanner />}
                <VoicePeerBox />
            </div>
        )
    }
}

export default connect(mapStateToProps)(VoicePage);
function mapStateToProps(state) {
    return {
        voiceState: state.voiceState
    };
}