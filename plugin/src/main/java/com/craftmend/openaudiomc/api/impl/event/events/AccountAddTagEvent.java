package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * This event gets called whenever a new {@link CraftmendTag} gets activated for this
 * OpenAudioMc installation. CraftmendTags are flags which tell the plugin
 * if it can enable specific features (like voicechat)
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AccountAddTagEvent extends AudioEvent {

    private CraftmendTag addedTag;

    @Override
    public EventSupport getSupport() {
        // only the top level server handles craftmend accounts
        return EventSupport.ONLY_PROXY_IF_AVAILABLE;
    }
}
