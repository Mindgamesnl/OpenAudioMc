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
