package com.craftmend.openaudiomc.generic.text;

import net.kyori.adventure.text.serializer.gson.GsonComponentSerializer;
import net.kyori.adventure.text.serializer.legacy.LegacyComponentSerializer;
import org.junit.Test;

import java.lang.reflect.Method;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

/**
 * Adventure is not relocated in the test classpath, so the reflective lookups resolve here exactly
 * the way they resolve against the copy a Velocity proxy provides.
 */
public class ForeignAdventureTest {

    @Test
    public void findsTheGenericDeserializeMethod() throws Exception {
        Method deserialize = ForeignAdventure.findDeserialize(GsonComponentSerializer.class);

        assertEquals("deserialize", deserialize.getName());
        assertEquals(1, deserialize.getParameterCount());
    }

    @Test
    public void convertsAParsedComponent() throws Exception {
        Object converted = ForeignAdventure.convert(RichText.parse("<red>hello <bold>world"));

        assertNotNull(converted);
        assertEquals("§chello §lworld", LegacyComponentSerializer.legacySection().serialize((net.kyori.adventure.text.Component) converted));
    }

    @Test
    public void buildsPlainText() throws Exception {
        Object text = ForeignAdventure.text("§ehello");

        assertEquals("§ehello", LegacyComponentSerializer.legacySection().serialize((net.kyori.adventure.text.Component) text));
    }

}
