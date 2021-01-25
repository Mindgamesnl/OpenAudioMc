package com.craftmend.openaudiomc.velocity.modules.player.objects;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.velocitypowered.api.command.CommandSource;
import com.velocitypowered.api.proxy.Player;
import lombok.AllArgsConstructor;
import net.kyori.adventure.text.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
public class VelocityPlayerSelector {

    private final String selector;

    /**
     * this turns selectors like @a[r=5] into a usable list, since
     * 1.13 spigot removed this feature, FOR SOME REASON.. thanks guys..
     *
     * @param source the sender
     * @return players following the selector
     */
    public List<Player> getPlayers(CommandSource source) {
        List<Player> players = new ArrayList<>();

        if (selector.startsWith("@a")) {
            //everyone
            if (getArgument("server").length() != 0) {
                String targetServer = getArgument("server");
                return OpenAudioMcVelocity.getInstance().getServer().getAllPlayers().stream()
                        .filter(all -> all.getCurrentServer().isPresent())
                        .filter(all -> all.getCurrentServer().get().getServerInfo().getName().equals(targetServer))
                        .collect(Collectors.toList());
            }
            return new ArrayList<>(OpenAudioMcVelocity.getInstance().getServer().getAllPlayers());
        } else if (selector.length() <= 16) {
            //player
            Optional<Player> player = OpenAudioMcVelocity.getInstance().getServer().getPlayer(selector);
            if (player.isPresent())
                return Collections.singletonList(player.get());
        } else {
            //you fucked it
            OpenAudioLogger.toConsole("Invalid player query. Try something like @a, @a[server=lobby], username or other arguments.");
            source.sendMessage(Component.text("Invalid player query. Try something like @a, @a[server=lobby], username or other arguments."));
        }
        return players;
    }

    private String serverName(CommandSource source) {
        if (!(source instanceof Player)) {
            return null;
        }
        return ((Player) source).getCurrentServer()
                .map(server -> server.getServerInfo().getName())
                .orElse(null);

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
