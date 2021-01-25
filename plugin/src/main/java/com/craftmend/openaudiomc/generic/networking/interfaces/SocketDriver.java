package com.craftmend.openaudiomc.generic.networking.interfaces;

import com.craftmend.openaudiomc.generic.networking.io.SocketIoConnector;
import io.socket.client.Socket;

public interface SocketDriver {

    void boot(Socket socket, SocketIoConnector connector);

}
