package net.openaudiomc.commands.admin;

import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import net.openaudiomc.socket.TimeoutManager;
import net.openaudiomc.socket.cm_callback;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.command.CommandSender;

public class CommandDebug implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "debug";
    }

    @Override
    public boolean isPlayerCommand() {
        return false;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        sender.sendMessage(ChatColor.DARK_AQUA + "This version: " + Main.get().getDescription().getVersion() + " connected:" + TimeoutManager.isConnected() + " bukkit verion:" + Bukkit.getBukkitVersion() + " st:" + cm_callback.speakerTick + " CC:" + cm_callback.connectionsClosed + " CM:" + cm_callback.connectionsMade + " cbs:" + cm_callback.callbacks);
    }
}
