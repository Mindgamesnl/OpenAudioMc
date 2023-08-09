import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BlackoutPage } from '../../components/layout/BlackoutPage';

function BlockedLoginView(props) {
  return (
    <BlackoutPage>
      <div className="py-12">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div>
              {props.isPersonalBlock ? (
                <p className="w-80 text-center text-sm mb-8 text-white tracking-wide cursor-pointer">
                  You are currently blocked from using OpenAudioMc. Please contact support at
                  {' '}
                  <a href="https://discord.openaudiomc.net/">https://discord.openaudiomc.net/</a>
                  {' '}
                  to appeal.
                </p>
              ) : null}

              {!props.isPersonalBlock && (
                <p className="w-80 text-center text-sm mb-8 text-white tracking-wide cursor-pointer">
                  This server/account is (temporarily) blocked from using OpenAudioMc.
                  If you&apos;re the owner of this server, please contact support at
                  {' '}
                  <a href="https://discord.openaudiomc.net/">https://discord.openaudiomc.net/</a>
                  {' '}
                  to appeal.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </BlackoutPage>
  );
}

BlockedLoginView.propTypes = {
  isPersonalBlock: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(BlockedLoginView);
function mapStateToProps(state) {
  return {
    isPersonalBlock: state.isPersonalBlock,
  };
}
