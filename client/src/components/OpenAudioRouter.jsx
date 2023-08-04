import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingView from '../views/loading/LoadingView';
import { LoginView } from '../views/login/LoginView';
import ClientView from '../views/client/ClientView';
import BlockedLoginView from '../views/login/BlockedLoginView';
import { BadBrowser } from '../views/login/BadBrowserView';

class OpenAudioController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preflightOk: true,
      errorMessage: null,
    };
  }

  componentDidMount() {
    // check if AudioContext is supported
    if (!window.AudioContext && !window.webkitAudioContext) {
      this.setState({ preflightOk: false, errorMessage: 'Your browser does not support the AudioContext API. Please use a modern browser like Chrome or Firefox.' });
      return;
    }

    // check if webrtc is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.setState({ preflightOk: false, errorMessage: 'Your browser does not support the WebRTC API. Please use a modern browser like Chrome or Firefox.' });
      return;
    }

    // check if websockets are supported
    if (!window.WebSocket) {
      this.setState({ preflightOk: false, errorMessage: 'Your browser does not support the WebSocket API. Please use a modern browser like Chrome or Firefox.' });
      return;
    }

    // enforce PeerConnection
    if (!window.RTCPeerConnection) {
      this.setState({ preflightOk: false, errorMessage: 'Your browser does not support the RTCPeerConnection API. Please use a modern browser like Chrome or Firefox.' });
      return;
    }

    // check if PannerNode is supported
    if (!window.PannerNode) {
      this.setState({ preflightOk: false, errorMessage: 'Your browser does not support the PannerNode API. Please use a modern browser like Chrome or Firefox.' });
    }
  }

  render() {
    let currentView = null;

    const { preflightOk, errorMessage } = this.state;
    const { isLoading, isBlocked, currentUser } = this.props;

    if (!preflightOk) {
      currentView = <BadBrowser message={errorMessage} />;
    } else if (isLoading) {
      currentView = <LoadingView />;
    } else if (isBlocked) {
      currentView = <BlockedLoginView />;
    } else if (!currentUser) {
      currentView = <LoginView />;
    } else {
      currentView = <ClientView />;
    }

    return (
      <div className="h-full w-full">
        {currentView}

        <ToastContainer
          position="bottom-right"
        />

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    isBlocked: state.isBlocked,
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(OpenAudioController);
