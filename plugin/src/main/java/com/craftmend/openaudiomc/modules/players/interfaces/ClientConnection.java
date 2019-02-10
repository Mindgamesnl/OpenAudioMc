package com.craftmend.openaudiomc.modules.players.interfaces;

import com.craftmend.openaudiomc.modules.media.objects.Media;
import com.craftmend.openaudiomc.modules.players.objects.Session;
import com.craftmend.openaudiomc.modules.regions.objects.IRegion;
import com.craftmend.openaudiomc.modules.speakers.objects.ApplicableSpeaker;

import java.util.List;

public interface ClientConnection {

    Boolean isConnected();
    Session getSession();
    List<Media> getOngoingMedia();
    List<IRegion> getRegions();
    List<ApplicableSpeaker> getSpeakers();
    void playMedia(Media media);
    void setVolume(int volume);

}
