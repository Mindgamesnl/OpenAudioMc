package com.craftmend.openaudiomc.generic.networking.client.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.packets.PacketClientPushNotification;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    private String title = "";
    private String message = "";

    public Notification setTitle(String title) {
        this.title  = title;
        return this;
    }

    public Notification setMessage(String message) {
        this.message = message;
        return this;
    }

    public void send(ClientConnection clientConnection) {
        if (title != null && !title.equals("") && message != null && !message.equals("")) {
            OpenAudioMc.getInstance().getNetworkingService().send(clientConnection, new PacketClientPushNotification(title, message));
        }
    }

}
