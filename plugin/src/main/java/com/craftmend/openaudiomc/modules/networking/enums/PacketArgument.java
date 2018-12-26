package com.craftmend.openaudiomc.modules.networking.enums;

import lombok.Getter;

import org.bukkit.entity.Player;

public enum PacketArgument {

    PLAYER(Player.class),
    STRING(String.class);

    @Getter private Class type;

    PacketArgument(Class type) {
        this.type = type;
    }
}
