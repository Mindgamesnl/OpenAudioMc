package com.craftmend.openaudiomc.generic.commands.objects;

import com.craftmend.openaudiomc.generic.commands.interfaces.TabCompleteProvider;
import com.craftmend.openaudiomc.generic.commands.tabcomplete.ClientTabcompleteProvider;
import java.util.HashMap;
import java.util.Map;

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

    /**
     * The usage of the command,
     * example if your command name is select and your usage is select name,
     * you would just enter "<name>"
     * description is the text that will be added in the help menu
     */
    public String getSyntax() {
        return this.syntax;
    }

    public String getDescription() {
        return this.description;
    }

    public Map<Integer, TabCompleteProvider> getTabCompleteProviders() {
        return this.tabCompleteProviders;
    }

    /**
     * The usage of the command,
     * example if your command name is select and your usage is select name,
     * you would just enter "<name>"
     * description is the text that will be added in the help menu
     */
    public void setSyntax(final String syntax) {
        this.syntax = syntax;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public void setTabCompleteProviders(final Map<Integer, TabCompleteProvider> tabCompleteProviders) {
        this.tabCompleteProviders = tabCompleteProviders;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof Argument)) return false;
        final Argument other = (Argument) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$syntax = this.getSyntax();
        final Object other$syntax = other.getSyntax();
        if (this$syntax == null ? other$syntax != null : !this$syntax.equals(other$syntax)) return false;
        final Object this$description = this.getDescription();
        final Object other$description = other.getDescription();
        if (this$description == null ? other$description != null : !this$description.equals(other$description)) return false;
        final Object this$tabCompleteProviders = this.getTabCompleteProviders();
        final Object other$tabCompleteProviders = other.getTabCompleteProviders();
        if (this$tabCompleteProviders == null ? other$tabCompleteProviders != null : !this$tabCompleteProviders.equals(other$tabCompleteProviders)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof Argument;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $syntax = this.getSyntax();
        result = result * PRIME + ($syntax == null ? 43 : $syntax.hashCode());
        final Object $description = this.getDescription();
        result = result * PRIME + ($description == null ? 43 : $description.hashCode());
        final Object $tabCompleteProviders = this.getTabCompleteProviders();
        result = result * PRIME + ($tabCompleteProviders == null ? 43 : $tabCompleteProviders.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "Argument(syntax=" + this.getSyntax() + ", description=" + this.getDescription() + ", tabCompleteProviders=" + this.getTabCompleteProviders() + ")";
    }
}
