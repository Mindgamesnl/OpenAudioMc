import React from 'react';

export default function CompactTransceiversPanel({ transceiverNames }) {
  return (
    <div className="bg-black bg-opacity-30 rounded-lg p-4 border border-gray-600 border-opacity-30">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          <span className="text-white font-medium text-sm">Transceivers</span>
        </div>
        <span className="text-gray-300 font-mono text-xs">
          {transceiverNames.length}
          {' '}
          active
        </span>
      </div>

      {transceiverNames.length > 0 ? (
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {transceiverNames.map((name, index) => (
            <div key={`${name}-${index}`} className="flex items-center space-x-2 py-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-300 font-mono text-xs truncate flex-1">
                {name}
              </span>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-3 bg-green-400 rounded" />
                <div className="w-1 h-2 bg-green-400 rounded opacity-75" />
                <div className="w-1 h-4 bg-green-400 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-2">
          <div className="inline-flex items-center space-x-2 text-gray-400 text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>No active transceivers</span>
          </div>
        </div>
      )}
    </div>
  );
}
