import React from 'react';
import { connect } from 'react-redux';
import { msg } from '../../client/OpenAudioAppContainer';

class VoiceChatPiPinner extends React.Component {
  render() {
    let total = 0;
    let talking = 0;
    const peers = Object.values(this.props.voicePeers).map((peer) => {
      total++;
      if (peer.speaking) {
        talking++;
        return (
          peer
        );
      }
      return null;
    });

    return (
      <div className="h-screen w-screen bg-gray-950">
        <div className="flex flex-col w-full py-1 relative bg-black justify-center align-middle">
          {/* Small voicechat title */}
          <div
            className="rounding-bottom rounding-top px-1 py-1 flex items-center justify-start text-white"
          >
            <img
              src={`https://visage.surgeplay.com/face/512/${this.props.playerUuid}`}
              className={`avatar  ${this.props.voiceState.isSpeaking ? ' speaking-small' : ''}${this.props.voicechatMuted ? ' muted-self' : ''} !rounded-xl`}
              alt="avatar"
            />
            {msg('serverName')}
          </div>
        </div>
        <div className="flex">
          {talking > 0 ? (
            <div className="flex-shrink w-full bg-black bg-opacity-20 flex justify-center align-middle">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700 w-full">
                {peers.map((p) => {
                  if (p == null) return null;
                  return (
                    (
                      <li className="py-4 w-full m-0">
                        <div className="flex items-center space-x-4 m-0">
                          <div className="flex-shrink-0 mx-2">
                            <img
                              src={`https://visage.surgeplay.com/face/512/${p.uuid}`}
                              className={`avatar  ${p.speaking ? ' speaking-small' : ''}${p.muted ? ' muted-self' : ''} !rounded-xl`}
                              alt="avatar"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                              {p.name}
                              {' '}
                              {msg('vc.isTalking')}
                            </p>
                          </div>
                        </div>
                      </li>
                    )
                  );
                })}
              </ul>
            </div>
          ) : (
            <div
              className="w-full h-full flex-col justify-center align-middle text-center"
            >
              <div className="text-white text-center">
                No one is talking right now.
              </div>

              <p className="text-gray-500">
                There are
                {' '}
                {total}
                {' '}
                players in range.
              </p>

            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(VoiceChatPiPinner);

function mapStateToProps(state) {
  return {
    voiceState: state.voiceState,
    voicePeers: state.voiceState.peers,
    playerUuid: state.currentUser.uuid,
    voicechatMuted: state.voiceState.voicechatMuted,
  };
}
