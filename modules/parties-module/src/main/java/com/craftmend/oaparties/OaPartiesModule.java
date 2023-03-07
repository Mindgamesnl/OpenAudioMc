package com.craftmend.oaparties;

import com.alessiodp.parties.api.Parties;
import com.alessiodp.parties.api.interfaces.PartiesAPI;
import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.api.interfaces.ExternalModule;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.CustomFilterFunction;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.FilterService;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.server.PluginEnableEvent;
import org.bukkit.permissions.Permission;
import org.bukkit.permissions.PermissionDefault;

public final class OaPartiesModule extends ExternalModule implements Listener {

    private int loadedComponents = 0;
    private static final String PERMISSION = "openaudiomc.voicechat.filter.parties";

    public OaPartiesModule() {
        // attempt to register perm
        try {
            Permission perm = new Permission(PERMISSION);
            perm.setDefault(PermissionDefault.TRUE);
            Bukkit.getPluginManager().addPermission(perm);
        } catch (IllegalArgumentException e) {
            // ignored
        }
    }

    @Override
    public String getName() {
        return "Parties module";
    }

    @Override
    public String getDescription() {
        return "This module works with [This spigot Parties plugin](https://www.spigotmc.org/resources/parties-an-advanced-parties-manager.3709/), and only allows people to talk to each other in voice chat if they have a common party.";
    }

    @Override
    public void onInitialize() {
        if (Bukkit.getPluginManager().isPluginEnabled("Parties"))
            bootComponent();
    }

    @EventHandler
    public void onPluginLoad(PluginEnableEvent event) {
        if (event.getPlugin().getName().equals("Parties")) {
            bootComponent();
        }
    }

    @Override
    public void on(ModuleEvent event) {
        if (event == ModuleEvent.PLATFORM_LOADED) {
            bootComponent();
        }
    }

    private void bootComponent() {
        loadedComponents++;
        if (loadedComponents != 2) return;

        // hook into both plugins
        OpenAudioMc.getService(FilterService.class).addFilterFunction(new CustomFilterFunction() {
            @Override
            public boolean isPlayerValidListener(Player listener, Player possibleSpeaker) {
                boolean listenerHasPerm = hasPerm(listener);
                boolean speakerHasPerm = hasPerm(possibleSpeaker);

                // do we both have the perm?
                if (listenerHasPerm && speakerHasPerm) {
                    return haveCommonParty(listener, possibleSpeaker);
                }

                // do we both not have the perm?
                if (!listenerHasPerm && !speakerHasPerm) {
                    return true;
                }

                // one of us has the perm, the other doesn't, so it should be disabled
                return false;
            }
        });
    }

    private boolean hasPerm(Player player) {
        return player.hasPermission(PERMISSION);
    }

    private boolean haveCommonParty(Player p1, Player p2) {
        PartiesAPI api = Parties.getApi();
        return api.areInTheSameParty(p1.getUniqueId(), p2.getUniqueId());
    }
}
