package com.craftmend.openaudiomc.spigot.modules.speakers.listeners;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.QueuedSpeaker;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.world.WorldLoadEvent;

import java.util.HashSet;
import java.util.Set;

public class WorldLoadListener implements Listener {

    @EventHandler
    public void onLoad(WorldLoadEvent event) {
        Set<QueuedSpeaker> queue = OpenAudioMcSpigot.getInstance().getSpeakerModule().getWaitingWorlds().getOrDefault(event.getWorld().getName(), new HashSet<>());
        for (QueuedSpeaker queuedSpeaker : queue) {
            OpenAudioMcSpigot.getInstance().getSpeakerModule().getLoader().loadFromFile(queuedSpeaker.getSpeakerId());
        }
        OpenAudioMcSpigot.getInstance().getSpeakerModule().getWaitingWorlds().remove(event.getWorld().getName());
    }

}
