import React from 'react';
import { connect } from 'react-redux';
import { VcOnboarding } from '../../../../components/onboarding/VcOnboarding';
import AudioVolume from '../../../../components/audio/AudioVolume';
import SoundCloudPlayer from '../../../../components/soundcloud/SoundCloudPlayer';
import { UnsupportedBanner } from '../../../../components/voice/UnsupportedBanner';
import { msg } from '../../../../client/OpenAudioAppContainer';
import { BaseSegmentedPage } from '../../../../components/layout/BaseSegmentedPage';

function AudioPage(props) {
  const { currentUser } = props;

  let logoImage;
  if (props.logoImage != null && props.logoImage.indexOf('assets/') !== 0) {
    logoImage = props.logoImage;
  }

  return (
    <BaseSegmentedPage noFooter>
      <div className="w-full max-w-md mx-auto px-4 py-6">
        {/* Main Card */}
        <div className="bg-gray-900 rounded-2xl overflow-hidden">
          {/* Header with accent color band */}
          <div
            className="h-2"
            style={{ backgroundColor: 'var(--primary-accent)' }}
          />

          {/* User Info Section */}
          <div className="p-6 pb-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <img
                  src={`https://visage.surgeplay.com/bust/512/${currentUser?.uuid}`}
                  alt="Profile"
                  className="w-14 h-14 rounded-xl object-cover bg-gray-800"
                />
                {logoImage ? (
                  <img
                    src={logoImage}
                    alt="Server"
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-md bg-gray-800 border-2 border-gray-900"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-white text-lg font-semibold truncate">
                  {msg('home.welcome')}
                </h1>
                <p className="text-gray-500 text-sm">{msg('home.subtitle')}</p>
              </div>
              {props.hasPlayingMedia ? (
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: 'var(--primary-accent)' }}
                  />
                  <span className="text-gray-400 text-xs">{msg('home.playing')}</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-800 mx-6" />

          {/* Volume Control Section */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm font-medium">{msg('home.audioControls')}</span>
              <span
                className="text-2xl font-semibold tabular-nums"
                style={{ color: 'var(--primary-accent)' }}
              >
                {props.volume}
                %
              </span>
            </div>

            {/* Volume Slider */}
            <AudioVolume />

            <p
              className="text-gray-600 text-xs mt-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: msg('home.volumeContext') }}
            />
          </div>

          {/* Voice Chat Section - only if enabled */}
          {props.voiceState.enabled && !props.voiceState.ready && props.clientSupportsVoiceChat && props.browserSupportsVoiceChat ? (
            <>
              <div className="h-px bg-gray-800 mx-6" />
              <div className="p-6">
                <VcOnboarding />
              </div>
            </>
          ) : null}

          {/* Voice Chat Errors */}
          {props.voiceState.enabled && !props.browserSupportsVoiceChat ? (
            <>
              <div className="h-px bg-gray-800 mx-6" />
              <div className="p-6">
                <UnsupportedBanner>{msg('vc.notCompatible')}</UnsupportedBanner>
              </div>
            </>
          ) : null}

          {props.voiceState.enabled && !props.clientSupportsVoiceChat ? (
            <>
              <div className="h-px bg-gray-800 mx-6" />
              <div className="p-6">
                <UnsupportedBanner>{msg('vc.badClient')}</UnsupportedBanner>
              </div>
            </>
          ) : null}
        </div>

        {/* SoundCloud - outside main card */}
        <SoundCloudPlayer />

        {/* Footer info */}
        <p className="text-center text-gray-600 text-xs mt-6">
          {msg('home.footerTip')}
        </p>
      </div>
    </BaseSegmentedPage>
  );
}

export default connect(mapStateToProps)(AudioPage);

function mapStateToProps(state) {
  return {
    browserSupportsVoiceChat: state.browserSupportsVoiceChat,
    voiceState: state.voiceState,
    clientSupportsVoiceChat: state.clientSupportsVoiceChat,
    volume: state.settings.normalVolume,
    hasPlayingMedia: state.hasPlayingMedia,
    currentUser: state.currentUser,
    logoImage: state.settings.logoImage,
  };
}
