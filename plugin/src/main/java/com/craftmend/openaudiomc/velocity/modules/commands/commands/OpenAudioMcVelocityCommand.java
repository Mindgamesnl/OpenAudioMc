package com.craftmend.openaudiomc.velocity.modules.commands.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.user.adapters.VelocityUserAdapter;
import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.velocitypowered.api.command.SimpleCommand;

public class OpenAudioMcVelocityCommand implements SimpleCommand {

    private final CommandService commandService = OpenAudioMc.getService(CommandService.class);

    @Override
    public void execute(Invocation invocation) {
        User<?> user = new VelocityUserAdapter(invocation.source());
        String[] args = invocation.arguments();

        if (args.length == 0) {
            user.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "OpenAudioMc version " + OpenAudioMcVelocity.getInstance().getPluginVersion() + ". For help, please use /openaudio help");
            return;
        }

        commandService.invokeCommand(user, CommandContext.OPENAUDIOMC, args, (err) -> {
            user.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + Platform.translateColors(err));
        });
    }
}
