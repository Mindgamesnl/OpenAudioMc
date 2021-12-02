package com.craftmend.openaudiomc.spigot.modules.traincarts;

import com.bergerkiller.bukkit.tc.controller.MinecartGroup;
import com.bergerkiller.bukkit.tc.controller.MinecartMember;
import com.bergerkiller.bukkit.tc.events.SignActionEvent;
import com.bergerkiller.bukkit.tc.signactions.SignAction;
import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientDestroyMedia;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.traincarts.listeners.TrainListener;
import com.craftmend.openaudiomc.spigot.modules.traincarts.models.TrainMedia;
import com.craftmend.openaudiomc.spigot.modules.traincarts.signs.AudioSign;
import lombok.Getter;
import org.bukkit.entity.Player;

import java.util.HashMap;
import java.util.Map;

public class TrainCartsModule {

    @Getter private final Map<String, TrainMedia> trainMediaMap = new HashMap<>();

    public TrainCartsModule(OpenAudioMcSpigot openAudioMcSpigot) {
        SignAction.register(new AudioSign(this));
        openAudioMcSpigot.registerEvents(new TrainListener(this));
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
            MinecartGroup member = event.getGroup();
            for (MinecartMember<?> minecartMember : member) {
                for (Player playerPassenger : minecartMember.getEntity().getPlayerPassengers()) {
                    SpigotConnection spigotConnection = OpenAudioMc.getService(SpigotPlayerService.class).getClient(playerPassenger);
                    OpenAudioMc.getService(NetworkingService.class).send(spigotConnection.getClientConnection(), new PacketClientDestroyMedia(media.getMediaId().toString()));
                }
            }
        }

        trainMediaMap.remove(trainName);
    }

    public void registerTrain(String trainName, String source, SignActionEvent event) {
        if (trainMediaMap.containsKey(trainName)) stopStrain(trainName, event);

        // for broken stupid signs
        if (source == null) return;

        TrainMedia media = new TrainMedia(source);
        trainMediaMap.put(trainName, media);

        if (!event.getGroup().isEmpty()) {
            MinecartGroup member = event.getGroup();
            for (MinecartMember<?> minecartMember : member) {
                for (Player playerPassenger : minecartMember.getEntity().getPlayerPassengers()) {
                    SpigotConnection spigotConnection = OpenAudioMc.getService(SpigotPlayerService.class).getClient(playerPassenger);
                    spigotConnection.getClientConnection().sendMedia(media.toMedia());
                }
            }
        }
    }

}
