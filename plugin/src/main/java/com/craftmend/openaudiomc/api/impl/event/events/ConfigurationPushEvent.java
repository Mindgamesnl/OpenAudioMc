package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.NetworkedAudioEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.api.interfaces.EventSupportFlag;
import lombok.Getter;
import net.md_5.bungee.api.connection.ProxiedPlayer;

@EventSupportFlag(support = EventSupport.EVERYWHERE)
public class ConfigurationPushEvent extends NetworkedAudioEvent {

    @Getter private String fileContent;

    public ConfigurationPushEvent(ProxiedPlayer player, String fileContent) {
        super(player);
        this.fileContent = fileContent;
    }

    @Override
    public EventSupport getSupport() {
        return EventSupport.EVERYWHERE;
    }
}
