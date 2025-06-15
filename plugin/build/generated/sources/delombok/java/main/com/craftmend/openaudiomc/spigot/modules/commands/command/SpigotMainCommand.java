package com.craftmend.openaudiomc.spigot.modules.commands.command;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.command.TabCompleter;
import org.jetbrains.annotations.NotNull;

import java.util.List;

public class SpigotMainCommand implements CommandExecutor, TabCompleter {

    private final OpenAudioMcSpigot openAudioMcSpigot;
    private final CommandService commandService = OpenAudioMc.getService(CommandService.class);

    public SpigotMainCommand(OpenAudioMcSpigot openAudioMcSpigot) {
        this.openAudioMcSpigot = openAudioMcSpigot;
    }

    @Override
    public boolean onCommand(@NotNull CommandSender originalSender, @NotNull Command command, @NotNull String label, String[] args) {
        User<?> sender = OpenAudioMc.resolveDependency(UserHooks.class).fromCommandSender(originalSender);

        if (args.length == 0) {
            sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "OpenAudioMc version " + openAudioMcSpigot.getDescription().getVersion() + ". For help, please use /openaudio help");
            return true;
        }

        commandService.invokeCommand(sender, CommandContext.OPENAUDIOMC, args, (err) -> {
            sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + Platform.translateColors(err));
        });
        return true;
    }

    @Override
    public List<String> onTabComplete(@NotNull CommandSender commandSender, @NotNull Command command, @NotNull String s, String[] args) {
        User<?> sender = OpenAudioMc.resolveDependency(UserHooks.class).fromCommandSender(commandSender);
        return commandService.getTabCompletions(CommandContext.OPENAUDIOMC, args, sender);
    }
}
