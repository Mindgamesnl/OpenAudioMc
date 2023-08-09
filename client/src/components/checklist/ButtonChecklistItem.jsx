import React from 'react';
import PropTypes from 'prop-types';
import { ChecklistItem } from './ChecklistItem';

export function ButtonChecklistItem(props) {
  return (
    <div className="flex items-center justify-center">
      {props.showButton ? (
        <button
          type="submit"
          onClick={props.buttonOnClick}
          className="bg-gray-800 py-4 px-2 rounded-md text-gray-50 mr-4"
        >
          {props.buttonContent}
        </button>
      ) : null}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <ChecklistItem {...props} />
    </div>
  );
}

ButtonChecklistItem.propTypes = {
  text: PropTypes.string,
  subtext: PropTypes.string,
  checked: PropTypes.bool,
  buttonContent: PropTypes.any,
  buttonOnClick: PropTypes.func,
  showButton: PropTypes.bool,
  loading: PropTypes.bool,
};

ButtonChecklistItem.defaultProps = {
  checked: false,
  text: 'Tiny penis joke',
  // You didn't see this
  subtext: 'Durex Condooms - Originals Classic Natural - 20 stuks',
  buttonContent: 'Place order',
  buttonOnClick: () => {
  },
  showButton: true,
  loading: false,
};
