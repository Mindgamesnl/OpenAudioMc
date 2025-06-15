package com.craftmend.openaudiomc.generic.commands.helpers;

public class ParameterUtil {

    /**
     * Count the amount of arguments in a string array that are not parameters
     * @param fullArgs The full argument array
     * @return The amount of arguments that are not parameters
     */
    public static int countArgumentsWithoutParams(String[] fullArgs) {
        int parameterCount = 0;

        for (String arg : fullArgs) {
            if (arg.startsWith("--") && arg.contains("=")) {
                parameterCount++;
            }
        }

        // remove all parameters from the args array
        return fullArgs.length - parameterCount;
    }

}
