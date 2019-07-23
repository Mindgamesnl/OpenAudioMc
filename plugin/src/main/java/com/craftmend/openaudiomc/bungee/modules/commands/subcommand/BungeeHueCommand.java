package com.craftmend.openaudiomc.bungee.modules.commands.subcommand;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.bungee.modules.player.objects.BungeePlayerSelector;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.networking.client.objects.ClientConnection;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.objects.SerializedHueColor;
import com.craftmend.openaudiomc.generic.networking.packets.PacketClientApplyHueColor;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotPlayerSelector;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

public class BungeeHueCommand extends SubCommand {

    public BungeeHueCommand() {
        super("hue");
        registerArguments(
                new Argument("set <selector> <lights> <r> <g> <b> <brightness>",
                        "Set the HUE lights of a specific selector to a RGBA value. The lights selection is a JSON array, like [1,2,3]")
        );
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        if (args.length == 0) {
            sendHelp(sender);
            return;
        }

        if (args.length == 7 && args[0].equals("set")) {
            SerializedHueColor serializedHueColor = new SerializedHueColor(Integer.valueOf(args[3]), Integer.valueOf(args[4]), Integer.valueOf(args[5]), Integer.valueOf(args[6]));
            for (ProxiedPlayer player : new BungeePlayerSelector(args[1]).getPlayers((CommandSender) sender.getOriginal())) {
                ClientConnection clientConnection = OpenAudioMcCore.getInstance().getNetworkingService().getClient(player.getUniqueId());
                OpenAudioMcCore.getInstance().getNetworkingService().send(clientConnection, new PacketClientApplyHueColor(serializedHueColor, args[2]));
            }
            message(sender, "updated hue state for " + args[1]);
            return;
        }

        sendHelp(sender);
    }

    private void sendHelp(GenericExecutor genericExecutor) {
        OpenAudioMcCore.getInstance().getCommandModule().getSubCommand("help").onExecute(genericExecutor, new String[] {
                getCommand()
        });;
    }
}
