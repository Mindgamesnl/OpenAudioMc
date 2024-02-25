package com.craftmend.openaudiomc.generic.networking.drivers.models;

import lombok.Getter;

import java.io.Serializable;
import java.util.Set;

@Getter
public class BackendNotification implements Serializable {

    private String notificationType;
    private String message;

    /**
     * Required Tag's for this event to be executed.
     * Note that these are being send as STRING and evaluated as such,
     * this is to prevent errors on servers running old versions of the plugin
     * that might not support future tags. Running valueOf checks with those
     * would throw weird exceptions and possibly cause funky behaviour
     */
    private Set<String> requiredTags;

}
