package com.craftmend.openaudiomc.velocity.modules.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.commands.subcommands.AcceptSubCommand;
import com.craftmend.openaudiomc.generic.commands.subcommands.HelpSubCommand;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.craftmend.openaudiomc.velocity.modules.commands.commands.OpenAudioMcVelocityCommand;
import com.craftmend.openaudiomc.velocity.modules.commands.commands.VelocityAudioCommand;
import com.craftmend.openaudiomc.velocity.modules.commands.commands.VelocityVolumeCommand;
import com.craftmend.openaudiomc.velocity.modules.commands.subcommand.*;
import com.velocitypowered.api.command.CommandManager;

public class VelocityCommandModule {

    public VelocityCommandModule(OpenAudioMcVelocity openAudioMcVelocity) {
        CommandManager man = openAudioMcVelocity.getServer().getCommandManager();

        man.register(man.metaBuilder("openaudiomc")
                        .aliases("oam", "oa", "openaudio")
                        .build(),
                new OpenAudioMcVelocityCommand()
        );
        man.register(man.metaBuilder("vol")
                        .build(),
                new VelocityVolumeCommand()
        );
        man.register(man.metaBuilder("audio")
                        .aliases("sound", "connect", "muziek", "mcaudio", "mcconnect", "mconnect", "geluid")
                        .build(),
                new VelocityAudioCommand()
        );


        CommandModule commandModule = OpenAudioMc.getInstance().getCommandModule();

        commandModule.registerSubCommands(
                new HelpSubCommand(),
                new VelocityPlayCommand(OpenAudioMc.getInstance()),
                new VelocityStopCommand(OpenAudioMc.getInstance()),
                new VelocityHueCommand(),
                new VelocityRegionCommand(),
                new VelocitySpeakerCommand(),
                new VelocityShowCommand(),
                new VelocityAliasCommand()
        );

        // add accept sub command if the player is new
        if (!OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY)) {
            commandModule.registerSubCommands(new AcceptSubCommand());
        }

    }

}
