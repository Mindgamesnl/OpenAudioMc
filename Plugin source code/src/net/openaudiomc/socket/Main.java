package net.openaudiomc.socket;

import java.io.File;
import java.net.URISyntaxException;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.bukkit.Bukkit;
import org.bukkit.configuration.file.FileConfiguration;
import org.bukkit.configuration.file.YamlConfiguration;
import org.json.JSONObject;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

import net.openaudiomc.socket.Authenticator;

public class Main {
	
	public static Object socket;
	
	public static void connect() {
		
		try {
			
			FileConfiguration cfg = YamlConfiguration.loadConfiguration(new File("plugins/OpenAudio/advanced", "advancedConfig.yml"));
			String apiresponse = Authenticator.getNodeServer(cfg.getString("host"));
			
			JSONObject jsonObject = new JSONObject(apiresponse);
			
		    SSLContext sc = SSLContext.getInstance("TLS");
            sc.init(null, trustAllCerts, new SecureRandom());
            IO.setDefaultSSLContext(sc);
            HttpsURLConnection.setDefaultHostnameVerifier(new RelaxedHostNameVerifier());
            
            IO.Options options = new IO.Options();
            options.sslContext = sc;
            options.secure = true;
            options.port = 3000;
			
			socket = IO.socket(jsonObject.getString("secureSocket"), options);
		((Emitter) socket).on(Socket.EVENT_CONNECT, new Emitter.Listener() {
		  @Override
		  public void call(Object... args) {
			  JSONObject obj = new JSONObject();
			  obj.put("type", "server");
			  obj.put("id", Authenticator.getID());
		    ((Socket) socket).emit("message", obj.toString());
		    SocketConnect();
		  }
		}).on("userconnect", new Emitter.Listener() {
		  @Override
		  public void call(Object... args) {
			  ConnectEvent(args[0]);
		  }
		}).on("userdisconnect", new Emitter.Listener() {
			  @Override
			  public void call(Object... args) {
				  DisconnectEvent(args[0]);
			  }
			}).on("command", new Emitter.Listener() {
			  @Override
			  public void call(Object... args) {
				  SocketCommandEvent(args[0]);
			  }
		 }).on(Socket.EVENT_DISCONNECT, new Emitter.Listener() {			
		  @Override
		  public void call(Object... args) {
			  SocketDisconnect();
		  }
		});
		((Socket) socket).connect();
		} catch (URISyntaxException e) {
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void SocketConnect() {
		Bukkit.getServer().getPluginManager().callEvent(new net.openaudiomc.internal.events.SocketConnectEvent());	
	}
	
	public static void SocketDisconnect() {
		Bukkit.getServer().getPluginManager().callEvent(new net.openaudiomc.internal.events.SocketDisconnectEvent());	
	}
	
	public static void ConnectEvent(Object args) {
		String request = (String) args;
		JSONObject jsonObject = new JSONObject(request);
		Bukkit.getServer().getPluginManager().callEvent(new net.openaudiomc.internal.events.SocketUserConnectEvent(jsonObject.getString("name"), jsonObject.getString("key")));
	}
	
	public static void DisconnectEvent(Object args) {
		Bukkit.getServer().getPluginManager().callEvent(new net.openaudiomc.internal.events.SocketUserDisconnectEvent(args));
	}
	
	public static void SocketCommandEvent(Object args) {
		Bukkit.getServer().getPluginManager().callEvent(new net.openaudiomc.internal.events.SocketCommandEvent(args));	
	}
	
	private static TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() {
        public java.security.cert.X509Certificate[] getAcceptedIssuers() {
            return new java.security.cert.X509Certificate[] {};
        }

        public void checkClientTrusted(X509Certificate[] chain,
                                       String authType) throws CertificateException {
        }

        public void checkServerTrusted(X509Certificate[] chain,
                                       String authType) throws CertificateException {
        }
    } };

    public static class RelaxedHostNameVerifier implements HostnameVerifier {
        public boolean verify(String hostname, SSLSession session) {
            return true;
        }
    }
}
