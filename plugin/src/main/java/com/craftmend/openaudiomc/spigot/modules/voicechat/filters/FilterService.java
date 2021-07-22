package com.craftmend.openaudiomc.spigot.modules.voicechat.filters;

import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import lombok.NoArgsConstructor;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

/**
 * This class functions to store {@link CustomFilterFunction}s that other plugins can create to modify how players will be checked
 * in terms of "audibility" when it comes to {@link PeerFilter#wrap(Stream, Player)}.
 */
@NoArgsConstructor
public class FilterService extends Service {

    private List<CustomFilterFunction> customFilterFunctions;

    @Override
    public void onEnable() {
        customFilterFunctions = new ArrayList<>();
    }

    /**
     * Adds a {@link CustomFilterFunction} to the list of functions to filter out players in {@link PeerFilter#wrap(Stream, Player)}.
     *
     * These functions are called in {@link PeerFilter#wrap(Stream, Player)} to allow for plugins to add custom sorting for
     * players. An example being staff members shouldn't be heard by other players so adding a custom function implementation via
     * {@link #addFilterFunction(CustomFilterFunction)} allows for such functionality to exist.
     *
     * @param customFilterFunction The {@link CustomFilterFunction} to be added to the list of functions
     */
    public void addFilterFunction(CustomFilterFunction customFilterFunction){
        customFilterFunctions.add(customFilterFunction);
    }

    /**
     * Returns a copy of the internal {@link List} of {@link CustomFilterFunction}s. This means
     * modifications done to the {@link List} returned by this method will not result
     * in changes in the actual list.
     *
     * These functions will be called in whatever order they are stored in.
     *
     * These functions are called in {@link PeerFilter#wrap(Stream, Player)} to allow for plugins to add custom sorting for
     * players. An example being staff members shouldn't be heard by other players so adding a custom function implementation via
     * {@link #addFilterFunction(CustomFilterFunction)} allows for such functionality to exist.
     *
     * @return A copied {@link List} of {@link CustomFilterFunction}s
     */
    public List<CustomFilterFunction> getCustomFilterFunctions(){
        return new ArrayList<>(customFilterFunctions);
    }
}
