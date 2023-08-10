import React from 'react';
import PropTypes from 'prop-types';
import { OaStyleCard } from '../card/OaStyleCard';

export function LoadingSpinnerBox(props) {
  return (
    <OaStyleCard
      title={props.title}
      fullWidth
      body={(
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="loader ease-linear rounded-full border-4 border-t-4 border-gray-800 h-12 w-12"
            />
            <div className="flex flex-col ml-3">
              <div className="font-medium leading-none text-gray-600">{props.title}</div>
              <p className="text-sm text-gray-800 leading-none mt-1">
                {props.message}
              </p>
              <small className="text-gray-500 inline">{props.footer}</small>
            </div>
          </div>
        </div>
      )}
    />
  );
}

LoadingSpinnerBox.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  footer: PropTypes.string,
};

LoadingSpinnerBox.defaultProps = {
  title: 'Loading',
  message: 'Please wait...',
  footer: 'no details available',
};
