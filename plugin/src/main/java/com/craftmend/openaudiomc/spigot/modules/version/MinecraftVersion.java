package com.craftmend.openaudiomc.spigot.modules.version;

import org.bukkit.Bukkit;

public enum MinecraftVersion {

    V_1_8("1.8"),
    V_1_8_1("1.8.1"),
    V_1_8_2("1.8.2"),
    V_1_8_3("1.8.3"),
    V_1_8_4("1.8.4"),
    V_1_8_5("1.8.5"),
    V_1_8_6("1.8.6"),
    V_1_8_7("1.8.7"),
    V_1_8_8("1.8.8"),

    V_1_9("1.9"),
    V_1_9_1("1.9.1"),
    V_1_9_2("1.9.2"),
    V_1_9_3("1.9.3"),
    V_1_9_4("1.9.4"),

    V_1_10("1.10"),
    V_1_10_1("1.10.1"),
    V_1_10_2("1.10.2"),

    V_1_11("1.11"),
    V_1_11_1("1.11.1"),
    V_1_11_2("1.11.2"),

    V_1_12("1.12"),
    V_1_12_1("1.12.1"),
    V_1_12_2("1.12.2"),

    V_1_13("1.13"),
    V_1_13_1("1.13.1"),
    V_1_13_2("1.13.2"),

    V_1_14("1.14"),
    V_1_14_1("1.14.1"),
    V_1_14_2("1.14.2"),
    V_1_14_3("1.14.3"),
    V_1_14_4("1.14.4"),

    V_1_15("1.15"),
    V_1_15_1("1.15.1"),
    V_1_15_2("1.15.2"),

    V_1_16("1.16"),
    V_1_16_1("1.16.1"),
    V_1_16_2("1.16.2"),
    V_1_16_3("1.16.3"),
    V_1_16_4("1.16.4"),
    V_1_16_5("1.16.5"),

    V_1_17("1.17"),
    V_1_17_1("1.17.1"),

    V_1_18("1.18"),
    V_1_18_1("1.18.1"),
    V_1_18_2("1.18.2"),

    V_1_19("1.19"),
    V_1_19_1("1.19.1"),
    V_1_19_2("1.19.2"),
    V_1_19_3("1.19.3"),
    V_1_19_4("1.19.4"),

    V_1_20("1.20"),
    V_1_20_1("1.20.1"),
    V_1_20_2("1.20.2"),
    V_1_20_3("1.20.3"),
    V_1_20_4("1.20.4"),
    V_1_20_5("1.20.5"),
    V_1_20_6("1.20.6"),

    V_1_21("1.21"),
    V_1_21_1("1.21.1"),
    V_1_21_2("1.21.2"),
    V_1_21_3("1.21.3"),
    V_1_21_4("1.21.4"),
    V_1_21_5("1.21.5"),

    NEW_UNKNOWN("unknown");

    private final String version;

    public static MinecraftVersion getCurrent() {
        String version = Bukkit.getVersion();
        MinecraftVersion latestMatch = null;
        for (MinecraftVersion minecraftVersion : MinecraftVersion.values()) {
            if (version.contains(minecraftVersion.version)) {
                if (latestMatch == null || minecraftVersion.ordinal() > latestMatch.ordinal()) {
                    latestMatch = minecraftVersion;
                }
            }
        }
        if (latestMatch != null) {
            return latestMatch;
        }
        return NEW_UNKNOWN;
    }

    MinecraftVersion(String version) {
        this.version = version;
    }

    public boolean isBefore(MinecraftVersion version) {
        return this.ordinal() < version.ordinal();
    }

    public boolean isAfter(MinecraftVersion version) {
        return this.ordinal() > version.ordinal();
    }

    public boolean isAtLeast(MinecraftVersion version) {
        return this.ordinal() >= version.ordinal();
    }

}
