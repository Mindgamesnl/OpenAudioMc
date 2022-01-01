package com.craftmend.openaudiomc.spigot.modules.traincarts.signs;

import com.bergerkiller.bukkit.tc.events.SignActionEvent;
import com.bergerkiller.bukkit.tc.events.SignChangeActionEvent;
import com.bergerkiller.bukkit.tc.signactions.SignAction;
import com.bergerkiller.bukkit.tc.signactions.SignActionType;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.spigot.modules.traincarts.TrainCartsModule;

public class AudioSign extends SignAction {

    private static final String[] names = new String[]{"audio", "oa", "oam", "play"};
    private final static SignActionType[] prerequisites = new SignActionType[]{SignActionType.GROUP_ENTER, SignActionType.REDSTONE_ON};

    private final TrainCartsModule trainCartsModule;

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
            event.getPlayer().sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "You've successfully created a OpenAudioMc sign!");
            return true;
        }
        return false;
    }

    public boolean canSupportRC() {
        return false;
    }

}
