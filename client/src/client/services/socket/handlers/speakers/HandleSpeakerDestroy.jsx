import { WorldModule } from '../../../world/WorldModule';
import { MEDIA_MUTEX } from '../../../../util/mutex';

export async function HandleSpeakerDestroy(data) {
  try {
    await MEDIA_MUTEX.lock();
    WorldModule.removeSpeaker(data.clientSpeaker.id);
  } finally {
    MEDIA_MUTEX.unlock();
  }
}
