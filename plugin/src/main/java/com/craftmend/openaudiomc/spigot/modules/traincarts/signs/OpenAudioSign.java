package com.craftmend.openaudiomc.spigot.modules.traincarts.signs;

import com.bergerkiller.bukkit.tc.events.SignActionEvent;
import com.bergerkiller.bukkit.tc.events.SignChangeActionEvent;
import com.bergerkiller.bukkit.tc.signactions.SignAction;
import com.bergerkiller.bukkit.tc.signactions.SignActionType;
import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.modules.traincarts.TrainCartsModule;


public class OpenAudioSign extends SignAction {

    private static final String[] names = new String[] { "audio", "oa", "oam", "play" };
    private final static SignActionType[] prerequisites = new SignActionType[] { SignActionType.GROUP_ENTER };

    private TrainCartsModule trainCartsModule;

    public OpenAudioSign(TrainCartsModule trainCartsModule) {
        this.trainCartsModule = trainCartsModule;
    }

    public boolean match(SignActionEvent info) {
        return info.isType(names);
    }

    public void execute(SignActionEvent info) {
        if (!info.isAction(prerequisites))
            return;

        if (!info.isPowered())
            return;

        String trainName = info.getGroup().getProperties().getTrainName();

        if (info.getLine(2).equalsIgnoreCase("stop")) {
            // todo: stop and update occupants
            return;
        }

        String alias = info.getLine(2) + info.getLine(3);
        // register play media and update current occupants

    }

    public boolean build(SignChangeActionEvent event) {
        if (event.isCartSign())
            return false;
        if (event.isTrainSign()) {
            event.getPlayer().sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + "You've successfully created a OpenAudioMc sign!");
            return true;
        }
        return false;
    }

    public boolean canSupportRC() {
        return false;
    }

}
