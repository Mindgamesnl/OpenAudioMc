package com.craftmend.openaudiomc.spigot.modules.speakers.menu;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.api.speakers.ExtraSpeakerOptions;
import com.craftmend.openaudiomc.api.speakers.SpeakerType;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import com.craftmend.openaudiomc.spigot.modules.speakers.utils.SpeakerUtils;
import com.craftmend.openaudiomc.spigot.services.clicklib.Item;
import com.craftmend.openaudiomc.spigot.services.clicklib.menu.Menu;
import org.bukkit.ChatColor;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.entity.Entity;
import org.bukkit.entity.Player;

import java.util.Collection;

public class SpeakerMenu extends Menu {

    public SpeakerMenu(Speaker speaker) {
        super(ChatColor.BLUE + "Updating speaker", 3 * 9);

        // show source
        setItem(3, new Item(SpeakerUtils.getSkull(speaker.getSource(), 10))
                .setName(ChatColor.YELLOW + "Playing: " + ChatColor.AQUA + speaker.getMedia().getSource())
                .setLore(new String[]{})
                .onClick((p,i) -> {})
        );

        // toggle mode
        setItem(5, getTypeButton(speaker));

        // slider to change volume/range of the speaker
        setItem(9, getDistanceItem(speaker, 2));
        setItem(10, getDistanceItem(speaker, 4));
        setItem(11, getDistanceItem(speaker, 5));
        setItem(12, getDistanceItem(speaker, 8));
        setItem(13, getDistanceItem(speaker, 10));
        setItem(14, getDistanceItem(speaker, 12));
        setItem(15, getDistanceItem(speaker, 14));
        setItem(16, getDistanceItem(speaker, 16));
        setItem(17, getDistanceItem(speaker, 18));

        int settingsStart = 18;
        for (ExtraSpeakerOptions setting : ExtraSpeakerOptions.values()) {
            Item settingItem = new Item(Material.LEVER);

            // only show the option if its compatible and public
            if (setting.isCompatibleWith(speaker) && setting.isDisplay()) {

                boolean isEnabled = setting.isEnabledFor(speaker);
                settingItem.setName((isEnabled ? ChatColor.GREEN + "(enabled) " : ChatColor.RED + "(disabled) ") + setting.getTitle());
                settingItem.setLore(new String[]{setting.getDescription()});

                settingItem.onClick((clicker, what) -> {
                    if (isEnabled) {
                        speaker.getExtraOptions().remove(setting);
                    } else {
                        speaker.getExtraOptions().add(setting);
                    }

                    OpenAudioMc.getService(DatabaseService.class)
                            .getRepository(Speaker.class)
                            .save(speaker);
                    new SpeakerMenu(speaker).openFor(clicker);
                });

                setItem(settingsStart, settingItem);
                settingsStart++;
            }
        }
    }

    private Item getTypeButton(Speaker speaker) {
        Item item = new Item(Material.COMPASS);
        item.setName(ChatColor.AQUA + "Current mode: " + ChatColor.WHITE + speaker.getSpeakerType().getName());

        // figure it out based on INDEX instead of FLIPS so we can re-use this menu
        // if we decide to add a third mode
        SpeakerType[] possibleModes = SpeakerType.values();

        // ind out current index
        int currentMode = 0;
        SpeakerType mode = speaker.getSpeakerType();
        for (SpeakerType possibleMode : possibleModes) {
            if (possibleMode == speaker.getSpeakerType()) break;
            currentMode++;
        }

        // wrap around if out of bounds
        int nextMode = (currentMode + 1);
        if (nextMode > (possibleModes.length - 1)) nextMode = 0;

        SpeakerType nextSelectableMode = possibleModes[nextMode];

        item.setLore(new String[]{
                ChatColor.AQUA + speaker.getSpeakerType().getDescription(),
                "",
                ChatColor.AQUA + "Click to change to " + ChatColor.GRAY + nextSelectableMode.getName()
        });

        // makes me wonder why i thought it would be use full to get the clicked item, its just ugly code
        // maybe remove in the future? don't think its used anywhere.
        item.onClick((clicker, clickedItem) -> {
            speaker.setSpeakerType(nextSelectableMode);
            new SpeakerMenu(speaker).openFor(clicker);

            // trigger re-render for everyone in the area
            Location bukkitSpeakerLocation = speaker.getLocation().toBukkit();
            int safeRadius = speaker.getRadius() + 1;
            Collection<Entity> entities = bukkitSpeakerLocation.getWorld().getNearbyEntities(bukkitSpeakerLocation, safeRadius, safeRadius, safeRadius);

            OpenAudioMc.getService(DatabaseService.class)
                    .getRepository(Speaker.class)
                    .save(speaker);

            for (Entity entity : entities) {
                // skip non-players
                if (!(entity instanceof Player)) continue;

                Player nearbyPlayer = (Player) entity;
                SpigotConnection spigotConnection = OpenAudioMc.getService(SpigotPlayerService.class).getClient(nearbyPlayer);

                spigotConnection.getSpeakerHandler().forceDeleteSpeaker(
                        speaker.getSpeakerId().toString(),
                        mode,
                        speaker.getMedia().getSource()
                );

                spigotConnection.getSpeakers().clear();
                spigotConnection.getSpeakerHandler().tick();
            }
        });

        return item;
    }

    private Item getDistanceItem(Speaker speaker, int distance) {
        return new Item(Material.NOTE_BLOCK)
                .setAmount(distance)
                .setEnchanted((speaker.getRadius() == distance))
                .setName(
                        (speaker.getRadius() == distance ? (
                                ChatColor.GREEN + "Current radius: " + distance
                        ) : (
                                ChatColor.AQUA + "Set radius to " + distance
                        ))
                )
                .onClick((player, item) -> {
                    if (distance == speaker.getRadius()) return;
                    speaker.setRadius(distance);
                    OpenAudioMc.getService(DatabaseService.class)
                            .getRepository(Speaker.class)
                            .save(speaker);
                    player.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "Updated speaker radius to " + distance);
                    new SpeakerMenu(speaker).openFor(player);
                });
    }

}
