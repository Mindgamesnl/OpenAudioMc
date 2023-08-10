import React from 'react';
import { connect } from 'react-redux';
import { Header } from '../../../../components/header/Header';
import ClickPrompt from '../../../../components/clicktoconnect/ClickPrompt';
import { VcOnboarding } from '../../../../components/onboarding/VcOnboarding';
import AudioVolume from '../../../../components/audio/AudioVolume';
import SoundCloudPlayer from '../../../../components/soundcloud/SoundCloudPlayer';
import { UnsupportedBanner } from '../../../../components/voice/UnsupportedBanner';
import { msg } from '../../../../client/OpenAudioAppContainer';

function AudioPage(props) {
  if (props.clickLock) {
    return <ClickPrompt />;
  }

  return (
    <div className="pb-4">
      <Header />
      {props.voiceState.enabled && !props.voiceState.ready && props.clientSupportsVoiceChat && props.browserSupportsVoiceChat
        ? <VcOnboarding /> : null}
      {props.voiceState.enabled && !props.browserSupportsVoiceChat
        ? <UnsupportedBanner>{msg('vc.notCompatible')}</UnsupportedBanner> : null}
      {props.voiceState.enabled && !props.clientSupportsVoiceChat
        ? <UnsupportedBanner>{msg('vc.badClient')}</UnsupportedBanner> : null}
      <AudioVolume />
      <SoundCloudPlayer />
    </div>
  );
}

export default connect(mapStateToProps)(AudioPage);
function mapStateToProps(state) {
  return {
    browserSupportsVoiceChat: state.browserSupportsVoiceChat,
    voiceState: state.voiceState,
    clientSupportsVoiceChat: state.clientSupportsVoiceChat,
    clickLock: state.clickLock,
  };
}
