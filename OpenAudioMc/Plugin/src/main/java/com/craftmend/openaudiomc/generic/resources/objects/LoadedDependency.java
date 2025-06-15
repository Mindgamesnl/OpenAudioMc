package com.craftmend.openaudiomc.generic.resources.objects;

import com.craftmend.openaudiomc.generic.resources.ExternalResourceLoader;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoadedDependency {

    private JarSource source;
    private ExternalResourceLoader classLoader;

}
