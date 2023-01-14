import React from "react";
import {TabPage, TabWindow} from "../../components/tabwindow/TabWindow";
import AudioPage from "./pages/audio/AudioPage";
import VoicePage from "./pages/voice/VoicePage";
import ResetLanguageBanner from "../../components/language/ResetLanguageBanner";
import SettingsPage from "./pages/settings/SettingsPage";
import {LoadingSpinnerBox} from "../../components/loading/LoadingSpinnerBox";
import {GrayoutPage} from "../../components/layout/GrayoutPage";
import {connect} from "react-redux";

class ClientView extends React.Component {
    render() {
        let {title, message, footer} = this.props.loadingOverlay;

        return (
            <div className="app">
                <div className="wrapper">
                    <TabWindow>
                        <TabPage name="Audio" content={<AudioPage/>}/>
                        <TabPage hidden={!this.props.voiceState.ready} name="VoiceChat" content={<VoicePage/>}/>
                        <TabPage name="Settings" content={<SettingsPage/>}/>
                    </TabWindow>
                </div>

                {this.props.loadingOverlay.visible && <GrayoutPage>
                    <LoadingSpinnerBox
                        title={title}
                        message={message}
                        footer={footer}
                    />
                </GrayoutPage>}
                <ResetLanguageBanner/>
            </div>
        );
    }
}

export default connect(mapStateToProps)(ClientView);

function mapStateToProps(state) {
    return {
        loadingOverlay: state.loadingOverlay,
        voiceState: state.voiceState
    };
}