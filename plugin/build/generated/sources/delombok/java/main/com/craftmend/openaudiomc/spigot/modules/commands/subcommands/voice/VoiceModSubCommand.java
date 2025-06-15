package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.voice;

import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.user.User;
import org.bukkit.entity.Player;

public class VoiceModSubCommand extends SubCommand {

    public VoiceModSubCommand() {
        super("mod");
        this.trimArguments = true;
    }

    @Override
    public void onExecute(User sender, String[] args) {
        if (!(sender.getOriginal() instanceof Player)) {
            message(sender, "Only players can open moderation menu's.");
            return;
        }

        if (!StorageKey.SETTINGS_VC_MOD_ENABLED.getBoolean()) {
            message(sender, "Moderation is disabled in the config for security. Please ask your server admin to enable it.");
            return;
        }

        // toggle mod status
        ClientConnection client = (ClientConnection) sender.findClient().get();

        if (!client.getSession().isModerating()) {
           client.setModerating(true);
            OpenAudioLogger.info(sender.getName() + " started moderating");
            bcToStaff(sender.getName() + " started moderating");
        } else {
            client.setModerating(false);
            OpenAudioLogger.info(sender.getName() + " stopped moderating");
            bcToStaff(sender.getName() + " stopped moderating");
        }
    }

    private void bcToStaff(String string) {
        for (ClientConnection client : getService(NetworkingService.class).getClients()) {
            if (isAllowed(client.getUser())) {
                message(client.getUser(), string);
            }
        }
    }

}
