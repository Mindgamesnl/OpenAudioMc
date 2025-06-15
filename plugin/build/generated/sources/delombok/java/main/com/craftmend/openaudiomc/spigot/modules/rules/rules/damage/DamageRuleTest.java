package com.craftmend.openaudiomc.spigot.modules.rules.rules.damage;

import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.rules.data.RuleTest;

public class DamageRuleTest extends RuleTest {
    private DamageListener damageListener;
    private int timeFrame;

    @Override
    public String getName() {
        return "damaged in the last " + timeFrame + " seconds";
    }

    @Override
    public String getDescription() {
        return "Requires the player to have been attacked in the last X seconds";
    }

    @Override
    public boolean testPlayer(SpigotConnection player) {
        return damageListener.isPlayerDamaged(player.getBukkitPlayer(), timeFrame);
    }

    @Override
    public String getId() {
        return "damagereceived-" + timeFrame;
    }

    @Override
    public String getParentRuleId() {
        return "damagereceived";
    }

    public DamageRuleTest(final DamageListener damageListener, final int timeFrame) {
        this.damageListener = damageListener;
        this.timeFrame = timeFrame;
    }
}
