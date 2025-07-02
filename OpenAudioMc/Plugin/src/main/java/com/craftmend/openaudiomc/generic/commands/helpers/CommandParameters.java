package com.craftmend.openaudiomc.generic.commands.helpers;

import java.util.HashMap;
import java.util.Map;

public class CommandParameters {

    private Map<String, String> parameters = new HashMap<>();

    public CommandParameters(Map<String, String> parameters) {
        this.parameters = parameters;
    }

    public String getParameter(String key) {
        return parameters.get(key);
    }

    public String getParameterOrDefault(String key, String defaultValue) {
        return parameters.getOrDefault(key, defaultValue);
    }

    public boolean hasParameter(String key) {
        return parameters.containsKey(key);
    }

}
