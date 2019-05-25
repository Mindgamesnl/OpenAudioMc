package com.craftmend.openaudiomc.modules.speakers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.players.objects.Client;
import com.craftmend.openaudiomc.modules.server.enums.ServerVersion;
import com.craftmend.openaudiomc.modules.speakers.listeners.SpeakerCreateListener;
import com.craftmend.openaudiomc.modules.speakers.listeners.SpeakerDestroyListener;
import com.craftmend.openaudiomc.modules.speakers.objects.ApplicableSpeaker;
import com.craftmend.openaudiomc.modules.speakers.objects.SimpleLocation;
import com.craftmend.openaudiomc.modules.speakers.objects.Speaker;
import com.craftmend.openaudiomc.modules.speakers.objects.SpeakerMedia;

import lombok.Getter;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.block.Block;
import org.bukkit.block.Skull;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.SkullMeta;

import java.util.*;

public class SpeakerModule {

    @Getter
    private Map<SimpleLocation, Speaker> speakerMap = new HashMap<>();
    private Map<String, SpeakerMedia> speakerMediaMap = new HashMap<>();
    private Material playerSkullItem;
    private ServerVersion version;

    public SpeakerModule(OpenAudioMc openAudioMc) {
        openAudioMc.getServer().getPluginManager().registerEvents(new SpeakerCreateListener(openAudioMc, this), openAudioMc);
        openAudioMc.getServer().getPluginManager().registerEvents(new SpeakerDestroyListener(openAudioMc, this), openAudioMc);

        version = openAudioMc.getServerModule().getVersion();


        if (version == ServerVersion.MODERN) {
            System.out.println(OpenAudioMc.getLOG_PREFIX() + "Enabling the 1.13 speaker system");
            playerSkullItem = Material.PLAYER_HEAD;
        } else {
            System.out.println(OpenAudioMc.getLOG_PREFIX() + "Enabling the 1.12 speaker system");
            try {
                System.out.println(OpenAudioMc.getLOG_PREFIX() + "Hooking speakers attempt 1..");
                playerSkullItem = Material.valueOf("SKULL_ITEM");
            } catch (Exception e) {
                System.out.println(OpenAudioMc.getLOG_PREFIX() + "Failed hook speakers attempt 1..");
            }

            try {
                System.out.println(OpenAudioMc.getLOG_PREFIX() + "Hooking speakers attempt 2..");
                playerSkullItem = Material.valueOf("LEGACY_SKULL_ITEM");
            } catch (Exception e) {
                System.out.println(OpenAudioMc.getLOG_PREFIX() + "Failed hook speakers attempt 2..");
            }

            if (playerSkullItem == null) {
                System.out.println(OpenAudioMc.getLOG_PREFIX() + "Speakers failed to hook. Hooking to a block.");
                playerSkullItem = Material.JUKEBOX;
            }
        }

        //load speakers
        for (String id : openAudioMc.getConfigurationModule().getDataConfig().getConfigurationSection("speakers").getKeys(false)) {
            String world = openAudioMc.getConfigurationModule().getDataConfig().getString("speakers." + id + ".world");
            String media = openAudioMc.getConfigurationModule().getDataConfig().getString("speakers." + id + ".media");
            int x = openAudioMc.getConfigurationModule().getDataConfig().getInt("speakers." + id + ".x");
            int y = openAudioMc.getConfigurationModule().getDataConfig().getInt("speakers." + id + ".y");
            int z = openAudioMc.getConfigurationModule().getDataConfig().getInt("speakers." + id + ".z");
            if (world != null) {
                SimpleLocation simpleLocation = new SimpleLocation(x, y, z, world);
                Block blockAt = simpleLocation.getBlock();
                if (blockAt != null && isSpeakerSkull(blockAt)) {
                    registerSpeaker(simpleLocation, media, UUID.fromString(id), OpenAudioMc.getInstance().getConfig().getInt("options.speaker-radius"));
                } else {
                    System.out.println(OpenAudioMc.getLOG_PREFIX() + "Speaker " + id + " doesn't to seem be valid anymore, so it's not getting loaded.");
                }
            }
        }

        Bukkit.getScheduler().scheduleAsyncRepeatingTask(openAudioMc, () -> {
            for (Client client : openAudioMc.getPlayerModule().getClients()) {
                if (client.getIsConnected()) client.getSpeakerHandler().tick();
            }
        }, 5, 5);
    }

    public Collection<ApplicableSpeaker> getApplicableSpeakers(Location location) {
        List<Speaker> applicableSpeakers = new ArrayList<>(speakerMap.values());
        Map<String, ApplicableSpeaker> distanceMap = new HashMap<>();

        applicableSpeakers.removeIf(speaker -> !speaker.getLocation().getWorld()
                .equals(location.getWorld().getName()));
        applicableSpeakers.removeIf(speaker -> speaker.getLocation().toBukkit()
                .distance(location) > speaker.getRadius());
        applicableSpeakers.removeIf(speaker ->
                !isSpeakerSkull(speaker.getLocation().getBlock()));

        for (Speaker speaker : applicableSpeakers) {
            int distance = Math.toIntExact(Math.round(speaker.getLocation().toBukkit()
                    .distance(location)));

            if (distanceMap.get(speaker.getSource()) == null) {
                distanceMap.put(speaker.getSource(), new ApplicableSpeaker(distance, speaker));
            } else {
                if (distance < distanceMap.get(speaker.getSource()).getDistance()) {
                    distanceMap.put(speaker.getSource(), new ApplicableSpeaker(distance, speaker));
                }
            }
        }

        return distanceMap.values();
    }

    public void registerSpeaker(SimpleLocation simpleLocation, String source, UUID uuid, int radius) {
        Speaker speaker = new Speaker(source, uuid, radius, simpleLocation);
        speakerMap.put(simpleLocation, speaker);
    }

    public Speaker getSpeaker(SimpleLocation location) {
        return speakerMap.get(location);
    }

    public SpeakerMedia getMedia(String source) {
        if (speakerMediaMap.containsKey(source)) return speakerMediaMap.get(source);
        SpeakerMedia speakerMedia = new SpeakerMedia(source);
        speakerMediaMap.put(source, speakerMedia);
        return speakerMedia;
    }

    public void unlistSpeaker(SimpleLocation location) {
        speakerMap.remove(location);
    }

    public ItemStack getSkull() {
        ItemStack skull = new ItemStack(playerSkullItem);
        skull.setDurability((short) 3);
        SkullMeta sm = (SkullMeta) skull.getItemMeta();
        sm.setOwner("OpenAudioMc");
        sm.setDisplayName(ChatColor.AQUA + "OpenAudioMc Speaker");
        sm.setLore(Arrays.asList("",
                ChatColor.AQUA + "Place me anywhere",
                ChatColor.AQUA + "in the world to place",
                ChatColor.AQUA + "a speaker for that area",
                ""));
        skull.setItemMeta(sm);
        return skull;
    }

    public Boolean isSpeakerSkull(Block block) {
        if (block.getState() != null && block.getState() instanceof Skull) {
            Skull skull = (Skull) block.getState();
            if (version == ServerVersion.MODERN) {
                if (skull.getOwningPlayer() == null) return false;
                if (skull.getOwningPlayer().getName() == null) return false;
                return skull.getOwningPlayer().getName().equals("OpenAudioMc");
            } else {
                if (skull.getOwner() == null) return false;
                return skull.getOwner().equals("OpenAudioMc");
            }
        }
        return false;
    }

}
