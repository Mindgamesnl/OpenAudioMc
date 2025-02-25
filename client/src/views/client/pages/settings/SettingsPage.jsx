import React from 'react';
import { connect } from 'react-redux';
import { getTranslation, msg } from '../../../../client/OpenAudioAppContainer';
import { FadeToCtx } from '../../../../components/contexts';
import LoadingView from '../../../loading/LoadingView';
import ClientView from '../../ClientView';
import { MessageModule } from '../../../../client/translations/MessageModule';
import { setGlobalState } from '../../../../state/store';
import { CheckboxSetting, SettingsInputs } from '../../../../components/settings/SettingsInputs';
import { RangeSetting } from '../../../../components/settings/RangeSettingsInput';

// Event system for spatial audio settings changes
export const SpatialAudioEvents = {
  listeners: [],

  // Register a listener for a specific setting
  addListener: (callback) => {
    SpatialAudioEvents.listeners.push(callback);
  },

  // Remove a listener
  removeListener: (callback) => {
    SpatialAudioEvents.listeners = SpatialAudioEvents.listeners.filter((listener) => listener !== callback);
  },

  // Notify all listeners about a setting change
  notifyChange: () => {
    SpatialAudioEvents.listeners.forEach((listener) => listener());
  },
};

export const settingSvg = {
  CHIME: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>',
  DARK_MODE: '<svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>',
  MIX_AND_FADE: '<svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>',
  PRELOAD: '<svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16 8v-4h-12v12.01h4" stroke-dasharray=".001 4" />  <rect x="8" y="8" width="12" height="12" rx="2" /></svg>',
  RENDER: '<svg viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="5 9 2 12 5 15" />  <polyline points="9 5 12 2 15 5" />  <polyline points="15 19 12 22 9 19" />  <polyline points="19 9 22 12 19 15" />  <line x1="2" y1="12" x2="22" y2="12" />  <line x1="12" y1="2" x2="12" y2="22" /></svg>',
  ECHO_CANCELLATION: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>',
  LANGUAGE: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-vocabulary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10 19h-6a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1h6a2 2 0 0 1 2 2a2 2 0 0 1 2 -2h6a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-6a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2z"></path><path d="M12 5v16"></path><path d="M7 7h1"></path><path d="M7 11h1"></path><path d="M16 7h1"></path><path d="M16 11h1"></path><path d="M16 15h1"></path></svg>',
  SPATIAL_AUDIO: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>',
  STEREO_SEPARATION: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>',
  BYPASS: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
};

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

function SettingSeparator({ title }) {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 mt-8 mb-4">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 rounded-full" />
    </div>
  );
}

function SettingsPage({ settings }) {
  const makeStateChanger = (stateName) => (event) => {
    const changedValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const newSettings = { [stateName]: changedValue };
    setGlobalState({ settings: newSettings });

    // Notify listeners about the change
    if (stateName.startsWith('spatial')) {
      SpatialAudioEvents.notifyChange();
    }
  };

  // Handler for range inputs
  const handleRangeChange = (stateName) => (value) => {
    setGlobalState({ settings: { [stateName]: value } });
    SpatialAudioEvents.notifyChange();
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
          {/* General Audio Settings */}
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

          {/* Spatial Audio Settings Separator */}
          <SettingSeparator title={getTranslation(null, 'settings.spatial.section.title') || 'Spatial Audio Settings'} />

          {/* New Spatial Audio Controls */}
          <SettingCard>
            <RangeSetting
              title={getTranslation(null, 'settings.spatial.stereo.title') || 'Stereo Separation'}
              description={getTranslation(null, 'settings.spatial.stereo.body') || 'Controls the intensity of stereo separation effect'}
              min={0.5}
              max={8}
              step={0.1}
              value={settings.spatialStereoSeparation || 5}
              onChange={handleRangeChange('spatialStereoSeparation')}
              valueLabels={[
                { value: 0.5, label: getTranslation(null, 'settings.spatial.stereo.low') || 'Low' },
                { value: 1.5, label: getTranslation(null, 'settings.spatial.stereo.medium') || 'Medium' },
                { value: 5, label: getTranslation(null, 'settings.spatial.stereo.high') || 'High' },
                { value: 8, label: getTranslation(null, 'settings.spatial.stereo.max') || 'Max' },
              ]}
            />
          </SettingCard>

          <SettingCard>
            <RangeSetting
              title={getTranslation(null, 'settings.spatial.rolloff.title') || 'Rolloff Factor'}
              description={getTranslation(null, 'settings.spatial.rolloff.body') || 'Controls how quickly sound fades with distance'}
              min={0}
              max={4}
              step={0.1}
              value={settings.spatialRolloffFactor || 1.5}
              onChange={handleRangeChange('spatialRolloffFactor')}
              valueLabels={[
                { value: 0, label: getTranslation(null, 'settings.spatial.rolloff.none') || 'None' },
                { value: 2.5, label: getTranslation(null, 'settings.spatial.rolloff.default') || 'Default' },
                { value: 4, label: getTranslation(null, 'settings.spatial.rolloff.max') || 'Maximum' },
              ]}
            />
          </SettingCard>

          <SettingCard>
            <CheckboxSetting
              title={getTranslation(null, 'settings.spatial.bypass.title') || 'Bypass Spatial Audio'}
              description={getTranslation(null, 'settings.spatial.bypass.body') || 'Disables all spatial audio processing'}
              isChecked={settings.spatialBypass || false}
              buttonText={getTranslation(null, 'settings.spatial.bypass.button') || 'Toggle Bypass'}
              onChange={makeStateChanger('spatialBypass')}
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
