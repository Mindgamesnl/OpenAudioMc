package com.craftmend.openaudiomc.spigot.modules.events;

import com.craftmend.openaudiomc.api.events.CancellableEvent;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.bukkit.command.CommandSender;

@Data
@AllArgsConstructor
public class SpigotAudioCommandEvent extends CancellableEvent {
    private CommandSender sender;
    private String[] args;
}
