package net.openaudiomc.files;

import lombok.Getter;

public class WebConfig {

    @Getter private static String url = "https://api.openaudiomc.net/v2/getPluginConfig.php?token={0}&clientId={1}";
    @Getter private String version;
    @Getter private String serverId;
    @Getter private String clientId;
    @Getter private String socketIp;
    @Getter private String socketVersion;
    @Getter private String websiteUrl;
    @Getter private Boolean stopOnTeleport;
    @Getter private String startSound;
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
