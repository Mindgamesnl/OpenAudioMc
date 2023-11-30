package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.playlist;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.playlist.delegates.PlaylistCreateSubCommand;

public class PlaylistSubCommand extends SubCommand {

    public PlaylistSubCommand() {
        super("playlist", "list");

        registerArguments(
                new Argument("create <playlistName<", "create a new playlist")
        );

        registerSubCommands(
                new PlaylistCreateSubCommand()
        );
    }

    @Override
    public void onExecute(User sender, String[] args) {

        if (args.length == 2 && args[0].equalsIgnoreCase("create")) {
            delegateTo("create", sender, args);
            return;
        }

    }
}
