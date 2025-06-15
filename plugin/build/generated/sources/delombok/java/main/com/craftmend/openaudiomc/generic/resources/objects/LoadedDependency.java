package com.craftmend.openaudiomc.generic.resources.objects;

import com.craftmend.openaudiomc.generic.resources.ExternalResourceLoader;

public class LoadedDependency {
    private JarSource source;
    private ExternalResourceLoader classLoader;

    public JarSource getSource() {
        return this.source;
    }

    public ExternalResourceLoader getClassLoader() {
        return this.classLoader;
    }

    public LoadedDependency(final JarSource source, final ExternalResourceLoader classLoader) {
        this.source = source;
        this.classLoader = classLoader;
    }
}
