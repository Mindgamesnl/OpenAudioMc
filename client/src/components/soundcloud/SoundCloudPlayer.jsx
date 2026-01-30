import React from 'react';
import { connect } from 'react-redux';

function SoundCloudPlayer(props) {
  if (!props.soundcloud.visible) {
    return null;
  }

  return (
    <a
      href={props.soundcloud.link}
      className="flex items-center gap-3 bg-gray-900 rounded-xl p-3 mt-4 hover:bg-gray-800 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        className="w-12 h-12 rounded-lg object-cover bg-gray-800"
        src={props.soundcloud.image}
        alt="Now playing"
      />
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-500">Now playing</p>
        <p className="text-white text-sm font-medium truncate">{props.soundcloud.title}</p>
      </div>
      <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}

export default connect(mapStateToProps)(SoundCloudPlayer);
function mapStateToProps(state) {
  return {
    soundcloud: state.soundcloud,
  };
}
