import { VoiceModule } from '../../../voice/VoiceModule';
import { reportVital } from '../../../../util/vitalreporter';
import { StringifyError } from '../../../../util/errorreformat';
import { debugLog } from '../../../debugging/DebugService';
import { closeSessionTab } from '../../../../util/closure';

export function HandleVoiceSubscription(data) {
  // We need to separate this into two cases:
  // 1. Legacy handling, packets follow a format pre 6.8.5
  // 2. Modern handling, where packets can cover multiple peers at once.
  // We can differentiate this by checking if the 'peers' field is present, if it is, we can assume it's a modern packet.

  // eslint-disable-next-line no-prototype-builtins
  const isModern = data.hasOwnProperty('peers');

  if (!isModern) {
    debugLog('legacy voice subscription packet received');
    addPeer(data.targetUuid, data.targetPlayerName, data.targetStreamKey, data.location);
    return;
  }

  // modern handling
  const { peers } = data;
  for (let i = 0; i < peers.length; i++) {
    addPeer(peers[i].playerUuid, peers[i].playerName, peers[i].streamKey, peers[i].location);
  }
}

function addPeer(uuid, playerName, streamKey, location) {
  try {
    VoiceModule.addPeer(uuid, playerName, streamKey, location);
  } catch (e) {
    // check if its not a ConnectionClosedError
    if (e.name !== 'ConnectionClosedError') {
      reportVital(`metrics:voice:peer:failed-packet ${playerName} ${StringifyError(e)}`);
    } else {
      // report vital, then reload page
      reportVital(`metrics:voice:peer:failed-conn-closed ${playerName} ${StringifyError(e)}`)
        .then(() => {
          closeSessionTab();
        });
    }
  }
}
