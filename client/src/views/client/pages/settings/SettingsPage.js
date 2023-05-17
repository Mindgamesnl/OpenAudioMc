import React from "react";
import {CheckboxSetting} from "../../../../components/settings/CheckboxSetting";
import {DropdownSetting} from "../../../../components/settings/DropdownSetting";
import {getTranslation, handleStreamerMode} from "../../../../client/OpenAudioAppContainer";
import {getGlobalState, setGlobalState} from "../../../../state/store";
import {connect} from "react-redux";
import {makeid} from "../../../../client/util/random";
import {debugLog, feedDebugValue} from "../../../../client/services/debugging/DebugService";
import {DebugStatistic} from "../../../../client/services/debugging/DebugStatistic";
import AdvancedVoiceSettings from "../../../../components/voice/AdvancedVoiceSettings";

export const settingSvg = {
    CHIME: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>`,
    DARK_MODE: `<svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>`,
    MIX_AND_FADE: `<svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>`,
    PRELOAD: `<svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16 8v-4h-12v12.01h4" stroke-dasharray=".001 4" />  <rect x="8" y="8" width="12" height="12" rx="2" /></svg>`,
    RENDER: `<svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="5 9 2 12 5 15" />  <polyline points="9 5 12 2 15 5" />  <polyline points="15 19 12 22 9 19" />  <polyline points="19 9 22 12 19 15" />  <line x1="2" y1="12" x2="22" y2="12" />  <line x1="12" y1="2" x2="12" y2="22" /></svg>`,
    STREAM_ICON: `<svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />  <circle cx="12" cy="13" r="4" /></svg>`
}

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.makeStateChanger = this.makeStateChanger.bind(this);
    }

    makeStateChanger(stateName, updatePanners = false) {
        return function (event) {
            // check event was a checkbox
            let changedValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;
            // make new settings box
            let newSettings = {};
            newSettings[stateName] = changedValue;
            setGlobalState({settings: newSettings});

            if (updatePanners) {
                for (let pannerTrackersKey in pannerTrackers) {
                    applyPannerProperties(pannerTrackers[pannerTrackersKey], pannerTrackers[pannerTrackersKey].maxDistance)
                }
            }
        }
    }

    render() {
        let c = null;

        if (this.props.settings.streamermodeEnabled) {
            handleStreamerMode();
        }

        return (
            <div className="content-section">
                <div className="content-section-title">Settings</div>

                {this.props.voiceState.ready && <AdvancedVoiceSettings/>}

                <div className="content-card-collection items-stretch">
                    <CheckboxSetting
                        title={getTranslation(c, "settings.voicechat.chimes.title")}
                        description={getTranslation(c, "settings.voicechat.chimes.body")}
                        icon={settingSvg.CHIME}
                        isChecked={this.props.settings.voicechatChimesEnabled}
                        buttonText={getTranslation(c, "settings.voicechat.chimes.button")}
                        onChange={this.makeStateChanger("voicechatChimesEnabled")} />

                    <CheckboxSetting
                        title={getTranslation(c, "settings.mix-and-fade.title")}
                        description={getTranslation(c, "settings.mix-and-fade.body")}
                        icon={settingSvg.MIX_AND_FADE}
                        isChecked={this.props.settings.fadeAudio}
                        buttonText={getTranslation(c, "settings.mix-and-fade.button")}
                        onChange={this.makeStateChanger("fadeAudio")} />

                    <CheckboxSetting
                        title={getTranslation(c, "settings.preload.title")}
                        description={getTranslation(c, "settings.preload.body")}
                        icon={settingSvg.PRELOAD}
                        isChecked={this.props.settings.prefetchMedia}
                        buttonText={getTranslation(c, "settings.preload.button")}
                        onChange={this.makeStateChanger("prefetchMedia")} />

                    <CheckboxSetting
                        title={getTranslation(c, "settings.interpolation.title")}
                        description={getTranslation(c, "settings.interpolation.body")}
                        icon={settingSvg.RENDER}
                        isChecked={this.props.settings.interpolationEnabled}
                        buttonText={getTranslation(c, "settings.interpolation.button")}
                        onChange={this.makeStateChanger("interpolationEnabled")} />

                    <CheckboxSetting
                        title={getTranslation(c, "settings.streamermode.title")}
                        description={getTranslation(c, "settings.streamermode.body")}
                        icon={settingSvg.RENDER}
                        isChecked={this.props.settings.streamermodeEnabled}
                        buttonText={getTranslation(c, "settings.streamermode.button")}
                        onChange={this.makeStateChanger("streamermodeEnabled")} />

                    <DropdownSetting
                        title={getTranslation(c, "settings.spatial.title")}
                        description={getTranslation(c, "settings.spatial.body")}
                        icon={settingSvg.RENDER}
                        options={[
                            {key:'new', value:getTranslation(c, "settings.spatial.modern")},
                            {key:'old', value:getTranslation(c, "settings.spatial.legacy")}
                        ]}
                        value={this.props.settings.spatialRenderingMode + ""}
                        onChange={this.makeStateChanger("spatialRenderingMode", true)} />

                    <DropdownSetting
                        title={getTranslation(c, "settings.rolloff.title")}
                        description={getTranslation(c, "settings.rolloff.body")}
                        icon={settingSvg.RENDER}
                        value={this.props.settings.rolloffFactor + ""}
                        options={[
                            {key:'0.1', value:getTranslation(c, "settings.rolloff.01")},
                            {key:'0.5', value:getTranslation(c, "settings.rolloff.5")},
                            {key:'0.8', value:getTranslation(c, "settings.rolloff.8")},
                            {key:'1', value:getTranslation(c, "settings.rolloff.1")},
                            {key:'1.2', value:getTranslation(c, "settings.rolloff.12")},
                            {key:'1.5', value:getTranslation(c, "settings.rolloff.15")}
                        ]}
                        onChange={this.makeStateChanger("rolloffFactor", true)} />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(SettingsPage);
function mapStateToProps(state) {
    return {
        settings: state.settings,
        voiceState: state.voiceState
    }
}

var pannerTrackers = {}

export function untrackPanner(id) {
    console.log("Untracking panner " + id)
    delete pannerTrackers[id];
    feedDebugValue(DebugStatistic.TRACKED_PANNERS, Object.keys(pannerTrackers).length)
}


function applyPannerProperties(pannerNode, maxDistance, forceExpontential = false) {
    let setting = getGlobalState().settings.rolloffFactor;
    let audioRendering = getGlobalState().settings.spatialRenderingMode;
    if (setting > 0.4 || forceExpontential) {
        pannerNode.rolloffFactor = parseFloat(setting);
        pannerNode.distanceModel = "exponential";
    } else {
        pannerNode.rolloffFactor = parseFloat(setting);
        pannerNode.distanceModel = "linear";
    }

    if (audioRendering === "new") {
        pannerNode.panningModel = 'equalpower';
        pannerNode.coneOuterGain = 1;
        pannerNode.coneInnerAngle = 90;
        pannerNode.maxDistance = maxDistance;
    } else {
        pannerNode.panningModel = 'HRTF';
        pannerNode.coneOuterGain = 1;
        pannerNode.coneInnerAngle = 120;
        pannerNode.maxDistance = maxDistance;
    }
}

export function applyPannerSettings(pannerNode, maxDistance = 0, forceExponential = false) {
    if (maxDistance === 0) {
        debugLog("No max distance provided, using global state")
        maxDistance = getGlobalState().voiceState.radius
    }
    applyPannerProperties(pannerNode, maxDistance, forceExponential)
    let id = makeid(5);
    pannerTrackers[id] = pannerNode
    feedDebugValue(DebugStatistic.TRACKED_PANNERS, Object.keys(pannerTrackers).length)
    return id;
}

Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};