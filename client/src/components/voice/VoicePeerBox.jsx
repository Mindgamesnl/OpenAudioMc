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
      <div
        className="flex items-center justify-center h-full w-full bg-gradient-to-br from-green-900/20 to-black"
      >
        <div className="w-full max-w-4xl mx-4">
          <div className="bg-black/40 backdrop-blur-md rounded-lg border border-green-400/10 shadow-xl">
            <div className="p-6 md:p-8">
              <h2 className="text-yellow-400/90 text-2xl font-medium mb-6">
                {msg('vc.peersHiddenTitle')}
              </h2>

              <div className="bg-yellow-500/5 rounded-lg p-5 border border-yellow-400/20">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Info className="w-6 h-6 text-yellow-400/80" />
                  </div>
                  <div>
                    <h3 className="text-yellow-400/90 text-base font-medium mb-2">
                      {msg('vc.peersHiddenTitle')}
                    </h3>
                    <p className="text-yellow-400/70 text-base leading-relaxed">
                      {msg('vc.peersHiddenText')}
                    </p>
                  </div>
                </div>
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
          </div>
          <div
            className="bg-zinc-900/80 text-zinc-300 rounded-md px-3 py-2 text-sm font-medium flex items-center space-x-2 my-2"
          >
            <div className="flex items-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2" />
              <span>
                <h2>{peerMessage}</h2>
              </span>
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
