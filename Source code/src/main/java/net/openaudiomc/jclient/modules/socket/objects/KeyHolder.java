package net.openaudiomc.jclient.modules.socket.objects;

import lombok.Getter;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.utils.WebUtils;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

public class KeyHolder {

    @Getter private String publickey = "";
    @Getter private String privatekey  = "";

    public KeyHolder(OpenAudioMc plugin) {

        String pukey = plugin.getConfig().getString("key.public");
        String prkey = plugin.getConfig().getString("key.private");

        if (pukey == null) {
            try {
                JSONObject newdata = new JSONObject(WebUtils.getText("TODO: NEW TOKEN API SYSTEM"));
                publickey = newdata.getString("public");
                privatekey = newdata.getString("private");
                plugin.getConfig().set("key.public", publickey);
                plugin.getConfig().set("key.private", privatekey);
                plugin.saveConfig();
            } catch (JSONException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return;
        }

        publickey = pukey;
        privatekey = prkey;
    }

}
