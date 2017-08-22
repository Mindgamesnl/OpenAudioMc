package net.openaudiomc.files;

import lombok.Getter;

public class MessageConfig {

    @Getter private String messagesVersion;
    @Getter private String serverId;
    @Getter private String clientId;
    @Getter private String prefix;
    @Getter private String connectMessage;
    @Getter private String connectWarning;
    @Getter private String disconnectedMessage;
    @Getter private String connectedMessage;
    @Getter private String hueConnectedMessage;
    @Getter private String volumeSet;
    @Getter private String volumeError;
    @Getter private String needConnected;
    @Getter private String socketioLoading;

}