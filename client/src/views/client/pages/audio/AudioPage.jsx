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

  // Check if voice chat section should be shown
  const showVoiceOnboarding = props.voiceState.enabled && !props.voiceState.ready && props.clientSupportsVoiceChat && props.browserSupportsVoiceChat;
  const showVoiceError = props.voiceState.enabled && (!props.browserSupportsVoiceChat || !props.clientSupportsVoiceChat);

  return (
    <BaseSegmentedPage noFooter>
      <div className="w-full max-w-5xl mx-auto px-6 py-8">
        {/* Two column layout when voice chat is available */}
        <div className={`flex flex-col ${showVoiceOnboarding || showVoiceError ? 'lg:flex-row' : ''} gap-6`}>
          {/* Main Card */}
          <div className={`${showVoiceOnboarding || showVoiceError ? 'lg:flex-1' : 'max-w-2xl mx-auto w-full'}`}>
            <div
              className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl h-full"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)',
              }}
            >
              {/* Header with gradient accent */}
              <div
                className="h-44 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-accent) 0%, color-mix(in srgb, var(--primary-accent) 60%, #1a1a2e) 100%)',
                }}
              >
                {/* Decorative gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  }}
                />

                {/* Logo in top right */}
                {logoImage ? (
                  <div className="absolute top-6 right-8">
                    <img
                      src={logoImage}
                      alt="Server"
                      className="w-14 h-14 rounded-xl object-contain bg-black/20 p-2 backdrop-blur-sm"
                    />
                  </div>
                ) : null}

                {/* Avatar positioned in header */}
                <div className="absolute bottom-4 left-8">
                  <div
                    className="p-1.5 rounded-2xl shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary-accent) 0%, color-mix(in srgb, var(--primary-accent) 70%, #000) 100%)',
                    }}
                  >
                    <img
                      src={`https://visage.surgeplay.com/bust/512/${currentUser?.uuid}`}
                      alt="Profile"
                      className="w-24 h-24 rounded-xl object-cover bg-gray-800"
                    />
                  </div>
                </div>

                {/* Playing indicator in header */}
                {props.hasPlayingMedia ? (
                  <div className="absolute bottom-6 right-8 flex items-center gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: '#fff' }}
                    />
                    <span className="text-white/90 text-sm font-medium">{msg('home.playing')}</span>
                  </div>
                ) : null}
              </div>

              {/* User Info Section - below the header */}
              <div className="px-8 pt-6 pb-2">
                <h1 className="text-white text-2xl font-bold">
                  {msg('home.welcome')}
                </h1>
                <p className="text-gray-400 text-base mt-1">{msg('home.subtitle')}</p>
              </div>

              {/* Volume Control Section */}
              <div className="p-8 pt-4">
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: 'color-mix(in srgb, var(--primary-accent) 20%, transparent)' }}
                      >
                        <svg className="w-5 h-5" style={{ color: 'var(--primary-accent)' }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                      </div>
                      <span className="text-gray-200 text-base font-semibold">{msg('home.audioControls')}</span>
                    </div>
                    <div
                      className="px-5 py-2.5 rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg, color-mix(in srgb, var(--primary-accent) 25%, transparent) 0%, color-mix(in srgb, var(--primary-accent) 15%, transparent) 100%)',
                        border: '1px solid color-mix(in srgb, var(--primary-accent) 30%, transparent)',
                      }}
                    >
                      <span
                        className="text-3xl font-bold tabular-nums"
                        style={{ color: 'var(--primary-accent)' }}
                      >
                        {props.volume}
                        <span className="text-lg ml-0.5">%</span>
                      </span>
                    </div>
                  </div>

                  {/* Volume Slider */}
                  <AudioVolume />

                  <p
                    className="text-gray-500 text-sm mt-4 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: msg('home.volumeContext') }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Voice Chat Section - side panel */}
          {showVoiceOnboarding ? (
            <div className="lg:w-80 flex-shrink-0">
              <div
                className="bg-gray-900 rounded-3xl p-6 h-full"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--primary-accent) 20%, transparent)' }}
                >
                  <svg className="w-6 h-6" style={{ color: 'var(--primary-accent)' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                  </svg>
                </div>
                <VcOnboarding />
              </div>
            </div>
          ) : null}

          {/* Voice Chat Errors - side panel */}
          {props.voiceState.enabled && !props.browserSupportsVoiceChat ? (
            <div className="lg:w-80 flex-shrink-0">
              <div
                className="bg-gray-900 rounded-3xl p-6 h-full"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)',
                }}
              >
                <UnsupportedBanner>{msg('vc.notCompatible')}</UnsupportedBanner>
              </div>
            </div>
          ) : null}

          {props.voiceState.enabled && !props.clientSupportsVoiceChat && props.browserSupportsVoiceChat ? (
            <div className="lg:w-80 flex-shrink-0">
              <div
                className="bg-gray-900 rounded-3xl p-6 h-full"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)',
                }}
              >
                <UnsupportedBanner>{msg('vc.badClient')}</UnsupportedBanner>
              </div>
            </div>
          ) : null}
        </div>

        {/* SoundCloud - outside main card */}
        <div className="mt-6 max-w-2xl mx-auto">
          <SoundCloudPlayer />
        </div>

        {/* Footer info */}
        <p className="text-center text-gray-500 text-sm mt-8">
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
