import { createContext } from "react";
import React from "react";

export const OAC = createContext({});

export class OpenAudioAppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // app instance
            app: null,

            // state - null for the login screen
            currentUser: {
                'name': 'Toetje',
                'uuid': "2fb3a3e2-64ca-433d-8692-ff9d35bc6f92"
            },

            // view states
            isLoading: false,
            loadingState: 'Preparing to load OpenAudioMc',
        }
    }

    render() {
        return (
            <OAC.Provider value={this.state}>
                {this.props.children}
            </OAC.Provider>
        );
    }

}