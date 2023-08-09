import { WorldModule } from '../../../world/WorldModule';

export function HandleSpeakerDestroy(data) {
  WorldModule.removeSpeaker(data.clientSpeaker.id);
}
