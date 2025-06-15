package com.craftmend.openaudiomc.generic.rest.response;

public enum SectionError {
    // generic exception
    NONE("Nothing went wrong (yet)"), 
    // unrecoverable errors
    TIMEOUT("The transport layer failed to connect to the server"), SERVER_ERROR("The server returned a 500 error"), NOT_FOUND("The server returned a 404 error"), UNAUTHORIZED("The server returned a 401 error"), VOICECHAT_DISABLED("You can\'t use voicechat on this server"), VOICECHAT_ALREADY_CONNECTED("You are already connected to voicechat"), VOICECHAT_NOT_CONNECTED("You are not connected to voicechat"), ALREADY_CLAIMED("This server is already linked to an account! Please unlink it before trying to connect it again");
    private String message;

    SectionError(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
