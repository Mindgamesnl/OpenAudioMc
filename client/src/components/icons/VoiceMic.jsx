import React from 'react';
import PropTypes from 'prop-types';

export function VoiceMicButtonContent(props) {
  if (props.muted) {
    return (
      <svg
        className="icon"
        viewBox="0 0 19 24"
        width="95%"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="1" y1="1" x2="23" y2="23" />
        <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" fill="transparent" />
        <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" fill="transparent" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    );
  }

  return (
    <svg className="icon" fill="none" viewBox="0 0 19 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
      />
    </svg>
  );
}

VoiceMicButtonContent.defaultProps = {
  muted: false,
};

VoiceMicButtonContent.propTypes = {
  muted: PropTypes.bool,
};
