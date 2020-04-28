package com.craftmend.openaudiomc.spigot.modules.traincarts.signs;

import com.bergerkiller.bukkit.tc.events.SignActionEvent;
import com.bergerkiller.bukkit.tc.events.SignChangeActionEvent;
import com.bergerkiller.bukkit.tc.signactions.SignAction;
import com.bergerkiller.bukkit.tc.signactions.SignActionType;
import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.modules.traincarts.TrainCartsModule;

public class AudioSign extends SignAction {

    private static final String[] names = new String[] { "audio", "oa", "oam", "play" };
    private final static SignActionType[] prerequisites = new SignActionType[] { SignActionType.GROUP_ENTER };

    private TrainCartsModule trainCartsModule;

    public AudioSign(TrainCartsModule trainCartsModule) {
        this.trainCartsModule = trainCartsModule;
    }

    public boolean match(SignActionEvent event) {
        return event.isType(names);
    }

    public void execute(SignActionEvent event) {
        if (!event.isAction(prerequisites))
            return;

        if (!event.isPowered())
            return;

        String trainName = event.getGroup().getProperties().getTrainName();

        if (event.getLine(2).equalsIgnoreCase("stop")) {
            // todo: stop and update occupants
            trainCartsModule.stopStrain(trainName, event);
            return;
        }

        String alias = event.getLine(2) + event.getLine(3);
        // register play media and update current occupants
        trainCartsModule.registerTrain(trainName, alias, event);
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
