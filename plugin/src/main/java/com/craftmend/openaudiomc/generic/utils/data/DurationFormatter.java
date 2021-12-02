package com.craftmend.openaudiomc.generic.utils.data;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class DurationFormatter {
    public static final List<Long> times = Arrays.asList(
            TimeUnit.DAYS.toMillis(365),
            TimeUnit.DAYS.toMillis(30),
            TimeUnit.DAYS.toMillis(1),
            TimeUnit.HOURS.toMillis(1),
            TimeUnit.MINUTES.toMillis(1),
            TimeUnit.SECONDS.toMillis(1));
    public static final List<String> timesString = Arrays.asList("year", "month", "day", "hour", "minute", "second");

    public static String formatDuration(Duration duration) {
        return formatDuration(duration.toMinutes());
    }

    public static String formatDuration(long duration) {

        // 1 year
        if (duration > 525600) {
            return "Unknown/Never";
        }

        // back to milis
        duration = duration*60000;

        StringBuffer res = new StringBuffer();
        for (int i = 0; i < times.size(); i++) {
            Long current = times.get(i);
            long temp = duration / current;
            if (temp > 0) {
                res.append(temp).append(" ").append(timesString.get(i)).append(temp != 1 ? "s" : "").append(" ago");
                break;
            }
        }
        if ("".equals(res.toString()))
            return "0 seconds ago";
        else
            return res.toString();
    }
}