package com.craftmend.openaudiomc.generic.api.implementaions;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.MediaApi;
import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.api.media.UrlMutation;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.media.objects.Sound;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientDestroyMedia;
import org.jetbrains.annotations.NotNull;

import static com.craftmend.openaudiomc.generic.api.utils.ApiUtils.validateClient;

public class MediaApiImpl implements MediaApi {

    @NotNull
    @Override
    public Media createMedia(@NotNull String source) {
        return new Sound(source);
    }

    @NotNull
    @Override
    public String translateSource(@NotNull String source) {
        return OpenAudioMc.getService(MediaService.class).process(source);
    }

    @Override
    public void registerMutation(@NotNull String prefix, @NotNull UrlMutation mutation) {
        OpenAudioMc.getService(MediaService.class).registerMutation(prefix, mutation);
    }

    @Override
    public long getNormalizedCurrentEpoch() {
        return OpenAudioMc.getService(TimeService.class).getSyncedInstant().toEpochMilli();
    }

    @Override
    public void playFor(@NotNull Media media, @NotNull Client... clients) {
        for (Client client : clients) {
            client.playMedia(media);
        }
    }

    @Override
    public void stopFor(@NotNull Client... clients) {
        for (Client client : clients) {
            OpenAudioMc.getService(NetworkingService.class).send(validateClient(client), new PacketClientDestroyMedia(null));
        }
    }

    @Override
    public void stopFor(@NotNull String id, @NotNull Client... clients) {
        for (Client client : clients) {
            OpenAudioMc.getService(NetworkingService.class).send(validateClient(client), new PacketClientDestroyMedia(id));
        }
    }
}
