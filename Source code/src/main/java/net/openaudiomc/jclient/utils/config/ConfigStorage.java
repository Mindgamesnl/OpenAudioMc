package net.openaudiomc.jclient.utils.config;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import net.openaudiomc.jclient.OpenAudioMc;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;

@Getter @Setter @ToString
public class ConfigStorage {

    private String header;

    protected List<ConfigStorageSpeakerMedia> speakerMedias;
    protected List<ConfigStorageSpeakerLocation> speakerLocations;
    protected List<ConfigStorageRegion> regions;
    protected List<ConfigStorageMedia> medias;

    public List<String> serialize() {
        List<String> list = new CopyOnWriteArrayList<>();
        list.add(header);
        list.add("storage:");
        list.add("  speakermedia:");
        for(ConfigStorageSpeakerMedia speakerMedia : speakerMedias) {
            list.addAll(speakerMedia.serialize());
        }
        list.add("  speakerlocations:");
        for(ConfigStorageSpeakerLocation speakerLocation : speakerLocations) {
            list.addAll(speakerLocation.serialize());
        }
        list.add("  regions:");
        for(ConfigStorageRegion region : regions) {
            list.addAll(region.serialize());
        }
        list.add("  media:");
        for(ConfigStorageMedia media : medias) {
            list.addAll(media.serialize());
        }
        return list;
    }

    public void addSpeakerMedia(ConfigStorageSpeakerMedia speakerMedia) {
        for(ConfigStorageSpeakerMedia storageSpeakerMedia : speakerMedias) {
            if(storageSpeakerMedia.getName().equalsIgnoreCase(speakerMedia.getName())) {
                return;
            }
        }

        speakerMedias.add(speakerMedia);
        OpenAudioMc.getInstance().getConf().save();
    }

    public void addSpeakerLocation(ConfigStorageSpeakerLocation speakerLocation) {
        for(ConfigStorageSpeakerLocation storageSpeakerLocation : speakerLocations) {
            if(storageSpeakerLocation.getId() == speakerLocation.getId()) {
                return;
            }
        }

        speakerLocations.add(speakerLocation);
        OpenAudioMc.getInstance().getConf().save();
    }

    public void addRegion(ConfigStorageRegion region) {
        for(ConfigStorageRegion storageRegion : regions) {
            if(storageRegion.getName().equalsIgnoreCase(region.getName())) {
                return;
            }
        }

        regions.add(region);
        OpenAudioMc.getInstance().getConf().save();
    }

    public void addMedia(ConfigStorageMedia media) {
        for(ConfigStorageMedia storageMedia : medias) {
            if(storageMedia.getName().equalsIgnoreCase(media.getName())) {
                return;
            }
        }

        medias.add(media);
        OpenAudioMc.getInstance().getConf().save();
    }

    public void deleteSpeakerMedia(ConfigStorageSpeakerMedia speakerMedia) {
        if(speakerMedias.contains(speakerMedia)) {
            speakerMedias.remove(speakerMedia);
            OpenAudioMc.getInstance().getConf().save();
        } else {
            OpenAudioMc.getInstance().getLogger().warning("Tried to remove an unknown speaker media");
        }
    }

    public void deleteSpeakerLocation(ConfigStorageSpeakerLocation speakerLocation) {
        if(speakerLocations.contains(speakerLocation)) {
            speakerLocations.remove(speakerLocation);
            OpenAudioMc.getInstance().getConf().save();
        } else {
            OpenAudioMc.getInstance().getLogger().warning("Tried to remove an unknown speaker location");
        }
    }

    public void deleteRegion(ConfigStorageRegion region) {
        if(regions.contains(region)) {
            regions.remove(region);
            OpenAudioMc.getInstance().getConf().save();
        } else {
            OpenAudioMc.getInstance().getLogger().warning("Tried to remove an unknown region");
        }
    }

    public void deleteMedia(ConfigStorageMedia media) {
        if(medias.contains(media)) {
            medias.remove(media);
            OpenAudioMc.getInstance().getConf().save();
        } else {
            OpenAudioMc.getInstance().getLogger().warning("Tried to remove an unknown media");
        }
    }

    public ConfigStorageSpeakerMedia getSpeakerMedia(String name) {
        for(ConfigStorageSpeakerMedia media : speakerMedias) {
            if(media.getName().equals(name)) {
                return media;
            }
        }
        return null;
    }

    public ConfigStorageSpeakerLocation getSpeakerLocation(UUID id) {
        for(ConfigStorageSpeakerLocation speakerLocation : speakerLocations) {
            if(speakerLocation.getId().equals(id)) {
                return speakerLocation;
            }
        }
        return null;
    }

    public ConfigStorageRegion getRegion(String name) {
        for(ConfigStorageRegion region : regions) {
            if(region.getName().equals(name)) {
                return region;
            }
        }
        return null;
    }

    public ConfigStorageMedia getMedia(String name) {
        for(ConfigStorageMedia media : medias) {
            if(media.getName().equals(name)) {
                return media;
            }
        }
        return null;
    }
}