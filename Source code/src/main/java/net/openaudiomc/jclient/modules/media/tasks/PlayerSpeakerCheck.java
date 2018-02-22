package net.openaudiomc.jclient.modules.media.tasks;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;

public class PlayerSpeakerCheck implements Runnable {

    @Override
    public void run() {
        for (AudioListener l : OpenAudioMc.getInstance().getPlayerModule().getListeners().values()) {
            if (l.getIsConnected()) {
                l.updateSpeakers();
            }
        }
    }
}
