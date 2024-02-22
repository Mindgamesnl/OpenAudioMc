package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.user.User;

public class SetKvSubCommand extends SubCommand {

    private static final StorageKey[] allowedKeys = new StorageKey[] {
            StorageKey.SETTINGS_FORCE_OFFLINE_MODE,
            StorageKey.SETTINGS_REGIONS_SYNC,
            StorageKey.SETTINGS_SPEAKER_SYNC,
            StorageKey.SETTINGS_HYDRATE_REGIONS_ON_BOOT,
            StorageKey.SETTINGS_VOICE_FILTERS_GAMEMODE,
            StorageKey.SETTINGS_VOICE_FILTERS_TEAM,
            StorageKey.SETTINGS_VOICE_FILTERS_CHANNEL,
            StorageKey.SETTINGS_AUTO_RECONNECT
    };

    public SetKvSubCommand() {
        super("setkv");

        // This is a 'hidden' utility command which allows some specific config values to be changed through a command
        // which is used by some error messages to help server users configure their server.
        // It scares me how many support tickets we get about people not understanding configs,
        // or reading an error message for that matter, and providing them with a one-click solution
        // to the problem is a great way to improve the user experience.
        // values may only be booleans, so we don't need to add a value type argument

        // hide it from the help command, as it's not really a feature or something you should use
        this.listed = false;
    }

    @Override
    public void onExecute(User sender, String[] args) {
        if (args.length != 2) {
            message(sender, "Invalid arguments. Usage: /openaudio setkv <key> <value>");
            return;
        }

        String key = args[0].toUpperCase();
        String value = args[1].toLowerCase();

        boolean found = false;
        for (StorageKey storageKey : allowedKeys) {
            if (storageKey.name().equals(key)) {
                found = true;
                if (value.equals("true") || value.equals("false")) {
                    // set the value
                    OpenAudioMc.getInstance().getInvoker().getConfigurationProvider().setBoolean(storageKey, Boolean.parseBoolean(value));
                    message(sender, "Set " + key + " to " + value);
                    message(sender, "Please restart your server to apply this change.");
                    // flush the change
                    OpenAudioMc.getInstance().getInvoker().getConfigurationProvider().saveAll(true);
                } else {
                    message(sender, "Invalid value. Usage: /openaudio setkv <key> <value>");
                }
            }
        }

        if (!found) {
            message(sender, "Invalid key. This command can only be used to set some specific keys as part of simple problem solving or support.");
        }
    }
}
