import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { getGlobalState, setGlobalState } from '../../../state/store';
import { TimeService } from '../time/TimeService';
import { MediaManager } from '../media/MediaManager';
import { HandlerRegistry } from './HandlerRegistry';
import { VoiceModule } from '../voice/VoiceModule';
import { incrementDebugValue } from '../debugging/DebugService';
import { DebugStatistic } from '../debugging/DebugStatistic';
import { closeSessionTab } from '../../util/closure';

export const SocketManager = new class ISocketManager {
  constructor() {
    this.handlers = {};
    this.callbacksEnabled = false;
    this.supportsYoutube = false;
    this.hasConnected = false;
    this.outgoingQueue = [];
    this.inCount = 0;
    this.outCount = 0;

    this.connectToServer = this.connectToServer.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
    // eslint-disable-next-line no-new
    new HandlerRegistry(this);
  }

  connectToServer(endpoint) {
    setGlobalState({ relay: { connecting: true } });

    const { currentUser } = getGlobalState();
    const authHeader = ''
            + 'type=client&'
            + `n=${currentUser.userName}&`
            + `player=${currentUser.uuid}&`
            + `s=${currentUser.publicServerKey}&`
            + `p=${currentUser.token}`;

    this.socket = io(endpoint, { query: authHeader, autoConnect: false, withCredentials: false });

    this.socket.on('connect', () => {
      setGlobalState({ relay: { connected: true, connecting: false } });
      this.outgoingQueue.forEach((waiting) => {
        this.send(waiting.key, waiting.value);
      });
      this.hasConnected = true;
    });

    this.socket.on('time-update', (time) => {
      const data = time.split(':');
      const hoursOffset = parseInt(data[1], 10);
      const timeStamp = parseInt(data[0], 10);
      TimeService.sync(timeStamp, hoursOffset);
    });

    this.socket.on('disconnect', () => {
      MediaManager.destroySounds(null, true);

      toast.error('👋 Disconnected from the server, goodbye!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });

      setGlobalState({ relay: { connected: false, connecting: false }, currentUser: null, isLoading: false });

      VoiceModule.shutdown();

      closeSessionTab();
    });

    this.socket.on('data', (data) => {
      const packages = data.type.split('.');
      const payloadType = packages[packages.length - 1];
      if (this.handlers[payloadType] != null) this.handlers[payloadType](data.payload);
      this.inCount++;
      incrementDebugValue(DebugStatistic.PACKETS_RECEIVED);
    });

    this.socket.connect();
  }

  send(event, data) {
    this.outCount++;
    incrementDebugValue(DebugStatistic.PACKETS_SENT);
    if (this.hasConnected) {
      if (this.callbacksEnabled) {
        this.socket.emit(event, data);
      }
    } else {
      this.outgoingQueue.push({
        key: event,
        value: data,
      });
    }
  }

  registerHandler(channel, f) {
    this.handlers[channel] = f;
  }
}();
