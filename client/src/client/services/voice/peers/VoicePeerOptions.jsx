import { getGlobalState } from '../../../../state/store';
import { debugLog } from '../../debugging/DebugService';

export class VoicePeerOptions {
  constructor(
    visible = true,
    spatialAudio = getGlobalState().settings.voicechatSurroundSound,
    displayOverride = null,
  ) {
    this.visible = visible;
    this.spatialAudio = spatialAudio;
    this.displayOverride = displayOverride;
  }
}

export function peerOptionsFromObj(obj) {
  debugLog('peerOptionsFromObj', obj);
  return new VoicePeerOptions(
    (obj.visible !== undefined) ? obj.visible : true,
    (obj.spatialAudio !== undefined) ? obj.spatialAudio : getGlobalState().settings.voicechatSurroundSound,
    (obj.displayOverride !== undefined) ? obj.displayOverride : null,
  );
}
