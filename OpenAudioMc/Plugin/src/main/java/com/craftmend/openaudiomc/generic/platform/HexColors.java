package com.craftmend.openaudiomc.generic.platform;

import com.craftmend.openaudiomc.OpenAudioMc;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Translates hex color codes ({@literal &#rrggbb}) into the legacy section-x format
 * ({@literal §x§r§r§g§g§b§b}) that clients on 1.16 and
 * up understand. Servers that are too old for hex colors get the closest matching legacy
 * color instead, so a config written with hex codes still looks reasonable everywhere.
 */
public class HexColors {

    private static final char COLOR_CHAR = '§';
    private static final Pattern HEX_PATTERN = Pattern.compile("(?i)[&§]#([0-9a-f]{6})");
    private static final Pattern SECTION_HEX_PATTERN =
            Pattern.compile("(?i)§x(§[0-9a-f]){6}");

    // the 16 legacy chat colors, used to approximate hex colors on old servers
    private static final int[] LEGACY_RGB = {
            0x000000, 0x0000AA, 0x00AA00, 0x00AAAA,
            0xAA0000, 0xAA00AA, 0xFFAA00, 0xAAAAAA,
            0x555555, 0x5555FF, 0x55FF55, 0x55FFFF,
            0xFF5555, 0xFF55FF, 0xFFFF55, 0xFFFFFF
    };
    private static final char[] LEGACY_CODES = "0123456789abcdef".toCharArray();

    private static Boolean nativeHexSupport = null;

    public static String translate(String input) {
        if (input == null || input.isEmpty()) return input;
        if (input.indexOf('#') == -1) return input;

        Matcher matcher = HEX_PATTERN.matcher(input);
        StringBuffer out = new StringBuffer(input.length());
        boolean modern = supportsHex();

        while (matcher.find()) {
            String hex = matcher.group(1).toLowerCase();
            matcher.appendReplacement(out, Matcher.quoteReplacement(modern ? toModern(hex) : toLegacy(hex)));
        }
        matcher.appendTail(out);
        return out.toString();
    }

    /**
     * Collapses §x§r§r§g§g§b§b sequences back into the closest single legacy color code.
     * Needed for targets that render raw section codes instead of chat components, like
     * the server console, where §x itself means nothing.
     */
    public static String sectionHexToLegacy(String input) {
        if (input == null || input.isEmpty()) return input;

        Matcher matcher = SECTION_HEX_PATTERN.matcher(input);
        StringBuffer out = new StringBuffer(input.length());

        while (matcher.find()) {
            // strip the §x prefix and every section sign to get back to the plain hex
            String hex = matcher.group().substring(2).replace(String.valueOf(COLOR_CHAR), "");
            matcher.appendReplacement(out, Matcher.quoteReplacement(toLegacy(hex.toLowerCase())));
        }
        matcher.appendTail(out);
        return out.toString();
    }

    private static String toModern(String hex) {
        StringBuilder sb = new StringBuilder(14);
        sb.append(COLOR_CHAR).append('x');
        for (char c : hex.toCharArray()) {
            sb.append(COLOR_CHAR).append(c);
        }
        return sb.toString();
    }

    private static String toLegacy(String hex) {
        int rgb = Integer.parseInt(hex, 16);
        int r = (rgb >> 16) & 0xFF;
        int g = (rgb >> 8) & 0xFF;
        int b = rgb & 0xFF;

        int best = 0;
        double bestDistance = Double.MAX_VALUE;
        for (int i = 0; i < LEGACY_RGB.length; i++) {
            double distance = distance(r, g, b, LEGACY_RGB[i]);
            if (distance < bestDistance) {
                bestDistance = distance;
                best = i;
            }
        }
        return String.valueOf(COLOR_CHAR) + LEGACY_CODES[best];
    }

    /**
     * Redmean color distance, a cheap approximation of perceived color difference.
     * See https://en.wikipedia.org/wiki/Color_difference#sRGB
     */
    private static double distance(int r, int g, int b, int other) {
        int or = (other >> 16) & 0xFF;
        int og = (other >> 8) & 0xFF;
        int ob = other & 0xFF;

        double meanRed = (r + or) / 2d;
        int dr = r - or;
        int dg = g - og;
        int db = b - ob;

        return (2 + meanRed / 256d) * dr * dr
                + 4d * dg * dg
                + (2 + (255 - meanRed) / 256d) * db * db;
    }

    private static boolean supportsHex() {
        if (nativeHexSupport != null) return nativeHexSupport;

        Platform platform = OpenAudioMc.getInstance().getPlatform();
        if (platform == Platform.SPIGOT || platform == Platform.BUNGEE) {
            // ChatColor#of(String) only exists on 1.16 and up, and is bundled with both
            // the spigot server and bungeecord
            try {
                Class.forName("net.md_5.bungee.api.ChatColor").getMethod("of", String.class);
                nativeHexSupport = true;
            } catch (ClassNotFoundException | NoSuchMethodException e) {
                nativeHexSupport = false;
            }
        } else {
            // velocity (and anything else) never supported clients older than 1.16
            nativeHexSupport = true;
        }

        return nativeHexSupport;
    }

}
