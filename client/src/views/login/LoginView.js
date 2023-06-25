import {BlackoutPage} from "../../components/layout/BlackoutPage";
import React from "react";
import {StaticFooter} from "../../components/footer/StaticFooter";
import {VERSION} from "../../index";
import {OaStyleCard} from "../../components/card/OaStyleCard";
import {LoginForm} from "../../components/loginform/LoginForm";
import {compareProdVersions} from "../../client/util/versioning";
import {TokenScannerView} from "./TokenScannerView";
import {setGlobalState} from "../../state/store";

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

    openScannerPage() {
        setGlobalState({useScanLogin: true})
    }

    render() {
        return (
            <BlackoutPage coverImage={"assets/login-background.png"}>
                <div className="py-12">
                    <OaStyleCard title={"Invalid session"} isDanger={true} body={<LoginForm/>} fullWidth={true}/>
                    <OaStyleCard title={"Scan login code"} isDanger={false} fullWidth={true}>
                        <div className={"text-center"}>
                            <h1>Or scan using your camera</h1>
                            <button onClick={this.openScannerPage} className={"mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}>
                                Scan code
                            </button>
                        </div>
                    </OaStyleCard>
                </div>
                <StaticFooter>
                    <a href={"https://openaudiomc.net/docs/client_major_changelog"} className={"text-white"}>
                        build {VERSION.build}
                        <small className={"pl-2 " + this.state.versionDiff.color}>({this.state.versionDiff.text})</small>
                    </a>
                </StaticFooter>
            </BlackoutPage>
        );
    }
}