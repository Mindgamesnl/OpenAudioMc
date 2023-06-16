import React from "react";
import TabWindow, {TabPage} from "../../components/tabwindow/TabWindow";
import AudioPage from "./pages/audio/AudioPage";
import VoicePage from "./pages/voice/VoicePage";
import ResetLanguageBanner from "../../components/language/ResetLanguageBanner";
import SettingsPage from "./pages/settings/SettingsPage";
import {LoadingSpinnerBox} from "../../components/loading/LoadingSpinnerBox";
import {GrayoutPage} from "../../components/layout/GrayoutPage";
import {connect} from "react-redux";
import {StaticFooter} from "../../components/footer/StaticFooter";
import {InputModal} from "../../components/modal/InputModal";

import {SpeakerSvg} from "../../components/icons/speaker";
import {MicrophoneSVG} from "../../components/icons/microphone";
import {CogSVG} from "../../components/icons/cog";
import {DebugSVG} from "../../components/icons/debug";
import {getTranslation} from "../../client/OpenAudioAppContainer";
import {OaStyleCard} from "../../components/card/OaStyleCard";
import DebugPage from "./pages/debug/DebugPage";

class ClientView extends React.Component {
    render() {
        let {title, message, footer} = this.props.loadingOverlay;

        return (
            <div className="app">
                <div className="wrapper">
                    <TabWindow>
                        <TabPage name={getTranslation(null, "navbar.audio")} content={<AudioPage/>} buttonContent={<SpeakerSvg />}/>
                        <TabPage name={getTranslation(null, "navbar.vc")} hidden={!this.props.voiceState.ready} buttonContent={<MicrophoneSVG />} content={<VoicePage/>}/>
                        <TabPage name={getTranslation(null, "navbar.settings")} hidden={!this.props.navbarDetails} buttonContent={<CogSVG />} content={<SettingsPage/>}/>
                        <TabPage name={getTranslation(null, "navbar.debug")} hidden={!this.props.debugMode} buttonContent={<DebugSVG />} content={<DebugPage />} />
                    </TabWindow>
                </div>

                {this.props.loadingOverlay.visible && <GrayoutPage>
                    {this.props.browserSupportIsLimited && <OaStyleCard title={""}>
                        {getTranslation(null, "vc.operaWarning")}
                    </OaStyleCard>}
                    <LoadingSpinnerBox
                        title={title}
                        message={message}
                        footer={footer}
                    />
                </GrayoutPage>}
                <ResetLanguageBanner/>

                {this.props.fixedFooter && <StaticFooter>{this.props.fixedFooter}</StaticFooter>}
                {this.props.inputModal.visible && <InputModal />}
            </div>
        );
    }
}

export default connect(mapStateToProps)(ClientView);

function mapStateToProps(state) {
    return {
        debugMode: state.debug,
        inputModal: state.inputModal,
        fixedFooter: state.fixedFooter,
        loadingOverlay: state.loadingOverlay,
        voiceState: state.voiceState,
        browserSupportIsLimited: state.browserSupportIsLimited,
        navbarDetails: state.navbarDetails
    };
}