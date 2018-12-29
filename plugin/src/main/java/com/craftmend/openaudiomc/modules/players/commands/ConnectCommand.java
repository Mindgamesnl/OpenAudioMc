package com.craftmend.openaudiomc.modules.players.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class ConnectCommand implements CommandExecutor {
    @Override
    public boolean onCommand(CommandSender commandSender, Command command, String s, String[] strings) {

        Player sender = (Player) commandSender;
        OpenAudioMc.getInstance().getPlayerModule().getClient(sender).publishUrl();

        return true;
    }
}
