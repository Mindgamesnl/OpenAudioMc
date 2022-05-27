package com.craftmend.vistas.server;

public class VistasBoot {

    private static VistasServer vistasServer;

    public static void main(String[] args) {
        vistasServer = new VistasServer();
        vistasServer.onEnable();
    }


}
