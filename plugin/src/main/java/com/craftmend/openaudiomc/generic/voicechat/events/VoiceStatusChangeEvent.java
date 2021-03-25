package com.craftmend.openaudiomc.generic.voicechat.events;

public enum VoiceStatusChangeEvent {

    // pretty obvious aye
    MICROPHONE_MUTED,
    MICROPHONE_UNMUTE,

    // The user is whispering
    LEVEL_WHISPERING,
    // the user is talking at a normal volume
    LEVEL_NORMAL,
    // the user is shouting incredibly hard
    LEVEL_SHOUTING,

}
