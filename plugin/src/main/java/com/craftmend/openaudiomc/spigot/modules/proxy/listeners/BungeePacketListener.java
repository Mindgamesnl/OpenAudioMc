package com.craftmend.openaudiomc.spigot.modules.proxy.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.node.packets.ClientConnectedPacket;
import com.craftmend.openaudiomc.generic.node.packets.ClientDisconnectedPacket;
import com.craftmend.openaudiomc.generic.node.packets.ClientSyncHueStatePacket;
import com.craftmend.openaudiomc.generic.node.packets.CommandProxyPacket;
import com.craftmend.openaudiomc.spigot.modules.proxy.objects.FakeCommandSender;

import me.fluse1367.port.com.ikeirnez.pluginmessageframework.PacketHandler;
import me.fluse1367.port.com.ikeirnez.pluginmessageframework.PacketListener;

import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

public class BungeePacketListener implements PacketListener {

    @PacketHandler
    public void onConnect(ClientConnectedPacket packet) {
        ClientConnection connection = OpenAudioMc.getInstance().getNetworkingService().getClient(packet.getClientUuid());
        if (connection != null) connection.onConnect();
    }

    @PacketHandler
    public void onDisconnect(ClientDisconnectedPacket packet) {
        ClientConnection connection = OpenAudioMc.getInstance().getNetworkingService().getClient(packet.getClientUuid());
        if (connection != null) connection.onDisconnect();
    }

    @PacketHandler
    public void onHue(ClientSyncHueStatePacket packet) {
        ClientConnection connection = OpenAudioMc.getInstance().getNetworkingService().getClient(packet.getClientUuid());
        connection.setHasHueLinked(true);
    }

    @PacketHandler
    public void onCommand(CommandProxyPacket packet) {
        Player player = Bukkit.getPlayer(packet.commandProxy.getExecutor());
        if (player == null) return;
        FakeCommandSender fakeCommandSender = new FakeCommandSender(player);
        OpenAudioMc.getInstance().getCommandModule().getSubCommand(packet.commandProxy.getCommandProxy().toString().toLowerCase()).onExecute(fakeCommandSender, packet.commandProxy.getArgs());
    }

}
