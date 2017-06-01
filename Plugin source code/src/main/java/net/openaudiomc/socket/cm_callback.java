package net.openaudiomc.socket;

import net.openaudiomc.utils.CallbackNoReturn;
import net.openaudiomc.utils.WebUtils;
import org.json.JSONObject;

/*
 * Created by Mindgamesnl/craftmend on 28-4-2017.
 */
public class cm_callback {

    /**
     * IMPORTANT FILE!
     *  this class requests some important invormation from the cm server!
     *  data that gets requested in this version
     *   - VERSION
     *   - SPEAKER TICKS (to prevent lag on our side)
     *   - BROADCAST (More info down below)
     *   - CHANGE LOG
     *
     *   It only gets requested every so often so should not imparct your preformance.
     *
     *   Feel free to remove it :/
     *
     *   Why the broadcast you may ask, well this is used for letting you know about server outages or give-away's ;)
     *   (keep an eye on your twitter to get notified when this will happen)
     */

    public static String lastVersion = "UNKNOWN";
    public static String updateTitle = "UNKNOWN";
    public static Integer speakerTick = 20;
    public static Integer connections_made = 0;
    public static Integer connections_closed = 0;
    public static String broadcast = "UNKNOWN";
    public static Integer callbacks = 0;

    public static void update() {
        CallbackNoReturn<String> callback = new CallbackNoReturn<String>() {
            public void execute (String b) {
                JSONObject jsonObject = new JSONObject(b);
                lastVersion = jsonObject.getString("lastupdate");
                updateTitle = jsonObject.getString("updatetitle");
                speakerTick = jsonObject.getInt("speakertick");
                broadcast = jsonObject.getString("broadcast");
                callbacks++;
            }
        };

        String id = Authenticator.getClientID();
        WebUtils.asyncHttpRequestNoReturn("http://api.openaudiomc.net/status.php?id="+id+"&version=" + net.openaudiomc.core.Main.getPL().getDescription().getVersion(), callback);
    }
}
