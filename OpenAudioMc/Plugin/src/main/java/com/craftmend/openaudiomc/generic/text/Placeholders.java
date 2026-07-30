package com.craftmend.openaudiomc.generic.text;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Fills {placeholder} slots in a configured message. Values are player controlled (channel names,
 * nicknames), so they are escaped whenever the finished message is going to be parsed as MiniMessage.
 * Without that, naming a channel "&lt;click:run_command:'/op me'&gt;" would turn every message echoing
 * that name into a working click event for whoever receives it.
 */
public final class Placeholders {

    private final String template;
    private final Map<String, String> values = new LinkedHashMap<>();
    private final Map<String, String> trustedValues = new LinkedHashMap<>();

    private Placeholders(String template) {
        this.template = template == null ? "" : template;
    }

    public static Placeholders of(String template) {
        return new Placeholders(template);
    }

    public Placeholders with(String key, String value) {
        values.put(key, value == null ? "" : value);
        return this;
    }

    /**
     * For values that are themselves already filled in messages, which would pick up a second round of
     * escaping and start showing backslashes.
     */
    public Placeholders withRendered(String key, String value) {
        trustedValues.put(key, value == null ? "" : value);
        return this;
    }

    public String apply() {
        boolean escape = willBeParsed();
        String result = template;

        for (Map.Entry<String, String> entry : values.entrySet()) {
            String value = escape ? RichText.escape(entry.getValue()) : entry.getValue();
            result = result.replace("{" + entry.getKey() + "}", value);
        }

        for (Map.Entry<String, String> entry : trustedValues.entrySet()) {
            result = result.replace("{" + entry.getKey() + "}", entry.getValue());
        }

        return result;
    }

    private boolean willBeParsed() {
        switch (MessageFormat.configured()) {
            case LEGACY:
                return false;
            case MINIMESSAGE:
                return true;
            default:
                return RichText.containsTagShape(template) || anyValueContainsTagShape();
        }
    }

    private boolean anyValueContainsTagShape() {
        for (String value : values.values()) {
            if (RichText.containsTagShape(value)) {
                return true;
            }
        }
        return false;
    }

}
