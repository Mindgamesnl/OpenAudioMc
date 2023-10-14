import React from 'react';
import { connect } from 'react-redux';
import { CheckboxSetting } from '../../../../components/settings/CheckboxSetting';
import { DropdownSetting } from '../../../../components/settings/DropdownSetting';
import { getTranslation, msg } from '../../../../client/OpenAudioAppContainer';
import { getGlobalState, setGlobalState } from '../../../../state/store';
import { makeid } from '../../../../client/util/random';
import { debugLog, feedDebugValue } from '../../../../client/services/debugging/DebugService';
import { DebugStatistic } from '../../../../client/services/debugging/DebugStatistic';
import { MessageModule } from '../../../../client/translations/MessageModule';
import { FadeToCtx } from '../../../../components/contexts';
import LoadingView from '../../../loading/LoadingView';
import ClientView from '../../ClientView';

export const settingSvg = {
  CHIME: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>',
  DARK_MODE: '<svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>',
  MIX_AND_FADE: '<svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>',
  PRELOAD: '<svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16 8v-4h-12v12.01h4" stroke-dasharray=".001 4" />  <rect x="8" y="8" width="12" height="12" rx="2" /></svg>',
  RENDER: '<svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="5 9 2 12 5 15" />  <polyline points="9 5 12 2 15 5" />  <polyline points="15 19 12 22 9 19" />  <polyline points="19 9 22 12 19 15" />  <line x1="2" y1="12" x2="22" y2="12" />  <line x1="12" y1="2" x2="12" y2="22" /></svg>',
  ECHO_CANCELLATION: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>',
  LANGUAGE: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-vocabulary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">\n'
    + '   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>\n'
    + '   <path d="M10 19h-6a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1h6a2 2 0 0 1 2 2a2 2 0 0 1 2 -2h6a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-6a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2z"></path>\n'
    + '   <path d="M12 5v16"></path>\n'
    + '   <path d="M7 7h1"></path>\n'
    + '   <path d="M7 11h1"></path>\n'
    + '   <path d="M16 7h1"></path>\n'
    + '   <path d="M16 11h1"></path>\n'
    + '   <path d="M16 15h1"></path>\n'
    + '</svg>',
};

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.makeStateChanger = this.makeStateChanger.bind(this);
  }

  makeStateChanger(stateName, updatePanners = false) {
    return function updateState(event) {
      // check event was a checkbox
      const changedValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      // make new settings box
      const newSettings = {};
      newSettings[stateName] = changedValue;
      setGlobalState({ settings: newSettings });

      if (updatePanners) {
        Object.keys(pannerTrackers).forEach((key) => {
          applyPannerProperties(pannerTrackers[key], pannerTrackers[key].maxDistance);
        });
      }
    };
  }

  render() {
    const c = null;

    const languageOptions = [];
    // remap the languageMappings from the module
    const nativeMappings = MessageModule.languageMappings;
    Object.keys(nativeMappings).forEach((key) => {
      const mapping = nativeMappings[key];
      if (mapping.visible) {
        languageOptions.push({ key, value: mapping.name });
      }
    });

    const onLanguageChange = (event) => {
      MessageModule.load(event.target.value);
      setTimeout(async () => {
        await FadeToCtx.fadeToComponent(<LoadingView />);
        FadeToCtx.fadeToComponent(<ClientView />);
      }, 500);
    };

    return (
      <div className="content-section lg:px-12 overflow-y-scroll">
        <div className="content-section-title">Settings</div>
        <div className="content-card-collection grid grid-cols-1 gap-2 xl:grid-cols-4 xl:gap-4">
          <CheckboxSetting
            title={getTranslation(c, 'settings.voicechat.echocancel.title')}
            description={getTranslation(c, 'settings.voicechat.echocancel.body')}
            icon={settingSvg.ECHO_CANCELLATION}
            isChecked={this.props.settings.voiceEchoCancellation}
            buttonText={getTranslation(c, 'settings.voicechat.echocancel.button')}
            onChange={this.makeStateChanger('voiceEchoCancellation')}
          />

          <CheckboxSetting
            title={getTranslation(c, 'settings.voicechat.chimes.title')}
            description={getTranslation(c, 'settings.voicechat.chimes.body')}
            icon={settingSvg.CHIME}
            isChecked={this.props.settings.voicechatChimesEnabled}
            buttonText={getTranslation(c, 'settings.voicechat.chimes.button')}
            onChange={this.makeStateChanger('voicechatChimesEnabled')}
          />

          <CheckboxSetting
            title={getTranslation(c, 'settings.mix-and-fade.title')}
            description={getTranslation(c, 'settings.mix-and-fade.body')}
            icon={settingSvg.MIX_AND_FADE}
            isChecked={this.props.settings.fadeAudio}
            buttonText={getTranslation(c, 'settings.mix-and-fade.button')}
            onChange={this.makeStateChanger('fadeAudio')}
          />

          <CheckboxSetting
            title={getTranslation(c, 'settings.preload.title')}
            description={getTranslation(c, 'settings.preload.body')}
            icon={settingSvg.PRELOAD}
            isChecked={this.props.settings.prefetchMedia}
            buttonText={getTranslation(c, 'settings.preload.button')}
            onChange={this.makeStateChanger('prefetchMedia')}
          />

          <CheckboxSetting
            title={getTranslation(c, 'settings.interpolation.title')}
            description={getTranslation(c, 'settings.interpolation.body')}
            icon={settingSvg.RENDER}
            isChecked={this.props.settings.interpolationEnabled}
            buttonText={getTranslation(c, 'settings.interpolation.button')}
            onChange={this.makeStateChanger('interpolationEnabled')}
          />

          <DropdownSetting
            title={getTranslation(c, 'settings.spatial.title')}
            description={getTranslation(c, 'settings.spatial.body')}
            icon={settingSvg.RENDER}
            options={[
              { key: 'new', value: getTranslation(c, 'settings.spatial.modern') },
              { key: 'old', value: getTranslation(c, 'settings.spatial.legacy') },
            ]}
            value={`${this.props.settings.spatialRenderingMode}`}
            onChange={this.makeStateChanger('spatialRenderingMode', true)}
          />

          <DropdownSetting
            title={getTranslation(c, 'settings.rolloff.title')}
            description={getTranslation(c, 'settings.rolloff.body')}
            icon={settingSvg.RENDER}
            value={`${this.props.settings.rolloffFactor}`}
            options={[
              { key: '0.1', value: getTranslation(c, 'settings.rolloff.01') },
              { key: '0.5', value: getTranslation(c, 'settings.rolloff.5') },
              { key: '0.8', value: getTranslation(c, 'settings.rolloff.8') },
              { key: '1', value: getTranslation(c, 'settings.rolloff.1') },
              { key: '1.2', value: getTranslation(c, 'settings.rolloff.12') },
              { key: '1.5', value: getTranslation(c, 'settings.rolloff.15') },
            ]}
            onChange={this.makeStateChanger('rolloffFactor', true)}
          />

          <DropdownSetting
            title={getTranslation(c, 'settings.distancemodel.title')}
            description={getTranslation(c, 'settings.distancemodel.body')}
            icon={settingSvg.RENDER}
            value={`${this.props.settings.distanceModel}`}
            options={[
              { key: 'linear', value: getTranslation(c, 'settings.distancemodel.linear') },
              { key: 'exponential', value: getTranslation(c, 'settings.distancemodel.exponential') },
            ]}
            onChange={this.makeStateChanger('distanceModel', true)}
          />

          <DropdownSetting
            title={msg('settings.language.title')}
            description={msg('settings.language.body')}
            icon={settingSvg.LANGUAGE}
            options={languageOptions}
            onChange={onLanguageChange}
            value={MessageModule.currentLangKey}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SettingsPage);
function mapStateToProps(state) {
  return {
    settings: state.settings,
    voiceState: state.voiceState,
  };
}

let pannerTrackers = {};

export function untrackPanner(id) {
  delete pannerTrackers[id];
  feedDebugValue(DebugStatistic.TRACKED_PANNERS, Object.keys(pannerTrackers).length);
}

function applyPannerProperties(pannerNode, maxDistance) {
  const setting = getGlobalState().settings.rolloffFactor;
  const audioRendering = getGlobalState().settings.spatialRenderingMode;

  pannerNode.rolloffFactor = parseFloat(setting);

  if (setting <= 0.4) {
    // keep old behaviour, where the linear algorithm was forced when RollOff <= 40%
    pannerNode.distanceModel = 'linear';
  } else {
    pannerNode.distanceModel = getGlobalState().settings.distanceModel;
  }

  if (audioRendering === 'new') {
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

export function applyPannerSettings(pannerNode, maxDistance = 0) {
  if (maxDistance === 0) {
    debugLog('No max distance provided, using global state');
    maxDistance = getGlobalState().voiceState.radius;
  }
  applyPannerProperties(pannerNode, maxDistance);
  const id = makeid(5);
  pannerTrackers[id] = pannerNode;
  feedDebugValue(DebugStatistic.TRACKED_PANNERS, Object.keys(pannerTrackers).length);
  return id;
}

Object.size = function crawlSize(obj) {
  let size = 0;
  obj.keys().forEach(() => {
    size++;
  });
  return size;
};
