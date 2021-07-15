package com.craftmend.openaudiomc.api.impl.event;

import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.velocity.messages.PacketPlayer;
import lombok.Getter;
import lombok.Setter;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import org.bukkit.entity.Player;

public abstract class AudioEvent {

    public abstract EventSupport getSupport();

    public abstract class NetworkedAudioEvent extends AudioEvent {

        @Getter
        protected transient PacketPlayer networkedPlayer;
        @Getter
        @Setter
        protected boolean wasReceived = false;

        public NetworkedAudioEvent(Player player) {
            this.networkedPlayer = new PacketPlayer(player);
        }

        public NetworkedAudioEvent(com.velocitypowered.api.proxy.Player player) {
            this.networkedPlayer = new PacketPlayer(player);
        }

        public NetworkedAudioEvent(ProxiedPlayer player) {
            this.networkedPlayer = new PacketPlayer(player);
        }
    }

}
