package net.openaudiomc.jclient.helpers;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;
import net.openaudiomc.jclient.modules.socket.objects.OaPacket;

public class OperatorHelper {

    public static void send(String operator, OaPacket p) {

        if (operator.equalsIgnoreCase("@a")) {
            for (AudioListener l : OpenAudioMc.getInstance().getPlayerModule().getListeners().values())
                l.sendPacket(p);
            return;
        }

        if (OpenAudioMc.getInstance().getPlayerModule().getListeners().get(operator) != null) {
            OpenAudioMc.getInstance().getPlayerModule().getListeners().get(operator).sendPacket(p);
        }

    }

}
