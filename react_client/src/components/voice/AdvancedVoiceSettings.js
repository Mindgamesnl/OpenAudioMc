import React from "react";
import {getTranslation, OAC} from "../../client/OpenAudioAppContainer";
import {setGlobalState, store} from "../../state/store";
import {connect} from "react-redux";

class AdvancedVoiceSettings extends React.Component {
    static contextType = OAC;

    constructor(props) {
        super(props);

        let currentSettings = store.getState().settings;

        this.state = {
            microphoneDevices: [],
            surroundSound: currentSettings.voicechatSurroundSound,
            monitoringEnabled: currentSettings.voicechatMonitoringEnabled,
            autoMicSensitivity: currentSettings.automaticSensitivity
        }

        this.toggleSurroundSound = this.toggleSurroundSound.bind(this);
        this.monitoringInput = this.monitoringInput.bind(this);
        this.micSensitiveInput = this.micSensitiveInput.bind(this);
        this.micAutoSensitivityInput = this.micAutoSensitivityInput.bind(this);
    }

    micAutoSensitivityInput(e) {
        this.setState({autoMicSensitivity: e.target.checked});
        setGlobalState({settings: {autoMicSensitivity: e.target.checked}});
    }

    micSensitiveInput(e) {
        setGlobalState({settings: {microphoneSensitivity: e.target.value}});
    }

    monitoringInput(e) {
        this.setState({monitoringEnabled: e.target.checked});
        setGlobalState({settings: {voicechatMonitoringEnabled: e.target.checked}});
    }

    toggleSurroundSound() {
        this.setState({surroundSound: !this.state.surroundSound});
        setGlobalState({settings: {voicechatSurroundSound: !this.state.surroundSound}});
    }

    render() {
        let c = this.context;

        let surroundText = !this.state.surroundSound ? getTranslation(c, "vc.settings.surround.enable") : getTranslation(c, "vc.settings.surround.disable");

        return (
            <div>
                <div className="content-section vc-settings-box">
                    <div className="content-section-title">Voicechat Settings</div>
                    <div className="content-card-collection items-stretch">
                        <div className="content-card small-vc-card">
                               <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                          strokeLinejoin="round"><path
                                   d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path
                                   d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12"
                                                                               y2="23"></line><line x1="8" y1="23"
                                                                                                    x2="16"
                                                                                                    y2="23"></line></svg>
                                   {getTranslation(c, "vc.input")}
                               </span>
                            <div className="content-card-content content-card-content-border-bottom">
                                {getTranslation(c, "vc.aboutInput")}
                            </div>
                            <label htmlFor="vc-mic-select"></label>
                            <select className="full soft-tex content-pill">
                                <option value="default">Default</option>
                                {this.state.microphoneDevices.map((device) => (
                                    <option value={device}>{device}</option>
                                ))}
                            </select>
                        </div>
                        <div className="content-card small-vc-card">
                               <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                     stroke-width="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                     strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path
                                    d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3"></path></svg>
                                   {getTranslation(c, "vc.positionalAudio")}
                               </span>
                            <div className="content-card-content content-card-content-border-bottom">
                                {getTranslation(c, "vc.aboutPositionalAudio")}
                            </div>
                            <div className="content-card-buttons">
                                <button className="content-pill status-button green" onClick={this.toggleSurroundSound}>
                                    {surroundText}
                                </button>
                            </div>
                        </div>
                        <div className="content-card vc-monitoring-card">
                                <span>
                                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                      strokeLinecap="round" strokeLinejoin="round">  <line x1="4" y1="21" x2="4"
                                                                                           y2="14"/>  <line x1="4"
                                                                                                            y1="10"
                                                                                                            x2="4"
                                                                                                            y2="3"/>  <line
                                     x1="12" y1="21" x2="12" y2="12"/>  <line x1="12" y1="8" x2="12" y2="3"/>  <line
                                     x1="20" y1="21" x2="20"
                                     y2="16"/>  <line x1="20"
                                                      y1="12"
                                                      x2="20"
                                                      y2="3"/>  <line
                                     x1="1" y1="14" x2="7" y2="14"/>  <line x1="9" y1="8" x2="15" y2="8"/>  <line
                                     x1="17" y1="16" x2="23"
                                     y2="16"/></svg>
                                    {getTranslation(c, "vc.settings.monitoring.title")}
                                </span>
                            <div className="content-card-content content-card-content-border-bottom">
                                {getTranslation(c, "vc.settings.monitoring.about")}
                            </div>
                            <div className="content-card-buttons">
                                <label className="content-pill status-button">
                                    <input type="checkbox" onChange={this.monitoringInput}>
                                    </input>
                                    <span className={"inline"}>{getTranslation(c, "vc.settings.monitoring.toggle")}</span>
                                </label>
                            </div>
                        </div>
                        <div className="content-card sensitivty-card">
                               <span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                     strokeLinecap="round" strokeLinejoin="round">  <line x1="4" y1="21" x2="4"
                                                                                          y2="14"/>  <line x1="4"
                                                                                                           y1="10"
                                                                                                           x2="4"
                                                                                                           y2="3"/>  <line
                                    x1="12" y1="21" x2="12" y2="12"/>  <line x1="12" y1="8" x2="12" y2="3"/>  <line
                                    x1="20" y1="21" x2="20"
                                    y2="16"/>  <line x1="20"
                                                     y1="12"
                                                     x2="20"
                                                     y2="3"/>  <line
                                    x1="1" y1="14" x2="7" y2="14"/>  <line x1="9" y1="8" x2="15" y2="8"/>  <line
                                    x1="17" y1="16" x2="23"
                                    y2="16"/></svg>
                                   {getTranslation(c, "vc.sensitivity")}
                               </span>
                            <div className="content-card-content content-card-content-border-bottom">
                                {getTranslation(c, "vc.aboutSensitivity")}
                            </div>
                            <div className="content-card-buttons w-full">
                                <label htmlFor="mic-sensitive-slider"></label>
                                <input
                                    className="volume-slider reversedRange inline" onInput={this.micSensitiveInput}
                                    type="range" min="0" max="100" step="1" value={this.props.microphoneSensitivity} />
                                <label className="content-pill status-button">
                                    <input type="checkbox" onChange={this.micAutoSensitivityInput}>
                                    </input>
                                    <span className={"inline"}>{getTranslation(c, "vc.automaticAdjustments")}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(AdvancedVoiceSettings);
function mapStateToProps(state) {
    return {
        microphoneSensitivity: state.settings.microphoneSensitivity
    };
}
