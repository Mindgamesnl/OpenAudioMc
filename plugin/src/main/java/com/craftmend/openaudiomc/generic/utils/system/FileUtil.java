package com.craftmend.openaudiomc.generic.utils.system;

import lombok.SneakyThrows;

import java.io.*;

public class FileUtil {

    /**
     * Export a resource embedded into a Jar file to the local file path.
     *
     * @param resourceName ie.: "/SmartLibrary.dll"
     * @return The path to the exported resource
     *
     * stolen from here lol; https://stackoverflow.com/questions/10308221/how-to-copy-file-inside-jar-to-outside-the-jar
     * @throws Exception
     */
    public static String exportResource(String resourceName, Class c, File outputFolder) throws Exception {
        InputStream stream = null;
        OutputStream resStreamOut = null;
        String jarFolder = outputFolder.getPath();
        try {
            stream = c.getResourceAsStream(resourceName);//note that each / is a directory down in the "jar tree" been the jar the root of the tree
            if(stream == null) {
                throw new Exception("Cannot get resource \"" + resourceName + "\" from Jar file.");
            }

            int readBytes;
            byte[] buffer = new byte[4096];
            resStreamOut = new FileOutputStream(jarFolder + resourceName);
            while ((readBytes = stream.read(buffer)) > 0) {
                resStreamOut.write(buffer, 0, readBytes);
            }
        } catch (Exception ex) {
            throw ex;
        } finally {
            stream.close();
            if (resStreamOut != null) {
                resStreamOut.close();
            }
        }
        return jarFolder + resourceName;
    }

    public static String readResource(String resourceName, Class c) {
        InputStream stream = null;
        try {
            stream = c.getResourceAsStream(resourceName);//note that each / is a directory down in the "jar tree" been the jar the root of the tree
            if(stream == null) {
                throw new Exception("Cannot get resource \"" + resourceName + "\" from Jar file.");
            }

            StringBuilder builder = new StringBuilder();
            int readBytes;
            byte[] buffer = new byte[4096];
            while ((readBytes = stream.read(buffer)) > 0) {
                builder.append(new String(buffer, 0, readBytes));
            }
            return builder.toString();
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        } finally {
            try {
                stream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @SneakyThrows
    public static String jarFolder() {
        return new File(FileUtil.class.getProtectionDomain().getCodeSource().getLocation().toURI().getPath()).getParentFile().getPath().replace('\\', '/');
    }

}
