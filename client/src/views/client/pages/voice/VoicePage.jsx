import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ModerationWarning } from '../../../../components/voice/ModerationWarning';
import VoiceSettings from '../../../../components/voice/VoiceSettings';
import VoicePeerBox from '../../../../components/voice/VoicePeerBox';
import { DisabledRegionBanner } from '../../../../components/voice/DisabledRegionBanner';
import VoiceChatPiP from '../../../../components/dpip/VoiceChatPiP';

function VoicePage(props) {
  return (
    <div className="w-full">
      {props.voiceState.serverHasModeration ? <ModerationWarning /> : null}
      <VoiceSettings />
      {props.voiceState.isTemporarilyDisabled ? <DisabledRegionBanner /> : null}
      <VoicePeerBox />
      {props.voicePiPEnabled ? <VoiceChatPiP /> : null}
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
