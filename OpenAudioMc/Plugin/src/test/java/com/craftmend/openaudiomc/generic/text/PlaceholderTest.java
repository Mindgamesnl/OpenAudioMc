package com.craftmend.openaudiomc.generic.text;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class PlaceholderTest {

    @Test
    public void leavesLegacyMessagesExactlyAsTheyWereBefore() {
        String template = "&3[&bVoice Channel&3] &7You joined {channel}";

        assertEquals(
                template.replace("{channel}", "lobby"),
                Placeholders.of(template).with("channel", "lobby").apply()
        );
    }

    @Test
    public void fillsEveryPlaceholder() {
        String filled = Placeholders.of("{channel} has {participants} ({type})")
                .with("channel", "lobby")
                .with("participants", "mats, someone")
                .with("type", "static")
                .apply();

        assertEquals("lobby has mats, someone (static)", filled);
    }

    @Test
    public void missingValueLeavesThePlaceholderAlone() {
        assertEquals("hello {channel}", Placeholders.of("hello {channel}").apply());
    }

    @Test
    public void nullValueBecomesEmpty() {
        assertEquals("hello ", Placeholders.of("hello {channel}").with("channel", null).apply());
    }

    @Test
    public void renderedValuesAreNotEscapedTwice() {
        String alreadyRendered = "<red>the inner message";

        assertEquals(
                "prefix: <red>the inner message",
                Placeholders.of("prefix: {message}").withRendered("message", alreadyRendered).apply()
        );
    }

}
