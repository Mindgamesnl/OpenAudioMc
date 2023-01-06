import React from "react";
import {getTranslation, OAC} from "../../client/OpenAudioAppContainer";
import {AdvancedVoiceSettings} from "./AdvancedVoiceSettings";

export class VoiceSettings extends React.Component {
    static contextType = OAC;

    constructor(props) {
        super(props);

        this.state = {
            vcVolume: 100,
            advancedSettings: false
        }

        this.onVolumeChange = this.onVolumeChange.bind(this);
        this.toggleAdvancedSettings = this.toggleAdvancedSettings.bind(this);
    }

    onVolumeChange(e) {
        this.setState({vcVolume: e.target.value});
    }

    toggleAdvancedSettings() {
        this.setState({advancedSettings: !this.state.advancedSettings});
    }

    render() {
        let c = this.context;
        return (
            <div>
                <div className="content-section-title">{getTranslation(c,"vc.settings")}</div>
                <div className="content-card-collection items-stretch">
                    <div className="content-card small-card order-2 2xl:order-1">
                               <span>
                                <img className="avatar small-avatar"
                                     src={"https://cdn.discordapp.com/avatars/123456789012345678/123456789012345678.png?size=128"}/>
                                   {getTranslation(c,"vc.statusTitle")}
                               </span>
                        <div className="content-card-content content-card-content-border-bottom">
                            {getTranslation(c,"vc.myStatus")}
                        </div>
                        <div className="content-card-buttons w-full">
                            <button className="content-pill status-button green w-full" id="vc-mic-mute"
                                    onClick="onMicMutePress()">
                                {getTranslation(c,"vc.toggleMicrophone")}
                            </button>
                        </div>
                    </div>


                    <div className="content-card vc-volume-card order-1 2xl:order-2">
                               <span>
                                {getTranslation(c,"vc.settings.globalVolumeTitle")}
                               </span>
                        <div className="content-card-content content-card-content-border-bottom">
                            {getTranslation(c,"vc.settings.globalVolumeAbout")}
                        </div>
                        <div className="content-card-buttons w-full">
                            <input onInput={this.onVolumeChange}
                                   className="volume-slider w-full"
                                   type="range" min="0" max="120" step="1" value={this.state.vcVolume}/>
                            <h1>
                                {this.state.vcVolume}
                            </h1>
                        </div>
                    </div>

                    <div className="content-card vc-settings-toggle-card order-3">
                               <span>
                                {getTranslation(c,"vc.settings.toggleMenuTitle")}
                               </span>
                        <div className="content-card-content content-card-content-border-bottom ">
                            {getTranslation(c,"vc.settings")}
                        </div>
                        <div className="content-card-buttons w-full">
                            <button className="content-pill status-button green w-full" onClick={this.toggleAdvancedSettings}>
                                {getTranslation(c,"vc.settings.toggleMenu")}
                            </button>
                        </div>
                    </div>

                </div>
                {this.state.advancedSettings && <AdvancedVoiceSettings />}
            </div>
        );
    }
}