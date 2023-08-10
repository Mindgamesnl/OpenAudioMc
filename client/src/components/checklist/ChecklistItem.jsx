import React from 'react';
import PropTypes from 'prop-types';
import './list.css';

export function ChecklistItem(props) {
  let svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-8 w-8 text-red-500"
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
        className="h-8 w-8 text-green-500"
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
    svg = <div className="checklist-loader p-2" />;
  }

  return (
    <div className="flex items-center p-3 rounded-md bg-gray-800">
      <div className="flex-shrink-0 p-1 rounded-full ml-1 bg-gray-700">
        {svg}
      </div>
      <div className="ml-3 pr-1">
        <div className="text-lg leading-6 font-medium text-gray-50">
          {props.text}
        </div>
        <div className="text-sm leading-6 font-medium text-gray-400">
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
