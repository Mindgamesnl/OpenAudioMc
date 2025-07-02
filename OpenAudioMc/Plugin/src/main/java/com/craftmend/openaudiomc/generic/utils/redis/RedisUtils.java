package com.craftmend.openaudiomc.generic.utils.redis;

import io.lettuce.core.RedisURI;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class RedisUtils {

    private static final Pattern URI_FORMAT = Pattern.compile("^(?:(.+)@)?([a-zA-Z0-9.]+)(?::([0-9]{1,5}))?$");

    private RedisUtils() {
    }

    public static RedisURI readRedisUri(String str, int defaultPort) {
        final Matcher matcher = URI_FORMAT.matcher(str);
        if (!matcher.matches())
            return null;
        return RedisURI.builder()
                .withHost(matcher.group(2))
                .withPort(matcher.group(3) == null ? defaultPort : Integer.parseInt(matcher.group(3)))
                .withPassword(matcher.group(1) == null ? null : matcher.group(1).toCharArray())
                .build();
    }
}
