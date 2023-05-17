import React from "react";
import {getTranslation, OAC} from "../../client/OpenAudioAppContainer";
import AdvancedVoiceSettings from "./AdvancedVoiceSettings";
import {setGlobalState} from "../../state/store";
import {connect} from "react-redux";
import {reRenderAllGainNodes} from "../../client/services/voice/VoiceModule";
import {Tooltip} from "../tooltip/tooltip";

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
        reRenderAllGainNodes();
    }

    toggleAdvancedSettings() {
        this.setState({advancedSettings: !this.state.advancedSettings});
    }

    toggleMicMute() {
        let muted = !this.props.voicechatMuted;
        setGlobalState({settings: {voicechatMuted: muted}});
    }

    render() {
        // are we moderating? then only show that banner
        let c = this.context;
        if (this.props.voiceState.isModerating) {
            return (
                <div className="content-section  pt-5">
                    <div className="content-wrapper-box audio-content full bg-red-800">
                        <div className="content-wrapper-context full">
                            <div className="content-text full">
                                <div className={"text-center"}>
                                    <p className="soft-text">
                                        {getTranslation(c, "vc.youAreModerating")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        let micButton = <button className="content-pill status-button green text-center" onClick={this.toggleMicMute}>
            <svg className="h-8 text-gray-900 ml-1" fill="none" viewBox="0 0 19 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
            </svg>
        </button>

        if (this.props.voicechatMuted) {
            micButton = <button className="content-pill status-button red" onClick={this.toggleMicMute}>
                <svg className="h-8 text-white ml-1" fill="none" viewBox="0 0 19 24" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="1" y1="1" x2="23" y2="23"/>
                    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>
                    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/>
                    <line x1="12" y1="19" x2="12" y2="23"/>
                    <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
            </button>
        }


        let uuid;
        if (this.props.currentUser && this.props.currentUser.uuid) {
            uuid = this.props.currentUser.uuid;
        } else {
            // setup placeholder
            uuid = "00000000-0000-0000-0000-000000000000";
        }

        return (
            <div>
                <div className="content-section flex justify-center">
                    <div className="content-card-collection items-stretch">
                        <div className="content-card small-card order-2 2xl:order-1">
                               <span className={"content-card-content-border-bottom"}>
                                <img alt={"Speaking indictor"}
                                     className={"avatar " + (this.props.voiceState.isSpeaking ? " speaking " : "") + (this.props.voicechatMuted ? " muted-self" : "")}
                                     src={"https://visage.surgeplay.com/bust/512/" + uuid}/>
                                   {getTranslation(c, "vc.myStatus")}
                               </span>
                            <div className="content-card-buttons w-full">
                                <div className="flex justify-center w-full">
                                    {micButton}

                                    <Tooltip
                                        title={getTranslation(c, "vc.noMicInputYetTitle")}
                                        text={getTranslation(c, "vc.noMicInputYetBody")}
                                        visible={!this.props.voiceState.microphoneTriggeredOnce && this.props.voiceState.microphoneSanityPrompt}
                                    >
                                        <button className="ml-2 content-pill status-button green text-center"
                                                onClick={this.toggleAdvancedSettings}>
                                            <svg className="h-8 text-gray-900 ml-2" fill="none" viewBox="0 0 24 24"
                                                 stroke="currentColor"
                                                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="3"/>
                                                <path
                                                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                                            </svg>
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>

                            <div className="content-card-buttons w-full">
                                <div className="w-full content-pill status-button green text-center inline">
                                    <div className="flex justify-center w-full">

                                        <svg className="h-8 text-gray-900" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor"
                                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                                        </svg>

                                        <input onInput={this.onVolumeChange}
                                               className="common-rounded-top common-rounded-bottom w-full"
                                               type="range" min="0" max="120" step="1"
                                               value={this.props.voicechatVolume}/>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="content-card vc-volume-card order-1 2xl:order-2">
                            <div className="mx-auto max-w-7xl py-5 px-6 lg:px-8">
                                <div className="text-center">
                                    <p className="mt-1 text-4xl font-bold tracking-tight text-gray-200 sm:text-5xl lg:text-6xl">
                                        {getTranslation(c, "vc.hero.title")}
                                    </p>
                                    <p className="mx-auto mt-5 max-w-xl text-xl text-gray-300">
                                        {getTranslation(c, "vc.hero.subtitle")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.advancedSettings && <AdvancedVoiceSettings/>}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(VoiceSettings);

function mapStateToProps(state) {
    return {
        voicechatMuted: state.settings.voicechatMuted,
        voicechatVolume: state.settings.voicechatVolume,
        voiceState: state.voiceState,
        currentUser: state.currentUser
    };
}