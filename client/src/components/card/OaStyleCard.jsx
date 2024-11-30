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

  return (
    <div className={`${getWidthClass()} px-4 relative`}>
      <div
        className={`
          relative overflow-hidden rounded-xl
          ${dark ? 'bg-slate-900' : 'bg-white'}
          border border-slate-200 dark:border-slate-800
          ${isDanger ? 'border-red-200 dark:border-red-900' : ''}
          shadow-sm hover:shadow-md
          transition-all duration-300
        `}
      >
        {/* Decorative gradient blur */}
        {!isDanger && !dark && (
          <div className="absolute inset-0 z-0">
            <div className="absolute -left-4 -top-24 w-48 h-48 bg-blue-500 opacity-10 rounded-full blur-3xl" />
            <div className="absolute -right-4 -bottom-24 w-48 h-48 bg-purple-500 opacity-10 rounded-full blur-3xl" />
          </div>
        )}

        {/* Danger state decorative elements */}
        {isDanger ? (
          <div className="absolute inset-0 z-0">
            <div className="absolute -left-4 -top-24 w-48 h-48 bg-red-500 opacity-10 rounded-full blur-3xl" />
            <div className="absolute -right-4 -bottom-24 w-48 h-48 bg-orange-500 opacity-10 rounded-full blur-3xl" />
          </div>
        ) : null}

        {/* Dark mode decorative elements */}
        {dark ? (
          <div className="absolute inset-0 z-0">
            <div className="absolute -left-4 -top-24 w-48 h-48 bg-indigo-500 opacity-5 rounded-full blur-3xl" />
            <div className="absolute -right-4 -bottom-24 w-48 h-48 bg-purple-500 opacity-5 rounded-full blur-3xl" />
          </div>
        ) : null}

        {/* Header */}
        <div className={`
          relative z-10
          px-6 py-4
          border-b
          // eslint-disable-next-line no-nested-ternary
          ${isDanger ? 'bg-red-50 dark:bg-red-950 border-red-100 dark:border-red-900'
          : dark ? 'bg-slate-900 border-slate-800'
            : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800'}
        `}
        >
          <h1 className={`
            text-lg font-semibold
            ${isDanger ? 'text-red-900 dark:text-red-200'
            : dark ? 'text-white'
              : 'text-slate-900 dark:text-slate-200'}
          `}
          >
            {title}
          </h1>
        </div>

        {/* Content */}
        <div className={`
          relative z-10
          ${noPadding ? '' : 'p-6'}
          ${dark ? 'text-slate-200' : 'text-slate-600'}
        `}
        >
          {/* Alert */}
          {(alertBody || alertTitle) ? (
            <div className={`
              mb-6 rounded-lg p-4
              bg-blue-50 dark:bg-blue-950
              border border-blue-100 dark:border-blue-900
              text-blue-900 dark:text-blue-200
            `}
            >
              {alertTitle ? (
                <div className="font-medium mb-1">
                  {alertTitle}
                </div>
              ) : null}
              {alertBody ? (
                <div className="text-sm opacity-90">
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
