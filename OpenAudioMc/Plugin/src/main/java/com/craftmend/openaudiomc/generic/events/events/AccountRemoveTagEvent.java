package com.craftmend.openaudiomc.generic.events.events;

import com.craftmend.openaudiomc.api.events.BaseEvent;
import com.craftmend.openaudiomc.generic.oac.enums.CraftmendTag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
@AllArgsConstructor
public class AccountRemoveTagEvent extends BaseEvent {

    private CraftmendTag addedTag;

}
