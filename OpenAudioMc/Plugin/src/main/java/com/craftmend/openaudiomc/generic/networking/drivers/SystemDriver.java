package com.craftmend.openaudiomc.generic.networking.drivers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.oac.OpenaudioAccountService;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.state.states.ReconnectingState;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.SocketDriver;
import com.craftmend.openaudiomc.generic.networking.io.SocketConnection;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.state.states.ConnectedState;
import com.craftmend.openaudiomc.generic.state.states.IdleState;
import com.google.gson.JsonArray;
import io.socket.client.Socket;
import lombok.Setter;
import org.json.JSONArray;
import org.json.JSONException;

import java.time.Duration;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;

public class SystemDriver implements SocketDriver {

    private final TaskService taskService = OpenAudioMc.resolveDependency(TaskService.class);
    private final StateService stateService = OpenAudioMc.getService(StateService.class);
    private final SocketConnection parent;

    private Instant lastHeartbeat = Instant.now();
    private Socket lastSocket;
    @Setter private boolean announcedShutdown = false;

    public SystemDriver(SocketConnection socketConnection) {
        this.parent = socketConnection;
    }

    @Override
    public void boot(Socket socket, SocketConnection connector) {
        this.lastSocket = socket;
        final AtomicBoolean died = new AtomicBoolean(false);

        taskService.scheduleAsyncRepeatingTask(() -> {
            if (stateService.getCurrentState().isConnected()) {
                checkHeartbeatDelay();
            }
        }, 20, 20);

        socket.on("time-update", args -> {
            pingHeartbeat();
            String[] data = ((String) args[args.length - 1]).split(":");
            long timeStamp = Long.parseLong(data[0]);
            long offset = Long.parseLong(data[1]);
            OpenAudioMc.getService(TimeService.class).pushServerUpdate(timeStamp, offset);
        });

        socket.on("announce-shutdown", args -> {
            announcedShutdown = true;
        });

        socket.on("client-token-cache", args -> {
            OpenAudioMc.getService(AuthenticationService.class).getDriver().initCache();
        });

        socket.on("reconnect-clients", args -> {
            JSONArray rawData = (JSONArray) args[0];
            String[] data = new String[rawData.length()];
            for (int i = 0; i < rawData.length(); i++) {
                try {
                    data[i] = rawData.getString(i);
                } catch (JSONException e) {
                    OpenAudioLogger.error(e, "Failed to parse reconnect data");
                }
            }
            Set<UUID> stillConnected = new HashSet<>();
            // get the UUID's of all connected clients, we need this to update our local list of connected clients
            for (String s : data) {
                if (s != null && !s.isEmpty()) {
                    stillConnected.add(UUID.fromString(s));
                }
            }

            for (ClientConnection client : this.parent.getParent().getClients()) {
                if (stillConnected.contains(client.getOwner().getUniqueId())) {
                    // are they still connected?
                    if (!client.isConnected()) {
                        // no, so reconnect
                        client.onConnect();
                    }
                } else {
                    // they are not in the list, so they should be disconnected
                    if (client.isConnected()) {
                        client.onDisconnect();
                    }
                }
            }
        });

        socket.on("flush-queue", args -> {
            this.parent.getParent().flushQueue();
        });

        socket.on("discard-queue", args -> {
            this.parent.getParent().discardQueue();
        });

        socket.on(Socket.EVENT_CONNECT, args -> {
            // connected with success
            announcedShutdown = false;
            OpenAudioMc.getService(StateService.class).setState(new ConnectedState(connector.getPreviousLogin().getRelay()));
            pingHeartbeat();
            OpenAudioMc.getService(OpenaudioAccountService.class).startVoiceHandshake();
        });

        socket.on(Socket.EVENT_DISCONNECT, args -> {
            if (!died.get()) {
                handleDisconnect();
                died.set(true);
            }
        });

        socket.on(Socket.EVENT_CONNECT_TIMEOUT, args -> {
            // failed to connect
            if (!died.get()) {
                handleDisconnect();
                died.set(true);
            }
        });

        socket.on(Socket.EVENT_CONNECT_ERROR, args -> {
            // failed to connect
            if (!died.get()) {
                handleDisconnect();
                died.set(true);
            }
        });
    }

