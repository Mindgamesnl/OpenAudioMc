import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../../../../components/header/Header';
import { VcOnboarding } from '../../../../components/onboarding/VcOnboarding';
import AudioVolume from '../../../../components/audio/AudioVolume';
import SoundCloudPlayer from '../../../../components/soundcloud/SoundCloudPlayer';
import { UnsupportedBanner } from '../../../../components/voice/UnsupportedBanner';
import { msg } from '../../../../client/OpenAudioAppContainer';

const HeaderMemo = React.memo(Header);
const VolumeMemo = React.memo(AudioVolume);

function AudioPage(props) {
  return (
    <>
      <div className="h-full w-full audio-page-bg overflow-y-auto">
        {/* Main Content Container */}
        <div className="min-h-full flex flex-col lg:flex-row items-center justify-center p-6 lg:p-8 gap-8 lg:gap-12">

          {/* Left Section - Audio Controls */}
          <div className="flex-1 max-w-2xl">
            <div className="backdrop-blur-md bg-black bg-opacity-10 rounded-2xl p-8 lg:p-10 border border-white border-opacity-5 shadow-lg">
              <VolumeMemo />
              <div className="mt-8">
                <HeaderMemo />
              </div>
            </div>
          </div>

          {/* Right Section - Voice Chat */}
          <div className="flex-1 max-w-2xl">
            {props.voiceState.enabled && !props.voiceState.ready && props.clientSupportsVoiceChat && props.browserSupportsVoiceChat ? (
              <div className="backdrop-blur-md bg-black bg-opacity-10 rounded-2xl p-8 lg:p-10 border border-white border-opacity-5 shadow-lg">
                <VcOnboarding />
              </div>
            ) : null}

            {props.voiceState.enabled && !props.browserSupportsVoiceChat ? (
              <div className="backdrop-blur-md bg-black bg-opacity-10 rounded-2xl p-8 lg:p-10 border border-white border-opacity-5 shadow-lg">
                <UnsupportedBanner>{msg('vc.notCompatible')}</UnsupportedBanner>
              </div>
            ) : null}

            {props.voiceState.enabled && !props.clientSupportsVoiceChat ? (
              <div className="backdrop-blur-md bg-black bg-opacity-10 rounded-2xl p-8 lg:p-10 border border-white border-opacity-5 shadow-lg">
                <UnsupportedBanner>{msg('vc.badClient')}</UnsupportedBanner>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <SoundCloudPlayer />
    </>
  );
}

export default connect(mapStateToProps)(AudioPage);

function mapStateToProps(state) {
  return {
    browserSupportsVoiceChat: state.browserSupportsVoiceChat,
    voiceState: state.voiceState,
    clientSupportsVoiceChat: state.clientSupportsVoiceChat,
  };
}
