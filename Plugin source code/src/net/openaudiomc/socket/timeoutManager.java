package net.openaudiomc.socket;

import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

import net.openaudiomc.internal.events.SocketConnectEvent;
import net.openaudiomc.internal.events.SocketDisconnectEvent;

public class timeoutManager implements Listener {
	
	public static Boolean ioconnected = false;
	public static Boolean ioready = false;
	
	@EventHandler
    public void onSocketConnected(SocketConnectEvent event) {
		ioconnected = true;
		ioready = true;
    }
    
    @EventHandler
    public void onSocketDisconnected(SocketDisconnectEvent event) {
    	ioconnected = false;
    }
}
