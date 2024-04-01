import { connect } from 'react-redux';
import React from 'react';
import { msg } from '../../client/OpenAudioAppContainer';

function MediaSlowWarning(props) {
  if (!props.isMediaSlow) {
    return null;
  }

  const message = msg('network.mediaSlow').replace('{serverName}', props.settings.serverDisplayName || 'the server');

  return (
    <div className="pb-4">
      <div className="bg-red-500 border border-red-400 text-white font-extrabold px-4 py-3 rounded relative flex justify-center" role="alert">
        <span className="block">{message}</span>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(MediaSlowWarning);

function mapStateToProps(state) {
  return {
    isMediaSlow: state.isMediaSlow,
    settings: state.settings,
  };
}
