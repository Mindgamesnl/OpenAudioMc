import {setGlobalState} from "../../../../../state/store";

export function HandleVoiceModerationStatus(data) {
    let isMod = data.isModerating;

    setGlobalState({
        voiceState: {
            isModerating: isMod
        }
    })
}