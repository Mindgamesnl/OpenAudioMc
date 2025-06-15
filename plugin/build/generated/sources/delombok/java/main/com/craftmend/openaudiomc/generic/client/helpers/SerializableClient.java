package com.craftmend.openaudiomc.generic.client.helpers;

import com.craftmend.openaudiomc.generic.client.session.ClientAuth;
import com.craftmend.openaudiomc.generic.client.session.RtcSessionManager;

public class SerializableClient {
    private int volume;
    private boolean isConnected;
    private RtcSessionManager rtcSessionManager;
    private String streamKey;
    private boolean isConnectedToRtc;
    private boolean hasHueLinked;
    private boolean sessionUpdated;
    private ClientAuth auth;

    private static int $default$volume() {
        return -1;
    }

    private static boolean $default$isConnected() {
        return false;
    }

    private static boolean $default$isConnectedToRtc() {
        return false;
    }

    private static boolean $default$hasHueLinked() {
        return false;
    }

    private static boolean $default$sessionUpdated() {
        return false;
    }

    SerializableClient(final int volume, final boolean isConnected, final RtcSessionManager rtcSessionManager, final String streamKey, final boolean isConnectedToRtc, final boolean hasHueLinked, final boolean sessionUpdated, final ClientAuth auth) {
        this.volume = volume;
        this.isConnected = isConnected;
        this.rtcSessionManager = rtcSessionManager;
        this.streamKey = streamKey;
        this.isConnectedToRtc = isConnectedToRtc;
        this.hasHueLinked = hasHueLinked;
        this.sessionUpdated = sessionUpdated;
        this.auth = auth;
    }


    public static class SerializableClientBuilder {
        private boolean volume$set;
        private int volume$value;
        private boolean isConnected$set;
        private boolean isConnected$value;
        private RtcSessionManager rtcSessionManager;
        private String streamKey;
        private boolean isConnectedToRtc$set;
        private boolean isConnectedToRtc$value;
        private boolean hasHueLinked$set;
        private boolean hasHueLinked$value;
        private boolean sessionUpdated$set;
        private boolean sessionUpdated$value;
        private ClientAuth auth;

        SerializableClientBuilder() {
        }

        /**
         * @return {@code this}.
         */
        public SerializableClient.SerializableClientBuilder volume(final int volume) {
            this.volume$value = volume;
            volume$set = true;
            return this;
        }

        /**
         * @return {@code this}.
         */
        public SerializableClient.SerializableClientBuilder isConnected(final boolean isConnected) {
            this.isConnected$value = isConnected;
            isConnected$set = true;
            return this;
        }

        /**
         * @return {@code this}.
         */
        public SerializableClient.SerializableClientBuilder rtcSessionManager(final RtcSessionManager rtcSessionManager) {
            this.rtcSessionManager = rtcSessionManager;
            return this;
        }

        /**
         * @return {@code this}.
         */
        public SerializableClient.SerializableClientBuilder streamKey(final String streamKey) {
            this.streamKey = streamKey;
            return this;
        }

        /**
         * @return {@code this}.
         */
        public SerializableClient.SerializableClientBuilder isConnectedToRtc(final boolean isConnectedToRtc) {
            this.isConnectedToRtc$value = isConnectedToRtc;
            isConnectedToRtc$set = true;
            return this;
        }

        /**
         * @return {@code this}.
         */
        public SerializableClient.SerializableClientBuilder hasHueLinked(final boolean hasHueLinked) {
            this.hasHueLinked$value = hasHueLinked;
            hasHueLinked$set = true;
            return this;
        }

        /**
         * @return {@code this}.
         */
        public SerializableClient.SerializableClientBuilder sessionUpdated(final boolean sessionUpdated) {
            this.sessionUpdated$value = sessionUpdated;
            sessionUpdated$set = true;
            return this;
        }

        /**
         * @return {@code this}.
         */
        public SerializableClient.SerializableClientBuilder auth(final ClientAuth auth) {
            this.auth = auth;
            return this;
        }

        public SerializableClient build() {
            int volume$value = this.volume$value;
            if (!this.volume$set) volume$value = SerializableClient.$default$volume();
            boolean isConnected$value = this.isConnected$value;
            if (!this.isConnected$set) isConnected$value = SerializableClient.$default$isConnected();
            boolean isConnectedToRtc$value = this.isConnectedToRtc$value;
            if (!this.isConnectedToRtc$set) isConnectedToRtc$value = SerializableClient.$default$isConnectedToRtc();
            boolean hasHueLinked$value = this.hasHueLinked$value;
            if (!this.hasHueLinked$set) hasHueLinked$value = SerializableClient.$default$hasHueLinked();
            boolean sessionUpdated$value = this.sessionUpdated$value;
            if (!this.sessionUpdated$set) sessionUpdated$value = SerializableClient.$default$sessionUpdated();
            return new SerializableClient(volume$value, isConnected$value, this.rtcSessionManager, this.streamKey, isConnectedToRtc$value, hasHueLinked$value, sessionUpdated$value, this.auth);
        }

        @Override
        public String toString() {
            return "SerializableClient.SerializableClientBuilder(volume$value=" + this.volume$value + ", isConnected$value=" + this.isConnected$value + ", rtcSessionManager=" + this.rtcSessionManager + ", streamKey=" + this.streamKey + ", isConnectedToRtc$value=" + this.isConnectedToRtc$value + ", hasHueLinked$value=" + this.hasHueLinked$value + ", sessionUpdated$value=" + this.sessionUpdated$value + ", auth=" + this.auth + ")";
        }
    }

    public static SerializableClient.SerializableClientBuilder builder() {
        return new SerializableClient.SerializableClientBuilder();
    }

    public int getVolume() {
        return this.volume;
    }

    public boolean isConnected() {
        return this.isConnected;
    }

    public RtcSessionManager getRtcSessionManager() {
        return this.rtcSessionManager;
    }

    public String getStreamKey() {
        return this.streamKey;
    }

    public boolean isConnectedToRtc() {
        return this.isConnectedToRtc;
    }

    public boolean isHasHueLinked() {
        return this.hasHueLinked;
    }

    public boolean isSessionUpdated() {
        return this.sessionUpdated;
    }

    public ClientAuth getAuth() {
        return this.auth;
    }

    public void setVolume(final int volume) {
        this.volume = volume;
    }

    public void setConnected(final boolean isConnected) {
        this.isConnected = isConnected;
    }

    public void setRtcSessionManager(final RtcSessionManager rtcSessionManager) {
        this.rtcSessionManager = rtcSessionManager;
    }

    public void setStreamKey(final String streamKey) {
        this.streamKey = streamKey;
    }

    public void setConnectedToRtc(final boolean isConnectedToRtc) {
        this.isConnectedToRtc = isConnectedToRtc;
    }

    public void setHasHueLinked(final boolean hasHueLinked) {
        this.hasHueLinked = hasHueLinked;
    }

    public void setSessionUpdated(final boolean sessionUpdated) {
        this.sessionUpdated = sessionUpdated;
    }

    public void setAuth(final ClientAuth auth) {
        this.auth = auth;
    }
}
