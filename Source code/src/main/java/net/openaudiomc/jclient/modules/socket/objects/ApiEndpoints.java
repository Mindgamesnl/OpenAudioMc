package net.openaudiomc.jclient.modules.socket.objects;

import lombok.Getter;

public class ApiEndpoints {

    public ApiEndpoints() {

    }

    //local server from testing
    private String root = "https://craftmendserver.eu";
    @Getter  private int port = 6969;

    public String getSocket() {
        return root + ":" + port;
    }

    public String getRESTServer() {
        return root + ":" + port + "/genid";
    }

}
