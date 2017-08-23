package net.openaudiomc.files;

import lombok.Getter;

public class WebConfig {

    @Getter private static String url = "http://apocalypsje.ga/config.php?serverId={0}&clientId={1}";
    @Getter private String configVersion;
    @Getter private String serverId;
    @Getter private String clientId;
    @Getter private String host;
    @Getter private String websiteUrl;
    @Getter private Boolean stopOnTeleport;
    @Getter private String startSound;

}
