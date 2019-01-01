package com.craftmend.openaudiomc.modules.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.modules.players.objects.Client;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class SpeakersSubCommand extends SubCommand {

    private OpenAudioMc openAudioMc;

    public SpeakersSubCommand(OpenAudioMc openAudioMc) {
        super("speaker");
        this.openAudioMc = openAudioMc;
    }

    @Override
    public void onExecute(CommandSender sender, String[] args) {
        Player player = (Player) sender;

        if (args.length == 0) {
            message(sender, "Invalid command.");
            return;
        }

        if (args.length == 1) {
            Client client = openAudioMc.getPlayerModule().getClient(((Player) sender));
            client.setSelectedSpeakerSource(args[0]);
            player.getInventory().addItem(OpenAudioMc.getInstance().getSpeakerModule().getSkull());
            message(sender, "Speaker media created! You've received a Speaker skull in your inventory. Placing it anywhere in the world will add the configured sound in the are.");
            return;
        }
    }

}
