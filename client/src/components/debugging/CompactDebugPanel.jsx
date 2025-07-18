import React from 'react';
import PropTypes from 'prop-types';

export default function CompactDebugPanel(props) {
  const { data, title, color } = props;

  if (!data || data.length === 0) {
    return (
      <div className="bg-black bg-opacity-30 rounded-lg p-3 border border-gray-600 border-opacity-30">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-gray-500 rounded-full" />
          <span className="text-white font-medium text-sm">{title}</span>
        </div>
        <p className="text-gray-400 text-xs">No data</p>
      </div>
    );
  }

  const highest = Math.max(...data);
  const lowest = Math.min(...data);
  const average = data.reduce((a, b) => a + b, 0) / data.length;
  const latest = data[data.length - 1];

  // Create mini sparkline
  const sparklinePoints = data.slice(-120); // Last 120 points (show more history)
  const sparklineMax = Math.max(...sparklinePoints);
  const sparklineMin = Math.min(...sparklinePoints);
  const sparklineRange = sparklineMax - sparklineMin || 1;

  const sparklinePath = sparklinePoints.map((value, index) => {
    const x = (index / Math.max(sparklinePoints.length - 1, 1)) * 90 + 5; // Keep 5% margin on sides
    const y = 90 - ((value - sparklineMin) / sparklineRange) * 80 + 5; // Keep 5% margin on top/bottom
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="bg-black bg-opacity-30 rounded-lg p-3 border border-gray-600 border-opacity-30">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-white font-medium text-sm">{title}</span>
        </div>
        <span className="text-gray-300 font-mono text-xs">
          {typeof latest === 'number' ? latest.toFixed(2) : latest}
        </span>
      </div>

      {/* Mini Sparkline */}
      <div className="mb-3 overflow-hidden">
        <svg
          width="100%"
          height="64"
          viewBox="0 0 100 100"
          className="block w-full h-16"
          preserveAspectRatio="none"
        >
          <path
            d={sparklinePath}
            fill="none"
            stroke={color}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">Max:</span>
          <span className="text-white font-mono">
            {typeof highest === 'number' ? highest.toFixed(2) : highest}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Min:</span>
          <span className="text-white font-mono">
            {typeof lowest === 'number' ? lowest.toFixed(2) : lowest}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Avg:</span>
          <span className="text-white font-mono">
            {typeof average === 'number' ? average.toFixed(2) : average}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Pts:</span>
          <span className="text-white font-mono">{data.length}</span>
        </div>
      </div>
    </div>
  );
}

CompactDebugPanel.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  color: PropTypes.string,
};

CompactDebugPanel.defaultProps = {
  color: '#3B82F6',
};
