import React from "react";
import {Header} from "../../../../components/header/Header";
import {ClickPrompt} from "../../../../components/clicktoconnect/ClickPrompt";
import {getTranslation, OAC} from "../../../../client/OpenAudioAppContainer";
import {VcOnboarding} from "../../../../components/onboarding/VcOnboarding";
import AudioVolume from "../../../../components/audio/AudioVolume";
import SoundCloudPlayer from "../../../../components/soundcloud/SoundCloudPlayer";
import {connect} from "react-redux";
import {UnsupportedBanner} from "../../../../components/voice/UnsupportedBanner";

class AudioPage extends React.Component {
    static contextType = OAC;

    render() {
        if (this.context.clickLock) {
            return <ClickPrompt/>;
        }

        return (
            <div>
                <Header />
                {this.props.voiceState.enabled && !this.props.voiceState.ready && this.props.clientSupportsVoiceChat && this.props.browserSupportsVoiceChat && <VcOnboarding />}
                {this.props.voiceState.enabled && !this.props.browserSupportsVoiceChat && <UnsupportedBanner>{getTranslation(null, "vc.notCompatible")}</UnsupportedBanner>}
                {this.props.voiceState.enabled && !this.props.clientSupportsVoiceChat && <UnsupportedBanner>{getTranslation(null, "vc.badClient")}</UnsupportedBanner>}
                <AudioVolume />
                <SoundCloudPlayer />
            </div>
        );
    }
}

export default connect(mapStateToProps)(AudioPage);
function mapStateToProps(state) {
    return {
        browserSupportsVoiceChat: state.browserSupportsVoiceChat,
        voiceState: state.voiceState,
        clientSupportsVoiceChat: state.clientSupportsVoiceChat,
    };
}