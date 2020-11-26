package me.fluse1367.port.com.ikeirnez.pluginmessageframework.implementations;

import com.velocitypowered.api.event.Subscribe;
import com.velocitypowered.api.event.connection.PluginMessageEvent;
import com.velocitypowered.api.event.connection.PostLoginEvent;
import com.velocitypowered.api.proxy.Player;
import com.velocitypowered.api.proxy.ProxyServer;
import com.velocitypowered.api.proxy.ServerConnection;
import com.velocitypowered.api.proxy.messages.LegacyChannelIdentifier;
import me.fluse1367.port.com.ikeirnez.pluginmessageframework.PacketManager;
import me.fluse1367.port.com.ikeirnez.pluginmessageframework.PacketPlayer;

/**
 * Created by iKeirNez on 24/12/13, ported to velocity and modified by fluse1367 on 11/2020.
 */
public class VelocityPacketManager extends PacketManager {

    private final ProxyServer proxy;

    public VelocityPacketManager(Object velocityPlugin, ProxyServer proxy, String channel) {
        super(channel);

        this.proxy = proxy;
        this.proxy.getEventManager().register(velocityPlugin, this);
        this.proxy.getChannelRegistrar().register(new LegacyChannelIdentifier(channel));
    }

    @Override
    protected void sendPluginMessage(PacketPlayer packetPlayer, String channel, byte[] bytes) {
        packetPlayer.getVelocityPlayer().getCurrentServer()
                .orElseThrow(() -> new IllegalStateException("Cannot send packet if player is not connected to any server."))
                .sendPluginMessage(new LegacyChannelIdentifier(channel), bytes);
    }

    @Override
    protected int getPlayerCount() {
        return proxy.getPlayerCount();
    }

    @Override
    protected PacketPlayer getRandomPlayer() {
        return getPlayerCount() > 0 ? new PacketPlayer(proxy.getAllPlayers().iterator().next()) : null;
    }

    @Subscribe
    public void onPluginMessage(PluginMessageEvent e) {
        String channel = e.getIdentifier().getId();

        if (channel.equals(getChannel())) {
            e.setResult(PluginMessageEvent.ForwardResult.handled());

            if (e.getSource() instanceof ServerConnection) { // prevents players faking a plugin message
                Player velocityPlayer = (Player) e.getTarget();
                dispatchIncomingPacket(new PacketPlayer(velocityPlayer), e.getData());
            }
        }
    }

    @Subscribe
    public void onPlayerJoin(PostLoginEvent e) {
        if (getPlayerCount() == 1) {
            playerJoined(new PacketPlayer(e.getPlayer()));
        }
    }
}
