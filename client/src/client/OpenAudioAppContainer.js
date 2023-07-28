import React from "react";

import {getGlobalState, setGlobalState, shouldSettingSave, store} from "../state/store";
import {connect} from "react-redux";
import {ReportError} from "./util/ErrorReporter";
import ClientTokenSet from "./login/ClientTokenSet";
import {MessageModule} from "./translations/MessageModule";
import {API_ENDPOINT} from "./config/ApiEndpoints";
import {changeColor} from "./util/colors";
import {MediaManager} from "./services/media/MediaManager";
import {SocketManager} from "./services/socket/SocketModule";
import {toast} from "react-toastify";
import Cookies from "js-cookie";
import {reportVital} from "./util/vitalreporter";
import {WorldModule} from "./services/world/WorldModule";
import {debugLog} from "./services/debugging/DebugService";
import {FadeToCtx, OAC} from "../components/contexts";

let oldColors = ["#c0392b", "#4F46E5"]

class OpenAudioAppContainer extends React.Component {

    static contextType = FadeToCtx;

    constructor(props) {
        super(props);

        this.handleGlobalClick = this.handleGlobalClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.attemptLoginWithTokenSet = this.attemptLoginWithTokenSet.bind(this);
        this.bootApp = this.bootApp.bind(this);

        OAC.attemptLoginWithTokenSet = this.attemptLoginWithTokenSet;
        OAC.bootApp = this.bootApp;

        this.messageModule = new MessageModule()

        this.state = {
            didUnlock: false,
            allowedToUnlock: false,
            testMode: false,
        }

        let isValidHttps = window.location.protocol === "https:";

        // are we on localhost? then its probably fine
        if (window.location.hostname === "localhost") {
            isValidHttps = true;
        }

        // initialize capabilities
        setGlobalState({
            browserSupportsVoiceChat: isVoicechatCompatible(),
            clientSupportsVoiceChat: isValidHttps,
        })

        let settings = getGlobalState().settings;
        // loop over all object keys
        for (let key in settings) {

            if (!shouldSettingSave(key)) continue;

            // get cookie value
            let cookieValue = Cookies.get("setting_" + key);
            if (cookieValue == null) continue;
            let parsed = cookieValue;
            if (typeof settings[key] === "number") {
                parsed = parseFloat(cookieValue);
            }

            if (typeof settings[key] === "boolean") {
                parsed = cookieValue === "true";
            }

            setGlobalState({
                settings: {
                    [key]: parsed
                }
            })
        }
    }

    async attemptLoginWithTokenSet(tokenSet) {
        if (tokenSet == null) return;
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

        debugLog("Token '" + tokenSet.token + "' loaded for user '" + tokenSet.name + "'");

        let publicServerKey = tokenSet.publicServerKey;

        // fetch server data
        let serverDataRaw = await fetch(API_ENDPOINT.GET_SETTINGS + publicServerKey + "?name=" + tokenSet.name);

        if (serverDataRaw.status !== 200) {
            ReportError('Failed to get server details from ' + publicServerKey + ' at ' + window.location.host, tokenSet.name)
            setGlobalState({
                isLoading: false,
                currentUser: null,
            })
            fatalToast("Failed to get server details from " + publicServerKey);
            throw new Error("Failed to get server details from " + publicServerKey);
        }

        let serverData = await serverDataRaw.json();
        if (serverData.error !== "NONE") {
            ReportError('Failed to get server details from ' + publicServerKey + ' at ' + window.location.host, tokenSet.name)
            setGlobalState({
                isLoading: false,
                currentUser: null,
            })
            fatalToast("Failed to get server details from " + publicServerKey + "! Please try again later or contact support.");
            throw new Error("Failed to get server details from " + publicServerKey);
        }

        serverData = serverData.response;

        // is the server banned or locked out?
        if (serverData.banned) {
            setGlobalState({
                isBlocked: true,
                isPersonalBlock: (serverData.isPersonalBlock != null && serverData.isPersonalBlock), // is it the account, or me?
                isLoading: false,
            });
            // don't continue loading
            reportVital('metrics:accountlocked')
            return;
        }

        if (serverData.isVoicechatEnabled) {
            setGlobalState({
                voiceState: {
                    serverHasVoiceChat: true,
                },
            })
        }

        if (serverData.useTranslations) {
            let localLanguage = navigator.language || navigator.userLanguage;
            let language = localLanguage.split("-")[0];
            debugLog("Detected language: " + language);
            await this.messageModule.handleCountry(language)
        } else {
            debugLog("Translations disabled, skipping language detection");
            setGlobalState({
                // overwrite some messages
                lang: {
                    "home.welcome": serverData.welcomeMessage,
                    "home.activateText": serverData.startButton,
                    "home.header": serverData.activeMessage,
                }
            });
        }

        debugLog("Server: " + serverData.displayName + " (" + publicServerKey + ")");
        debugLog("Server is premium: " + serverData.isPatreon);
        debugLog("Server bucket folder: " + serverData.bucketFolder);

        setGlobalState({
            lang: {"serverName": serverData.displayName},
            isPremium: serverData.isPatreon || serverData.voicechatSlots > 10,
            bucketFolder: serverData.bucketFolder,
        });

        setBgColor(serverData.color)
        document.title = serverData.title;

        if (serverData.startSound !== "") {
            MediaManager.startSound = serverData.startSound
        }

        if (serverData.ambianceSound !== "") {
            await MediaManager.setupAmbianceSound(serverData.ambianceSound);
        }

        if (serverData.backgroundImage !== "") {
            // todo: remove legacy rewrite
            setBgImage(serverData.backgroundImage)
        }

        setGlobalState({
            voiceState: {
                peersHidden: !serverData.showVoicePeers,
            },
            navbarDetails: serverData.showNavbarDetails
        })

        // is the server offline? cancel now
        if (serverData.relayEndpoint == null) {
            ReportError('Server ' + publicServerKey + ' is offline at ' + window.location.host, tokenSet.name)
            setGlobalState({
                isLoading: false,
                currentUser: null,
            })
            fatalToast("Failed to connect with " + publicServerKey + "! Please try a new link from /audio, or contact server staff if the issue persists.");
            throw new Error("Server " + publicServerKey + " is offline");
        } else {
            setGlobalState({
                relay: {
                    endpoint: serverData.relayEndpoint,
                }
            });
        }

        reportVital('metrics:prodlogin')

        setGlobalState({isLoading: false});
        this.setState({allowedToUnlock: true});
        this.context.fadeToComponent(null)
    }

