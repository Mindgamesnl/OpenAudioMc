package com.craftmend.openaudiomc.generic.utils.data;

import java.net.InetAddress;
import java.util.Locale;
import java.util.Map;

public class EnvironmentHelper {

    public static boolean contains(String key) {
        key = key.toLowerCase(Locale.ROOT);
        try {
            String hostname = InetAddress.getLocalHost().getHostName().toLowerCase(Locale.ROOT);
            if (hostname.contains(key)) {
                return true;
            }
        } catch (Exception e) {
            // no
        }
        Map<String, String> env = System.getenv();
        if (env.containsKey("COMPUTERNAME"))
            if (env.get("COMPUTERNAME").toLowerCase(Locale.ROOT).contains(key)) return true;
        else if (env.containsKey("HOSTNAME"))
                return env.get("HOSTNAME").toLowerCase(Locale.ROOT).contains(key);

        return false;
    }

}
