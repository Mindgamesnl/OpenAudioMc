package com.craftmend.openaudiomc.spigot.modules.voicechat.filters;

import com.craftmend.openaudiomc.api.voice.CustomPlayerFilter;
import com.craftmend.openaudiomc.generic.service.Service;
import lombok.NoArgsConstructor;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

/**
 * This class functions to store {@link com.craftmend.openaudiomc.api.voice.CustomPlayerFilter}s that other plugins can create to modify how players will be checked
 * in terms of "audibility" when it comes to {@link PeerFilter#wrap(Stream, Player)}.
 */
@NoArgsConstructor
public class FilterService extends Service {

    private List<CustomPlayerFilter> customPlayerFilters;

    @Override
    public void onEnable() {
        customPlayerFilters = new ArrayList<>();
    }

    public void addCustomFilter(CustomPlayerFilter customPlayerFilter) {
        customPlayerFilters.add(customPlayerFilter);
    }

    public List<CustomPlayerFilter> getCustomPlayerFilters() {
        return customPlayerFilters;
    }

    @Deprecated
    public void addFilterFunction(CustomFilterFunction customFilterFunction){
        customPlayerFilters.add(customFilterFunction);
    }

    @Deprecated
    public List<CustomFilterFunction> getCustomFilterFunctions(){
        // create a list of old deprecated instances
        List<CustomFilterFunction> customFilterFunctions = new ArrayList<>();
        customPlayerFilters.forEach(customFilterFunction -> {
            if (customFilterFunction instanceof CustomFilterFunction) {
                customFilterFunctions.add((CustomFilterFunction) customFilterFunction);
            }
        });
        return customFilterFunctions;
    }
}
