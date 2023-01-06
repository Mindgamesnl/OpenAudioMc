import {createContext} from "react";
import React from "react";

import {setGlobalState, store} from "../state/store";
import {connect} from "react-redux";

export const OAC = createContext({});

class OpenAudioAppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleGlobalClick = this.handleGlobalClick.bind(this);
    }

    handleGlobalClick() {
        setGlobalState({clickLock: false});
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