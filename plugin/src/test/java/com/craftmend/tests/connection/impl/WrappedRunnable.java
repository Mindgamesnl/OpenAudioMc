package com.craftmend.tests.connection.impl;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WrappedRunnable {

    private Runnable task;

}
