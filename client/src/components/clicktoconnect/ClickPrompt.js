import React from "react";
import "./clickprompt.css";
import {getTranslation, OAC} from "../../client/OpenAudioAppContainer";
import {OaStyleCard} from "../card/OaStyleCard";
import {BlackoutPage} from "../layout/BlackoutPage";
import {getGlobalState, setGlobalState} from "../../state/store";
import {connect} from "react-redux";

class ClickPrompt extends React.Component {
    static contextType = OAC;

    render() {
        let c = this.context;
        let currentUser = getGlobalState().currentUser;

        let welcomeWithName = getTranslation(c, "home.confirmLoginBody");
        welcomeWithName = welcomeWithName.replace("%name", currentUser.userName);

        // instant join voice button as well
        let voiceButton = <button type="submit" onClick={() => {
            setGlobalState({voiceState: {autoJoinVoiceChat: true}});
        }}
                                  className="w-full mt-2 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium common-rounded-top common-rounded-bottom text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {getTranslation(c, "home.confirmLoginWithVoicechat")}
        </button>;

        if (!this.props.voiceState.serverHasVoiceChat) {
            voiceButton = ""
        }

        return (
            <BlackoutPage>
                <div className="py-12">
                    <section className="mb-32 text-gray-800 text-center lg:text-left w-full pt-32">
                        <div className="container mx-auto xl:px-32 text-center lg:text-left">
                            <div className="grid lg:grid-cols-2 flex items-center">
                                <div className="mb-12 lg:mb-0 md:mt-10">
                                    <div
                                        className="relative block common-rounded-top common-rounded-bottom shadow-lg px-6 py-12 md:px-12 lg:-mr-14 themed-text clickprompt-box">
                                        <div>
                                            <div className={"text-white m-5"}>
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-20 w-20 flex-shrink-0">
                                                        <img className="h-20 w-20 rounded-full bg-gray-300"
                                                             src={"https://visage.surgeplay.com/bust/512/" + currentUser.uuid}
                                                             style={{borderColor: "#32415d", borderWidth: "2px"}}
                                                             alt=""/>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="text-sm font-medium text-gray-200">
                                                            <div
                                                                dangerouslySetInnerHTML={{__html: welcomeWithName}}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit"
                                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium common-rounded-top common-rounded-bottom text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                {getTranslation(c, "home.confirmLoginButton")}
                                            </button>
                                            {voiceButton}
                                        </div>
                                    </div>
                                </div>
                                <div className="shadow-lg fancy-border-radius rotate-lg-6 w-full login-image"></div>
                            </div>
                        </div>
                    </section>
                </div>
            </BlackoutPage>
        );
    }
}

export default connect(mapStateToProps)(ClickPrompt);

function mapStateToProps(state) {
    return {
        voiceState: state.voiceState,
    };
}