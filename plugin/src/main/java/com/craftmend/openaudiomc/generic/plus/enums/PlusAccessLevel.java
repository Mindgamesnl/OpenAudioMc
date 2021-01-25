package com.craftmend.openaudiomc.generic.plus.enums;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.plus.interfaces.PlusPermissionCheck;
import lombok.Getter;
import org.bukkit.command.CommandSender;
import org.bukkit.command.ConsoleCommandSender;

public enum PlusAccessLevel {

    STAFF((sender) -> true),
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

    public enum Flag {

        VOICE_CHAT_16("flag_voice_chat_enabled_16"),
        VOICE_CHAT_8("flag_voice_chat_enabled_8"),
        VOICE_CHAT_2("flag_voice_chat_enabled_2");

        @Getter private String tag;

        Flag(String tag) {
            this.tag = tag;
        }

        public static Flag getByBackendTag(String flag) {
            for (Flag value : Flag.values()) if (value.getTag().equals(flag) || value.name().equals(flag)) return value;
            return null;
        }
    }
}
