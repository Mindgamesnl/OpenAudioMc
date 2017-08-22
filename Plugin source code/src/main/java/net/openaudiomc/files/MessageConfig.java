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

//{
// "messagesVersion":"v1.0",
// "serverId":"eisC87bEZgDXK1F",
// "prefix":"&9[&bOpenAudioMC&9] ",
// "connectMessage":"&3Click &ehere &3to connect to our audio server!",
// "connectWarning":"Warning! &3You opened another browser tab in front of the client, please leave the client in front for the best listening experiance.",
// "disconnectedMessage":"&3You are now &4Disconnected &4from our audio server!",
// "connectedMessage":"&3You are now &aConnected &3to our audio server!",
// "hueConnectedMessage":"&3You are now &aConnected &3with your philips &dh&bu&ae&3!",
// "volumeSet":"&3Yout volume has been set to &a{0}&3%",
// "volumeError":"&4Invalid arguments. &eUse \/volume 0-100",
// "needConnected":"&3You need to be connected to do this command",
// "socketioLoading":"&3Our audio client is starting up. Please try again in a few seconds."
// }