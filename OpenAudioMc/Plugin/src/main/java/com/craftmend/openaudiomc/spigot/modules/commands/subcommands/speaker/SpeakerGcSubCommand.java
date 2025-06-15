package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.speaker;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.commands.subcommands.SpeakersSubCommand;
import com.craftmend.openaudiomc.spigot.modules.speakers.tasks.SpeakerGarbageCollection;

public class SpeakerGcSubCommand extends SubCommand {

    private final SpeakersSubCommand speakersSubCommand;

    public SpeakerGcSubCommand(SpeakersSubCommand parent) {
        super("gc");
        this.speakersSubCommand = parent;
        this.trimArguments = true;
    }

    @Override
    public void onExecute(User sender, String[] args) {

        if (args.length == 0 || !args[0].equalsIgnoreCase("confirm")) {
            message(sender, OaColor.RED + "WARNING! THIS COMMAND WILL LOAD AN INSANE AMOUNT OF CHUNKS IF YOU USE SPEAKERS THROUGHOUT YOUR SERVER. RUN " + OaColor.YELLOW + "/oa speaker gc confirm" + OaColor.RED + " IF YOU ARE 100% SURE THAT YOU WANT TO CONTINUE" );
            return;
        }

        message(sender, "Starting garbage collector...");
        SpeakerGarbageCollection sgc = new SpeakerGarbageCollection();
        // run the wrapper twice to force a cache refresh at the end
        sgc.run();
        message(sender, "Full garbage collection sweep finished");
    }

}
