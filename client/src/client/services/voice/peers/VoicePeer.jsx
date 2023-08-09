import Cookies from 'js-cookie';
import { getGlobalState, setGlobalState } from '../../../../state/store';
import { Interpolator, MAGIC_SCHEDULE_VALUES } from '../../../util/math/Interpolator';
import { PeerStream } from './PeerStream';
import { Vector3 } from '../../../util/math/Vector3';
import { VoiceModule } from '../VoiceModule';

export class VoicePeer {
  constructor(peerName, peerUuid, peerStreamKey, location) {
    // register in global state
    setGlobalState({
      voiceState: {
        peers: {
          [peerStreamKey]: {
            name: peerName,
            uuid: peerUuid,
            streamKey: peerStreamKey,
            speaking: false,
            muted: false,
            loading: true,
          },
        },
      },
    });

    this.peerName = peerName;
    this.peerUuid = peerUuid;
    this.peerStreamKey = peerStreamKey;
    this.location = location;
    this.killed = false;

    this.interpolator = new Interpolator();

    // initialize stream
    this.stream = new PeerStream(peerStreamKey, getVolumeForPeer(this.peerUuid));
    this.stream.setLocation(location.x, location.y, location.z);

    // start, and handle when it's ready
    this.stream.startStream((succeeded, e) => {
      if (succeeded) {
        // am i dead?
        if (this.killed) {
          this.stop();
          return;
        }

        // remove loading state
        setGlobalState({ voiceState: { peers: { [this.peerStreamKey]: { loading: false } } } });
      } else if (e) {
        throw e;
      }
    });
  }

  updateLocation(x, y, z) {
    this.interpolator.onMove = (l) => {
      this.stream.setLocation(l.x, l.y, l.z, true);
    };
    this.interpolator.interpolate(new Vector3(x, y, z), 90, 90, MAGIC_SCHEDULE_VALUES.VC_LOCATION_UPDATES);
  }

  stop() {
    this.killed = true;
    if (this.stream !== null) {
      this.stream.stop();
    }

    // drop the stream
    VoiceModule.peerManager.dropStream(this.peerStreamKey);

    // remove myself from the global state
    const globalPeers = getGlobalState().voiceState.peers;
    delete globalPeers[this.peerStreamKey];
    setGlobalState({ voiceState: { peers: globalPeers } });
  }
}

export function getVolumeForPeer(uuid) {
  // default to 100, use cookies next time
  const vol = Cookies.get(`voice-volume-${uuid}`);
  if (vol === null || vol === undefined) {
    return 100;
  }
  return parseInt(vol, 10);
}
