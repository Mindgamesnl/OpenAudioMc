package com.craftmend.openaudiomc.generic.api.implementaions;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.MediaApi;
import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.api.media.UrlMutation;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientDestroyMedia;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientPreFetch;
import com.craftmend.openaudiomc.generic.networking.payloads.client.media.ClientPreFetchPayload;
import org.jetbrains.annotations.NotNull;

import static com.craftmend.openaudiomc.generic.api.utils.ApiUtils.validateClient;

public class MediaApiImpl implements MediaApi {

    @NotNull
    @Override
    public Media createMedia(@NotNull String source) {
        return new Media(source);
    }

    @Override
    public void preloadMediaSource(Client client, String mediaSource, boolean keepCopy) {
        ClientPreFetchPayload payload = new ClientPreFetchPayload(OpenAudioMc.getService(MediaService.class).process(mediaSource), "api", false, keepCopy);
        if (client.isConnected()) {
            OpenAudioMc.getService(NetworkingService.class).send(validateClient(client),
                    new PacketClientPreFetch(payload)
            );
        }
    }

    @Override
    public void preloadMedia(Client client, Media media, boolean keepCopy) {
        this.preloadMediaSource(client, media.getSource(), keepCopy);
    }

    @Override
    public void clearPreloadedMedia(Client client) {
        ClientPreFetchPayload payload = new ClientPreFetchPayload(null, "api", true, false);
        if (client.isConnected()) {
            OpenAudioMc.getService(NetworkingService.class).send(validateClient(client),
                    new PacketClientPreFetch(payload)
            );
        }
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

    @Override
    public void stopFor(@NotNull String id, int fadeTime, @NotNull Client... clients) {
        for (Client client : clients) {
            OpenAudioMc.getService(NetworkingService.class).send(validateClient(client), new PacketClientDestroyMedia(id, fadeTime));
        }
    }

    @Override
    public void stopFor(int fadeTime, @NotNull Client... clients) {
        for (Client client : clients) {
            OpenAudioMc.getService(NetworkingService.class).send(validateClient(client), new PacketClientDestroyMedia(null, fadeTime));
        }
    }
}
