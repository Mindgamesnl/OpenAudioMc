package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.state.interfaces.State;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * This event gets called whenever a new {@link CraftmendTag} gets activated for this
 * OpenAudioMc installation. CraftmendTags are flags which tell the plugin
 * if it can enable specific features (like voicechat)
 */
@Getter
@AllArgsConstructor
public class AccountAddTagEvent extends AudioEvent {

    private CraftmendTag addedTag;

}
