package com.craftmend.openaudiomc.generic.resources;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ExternalResourceLoader extends URLClassLoader {

    static {
        ClassLoader.registerAsParallelCapable();
    }

    public ExternalResourceLoader(ClassLoader loaderClassLoader, File jarResourcePath) throws MalformedURLException {
        super(new URL[]{jarResourcePath.toURI().toURL()}, loaderClassLoader);
        for (URL url : getURLs()) {
            String u = url.toString();
            String[] parts = u.split(File.separator);
            String fn = parts[parts.length - 1];
            OpenAudioLogger.info("Loading runtime resource " + fn);
            addJarToClasspath(url);
        }
    }

    public void addJarToClasspath(URL url) {
        addURL(url);
    }

    public void deleteJarResource() {
        URL[] urls = getURLs();
        if (urls.length == 0) {
            return;
        }

        try {
            Path path = Paths.get(urls[0].toURI());
            Files.deleteIfExists(path);
        } catch (Exception e) {
            // ignore
        }
    }

}
