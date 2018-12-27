package com.craftmend.openaudiomc.modules.authentication.objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServerKeySet {

    private Key privateKey;
    private Key publicKey;

}
