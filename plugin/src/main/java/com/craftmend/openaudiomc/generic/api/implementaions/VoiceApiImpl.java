package com.craftmend.openaudiomc.generic.api.implementaions;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.VoiceApi;
import com.craftmend.openaudiomc.api.channels.VoiceChannel;
import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.events.client.ClientPeerAddEvent;
import com.craftmend.openaudiomc.api.events.client.ClientPeerRemovedEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.api.voice.CustomPlayerFilter;
import com.craftmend.openaudiomc.api.voice.DisplayOverride;
import com.craftmend.openaudiomc.api.voice.VoicePeerOptions;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientVoiceOptionsUpdate;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceOptionsPayload;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.spigot.modules.voicechat.VoiceChannelService;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.FilterService;
import org.jetbrains.annotations.Nullable;

import java.util.*;

public class VoiceApiImpl implements VoiceApi {

    @Override
    public boolean hasPeer(Client haystack, Client needle) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) {
            throw new IllegalStateException("This method is only available on the spigot platform");
        }

        return hasPeer(haystack, needle.getActor().getUniqueId());
    }

    @Override
    public boolean hasPeer(Client haystack, UUID needle) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) {
            throw new IllegalStateException("This method is only available on the spigot platform");
        }

        ClientConnection clientConnection = (ClientConnection) haystack;
        return clientConnection.getRtcSessionManager().isPeer(needle);
    }

    @Override
    public void updatePeerOptions(Client client, Client peerToUpdate, VoicePeerOptions options) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) {
            throw new IllegalStateException("This method is only available on the spigot platform");
        }

        Objects.requireNonNull(peerToUpdate, "Peer cannot be null");
        Objects.requireNonNull(options, "Options cannot be null");

        ClientConnection clientConnection = (ClientConnection) client;
        ClientConnection peerConnection = (ClientConnection) peerToUpdate;

        // do we have this peer?
        if (!clientConnection.getRtcSessionManager().isPeer(peerConnection.getActor().getUniqueId())) {
            throw new IllegalArgumentException("Peer is not connected to this client");
        }

        // update the options
        ClientConnection peerCon = OpenAudioMc.getService(NetworkingService.class).getClient(peerConnection.getUser().getUniqueId());
        PacketClientVoiceOptionsUpdate packet = new PacketClientVoiceOptionsUpdate(
                new ClientVoiceOptionsPayload(peerCon.getRtcSessionManager().getStreamKey(), options)
        );
        clientConnection.sendPacket(packet);
    }

    private boolean isProximityPeer(Client haystack, Client needle) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) {
            throw new IllegalStateException("This method is only available on the spigot platform");
        }

        ClientConnection haystackConnection = (ClientConnection) haystack;
        return haystackConnection.getRtcSessionManager().getCurrentProximityPeers().contains(needle.getActor().getUniqueId());
    }

    public boolean isGlobalPeer(Client haystack, Client needle) {
        ClientConnection haystackConnection = (ClientConnection) haystack;
        return haystackConnection.getRtcSessionManager().getCurrentGlobalPeers().contains(needle.getActor().getUniqueId());
    }

    @Override
    public void addStaticPeer(Client client, Client peerToAdd, boolean visible, boolean mutual) {
        addStaticPeer(client, peerToAdd, visible, mutual, null);
    }

    @Override
    public void addStaticPeer(Client client, Client peerToAdd, boolean visible, boolean mutual, DisplayOverride displayOverride) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) {
            throw new IllegalStateException("This method is only available on the spigot platform");
        }

        if (displayOverride != null && displayOverride.getName() != null && displayOverride.getName().length() > 32) {
            throw new IllegalArgumentException("Display name cannot be longer than 32 characters");
        }

        VoicePeerOptions options = new VoicePeerOptions();
        options.setSpatialAudio(false);
        options.setVisible(visible);
        // may put in null, that's fine.
        options.setDisplayOverride(displayOverride);

        ClientConnection clientConnection = (ClientConnection) client;
        ClientConnection peerConnection = (ClientConnection) peerToAdd;

        if (!clientConnection.getRtcSessionManager().isReady() || !peerConnection.getRtcSessionManager().isReady()) {
            throw new IllegalStateException("Both clients must be ready (connected and have voice chat enabled) before adding a peer");
        }

        // fire event
        ClientPeerAddEvent event = (ClientPeerAddEvent) EventApi.getInstance().callEvent(new ClientPeerAddEvent(client, peerToAdd, options));
        if (!event.isCancelled()) {
            if (isProximityPeer(client, peerToAdd)) {
                updatePeerOptions(client, peerToAdd, options);
                clientConnection.getRtcSessionManager().getCurrentGlobalPeers().add(peerToAdd.getActor().getUniqueId());
                clientConnection.getRtcSessionManager().getCurrentProximityPeers().remove(peerToAdd.getActor().getUniqueId());
            } else {
                clientConnection.getRtcSessionManager().getCurrentGlobalPeers().add(peerToAdd.getActor().getUniqueId());
                clientConnection.getPeerQueue().addSubscribe(peerConnection, clientConnection, options);
            }
        }

        if (mutual) {
            addStaticPeer(peerToAdd, client, visible, false);
        }
    }

    @Override
    public void removeStaticPeer(Client client, Client peerToRemove, boolean mutual) {
        if (OpenAudioMc.getInstance().getPlatform() != Platform.SPIGOT) {
            throw new IllegalStateException("This method is only available on the spigot platform");
        }

        EventApi.getInstance().callEvent(new ClientPeerRemovedEvent(client, peerToRemove));

        if (isGlobalPeer(client, peerToRemove)) {
            ClientConnection clientConnection = (ClientConnection) client;
            ClientConnection peerConnection = (ClientConnection) peerToRemove;
            clientConnection.getRtcSessionManager().getCurrentGlobalPeers().remove(peerToRemove.getActor().getUniqueId());
            clientConnection.getPeerQueue().drop(peerConnection.getRtcSessionManager().getStreamKey());
        }

        if (mutual) {
            removeStaticPeer(peerToRemove, client, false);
        }
    }

    @Override
    public void addFilterFunction(CustomPlayerFilter customPlayerFilter) {
        OpenAudioMc.getService(FilterService.class).addCustomFilter(customPlayerFilter);
    }

    @Override
    public List<CustomPlayerFilter> getCustomPlayerFilters() {
        return OpenAudioMc.getService(FilterService.class).getCustomPlayerFilters();
    }

    @Override
    public Collection<VoiceChannel> getChannels() {
        return new ArrayList<>(OpenAudioMc.getService(VoiceChannelService.class).getChannels());
    }

    @Nullable
    @Override
    public VoiceChannel getChannel(String name) {
        return OpenAudioMc.getService(VoiceChannelService.class).getChannel(name);
    }

    @Override
    public VoiceChannel createChannel(String name, Client creator, boolean requiresPermission, @Nullable String requiredPermission) {
        return OpenAudioMc.getService(VoiceChannelService.class).createChannel(name, creator, requiresPermission, requiredPermission);
    }

    @Override
    public void deleteChannel(VoiceChannel channel) {
        OpenAudioMc.getService(VoiceChannelService.class).deleteChannel(channel.getName());
    }

    @Override
    public boolean isChannelNameValid(String s) {
        return OpenAudioMc.getService(VoiceChannelService.class).isChannelNameValid(s);
    }
}
