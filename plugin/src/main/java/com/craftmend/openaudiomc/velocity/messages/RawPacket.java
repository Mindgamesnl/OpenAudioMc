package com.craftmend.openaudiomc.velocity.messages;

import java.io.DataInputStream;
import java.io.IOException;

/**
 * Created by iKeirNez on 01/01/14, ported to velocity and modified by fluse1367 on 11/2020.
 */
public abstract class RawPacket extends StandardPacket {

    private String channel = null;

    public RawPacket(){}

    public RawPacket(String channel){
        this.channel = channel;
    }

    public String getChannel(){
        return channel;
    }

    @Override public void handle(DataInputStream dataInputStream) throws IOException {}

}
