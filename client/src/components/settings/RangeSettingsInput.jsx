import React, { useState } from 'react';

/**
 * RangeSetting component for controlling numeric settings with a slider
 *
 * @param {Object} props
 * @param {string} props.title - Setting title
 * @param {string} props.description - Setting description
 * @param {string} props.icon - SVG icon as string
 * @param {number} props.min - Minimum value
 * @param {number} props.max - Maximum value
 * @param {number} props.step - Step increment
 * @param {number} props.value - Current value
 * @param {Function} props.onChange - Callback when value changes
 * @param {Array} props.valueLabels - Optional array of {value, label} objects for labeled positions
 */
export function RangeSetting({
  title,
  description,
  icon,
  min,
  max,
  step,
  value,
  onChange,
  // eslint-disable-next-line
  valueLabels = [],
}) {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setCurrentValue(newValue);
    onChange(newValue);
  };

  // Calculate percentage for background gradient
  const percentage = ((currentValue - min) / (max - min)) * 100;

  // Find closest label for display
  const getDisplayLabel = () => {
    if (valueLabels.length === 0) return currentValue.toFixed(1);

    // Find the nearest label
    let closestLabel = null;
    let minDistance = Infinity;

    valueLabels.forEach(({ value: labelValue, label }) => {
      const distance = Math.abs(labelValue - currentValue);
      if (distance < minDistance) {
        minDistance = distance;
        closestLabel = label;
      }
    });

    // If very close to a labeled value, show the label, otherwise show the value
    if (minDistance < step * 2) {
      return closestLabel;
    }

    return currentValue.toFixed(1);
  };

  // Create tick marks for labels
  const renderTicks = () => {
    if (valueLabels.length === 0) return null;

    return (
      <div className="relative w-full h-6 mt-1">
        {valueLabels.map(({ value: tickValue, label }) => {
          const position = ((tickValue - min) / (max - min)) * 100;
          return (
            <div
              key={tickValue}
              className="absolute transform -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${position}%` }}
            >
              <div className="h-2 w-1 bg-gray-400" />
              <span className="text-xs text-gray-400 mt-1">{label}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="flex items-center mb-4">
        {icon ? (
          <div
            className="w-10 h-10 mr-4 text-blue-500"
            dangerouslySetInnerHTML={{ __html: icon }}
          />
        ) : null}
        <div>
          <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>

      <div className="mb-2 flex justify-between items-center">
        <span className="text-sm text-white font-medium">{min.toFixed(1)}</span>
        <span className="text-sm text-white font-medium bg-blue-500 px-2 py-1 rounded-full">
          {getDisplayLabel()}
        </span>
        <span className="text-sm text-white font-medium">{max.toFixed(1)}</span>
      </div>

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, rgba(255, 255, 255, 0.1) ${percentage}%, rgba(255, 255, 255, 0.1) 100%)`,
          }}
        />
      </div>

      {renderTicks()}
    </div>
  );
}

// For backward compatibility
export { CheckboxSetting, SettingsInputs } from './SettingsInputs';
