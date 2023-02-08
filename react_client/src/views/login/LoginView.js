import {BlackoutPage} from "../../components/layout/BlackoutPage";
import React from "react";
import {OAC} from "../../client/OpenAudioAppContainer";
import "./login.css"
import {StaticFooter} from "../../components/footer/StaticFooter";
import {VERSION} from "../../index";

export class LoginView extends React.Component {

    static contextType = OAC;

    constructor(props) {
        super(props);
        this.state = {
            token: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        let name = this.state.token;

        if (name.indexOf("#") !== -1) {
            name = name.split("#")[1]
        }

        if (name.length > 3) {
            window.location = '#' + name;
            window.location.reload();
        }
    }

    render() {
        return (
            <BlackoutPage>
                <div className="py-12">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div>
                                <p className="w-80 text-center text-sm mb-8 text-white tracking-wide cursor-pointer">
                                    Your link seems to be invalid! please use <b>/audio</b> in-game or manually enter
                                    your
                                    personal token if you're given one.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <input type="text" placeholder="Token"
                                       onInput={(e) => this.setState({token: e.target.value})}
                                       className="input input-bordered w-full"/>
                                <button onClick={this.onSubmit}
                                    className="minecraft-btn mx-auto text-center text-white truncate p-1 border-2 border-b-4 hover:text-yellow-200">
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <StaticFooter>
                    Release Candidate - build {VERSION.build}
                    <br />
                    (<small>{VERSION.date}</small>)
                </StaticFooter>
            </BlackoutPage>
        );
    }
}