package com.craftmend.openaudiomc.spigot.modules.proxy.objects;

import com.craftmend.openaudiomc.generic.node.enums.ProxiedCommand;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommandProxyPayload {

    private ProxiedCommand proxiedCommand;
    private String[] args;
    private UUID executor;

}
