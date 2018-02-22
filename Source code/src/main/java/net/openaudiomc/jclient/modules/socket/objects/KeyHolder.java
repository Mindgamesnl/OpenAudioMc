package net.openaudiomc.jclient.modules.socket.objects;

import lombok.Getter;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.utils.UrlFetcher;

import org.json.JSONException;
import org.json.JSONObject;

@Getter
public class KeyHolder {

    private String publickey = "";
    private String privatekey  = "";

    public KeyHolder(OpenAudioMc plugin) {

        String pukey = plugin.getConf().getKeys().getPublicKey();
        String prkey = plugin.getConf().getKeys().getPrivateKey();

        if (pukey.length() != 15) {
            System.out.println("[OpenAudioMc] This is your first time using OpenAudioMc! welcome! (getting client cridentials)");
            try {

                String webdata = new UrlFetcher().run(new ApiEndpoints().getRESTServer());

                JSONObject newdata = new JSONObject(webdata);
                publickey = newdata.getString("public");
                privatekey = newdata.getString("private");
                plugin.getConf().getKeys().setPublicKey(publickey);
                plugin.getConf().getKeys().setPrivateKey(privatekey);
                plugin.getConf().save();
            } catch (JSONException e) {
                e.printStackTrace();
            }
            return;
        }

        publickey = pukey;
        privatekey = prkey;
    }
}
