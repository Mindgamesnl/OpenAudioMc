package net.openaudiomc.jclient.modules.speakers.task;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;

public class SpeakerTask implements Runnable {
    @Override
    public void run() {
        for (AudioListener l : OpenAudioMc.getInstance().getPlayerModule().getListeners().values()) {
            if (l.getIsConnected()) {

            }
        }
    }
}
