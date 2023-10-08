package com.craftmend.openaudiomc.generic.networking.drivers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.oac.OpenaudioAccountService;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.SocketDriver;
import com.craftmend.openaudiomc.generic.networking.io.SocketIoConnector;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.state.states.ConnectedState;
import com.craftmend.openaudiomc.generic.state.states.IdleState;
import io.socket.client.Socket;

import java.time.Duration;
import java.time.Instant;

public class SystemDriver implements SocketDriver {

    private TaskService taskService = OpenAudioMc.resolveDependency(TaskService.class);
    private StateService stateService = OpenAudioMc.getService(StateService.class);
    private Instant lastHeartbeat = Instant.now();
    private Socket lastSocket;

    @Override
    public void boot(Socket socket, SocketIoConnector connector) {
        this.lastSocket = socket;

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

        socket.on(Socket.EVENT_CONNECT, args -> {
            // connected with success
            OpenAudioMc.getService(StateService.class).setState(new ConnectedState(connector.getLastUsedRelay()));
            pingHeartbeat();
            OpenAudioMc.getService(OpenaudioAccountService.class).startVoiceHandshake();
        });

        socket.on(Socket.EVENT_DISCONNECT, args -> handleDisconnect());

        socket.on(Socket.EVENT_CONNECT_TIMEOUT, args -> {
            // failed to connect
            OpenAudioMc.getService(StateService.class).setState(new IdleState("Connecting timed out, something wrong with the api, network or token?"));
        });
    }

    private void checkHeartbeatDelay() {
        if (!stateService.getCurrentState().isConnected()) {
            // we're not connected, so we don't care
            return;
        }

        // is the latest heartbeat older than 30 seconds?
        if (lastHeartbeat.plusSeconds(30).isBefore(Instant.now())) {
            OpenAudioLogger.toConsole("Heartbeat timed out, disconnecting...");
            // yes, it is. disconnect
            handleDisconnect();
            // timeout state
            OpenAudioMc.getService(StateService.class).setState(new IdleState("Heartbeats timed out. Is something wrong with the api, network or token?"));
        } else {
            // what is the difference between now and the last heartbeat?
            long seconds = Duration.between(lastHeartbeat, Instant.now()).getSeconds();
            if (seconds > 10) {
                // more than 5 seconds, so we're probably lagging
                OpenAudioLogger.toConsole("Heartbeat is lagging " + seconds + " seconds behind, connection will reset if it doesn't recover soon");
            }
        }
    }

    private void pingHeartbeat() {
        lastHeartbeat = Instant.now();
    }

    private void handleDisconnect() {
        // disconnected, probably with a reason or something
        OpenAudioMc.getService(StateService.class).setState(new IdleState("Disconnected from the socket"));

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

        try {
            lastSocket.disconnect();
        } catch (Exception e) {
            // ignored
        }

        OpenAudioMc.getService(OpenaudioAccountService.class).getVoiceApiConnection().stop();
    }
}
