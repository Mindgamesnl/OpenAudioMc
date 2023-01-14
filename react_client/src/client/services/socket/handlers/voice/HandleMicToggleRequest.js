import {getGlobalState, setGlobalState} from "../../../../../state/store";

export function HandleMicToggleRequest(data) {
    let isMuted = getGlobalState().settings.voicechatMuted;
    setGlobalState({settings: {voicechatMuted: !isMuted}});
}