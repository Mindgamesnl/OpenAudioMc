import React from 'react';
import { Radar } from '../graph/Radar';

export default function CompactSpatialPanel({ playerLocation, peers, speakers }) {
  return (
    <div className="bg-black bg-opacity-30 rounded-lg p-4 border border-gray-600 border-opacity-30">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full" />
          <span className="text-white font-medium text-sm">Spatial</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-gray-400">Entities:</span>
          <span className="text-green-300 font-mono">{peers.length}</span>
          <span className="text-gray-400">Speakers:</span>
          <span className="text-blue-300 font-mono">{speakers.length}</span>
        </div>
      </div>

      {/* Compact Radar */}
      <div className="mb-3" style={{ height: '120px' }}>
        <Radar
          player={playerLocation}
          entities={peers}
          speakers={speakers}
        />
      </div>

      {/* Compact Position Info */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-400">X:</span>
            <span className="text-white font-mono">{playerLocation.x.toFixed(1)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Y:</span>
            <span className="text-white font-mono">{playerLocation.y.toFixed(1)}</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-400">Z:</span>
            <span className="text-white font-mono">{playerLocation.z.toFixed(1)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Yaw:</span>
            <span className="text-white font-mono">
              {playerLocation.yaw ? `${playerLocation.yaw.toFixed(0)}°` : '--'}
            </span>
          </div>
        </div>
      </div>

      {peers.length === 0 && (
        <div className="mt-2 text-center">
          <span className="text-gray-400 text-xs italic">No peers in range</span>
        </div>
      )}
    </div>
  );
}
