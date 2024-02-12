package com.craftmend.openaudiomc.generic.commands.tabcomplete;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.interfaces.TabCompleteProvider;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;

import java.util.ArrayList;
import java.util.List;

public class ClientTabcompleteProvider implements TabCompleteProvider {

    public static final ClientTabcompleteProvider INSTANCE = new ClientTabcompleteProvider();

    @Override
    public List<String> getOptions() {
        List<String> names = new ArrayList<>();
        for (ClientConnection client : OpenAudioMc.getService(NetworkingService.class).getClients()) {
            names.add(client.getUser().getName());
        }
        return names;
    }

}
