import React from 'react';
import { VERSION } from '../../build';
import { getGlobalState } from '../../state/store';

export default function CompactSystemInfo() {
  const state = getGlobalState();

  return (
    <div className="bg-black bg-opacity-30 rounded-lg p-4 border border-gray-600 border-opacity-30">
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Build:</span>
            <span className="text-blue-300 font-mono">{VERSION.build}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Tag:</span>
            <span className="text-blue-300 font-mono">{VERSION.tag}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Player:</span>
            <span className="text-green-300 font-medium truncate max-w-[8rem]">
              {state.currentUser?.userName || 'Unknown'}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Date:</span>
            <span className="text-blue-300 font-mono text-right">{VERSION.date}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-600 border-opacity-30">
        <div className="text-xs text-gray-400">
          Toggle debug with
          {' '}
          <kbd className="px-1 py-0.5 bg-gray-700 rounded text-blue-300 font-mono text-xs">d</kbd>
        </div>
      </div>
    </div>
  );
}
