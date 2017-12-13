package net.openaudiomc.jclient.modules.socket.objects;

import lombok.Getter;

public class ApiEndpoints {

    public ApiEndpoints() {

    }

    //local server from testing
    private String root = "http://192.168.2.39";
    @Getter  private int port = 6969;

    public String getSocket() {
        return root;
    }

    public String getRESTServer() {
        return root + ":" + port + "/genid";
    }

}
