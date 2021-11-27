package com.craftmend.openaudiomc.velocity.modules.commands.subcommand;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.hue.SerializedHueColor;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.packets.client.hue.PacketClientApplyHueColor;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.velocity.modules.player.objects.VelocityPlayerSelector;
import com.velocitypowered.api.command.CommandSource;
import com.velocitypowered.api.proxy.Player;

public class VelocityHueCommand extends SubCommand {

    public VelocityHueCommand() {
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
            SerializedHueColor serializedHueColor = new SerializedHueColor(Integer.parseInt(args[3]), Integer.parseInt(args[4]), Integer.parseInt(args[5]), Integer.parseInt(args[6]));
            for (Player player : new VelocityPlayerSelector(args[1]).getPlayers((CommandSource) sender.getOriginal())) {
                ClientConnection clientConnection = OpenAudioMc.getService(NetworkingService.class).getClient(player.getUniqueId());
                OpenAudioMc.getService(NetworkingService.class).send(clientConnection, new PacketClientApplyHueColor(serializedHueColor, args[2]));
            }
            message(sender, "updated hue state for " + args[1]);
            return;
        }

        sendHelp(sender);
    }

    private void sendHelp(User genericExecutor) {
        OpenAudioMc.getService(CommandService.class).getSubCommand("help").onExecute(genericExecutor, new String[]{
                getCommand()
        });
    }
}
