package com.craftmend.openaudiomc.generic.commands.objects;

import com.craftmend.openaudiomc.generic.commands.interfaces.TabCompleteProvider;
import com.craftmend.openaudiomc.generic.commands.tabcomplete.ClientTabcompleteProvider;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class Argument {

    /**
     * The usage of the command,
     * example if your command name is select and your usage is select name,
     * you would just enter "<name>"
     * description is the text that will be added in the help menu
     */
    private String syntax;
    private String description;
    private Map<Integer, TabCompleteProvider> tabCompleteProviders = new HashMap<>();

    public Argument(String syntax, String description) {
        this.syntax = syntax;
        this.description = description;
    }

    public Argument(String syntax, String description, int playerArgumentIndex) {
        this.syntax = syntax;
        this.description = description;
        this.tabCompleteProviders.put(playerArgumentIndex, ClientTabcompleteProvider.INSTANCE);
    }

    public Argument addTabCompleteProvider(int index, TabCompleteProvider provider) {
        tabCompleteProviders.put(index, provider);
        return this;
    }

    public TabCompleteProvider getTabCompleteProvider(int index) {
        return tabCompleteProviders.get(index);
    }

    public String getBase() {
        String base = syntax.split(" ")[0];
        if (base.contains("<")) {
            return base.replace("<", "").replace(">", "");
        }
        return base;
    }

}
