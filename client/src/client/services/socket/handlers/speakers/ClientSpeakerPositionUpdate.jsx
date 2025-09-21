import { Vector3 } from '../../../../util/math/Vector3';
import { WorldModule } from '../../../world/WorldModule';
import { MEDIA_MUTEX } from '../../../../util/mutex';

export async function handleSpeakerPositionUpdate(data) {
  try {
    await MEDIA_MUTEX.lock();

    const {
      x, y, z, speakerId,
    } = data;

    // Vector3 representing the center of the speaker
    const loc = new Vector3(x, y, z).add(0.5, 0.5, 0.5);

    WorldModule.updateSpeakerPosition(
      speakerId,
      loc,
    );
  } finally {
    MEDIA_MUTEX.unlock();
  }
}
