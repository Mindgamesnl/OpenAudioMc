package com.craftmend.openaudiomc.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.modules.commands.objects.Argument;
import com.craftmend.openaudiomc.modules.hue.objects.HueColor;
import com.craftmend.openaudiomc.modules.networking.packets.PacketClientApplyHueColor;
import com.craftmend.openaudiomc.modules.players.objects.Client;
import com.craftmend.openaudiomc.modules.players.objects.PlayerSelector;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class HueSubCommand extends SubCommand {

    private OpenAudioMc openAudioMc;

    public HueSubCommand(OpenAudioMc openAudioMc) {
        super("hue");
        registerArguments(
                new Argument("set <selector> <lights> <r> <g> <b> <brightness>",
                        "Set the HUE lights of a specific selector to a RGBA value. The lights selection is a JSON array, like [1,2,3]")
        );
        this.openAudioMc = openAudioMc;
    }

    @Override
    public void onExecute(CommandSender sender, String[] args) {
        if (args.length == 0) {
            message(sender, "invalid arguments");
            return;
        }

        if (args.length == 7 && args[0].equals("set")) {
            HueColor hueColor = new HueColor(Integer.valueOf(args[3]), Integer.valueOf(args[4]), Integer.valueOf(args[5]), Integer.valueOf(args[6]));
            for (Player player : new PlayerSelector(args[1]).getPlayers(sender)) {
                Client client = openAudioMc.getPlayerModule().getClient(player);
                openAudioMc.getNetworkingModule().send(client, new PacketClientApplyHueColor(hueColor, args[2]));
            }
            message(sender, "updated hue state for " + args[1]);
        }
    }
}
