package com.craftmend.openaudiomc.spigot.modules.proxy.objects;

import com.craftmend.openaudiomc.generic.node.enums.CommandProxy;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommandProxyPayload {

    private CommandProxy commandProxy;
    private String[] args;
    private UUID executor;

}
