package net.openaudiomc.jclient.modules.player.listeners;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerQuitEvent;

public class JoinQuitListener implements Listener {

    @EventHandler
    public void onJoin(PlayerJoinEvent event) {
        OpenAudioMc.getInstance().getPlayerModule().getListeners().put(event.getPlayer().getName(), new AudioListener(event.getPlayer()));
    }

    @EventHandler
    public void onQuit(PlayerQuitEvent event) {
        OpenAudioMc.getInstance().getPlayerModule().getListeners().get(event.getPlayer().getName()).onQuit();
        OpenAudioMc.getInstance().getPlayerModule().getListeners().remove(event.getPlayer().getName());
    }

}
