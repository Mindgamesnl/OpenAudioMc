package net.openaudiomc.internal.events;

import org.bukkit.entity.Player;

import ch.njol.skript.Skript;
import ch.njol.skript.lang.util.SimpleEvent;
import ch.njol.skript.registrations.EventValues;
import ch.njol.skript.util.Getter;
import me.mindgamesnl.openaudiomc.publicApi.AudioRegionEnterEvent;
import me.mindgamesnl.openaudiomc.publicApi.AudioRegionLeaveEvent;
import me.mindgamesnl.openaudiomc.publicApi.HueConnectEvent;
import me.mindgamesnl.openaudiomc.publicApi.SoundEndEvent;
import me.mindgamesnl.openaudiomc.publicApi.WebConnectEvent;
import me.mindgamesnl.openaudiomc.publicApi.WebDisconnectEvent;
import me.mindgamesnl.openaudiomc.publicApi.WebsocketSendEvent;
import me.mindgamesnl.openaudiomc.publicApi.SocketWhisperEvent;

public class SkriptRegistration {
	public static void load() {
		//more events for Liturkey and Legoman99573 <3
		
		Skript.registerEvent("OpenAudio connect", SimpleEvent.class, me.mindgamesnl.openaudiomc.publicApi.WebConnectEvent.class, "WebConnect", "audio open");
		EventValues.registerEventValue(me.mindgamesnl.openaudiomc.publicApi.WebConnectEvent.class, Player.class, new Getter<Player, WebConnectEvent>() {
		    @Override
		    public Player get(WebConnectEvent e) {
		        return e.getPlayer();
		    }
		}, 0);
		
		
		Skript.registerEvent("OpenAudio disconnect", SimpleEvent.class, me.mindgamesnl.openaudiomc.publicApi.WebDisconnectEvent.class, "WebDisconnect", "audio close");
		EventValues.registerEventValue(me.mindgamesnl.openaudiomc.publicApi.WebDisconnectEvent.class, Player.class, new Getter<Player, WebDisconnectEvent>() {
		    @Override
		    public Player get(WebDisconnectEvent e) {
		        return e.getPlayer();
		    }
		}, 0);
		
		
		Skript.registerEvent("OpenAudio Ws Send", SimpleEvent.class, me.mindgamesnl.openaudiomc.publicApi.WebsocketSendEvent.class, "websocket send", "audio send");
		EventValues.registerEventValue(me.mindgamesnl.openaudiomc.publicApi.WebsocketSendEvent.class, String.class, new Getter<String, WebsocketSendEvent>() {
		    @Override
		    public String get(WebsocketSendEvent e) {
		        return e.getData();
		    }
		}, 0);
		EventValues.registerEventValue(me.mindgamesnl.openaudiomc.publicApi.WebsocketSendEvent.class, Player.class, new Getter<Player, WebsocketSendEvent>() {
		    @Override
		    public Player get(WebsocketSendEvent e) {
		        return e.getPlayer();
		    }
		}, 0);
		
		
		Skript.registerEvent("OpenAudio region enter", SimpleEvent.class, me.mindgamesnl.openaudiomc.publicApi.AudioRegionEnterEvent.class, "audio region enter", "audio region enter");
		EventValues.registerEventValue(me.mindgamesnl.openaudiomc.publicApi.AudioRegionEnterEvent.class, String.class, new Getter<String, AudioRegionEnterEvent>() {
		    @Override
		    public String get(AudioRegionEnterEvent e) {
		        return e.getSound();
		    }
		}, 0);
		EventValues.registerEventValue(me.mindgamesnl.openaudiomc.publicApi.AudioRegionEnterEvent.class, Player.class, new Getter<Player, AudioRegionEnterEvent>() {
		    @Override
		    public Player get(AudioRegionEnterEvent e) {
		        return e.getPlayer();
		    }
		}, 0);


		Skript.registerEvent("OpenAudio region leave", SimpleEvent.class, me.mindgamesnl.openaudiomc.publicApi.AudioRegionLeaveEvent.class, "audio region enter", "audio region leave");
		EventValues.registerEventValue(me.mindgamesnl.openaudiomc.publicApi.AudioRegionLeaveEvent.class, Player.class, new Getter<Player, AudioRegionLeaveEvent>() {
		    @Override
		    public Player get(AudioRegionLeaveEvent e) {
		        return e.getPlayer();
		    }
		}, 0);
		
		//new events
		//fancy new events
		Skript.registerEvent("OpenAudio sound end", SimpleEvent.class, me.mindgamesnl.openaudiomc.publicApi.SoundEndEvent.class, "audio sound end", "audio sound end");
		EventValues.registerEventValue(me.mindgamesnl.openaudiomc.publicApi.SoundEndEvent.class, String.class, new Getter<String, SoundEndEvent>() {
		    @Override
		    public String get(SoundEndEvent e) {
		        return e.getId();
		    }
		}, 0);
		EventValues.registerEventValue(me.mindgamesnl.openaudiomc.publicApi.SoundEndEvent.class, Player.class, new Getter<Player, SoundEndEvent>() {
		    @Override
		    public Player get(SoundEndEvent e) {
		        return e.getPlayer();
		    }
		}, 0);
		
		Skript.registerEvent("OpenAudio hue connect", SimpleEvent.class, me.mindgamesnl.openaudiomc.publicApi.HueConnectEvent.class, "hue connect", "hue connect");
		EventValues.registerEventValue(me.mindgamesnl.openaudiomc.publicApi.HueConnectEvent.class, Player.class, new Getter<Player, HueConnectEvent>() {
		    @Override
		    public Player get(HueConnectEvent e) {
		        return e.getPlayer();
		    }
		}, 0);
		
		Skript.registerEvent("OpenAudio socketio connect", SimpleEvent.class, me.mindgamesnl.openaudiomc.publicApi.SocketIoConnectEvent.class, "socketio connect", "socketio connect");
		Skript.registerEvent("OpenAudio socketio connect", SimpleEvent.class, me.mindgamesnl.openaudiomc.publicApi.SocketIoDisconnectEvent.class, "socketio disconnect", "socketio disconnect");
		
		Skript.registerEvent("OpenAudio whisper", SimpleEvent.class, me.mindgamesnl.openaudiomc.publicApi.SocketWhisperEvent.class, "audio whisper", "audio whisper");
		EventValues.registerEventValue(me.mindgamesnl.openaudiomc.publicApi.SocketWhisperEvent.class, String.class, new Getter<String, SocketWhisperEvent>() {
		    @Override
		    public String get(SocketWhisperEvent e) {
		        return e.getData();
		    }
		}, 0);
		EventValues.registerEventValue(me.mindgamesnl.openaudiomc.publicApi.SocketWhisperEvent.class, Player.class, new Getter<Player, SocketWhisperEvent>() {
		    @Override
		    public Player get(SocketWhisperEvent e) {
		        return e.getPlayer();
		    }
		}, 0);
	}
}
