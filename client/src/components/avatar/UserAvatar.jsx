import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function UserAvatar(props) {
  let playerUuid = '00000000-0000-0000-0000-000000000000';
  if (props.currentUser && props.currentUser.uuid) {
    playerUuid = props.currentUser.uuid;
  }

  return (
    <img
      src={`https://visage.surgeplay.com/face/512/${playerUuid}`}
      className={props.classes}
      alt="avatar"
    />
  );
}

UserAvatar.propTypes = {
  classes: PropTypes.string,
};

// setup props
UserAvatar.defaultProps = {
  classes: 'h-8 w-8 rounded-xl mx-2',
};

export default connect(mapStateToProps)(UserAvatar);

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}
