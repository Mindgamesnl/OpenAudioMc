package gg.hangouts.deputy.shared.redis.packets.openaudiomc;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import gg.hangouts.deputy.shared.reflection.SerializedCall;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InvokeUserPacket extends AbstractPacketPayload {

    private SerializedCall call;
    private UUID playerUuid;

}
