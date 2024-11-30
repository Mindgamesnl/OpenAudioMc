import React from 'react';
import { connect } from 'react-redux';
import { getTranslation, msg } from '../../../../client/OpenAudioAppContainer';
import { FadeToCtx } from '../../../../components/contexts';
import LoadingView from '../../../loading/LoadingView';
import ClientView from '../../ClientView';
import { MessageModule } from '../../../../client/translations/MessageModule';
import { setGlobalState, getGlobalState } from '../../../../state/store';
import { makeid } from '../../../../client/util/random';
import { debugLog, feedDebugValue } from '../../../../client/services/debugging/DebugService';
import { DebugStatistic } from '../../../../client/services/debugging/DebugStatistic';
import { CheckboxSetting, SettingsInputs } from '../../../../components/settings/SettingsInputs';

export const settingSvg = {
  CHIME: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>',
  DARK_MODE: '<svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>',
  MIX_AND_FADE: '<svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>',
  PRELOAD: '<svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16 8v-4h-12v12.01h4" stroke-dasharray=".001 4" />  <rect x="8" y="8" width="12" height="12" rx="2" /></svg>',
  RENDER: '<svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="5 9 2 12 5 15" />  <polyline points="9 5 12 2 15 5" />  <polyline points="15 19 12 22 9 19" />  <polyline points="19 9 22 12 19 15" />  <line x1="2" y1="12" x2="22" y2="12" />  <line x1="12" y1="2" x2="12" y2="22" /></svg>',
  ECHO_CANCELLATION: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>',
  LANGUAGE: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-vocabulary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10 19h-6a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1h6a2 2 0 0 1 2 2a2 2 0 0 1 2 -2h6a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-6a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2z"></path><path d="M12 5v16"></path><path d="M7 7h1"></path><path d="M7 11h1"></path><path d="M16 7h1"></path><path d="M16 11h1"></path><path d="M16 15h1"></path></svg>',
};

const pannerTrackers = {};

function untrackPanner(id) {
  delete pannerTrackers[id];
  feedDebugValue(DebugStatistic.TRACKED_PANNERS, Object.keys(pannerTrackers).length);
}

