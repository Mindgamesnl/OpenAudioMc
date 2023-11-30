package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.playlist;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.playlist.delegates.*;

public class PlaylistSubCommand extends SubCommand {

    public PlaylistSubCommand() {
        super("playlist", "list");

        registerArguments(
                new Argument("create <playlistName>", "create a new playlist"),
                new Argument("delete <playlistName>", "delete a playlist"),
                new Argument("list", "list all playlists"),
                new Argument("remove <playlistName> <index>", "remove a track from a playlist"),
                new Argument("view <playlistName>", "view a playlist contents"),
                new Argument("add <playlistName> <source>", "add a track to a playlist")
        );

        registerSubCommands(
                new PlaylistCreateSubCommand(),
                new PlaylistDeleteSubCommand(),
                new PlaylistListCommand(),
                new PlaylistRemoveSubCommand(),
                new PlaylistViewSubCommand(),
                new PlaylistAddSubCommand()
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

        if (args.length == 3 && args[0].equalsIgnoreCase("remove")) {
            delegateTo("remove", sender, args);
            return;
        }

        if (args.length == 2 && args[0].equalsIgnoreCase("view")) {
            delegateTo("view", sender, args);
            return;
        }

        if (args.length == 3 && args[0].equalsIgnoreCase("add")) {
            delegateTo("add", sender, args);
            return;
        }

        // no valid arguments
        message(sender, "Invalid arguments. Use /openaudio playlist for help");
        message(sender, "Valid arguments are:");
        for (Argument argument : getArguments()) {
            message(sender, " - " + OaColor.RED + argument.getSyntax() + OaColor.DARK_AQUA + " - " + OaColor.AQUA + argument.getDescription());
        }
    }
}
