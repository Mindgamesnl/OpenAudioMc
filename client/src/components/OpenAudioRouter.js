import React from "react";
import LoadingView from "../views/loading/LoadingView";
import {LoginView} from "../views/login/LoginView";
import ClientView from "../views/client/ClientView";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import BlockedLoginView from "../views/login/BlockedLoginView";
import {connect} from "react-redux";
import {BadBrowser} from "../views/login/BadBrowserView";
import {hasUserMedia} from "../client/services/voice/util/WrappedUserMedia";
import {TokenScannerView} from "../views/login/TokenScannerView";

class OpenAudioController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            preflightOk: true,
            errorMessage: null,
        }
    }

    componentDidMount() {
        // skip this if we're running in react dev mode, meaning that the link either has a port and starts with 192 or is localhost
        if (window.location.port && (window.location.hostname.startsWith("192") || window.location.hostname === "localhost")) {
            return;
        }

        // check if AudioContext is supported
        if (!window.AudioContext && !window.webkitAudioContext) {
            this.setState({preflightOk: false, errorMessage: "Your browser does not support the AudioContext API. Please use a modern browser like Chrome or Firefox."});
            return
        }

        // check if webrtc is supported
        if (!hasUserMedia()) {
            this.setState({preflightOk: false, errorMessage: "Your browser does not support the WebRTC API. Please use a modern browser like Chrome or Firefox."});
            return
        }

        // check if websockets are supported
        if (!window.WebSocket) {
            this.setState({preflightOk: false, errorMessage: "Your browser does not support the WebSocket API. Please use a modern browser like Chrome or Firefox."});
            return
        }

        // check if PannerNode is supported
        if (!window.PannerNode) {
            this.setState({preflightOk: false, errorMessage: "Your browser does not support the PannerNode API. Please use a modern browser like Chrome or Firefox."});
            return
        }
    }

    render() {
        let currentView = <div>?</div>;

        if (!this.state.preflightOk) {
            currentView = <BadBrowser message={this.state.errorMessage}/>;
        } else if (this.props.isLoading) {
            currentView = <LoadingView/>;
        } else if (this.props.isBlocked) {
            currentView = <BlockedLoginView/>;
        } else if (!this.props.currentUser) {
            if (this.props.useScanLogin) {
                // use the scanner view
                currentView = <TokenScannerView/>;
            } else {
                // use the normal login view
                currentView = <LoginView/>;
            }
        } else {
            currentView = <ClientView/>;
        }


        return (
            <div className={"h-full w-full"}>
                <ToastContainer/>
                {currentView}
            </div>
        );
    }
}

export default connect(mapStateToProps)(OpenAudioController);

function mapStateToProps(state) {
    return {
        isLoading: state.isLoading,
        isBlocked: state.isBlocked,
        currentUser: state.currentUser,
        useScanLogin: state.useScanLogin,
    };
}