function applyPannerProperties(pannerNode, maxDistance) {
  const setting = getGlobalState().settings.rolloffFactor;
  const audioRendering = getGlobalState().settings.spatialRenderingMode;

  pannerNode.rolloffFactor = parseFloat(setting);
  pannerNode.distanceModel = getGlobalState().settings.distanceModel;

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

function applyPannerSettings(pannerNode, maxDistance = 0) {
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

function SettingCard({ children }) {
  return (
    <div
      className="rounded-lg p-6 transition-all duration-200 hover:scale-[1.02]"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 'var(--common-border-radius)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {children}
    </div>
  );
}

function SettingsPage({ settings }) {
  const makeStateChanger = (stateName, updatePanners = false) => (event) => {
    const changedValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const newSettings = { [stateName]: changedValue };
    setGlobalState({ settings: newSettings });

    if (updatePanners) {
      Object.keys(pannerTrackers).forEach((key) => {
        applyPannerProperties(pannerTrackers[key], pannerTrackers[key].maxDistance);
      });
    }
  };

  const languageOptions = Object.entries(MessageModule.languageMappings)
    // eslint-disable-next-line no-unused-vars
    .filter(([_, mapping]) => mapping.visible)
    .map(([key, mapping]) => ({ key, value: mapping.name }));

  const onLanguageChange = (event) => {
    MessageModule.load(event.target.value);
    setTimeout(async () => {
      await FadeToCtx.fadeToComponent(<LoadingView />);
      FadeToCtx.fadeToComponent(<ClientView />);
    }, 500);
  };

  return (
    <div
      className="min-h-screen p-6 lg:p-8"
      style={{
        background: 'var(--dark-primary-background)',
        borderRadius: 'var(--common-border-radius)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <SettingCard>
            <CheckboxSetting
              title={getTranslation(null, 'settings.voicechat.echocancel.title')}
              description={getTranslation(null, 'settings.voicechat.echocancel.body')}
              icon={settingSvg.ECHO_CANCELLATION}
              isChecked={settings.voiceEchoCancellation}
              buttonText={getTranslation(null, 'settings.voicechat.echocancel.button')}
              onChange={makeStateChanger('voiceEchoCancellation')}
            />
          </SettingCard>

          <SettingCard>
            <CheckboxSetting
              title={getTranslation(null, 'settings.voicechat.chimes.title')}
              description={getTranslation(null, 'settings.voicechat.chimes.body')}
              icon={settingSvg.CHIME}
              isChecked={settings.voicechatChimesEnabled}
              buttonText={getTranslation(null, 'settings.voicechat.chimes.button')}
              onChange={makeStateChanger('voicechatChimesEnabled')}
            />
          </SettingCard>

          {/* Audio Settings */}
          <SettingCard>
            <CheckboxSetting
              title={getTranslation(null, 'settings.mix-and-fade.title')}
              description={getTranslation(null, 'settings.mix-and-fade.body')}
              icon={settingSvg.MIX_AND_FADE}
              isChecked={settings.fadeAudio}
              buttonText={getTranslation(null, 'settings.mix-and-fade.button')}
              onChange={makeStateChanger('fadeAudio')}
            />
          </SettingCard>

          <SettingCard>
            <CheckboxSetting
              title={getTranslation(null, 'settings.preload.title')}
              description={getTranslation(null, 'settings.preload.body')}
              icon={settingSvg.PRELOAD}
              isChecked={settings.prefetchMedia}
              buttonText={getTranslation(null, 'settings.preload.button')}
              onChange={makeStateChanger('prefetchMedia')}
            />
          </SettingCard>

          <SettingCard>
            <CheckboxSetting
              title={getTranslation(null, 'settings.interpolation.title')}
              description={getTranslation(null, 'settings.interpolation.body')}
              icon={settingSvg.RENDER}
              isChecked={settings.interpolationEnabled}
              buttonText={getTranslation(null, 'settings.interpolation.button')}
              onChange={makeStateChanger('interpolationEnabled')}
            />
          </SettingCard>

          {/* Spatial Audio Settings */}
          <SettingCard>
            <SettingsInputs
              title={getTranslation(null, 'settings.spatial.title')}
              description={getTranslation(null, 'settings.spatial.body')}
              icon={settingSvg.RENDER}
              options={[
                { key: 'new', value: getTranslation(null, 'settings.spatial.modern') },
                { key: 'old', value: getTranslation(null, 'settings.spatial.legacy') },
              ]}
              value={`${settings.spatialRenderingMode}`}
              onChange={makeStateChanger('spatialRenderingMode', true)}
            />
          </SettingCard>

          <SettingCard>
            <SettingsInputs
              title={getTranslation(null, 'settings.rolloff.title')}
              description={getTranslation(null, 'settings.rolloff.body')}
              icon={settingSvg.RENDER}
              value={`${settings.rolloffFactor}`}
              options={[
                { key: '0.1', value: getTranslation(null, 'settings.rolloff.01') },
                { key: '0.5', value: getTranslation(null, 'settings.rolloff.5') },
                { key: '0.8', value: getTranslation(null, 'settings.rolloff.8') },
                { key: '1', value: getTranslation(null, 'settings.rolloff.1') },
                { key: '1.2', value: getTranslation(null, 'settings.rolloff.12') },
                { key: '1.5', value: getTranslation(null, 'settings.rolloff.15') },
              ]}
              onChange={makeStateChanger('rolloffFactor', true)}
            />
          </SettingCard>

          <SettingCard>
            <SettingsInputs
              title={getTranslation(null, 'settings.distancemodel.title')}
              description={getTranslation(null, 'settings.distancemodel.body')}
              icon={settingSvg.RENDER}
              value={`${settings.distanceModel}`}
              options={[
                { key: 'linear', value: getTranslation(null, 'settings.distancemodel.linear') },
                { key: 'exponential', value: getTranslation(null, 'settings.distancemodel.exponential') },
              ]}
              onChange={makeStateChanger('distanceModel', true)}
            />
          </SettingCard>

          {/* Language Settings */}
          <SettingCard>
            <SettingsInputs
              title={msg('settings.language.title')}
              description={msg('settings.language.body')}
              icon={settingSvg.LANGUAGE}
              options={languageOptions}
              onChange={onLanguageChange}
              value={MessageModule.currentLangKey}
            />
          </SettingCard>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  settings: state.settings,
  voiceState: state.voiceState,
});

export default connect(mapStateToProps)(SettingsPage);

// Helper function for object size calculation
Object.size = function crawlSize(obj) {
  let size = 0;
  obj.keys().forEach(() => {
    size++;
  });
  return size;
};

// Export other utilities
export {
  pannerTrackers,
  untrackPanner,
  applyPannerProperties,
  applyPannerSettings,
};
