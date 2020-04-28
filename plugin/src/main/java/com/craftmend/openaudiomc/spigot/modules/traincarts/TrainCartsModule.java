package com.craftmend.openaudiomc.spigot.modules.traincarts;

import com.bergerkiller.bukkit.tc.events.SignActionEvent;
import com.bergerkiller.bukkit.tc.signactions.SignAction;
import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.packets.PacketClientDestroyMedia;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.traincarts.listeners.TrainListener;
import com.craftmend.openaudiomc.spigot.modules.traincarts.models.TrainMedia;
import com.craftmend.openaudiomc.spigot.modules.traincarts.signs.AudioSign;
import lombok.Getter;
import org.bukkit.entity.Player;

import java.util.HashMap;
import java.util.Map;

public class TrainCartsModule {

    @Getter private Map<String, TrainMedia> trainMediaMap = new HashMap<>();

    public TrainCartsModule(OpenAudioMcSpigot openAudioMcSpigot) {
        SignAction.register(new AudioSign(this));
        openAudioMcSpigot.getServer().getPluginManager().registerEvents(new TrainListener(this), openAudioMcSpigot);
    }

    public TrainMedia getMediaFromTrain(String trainName) {
        return trainMediaMap.get(trainName);
    }

    public void handleTrainDeletion(String trainName) {
        trainMediaMap.remove(trainName);
    }

    public void stopStrain(String trainName, SignActionEvent event) {
        TrainMedia media = getMediaFromTrain(trainName);
        if (media == null) return;

        if (!event.getGroup().isEmpty()) {
            for (Player playerPassenger : event.getMember().getEntity().getPlayerPassengers()) {
                SpigotConnection spigotConnection = OpenAudioMcSpigot.getInstance().getPlayerModule().getClient(playerPassenger);
                OpenAudioMc.getInstance().getNetworkingService().send(spigotConnection.getClientConnection(), new PacketClientDestroyMedia(media.getMediaId().toString()));
            }
        }

        trainMediaMap.remove(trainName);
    }

    public void registerTrain(String trainName, String source, SignActionEvent event) {
        TrainMedia media = new TrainMedia(source);
        trainMediaMap.put(trainName, media);

        if (!event.getGroup().isEmpty()) {
            for (Player playerPassenger : event.getMember().getEntity().getPlayerPassengers()) {
                SpigotConnection spigotConnection = OpenAudioMcSpigot.getInstance().getPlayerModule().getClient(playerPassenger);
                spigotConnection.getClientConnection().sendMedia(media.toMedia());
            }
        }
    }

}
