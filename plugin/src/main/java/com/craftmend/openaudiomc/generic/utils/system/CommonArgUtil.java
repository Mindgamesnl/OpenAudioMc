package com.craftmend.openaudiomc.generic.utils.system;

public class CommonArgUtil {

    public static boolean asTitle(String[] args) {
        return args.length == 1 && (args[0].equalsIgnoreCase("token") || args[0].equalsIgnoreCase("bedrock") || args[0].equalsIgnoreCase("key"));
    }

}
