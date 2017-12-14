package net.openaudiomc.jclient.modules.commands.listeners;

import net.openaudiomc.jclient.OpenAudioMc;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerCommandPreprocessEvent;

public class CustomCommandListener implements Listener {

    @EventHandler
    public void onCommand(PlayerCommandPreprocessEvent event) {
        if (OpenAudioMc.getInstance().getConfig().getList("commands").contains(event.getMessage())) {
            OpenAudioMc.getInstance().getPlayerModule().getListeners().get(event.getPlayer().getName()).sendLink();
            event.setCancelled(true);
        }
    }

}
