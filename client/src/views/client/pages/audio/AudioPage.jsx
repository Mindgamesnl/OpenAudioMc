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
      <div className="container mx-auto my-8 z-10 flex flex-col lg:flex-row items-center justify-center gap-8 px-4">
        {/* Left panel - User avatar and welcome text */}
        <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start space-y-8 pt-8">
          <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start space-y-8 pt-8">
            <div className="text-center lg:text-left">
              <div className="relative inline-block w-fit mx-auto lg:mx-0">
                {/* Main image bubble */}
                <img
                  src={`https://visage.surgeplay.com/bust/512/${currentUser?.uuid}`}
                  alt="Profile"
                  className="block w-48 h-48 rounded-full border-2 object-cover"
                  style={{ borderColor: 'var(--accent-color, #6366f1)' }}
                />
                {logoImage ? (
                  <img
                    src={logoImage}
                    alt="Secondary"
                    className="absolute -bottom-3 -right-3 w-20 h-20 rounded-full"
                  />
                ) : null}
              </div>
            </div>
          </div>

          <div className="text-gray-400 max-w-md">
            <h1 className="text-white text-3xl font-bold">
              {msg('home.welcome')}
            </h1>
            <p
              className="text-base text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: msg('home.header') }}
            />
          </div>
        </div>

        {/* Right Section - Audio Controls (like login page) */}
        <div className="w-full lg:w-7/12 max-w-2xl">
          <div
            className="backdrop-blur-xl bg-black bg-opacity-30 rounded-2xl p-8 border shadow-2xl"
            style={{ borderColor: 'var(--primary-accent)', borderWidth: '1px' }}
          >
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-br opacity-10 rounded-2xl"
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--primary-accent), transparent 70%)',
              }}
            />

            {/* Glowing accent border effect */}
            <div
              className="absolute -inset-1 rounded-2xl blur opacity-20"
              style={{ backgroundColor: 'var(--primary-accent)' }}
            />

            <div className="relative z-10 space-y-8">
              {/* Volume Control Card */}
              <div className="group">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <div
                      className="absolute -inset-1 rounded-full blur opacity-60 group-hover:opacity-100 transition-all duration-300"
                      style={{ backgroundColor: 'var(--primary-accent)' }}
                    />
                    <div
                      className="relative w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold"
                      style={{ backgroundColor: 'var(--primary-accent)' }}
                    >
                      ♪
                    </div>
                  </div>
                  <div>
                    <h2 className="text-white text-xl font-bold">{msg('home.audioControls')}</h2>
                  </div>
                </div>

                {/* Volume Circle */}
                <div className="flex justify-center mb-6">
                  <div className="w-48 h-48 relative group">
                    {/* Outer glow ring */}
                    <div
                      className="absolute -inset-2 rounded-full blur opacity-30 group-hover:opacity-50 transition-all duration-300"
                      style={{ backgroundColor: 'var(--primary-accent)' }}
                    />

                    {/* Background circle with accent border */}
                    <div
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: 'var(--primary-accent)', opacity: 0.3 }}
                    />

                    {/* Volume arc */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="white"
                        strokeOpacity="0.1"
                        strokeWidth="1"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="var(--primary-accent)"
                        strokeOpacity="0.9"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${props.volume * 2.83} 283`}
                        className="transition-all duration-500 ease-out"
                        style={{
                          filter: 'drop-shadow(0 0 12px var(--primary-accent))',
                        }}
                      />
                    </svg>

                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div
                        className="text-5xl font-thin text-white mb-1 tracking-wider"
                        style={{ textShadow: '0 0 20px var(--primary-accent)' }}
                      >
                        {props.volume}
                      </div>
                      <div className="text-xs text-gray-300 font-light tracking-widest uppercase opacity-80">
                        Volume
                      </div>
                      {props.hasPlayingMedia ? (
                        <div className="mt-3 flex items-center space-x-2">
                          <div
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ backgroundColor: 'var(--primary-accent)' }}
                          />
                          <span className="text-xs text-gray-400 font-medium">Playing</span>
                        </div>
                      ) : null}
                    </div>

                    {/* Hidden range input for interaction */}
                    <AudioVolume />
                  </div>
                </div>

                <div className="flex items-center align-middle space-x-4 justify-center">
                  <p
                    className="text-gray-400 max-w-md text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: msg('home.volumeContext') }}
                  />
                </div>
              </div>
            </div>
          </div>
          {props.voiceState.enabled && !props.voiceState.ready && props.clientSupportsVoiceChat && props.browserSupportsVoiceChat ? (
            <div className="backdrop-blur-md mt-12 bg-black bg-opacity-10 rounded-2xl p-8 lg:p-10 border border-white border-opacity-5 shadow-lg">
              <VcOnboarding />
            </div>
          ) : null}

          {props.voiceState.enabled && !props.browserSupportsVoiceChat ? (
            <div className="backdrop-blur-md mt-12 bg-black bg-opacity-10 rounded-2xl p-8 lg:p-10 border border-white border-opacity-5 shadow-lg">
              <UnsupportedBanner>{msg('vc.notCompatible')}</UnsupportedBanner>
            </div>
          ) : null}

          {props.voiceState.enabled && !props.clientSupportsVoiceChat ? (
            <div className="backdrop-blur-md mt-12 bg-black bg-opacity-10 rounded-2xl p-8 lg:p-10 border border-white border-opacity-5 shadow-lg">
              <UnsupportedBanner>{msg('vc.badClient')}</UnsupportedBanner>
            </div>
          ) : null}
        </div>
        <SoundCloudPlayer />
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
