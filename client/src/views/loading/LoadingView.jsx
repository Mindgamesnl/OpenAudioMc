import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './loading.css';
import { LoadingSpinnerBox } from '../../components/loading/LoadingSpinnerBox';
import { VERSION } from '../../build';
import { BaseSegmentedPage } from '../../components/layout/BaseSegmentedPage';

function LoadingView(props) {
  return (
    <BaseSegmentedPage>
      <LoadingSpinnerBox
        title="Loading OpenAudioMc"
        message={props.loading}
        footer={`Version ${VERSION.revision}, line ${VERSION.tag}`}
      />
    </BaseSegmentedPage>
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
