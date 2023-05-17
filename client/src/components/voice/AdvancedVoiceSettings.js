import React from "react";
import {getTranslation} from "../../client/OpenAudioAppContainer";
import {setGlobalState} from "../../state/store";
import {connect} from "react-redux";
import {
    addMicVolumeListener,
    removeMicVolumeListener
} from "../../client/services/voice/processing/MicrophoneProcessor";
import {OaStyleCard} from "../card/OaStyleCard";

class AdvancedVoiceSettings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listenerId: null,
            isAboveThreshold: false,
            currentMicVolume: 0,
        }

        this.toggleSurroundSound = this.toggleSurroundSound.bind(this);
        this.monitoringInput = this.monitoringInput.bind(this);
        this.micSensitiveInput = this.micSensitiveInput.bind(this);
        this.micAutoSensitivityInput = this.micAutoSensitivityInput.bind(this);
        this.selectMic = this.selectMic.bind(this);
    }

    componentWillUnmount() {
        if (this.state.listenerId) {
            removeMicVolumeListener(this.state.listenerId);
        }
    }

    componentDidMount() {
        if (!this.state.listenerId) {
            let id = addMicVolumeListener((volume, isActive) => {
                this.setState({currentMicVolume: volume, isAboveThreshold: isActive});
            });
            this.setState({listenerId: id});
        }
    }

    micAutoSensitivityInput(e) {
        setGlobalState({settings: {automaticSensitivity: e.target.checked}});
    }

    micSensitiveInput(e) {
        setGlobalState({settings: {microphoneSensitivity: e.target.value}});
    }

    monitoringInput(e) {
        setGlobalState({settings: {voicechatMonitoringEnabled: e.target.checked}});
    }

    toggleSurroundSound() {
        setGlobalState({settings: {voicechatSurroundSound: !this.props.surroundSound}});
    }

    selectMic(e) {
        setGlobalState({settings: {preferredMicId: e.target.value}});
    }

    render() {
        let mics = Object.values(this.props.voiceState.mics)
        let currentMic = this.props.preferredMicId;

        let surroundText = !this.props.surroundSound ? getTranslation(null, "vc.settings.surround.enable") : getTranslation(null, "vc.settings.surround.disable");

        return (
            <div className={"p-8"}>
                <OaStyleCard fullWidth={true} dark={true}>


                    <div className="content-card sensitivty-card text-3xl">
                               <span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
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
                                   {getTranslation(null, "vc.sensitivity")}
                               </span>
                        <div className="content-card-content content-card-content-border-bottom text-xl" dangerouslySetInnerHTML={{__html: getTranslation(null, "vc.aboutSensitivity")}}>
                        </div>
                        <div className="content-card-buttons w-full  text-3xl">
                            <label htmlFor="mic-sensitive-slider"></label>
                            <div className={"w-full"}>
                                <div
                                    className={"volume-slider p-0 bg-gray-700 rounded-full h-2.5 mb-4 dark:bg-gray-700"}>
                                    <div
                                        className={"h-2.5 rounded-full" + (this.state.isAboveThreshold ? " bg-green-500" : " bg-blue-400")}
                                        style={{width: `${this.state.currentMicVolume}%`}}></div>
                                </div>
                                <input
                                    className="volume-slider reversedRange inline" onInput={this.micSensitiveInput}
                                    type="range" min="0" max="100" step="1"
                                    value={this.props.microphoneSensitivity}/>
                            </div>
                            <label className="content-pill status-button mb-5">
                                <input type="checkbox" onChange={this.micAutoSensitivityInput} checked={this.props.autoMicSensitivity}>
                                </input>
                                <span className={"inline"}>{getTranslation(null, "vc.automaticAdjustments")}</span>
                            </label>
                        </div>
                    </div>

                    <div className="content-card-collection items-stretch">
                        <div className="content-card small-vc-card  text-3xl">
                               <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                          strokeLinejoin="round"><path
                                   d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path
                                   d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12"
                                                                               y2="23"></line><line x1="8" y1="23"
                                                                                                    x2="16"
                                                                                                    y2="23"></line></svg>
                                   {getTranslation(null, "vc.input")}
                               </span>
                            <div className="content-card-content content-card-content-border-bottom">
                                {getTranslation(null, "vc.aboutInput")}
                            </div>
                            <label htmlFor="vc-mic-select"></label>
                            <select className="full soft-tex content-pill" value={currentMic} onChange={this.selectMic}>
                                {mics.map((device) => (
                                    <option key={device.id} value={device.id}>{device.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="content-card small-vc-card  text-3xl">
                               <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                     strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                     strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path
                                    d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3"></path></svg>
                                   {getTranslation(null, "vc.positionalAudio")}
                               </span>
                            <div className="content-card-content content-card-content-border-bottom">
                                {getTranslation(null, "vc.aboutPositionalAudio")}
                            </div>
                            <div className="content-card-buttons">
                                <button className="content-pill status-button green" onClick={this.toggleSurroundSound}>
                                    {surroundText}
                                </button>
                            </div>
                        </div>
                        <div className="content-card vc-monitoring-card  text-3xl">
                                <span>
                                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
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
                                    {getTranslation(null, "vc.settings.monitoring.title")}
                                </span>
                            <div className="content-card-content content-card-content-border-bottom">
                                {getTranslation(null, "vc.settings.monitoring.about")}
                            </div>
                            <div className="content-card-buttons">
                                <label className="content-pill status-button">
                                    <input type="checkbox" onChange={this.monitoringInput} checked={this.props.monitoringEnabled}>
                                    </input>
                                    <span
                                        className={"!inline !block"}>{getTranslation(null, "vc.settings.monitoring.toggle")}</span>
                                </label>
                            </div>
                        </div>

                    </div>
                </OaStyleCard>
            </div>
        );
    }
}

export default connect(mapStateToProps)(AdvancedVoiceSettings);

function mapStateToProps(state) {
    return {
        surroundSound: state.settings.voicechatSurroundSound,
        monitoringEnabled: state.settings.voicechatMonitoringEnabled,
        autoMicSensitivity: state.settings.automaticSensitivity,
        microphoneSensitivity: state.settings.microphoneSensitivity,
        preferredMicId: state.settings.preferredMicId,
        voiceState: state.voiceState,
    };
}
