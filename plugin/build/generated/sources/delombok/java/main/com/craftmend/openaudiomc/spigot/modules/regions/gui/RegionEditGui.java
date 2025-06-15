package com.craftmend.openaudiomc.spigot.modules.regions.gui;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientDestroyMedia;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.IRegion;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.spigot.services.clicklib.Item;
import com.craftmend.openaudiomc.spigot.services.clicklib.menu.Menu;
import org.bukkit.ChatColor;
import org.bukkit.Material;

public class RegionEditGui extends Menu {

    public RegionEditGui(IRegion region) {
        super(ChatColor.BLUE + "Updating Region", 3 * 9);

        // 2, 4, 6 context / setting slots
        setItem(1, new Item(Material.ITEM_FRAME)
                .setName(ChatColor.YELLOW + "Playing: " + ChatColor.AQUA + region.getMedia().getSource()));

        setItem(3, getVoicechatToggleItem(region));

        setItem(5, getSyncItem(region));

        // something fun for slot 6? think of something mats
        setItem(7, getPlayOnceItem(region)); // you thought of something, nice

        // second row, volume fuckery
        setItem(9, getVolumeItem(region, 5));
        setItem(10, getVolumeItem(region, 10));
        setItem(11, getVolumeItem(region, 15));
        setItem(12, getVolumeItem(region, 20));
        setItem(13, getVolumeItem(region, 30));
        setItem(14, getVolumeItem(region, 50));
        setItem(15, getVolumeItem(region, 70));
        setItem(16, getVolumeItem(region, 80));
        setItem(17, getVolumeItem(region, 100));

        // third row, fade shit
        setItem(18, getFadeItem(region, 0));
        setItem(19, getFadeItem(region, 500));
        setItem(20, getFadeItem(region, 1000));
        setItem(21, getFadeItem(region, 1500));
        setItem(22, getFadeItem(region, 2000));
        setItem(23, getFadeItem(region, 5000));
        setItem(24, getFadeItem(region, 7000));
        setItem(25, getFadeItem(region, 10000));
        setItem(26, getFadeItem(region, 15000));
    }

    public Item getSyncItem(IRegion region) {
        return new Item(Material.LEVER)
                .setName(ChatColor.YELLOW + "Syncronization " + (region.getProperties().getDoSync() ?
                        ChatColor.GREEN + "ENABLED"
                        :
                        ChatColor.RED + "DISABLED"))
                .setLore(new String[]{
                        ChatColor.GREEN + "Enabled" + ChatColor.GRAY + ": The music will synchronize between sessions/players",
                        ChatColor.RED + "DISABLED" + ChatColor.GRAY + ": The music will always play from the beginning"
                })
                .onClick((player, item) -> {
                    region.getProperties().setDoSync(!region.getProperties().getDoSync());

                    if (region.getProperties().getDoSync()) {
                        player.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + ChatColor.GREEN + "Music will now synchronize between players. Leave this region and come back to see the difference.");
                    } else {
                        player.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + ChatColor.RED + "Music will now always play from the beginning when someone enters or connects.");
                    }

                    OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class)
                            .save(region.getProperties());

                    // reset the media cache for this region
                    Media oldMedia = region.getMedia();
                    OpenAudioMcSpigot.getInstance().getRegionModule().getWorld(player.getWorld().getName()).unregisterRegionMedia(region.getMedia().getSource());
                    Media newMedia = region.getMedia();

                    // send destroy packets to all players in the region
                    for (SpigotConnection spigotConnection : OpenAudioMcSpigot.getInstance().getRegionModule().findPlayersInRegion(region.getProperties().getRegionName())) {
                        spigotConnection.getClientConnection().sendPacket(new PacketClientDestroyMedia(oldMedia.getMediaId()));
                        // start new media
                        spigotConnection.getClientConnection().sendMedia(newMedia);
                    }

