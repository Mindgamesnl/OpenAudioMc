import React from 'react';
import { connect } from 'react-redux';
import DebugPanel from '../../../../components/debugging/DebugPanel';
import {
  feedDebugValue,
  getDebugLog,
  getDebugValues,
  getLatestDebugValue,
} from '../../../../client/services/debugging/DebugService';
import { VERSION } from '../../../../build';
import { getGlobalState } from '../../../../state/store';
import { Radar } from '../../../../components/graph/Radar';
import { WorldModule } from '../../../../client/services/world/WorldModule';
import { VoiceModule } from '../../../../client/services/voice/VoiceModule';
import MixerStateView from '../../../../components/mixer/MixerStateView';
import { LogViewer } from '../../../../components/logs/DebugLogComponent';

class DebugPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      radarTask: null,
      graphTask: null,
      clearColors: [
        'Crimson',
        'Navy',
        'blue',
        'red',
        'purple',
        'brown',
        'green',
        'grey',
        'magenta',
      ],
      transceiverNames: [],
      playerLocation: {
        x: 0,
        y: 0,
        z: 0,
      },
      speakers: [],
      peers: [],
      panels: [],
    };
  }

  componentDidMount() {
    this.setState({
      radarTask: setInterval(() => {
        if (this.props.voiceState.peersHidden) return;
        if (WorldModule.player) {
          this.setState({
            playerLocation: {
              x: WorldModule.player.location.x,
              y: WorldModule.player.location.y,
              z: WorldModule.player.location.z,
              yaw: WorldModule.player.yaw,
            },
            transceiverNames: VoiceModule.peerManager.getChannelNames(),
            peers: VoiceModule.getPeerLocations(),
            speakers: WorldModule.getSpeakerLocations(),
          });
        }
      }, 50),
      graphTask: setInterval(() => {
        const panels = [];
        let values = getDebugValues();

        // sort values by name
        const keys = Object.keys(values);
        keys.sort();
        const sortedValues = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const key of keys) {
          sortedValues[key] = values[key];
        }
        values = sortedValues;

        let ci = 0;
        // eslint-disable-next-line no-restricted-syntax,guard-for-in
        for (const debugValueName in values) {
          // feed latest value to increment time
          const stat = values[debugValueName];
          let latest = getLatestDebugValue(stat);
          if (latest == null) latest = 0;

          panels.push(<DebugPanel
            title={debugValueName}
            color={this.state.clearColors[ci]}
            fill={stat.fill}
            data={stat.values}
            catchLine={`Latest:${latest}`}
            key={debugValueName}
          />);
          if (!stat.advancesItself) {
            feedDebugValue(stat, latest); // advance time
          }
          ci++;
          if (ci >= this.state.clearColors.length) ci = 0;
        }

        this.setState({
          panels,
        });
      }, 500),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.radarTask);
    clearInterval(this.state.graphTask);
  }

  render() {
    const log = getDebugLog();

    return (
      <div className="h-full w-full overflow-y-auto">
        {/* Header Section */}
        <div className="backdrop-blur-xl bg-black bg-opacity-20 rounded-3xl p-8 lg:p-10 border border-white border-opacity-10 shadow-2xl mb-8">
          <div className="text-center lg:text-left space-y-4">
            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <div className="p-4 bg-red-500 bg-opacity-20 backdrop-blur-lg rounded-2xl border border-red-500 border-opacity-30">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white">
                  Debug Console
                </h1>
                <p className="text-lg text-gray-300 mt-2">
                  System diagnostics and monitoring
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Debug Content Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* System Information Card */}
            <div className="backdrop-blur-xl bg-black bg-opacity-20 rounded-3xl p-6 border border-white border-opacity-10 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-500 bg-opacity-20 backdrop-blur-lg rounded-xl border border-blue-500 border-opacity-30">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">System Info</h3>
                </div>

                <div className="space-y-3 text-sm">
                  <p className="text-gray-300">
                    Welcome to the debugging page. Toggle with
                    <kbd className="px-2 py-1 bg-gray-700 rounded text-blue-300 font-mono"> d</kbd>
                  </p>
                  <div className="bg-black bg-opacity-30 rounded-xl p-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Build:</span>
                      <span className="text-blue-300 font-mono">{VERSION.build}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date:</span>
                      <span className="text-blue-300 font-mono">{VERSION.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tag:</span>
                      <span className="text-blue-300 font-mono">{VERSION.tag}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Player:</span>
                      <span className="text-green-300 font-medium">{getGlobalState().currentUser.userName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transceivers Card */}
            <div className="backdrop-blur-xl bg-black bg-opacity-20 rounded-3xl p-6 border border-white border-opacity-10 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-500 bg-opacity-20 backdrop-blur-lg rounded-xl border border-green-500 border-opacity-30">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Transceivers</h3>
                </div>

                <div className="bg-black bg-opacity-30 rounded-xl p-3">
                  {this.state.transceiverNames.length > 0 ? (
                    <div className="space-y-1">
                      {this.state.transceiverNames.map((name) => (
                        <div key={`${name}-`} className="text-green-300 font-mono text-sm px-2 py-1 bg-green-500 bg-opacity-10 rounded">
                          {name}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm italic">No active transceivers</p>
                  )}
                </div>
              </div>
            </div>

            {/* Performance Charts */}
            {this.state.panels.map((panel, index) => (
              <div key={index} className="backdrop-blur-xl bg-black bg-opacity-20 rounded-3xl p-6 border border-white border-opacity-10 shadow-2xl">
                {panel}
              </div>
            ))}

            {/* Spatial Rendering Card */}
            <div className="backdrop-blur-xl bg-black bg-opacity-20 rounded-3xl p-6 border border-white border-opacity-10 shadow-2xl lg:col-span-2">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-purple-500 bg-opacity-20 backdrop-blur-lg rounded-xl border border-purple-500 border-opacity-30">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Spatial Rendering</h3>
                </div>

                <div className="bg-black bg-opacity-30 rounded-xl p-4">
                  <Radar player={this.state.playerLocation} entities={this.state.peers} speakers={this.state.speakers} />
                  <div className="mt-4 text-sm">
                    <div className="bg-black bg-opacity-30 rounded-lg p-3">
                      <p className="text-gray-300 font-mono">
                        Position: X:
                        {this.state.playerLocation.x}
                        Y:
                        {this.state.playerLocation.y}
                        Z:
                        {this.state.playerLocation.z}
                      </p>
                      {this.state.peers.length === 0 && (
                        <p className="text-gray-400 italic mt-2">No peers in range or peers are hidden</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Logs Card */}
            <div className="backdrop-blur-xl bg-black bg-opacity-20 rounded-3xl p-6 border border-white border-opacity-10 shadow-2xl lg:col-span-3">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-yellow-500 bg-opacity-20 backdrop-blur-lg rounded-xl border border-yellow-500 border-opacity-30">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">System Logs</h3>
                </div>

                <div className="bg-black bg-opacity-30 rounded-xl overflow-hidden">
                  <LogViewer log={log} />
                </div>
              </div>
            </div>

            {/* Mixer State */}
            <div className="backdrop-blur-xl bg-black bg-opacity-20 rounded-3xl border border-white border-opacity-10 shadow-2xl overflow-hidden lg:col-span-3">
              <MixerStateView />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(DebugPage);

function mapStateToProps(state) {
  return {
    voiceState: state.voiceState,
  };
}
