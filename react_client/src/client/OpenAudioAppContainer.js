import {createContext} from "react";
import React from "react";

import {setGlobalState, store} from "../state/store";
import {connect} from "react-redux";
import {ReportError} from "./util/ErrorReporter";
import ClientTokenSet from "./login/ClientTokenSet";
import {MessageModule} from "./translations/MessageModule";
import {API_ENDPOINT} from "./config/ApiEndpoints";
import {changeColor} from "./util/colors";

export const OAC = createContext({});
let oldColors = ["#2c78f6", "#4F46E5"]

class OpenAudioAppContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleGlobalClick = this.handleGlobalClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.messageModule = new MessageModule()

        this.state = {
            didUnlock: false,
            allowedToUnlock: false
        }
    }

    componentDidMount() {
        setGlobalState({loadingState: "Loading language files..."});
        let sessionLoader = new ClientTokenSet()

        this.messageModule.loadDefault()
            .then(() => {
                setGlobalState({loadingState: "Attempting login"});
            })
            .then(() => sessionLoader.initialize())

            // load player token
            .then(tokenSet => {
                if (tokenSet == null) {
                    ReportError('A faulty login attempt was done at ' + window.location.host, 'Steve')
                    setGlobalState({
                        isLoading: false,
                        currentUser: null,
                    })
                    return
                }
                setGlobalState({
                    currentUser: {
                        userName: tokenSet.name,
                        uuid: tokenSet.uuid,
                        token: tokenSet.token,
                        publicServerKey: tokenSet.publicServerKey,
                        scope: tokenSet.scope
                    },
                    loadingState: "Welcome " + tokenSet.name + "! Loading your data...",
                });
                return tokenSet;
            })

            // load server
            .then(async tokenSet => {
                let publicServerKey = tokenSet.publicServerKey;

                // fetch server data
                let serverDataRaw = await fetch(API_ENDPOINT.GET_SETTINGS + publicServerKey);

                if (serverDataRaw.status !== 200) {
                    ReportError('Failed to get server details from ' + publicServerKey + ' at ' + window.location.host, tokenSet.name)
                    setGlobalState({
                        isLoading: false,
                        currentUser: null,
                    })
                    throw new Error("Failed to get server details from " + publicServerKey);
                }
                let serverData = await serverDataRaw.json();
                if (serverData.error !== "NONE") {
                    ReportError('Failed to get server details from ' + publicServerKey + ' at ' + window.location.host, tokenSet.name)
                    setGlobalState({
                        isLoading: false,
                        currentUser: null,
                    })
                    throw new Error("Failed to get server details from " + publicServerKey);
                }

                serverData = serverData.response;

                setGlobalState({
                    currentServer: serverData,

                    // overwrite some messages
                    lang: {
                        "home.welcome": serverData.welcomeMessage,
                        "home.activateText": serverData.startButton,
                        "home.header": serverData.activeMessage,
                    }
                });

                setBgColor(serverData.color)
                document.title = serverData.title;

                if (serverData.startSound != "") {
                    // TODO: play start sound
                }

                if (serverData.backgroundImage != "") {
                    setBgImage(serverData.backgroundImage)
                }

            })

            // finished! show home page :)
            .then(() => {
                setGlobalState({isLoading: false});
                this.setState({allowedToUnlock: true});
            })
            .catch(console.error);

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
        m = m.replace("%name", context.currentUser.userName);
    }
    return m;
}

function convertHexToRGBA(hexCode, opacity) {
    const tempHex = hexCode.replace('#', '');
    const r = parseInt(tempHex.substring(0, 2), 16);
    const g = parseInt(tempHex.substring(2, 4), 16);
    const b = parseInt(tempHex.substring(4, 6), 16);

    return `rgba(${r},${g},${b},${opacity / 100})`;
}

function setBgColor(col) {
    // let normal = convertHexToRGBA(response.accentColor, 70)
    let light = convertHexToRGBA(col, 40)
    document.documentElement.style.setProperty('--primary-accent', col);
    // old

    for (let i = 0; i < oldColors.length; i++) {
        changeColor(oldColors[i], col);
    }

    oldColors = [col]
}

function setBgImage(bg) {
    // if (bg.endsWith("mp4") && result.response.isPatreon) {
    //     // use mp4
    //     document.getElementById("video-bg-wrapper").style.display = "";
    //     document.getElementById("video-element").innerHTML +=  `<source src="` + bg + `" id="video-bg-src" type="video/mp4">`
    //     setTimeout(() => {
    //         document.getElementById("video-element").play()
    //     }, 300);
    // } else {
        // use bg image
        document.documentElement.style.setProperty('--background-image', `url("`+bg+`")`);
    //}
}