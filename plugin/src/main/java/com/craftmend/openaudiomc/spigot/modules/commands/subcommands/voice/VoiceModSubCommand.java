package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.voice;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.user.User;
import org.bukkit.entity.Player;

public class VoiceModSubCommand extends SubCommand {

    public VoiceModSubCommand() {
        super("mod");
        this.trimArguments = true;
    }

    @Override
    public void onExecute(User sender, String[] args) {
        if (!(sender.getOriginal() instanceof Player)) {
            message(sender, "Only players can open moderation menu's.");
            return;
        }


    }

}
