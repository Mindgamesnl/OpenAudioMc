import React from "react";
import {TabPage, TabWindow} from "../../components/tabwindow/TabWindow";
import AudioPage from "./pages/audio/AudioPage";
import VoicePage from "./pages/voice/VoicePage";
import ResetLanguageBanner from "../../components/language/ResetLanguageBanner";
import SettingsPage from "./pages/settings/SettingsPage";
import {LoadingSpinnerBox} from "../../components/loading/LoadingSpinnerBox";
import {GrayoutPage} from "../../components/layout/GrayoutPage";
import {connect} from "react-redux";
import {StaticFooter} from "../../components/footer/StaticFooter";
import {InputModal} from "../../components/modal/InputModal";
import {setGlobalState} from "../../state/store";
import {reportVital} from "../../client/util/vitalreporter";
import {toast} from "react-toastify";
import {VoiceModule} from "../../client/services/voice/VoiceModule";

class ClientView extends React.Component {

    submitFeedback = () => {
        setGlobalState({
            inputModal: {
                visible: true,
                title: 'Feedback',
                message: 'Please enter your feedback or bug report below:',
                callback: function (message) {
                    if (message) {
                        reportVital("metrics:feedback | " + message + " | " + JSON.stringify(VoiceModule.peerManager.gatherDebugState()))
                        toast.success('❤️ Thank you for your feedback!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }
                }
            }
        })
    }

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

                <StaticFooter onClick={this.submitFeedback}>
                    <p className={"cursor-pointer"}>
                        Public beta of our new client. Click here to report a bug or submit feedback.
                    </p>
                </StaticFooter>

                {this.props.fixedFooter && <StaticFooter>{this.props.fixedFooter}</StaticFooter>}
                {this.props.inputModal.visible && <InputModal />}
            </div>
        );
    }
}

export default connect(mapStateToProps)(ClientView);

function mapStateToProps(state) {
    return {
        inputModal: state.inputModal,
        fixedFooter: state.fixedFooter,
        loadingOverlay: state.loadingOverlay,
        voiceState: state.voiceState
    };
}