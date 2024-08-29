package com.craftmend.openaudiomc.spigot.modules.players.objects;

import com.craftmend.openaudiomc.generic.commands.selectors.SelectorTranslator;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.users.adapters.SpigotUserAdapter;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.FakeCommandSender;
import org.bukkit.Bukkit;
import org.bukkit.Location;

import org.bukkit.command.BlockCommandSender;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class SpigotPlayerSelector implements SelectorTranslator<CommandSender> {

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
        List<Player> players = getPlayers(sender);
        List<User<CommandSender>> users = new ArrayList<>();
        for (Player player : players) {
            users.add(new SpigotUserAdapter(player));
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
    private List<Player> getPlayers(CommandSender commandSender) {
        List<Player> players = new ArrayList<>();

        if (selector.startsWith("@p")) {
            //get Location
            Location standPoint = getLocation(commandSender);

            if (getArgument("r").length() != 0) {
                int radius = Integer.parseInt(getArgument("r"));
                Player nearest = Bukkit.getOnlinePlayers().stream()
                        .filter(player -> player.getLocation().getWorld().getName().equals(standPoint.getWorld().getName()))
                        .min(Comparator.comparing(player -> player.getLocation().distance(standPoint)))
                        .filter(player -> radius > player.getLocation().distance(standPoint))
                        .get();
                players.add(nearest);
            }

            if (getArgument("distance").length() != 0) {
                int distance = Integer.parseInt(getArgument("distance"));
                Player nearest = Bukkit.getOnlinePlayers().stream()
                        .filter(player -> player.getLocation().getWorld().getName().equals(standPoint.getWorld().getName()))
                        .min(Comparator.comparing(player -> player.getLocation().distance(standPoint)))
                        .filter(player -> distance > player.getLocation().distance(standPoint))
                        .get();
                players.add(nearest);
            }

            else {
                Bukkit.getOnlinePlayers().stream()
                        .filter(player -> player.getLocation().getWorld().getName().equals(standPoint.getWorld().getName()))
                        .min(Comparator.comparing(player -> player.getLocation().distance(standPoint)))
                        .ifPresent(players::add);
            }
        }
        else if (selector.startsWith("@a")) {
            //everyone
            Location standPoint = getLocation(commandSender);

            if (getArgument("region").length() != 0) {
                RegionModule regionModule = OpenAudioMcSpigot.getInstance().getRegionModule();
                String targetRegion = getArgument("region");
                if (regionModule != null) {
                    for (Player player : Bukkit.getOnlinePlayers()) {
                        regionModule.getRegionAdapter()
                                .getRegionsAtLocation(player.getLocation(standPoint)).forEach(region -> {
                            if (region.getName().equalsIgnoreCase(targetRegion)) {
                                players.add(player);
                            }
                        });
                    }
                } else {
                    commandSender.sendMessage("You dont have worldguard installed. Skipping the region argument.");
                }
            } else if (getArgument("r").length() != 0) {
                int radius = Integer.parseInt(stripNonNumeric(getArgument("r")));
                players.addAll(Bukkit.getOnlinePlayers().stream()
                        .filter(player -> player.getLocation().getWorld().getName().equals(standPoint.getWorld().getName()))
                        .filter(player -> radius > player.getLocation().distance(standPoint))
                        .collect(Collectors.toList()));
            } else if (getArgument("distance").length() != 0) {
                int distance = Integer.parseInt(stripNonNumeric(getArgument("distance")));
                players.addAll(Bukkit.getOnlinePlayers().stream()
                        .filter(player -> player.getLocation().getWorld().getName().equals(standPoint.getWorld().getName()))
                        .filter(player -> distance > player.getLocation().distance(standPoint))
                        .collect(Collectors.toList()));
            } else if (getArgument("world").length() != 0) {
                String world = getArgument("world");
                players.addAll(Bukkit.getOnlinePlayers().stream()
                        .filter(player -> player.getLocation().getWorld().getName().equals(world))
                        .collect(Collectors.toList()));
            } else {
                players.addAll(Bukkit.getOnlinePlayers().stream()
                        .filter(player -> player.getLocation().getWorld().getName().equals(standPoint.getWorld().getName()))
                        .collect(Collectors.toList()));
            }
        }
        else if (selector.length() <= 16) {
            //player
            Player player = Bukkit.getPlayer(selector);
            if (player != null) players.add(player);
        }
        else {
            //you fucked it
            OpenAudioLogger.warn("Invalid player query. Try something like @a, @p, username or other arguments.");
            commandSender.sendMessage("Invalid player query. Try something like @a, @p, username or other arguments.");
        }
        return players;
    }

    private String stripNonNumeric(String input) {
        return input.replaceAll("[^\\d-]", "");
    }

    /**
     * attempt to parse the location
     *
     * @param commandSender the sender
     * @return the location or null
     */
    private Location getLocation(CommandSender commandSender) {
        Location initialLocation = new Location(Bukkit.getWorlds().get(0), 0, 0, 0);

        if (commandSender instanceof Player) {
            initialLocation = ((Player) commandSender).getLocation();
        } else if (commandSender instanceof BlockCommandSender) {
            initialLocation = ((BlockCommandSender) commandSender).getBlock().getLocation();
        } else if (commandSender instanceof FakeCommandSender) {
            initialLocation = new Location(((FakeCommandSender) commandSender).getWorld(), 0, 0, 0);
        }

        if (!getArgument("x").equals("") && !getArgument("y").equals("") && !getArgument("z").equals("")) {
            try {
                int x = Integer.parseInt(stripNonNumeric(getArgument("x")));
                int y = Integer.parseInt(stripNonNumeric(getArgument("y")));
                int z = Integer.parseInt(stripNonNumeric(getArgument("z")));
                return new Location(initialLocation.getWorld(), x, y, z);
            } catch (Exception e) {
                commandSender.sendMessage("An error occurred when parsing the location as an Integer");
                return initialLocation;
            }
        }

        return initialLocation;
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

        return result.toString().replaceAll(".", "");
    }
}
