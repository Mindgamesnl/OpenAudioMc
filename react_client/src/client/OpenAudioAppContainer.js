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
    return context.lang[message];
}