                    new RegionEditGui(region).openFor(player);
                });
    }

    private Item getPlayOnceItem(IRegion region) {
        return new Item(Material.BONE_MEAL)
                .setName(ChatColor.YELLOW + "Looping " + (region.getProperties().getLoop() ?
                        ChatColor.GREEN + "ENABLED"
                        :
                        ChatColor.RED + "DISABLED"))
                .setLore(new String[]{
                        ChatColor.GREEN + "Enabled" + ChatColor.GRAY + ": Makes the music loop",
                        ChatColor.RED + "DISABLED" + ChatColor.GRAY + ": Only plays the music once upon entering"
                })
                .onClick((player, item) -> {
                    region.getProperties().setLoop(!region.getProperties().getLoop());
                    OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class)
                            .save(region.getProperties());

                    if (region.getProperties().getLoop()) {
                        player.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + ChatColor.GREEN + "Music will now loop. You may need to re-enter the region to hear the change.");
                    } else {
                        player.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + ChatColor.RED + "Music will now only play once upon entering. You may need to re-enter the region to hear the change.");
                    }

                    // reset the media cache for this region
                    Media oldMedia = region.getMedia();
                    OpenAudioMcSpigot.getInstance().getRegionModule().getWorld(player.getWorld().getName()).unregisterRegionMedia(region.getMedia().getSource());
                    Media newMedia = region.getMedia();

                    // send destroy packets to all players in the region
                    for (SpigotConnection spigotConnection : OpenAudioMcSpigot.getInstance().getRegionModule().findPlayersInRegion(region.getProperties().getRegionName())) {
                        spigotConnection.getClientConnection().sendPacket(new PacketClientDestroyMedia(oldMedia.getMediaId()));
                        // start new media
                        spigotConnection.getClientConnection().sendMedia(newMedia);
                    }

                    new RegionEditGui(region).openFor(player);
                });
    }

    private Item getVoicechatToggleItem(IRegion region) {
        Material head = OpenAudioMc.getService(SpeakerService.class).getPlayerSkullItem();

        Item item = new Item(head)
                .setName(ChatColor.YELLOW + "Allow voice chat: " + (
                        region.getProperties().getAllowsVoiceChat() ? ChatColor.GREEN + "True" : ChatColor.RED + "False"
                ))
                .onClick((player, clickedItem) -> {
                    // flip setting

                    region.getProperties().setAllowsVoiceChat(!region.getProperties().getAllowsVoiceChat());
                    // save the new setting

                    OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class)
                            .save(region.getProperties());

                    if (region.getProperties().getAllowsVoiceChat()) {
                        player.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + ChatColor.GREEN + "Voicechat has been enabled for this region. You may need to re-enter the region to see the changes.");
                    } else {
                        player.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + ChatColor.RED + "Voicechat has been disabled for this region, meaning that players will mute/leave their call once they enter. You may need to re-enter the region to see the changes.");
                    }

                    new RegionEditGui(region).openFor(player);
                });

        return item;
    }

    private Item getFadeItem(IRegion region, int fadeTime) {
        return new Item(((region.getProperties().getFadeTimeMs() == fadeTime) ? Material.REDSTONE_BLOCK : Material.NOTE_BLOCK))
                .setEnchanted((region.getProperties().getFadeTimeMs() == fadeTime))
                .setName(
                        (region.getProperties().getFadeTimeMs() == fadeTime ? (
                                ChatColor.GREEN + "Current fade time: " + ChatColor.WHITE + fadeTime + "MS"
                        ) : (
                                ChatColor.AQUA + "Set fade time " + fadeTime + "MS"
                        ))
                )
                .onClick((player, item) -> {
                    if (fadeTime == region.getProperties().getFadeTimeMs()) return;
                    region.getProperties().setFadeTimeMs(fadeTime);

                    OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class)
                            .save(region.getProperties());

                    player.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + ChatColor.GREEN + "Updated region fadetime to " + fadeTime);

                    SpigotConnection spigotClient = OpenAudioMc.getService(SpigotPlayerService.class).getClient(player.getUniqueId());
                    spigotClient.getRegionHandler().reset();

                    spigotClient.getRegionHandler().tick();

                    new RegionEditGui(region).openFor(player);
                });
    }

    private Item getVolumeItem(IRegion region, int volume) {
        return new Item(((region.getVolume() == volume) ? Material.REDSTONE_BLOCK : Material.NOTE_BLOCK))
                .setEnchanted((region.getVolume() == volume))
                .setName(
                        (region.getVolume() == volume ? (
                                ChatColor.GREEN + "Current volume: " + ChatColor.WHITE + volume + "%"
                        ) : (
                                ChatColor.AQUA + "Set volume to " + volume + "%"
                        ))
                )
                .onClick((player, item) -> {
                    if (volume == region.getVolume()) return;

                    region.setVolume(volume);

                    // get the media and update its volume too
                    region.getMedia().setVolume(volume);

                    player.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + ChatColor.GREEN + "Updated region volume to " + volume);

                    OpenAudioMc.getService(DatabaseService.class).getRepository(RegionProperties.class)
                            .save(region.getProperties());

                    SpigotConnection spigotClient = OpenAudioMc.getService(SpigotPlayerService.class).getClient(player.getUniqueId());
                    spigotClient.getRegionHandler().reset();
                    spigotClient.getRegionHandler().tick();

                    new RegionEditGui(region).openFor(player);
                });
    }

}
