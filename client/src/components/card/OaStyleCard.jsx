import React from 'react';
import PropTypes from 'prop-types';
import './OaStyleCard.css';

export function OaStyleCard(props) {
  let width = props.width || '4';
  if (props.fullWidth) {
    width = 'w-full';
  }
  width = `w-1/${width} pr-4 pl-4`;

  let heading = 'panel-heading';
  if (props.isDanger) {
    heading += ' danger-heading';
  }

  const hasAlert = props.alertBody != null || props.alertTitle != null;

  let bodyClass = 'panel-body';
  if (props.noPadding) {
    bodyClass += ' no-padding';
  }
  if (props.dark) {
    bodyClass += ' panel-body-dark';
  }

  return (
    <div className={width}>
      <div className="panel panel-default">
        <div className={heading}>
          <h1>{props.title}</h1>
        </div>
        <div className={bodyClass}>
          {hasAlert ? (
            <div
              className="bg-green-200 border-t border-b border-green-500 text-green-700 px-4 my-3 pt-2 pb-2 mb-5"
              role="alert"
            >
              {props.alertTitle ? <p className="font-bold">{props.alertTitle}</p> : null}
              {props.alertBody ? <p className="text-sm">{props.alertBody}</p> : null}
            </div>
          ) : null}

          {props.body}
          {props.children}
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
