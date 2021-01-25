package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.plus.enums.PlusAccessLevel;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.command.ConsoleCommandSender;

public class PlusSubCommand extends SubCommand {


    public PlusSubCommand() {
        super("plus");
        registerArguments(
                new Argument("",
                        "Get a personal login link for OpenAudioMc-Plus")
        );
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        PlusAccessLevel level = OpenAudioMc.getInstance().getPlusService().getAccessLevel();
        if (level.getCheck().checkPermissions(sender)) {



            OpenAudioMc.getInstance().getPlusService().createLoginToken(sender.getName()).thenAccept(token -> {

                String url = "https://plus.openaudiomc.net/login/" + token;
                // if the platform is spigot, do a additional console check
                if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
                    if (sender.getOriginal() instanceof ConsoleCommandSender) {
                        message(sender, "Your temporary login URL is: " + url);
                        return;
                    }
                }
                TextComponent message = new TextComponent(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + "Welcome! click here to login to OpenAudioMc-Plus! Be sure to NOT share this link. If someone somehow does obtain it, just execute this command again to log them out.");
                message.setClickEvent(new ClickEvent(ClickEvent.Action.OPEN_URL, url));
                OpenAudioMc.getInstance().getNetworkingService().getClient(sender.getUuid()).getPlayer().sendMessage(message);
            });
        } else {
            message(sender, "You fall outside of the configured access level for openaudoimc-plus as defined in the config. You don't meet the requirements for " + level.name());
        }
    }
}
