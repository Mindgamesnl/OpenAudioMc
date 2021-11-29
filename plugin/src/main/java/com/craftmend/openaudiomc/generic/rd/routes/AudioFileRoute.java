package com.craftmend.openaudiomc.generic.rd.routes;

import com.craftmend.openaudiomc.generic.rd.RestDirectService;
import com.craftmend.openaudiomc.generic.rd.http.ExposedResponse;
import com.craftmend.openaudiomc.generic.rd.http.HttpResponse;
import com.craftmend.openaudiomc.generic.rd.http.Route;
import fi.iki.elonen.NanoHTTPD;
import lombok.AllArgsConstructor;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Map;

@AllArgsConstructor
public class AudioFileRoute extends Route {


    private RestDirectService restDirectService;

    @Override
    public HttpResponse onRequest(NanoHTTPD.IHTTPSession session) {

        if (session.getParms() == null) {
            return HttpResponse.text("Bad request");
        }

        String fileName = session.getParms().get("filename");
        String password = session.getParms().get("password");
        if (fileName == null || password == null || !password.equals(restDirectService.getPassword())) {
            return HttpResponse.text("Bad request", NanoHTTPD.Response.Status.BAD_REQUEST);
        }

        if (fileName.contains("..")) {
            return HttpResponse.text("You can't use .. in your file path");
        }

        File audioFile = new File(restDirectService.getAudioDirectory(), fileName);

        if (!audioFile.exists()) {
            return HttpResponse.text(fileName + " is not a valid audio file", NanoHTTPD.Response.Status.BAD_REQUEST);
        }

        FileInputStream fis = null;
        try {
            fis = new FileInputStream(audioFile);
        } catch (FileNotFoundException e) {
            return HttpResponse.text(fileName + " is not a valid audio file", NanoHTTPD.Response.Status.BAD_REQUEST);
        }

        String mimeType = "";
        try {
            mimeType = Files.probeContentType(audioFile.toPath());
        } catch (IOException e) {
            return HttpResponse.text("Unknown file type", NanoHTTPD.Response.Status.BAD_REQUEST);
        }

        try {
            NanoHTTPD.Response res = serveFile(session.getHeaders(), audioFile, mimeType);
            res.addHeader("Content-Disposition", "inline; filename=\"" + audioFile.getName() + "\"");
            return HttpResponse.raw(res);
        } catch (Exception e) {
            return HttpResponse.text("Fatal error " + e.getMessage(), NanoHTTPD.Response.Status.BAD_REQUEST);
        }
    }

    private NanoHTTPD.Response serveFile(Map<String, String> header, File file, String mime) {
        NanoHTTPD.Response res;
        try {
            // Calculate etag
            String etag = Integer.toHexString((file.getAbsolutePath()
                    + file.lastModified() + "" + file.length()).hashCode());

            // Support (simple) skipping:
            long startFrom = 0;
            long endAt = -1;
            String range = header.get("range");
            if (range != null) {
                if (range.startsWith("bytes=")) {
                    range = range.substring("bytes=".length());
                    int minus = range.indexOf('-');
                    try {
                        if (minus > 0) {
                            startFrom = Long.parseLong(range
                                    .substring(0, minus));
                            endAt = Long.parseLong(range.substring(minus + 1));
                        }
                    } catch (NumberFormatException ignored) {
                    }
                }
            }

            // Change return code and add Content-Range header when skipping is
            // requested
            long fileLen = file.length();
            if (range != null && startFrom >= 0) {
                if (startFrom >= fileLen) {
                    res = createResponse(NanoHTTPD.Response.Status.RANGE_NOT_SATISFIABLE, NanoHTTPD.MIME_PLAINTEXT, null, fileLen);
                    res.addHeader("Content-Range", "bytes 0-0/" + fileLen);
                    res.addHeader("ETag", etag);
                } else {
                    if (endAt < 0) {
                        endAt = fileLen - 1;
                    }
                    long newLen = endAt - startFrom + 1;
                    if (newLen < 0) {
                        newLen = 0;
                    }

                    final long dataLen = newLen;
                    FileInputStream fis = new FileInputStream(file) {
                        @Override
                        public int available() throws IOException {
                            return (int) dataLen;
                        }
                    };
                    fis.skip(startFrom);

                    res = createResponse(NanoHTTPD.Response.Status.PARTIAL_CONTENT, mime, fis, fileLen);
                    res.addHeader("Content-Length", "" + dataLen);
                    res.addHeader("Content-Range", "bytes " + startFrom + "-"
                            + endAt + "/" + fileLen);
                    res.addHeader("ETag", etag);
                }
            } else {
                if (etag.equals(header.get("if-none-match")))
                    res = createResponse(NanoHTTPD.Response.Status.NOT_MODIFIED, mime, null, fileLen);
                else {
                    res = createResponse(NanoHTTPD.Response.Status.OK, mime,
                            new FileInputStream(file), fileLen);
                    res.addHeader("Content-Length", "" + fileLen);
                    res.addHeader("ETag", etag);
                }
            }
        } catch (IOException ioe) {
            res = createResponse(NanoHTTPD.Response.Status.FORBIDDEN,
                    NanoHTTPD.MIME_PLAINTEXT, null, 0);
        }

        return res;
    }

    private NanoHTTPD.Response createResponse(NanoHTTPD.Response.Status state, String mimePlaintext, FileInputStream fis, long fileLen) {
        return new ExposedResponse(state, mimePlaintext, fis, fileLen);
    }

}
