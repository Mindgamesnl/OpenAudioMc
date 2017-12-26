package net.openaudiomc.jclient.utils;

import com.mpatric.mp3agic.InvalidDataException;
import com.mpatric.mp3agic.Mp3File;
import com.mpatric.mp3agic.UnsupportedTagException;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

public class Mp3Reader {

    private String url;

    public Mp3Reader(String url) {
        this.url = url;
    }

    public CompletableFuture<Integer> run() throws OpenaudioFailedMp3ParseException {
        CompletableFuture<Integer> cf = new CompletableFuture<>();

        try {
            String result = downloadFromUrl(new URL(this.url), "CACHE_" + UUID.randomUUID().toString() + ".mp3");
            File file = new File(result);
            Mp3File mp3file = new Mp3File(result);
            cf.complete((int) mp3file.getLengthInSeconds());
            Boolean fileExists = file.exists();
            file.delete();
        } catch (IOException e) {
            throw new OpenaudioFailedMp3ParseException("Could not read mp3 file, are the folder permissions setup correctly? ("+e.getMessage()+")");
        } catch (InvalidDataException e) {
            throw new OpenaudioFailedMp3ParseException("Invalid date while loading mp3 file");
        } catch (UnsupportedTagException e) {
            throw new OpenaudioFailedMp3ParseException("Invalid mp3 tag while loading mp3 file");
        }

        return cf;
    }

    public String downloadFromUrl(URL url, String localFilename) throws IOException {
        InputStream is = null;
        FileOutputStream fos = null;
        String tempDir = System.getProperty("java.io.tmpdir");
        String outputPath = "plugins/OpenAudioMp3Meta";
        try {
            //connect
            URLConnection urlConn = url.openConnection();

            //get inputstream from connection
            is = urlConn.getInputStream();
            fos = new FileOutputStream(outputPath);

            // 4KB buffer
            byte[] buffer = new byte[4096];
            int length;

            // read from source and write into local file
            while ((length = is.read(buffer)) > 0) {
                fos.write(buffer, 0, length);
            }
            return outputPath;
        } finally {
            try {
                if (is != null) {
                    is.close();
                }
            } finally {
                if (fos != null) {
                    fos.close();
                }
            }
        }
    }

}
