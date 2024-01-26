import { getGlobalState } from '../../../../state/store';

export class VoicePeerOptions {
  constructor(
    visible = true,
    spatialAudio = getGlobalState().settings.voicechatSurroundSound,
  ) {
    this.visible = visible;
    this.spatialAudio = spatialAudio;
  }
}

export function peerOptionsFromObj(obj) {
  return new VoicePeerOptions(
    obj.visible ?? true,
    obj.spatialAudio ?? getGlobalState().settings.voicechatSurroundSound,
  );
}
