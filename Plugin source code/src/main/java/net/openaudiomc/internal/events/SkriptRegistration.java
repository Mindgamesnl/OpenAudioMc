package net.openaudiomc.internal.events;

import me.mindgamesnl.openaudiomc.publicApi.*;
import org.bukkit.entity.Player;
import ch.njol.skript.Skript;
import ch.njol.skript.lang.util.SimpleEvent;
import ch.njol.skript.registrations.EventValues;
import ch.njol.skript.util.Getter;

public class SkriptRegistration {

	public static void load() {
		Skript.registerEvent("OpenAudio connect", SimpleEvent.class, WebConnectEvent.class, "WebConnect", "audio open");
		EventValues.registerEventValue(WebConnectEvent.class, Player.class, new Getter<Player, WebConnectEvent>() {
		    @Override
		    public Player get(WebConnectEvent e) {
		        return e.getPlayer();
		    }
		}, 0);
		
		Skript.registerEvent("OpenAudio disconnect", SimpleEvent.class, WebDisconnectEvent.class, "WebDisconnect", "audio close");
		EventValues.registerEventValue(WebDisconnectEvent.class, Player.class, new Getter<Player, WebDisconnectEvent>() {
		    @Override
		    public Player get(WebDisconnectEvent e) {
		        return e.getPlayer();
		    }
		}, 0);
		
		
		Skript.registerEvent("OpenAudio Ws Send", SimpleEvent.class, WebsocketSendEvent.class, "websocket send", "audio send");
		EventValues.registerEventValue(WebsocketSendEvent.class, String.class, new Getter<String, WebsocketSendEvent>() {
		    @Override
		    public String get(WebsocketSendEvent e) {
		        return e.getData();
		    }
		}, 0);
		EventValues.registerEventValue(WebsocketSendEvent.class, Player.class, new Getter<Player, WebsocketSendEvent>() {
		    @Override
		    public Player get(WebsocketSendEvent e) {
		        return e.getPlayer();
		    }
		}, 0);
		
		
		Skript.registerEvent("OpenAudio region enter", SimpleEvent.class, AudioRegionEnterEvent.class, "audio region enter", "audio region enter");
		EventValues.registerEventValue(AudioRegionEnterEvent.class, String.class, new Getter<String, AudioRegionEnterEvent>() {
		    @Override
		    public String get(AudioRegionEnterEvent e) {
		        return e.getSound();
		    }
		}, 0);
		EventValues.registerEventValue(AudioRegionEnterEvent.class, Player.class, new Getter<Player, AudioRegionEnterEvent>() {
		    @Override
		    public Player get(AudioRegionEnterEvent e) {
		        return e.getPlayer();
		    }
		}, 0);


		Skript.registerEvent("OpenAudio region leave", SimpleEvent.class, AudioRegionLeaveEvent.class, "audio region enter", "audio region leave");
		EventValues.registerEventValue(AudioRegionLeaveEvent.class, Player.class, new Getter<Player, AudioRegionLeaveEvent>() {
		    @Override
		    public Player get(AudioRegionLeaveEvent e) {
		        return e.getPlayer();
		    }
		}, 0);
		
		//new events
		//fancy new events
		Skript.registerEvent("OpenAudio sound end", SimpleEvent.class, SoundEndEvent.class, "audio sound end", "audio sound end");
		EventValues.registerEventValue(SoundEndEvent.class, String.class, new Getter<String, SoundEndEvent>() {
		    @Override
		    public String get(SoundEndEvent e) {
		        return e.getId();
		    }
		}, 0);
		EventValues.registerEventValue(SoundEndEvent.class, Player.class, new Getter<Player, SoundEndEvent>() {
		    @Override
		    public Player get(SoundEndEvent e) {
		        return e.getPlayer();
		    }
		}, 0);
		
		Skript.registerEvent("OpenAudio hue connect", SimpleEvent.class, HueConnectEvent.class, "hue connect", "hue connect");
		EventValues.registerEventValue(HueConnectEvent.class, Player.class, new Getter<Player, HueConnectEvent>() {
		    @Override
		    public Player get(HueConnectEvent e) {
		        return e.getPlayer();
		    }
		}, 0);
		
		Skript.registerEvent("OpenAudio socketio connect", SimpleEvent.class, SocketIoConnectEvent.class, "socketio connect", "socketio connect");
		Skript.registerEvent("OpenAudio socketio connect", SimpleEvent.class, SocketIoDisconnectEvent.class, "socketio disconnect", "socketio disconnect");
		
		Skript.registerEvent("OpenAudio whisper", SimpleEvent.class, SocketWhisperEvent.class, "audio whisper", "audio whisper");
		EventValues.registerEventValue(SocketWhisperEvent.class, String.class, new Getter<String, SocketWhisperEvent>() {
		    @Override
		    public String get(SocketWhisperEvent e) {
		        return e.getData();
		    }
		}, 0);
		EventValues.registerEventValue(me.mindgamesnl.openaudiomc.publicApi.SocketWhisperEvent.class, Player.class, new Getter<Player, me.mindgamesnl.openaudiomc.publicApi.SocketWhisperEvent>() {
		    @Override
		    public Player get(me.mindgamesnl.openaudiomc.publicApi.SocketWhisperEvent e) {
		        return e.getPlayer();
		    }
		}, 0);
	}
}