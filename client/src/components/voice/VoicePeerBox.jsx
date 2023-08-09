import React from 'react';
import { connect } from 'react-redux';
import { VoicePeerRow } from './VoicePeerRow';
import { msg } from '../../client/OpenAudioAppContainer';

function VoicePeerBox(props) {
  const shouldBeHidden = props.voiceState.peersHidden && !props.voiceState.isModerating;
  let total = 0;
  let talking = 0;

  const peers = Object.values(props.voicePeers).map((peer) => {
    total++;
    if (peer.speaking) talking++;
    return (
      <VoicePeerRow
        loading={peer.loading}
        name={peer.name}
        key={peer.uuid}
        streamKey={peer.streamKey}
        uuid={peer.uuid}
        speaking={peer.speaking}
        muted={peer.muted}
      />
    );
  });

  // split array in two
  const half = Math.ceil(peers.length / 2);
  const left = peers.slice(0, half);
  const right = peers.slice(half, peers.length);

  let peerMessage = msg('vc.peerTable');
  peerMessage = peerMessage.replace('{talking}', talking);
  peerMessage = peerMessage.replace('{total}', total);

  if (shouldBeHidden) {
    return (
      <div className="content-section">
        <div className="content-section-title">{peerMessage}</div>
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">

            <div
              className="bg-gray-100 bg-opacity-25 border-t-4 border-red-500 rounded-b text-teal-900 px-4 py-5 shadow-md"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-teal-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">{msg('vc.peersHiddenTitle')}</p>
                  <p className="text-sm">{msg('vc.peersHiddenText')}</p>
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
      <div className="w-full flex justify-center align-middle">
        <div className="content-section flex justify-center w-4/5">
          <div className="flex content-card-collection items-stretch">
            <div className="w-full content-card small-card order-2 2xl:order-1">
              <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                  <p className="mt-1 text-4xl font-bold tracking-tight text-gray-200 sm:text-5xl lg:text-6xl">
                    {msg('vc.empty.title')}
                  </p>
                  <p className="mx-auto mt-5 max-w-xl text-xl text-gray-300">
                    {msg('vc.empty.body')}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center align-middle">
      <div className="content-section w-5/6">
        <div className="content-section-title">{peerMessage}</div>
        <div className="content-card-collection common-rounded">
          <div className="content-card w-1/2 bg-transparent border-transparent p-2">
            <ul>
              {left}
            </ul>
          </div>
          <div className="content-card w-1/2  bg-transparent border-transparent p-2">
            <ul>
              {right}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(VoicePeerBox);
function mapStateToProps(state) {
  return {
    voicePeers: state.voiceState.peers,
    voiceState: state.voiceState,
    currentUser: state.currentUser,
    settings: state.settings,
  };
}
