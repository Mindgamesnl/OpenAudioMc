import {OAC} from "../../../../client/OpenAudioAppContainer";
import React from "react";
import {ModerationWarning} from "../../../../components/voice/ModerationWarning";
import {VoiceSettings} from "../../../../components/voice/VoiceSettings";

export class VoicePage extends React.Component {
    static contextType = OAC;

    render() {
        return (
            <div className="content-section voice-section">
                <ModerationWarning />
                <VoiceSettings />
            </div>
        )
    }
}