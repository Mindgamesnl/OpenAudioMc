import {OAC} from "../../../../client/OpenAudioAppContainer";
import React from "react";
import {ModerationWarning} from "../../../../components/voice/ModerationWarning";
import VoiceSettings from "../../../../components/voice/VoiceSettings";
import VoicePeerBox from "../../../../components/voice/VoicePeerBox";
import {store} from "../../../../state/store";

export class VoicePage extends React.Component {
    static contextType = OAC;

    render() {
        let serverHasModeration = store.getState().voiceState.serverHasModeration;

        return (
            <div className="content-section voice-section">
                {serverHasModeration && <ModerationWarning />}
                <VoiceSettings />
                <VoicePeerBox />
            </div>
        )
    }
}