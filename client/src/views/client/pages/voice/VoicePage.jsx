import React from 'react';
import { connect } from 'react-redux';
import VoicePeerBox from '../../../../components/voice/VoicePeerBox';
import './voicepage.css';
import VoiceQuickSettings from '../../../../components/voice/ui/VoiceQuickSettings';
import GeneralVoiceSettings from '../../../../components/voice/ui/GeneralVoiceSettings';
import { ModerationWarning } from '../../../../components/voice/ModerationWarning';

function VoicePage(props) {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row pt-3">
      <div className="flex w-full lg:w-1/5 flex-col">
        <div className="flex-col w-full h-full p-2">
          <VoiceQuickSettings />
        </div>

        <div className="w-full text-center">
          {props.voiceState.serverHasModeration ? <ModerationWarning /> : null}
          <GeneralVoiceSettings />
        </div>
      </div>
      <div className="w-full lg:w-4/5 pr-4">
        <VoicePeerBox />
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(VoicePage);
function mapStateToProps(state) {
  return {
    voiceState: state.voiceState,
  };
}
