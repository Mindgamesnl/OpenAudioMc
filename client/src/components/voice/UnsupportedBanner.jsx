import React from 'react';

export function UnsupportedBanner(props) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-red-900 flex items-center justify-center flex-shrink-0">
          <svg
            className="w-5 h-5 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="min-w-0">
          <span className="text-white font-semibold">Voice Chat Unavailable</span>
          <p className="text-gray-500 text-sm">{props.children}</p>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-gray-800 rounded-lg p-3">
        <p className="text-gray-400 text-xs">
          Try refreshing the page or contact server support if the issue persists.
        </p>
      </div>
    </div>
  );
}
