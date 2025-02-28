import React from 'react';
import PropTypes from 'prop-types';

export function ChecklistItem(props) {
  let svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-6 w-6 text-red-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  if (props.checked) {
    svg = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6 text-green-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    );
  }

  if (props.loading) {
    svg = (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
      </div>
    );
  }

  return (
    <div
      className="flex items-start p-4 rounded-lg backdrop-blur-sm bg-black bg-opacity-40 border border-gray-800 shadow-md w-max max-w-2xl break-words"
      style={{ boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.05)' }}
    >
      <div
        className="flex-shrink-0 p-2 rounded-full bg-gray-900 bg-opacity-70 border border-gray-700 mt-1"
        style={{
          // eslint-disable-next-line no-nested-ternary
          boxShadow: props.checked
            ? '0 0 10px rgba(34, 197, 94, 0.3)'
            : props.loading
              ? '0 0 10px rgba(255, 255, 255, 0.2)'
              : '0 0 10px rgba(239, 68, 68, 0.3)',
        }}
      >
        {svg}
      </div>
      <div className="ml-4 flex-1 overflow-hidden">
        <div className="text-lg font-medium text-white break-words">
          {props.text}
        </div>
        <div className="text-sm text-gray-300 break-words">
          {props.subtext}
        </div>
      </div>
    </div>
  );
}

ChecklistItem.propTypes = {
  text: PropTypes.string,
  subtext: PropTypes.string,
  checked: PropTypes.bool,
  loading: PropTypes.bool,
};

ChecklistItem.defaultProps = {
  checked: false,
  text: 'Todo',
  subtext: 'This requires action',
  loading: false,
};
