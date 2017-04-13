package net.openaudiomc.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import org.bukkit.Bukkit;
import org.bukkit.scheduler.BukkitRunnable;
import org.bukkit.scheduler.BukkitScheduler;

import net.openaudiomc.minecraft.Main;
import net.openaudiomc.utils.callback.Callback;

public class webUtils {
	
	public static String textFromUrl(String request) throws IOException {
		URL url;

		url = new URL(request);
		
	    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
	    String str;
	    while ((str = in.readLine()) != null) {
	      return str; 
	    }
	    in.close();
		return str;
	}
	
	public static void asyncHttpRequest(final String request, final Callback<String> callback)
	{
	    new BukkitRunnable()
	    {
	        @Override
	        public void run()
	        {
	            try {
					URL url;
					url = new URL(request);
				    BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
				    String str;
					while ((str = in.readLine()) != null) {
						 final String string = str; 
				    }
				    in.close();
				    final String string = str;
				    
				    new BukkitRunnable()
		            {
		                @Override
		                public void run()
		                {
		                    callback.execute(string);
		                }
		            }.runTask(Main.getPL());
				    
				} catch (IOException e) {
				}
	        }
	    }.runTaskAsynchronously(Main.getPL());
	} 

}
