package com.craftmend.openaudiomc.spigot.modules.shortner.completer;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.TabCompleteProvider;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.shortner.AliasService;
import com.craftmend.openaudiomc.spigot.modules.shortner.data.Alias;

import java.util.Map;

public class AliasNameTabCompleter implements TabCompleteProvider {

    private static AliasNameTabCompleter instance;

    public static AliasNameTabCompleter getInstance() {
        if (instance == null) {
            instance = new AliasNameTabCompleter();
        }
        return instance;
    }

    @Override
    public String[] getOptions(User sender) {
        Map<String, Alias> aliasMap = OpenAudioMc.getService(AliasService.class).getAliasMap();
        return aliasMap.keySet().toArray(new String[0]);
    }
}
