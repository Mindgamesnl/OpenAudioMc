import React from 'react';
import PropTypes from 'prop-types';
import './oabutton.css';

export class VoicePageButton extends React.Component {
  render() {
    return (
      <button
        type="button"
        className={
        `oa-button-modern ${
          this.props.highlighted && this.props.highlightRed ? 'button-off ' : ''
        }${this.props.highlighted && this.props.highlightGreen ? 'button-on ' : ''
        }${this.props.isDisabled ? 'disabled ' : ''}`
      }
        onClick={this.props.onClick}
        disabled={this.props.isEnabled}
      >
        <div className="content">
          {this.props.children}
        </div>
      </button>
    );
  }
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
