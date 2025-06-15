package com.craftmend.openaudiomc.generic.networking.addapter;

public class RelayHost {
    private String url;
    private boolean secure;

    public String getUrl() {
        return this.url;
    }

    public boolean isSecure() {
        return this.secure;
    }

    public RelayHost() {
    }

    public RelayHost(final String url, final boolean secure) {
        this.url = url;
        this.secure = secure;
    }
}
