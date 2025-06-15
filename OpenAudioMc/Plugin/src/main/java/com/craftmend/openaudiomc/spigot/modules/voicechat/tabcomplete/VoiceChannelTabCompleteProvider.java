package com.craftmend.openaudiomc.spigot.modules.voicechat.tabcomplete;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.TabCompleteProvider;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.voicechat.VoiceChannelService;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.Channel;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.ChannelEnterResponse;

import java.util.ArrayList;
import java.util.Collection;

public class VoiceChannelTabCompleteProvider implements TabCompleteProvider {

    @Override
    public String[] getOptions(User sender) {
        Collection<Channel> channels = new ArrayList<>(OpenAudioMc.getService(VoiceChannelService.class).getChannels());
        channels.removeIf(channel -> channel.isRequiresPermissionToSee() && channel.attemptEnter(sender) != ChannelEnterResponse.OK);
        String[] options = new String[channels.size()];
        int i = 0;
        for (Channel channel : channels) {
            options[i] = channel.getName();
            i++;
        }
        return options;
    }
}