    componentDidMount() {
        if (getGlobalState().ignoreUrlToken) {
            console.log("Ignoring url token")
            return
        }

        // check if the current url has testMode as a variable
        let url = new URL(window.location.href);
        let testMode = url.searchParams.get("testMode");
        if (testMode != null) {
            // set the global state to test mode
            setBgColor(oldColors[0])
            setGlobalState({
                isLoading: false,
                clickLock: false,
                currentUser: {
                    userName: "Test User",
                    uuid: "b832a1b0-4843-4c73-9c83-2f8dad08d950",
                    token: "test",
                    publicServerKey: "test",
                }
            })
            this.messageModule.handleCountry("gb")
            return
        }

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
                return tokenSet;
            })

            // load server
            .then(this.attemptLoginWithTokenSet)
            .catch(e => {
                console.error(e);
                setGlobalState({isLoading: false});
                fatalToast('Your current link has expired. Please run /audio again to get a new link.');
            });

    }

    bootApp() {
        WorldModule.initPlayer();
        MediaManager.postBoot();
        SocketManager.connectToServer(getGlobalState().relay.endpoint);
        setGlobalState({clickLock: false});
        this.setState({didUnlock: true});
    }

    handleGlobalClick() {
        if (this.props.currentUser == null) return;
        if (this.state.allowedToUnlock) {
            if (!this.state.didUnlock) {
                // initialize OpenAudio
                this.bootApp()
            }
        }
    }

    render() {
        return (
            <div className={"h-screen"} onClick={this.handleGlobalClick}>
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

function fatalToast(message) {
    console.log(message);
    toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}

export function msg(message) {
    return getTranslation(null, message);
}

export function getTranslation(context, message) {
    if (context == null) {
        context = getGlobalState();
    }
    let m = context.lang[message];

    if (m === undefined) {
        console.error("Missing translation for: " + message);
        return "<" + message + ">";
    }

    if (context.currentUser) {
        m = m.replace("%player", context.currentUser.userName);
        m = m.replace("%name", context.currentUser.userName);
    }
    return m;
}

export function setBgColor(col) {
    if (col === "#000000") return;
    // let normal = convertHexToRGBA(response.accentColor, 70)
    document.documentElement.style.setProperty('--primary-accent', col);
    // old

    for (let i = 0; i < oldColors.length; i++) {
        changeColor(oldColors[i], col);
    }

    setGlobalState({settings: {accentColor: col}})

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
    document.documentElement.style.setProperty('--background-image', `url("` + bg + `")`);
    setGlobalState({settings: {backgroundImage: bg}})
    //}
}

function isVoicechatCompatible() {
    if (typeof RTCPeerConnection === 'undefined') {
        return false;
    }
    return true;
}
