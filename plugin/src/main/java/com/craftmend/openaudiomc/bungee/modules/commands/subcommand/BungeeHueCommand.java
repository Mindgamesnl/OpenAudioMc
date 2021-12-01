package com.craftmend.openaudiomc.bungee.modules.commands.subcommand;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.modules.player.objects.BungeePlayerSelector;
import com.craftmend.openaudiomc.generic.commands.CommandService;

import com.craftmend.openaudiomc.generic.client.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.hue.SerializedHueColor;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.packets.client.hue.PacketClientApplyHueColor;
import com.craftmend.openaudiomc.generic.user.User;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.connection.ProxiedPlayer;

public class BungeeHueCommand extends SubCommand {

    public BungeeHueCommand() {
        super("hue");
        registerArguments(
                new Argument("set <selector> <lights> <r> <g> <b> <brightness>",
                        "Set the HUE lights of a specific selector to a RGBA value. The lights selection is a JSON array, like [1,2,3]")
        );
    }

    @Override
    public void onExecute(User sender, String[] args) {
        if (args.length == 0) {
            sendHelp(sender);
            return;
        }

        if (args.length == 7 && args[0].equals("set")) {
            SerializedHueColor serializedHueColor = new SerializedHueColor(Integer.valueOf(args[3]), Integer.valueOf(args[4]), Integer.valueOf(args[5]), Integer.valueOf(args[6]));
            for (ProxiedPlayer player : new BungeePlayerSelector(args[1]).getPlayers((CommandSender) sender.getOriginal())) {
                ClientConnection clientConnection = OpenAudioMc.getService(NetworkingService.class).getClient(player.getUniqueId());
                OpenAudioMc.getService(NetworkingService.class).send(clientConnection, new PacketClientApplyHueColor(serializedHueColor, args[2]));
            }
            message(sender, "updated hue state for " + args[1]);
            return;
        }

        sendHelp(sender);
    }

    private void sendHelp(User genericExecutor) {
        OpenAudioMc.getService(CommandService.class).getSubCommand("help").onExecute(genericExecutor, new String[] {
                getCommand()
        });;
    }
}
