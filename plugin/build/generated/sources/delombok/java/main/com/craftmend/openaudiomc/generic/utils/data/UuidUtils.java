package com.craftmend.openaudiomc.generic.utils.data;

import java.util.UUID;

public class UuidUtils {

    public static UUID parseOrNull(String id) {
        try {
            return UUID.fromString(id);
        } catch (Exception e) {
            return null;
        }
    }

}
