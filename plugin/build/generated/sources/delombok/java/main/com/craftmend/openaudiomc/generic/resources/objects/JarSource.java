package com.craftmend.openaudiomc.generic.resources.objects;

public class JarSource {
    private String resourceName;
    private String downloadUrl;
    private String fileName;
    private String purpose;

    public String getResourceName() {
        return this.resourceName;
    }

    public String getDownloadUrl() {
        return this.downloadUrl;
    }

    public String getFileName() {
        return this.fileName;
    }

    public String getPurpose() {
        return this.purpose;
    }

    public JarSource(final String resourceName, final String downloadUrl, final String fileName, final String purpose) {
        this.resourceName = resourceName;
        this.downloadUrl = downloadUrl;
        this.fileName = fileName;
        this.purpose = purpose;
    }
}
