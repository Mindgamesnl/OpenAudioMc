package com.craftmend.openaudiomc.generic.media.interfaces;

public interface UrlMutation {

    /**
     * @param original the original source as entered in the command
     * @return the new url that will be send to the client
     */
    String onRequest(String original);

}