    private void checkHeartbeatDelay() {
        if (!stateService.getCurrentState().isConnected()) {
            // we're not connected, so we don't care
            return;
        }

        // is the latest heartbeat older than 30 seconds?
        if (lastHeartbeat.plusSeconds(30).isBefore(Instant.now())) {
            OpenAudioLogger.warn("Heartbeat timed out, disconnecting...");
            // yes, it is. disconnect
            handleDisconnect();
            // timeout state
            OpenAudioMc.getService(StateService.class).setState(new IdleState("Heartbeats timed out. Is something wrong with the api, network or token?"));
        } else {
            // what is the difference between now and the last heartbeat?
            long seconds = Duration.between(lastHeartbeat, Instant.now()).getSeconds();
            if (seconds > 10) {
                // more than 5 seconds, so we're probably lagging
                OpenAudioLogger.warn("Heartbeat is lagging " + seconds + " seconds behind, connection will reset if it doesn't recover soon");
            }
        }
    }

    private void pingHeartbeat() {
        lastHeartbeat = Instant.now();
    }

    private void handleDisconnect() {
        boolean mayReconnect = true;
        if (stateService.getCurrentState() instanceof ReconnectingState) {
            ReconnectingState state = (ReconnectingState) stateService.getCurrentState();
            if (state.getAttempts() >= ReconnectingState.MAX_ATTEMPTS) {
                mayReconnect = false;
            }
        }

        try {
            lastSocket.disconnect();
        } catch (Exception e) {
            // ignored
        }


        if (announcedShutdown) {
            OpenAudioLogger.info("The server closed the primary connection, but we were already aware of this. Ignoring.");
            shutdown("Graceful.");
        } else {
            if (mayReconnect && !StorageKey.SETTINGS_AUTO_RECONNECT.getBoolean()) {
                mayReconnect = false;
                OpenAudioLogger.warn("Core connection lost, but auto reconnect is disabled.");
            }

            if (mayReconnect) {
                // lets try again lol
                // are we currently reconnecting?
                if (stateService.getCurrentState() instanceof ReconnectingState) {
                    ReconnectingState state = (ReconnectingState) stateService.getCurrentState();
                    state.incrementAttempts();
                } else {
                    ReconnectingState reconnect = new ReconnectingState();
                    reconnect.incrementAttempts();
                    OpenAudioMc.getService(StateService.class).setState(reconnect);
                }
                OpenAudioLogger.warn("The server closed the primary connection unexpectedly, attempting reconnect in 2 seconds.");
                OpenAudioMc.resolveDependency(TaskService.class).schduleSyncDelayedTask(() -> {
                    // is this still the case?
                    if (stateService.getCurrentState() instanceof ReconnectingState) {
                        OpenAudioLogger.warn("Reconnecting...");
                        parent.setupConnection();
                    } else {
                        OpenAudioLogger.warn("Reconnect state changed, aborting reconnect.");
                    }
                }, 20 * 2);
            } else {
                OpenAudioLogger.warn("The server closed the primary connection unexpectedly, and the system has given up trying to reconnect.");
                shutdown("Reached reconnect limit.");
                // set to idle
                OpenAudioMc.getService(StateService.class).setState(new IdleState("Disconnected from the socket. Reached reconnect limit."));
            }
        }
    }

    private void shutdown(String reason) {
        // disconnected, probably with a reason or something
        OpenAudioMc.getService(StateService.class).setState(new IdleState("Disconnected from the socket. " + reason));

        String message = Platform.translateColors(OpenAudioMc.getInstance().getConfiguration().getString(StorageKey.MESSAGE_LINK_EXPIRED));
        for (ClientConnection client : OpenAudioMc.getService(NetworkingService.class).getClients()) {
            if (client.getSession().isWaitingToken()) {
                client.getUser().sendMessage(message);
                client.getSession().setWaitingToken(false);
            }
            if (client.isConnected()) {
                client.onDisconnect();
            }
        }
        OpenAudioMc.getService(OpenaudioAccountService.class).getVoiceApiConnection().stop();

        // reset
        announcedShutdown = false;
    }
}
