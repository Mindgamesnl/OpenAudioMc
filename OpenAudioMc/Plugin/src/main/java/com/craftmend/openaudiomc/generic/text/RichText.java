package com.craftmend.openaudiomc.generic.text;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.platform.Platform;
import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.event.ClickEvent;
import net.kyori.adventure.text.minimessage.MiniMessage;
import net.kyori.adventure.text.serializer.legacy.LegacyComponentSerializer;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class RichText {

    private static final Pattern TAG = Pattern.compile("<[a-zA-Z#!/][^<>]*>");
    private static final Pattern LEGACY_CODE = Pattern.compile("[&§]([0-9a-fk-orA-FK-OR])");
    private static final Map<Character, String> TAGS_BY_CODE = new HashMap<>();

    static {
        TAGS_BY_CODE.put('0', "<black>");
        TAGS_BY_CODE.put('1', "<dark_blue>");
        TAGS_BY_CODE.put('2', "<dark_green>");
        TAGS_BY_CODE.put('3', "<dark_aqua>");
        TAGS_BY_CODE.put('4', "<dark_red>");
        TAGS_BY_CODE.put('5', "<dark_purple>");
        TAGS_BY_CODE.put('6', "<gold>");
        TAGS_BY_CODE.put('7', "<gray>");
        TAGS_BY_CODE.put('8', "<dark_gray>");
        TAGS_BY_CODE.put('9', "<blue>");
        TAGS_BY_CODE.put('a', "<green>");
        TAGS_BY_CODE.put('b', "<aqua>");
        TAGS_BY_CODE.put('c', "<red>");
        TAGS_BY_CODE.put('d', "<light_purple>");
        TAGS_BY_CODE.put('e', "<yellow>");
        TAGS_BY_CODE.put('f', "<white>");
        TAGS_BY_CODE.put('k', "<obfuscated>");
        TAGS_BY_CODE.put('l', "<bold>");
        TAGS_BY_CODE.put('m', "<strikethrough>");
        TAGS_BY_CODE.put('n', "<underlined>");
        TAGS_BY_CODE.put('o', "<italic>");
        TAGS_BY_CODE.put('r', "<reset>");
    }

    private RichText() {
    }

    public static boolean isRich(String input) {
        if (input == null) {
            return false;
        }

        switch (MessageFormat.configured()) {
            case LEGACY:
                return false;
            case MINIMESSAGE:
                return true;
            default:
                return containsTagShape(input);
        }
    }

    public static boolean containsTagShape(String input) {
        return input != null && TAG.matcher(input).find();
    }

    public static String escape(String input) {
        return MiniMessage.miniMessage().escapeTags(input);
    }

    public static Component parse(String input) {
        try {
            return MiniMessage.miniMessage().deserialize(legacyCodesToTags(input));
        } catch (Throwable e) {
            OpenAudioLogger.warn("Failed to parse message as MiniMessage, falling back to color codes: " + input);
            return asLegacy(input);
        }
    }

    public static boolean isRich(String text, String hoverMessage) {
        return isRich(text) || isRich(hoverMessage);
    }

    public static Component clickableCommand(String text, String hoverMessage, String command) {
        return clickable(text, hoverMessage, ClickEvent.runCommand("/" + command));
    }

    public static Component clickableUrl(String text, String hoverMessage, String url) {
        return clickable(text, hoverMessage, ClickEvent.openUrl(url));
    }

    private static Component clickable(String text, String hoverMessage, ClickEvent clickEvent) {
        return toComponent(text)
                .clickEvent(clickEvent)
                .hoverEvent(toComponent(hoverMessage));
    }

    public static Component toComponent(String input) {
        return isRich(input) ? parse(input) : asLegacy(input);
    }

    public static Component asLegacy(String input) {
        return LegacyComponentSerializer.legacySection().deserialize(Platform.translateColors(input));
    }

    static String legacyCodesToTags(String input) {
        Matcher matcher = LEGACY_CODE.matcher(input);
        StringBuffer output = new StringBuffer();
        while (matcher.find()) {
            String tag = TAGS_BY_CODE.get(Character.toLowerCase(matcher.group(1).charAt(0)));
            matcher.appendReplacement(output, Matcher.quoteReplacement(tag));
        }
        matcher.appendTail(output);
        return output.toString();
    }

}
