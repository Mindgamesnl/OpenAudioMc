/* eslint-disable no-nested-ternary */
import React from 'react';
import { MediaManager } from '../../client/services/media/MediaManager';

export default class EnhancedMixerView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [],
      loop: -1,
    };
  }

  componentDidMount() {
    this.setState({
      loop: setInterval(() => {
        this.setState({
          channels: Array.from(MediaManager.mixer.getChannels()),
        });
      }, 100), // Faster updates for better real-time feel
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.loop);
  }

  onlyFileName(path) {
    if (path == null) return 'null';
    return path.split('/').pop().split('.').shift();
  }

  getProgressPercentage(current, total) {
    if (!current || !total || Number.isNaN(current) || Number.isNaN(total)) return 0;
    return Math.min(100, Math.max(0, (current / total) * 100));
  }

  getStatusColor(sound) {
    if (sound.hadError) return 'bg-red-500';
    if (sound.destroyed) return 'bg-gray-500';
    if (!sound.loaded) return 'bg-yellow-500';
    if (sound.startedLoading) return 'bg-green-500';
    return 'bg-blue-500';
  }

  getStatusText(sound) {
    if (sound.hadError) return 'ERROR';
    if (sound.destroyed) return 'DESTROYED';
    if (sound.gotShutDown) return 'SHUTDOWN';
    if (!sound.loaded) return 'LOADING';
    if (sound.startedLoading) return 'PLAYING';
    return 'IDLE';
  }

  getReadyStateText(readyState) {
    switch (readyState) {
      case 0:
        return 'HAVE_NOTHING';
      case 1:
        return 'HAVE_METADATA';
      case 2:
        return 'HAVE_CURRENT_DATA';
      case 3:
        return 'HAVE_FUTURE_DATA';
      case 4:
        return 'HAVE_ENOUGH_DATA';
      default:
        return 'UNKNOWN';
    }
  }

  getNetworkStateText(networkState) {
    switch (networkState) {
      case 0:
        return 'EMPTY';
      case 1:
        return 'IDLE';
      case 2:
        return 'LOADING';
      case 3:
        return 'NO_SOURCE';
      default:
        return 'UNKNOWN';
    }
  }

  formatTime(seconds) {
    if (!seconds || Number.isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  render() {
    if (this.state.channels.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="inline-flex items-center px-4 py-2 bg-gray-500 bg-opacity-20 rounded-lg">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-2-2m0 0l-2 2m2-2v6m-8 1l2 2 2-2"
              />
            </svg>
            <span className="text-gray-300 font-medium">No Active Channels</span>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {this.state.channels.map((channel, channelIndex) => {
          // Since channels only have one sound, get the first (and only) sound
          const sound = channel.sounds[0];

          return (
            <div
              key={channelIndex}
              className="bg-black bg-opacity-30 rounded-xl p-4 border border-gray-600 border-opacity-30"
            >
              {/* Main Channel Header with Sound Info */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

                {/* Left: Channel & Sound Identity */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <h3 className="text-white font-semibold text-lg">{channel.channelName}</h3>
                  </div>

                  {sound ? (
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${this.getStatusColor(sound)}`} />
                      <span className="text-white font-medium">
                        {this.onlyFileName(sound.rawSource)}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded font-mono ${
                        sound.hadError ? 'bg-red-500 bg-opacity-20 text-red-300 border border-red-500 border-opacity-30'
                          : sound.destroyed ? 'bg-gray-500 bg-opacity-20 text-gray-300 border border-gray-500 border-opacity-30'
                            : sound.gotShutDown ? 'bg-orange-500 bg-opacity-20 text-orange-300 border border-orange-500 border-opacity-30'
                              : !sound.loaded ? 'bg-yellow-500 bg-opacity-20 text-yellow-300 border border-yellow-500 border-opacity-30'
                                : 'bg-green-500 bg-opacity-20 text-green-300 border border-green-500 border-opacity-30'
                      }`}
                      >
                        {this.getStatusText(sound)}
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Center: Playback Progress & Volume */}
                <div className="space-y-2">
                  {/* Volume Control */}
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-400">Vol:</span>
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-400 transition-all duration-200"
                        style={{ width: `${Math.min(100, channel.channelVolume)}%` }}
                      />
                    </div>
                    <span className="text-blue-300 font-mono text-xs min-w-[3rem]">
                      {Math.round(channel.channelVolume)}
                      %
                    </span>
                  </div>

                  {/* Audio Progress Bar */}
                  {sound && sound.soundElement && sound.soundElement.duration ? (
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>{this.formatTime(sound.soundElement.currentTime)}</span>
                        <span>{this.formatTime(sound.soundElement.duration)}</span>
                        Buffered
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-400 transition-all duration-200"
                          style={{
                            width: `${this.getProgressPercentage(sound.soundElement.currentTime, sound.soundElement.duration)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Right: Quick Status Indicators */}
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {sound ? (
                    <>
                      <div className="flex flex-col items-center space-y-1">
                        <div className={`w-3 h-3 rounded-full ${sound.loop ? 'bg-green-400' : 'bg-gray-500'}`} />
                        <span className="text-gray-300">Loop</span>
                      </div>
                      <div className="flex flex-col items-center space-y-1">
                        <div className={`w-3 h-3 rounded-full ${sound.trackable ? 'bg-blue-400' : 'bg-gray-500'}`} />
                        <span className="text-gray-300">Track</span>
                      </div>
                      <div className="flex flex-col items-center space-y-1">
                        <div className={`w-3 h-3 rounded-full ${sound.needsCors ? 'bg-orange-400' : 'bg-gray-500'}`} />
                        <span className="text-gray-300">CORS</span>
                      </div>
                      <div className="flex flex-col items-center space-y-1">
                        <div
                          className={`w-3 h-3 rounded-full ${sound.usesDateSync ? 'bg-purple-400' : 'bg-gray-500'}`}
                        />
                        <span className="text-gray-300">Sync</span>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Channel Tags */}
              {channel.tags && Object.keys(channel.tags).length > 0 ? (
                <div className="flex flex-wrap gap-1 mb-4">
                  {Object.entries(channel.tags).map(([key, value], tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-purple-500 bg-opacity-20 text-purple-300 text-xs rounded border border-purple-500 border-opacity-30"
                    >
                      {key}
                      :
                      {String(value)}
                    </span>
                  ))}
                </div>
              ) : null}

              {/* Technical Details - Always Expanded */}
              {sound ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                  {/* Audio Element Properties */}
                  {sound.soundElement ? (
                    <div className="bg-black bg-opacity-50 rounded-lg p-3">
                      <h4 className="text-cyan-300 font-medium mb-2 text-sm">Audio Element</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Ready State:</span>
                          <span className="text-cyan-300 font-mono">
                            {this.getReadyStateText(sound.soundElement.readyState)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Network:</span>
                          <span className="text-cyan-300 font-mono">
                            {this.getNetworkStateText(sound.soundElement.networkState)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Volume:</span>
                          <span className="text-cyan-300 font-mono">
                            {(sound.soundElement.volume * 100).toFixed(0)}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Playback:</span>
                          <span className="text-cyan-300 font-mono">
                            {sound.playbackSpeed}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Buffered:</span>
                          <span className="text-cyan-300 font-mono">
                            {sound.soundElement.buffered?.length || 0}
                            {' '}
                            ranges
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Muted:</span>
                          <span className={`font-mono ${sound.soundElement.muted ? 'text-red-300' : 'text-green-300'}`}>
                            {sound.soundElement.muted ? 'YES' : 'NO'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Paused:</span>
                          <span
                            className={`font-mono ${sound.soundElement.paused ? 'text-yellow-300' : 'text-green-300'}`}
                          >
                            {sound.soundElement.paused ? 'YES' : 'NO'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Performance & Loading */}
                  <div className="bg-black bg-opacity-50 rounded-lg p-3">
                    <h4 className="text-green-300 font-medium mb-2 text-sm">Performance</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Load Time:</span>
                        <span className="text-green-300 font-mono">
                          {sound.soundElement && sound.soundElement.hasAttribute('stopwatchTime')
                            ? `${parseFloat(sound.soundElement.getAttribute('stopwatchTime')).toFixed(2)}s`
                            : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Ready Flag:</span>
                        <span
                          className={`font-mono ${sound.soundElement && sound.soundElement.hasAttribute('stopwatchReady') ? 'text-green-300' : 'text-gray-400'}`}
                        >
                          {sound.soundElement && sound.soundElement.hasAttribute('stopwatchReady') ? 'SET' : 'UNSET'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Loaded:</span>
                        <span className={`font-mono ${sound.loaded ? 'text-green-300' : 'text-red-300'}`}>
                          {sound.loaded ? 'YES' : 'NO'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Started:</span>
                        <span className={`font-mono ${sound.startedLoading ? 'text-yellow-300' : 'text-gray-400'}`}>
                          {sound.startedLoading ? 'YES' : 'NO'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Finished Init:</span>
                        <span
                          className={`font-mono ${sound.finsishedInitializing ? 'text-green-300' : 'text-yellow-300'}`}
                        >
                          {sound.finsishedInitializing ? 'YES' : 'NO'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Callbacks:</span>
                        <span className="text-blue-300 font-mono">
                          {sound.initCallbacks?.length || 0}
                          {' '}
                          pending
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Start Offset:</span>
                        <span className="text-purple-300 font-mono">
                          {sound.startAtMillis ? `${sound.startAtMillis}ms` : '0ms'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Channel & Source Info */}
                  <div className="bg-black bg-opacity-50 rounded-lg p-3">
                    <h4 className="text-blue-300 font-medium mb-2 text-sm">Channel & Source</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Original Vol:</span>
                        <span className="text-blue-300 font-mono">
                          {channel.originalVolume || 'N/A'}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max Distance:</span>
                        <span className="text-purple-300 font-mono">
                          {channel.maxDistance || 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fade Time:</span>
                        <span className="text-cyan-300 font-mono">
                          {channel.prefferedFadeTime || 'Default'}
                          ms
                        </span>
                      </div>
                      <div className="text-gray-400 text-xs mb-1">Raw Source:</div>
                      <div className="text-blue-300 font-mono text-xs break-all bg-black bg-opacity-50 p-1 rounded">
                        {sound.rawSource || 'N/A'}
                      </div>
                      <div className="text-gray-400 text-xs mb-1">Processed:</div>
                      <div className="text-blue-300 font-mono text-xs break-all bg-black bg-opacity-50 p-1 rounded">
                        {sound.source || 'N/A'}
                      </div>
                    </div>
                  </div>

                  {/* Error Information - Only show if there's an error */}
                  {sound.hadError && sound.error ? (
                    <div
                      className="bg-red-500 bg-opacity-20 rounded-lg p-3 border border-red-500 border-opacity-30 md:col-span-2 lg:col-span-3"
                    >
                      <h4 className="text-red-300 font-medium mb-2 text-sm">Error Details</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-red-200">Type:</span>
                          <span className="text-red-100 font-mono">
                            {sound.error.type || 'Unknown'}
                          </span>
                        </div>
                        {sound.soundElement && sound.soundElement.error ? (
                          <>
                            <div className="flex justify-between">
                              <span className="text-red-200">Code:</span>
                              <span className="text-red-100 font-mono">
                                {sound.soundElement.error.code}
                              </span>
                            </div>
                            <div className="text-red-200 text-xs">
                              Message:
                              {' '}
                              {sound.soundElement.error.message}
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {/* No Sound Fallback */}
              {!sound && (
                <div className="text-center py-4 text-gray-400">
                  No sound data available for this channel
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
