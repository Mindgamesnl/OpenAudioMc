package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.voice;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.client.ClientDataService;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.client.store.ClientDataStore;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.utils.data.DurationFormatter;
import com.craftmend.openaudiomc.spigot.services.clicklib.Item;
import com.craftmend.openaudiomc.spigot.services.clicklib.menu.Menu;
import org.bukkit.ChatColor;
import org.bukkit.Material;
import org.bukkit.entity.Player;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class VoiceModGui extends Menu {

    public VoiceModGui(Player moderator, ClientDataStore targetData, UUID targetId, String targetName) {
        super(OaColor.GOLD + targetName + "'s voice profile", 9);

        // three items
        // name: show name, status, last seen, etc
        // moderation: mute/block a user from accessing voicechat in this server
        // history: show the last 15 players this user talked to

        setItem(2, new Item(Material.NAME_TAG)
                .setName(OaColor.AQUA + "About " + targetName)
                .setLore(new String[]{
                        OaColor.BLUE + "Last seen: " + OaColor.DARK_BLUE + DurationFormatter.formatDuration(Duration.between(targetData.getLastSeen(), Instant.now())),
                        OaColor.BLUE + "Last VC connection: " + OaColor.DARK_BLUE + DurationFormatter.formatDuration(Duration.between(targetData.getLastSeen(), Instant.now())),

                })
                .onClick((player, item) -> {})
        );

        setItem(4, new Item(Material.IRON_BARS)
                .setName(ChatColor.RED + "VoiceChat ban")
                .setLore(
                        (targetData.isVoiceBlocked() ? new String[] {
                                ChatColor.RED + targetName + " is currently banned from using voicechat.",
                                ChatColor.RED + "They are still able to listen to music",
                                ChatColor.RED + "through OpenAudioMc, but aren't allowed",
                                ChatColor.RED + "to use any of its social features.",
                                "",
                                ChatColor.BOLD + "CLICK HERE TO UNBAN " + targetName.toUpperCase()
                        } : new String[] {
                                ChatColor.GREEN + targetName + " isn't banned and is permitted to",
                                ChatColor.GREEN + "connect to voice chat at any time.",
                                ChatColor.GREEN + "You can " + ChatColor.RED + "BAN" + ChatColor.GREEN + " " + targetName + " by clicking here,",
                                ChatColor.GREEN + "that'll forcefully end their current session and",
                                ChatColor.GREEN + "prevent them from talking to others again.",
                        })
                )
                .onClick(((player, item) -> {
                    toggleBan(moderator, targetData, targetId, targetName);
                }))
        );

        List<String> names = new ArrayList<>();
        for (String recentVoicechatPeer : targetData.getRecentVoicechatPeers()) {
            names.add(ChatColor.GOLD +" > " + ChatColor.BLUE + recentVoicechatPeer);
        }
        if (names.isEmpty()) {
            names.add(ChatColor.GRAY + targetName + " never talked to anyone in");
            names.add(ChatColor.GRAY + targetName + " voicechat yet");
        }

        setItem(6, new Item(Material.BOOK)
                .setName(ChatColor.AQUA + "Recent voicechat partners")
                .setLore(names.toArray(new String[names.size()]))
                .onClick(((player, item) -> {}))
        );

        openFor(moderator);
    }

    private void toggleBan(Player moderator, ClientDataStore targetData, UUID targetId, String targetName) {
        targetData.setVoiceBlocked(!targetData.isVoiceBlocked());
        if (targetData.isVoiceBlocked()) {
            ClientConnection cc = OpenAudioMc.getService(NetworkingService.class).getClient(targetId);
            if (cc != null) {
                cc.kick();
            }
        }
        OpenAudioMc.getService(ClientDataService.class).save(targetData, targetId);
        new VoiceModGui(moderator, targetData, targetId, targetName);
    }

}
