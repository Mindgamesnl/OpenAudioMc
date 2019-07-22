package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.modules.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.objects.Argument;
import com.craftmend.openaudiomc.spigot.modules.hue.objects.SerializedHueColor;
import com.craftmend.openaudiomc.spigot.services.networking.packets.PacketClientApplyHueColor;
import com.craftmend.openaudiomc.spigot.modules.players.objects.Client;
import com.craftmend.openaudiomc.spigot.modules.players.objects.PlayerSelector;
import org.bukkit.Bukkit;
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
            Bukkit.getServer().dispatchCommand(sender, "oa help " + getCommand());
            return;
        }

        if (args.length == 7 && args[0].equals("set")) {
            SerializedHueColor serializedHueColor = new SerializedHueColor(Integer.valueOf(args[3]), Integer.valueOf(args[4]), Integer.valueOf(args[5]), Integer.valueOf(args[6]));
            for (Player player : new PlayerSelector(args[1]).getPlayers(sender)) {
                Client client = openAudioMc.getPlayerModule().getClient(player);
                openAudioMc.getNetworkingService().send(client, new PacketClientApplyHueColor(serializedHueColor, args[2]));
            }
            message(sender, "updated hue state for " + args[1]);
            return;
        }

        Bukkit.getServer().dispatchCommand(sender, "oa help " + getCommand());
    }
}
