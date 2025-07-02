package com.craftmend.openaudiomc.generic.uploads;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.service.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class UploadIndexService extends Service {

    private Set<String> fileHandles = new HashSet<>();

    public void setContent(String[] files) {
        fileHandles.clear();
        fileHandles.addAll(Arrays.asList(files));
    }

    public Collection<String> getAll() {
        return new HashSet<>(fileHandles);
    }

    public void add(String part) {
        fileHandles.add(part);
        OpenAudioLogger.info("Added file handle '" + part + "' to the index");
    }

    public void remove(String part) {
        fileHandles.remove(part);
        OpenAudioLogger.info("Removed file handle '" + part + "' from the index");
    }
}
