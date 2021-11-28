package com.craftmend.openaudiomc.generic.rd.protocol;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class RegisterBody {

    private String password;
    private String baseUrl;
    private String publicKey;
    private String privateKey;

}
