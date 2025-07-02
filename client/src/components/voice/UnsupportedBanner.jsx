import React from 'react';

export function UnsupportedBanner(props) {
  return (
    <div className="space-y-4">
      {/* Error Icon and Title */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-red-500 bg-opacity-20 backdrop-blur-lg rounded-xl border border-red-500 border-opacity-30">
          <svg
            className="w-6 h-6 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
          Voice Chat Unavailable
        </h2>
      </div>

      {/* Error Message */}
      <div className="bg-red-500 bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-red-500 border-opacity-20">
        <p className="text-red-300 text-lg leading-relaxed text-center">
          {props.children}
        </p>
      </div>

      {/* Support Message */}
      <div className="bg-black bg-opacity-30 backdrop-blur-lg rounded-xl p-4 border border-white border-opacity-10">
        <p className="text-gray-400 text-sm text-center">
          If you believe this is an error, try refreshing the page or contact server support.
        </p>
      </div>
    </div>
  );
}
