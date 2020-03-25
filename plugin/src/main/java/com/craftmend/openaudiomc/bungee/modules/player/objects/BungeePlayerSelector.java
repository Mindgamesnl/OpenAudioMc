package com.craftmend.openaudiomc.bungee.modules.player.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import lombok.AllArgsConstructor;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.ProxyServer;
import net.md_5.bungee.api.connection.ProxiedPlayer;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
public class BungeePlayerSelector {

    private String selector;

    /**
     * this turns selectors like @a[r=5] into a usable list, since
     * 1.13 spigot removed this feature, FOR SOME REASON.. thanks guys..
     *
     * @param commandSender the sender
     * @return players following the selector
     */
    public List<ProxiedPlayer> getPlayers(CommandSender commandSender) {
        List<ProxiedPlayer> players = new ArrayList<>();

        if (selector.startsWith("@a")) {
            //everyone
            if (getArgument("server").length() != 0) {
                String targetServer = getArgument("server");
                for (ProxiedPlayer player : ProxyServer.getInstance().getPlayers()) {
                    if (player.getServer().getInfo().getName().equals(serverName(commandSender))) {
                        players.add(player);
                    }
                }
                return players;
            }
            players.addAll(ProxyServer.getInstance().getPlayers());
            return players;
        } else if (selector.length() <= 16) {
            //player
            ProxiedPlayer proxiedPlayer = ProxyServer.getInstance().getPlayer(selector);
            if (proxiedPlayer != null) players.add(proxiedPlayer);
        } else {
            //you fucked it
            commandSender.sendMessage("Invalid player query. Try something like @a, @a[server=lobby], username or other arguments.");
        }
        return players;
    }

    private String serverName(CommandSender sender) {
        ProxiedPlayer player = (ProxiedPlayer) sender;
        if (sender instanceof ProxiedPlayer) {
            return player.getServer().getInfo().getName();
        }
        return null;
    }

    private String getArgument(String key) {
        StringBuilder result = new StringBuilder();
        String[] arguments = selector.split(key + "=");
        if (arguments.length == 1) return "";
        for (byte type : arguments[1].getBytes()) {
            char element = (char) type;
            if (element == ',' || element == ']') {
                return result.toString();
            } else {
                result.append(element);
            }
        }
        return result.toString();
    }

}
