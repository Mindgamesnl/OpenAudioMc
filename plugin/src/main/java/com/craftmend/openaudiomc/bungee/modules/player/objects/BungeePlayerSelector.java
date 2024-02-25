package com.craftmend.openaudiomc.bungee.modules.player.objects;

import com.craftmend.openaudiomc.generic.commands.selectors.SelectorTranslator;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.user.adapters.BungeeUserAdapter;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.ProxyServer;
import net.md_5.bungee.api.connection.ProxiedPlayer;

import java.util.ArrayList;
import java.util.List;

public class BungeePlayerSelector implements SelectorTranslator<CommandSender> {

    private String selector;
    private CommandSender sender;

    @Override
    public void setString(String selector) {
        this.selector = selector;
    }

    @Override
    public void setSender(User<CommandSender> sender) {
        this.sender = sender.getOriginal();
    }

    @Override
    public List<User<CommandSender>> getResults() {
        List<ProxiedPlayer> players = getPlayers(sender);
        List<User<CommandSender>> users = new ArrayList<>();
        for (ProxiedPlayer player : players) {
            users.add(new BungeeUserAdapter(player));
        }
        return users;
    }

    /**
     * this turns selectors like @a[r=5] into a usable list, since
     * 1.13 spigot removed this feature, FOR SOME REASON.. thanks guys..
     *
     * @param commandSender the sender
     * @return players following the selector
     */
    private List<ProxiedPlayer> getPlayers(CommandSender commandSender) {
        List<ProxiedPlayer> players = new ArrayList<>();

        if (selector.startsWith("@a")) {
            //everyone
            if (getArgument("server").length() != 0) {
                String targetServer = getArgument("server");
                for (ProxiedPlayer player : ProxyServer.getInstance().getPlayers()) {
                    if (player.getServer().getInfo().getName().equals(targetServer)) {
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
            OpenAudioLogger.warn("Invalid player query. Try something like @a, @a[server=lobby], username or other arguments.");
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
