package com.craftmend.openaudiomc.services.networking.io;

import lombok.Getter;

import javax.net.ssl.*;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

@Getter
class SSLHelper {

    private HostnameVerifier hostnameVerifier;
    private TrustManager[] trustAllCerts;
    private X509TrustManager trustManager;
    private SSLSocketFactory sslSocketFactory;

    SSLHelper() throws NoSuchAlgorithmException, KeyManagementException {
        hostnameVerifier = (hostname, session) -> true;

        trustAllCerts = new TrustManager[]{new X509TrustManager() {
            @Override
            public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType) {

            }

            @Override
            public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType) {

            }

            @Override
            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                return new java.security.cert.X509Certificate[0];
            }
        }};

        trustManager = (X509TrustManager) trustAllCerts[0];

        SSLContext sslContext = SSLContext.getInstance("SSL");
        sslContext.init(null, trustAllCerts, null);
        sslSocketFactory = sslContext.getSocketFactory();
    }

}
