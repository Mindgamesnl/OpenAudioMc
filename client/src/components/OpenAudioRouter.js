import React from "react";
import LoadingView from "../views/loading/LoadingView";
import {LoginView} from "../views/login/LoginView";
import ClientView from "../views/client/ClientView";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import BlockedLoginView from "../views/login/BlockedLoginView";
import {connect} from "react-redux";

class OpenAudioController extends React.Component {
    render() {
        let currentView = <div>?</div>;

        if (this.props.isLoading) {
            currentView = <LoadingView/>;
        } else if (this.props.isBlocked) {
            currentView = <BlockedLoginView/>;
        } else if (!this.props.currentUser) {
            currentView = <LoginView/>;
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
    };
}
