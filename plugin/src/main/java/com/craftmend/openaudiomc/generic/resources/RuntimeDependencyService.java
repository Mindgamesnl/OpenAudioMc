package com.craftmend.openaudiomc.generic.resources;

import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.resources.objects.JarSource;
import com.craftmend.openaudiomc.generic.resources.objects.LoadedDependency;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;

import java.io.File;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

public class RuntimeDependencyService extends Service {

    private List<LoadedDependency> loadedDependencies = new ArrayList<>();

    @Inject
    public RuntimeDependencyService() {

    }

    public void load(JarSource source) throws MalformedURLException {
        // check if its already loaded
        for (LoadedDependency loadedDependency : loadedDependencies) {
            if (loadedDependency.getSource().getFileName().equals(source.getFileName())) {
                OpenAudioLogger.warn("Skipping resource " + source.getFileName() + " because it's already loaded");
                return;
            }
        }
        // load and register
        OpenAudioLogger.info("Loading resource " + source.getFileName());

        // download, mock this for now and just do it locally
        File magicallyHere = new File(MagicValue.STORAGE_DIRECTORY.get(File.class), "libs" + File.separator + source.getFileName());

        // load and register
        loadedDependencies.add(new LoadedDependency(source, new ExternalResourceLoader(getClass().getClassLoader(), magicallyHere)));
    }

}
