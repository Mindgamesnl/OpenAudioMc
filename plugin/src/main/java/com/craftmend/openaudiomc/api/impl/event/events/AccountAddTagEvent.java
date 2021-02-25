package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.state.interfaces.State;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AccountAddTagEvent extends AudioEvent {

    private CraftmendTag addedTag;

}
