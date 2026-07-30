package com.craftmend.openaudiomc.generic.text;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.yaml.snakeyaml.Yaml;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * Every message we ship must keep taking the untouched color code path, so that upgrading the plugin
 * cannot change a single line of chat for a server that never opted into MiniMessage.
 */
@RunWith(Parameterized.class)
public class ShippedConfigStaysLegacyTest {

    @Parameterized.Parameters(name = "{0}")
    public static Collection<Object[]> shippedMessages() {
        List<Object[]> cases = new ArrayList<>();
        try (InputStream config = ShippedConfigStaysLegacyTest.class.getResourceAsStream("/config.yml")) {
            Map<String, Object> root = new Yaml().load(config);
            collect("", root, cases);
        } catch (Exception e) {
            throw new IllegalStateException("Unable to read the shipped config.yml", e);
        }
        assertTrue("No messages found in the shipped config.yml", cases.size() > 50);
        return cases;
    }

    @SuppressWarnings("unchecked")
    private static void collect(String path, Map<String, Object> section, List<Object[]> cases) {
        for (Map.Entry<String, Object> entry : section.entrySet()) {
            String key = path.isEmpty() ? entry.getKey() : path + "." + entry.getKey();
            Object value = entry.getValue();

            if (value instanceof Map) {
                collect(key, (Map<String, Object>) value, cases);
            } else if (value instanceof String) {
                cases.add(new Object[]{key, value});
            }
        }
    }

    @Parameterized.Parameter
    public String key;

    @Parameterized.Parameter(1)
    public String value;

    @Test
    public void isNotDetectedAsRichText() {
        assertFalse(key + " would switch to the MiniMessage renderer", RichText.isRich(value));
    }

}
