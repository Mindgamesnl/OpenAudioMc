package com.craftmend.openaudiomc.spigot.modules.speakers.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.QueuedSpeaker;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.world.WorldLoadEvent;

import java.util.HashSet;
import java.util.Set;

public class WorldLoadListener implements Listener {

    @EventHandler
    public void onLoad(WorldLoadEvent event) {
        Set<QueuedSpeaker> queue = OpenAudioMc.getService(SpeakerService.class).getWaitingWorlds().getOrDefault(event.getWorld().getName(), new HashSet<>());
        for (QueuedSpeaker queuedSpeaker : queue) {
            OpenAudioMc.getService(SpeakerService.class).getLoader().loadFromFile(queuedSpeaker.getSpeakerId());
        }
        OpenAudioMc.getService(SpeakerService.class).getWaitingWorlds().remove(event.getWorld().getName());
    }

}
