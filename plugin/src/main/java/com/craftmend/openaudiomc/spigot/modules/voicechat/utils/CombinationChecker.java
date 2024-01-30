package com.craftmend.openaudiomc.spigot.modules.voicechat.utils;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class CombinationChecker {

    /**
     * This is a small utility class that helps with the combination of two UUIDs.
     * We use it to cut down on iterations during proximity checks, where we want to
     * register AA-AA-AA>BB-BB-BB and exempt BB-BB-BB>AA-AA-AA.
     * This implementation has some room for error, because the hashcode method of UUID
     * does not guarantee a unique hash for each UUID, but it's good enough for our use case.
     * https://stackoverflow.com/questions/24876188/how-big-is-the-chance-to-get-a-java-uuid-randomuuid-collision
     * If this ever happens then well, guess some minecraft has worse odds than winning the lottery but we'll have to fix it
     */

    private Set<Integer> checkedCombinations = new HashSet<>();

    public boolean contains(UUID player1, UUID player2) {
        int hashCode = getCombinedHashCode(player1, player2);
        return checkedCombinations.contains(hashCode);
    }

    public void mark(UUID player1, UUID player2) {
        int hashCode = getCombinedHashCode(player1, player2);
        checkedCombinations.add(hashCode);
    }

    private int getCombinedHashCode(UUID player1, UUID player2) {
        return player1.hashCode() ^ player2.hashCode();
    }

}
