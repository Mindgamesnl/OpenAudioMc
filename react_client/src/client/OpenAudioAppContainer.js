import { createContext } from "react";
import React from "react";
import {OpenAudioMcReact} from "./OpenAudioMcReact";

export const OAC = createContext({});

export class OpenAudioAppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.handleGlobalClick = this.handleGlobalClick.bind(this);
        this.set = this.set.bind(this);

        this.state = {
            // app instance
            app: new OpenAudioMcReact(),

            // state - null for the login screen
            currentUser: {
                'name': 'Toetje',
                'uuid': "2fb3a3e2-64ca-433d-8692-ff9d35bc6f92"
            },

            // click lock
            clickLock: true,

            // view states
            isLoading: false,
            loadingState: 'Preparing to load OpenAudioMc',
            set: this.set
        }

    }

    set(data) {
        this.setState(data);
    }

    handleGlobalClick() {
        if (this.state.clickLock) {
            this.setState({ clickLock: false });
        }
    }

    render() {
        return (
            <div className={"h-full"} onClick={this.handleGlobalClick}>
                <OAC.Provider value={this.state}>
                    {this.props.children}
                </OAC.Provider>
            </div>
        );
    }

}
