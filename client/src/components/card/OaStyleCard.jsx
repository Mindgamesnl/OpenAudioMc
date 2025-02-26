/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

export function OaStyleCard({
  title,
  body,
  isDanger,
  width,
  alertBody,
  alertTitle,
  fullWidth,
  dark,
  noPadding,
  children,
}) {
  // Handle width classes
  const getWidthClass = () => {
    if (fullWidth) return 'w-full';
    const numWidth = width || '4';
    return `w-1/${numWidth}`;
  };

  // Get accent color from CSS variable or fallback to default
  const accentColor = 'var(--accent-color, #6366f1)';
  const dangerColor = '#EF4444';

  return (
    <div className={`${getWidthClass()} px-4 relative`}>
      <div
        className={`
          backdrop-blur-xl relative overflow-hidden rounded-xl
          ${isDanger
          ? 'bg-black bg-opacity-30 border'
          : dark
            ? 'bg-black bg-opacity-40 border'
            : 'bg-black bg-opacity-30 border'
        }
          shadow-xl hover:shadow-2xl
          transition-all duration-300
        `}
        style={{
          borderColor: isDanger ? dangerColor : accentColor,
          borderWidth: '1px',
        }}
      >
        {/* Background glow effects */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {isDanger ? (
            <>
              <div
                className="absolute -left-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: dangerColor }}
              />
              <div
                className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-3xl opacity-10"
                style={{ backgroundColor: '#F97316' }}
              />
            </>
          ) : (
            <>
              <div
                className="absolute -left-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: accentColor }}
              />
              <div
                className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-3xl opacity-10"
                style={{ backgroundColor: dark ? '#8B5CF6' : accentColor }}
              />
            </>
          )}
        </div>

        {/* Header */}
        <div
          className={`
          relative z-10
          px-6 py-4
          border-b
          ${isDanger
            ? 'border-opacity-30'
            : 'border-opacity-20'
        }
        `}
          style={{ borderColor: isDanger ? dangerColor : accentColor }}
        >
          <h1 className="text-lg font-semibold text-white">
            {title}
          </h1>
        </div>

        {/* Content */}
        <div className={`
          relative z-10
          ${noPadding ? '' : 'p-6'}
          text-gray-300
        `}
        >
          {/* Alert */}
          {(alertBody || alertTitle) ? (
            <div className="mb-6 rounded-lg p-4 backdrop-blur-sm bg-black bg-opacity-30 border border-opacity-30 border-blue-500">
              {alertTitle ? (
                <div className="font-medium mb-1 text-blue-300">
                  {alertTitle}
                </div>
              ) : null}
              {alertBody ? (
                <div className="text-sm text-blue-100">
                  {alertBody}
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Main content */}
          <div className="relative">
            {body}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

OaStyleCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.element,
  isDanger: PropTypes.bool,
  width: PropTypes.string,
  alertBody: PropTypes.string,
  alertTitle: PropTypes.string,
  fullWidth: PropTypes.bool,
  dark: PropTypes.bool,
  noPadding: PropTypes.bool,
};

OaStyleCard.defaultProps = {
  body: null,
  isDanger: false,
  width: null,
  alertBody: null,
  alertTitle: null,
  fullWidth: false,
  dark: false,
  noPadding: false,
};

export default OaStyleCard;
