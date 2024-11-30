/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

export function CheckboxSetting({
  title, description, icon, isChecked, buttonText, onChange,
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-3 mb-4">
        <div
          className="w-6 h-6"
          style={{ color: 'var(--primary-accent)' }}
          dangerouslySetInnerHTML={{ __html: icon }}
        />
        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      <p className="text-sm opacity-80 mb-6 flex-grow">
        {description}
      </p>

      <label className="flex items-center cursor-pointer group">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={onChange}
        />
        <div
          className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
            isChecked ? 'bg-primary-accent' : 'bg-gray-600'
          }`}
          style={{
            backgroundColor: isChecked ? 'var(--primary-accent)' : 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${
              isChecked ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </div>
        <span className="ml-3 text-sm font-medium group-hover:opacity-80">
          {buttonText}
        </span>
      </label>
    </div>
  );
}

export function SettingsInputs({
  title, description, icon, options, value, onChange,
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-3 mb-4">
        <div
          className="w-6 h-6"
          style={{ color: 'var(--primary-accent)' }}
          dangerouslySetInnerHTML={{ __html: icon }}
        />
        <h3 className="text-lg font-medium">{title}</h3>
      </div>

      <p className="text-sm opacity-80 mb-6 flex-grow">
        {description}
      </p>

      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-lg bg-opacity-10 border border-white border-opacity-10 focus:border-opacity-20 focus:outline-none transition-colors duration-200"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 'var(--common-border-radius)',
        }}
      >
        {options.map((option) => (
          <option
            key={option.key}
            value={option.key}
            className="bg-gray-800"
          >
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
}

CheckboxSetting.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

SettingsInputs.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
