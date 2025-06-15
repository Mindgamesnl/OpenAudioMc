package com.craftmend.openaudiomc.spigot.modules.voicechat.utils;

import java.util.*;

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

    public static final byte NOT_CHECKED = 0;
    public static final byte CHECKED_FALSE = 1;
    public static final byte CHECKED_TRUE = 2;

    private Map<Integer, Boolean> checkedCombinations = new HashMap<>();

    public byte stateIs(UUID player1, UUID player2) {
        int hashCode = getCombinedHashCode(player1, player2);
        Boolean v = checkedCombinations.get(hashCode);
        if (v == null) return NOT_CHECKED;
        return v ? CHECKED_TRUE : CHECKED_FALSE;
    }

    public byte getAndPutIfAbsent(UUID player1, UUID player2, Boolean state) {
        int hashCode = getCombinedHashCode(player1, player2);
        Boolean v = checkedCombinations.get(hashCode);
        if (v == null) {
            checkedCombinations.put(hashCode, state);
            return NOT_CHECKED;
        }
        return v ? CHECKED_TRUE : CHECKED_FALSE;
    }

    public void markChecked(UUID player1, UUID player2, Boolean state) {
        int hashCode = getCombinedHashCode(player1, player2);
        checkedCombinations.put(hashCode, state);
    }

    private int getCombinedHashCode(UUID player1, UUID player2) {
        return player1.hashCode() ^ player2.hashCode();
    }

}
