package com.craftmend.openaudiomc.generic.events.adapter;

import com.craftmend.openaudiomc.api.events.Handler;
import com.craftmend.openaudiomc.api.events.client.*;
import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import com.craftmend.openaudiomc.api.impl.event.enums.TickEventType;
import com.craftmend.openaudiomc.api.impl.event.events.ClientRequestVoiceEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.events.events.TimeServiceUpdateEvent;

public class LegacyEventAdapter {

    /**
     * Legacy event adapter, used to bridge the gap between the new and old event system, will be removed in the future
     */

    /**
     * Legacy event driver
     */
    private ApiEventDriver legacyEventDriver = AudioApi.getInstance().getEventDriver();


    @Handler
    public void onConnect(ClientConnectEvent event) {
        legacyEventDriver.fire(new com.craftmend.openaudiomc.api.impl.event.events.ClientConnectEvent(toClientConnection(event.getClient())));
    }

    @Handler
    public void onDisconnect(com.craftmend.openaudiomc.api.events.client.ClientDisconnectEvent event) {
        legacyEventDriver.fire(new com.craftmend.openaudiomc.api.impl.event.events.ClientDisconnectEvent(toClientConnection(event.getClient())));
    }

    @Handler
    public void onMediaError(com.craftmend.openaudiomc.api.events.client.MediaErrorEvent event) {
        legacyEventDriver.fire(new com.craftmend.openaudiomc.api.impl.event.events.ClientErrorEvent(toClientConnection(event.getClient()), event.getMediaError(), event.getMediaSource()));
    }

    @Handler
    public void onVoiceEnable(ClientEnableVoiceEvent event) {
        if (event.isCancelled()) return;
        ClientRequestVoiceEvent e = legacyEventDriver.fire(new com.craftmend.openaudiomc.api.impl.event.events.ClientRequestVoiceEvent(toClientConnection(event.getClient())));
        if (e.isCanceled()) event.setCancelled(true);
    }

    @Handler
    public void onMute(MicrophoneMuteEvent event) {
        legacyEventDriver.fire(new com.craftmend.openaudiomc.api.impl.event.events.MicrophoneMuteEvent(toClientConnection(event.getClient())));
    }

    @Handler
    public void onUnmute(MicrophoneUnmuteEvent event) {
        legacyEventDriver.fire(new com.craftmend.openaudiomc.api.impl.event.events.MicrophoneUnmuteEvent(toClientConnection(event.getClient())));
    }

    @Handler
    public void onDeafen(VoicechatDeafenEvent event) {
        legacyEventDriver.fire(new com.craftmend.openaudiomc.api.impl.event.events.VoicechatDeafenEvent(toClientConnection(event.getClient())));
    }

    @Handler
    public void onUndeafen(VoicechatUndeafenEvent event) {
        legacyEventDriver.fire(new com.craftmend.openaudiomc.api.impl.event.events.VoicechatUndeafenEvent(toClientConnection(event.getClient())));
    }

    @Handler
    public void onVoiceRead(VoicechatReadyEvent event) {
        legacyEventDriver.fire(new com.craftmend.openaudiomc.api.impl.event.events.PlayerConnectVoicechatEvent(toClientConnection(event.getClient())));
    }

    @Handler
    public void onPeerAdd(ClientPeerAddEvent event) {
        legacyEventDriver.fire(new com.craftmend.openaudiomc.api.impl.event.events.PlayerEnterVoiceProximityEvent(toClientConnection(event.getClient()), toClientConnection(event.getPeer())));
    }

    @Handler
    public void onPeerRemove(ClientPeerRemovedEvent event) {
        legacyEventDriver.fire(new com.craftmend.openaudiomc.api.impl.event.events.PlayerLeaveVoiceProximityEvent(toClientConnection(event.getClient()), toClientConnection(event.getPeer())));
    }

    @Handler
    public void onReload(SystemReloadEvent event) {
        legacyEventDriver.fire(new com.craftmend.openaudiomc.api.impl.event.events.SystemReloadEvent());
    }

    @Handler
    public void onTimeServiceUpdate(TimeServiceUpdateEvent event) {
        legacyEventDriver.fire(new com.craftmend.openaudiomc.api.impl.event.events.TimeServiceUpdateEvent(event.getTimeService()));
    }

    @Handler
    public void onVoicePeerTick(VoicechatPeerTickEvent event) {
        legacyEventDriver.fire(new com.craftmend.openaudiomc.api.impl.event.events.VoiceChatPeerTickEvent(TickEventType.AFTER_TICK));
    }

    @Deprecated
    private ClientConnection toClientConnection(com.craftmend.openaudiomc.api.clients.Client client) {
        if (client == null) throw new IllegalArgumentException("Client cannot be null");
        if (client instanceof ClientConnection) return (ClientConnection) client;
        throw new IllegalArgumentException("Client is not a legacy client");
    }
}
