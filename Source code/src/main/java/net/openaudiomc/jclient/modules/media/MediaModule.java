package net.openaudiomc.jclient.modules.media;

import lombok.Getter;
import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.media.objects.AudioRegion;

import java.util.HashMap;
import java.util.Map;

public class MediaModule {

    @Getter public Map<String, AudioRegion> regions = new HashMap<>();

    public MediaModule(OpenAudioMc plugin) {
        loadRegions();
    }

    public void loadRegions() {
        for(String key : OpenAudioMc.getInstance().getConfig().getConfigurationSection("storage.regions").getKeys(false)){
            if (!regions.containsKey(key) && !key.equalsIgnoreCase("placeholder"))
                regions.put(key, new AudioRegion(key, OpenAudioMc.getInstance().getConfig().getString("storage.regions." + key + ".src")));
        }
    }

}
