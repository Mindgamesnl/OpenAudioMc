package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.player.User;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.state.interfaces.StateDetail;

public class StateSubCommand extends SubCommand {

    public StateSubCommand() {
        super("state", "debug");
        registerArguments(new Argument("", "Display debug details for OpenAudioMc"));
    }

    @Override
    public void onExecute(User sender, String[] args) {
        message(sender, "Details (name and value)");
        for (StateDetail detail : OpenAudioMc.getService(StateService.class).getDetails()) {
            message(sender, getColor("BLUE") + detail.title() + getColor("WHITE") + ": " + getColor("GOLD") + detail.value());
        }
    }
}
