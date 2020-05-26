package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import org.bukkit.ChatColor;

public class ReloadSubCommand extends SubCommand {

    public ReloadSubCommand() {
        super("reload");
        registerArguments(new Argument("", "Reloads the config.yml file"));
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        message(sender, ChatColor.RED + "Reloading OpenAudioMc (config and account details)...");
        OpenAudioMc.getInstance().getConfigurationImplementation().reloadConfig();
        OpenAudioMc.getInstance().getPlusService().getPlusSettings();
        for (ClientConnection client : OpenAudioMc.getInstance().getNetworkingService().getClients()) {
            client.getSession().regenerate();
        }
        message(sender, ChatColor.GREEN + "Reloaded system! Welcome back.");
    }
}
