package net.openaudiomc.files;

import lombok.Getter;

public class WebConfig {

    @Getter private String configVersion;
    @Getter private String serverId;
    @Getter private String host;
    @Getter private String websiteUrl;
    @Getter private Boolean stopOnTeleport;
    @Getter private String startSound;

}
