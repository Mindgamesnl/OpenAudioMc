package com.craftmend.openaudiomc.modules.networking.io;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.net.ssl.*;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

@Getter
public class SSLHelper {

    private HostnameVerifier hostnameVerifier;
    private TrustManager[] trustAllCerts;
    private X509TrustManager trustManager;
    private SSLSocketFactory sslSocketFactory;

    public SSLHelper() throws NoSuchAlgorithmException, KeyManagementException {
        hostnameVerifier = new HostnameVerifier() {
            @Override
            public boolean verify(String hostname, SSLSession session) {
                return true;
            }
        };

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
