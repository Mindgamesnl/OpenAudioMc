package com.craftmend.openaudiomc.spigot.services.authentication.objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServerKeySet {

    /**
     * The key set
     *
     * Used for all authentication, and is what makes your server truly unique.
     * (sorry, was that too mean?)
     */
    private Key privateKey;
    private Key publicKey;

}
