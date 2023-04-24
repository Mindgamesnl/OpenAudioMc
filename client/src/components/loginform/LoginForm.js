import React from "react";
import {OAC} from "../../client/OpenAudioAppContainer";
import "./login.css"

export class LoginForm extends React.Component {

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
            <div>
                <div>
                    <p className="w-80 text-center text-sm mb-8 tracking-wide cursor-pointer">
                        Your link seems to be invalid! please use <b>/audio</b> in-game or manually enter
                        your
                        personal token if you're given one.
                    </p>
                </div>
                <div className="space-y-4">
                    <input type="text" placeholder="Token"
                           onInput={(e) => this.setState({token: e.target.value})}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"/>
                    <button onClick={this.onSubmit} className="minecraft-btn mx-auto text-center text-white truncate p-1 pt-2 border-2 border-b-4 hover:text-yellow-200">
                        Login
                    </button>
                </div>
            </div>
        );
    }
}