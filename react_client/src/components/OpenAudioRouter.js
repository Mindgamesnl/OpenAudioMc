import React, {useContext} from "react";
import LoadingView from "../views/loading/LoadingView";
import {OAC} from "../client/OpenAudioAppContainer";
import {LoginView} from "../views/login/LoginView";
import {ClientView} from "../views/client/ClientView";

export class OpenAudioController extends React.Component {
    static contextType = OAC;

    constructor(props) {
        super(props);
    }

    render() {
        let currentView = <div>?</div>;
        let oa = this.context;

        if (oa.isLoading) {
            currentView = <LoadingView />;
        } else if (!oa.currentUser) {
            currentView = <LoginView />;
        } else {
            currentView = <ClientView />;
        }

        return (
            currentView
        );
    }
}