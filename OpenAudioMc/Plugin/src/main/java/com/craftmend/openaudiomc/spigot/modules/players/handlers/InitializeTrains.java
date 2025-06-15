package com.craftmend.openaudiomc.spigot.modules.players.handlers;

import com.bergerkiller.bukkit.tc.controller.MinecartMember;
import com.bergerkiller.bukkit.tc.controller.MinecartMemberStore;
import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.traincarts.TrainCartsModule;
import com.craftmend.openaudiomc.spigot.modules.traincarts.models.TrainMedia;
import lombok.AllArgsConstructor;
import org.bukkit.entity.Entity;
import org.bukkit.entity.Player;

@AllArgsConstructor
public class InitializeTrains implements Runnable {

    private Player player;

    @Override
    public void run() {
        // if traincarts is enabled, check for that
        TrainCartsModule trainCartsModule = OpenAudioMcSpigot.getInstance().getTrainCartsModule();
        if (trainCartsModule == null) return;

        Entity vehicle = player.getVehicle();
        if (vehicle == null) return;

        MinecartMember<?> member = MinecartMemberStore.getFromEntity(vehicle);
        if (member == null)
            return;

        String trainName = member.getGroup().getProperties().getTrainName();

        TrainMedia media = trainCartsModule.getMediaFromTrain(trainName);
        if (media == null) return;

        SpigotConnection spigotConnection = OpenAudioMc.getService(SpigotPlayerService.class).getClient(player);
        spigotConnection.getClientConnection().sendMedia(media.toMedia());
    }
}
