import React from 'react';

export function LogViewer(props) {
  const { log } = props;
  return (
    <div className="bg-gray-900 text-gray-400 p-4 rounded-lg h-full w-full">
      {log.map((message, id) => (
        <div key={`log${id}`}>
          <span className="text-green-400">{'$> '}</span>
          <span>{message}</span>
        </div>
      ))}
    </div>
  );
}
