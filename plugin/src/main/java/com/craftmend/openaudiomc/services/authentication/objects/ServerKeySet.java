package com.craftmend.openaudiomc.services.authentication.objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServerKeySet {

    private Key privateKey;
    private Key publicKey;

}
