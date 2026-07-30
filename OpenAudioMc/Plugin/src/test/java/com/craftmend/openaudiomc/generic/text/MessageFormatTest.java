package com.craftmend.openaudiomc.generic.text;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.Collection;

import static org.junit.Assert.assertEquals;

@RunWith(Parameterized.class)
public class MessageFormatTest {

    @Parameterized.Parameters(name = "{0} -> {1}")
    public static Collection<Object[]> cases() {
        return Arrays.asList(new Object[][]{
                {"auto", MessageFormat.AUTO},
                {"legacy", MessageFormat.LEGACY},
                {"minimessage", MessageFormat.MINIMESSAGE},
                {"LEGACY", MessageFormat.LEGACY},
                {"  MiniMessage  ", MessageFormat.MINIMESSAGE},
                {null, MessageFormat.AUTO},
                {"", MessageFormat.AUTO},
                {"something else", MessageFormat.AUTO},
                // what the config returns for a server that has not run the migration yet
                {"<unknown openaudiomc value options.message-format>", MessageFormat.AUTO},
        });
    }

    @Parameterized.Parameter
    public String input;

    @Parameterized.Parameter(1)
    public MessageFormat expected;

    @Test
    public void parsesConfiguredValue() {
        assertEquals(expected, MessageFormat.parse(input));
    }

}
