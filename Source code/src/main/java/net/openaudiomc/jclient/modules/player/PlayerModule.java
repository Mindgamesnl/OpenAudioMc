package net.openaudiomc.jclient.modules.player;

import lombok.Getter;
import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.player.listeners.JoinQuitListener;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;

import java.util.HashMap;
import java.util.Map;


public class PlayerModule {

    @Getter private Map<String, AudioListener> listeners = new HashMap<>();

    public PlayerModule(OpenAudioMc plugin) {
        plugin.getServer().getPluginManager().registerEvents(new JoinQuitListener(), plugin);
    }



}
