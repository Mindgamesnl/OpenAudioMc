package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.objects.SerializedHueColor;
import com.craftmend.openaudiomc.generic.networking.packets.PacketClientApplyHueColor;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.players.objects.PlayerSelector;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class HueSubCommand extends SubCommand {

    private OpenAudioMcSpigot openAudioMcSpigot;

    public HueSubCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        super("hue");
        registerArguments(
                new Argument("set <selector> <lights> <r> <g> <b> <brightness>",
                        "Set the HUE lights of a specific selector to a RGBA value. The lights selection is a JSON array, like [1,2,3]")
        );
        this.openAudioMcSpigot = openAudioMcSpigot;
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
                SpigotConnection spigotConnection = openAudioMcSpigot.getPlayerModule().getClient(player);
                OpenAudioMcCore.getInstance().getNetworkingService().send(spigotConnection.getClientConnection(), new PacketClientApplyHueColor(serializedHueColor, args[2]));
            }
            message(sender, "updated hue state for " + args[1]);
            return;
        }

        Bukkit.getServer().dispatchCommand(sender, "oa help " + getCommand());
    }
}
