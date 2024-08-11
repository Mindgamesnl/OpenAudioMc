import React from 'react';
import PropTypes from 'prop-types';
import './oabutton.css';

export function VoicePageButton(props) {
  return (
    <button
      type="button"
      className={
        `oa-button-modern ${
          props.highlighted && props.highlightRed ? 'button-off ' : ''
        }${props.highlighted && props.highlightGreen ? 'button-on ' : ''
        }${props.isDisabled ? 'disabled ' : ''}`
      }
      onClick={props.onClick}
      disabled={props.isEnabled}
    >
      <div className="content">
        {props.children}
      </div>
    </button>
  );
}

// default props
VoicePageButton.defaultProps = {
  isDisabled: false,
  highlightRed: false,
  highlightGreen: false,
};

VoicePageButton.propTypes = {
  highlighted: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,

  highlightRed: PropTypes.bool,
  highlightGreen: PropTypes.bool,
};
