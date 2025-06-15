package com.craftmend.openaudiomc.bungee.modules.commands.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.user.adapters.BungeeUserAdapter;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.plugin.Command;

public class OpenAudioMcBungeeCommand extends Command {

    private final CommandService commandService = OpenAudioMc.getService(CommandService.class);


    public OpenAudioMcBungeeCommand() {
        super("openaudiomc", null, "oam", "oa", "openaudio");
    }

    /**
     * A bungeecord wrapper that wraps bungeecord commands to platform independent openaudiomc commands
     * through the internal mini framework
     */
    @Override
    public void execute(CommandSender originalSender, String[] args) {
        User<?> user = new BungeeUserAdapter(originalSender);

        if (args.length == 0) {
            user.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "OpenAudioMc version " + OpenAudioMcBungee.getInstance().getDescription().getVersion() + ". For help, please use /openaudio help");
            return;
        }

        commandService.invokeCommand(user, CommandContext.OPENAUDIOMC, args, (err) -> {
            user.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + Platform.translateColors(err));
        });

    }
}
