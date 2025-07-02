package vistas.test.server;

import com.craftmend.vistas.server.VistasBoot;
import com.craftmend.vistas.server.VistasServer;

public class TestVistasServer implements Runnable {

    private VistasServer vistasServer;
    private Thread serverThread;

    public TestVistasServer() {
        serverThread = new Thread(this);
        serverThread.run();
    }

    @Override
    public void run() {
        VistasBoot.main(new String[]{});
    }
}
