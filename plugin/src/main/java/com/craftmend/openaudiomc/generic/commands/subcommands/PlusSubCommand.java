package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.TextComponent;

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
        OpenAudioMc.getInstance().getPlusService().createLoginToken(sender.getName()).thenAccept(token -> {
            TextComponent message = new TextComponent(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + "Welcome! click here to login to OpenAudioMc-Plus! Be sure to NOT share this link. If someone somehow does obtain it, just execute this command again to log them out.");
            message.setClickEvent(new ClickEvent(ClickEvent.Action.OPEN_URL, "https://plus.openaudiomc.net/login/" + token));

            OpenAudioMc.getInstance().getNetworkingService().getClient(sender.getUuid()).getPlayer().sendMessage(message);
        });
    }
}
