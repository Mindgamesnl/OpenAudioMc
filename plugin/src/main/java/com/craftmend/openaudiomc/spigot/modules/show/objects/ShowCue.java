package com.craftmend.openaudiomc.spigot.modules.show.objects;

import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShowCue {

    private UUID id;
    private Long timestamp;
    private ShowRunnable task;

}
