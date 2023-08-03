package com.craftmend.voicejoinpermission;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.api.impl.event.events.ClientRequestVoiceEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.api.interfaces.ExternalModule;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.CustomFilterFunction;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.FilterService;
import lombok.NoArgsConstructor;
import org.bukkit.entity.Player;
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
        AudioApi.getInstance().getEventDriver()
                .on(ClientRequestVoiceEvent.class)
                .setHandler((handler) -> {
                    boolean hasPermission = handler.getRequester().getUser().hasPermission("openaudiomc.voicechat.join");
                    if (!hasPermission) {
                        handler.getRequester().getUser().sendMessage("You don't have permission to join voicechat");
                        handler.setCanceled(true);
                    } else {
                        handler.setCanceled(false);
                    }
                });
    }
}
