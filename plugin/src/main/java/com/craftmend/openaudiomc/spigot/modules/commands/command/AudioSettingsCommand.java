package com.craftmend.openaudiomc.spigot.modules.commands.command;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.generic.user.adapters.SpigotUserAdapter;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import lombok.NoArgsConstructor;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

@NoArgsConstructor
public class AudioSettingsCommand implements CommandExecutor {

    private final CommandMiddleware[] commandMiddleware = new CommandMiddleware[] {
            new CatchLegalBindingMiddleware(),
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    @Override
    public boolean onCommand(CommandSender sender, Command command, String s, String[] args) {
        if (CommandMiddewareExecutor.shouldBeCanceled(new SpigotUserAdapter(sender), null, commandMiddleware)) return true;

        if (sender instanceof Player) {
            SpigotConnection spigotConnection = OpenAudioMc.getService(SpigotPlayerService.class).getClient(((Player) sender).getUniqueId());
            // open gui

        } else {
            sender.sendMessage("This command can only be used by players");
        }
        return true;
    }

}
