import { connect } from 'react-redux';
import React from 'react';
import { msg } from '../../client/OpenAudioAppContainer';

function ServerConnectionWarning(props) {
  if (props.isServerHealthy) {
    return null;
  }

  const message = msg('network.serverUnhealthy').replace('{serverName}', props.settings.serverDisplayName || 'the server');

  return (
    <div className="pb-4">
      <div className="bg-red-500 border border-red-400 text-white font-extrabold px-4 py-3 rounded relative flex justify-center" role="alert">
        <span className="block">{message}</span>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(ServerConnectionWarning);

function mapStateToProps(state) {
  return {
    isServerHealthy: state.isServerHealthy,
    settings: state.settings,
  };
}
