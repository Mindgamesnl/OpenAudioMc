package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * This event gets called whenever a new {@link CraftmendTag} gets activated for this
 * OpenAudioMc installation. CraftmendTags are flags which tell the plugin
 * if it can disable specific features (like voicechat)
 */
@Getter
@AllArgsConstructor
public class AccountRemoveTagEvent extends AudioEvent {

    private CraftmendTag removedTag;

}
