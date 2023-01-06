import React from "react";
import {Header} from "../../../components/header/Header";
import {ClickPrompt} from "../../../components/clicktoconnect/ClickPrompt";
import {OAC} from "../../../client/OpenAudioAppContainer";
import {VcOnboarding} from "../../../components/onboarding/VcOnboarding";
import {AudioVolume} from "../../../components/audio/AudioVolume";

export class AudioPage extends React.Component {
    static contextType = OAC;

    render() {
        if (this.context.clickLock) {
            return <ClickPrompt/>;
        }

        return (
            <div>
                <Header />
                <VcOnboarding />
                <AudioVolume />
            </div>
        );
    }
}