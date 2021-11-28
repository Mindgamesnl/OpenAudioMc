package com.craftmend.openaudiomc.generic.cdn.protocol;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class RegisterBody {

    private String password;
    private String baseUrl;
    private String publicKey;
    private String privateKey;

}
