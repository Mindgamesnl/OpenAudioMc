import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BlackoutPage } from '../../components/layout/BlackoutPage';
import './loading.css';
import { LoadingSpinnerBox } from '../../components/loading/LoadingSpinnerBox';
import { VERSION } from '../../build';

function LoadingView(props) {
  return (
    <BlackoutPage>
      <LoadingSpinnerBox
        title="Loading OpenAudioMc"
        message={props.loading}
        footer={`Version ${VERSION.revision}, line ${VERSION.tag}`}
      />
    </BlackoutPage>
  );
}

LoadingView.propTypes = {
  loading: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(LoadingView);
function mapStateToProps(state) {
  return {
    loading: state.loadingState,
  };
}
