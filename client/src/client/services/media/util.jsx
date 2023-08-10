import { Channel } from './objects/Channel';
import { MediaManager } from './MediaManager';
import { Sound } from './objects/Sound';

export async function playInternalEffect(src) {
  const createdChannel = new Channel(src);
  const createdMedia = new Sound({
    startMuted: false,
  });
  await createdMedia.load(src);
  createdMedia.setOnFinish(() => {
    MediaManager.mixer.updatePlayingSounds();
    MediaManager.mixer.removeChannel(src);
  });
  createdMedia.finalize().then(() => {
    MediaManager.mixer.addChannel(createdChannel);
    createdChannel.addSound(createdMedia);
    createdChannel.setChannelVolume(100);
    createdChannel.updateFromMasterVolume();
    createdMedia.finish();
  });
}
