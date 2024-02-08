package com.craftmend.voicejoinpermission;

import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.api.events.client.ClientEnableVoiceEvent;
import com.craftmend.openaudiomc.api.interfaces.ExternalModule;
import lombok.NoArgsConstructor;
import org.bukkit.event.Listener;

@NoArgsConstructor
public final class OaVoicechatJoinPermission extends ExternalModule implements Listener {

    @Override
    public String getName() {
        return "Voicechat Permissions module";
    }

    @Override
    public String getDescription() {
        return "Only allow users with certain permissions to open voicechat";
    }

    @Override
    public void onInitialize() {

    }

    @Override
    public void on(ModuleEvent event) {
        if (event == ModuleEvent.PLATFORM_LOADED) {
            bootComponent();
        }
    }

    private void bootComponent() {
        // hook into both plugins
        EventApi.getInstance().registerHandler(ClientEnableVoiceEvent.class, event -> {
            boolean hasPermission = event.getClient().getActor().hasPermission("openaudiomc.voicechat.join");
            if (!hasPermission) {
                event.setCancelled(true);
                event.getClient().getActor().sendMessage("You don't have permission to join voicechat");
            }
        });
    }
}
