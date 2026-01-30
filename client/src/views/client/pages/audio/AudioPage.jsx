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
      <div className="w-full max-w-3xl mx-auto px-4 py-8">
        {/* Main Card */}
        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
          {/* Header with accent color band */}
          <div
            className="h-2 w-full"
            style={{ backgroundColor: 'var(--primary-accent)' }}
          />

          <div className="grid md:grid-cols-12">
            {/* Left Column: User Profile */}
            <div className="md:col-span-5 p-8 bg-gray-800/30 md:border-r border-gray-800 flex flex-col items-center justify-center text-center">
              <div className="relative mb-4">
                <img
                  src={`https://visage.surgeplay.com/bust/512/${currentUser?.uuid}`}
                  alt="Profile"
                  className="w-24 h-24 rounded-2xl shadow-lg bg-gray-800 object-cover"
                />
                {logoImage ? (
                  <img
                    src={logoImage}
                    alt="Server"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-gray-800 border-4 border-gray-900 shadow-sm"
                  />
                ) : null}
              </div>

              <h1 className="text-white text-xl font-bold mb-1">
                {msg('home.welcome')}
              </h1>
              <p className="text-gray-400 text-sm font-medium mb-6">{msg('home.subtitle')}</p>

              {props.hasPlayingMedia ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/80 rounded-full border border-gray-700/50 backdrop-blur-sm">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: 'var(--primary-accent)' }}
                  />
                  <span className="text-gray-300 text-xs font-medium tracking-wide">{msg('home.playing')}</span>
                </div>
              ) : null}
            </div>

            {/* Right Column: Controls */}
            <div className="md:col-span-7 p-8 flex flex-col justify-center gap-6">
              {/* Volume Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-300 font-medium text-sm uppercase tracking-wider">{msg('home.audioControls')}</span>
                  <span
                    className="text-3xl font-bold tabular-nums"
                    style={{ color: 'var(--primary-accent)' }}
                  >
                    {props.volume}
                    %
                  </span>
                </div>

                <AudioVolume />

                <p
                  className="text-gray-500 text-xs mt-4 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: msg('home.volumeContext') }}
                />
              </div>

              {/* Voice Chat Section - only if enabled */}
              {props.voiceState.enabled && !props.voiceState.ready && props.clientSupportsVoiceChat && props.browserSupportsVoiceChat ? (
                <div className="border-t border-gray-800 pt-6">
                  <VcOnboarding />
                </div>
              ) : null}

              {/* Voice Chat Errors */}
              {props.voiceState.enabled && !props.browserSupportsVoiceChat ? (
                <div className="border-t border-gray-800 pt-6">
                  <UnsupportedBanner>{msg('vc.notCompatible')}</UnsupportedBanner>
                </div>
              ) : null}

              {props.voiceState.enabled && !props.clientSupportsVoiceChat ? (
                <div className="border-t border-gray-800 pt-6">
                  <UnsupportedBanner>{msg('vc.badClient')}</UnsupportedBanner>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* SoundCloud - outside main card */}
        <div className="mt-8">
          <SoundCloudPlayer />
        </div>

        {/* Footer info */}
        <p className="text-center text-gray-500 text-sm mt-8 opacity-75">
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
