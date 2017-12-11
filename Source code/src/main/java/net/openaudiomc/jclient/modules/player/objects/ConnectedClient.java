package net.openaudiomc.jclient.modules.player.objects;

public class ConnectedClient {

    private AudioListener l;

    public ConnectedClient(AudioListener o) {
        l = o;
    }

    public void close() {
    }
}
