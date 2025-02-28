import React from 'react';
import { connect } from 'react-redux';
import CriticalErrorPage from './CriticalErrorPage';

class CriticalErrorWrapper extends React.Component {
  render() {
    // is there a critical error?
    if (!this.props.criticalError) {
      return this.props.children;
    }

    return (
      <CriticalErrorPage
        code={this.props.criticalError.code}
        title={this.props.criticalError.title}
        description={this.props.criticalError.description}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    criticalError: state.criticalError,
  };
}

export default connect(mapStateToProps)(CriticalErrorWrapper);
