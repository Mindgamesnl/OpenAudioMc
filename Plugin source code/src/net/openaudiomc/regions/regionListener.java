package net.openaudiomc.regions;

import com.sk89q.worldguard.bukkit.WorldGuardPlugin;
import com.sk89q.worldguard.protection.ApplicableRegionSet;
import com.sk89q.worldguard.protection.managers.RegionManager;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;
import net.openaudiomc.actions.command;
import net.openaudiomc.internal.events.SocketUserDisconnectEvent;
import net.openaudiomc.minecraft.Main;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.*;

import java.io.File;
import java.io.IOException;
import java.util.*;

/**
 * Created by mats on 16-5-2017.
 */
public class regionListener implements Listener{

    public Map<Player, Set<ProtectedRegion>> playerRegions = new HashMap();
    public static HashMap<Player, ArrayList<String>> history = new HashMap<Player, ArrayList<String>>();
    public static Main plugin;
    public static WorldGuardPlugin wgPlugin;

    public static void setup(Main oapl, WorldGuardPlugin wgpg) {
        wgPlugin = wgpg;
        plugin = oapl;
    }

    private void start(final Player p, ApplicableRegionSet appRegions, Set<ProtectedRegion> regions) {
        ProtectedRegion finalel = null;
        Integer priorety = 0;
        Integer foundNum = 0;
        Boolean found = false;
        for (final ProtectedRegion region : appRegions) {

            if (history.get(p) == null) {
                Bukkit.broadcastMessage("create");
                history.put(p, new ArrayList<String>());
            }

            if (!regions.contains(region)) {

                if (isValidRegion(region.getId())) {
                    found = true;

                    foundNum++;
                    if (region.getPriority() > priorety || region.getPriority() == priorety) {
                        priorety = region.getPriority();
                        finalel = region;

                    }
                    regions.add(region);
                }
            }
        }
        if (found) {
            final ProtectedRegion finalEl = finalel;
            final Integer finalFoundNum = foundNum;

                    for (String s : history.get(p)) {
                        if (getRegionFile(finalEl.getId()) != s) {
                            command.stopRegion(p.getName(), s);
                        }
                    }

                    if (isValidRegion(finalEl.getId())) {
                        if (!history.get(p).contains(getRegionFile(finalEl.getId()))) {
                            command.playRegion(p.getName(), getRegionFile(finalEl.getId()));
                            Bukkit.broadcastMessage("write");
                            history.get(p).add(getRegionFile(finalEl.getId()));
                        } else {

                            if (history.get(p).size() == 1 && history.get(p).contains(getRegionFile(finalEl.getId()))) {
                                Bukkit.broadcastMessage("remove");
                                history.get(p).remove(getRegionFile(finalEl.getId()));
                                command.playRegion(p.getName(), getRegionFile(finalEl.getId()));
                            }
                        }
                    }


        }

    }

    public void onSocketClose(SocketUserDisconnectEvent e) {
        String pName = e.getName();
        playerRegions.get(pName).clear();
        history.get(pName).clear();
    }

    private void end(Player p, ProtectedRegion region) {
        command.stopRegion(p.getName(), getRegionFile(region.getId()));
        history.get(p).clear();
        playerRegions.get(p).clear();
    }

    @EventHandler
    public void onPlayerMove(PlayerMoveEvent e) {
        e.setCancelled(updateRegions(e.getPlayer(), MovementWay.MOVE, e.getTo(), e));
    }

    @EventHandler
    public void onPlayerTeleport(PlayerTeleportEvent e) {
        e.setCancelled(updateRegions(e.getPlayer(), MovementWay.TELEPORT, e.getTo(), e));
    }

    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent e) {
        updateRegions(e.getPlayer(), MovementWay.SPAWN, e.getPlayer().getLocation(), e);
    }

    @EventHandler
    public void onPlayerRespawn(PlayerRespawnEvent e) {
        updateRegions(e.getPlayer(), MovementWay.SPAWN, e.getRespawnLocation(), e);
    }


    //from wgregionevents, original by mewin.
    private synchronized boolean updateRegions(final Player player, final MovementWay movement, Location to, final PlayerEvent event) {
        Set<ProtectedRegion> regions;
        if (this.playerRegions.get(player) == null) {
            regions = new HashSet();
        } else {
            regions = new HashSet((Collection)this.playerRegions.get(player));
        }
        Set<ProtectedRegion> oldRegions = new HashSet(regions);

        RegionManager rm = this.wgPlugin.getRegionManager(to.getWorld());
        if (rm == null) {
            return false;
        }
        ApplicableRegionSet appRegions = rm.getApplicableRegions(to);

        //for ding
        start(player, appRegions, regions);

        Collection<ProtectedRegion> app = appRegions.getRegions();
        Object itr = regions.iterator();
        while (((Iterator)itr).hasNext()) {
            final ProtectedRegion region = (ProtectedRegion)((Iterator)itr).next();
            if (!app.contains(region)) {
                if (rm.getRegion(region.getId()) != region) {
                    ((Iterator)itr).remove();
                } else {

                    Bukkit.getScheduler().runTaskLater(this.plugin, new Runnable()
                    {
                        public void run()
                        {
                            end(player, region);
                        }
                    }, 1L);
                    ((Iterator)itr).remove();
                }
            }
        }
        this.playerRegions.put(player, regions);
        return false;
    }

    //returns file of a region
    public static String getRegionFile(String regionName) {
        if (isValidRegion(regionName) == true) {
            return file.getString("region.src." + regionName);
        } else {
            return "InvalidSource";
        }
    }


    public static String getRegionWorld(String regionName) {
        if (file.getString("world." + regionName) !=null && file.getString("region.isvalid." + regionName).equals("true")) {
            return file.getString("world." + regionName);
        } else {
            return "<none>";
        }
    }

    //check if a region ia know to openaudio (true = valid)
    public static Boolean isValidRegion(String regionName) {
        if (file.getString("region.isvalid." + regionName) !=null && file.getString("region.isvalid." + regionName).equals("true")) {
            return true;
        } else {
            return false;
        }
    }

    public static void registerRegion(String regionName, String src, Player p) {
        FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "regions.yml"));
        File regionsFile = new File("plugins/OpenAudio", "regions.yml");
        cfg.set("region.isvalid."+regionName, "true");
        cfg.set("region.src."+regionName, src);
        cfg.set("world."+regionName, p.getLocation().getWorld().getName());
        try {
            cfg.save(regionsFile);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }


    public static void deleteRegion(String regionName) {
        FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio", "regions.yml"));
        File regionsFile = new File("plugins/OpenAudio", "regions.yml");
        cfg.set("region.isvalid."+regionName, "false");
        cfg.set("region.src."+regionName, "<deleted>");
        try {
            cfg.save(regionsFile);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

}
