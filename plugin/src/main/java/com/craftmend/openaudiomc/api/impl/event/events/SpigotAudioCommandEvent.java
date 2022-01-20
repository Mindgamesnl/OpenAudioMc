package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.api.interfaces.EventSupportFlag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bukkit.command.CommandSender;

@NoArgsConstructor
@EventSupportFlag(support = EventSupport.SPIGOT_ONLY)
public class SpigotAudioCommandEvent extends AudioEvent {

    @Setter
    @Getter
    private boolean canceled = false;
    @Getter
    private CommandSender commandSender;

    public SpigotAudioCommandEvent(CommandSender commandSender) {
        this.commandSender = commandSender;
    }

}
