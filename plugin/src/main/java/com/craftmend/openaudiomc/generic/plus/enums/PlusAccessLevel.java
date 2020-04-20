package com.craftmend.openaudiomc.generic.plus.enums;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.plus.interfaces.PlusPermissionCheck;
import lombok.Getter;
import org.bukkit.command.CommandSender;
import org.bukkit.command.ConsoleCommandSender;

public enum PlusAccessLevel {

    STAFF((sender) -> {
        return true;
    }),
    OP_ONLY((sender) -> {
        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
            CommandSender bukkitCommandSender = (CommandSender) sender.getOriginal();
            return (bukkitCommandSender.isOp());
        } else {
            return true;
        }
    }),
    CONSOLE_ONLY((sender) -> {
        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
            return sender.getOriginal() instanceof ConsoleCommandSender;
        }
        return true;
    });

    @Getter private PlusPermissionCheck check;
    PlusAccessLevel(PlusPermissionCheck check) {
        this.check = check;
    }

}
