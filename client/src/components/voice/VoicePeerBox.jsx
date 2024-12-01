import React from 'react';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { Info } from 'lucide-react';
import { VoicePeerRow } from './VoicePeerRow';
import { msg } from '../../client/OpenAudioAppContainer';
import EmptyVoiceState from './ui/NoPeers';

const VoicePeerRowMemo = React.memo(VoicePeerRow);

function VoicePeerBox(props) {
  const shouldBeHidden = props.peersHidden && !props.isModerating;
  let total = 0;
  let talking = 0;

  const peers = Object.values(props.voicePeers)
    .filter((peer) => (peer.options != null ? peer.options.visible : true))
    .map((peer) => {
      total++;
      if (peer.speaking) talking++;
      return (
        <VoicePeerRowMemo
          loading={peer.loading}
          name={peer.displayName}
          displayUuid={peer.displayUuid}
          key={peer.uuid}
          streamKey={peer.streamKey}
          uuid={peer.uuid}
          speaking={peer.speaking}
          muted={peer.muted}
          spatialAudio={(peer.options != null ? peer.options.spatialAudio : true)}
        />
      );
    });

  let peerMessage = msg('vc.peerTable');
  peerMessage = peerMessage.replace('{talking}', talking);
  peerMessage = peerMessage.replace('{total}', total);

  if (shouldBeHidden) {
    return (
      <div className="w-full bg-black/20 backdrop-blur-sm common-rounded">
        <div className="p-4">
          <h2 className="text-yellow-400/90 text-xl mb-4">
            {msg('vc.peersHiddenTitle')}
          </h2>

          <div className="bg-yellow-400/5 rounded-lg p-4 border border-yellow-400/20">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <Info className="w-5 h-5 text-yellow-400/80" />
              </div>
              <div>
                <h3 className="text-yellow-400/80 text-sm font-medium mb-1">
                  {msg('vc.peersHiddenTitle')}
                </h3>
                <p className="text-yellow-400/60 text-sm">
                  {msg('vc.peersHiddenText')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // is there anyone?
  if (peers.length === 0) {
    return (
      <EmptyVoiceState />
    );
  }

  return (
    <div className="flex justify-center align-middle">
      <div className="content-card-collection common-rounded">
        <div className="content-card bg-transparent border-transparent p-2">
          <div className="flex flex-wrap gap-4">
            {peers}
            <div className="h-full w-full text-center">
              <h2>{peerMessage}</h2>
            </div>
          </div>
        </div>
      </div>
      <Tooltip id="proximity-voice-tooltip" />
      <Tooltip id="global-voice-tooltip" />
    </div>
  );
}

export default connect(mapStateToProps)(VoicePeerBox);

function mapStateToProps(state) {
  return {
    voicePeers: state.voiceState.peers,
    currentUser: state.currentUser,
    peersHidden: state.voiceState.peersHidden,
    isModerating: state.voiceState.isModerating,
  };
}
