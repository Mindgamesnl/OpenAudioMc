import React from 'react';
import { connect } from 'react-redux';

function SoundCloudPlayer(props) {
  if (!props.soundcloud.visible) {
    return <div />;
  }

  return (
    <footer>
      <a href={props.soundcloud.link}>
        <img className="sc-cover" src={props.soundcloud.image} alt="Soundcloud now playing indicator" />
        <p className="sc-title">{props.soundcloud.title}</p>
      </a>
    </footer>
  );
}

export default connect(mapStateToProps)(SoundCloudPlayer);
function mapStateToProps(state) {
  return {
    soundcloud: state.soundcloud,
  };
}
