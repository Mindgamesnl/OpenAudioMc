package com.craftmend.openaudiomc.spigot.modules.rules.rules.time;

import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.rules.data.RuleTest;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class WorldTimeRuleTest extends RuleTest {

    private String name;
    private int hoursStart;
    private int hoursEnd;

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getDescription() {
        return "Require the world time to be: " + name;
    }

    @Override
    public boolean testPlayer(SpigotConnection player) {
        long gameTime = player.getBukkitPlayer().getWorld().getTime();
        long hours = gameTime / 1000 + 6;
        long minutes = (gameTime % 1000) * 60 / 1000;
        return hoursStart >= hours && hours <= hoursEnd;
    }

    @Override
    public String getId() {
        return "world-time-" + hoursStart + "-" + hoursEnd;
    }

    @Override
    public String getParentRuleId() {
        return "world-time";
    }
}
