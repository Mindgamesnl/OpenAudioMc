package com.craftmend.vistas.server.base;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WrappedRunnable {

    private Runnable task;

}
