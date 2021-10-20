package com.craftmend.utils;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

public class ClassScanner {

    /**
     * Scans all classes accessible from the context class loader which belong to the given package and subpackages.
     *
     * @param packageName The base package
     * @return The classes
     * @throws ClassNotFoundException
     * @throws IOException
     */
    public static Class[] getClasses(String packageName, String[] mustContain)
            throws ClassNotFoundException, IOException {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        assert classLoader != null;
        String path = packageName.replace('.', File.separatorChar);
        Enumeration<URL> resources = classLoader.getResources(path);
        List<File> dirs = new ArrayList<File>();
        while (resources.hasMoreElements()) {
            URL resource = resources.nextElement();
            dirs.add(new File(resource.getFile()));
        }
        ArrayList<Class> classes = new ArrayList<Class>();
        for (File directory : dirs) {
            classes.addAll(findClasses(directory, packageName, mustContain));
        }
        return classes.toArray(new Class[classes.size()]);
    }

    /**
     * Recursive method used to find all classes in a given directory and subdirs.
     *
     * @param directory   The base directory
     * @param packageName The package name for classes found inside the base directory
     * @return The classes
     * @throws ClassNotFoundException
     */
    public static List<Class> findClasses(File directory, String packageName, String[] mustContain) throws ClassNotFoundException {
        List<Class> classes = new ArrayList<Class>();
        if (!directory.exists()) {
            return classes;
        }
        File[] files = directory.listFiles();
        for (File file : files) {
            if (file.isDirectory()) {
                classes.addAll(findClasses(file, packageName + "." + file.getName(), mustContain));
            } else if (file.getName().endsWith(".class")) {
                try {
                    String name = packageName + '.' + file.getName().substring(0, file.getName().length() - 6);
                    if (mustContain != null) {
                        boolean match = false;
                        for (String s : mustContain) {
                            if (name.contains(s)) match = true;
                        }
                        if (!match) return classes;
                    }
                    classes.add(Class.forName(name));
                } catch (NullPointerException | ClassNotFoundException | NoClassDefFoundError | ExceptionInInitializerError npe) {
                    // System.out.println("Skipping " + packageName + "." + file.getName() + "Because it couldn't init");
                }
            }
        }
        return classes;
    }

}
