package gg.hangouts.deputy.shared.redis.packets.openaudiomc;

import com.craftmend.openaudiomc.generic.media.time.TimeService;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TimeServiceUpdatePacket extends AbstractPacketPayload {

    private TimeService timeService;

}
