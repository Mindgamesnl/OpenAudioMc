import {BlackoutPage} from "../../components/layout/BlackoutPage";
import React from "react";
import {StaticFooter} from "../../components/footer/StaticFooter";
import {VERSION} from "../../index";
import {OaStyleCard} from "../../components/card/OaStyleCard";
import {LoginForm} from "../../components/loginform/LoginForm";
import {compareProdVersions} from "../../client/util/versioning";

export class LoginView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            versionDiff: "loading..."
        }
    }

    async componentDidMount() {
        try {
            const version = await compareProdVersions();
            this.setState({versionDiff: version});
        } catch (e) {
            this.setState({
                versionDiff: {
                    text: "Failed to fetch version",
                    outOfDate: false,
                    color: "text-red-500"
                }
            });
        }
    }

    render() {
        return (
            <BlackoutPage coverImage={"assets/login-background.png"}>
                <div className="py-12">
                    <OaStyleCard title={"Invalid session"} isDanger={true} body={<LoginForm/>} fullWidth={true}/>
                </div>

                <div className="relative block common-rounded-top pt-2 common-rounded-bottom shadow-lg p-6 themed-text clickprompt-box">
                    <div className={"w-full"}>
                        <div className={"text-white m-5"}>
                            <div className="flex items-center justify-center align-middle space-x-3">
                                More info about OpenAudioMc
                            </div>
                        </div>
                        <a href={"https://openaudiomc.net/docs/client_guide"}
                                className="w-full block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium common-rounded-top common-rounded-bottom text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Client Documentation
                        </a>
                    </div>
                </div>

                <StaticFooter>
                    <a href={"https://openaudiomc.net/docs/client_major_changelog"} className={"text-white"}>
                        build {VERSION.build}
                        <small
                            className={"pl-2 " + this.state.versionDiff.color}>({this.state.versionDiff.text})</small>
                    </a>
                </StaticFooter>
            </BlackoutPage>
        );
    }
}