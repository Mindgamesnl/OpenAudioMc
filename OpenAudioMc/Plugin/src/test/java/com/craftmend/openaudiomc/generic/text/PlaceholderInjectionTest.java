package com.craftmend.openaudiomc.generic.text;

import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.serializer.legacy.LegacyComponentSerializer;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.Collection;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * Channel names are picked by players and get echoed back through configured messages, so a name made
 * of MiniMessage tags must never end up as real markup. These run in AUTO, the shipped default.
 */
@RunWith(Parameterized.class)
public class PlaceholderInjectionTest {

    @Parameterized.Parameters(name = "{0} + {1}")
    public static Collection<Object[]> cases() {
        return Arrays.asList(new Object[][]{
                // a legacy template, which is what every shipped message looks like
                {"&aCreated channel {channel}", "<click:run_command:'/op me'>gotcha</click>"},
                {"&aCreated channel {channel}", "<red>not actually red"},
                {"&aCreated channel {channel}", "<hover:show_text:'boo'>x</hover>"},
                // a template the admin already migrated to MiniMessage
                {"<green>Created channel {channel}", "<click:run_command:'/op me'>gotcha</click>"},
                {"<green>Created channel {channel}", "<insert:/op me>x</insert>"},
        });
    }

    @Parameterized.Parameter
    public String template;

    @Parameterized.Parameter(1)
    public String hostileName;

    @Test
    public void hostileValueNeverBecomesMarkup() {
        String filled = Placeholders.of(template).with("channel", hostileName).apply();
        Component rendered = RichText.toComponent(filled);

        assertFalse("a hostile placeholder produced a live event", hasEvents(rendered));
        assertTrue(
                "the hostile value should survive as literal text, got: " + plain(rendered),
                plain(rendered).contains(hostileName)
        );
    }

    private String plain(Component component) {
        return LegacyComponentSerializer.legacySection().serialize(component).replaceAll("§.", "");
    }

    private boolean hasEvents(Component component) {
        if (component.clickEvent() != null || component.hoverEvent() != null || component.insertion() != null) {
            return true;
        }

        for (Component child : component.children()) {
            if (hasEvents(child)) {
                return true;
            }
        }
        return false;
    }

}
