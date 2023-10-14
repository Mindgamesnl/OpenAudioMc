import React from 'react';
import PropTypes from 'prop-types';

export function CheckboxSetting(props) {
  return (
    <div className="content-card w-full h-full">
      <span className="inline">
        <div dangerouslySetInnerHTML={{ __html: props.icon }} className="inline" />
        {props.title}
      </span>
      <div className="content-card-content content-card-content-border-bottom">
        {props.description}
      </div>
      <div className="content-card-buttons">
        <label className="content-pill status-button" htmlFor={props.title}>
          <input
            type="checkbox"
            id={props.title}
            className="inline mr-2"
            checked={props.isChecked}
            onChange={props.onChange}
          />
          <span className="inline">{props.buttonText}</span>
        </label>
      </div>
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
