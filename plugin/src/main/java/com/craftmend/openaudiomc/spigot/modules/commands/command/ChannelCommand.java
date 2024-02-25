package com.craftmend.openaudiomc.spigot.modules.commands.command;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.user.User;
import lombok.NoArgsConstructor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.command.TabCompleter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
public class ChannelCommand implements CommandExecutor, TabCompleter {

    private final CommandService commandService = OpenAudioMc.getService(CommandService.class);

    @Override
    public boolean onCommand(@NotNull CommandSender sender, @NotNull Command command, @NotNull String s, String[] args) {
        if (!StorageKey.SETTINGS_CHANNEL_COMMAND_ENABLED.getBoolean()) {
            sender.sendMessage(Platform.translateColors(MagicValue.COMMAND_PREFIX.get(String.class) + "The channel command is disabled"));
            return true;
        }

        commandService.invokeCommand(OpenAudioMc.resolveDependency(UserHooks.class).fromCommandSender(sender), CommandContext.CHANNEL, args, (err) -> {
            sender.sendMessage(Platform.translateColors(StorageKey.MESSAGE_VOICE_COMMAND_ERROR_FORMAT.getString().replace("{message}", err)));
        });
        return true;
    }

    @Nullable
    @Override
    public List<String> onTabComplete(@NotNull CommandSender commandSender, @NotNull Command command, @NotNull String alias, @NotNull String[] args) {
        if (!StorageKey.SETTINGS_CHANNEL_COMMAND_ENABLED.getBoolean()) {
            return new ArrayList<>();
        }
        User<?> sender = OpenAudioMc.resolveDependency(UserHooks.class).fromCommandSender(commandSender);
        return commandService.getTabCompletions(CommandContext.CHANNEL, args, sender);
    }
}
