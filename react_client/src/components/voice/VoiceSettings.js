import React from "react";
import {getTranslation, OAC} from "../../client/OpenAudioAppContainer";
import AdvancedVoiceSettings from "./AdvancedVoiceSettings";
import {setGlobalState, store} from "../../state/store";
import {connect} from "react-redux";

class VoiceSettings extends React.Component {
    static contextType = OAC;

    constructor(props) {
        super(props);

        this.state = {
            advancedSettings: false
        }

        this.onVolumeChange = this.onVolumeChange.bind(this);
        this.toggleAdvancedSettings = this.toggleAdvancedSettings.bind(this);
        this.toggleMicMute = this.toggleMicMute.bind(this);
    }

    onVolumeChange(e) {
        setGlobalState({settings: {voicechatVolume: e.target.value}});
    }

    toggleAdvancedSettings() {
        this.setState({advancedSettings: !this.state.advancedSettings});
    }

    toggleMicMute() {
        let muted = !this.props.voicechatMuted;
        setGlobalState({settings: {voicechatMuted: muted}});
    }

    render() {
        let c = this.context;
        let micButton = <button className="content-pill status-button green w-full" onClick={this.toggleMicMute}>{getTranslation(c, "vc.muteMic")}</button>

        if (this.props.voicechatMuted) {
            micButton = <button className="content-pill status-button red w-full" onClick={this.toggleMicMute}>{getTranslation(c, "vc.unmuteMic")}</button>
        }

        let uuid = store.getState().currentUser.uuid;

        return (
            <div>
                <div className="content-section-title">{getTranslation(c, "vc.settings")}</div>
                <div className="content-card-collection items-stretch">
                    <div className="content-card small-card order-2 2xl:order-1">
                               <span>
                                <img className={"avatar small-avatar" + (this.props.voiceState.isSpeaking ? " speaking" : "")}
                                     src={"https://visage.surgeplay.com/bust/512/" + uuid}/>
                                   {getTranslation(c, "vc.statusTitle")}
                               </span>
                        <div className="content-card-content content-card-content-border-bottom">
                            {getTranslation(c, "vc.myStatus")}
                        </div>
                        <div className="content-card-buttons w-full">
                            {micButton}
                        </div>
                    </div>


                    <div className="content-card vc-volume-card order-1 2xl:order-2">
                               <span>
                                {getTranslation(c, "vc.settings.globalVolumeTitle")}
                               </span>
                        <div className="content-card-content content-card-content-border-bottom">
                            {getTranslation(c, "vc.settings.globalVolumeAbout")}
                        </div>
                        <div className="content-card-buttons w-full">
                            <input onInput={this.onVolumeChange}
                                   className="volume-slider w-full"
                                   type="range" min="0" max="120" step="1" value={this.props.voicechatVolume}/>
                            <h1>
                                {this.props.voicechatVolume}
                            </h1>
                        </div>
                    </div>

                    <div className="content-card vc-settings-toggle-card order-3">
                               <span>
                                {getTranslation(c, "vc.settings.toggleMenuTitle")}
                               </span>
                        <div className="content-card-content content-card-content-border-bottom ">
                            {getTranslation(c, "vc.settings")}
                        </div>
                        <div className="content-card-buttons w-full">
                            <button className="content-pill status-button green w-full"
                                    onClick={this.toggleAdvancedSettings}>
                                {getTranslation(c, "vc.settings.toggleMenu")}
                            </button>
                        </div>
                    </div>

                </div>
                {this.state.advancedSettings && <AdvancedVoiceSettings/>}
            </div>
        );
    }
}

export default connect(mapStateToProps)(VoiceSettings);
function mapStateToProps(state) {
    return {
        voicechatMuted: state.settings.voicechatMuted,
        voicechatVolume: state.settings.voicechatVolume,
        voiceState: state.voiceState
    };
}