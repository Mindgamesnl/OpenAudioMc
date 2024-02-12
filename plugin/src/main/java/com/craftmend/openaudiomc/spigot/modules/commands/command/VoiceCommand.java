package com.craftmend.openaudiomc.spigot.modules.commands.command;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
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

import java.util.List;

@NoArgsConstructor
public class VoiceCommand implements CommandExecutor, TabCompleter {

    private final CommandService commandService = OpenAudioMc.getService(CommandService.class);

    @Override
    public boolean onCommand(@NotNull CommandSender sender, @NotNull Command command, @NotNull String s, String[] args) {
        commandService.invokeCommand(OpenAudioMc.resolveDependency(UserHooks.class).fromCommandSender(sender), CommandContext.VOICE, args, (err) -> {
            sender.sendMessage(Platform.translateColors(StorageKey.MESSAGE_VOICE_COMMAND_ERROR_FORMAT.getString().replace("{message}", err)));
        });
        return true;
    }

    @Nullable
    @Override
    public List<String> onTabComplete(@NotNull CommandSender commandSender, @NotNull Command command, @NotNull String alias, @NotNull String[] args) {
        User<?> sender = OpenAudioMc.resolveDependency(UserHooks.class).fromCommandSender(commandSender);
        return commandService.getTabCompletions(CommandContext.VOICE, args, sender);
    }
}
