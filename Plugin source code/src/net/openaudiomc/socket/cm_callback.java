package net.openaudiomc.socket;

import net.openaudiomc.syncedSound.objects.syncedSound;
import net.openaudiomc.utils.callback;
import net.openaudiomc.utils.webUtils;
import net.openaudiomc.socket.Authenticator;

import org.json.JSONObject;

/**
 * Created by MatsMoolhuizen on 28-4-2017.
 */
public class cm_callback {

    /*
     * IMPORTANT FILE!
     *  this class requests some important invormation from the cm server!
     *  data that gets requested in this version
     *   - VERSION
     *   - SPEAKER TICKS (to prevent lag on our side)
     *   - BROADCAST (for example planned server maintenance)
     *   - CHANGE LOG
     *
     *   It only gets requested every so ofter so should not imparct your preformance.
     */

    public static String lastVersion = "UNKNOWN";
    public static String updateTitle = "UNKNOWN";
    public static Integer speakerTick = 20;
    public static String broadcast = "UNKNOWN";

    public static void update() {
        callback.Callback<String> callback = new net.openaudiomc.utils.callback.Callback<String>() {
            public syncedSound execute(String b) {
                JSONObject jsonObject = new JSONObject(b);
                lastVersion = jsonObject.getString("lastupdate");
                updateTitle = jsonObject.getString("updatetitle");
                speakerTick = jsonObject.getInt("speakertick");
                broadcast = jsonObject.getString("broadcast");
                return null;
            }
        };
        String id = Authenticator.getClientID();
        webUtils.asyncHttpRequest("http://api.openaudiomc.net/status.php?id="+id, callback);
    }
}
