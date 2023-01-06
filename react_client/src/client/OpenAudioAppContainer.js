import {createContext} from "react";
import React from "react";

import {setGlobalState, store} from "../state/store";
import {connect} from "react-redux";
import {ReportError} from "./util/ErrorReporter";
import ClientTokenSet from "./login/ClientTokenSet";

export const OAC = createContext({});

class OpenAudioAppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleGlobalClick = this.handleGlobalClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            didUnlock: false,
            allowedToUnlock: false
        }
    }

    componentDidMount() {
        let sessionLoader = new ClientTokenSet()
        sessionLoader.initialize()
            .then(tokenSet => {
                if (tokenSet == null) {
                    ReportError('A faulty login attempt was done at ' + window.location.host, 'Steve')
                    setGlobalState({
                        isLoading: false,
                        currentUser: null,
                    })
                    return
                }

                // can we find a name? let's put it as a welcome text!
                // makes the experience a bit more personal
                if (tokenSet.name != null) {
                    setGlobalState({
                        currentUser: {
                            userName: tokenSet.name,
                            uuid: tokenSet.uuid,
                            token: tokenSet.token,
                            publicServerKey: tokenSet.publicServerKey,
                            scope: tokenSet.scope
                        }
                    });

                    // initialize OA here
                    this.setState({allowedToUnlock: true});
                }
            })
            .catch(console.error)
    }

    handleGlobalClick() {
        if (!this.state.didUnlock) {
            // initialize OpenAudio

        }

        if (this.state.allowedToUnlock) {
            setGlobalState({clickLock: false});
            this.setState({didUnlock: true});
        }
    }

    render() {
        return (
            <div className={"h-full"} onClick={this.handleGlobalClick}>
                <OAC.Provider value={store.getState()}>
                    {this.props.children}
                </OAC.Provider>
            </div>
        );
    }
}

export default connect(mapStateToProps)(OpenAudioAppContainer);
function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        clickLock: state.clickLock,
        isLoading: state.isLoading,
        loadingState: state.loadingState,
        lang: state.lang,
    };
}

export function getTranslation(context, message) {
    let m = context.lang[message];

    if (m === undefined) {
        console.error("Missing translation for: " + message);
        return "<????>";
    }

    if (context.currentUser) {
        m = m.replace("%player", context.currentUser.userName);
    }
    return m;
}