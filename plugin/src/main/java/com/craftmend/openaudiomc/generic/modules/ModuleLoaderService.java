package com.craftmend.openaudiomc.generic.modules;

import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.api.interfaces.ExternalModule;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.service.Service;

import lombok.Getter;
import lombok.SneakyThrows;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

public class ModuleLoaderService extends Service {

    @Getter private List<ExternalModule> modules = new ArrayList<>();
    @Getter private List<File> loadedModuleFiles = new ArrayList<>();

    @SneakyThrows
    public ModuleLoaderService() {
        File modulesDir = new File(MagicValue.STORAGE_DIRECTORY.get(File.class), "/modules");
        modulesDir.mkdirs();

        if (modulesDir.isDirectory()) {
            log("Loading modules from " + modulesDir.getAbsolutePath());
            for (File file : modulesDir.listFiles()) {
                // skip files that are intended for migrations
                if (file.getName().contains("migrate.")) continue;
                loadModFromFile(file);
                loadedModuleFiles.add(file);
            }
        }

        fire(ModuleEvent.MODULES_LOADED);
    }

    public void loadModFromFile(File file) {
        log("Loading module " + file.getName());
        try {
            JarFile jarFile = new JarFile(file);
            Enumeration<JarEntry> entries = jarFile.entries();
            String mainClass = null;
            while (entries.hasMoreElements()) {
                JarEntry element = entries.nextElement();
                if (element.getName().equalsIgnoreCase("type.info")) {
                    BufferedReader reader = new BufferedReader(new InputStreamReader(jarFile.getInputStream(element)));
                    mainClass = reader.readLine().substring(6);
                    reader.close();
                    break;
                }
            }
            jarFile.close();
            if (mainClass != null) {
                ClassLoader loader = URLClassLoader.newInstance(new URL[] { file.toURI().toURL() }, getClass().getClassLoader());
                Class<?> clazz = Class.forName(mainClass, true, loader);
                for (Class<?> subclazz : clazz.getClasses()) {
                    // load extended classes.
                    Class.forName(subclazz.getName(), true, loader);
                }

                Class<? extends ExternalModule> typeClass = clazz.asSubclass(ExternalModule.class);
                ExternalModule mod = typeClass.newInstance();

                log("Loading module " + file.getName() + " as " + mod.getName());
                mod.onInitialize();
                mod.setLoader(loader);
                modules.add(mod);
            } else {
                log("FATAL! Failed to load module " + file.getAbsolutePath() + " because it doesn't have a valid main class");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            log("FATAL! Failed to load module " + file.getAbsolutePath() + " because it doesn't have a valid main class");
        }
    }

    public void fire(ModuleEvent e) {
        for (ExternalModule module : modules) {
            try {
                module.on(e);
            } catch (Exception exc) {
                exc.printStackTrace();
                log("Couldn't pass " + e + " to " + module.getName());
            }
        }
    }

}
