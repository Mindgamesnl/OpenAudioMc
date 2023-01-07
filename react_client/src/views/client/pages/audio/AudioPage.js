import React from "react";
import {Header} from "../../../../components/header/Header";
import {ClickPrompt} from "../../../../components/clicktoconnect/ClickPrompt";
import {OAC} from "../../../../client/OpenAudioAppContainer";
import {VcOnboarding} from "../../../../components/onboarding/VcOnboarding";
import AudioVolume from "../../../../components/audio/AudioVolume";
import SoundCloudPlayer from "../../../../components/soundcloud/SoundCloudPlayer";
import {connect} from "react-redux";

class AudioPage extends React.Component {
    static contextType = OAC;

    render() {
        if (this.context.clickLock) {
            return <ClickPrompt/>;
        }

        return (
            <div>
                <Header />
                {this.props.voiceState.enabled && <VcOnboarding />}
                <AudioVolume />
                <SoundCloudPlayer />
            </div>
        );
    }
}

export default connect(mapStateToProps)(AudioPage);
function mapStateToProps(state) {
    return {
        voiceState: state.voiceState,
    };
}