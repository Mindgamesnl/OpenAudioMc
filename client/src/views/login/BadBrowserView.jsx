import React from 'react';
import PropTypes from 'prop-types';
import { BlackoutPage } from '../../components/layout/BlackoutPage';

export function BadBrowser(props) {
  return (
    <BlackoutPage>
      <div className="py-12">
        <div className="card flex-shrink-0 w-full max-w-sm  bg-base-100">
          <div className="card-body">
            <div>
              <p className="w-full text-center text-2xl mb-8 text-white tracking-wide cursor-pointer">
                Your browser is not supported. Please use a modern browser like Chrome, Firefox or Edge.
              </p>

              <p className="w-full text-center text-xl mb-8 text-white tracking-wide cursor-pointer">
                Please contact the server administrator to resolve this issue.
                <hr />
                Error:
                {' '}
                {props.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </BlackoutPage>
  );
}

BadBrowser.propTypes = {
  message: PropTypes.string.isRequired,
};
