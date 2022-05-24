package gg.hangouts.deputy.shared.redis.packets.openaudiomc;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvalCommandPacket extends AbstractPacketPayload {

    private UUID userId;
    private String[] command;

}
