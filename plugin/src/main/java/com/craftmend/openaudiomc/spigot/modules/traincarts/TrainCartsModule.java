package com.craftmend.openaudiomc.spigot.modules.traincarts;

import com.bergerkiller.bukkit.tc.signactions.SignAction;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.traincarts.listeners.TrainListener;
import com.craftmend.openaudiomc.spigot.modules.traincarts.models.CurrentTrainMedia;
import com.craftmend.openaudiomc.spigot.modules.traincarts.signs.OpenAudioSign;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

public class TrainCartsModule {

    @Getter private Map<String, CurrentTrainMedia> trainMediaMap = new HashMap<>();

    public TrainCartsModule(OpenAudioMcSpigot openAudioMcSpigot) {
        SignAction.register(new OpenAudioSign(this));
        openAudioMcSpigot.getServer().getPluginManager().registerEvents(new TrainListener(this), openAudioMcSpigot);
    }

    public CurrentTrainMedia getMediaFromTrain(String trainName) {
        return trainMediaMap.get(trainName);
    }

    public void handleTrainDeletion(String trainName) {
        trainMediaMap.remove(trainName);
    }

}
