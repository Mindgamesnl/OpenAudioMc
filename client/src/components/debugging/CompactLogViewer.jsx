import React from 'react';

export default function CompactLogViewer({ log }) {
  if (!log || log.length === 0) {
    return (
      <div className="bg-black bg-opacity-30 rounded-lg p-4 border border-gray-600 border-opacity-30">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-2 h-2 bg-yellow-400 rounded-full" />
          <span className="text-white font-medium text-sm">System Logs</span>
        </div>
        <div className="text-center py-4">
          <span className="text-gray-400 text-xs italic">No log entries</span>
        </div>
      </div>
    );
  }

  // Get recent logs (last 50)
  const recentLogs = log.slice(-50);

  const getLogLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'error':
        return 'text-red-400 bg-red-500 bg-opacity-10 border-red-500 border-opacity-30';
      case 'warn':
      case 'warning':
        return 'text-yellow-400 bg-yellow-500 bg-opacity-10 border-yellow-500 border-opacity-30';
      case 'info':
        return 'text-blue-400 bg-blue-500 bg-opacity-10 border-blue-500 border-opacity-30';
      case 'debug':
        return 'text-gray-400 bg-gray-500 bg-opacity-10 border-gray-500 border-opacity-30';
      default:
        return 'text-gray-300 bg-gray-600 bg-opacity-10 border-gray-600 border-opacity-30';
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="bg-black bg-opacity-30 rounded-lg border border-gray-600 border-opacity-30">
      <div className="flex items-center justify-between p-4 border-b border-gray-600 border-opacity-30">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full" />
          <span className="text-white font-medium text-sm">System Logs</span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-gray-400">Entries:</span>
          <span className="text-white font-mono">{log.length}</span>
          <span className="text-gray-400">Showing:</span>
          <span className="text-yellow-300 font-mono">{Math.min(50, log.length)}</span>
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto">
        <div className="p-2 space-y-1">
          {recentLogs.map((entry, index) => (
            <div key={index} className="flex items-start space-x-2 py-1 px-2 rounded hover:bg-black hover:bg-opacity-20 transition-colors">
              <span className="text-gray-500 font-mono text-xs leading-5 min-w-[4rem]">
                {formatTimestamp(entry.timestamp)}
              </span>
              <span className={`px-1.5 py-0.5 rounded text-xs font-mono leading-4 border ${getLogLevelColor(entry.level)} min-w-[3rem] text-center`}>
                {(entry.level || 'LOG').toUpperCase().slice(0, 4)}
              </span>
              <span className="text-gray-300 text-xs leading-5 flex-1 break-words">
                {entry.message || entry.text || String(entry)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
