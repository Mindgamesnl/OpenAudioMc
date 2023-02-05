import React from "react";
import LoadingView from "../views/loading/LoadingView";
import {OAC} from "../client/OpenAudioAppContainer";
import {LoginView} from "../views/login/LoginView";
import ClientView from "../views/client/ClientView";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

export class OpenAudioController extends React.Component {
    static contextType = OAC;

    render() {
        let currentView = <div>?</div>;
        let oa = this.context;

        if (oa.isLoading) {
            currentView = <LoadingView/>;
        } else if (!oa.currentUser) {
            currentView = <LoginView/>;
        } else {
            currentView = <ClientView/>;
        }

        return (
            <div className={"h-full w-full"}>
                <ToastContainer />
                {currentView}
            </div>
        );
    }
}