import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ModerationWarning } from '../../../../components/voice/ModerationWarning';
import VoiceSettings from '../../../../components/voice/VoiceSettings';
import VoicePeerBox from '../../../../components/voice/VoicePeerBox';
import { DisabledRegionBanner } from '../../../../components/voice/DisabledRegionBanner';
import VoiceChatPiP from '../../../../components/dpip/VoiceChatPiP';
import { DocumentPictureInPicture } from '../../../../components/dpip/DocumentPictureInPicture';

function VoicePage(props) {
  return (
    <div className="w-full">
      {props.voiceState.serverHasModeration ? <ModerationWarning /> : null}
      <VoiceSettings />
      {(props.voiceState.isTemporarilyDisabled || props.voiceState.isMutedServerSide) ? <DisabledRegionBanner /> : null}
      <VoicePeerBox />
      {props.voicePiPEnabled ? <DocumentPictureInPicture><VoiceChatPiP /></DocumentPictureInPicture> : null}
    </div>
  );
}

VoicePage.propTypes = {
  voiceState: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(VoicePage);
function mapStateToProps(state) {
  return {
    voiceState: state.voiceState,
    voicePiPEnabled: state.settings.voicePiPEnabled,
  };
}
