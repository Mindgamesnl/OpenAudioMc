package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.playlist;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.playlist.delegates.PlaylistCreateSubCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.playlist.delegates.PlaylistDeleteSubCommand;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.playlist.delegates.PlaylistListCommand;

public class PlaylistSubCommand extends SubCommand {

    public PlaylistSubCommand() {
        super("playlist", "list");

        registerArguments(
                new Argument("create <playlistName<", "create a new playlist"),
                new Argument("delete <playlistName>", "delete a playlist"),
                new Argument("list", "list all playlists")
        );

        registerSubCommands(
                new PlaylistCreateSubCommand(),
                new PlaylistDeleteSubCommand(),
                new PlaylistListCommand()
        );
    }

    @Override
    public void onExecute(User sender, String[] args) {

        if (args.length == 2 && args[0].equalsIgnoreCase("create")) {
            delegateTo("create", sender, args);
            return;
        }

        if (args.length == 2 && args[0].equalsIgnoreCase("delete")) {
            delegateTo("delete", sender, args);
            return;
        }

        if (args.length == 1 && args[0].equalsIgnoreCase("list")) {
            delegateTo("list", sender, args);
            return;
        }

    }
}
