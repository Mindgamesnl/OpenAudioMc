/* eslint-disable no-restricted-syntax, guard-for-in */
import React from 'react';
import { connect } from 'react-redux';
import CompactDebugPanel from '../../../../components/debugging/CompactDebugPanel';
import CompactSystemInfo from '../../../../components/debugging/CompactSystemInfo';
import CompactTransceiversPanel from '../../../../components/debugging/CompactTransceiversPanel';
import CompactSpatialPanel from '../../../../components/debugging/CompactSpatialPanel';
import CompactLogViewer from '../../../../components/debugging/CompactLogViewer';
import EnhancedMixerView from '../../../../components/mixer/EnhancedMixerView';
import {
  feedDebugValue,
  getDebugLog,
  getDebugValues,
  getLatestDebugValue,
} from '../../../../client/services/debugging/DebugService';
import { DebugStatistic } from '../../../../client/services/debugging/DebugStatistic';
import { WorldModule } from '../../../../client/services/world/WorldModule';
import { VoiceModule } from '../../../../client/services/voice/VoiceModule';

class DebugPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      radarTask: null,
      graphTask: null,
      debugColors: [
        '#EF4444', // red-500
        '#3B82F6', // blue-500
        '#10B981', // green-500
        '#F59E0B', // yellow-500
        '#8B5CF6', // purple-500
        '#EC4899', // pink-500
        '#06B6D4', // cyan-500
        '#84CC16', // lime-500
        '#F97316', // orange-500
        '#6366F1', // indigo-500
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
      }, 100), // Faster updates for better responsiveness
      graphTask: setInterval(() => {
        // Track memory usage if available
        if (performance.memory?.usedJSHeapSize) {
          const memoryUsageMB = (performance.memory.usedJSHeapSize / 1024 / 1024);
          feedDebugValue(DebugStatistic.MEMORY_USAGE_MB, parseFloat(memoryUsageMB.toFixed(1)));
        }

        const panels = [];
        let values = getDebugValues();

        // Sort values by name
        const keys = Object.keys(values);
        keys.sort();
        const sortedValues = {};
        for (const key of keys) {
          sortedValues[key] = values[key];
        }
        values = sortedValues;

        let ci = 0;
        for (const debugValueName in values) {
          const stat = values[debugValueName];
          let latest = getLatestDebugValue(stat);
          if (latest == null) latest = 0;

          panels.push(
            <CompactDebugPanel
              key={debugValueName}
              title={debugValueName}
              color={this.state.debugColors[ci]}
              data={stat.values}
            />,
          );

          if (!stat.advancesItself) {
            feedDebugValue(stat, latest); // advance time
          }
          ci++;
          if (ci >= this.state.debugColors.length) ci = 0;
        }

        this.setState({
          panels,
        });
      }, 250), // Slightly faster updates for metrics
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.radarTask);
    clearInterval(this.state.graphTask);
  }

  render() {
    const log = getDebugLog();

    return (
      <div className="h-full w-full overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Compact Header */}
        <div className="sticky top-0 z-10 backdrop-blur-xl bg-black bg-opacity-40 border-b border-white border-opacity-10">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-500 bg-opacity-20 backdrop-blur-lg rounded-lg border border-red-500 border-opacity-30">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Debug Console</h1>
                  <p className="text-xs text-gray-400">Real-time system diagnostics</p>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                Press
                {' '}
                <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-blue-300 font-mono">d</kbd>
                {' '}
                to toggle
              </div>
            </div>
          </div>
        </div>

        {/* High Density Content Grid */}
        <div className="max-w-7xl mx-auto p-4 space-y-4">

          {/* Top Row - System Info & Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <CompactSystemInfo />
            <CompactTransceiversPanel transceiverNames={this.state.transceiverNames} />
            <div className="md:col-span-2">
              <CompactSpatialPanel
                playerLocation={this.state.playerLocation}
                peers={this.state.peers}
                speakers={this.state.speakers}
              />
            </div>
          </div>

          {/* Performance Metrics Grid */}
          {this.state.panels.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <h2 className="text-white font-semibold">Performance Metrics</h2>
                <span className="text-gray-400 text-xs">
                  (
                  {this.state.panels.length}
                  {' '}
                  active)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3">
                {this.state.panels}
              </div>
            </div>
          )}

          {/* Audio Mixer State - Enhanced Visual Representation */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <h2 className="text-white font-semibold">Audio Mixer State</h2>
            </div>
            <div className="bg-black bg-opacity-20 rounded-xl p-4 border border-white border-opacity-10">
              <EnhancedMixerView />
            </div>
          </div>

          {/* System Logs */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <h2 className="text-white font-semibold">System Logs</h2>
            </div>
            <CompactLogViewer log={log} />
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
