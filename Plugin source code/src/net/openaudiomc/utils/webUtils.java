package net.openaudiomc.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.*;

import org.bukkit.scheduler.BukkitRunnable;

import net.openaudiomc.minecraft.Main;
import net.openaudiomc.utils.callback.Callback;

import static com.google.common.net.HttpHeaders.USER_AGENT;

public class webUtils {

	public static String getText(String url) throws Exception {
		URL website = new URL(url);
		URLConnection connection = website.openConnection();
		BufferedReader in = new BufferedReader(
				new InputStreamReader(
						connection.getInputStream()));

		StringBuilder response = new StringBuilder();
		String inputLine;

		while ((inputLine = in .readLine()) != null)
			response.append(inputLine);

		in .close();

		return response.toString();
	}


	public static String textFromUrl(String request) throws IOException {
		String url = request;

		URL obj = new URL(url);
		CookieHandler.setDefault(new CookieManager(null, CookiePolicy.ACCEPT_ALL));
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();

		con.setRequestMethod("GET");
		con.setRequestProperty("User-Agent", USER_AGENT);

		int responseCode = con.getResponseCode();

		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in .readLine()) != null) {
			response.append(inputLine);
		} in .close();

		return response.toString();
	}

	public static void asyncHttpRequest(final String request, final Callback < String > callback) {
		new BukkitRunnable() {
			@Override
			public void run() {
				try {
					URL url;
					url = new URL(request);

					BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));

					final String string = in .readLine(); in .close();
					new BukkitRunnable() {
						@Override
						public void run() {
							callback.execute(string);
						}
					}.runTask(Main.getPL());

				} catch (IOException e) {}
			}
		}.runTaskAsynchronously(Main.getPL());
	}

	public static void asyncHttpRequestNoReturn(final String request, final Callbacknoreturn < String > callback) {
		new BukkitRunnable() {
			@Override
			public void run() {
				try {
					URL url;
					url = new URL(request);

					BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));

					final String string = in .readLine(); in .close();
					new BukkitRunnable() {
						@Override
						public void run() {
							callback.execute(string);
						}
					}.runTask(Main.getPL());

				} catch (IOException e) {}
			}
		}.runTaskAsynchronously(Main.getPL());
	}

}