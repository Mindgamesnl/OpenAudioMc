/* eslint-disable no-nested-ternary */
import React from 'react';
import { MediaManager } from '../../client/services/media/MediaManager';

export default class EnhancedMixerView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [],
      engineChannels: [],
      loop: -1,
    };
  }

  componentDidMount() {
    this.setState({
      loop: setInterval(() => {
        this.setState({
          engineChannels: MediaManager.engine ? Array.from(MediaManager.engine.channels.values()) : [],
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
    if (!this.state.engineChannels || this.state.engineChannels.length === 0) {
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
            <span className="text-gray-300 font-medium">No Active Engine Channels</span>
          </div>
        </div>
      );
    }
    return (
      <div className="space-y-3">
        {/* Medialib Engine Channels */}
        {this.state.engineChannels && this.state.engineChannels.length > 0 ? (
          <div className="bg-black bg-opacity-30 rounded-xl p-4 border border-purple-600 border-opacity-30">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 bg-purple-400 rounded-full" />
              <h3 className="text-white font-semibold text-lg">Engine Channels</h3>
              <span className="text-xs text-purple-300 ml-2">
                (
                {this.state.engineChannels.length}
                )
              </span>
            </div>
            <div className="grid gap-3">
              {this.state.engineChannels.map((ch, idx) => {
                const tracks = Array.from(ch.tracks.values());
                const tags = ch.tagSet ? Array.from(ch.tagSet.values ? ch.tagSet.values() : ch.tagSet) : [];
                return (
                  <div key={idx} className="bg-black bg-opacity-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${ch._isDestroying ? 'bg-red-400' : 'bg-green-400'}`} />
                        <div className="text-white font-medium">{ch.id}</div>
                        {tags && tags.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {tags.map((t) => (
                              <span key={`${ch.id}-tag-${t}`} className="px-1.5 py-0.5 text-[10px] rounded bg-purple-500 bg-opacity-20 text-purple-200 border border-purple-500 border-opacity-30">
                                {t}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-300">
                        <span>
                          Tracks:
                          {' '}
                          <span className="font-mono text-blue-300">{tracks.length}</span>
                        </span>
                        <span>
                          Ch Vol:
                          {' '}
                          <span className="font-mono text-cyan-300">{Math.round(ch.baseVolumePct ?? 0)}%</span>
                          <span className="font-mono text-amber-300 ml-1">→ {Math.round(ch.currentVolumePct ?? 0)}%</span>
                        </span>
                        {ch._pendingRemoveFinalizer ? (
                          <span className="text-red-300">pending-destroy</span>
                        ) : null}
                      </div>
                    </div>
                    {tracks.map((t, tIdx) => (
                      <div key={tIdx} className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-gray-300">
                        <div className="space-y-1">
                          <div>
                            <span className="text-gray-400">Track:</span>
                            {' '}
                            <span className="font-mono text-blue-300">{t.id}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">State:</span>
                            {' '}
                            <span className={`font-mono ${t.state === 'playing' ? 'text-green-300' : t.state === 'destroyed' ? 'text-gray-400' : 'text-yellow-300'}`}>{t.state}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Epoch:</span>
                            {' '}
                            <span className="font-mono text-purple-300">{t.epoch ?? 0}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div>
                            <span className="text-gray-400">Vol:</span>
                            {' '}
                            <span className="font-mono text-cyan-300">{Math.round((t.volume || 0) * 100)}%</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Speed:</span>
                            {' '}
                            <span className="font-mono text-purple-300">{t.speedPct || 100}%</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Loop:</span>
                            {' '}
                            <span className={`font-mono ${t.loop ? 'text-green-300' : 'text-gray-300'}`}>{t.loop ? 'YES' : 'NO'}</span>
                          </div>
                        </div>

                        {t.audio ? (
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Pos:</span>
                              <span className="font-mono text-blue-300">
                                {Number.isFinite(t.audio.currentTime) ? t.audio.currentTime.toFixed(2) : '0.00'}
                                {' '}
                                /
                                {' '}
                                {Number.isFinite(t.audio.duration) ? t.audio.duration.toFixed(2) : '0.00'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Ready:</span>
                              <span className="font-mono text-cyan-300">{t.audio.readyState}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Network:</span>
                              <span className="font-mono text-cyan-300">{t.audio.networkState}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Buffered Ranges:</span>
                              <span className="font-mono text-cyan-300">{t.audio.buffered?.length || 0}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Muted:</span>
                              <span className={`font-mono ${t.audio.muted ? 'text-red-300' : 'text-green-300'}`}>{t.audio.muted ? 'YES' : 'NO'}</span>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
