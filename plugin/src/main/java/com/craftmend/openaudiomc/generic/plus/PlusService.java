package com.craftmend.openaudiomc.generic.plus;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.plus.tasks.PlayerSynchroniser;

public class PlusService {

    private PlayerSynchroniser playerSynchroniser;

    public PlusService(OpenAudioMc openAudioMc) {
        playerSynchroniser = new PlayerSynchroniser(this, openAudioMc);
    }

}
