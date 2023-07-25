import React from "react";
import {ChecklistItem} from "../../../../components/checklist/ChecklistItem";
import {API_ENDPOINT} from "../../../../client/config/ApiEndpoints";
import PropTypes from "prop-types";

export class LoginCode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            connected: false,
            errored: false,
            code: null,
            finished: false
        }
        this.websocket = null;
        this.onMessage = this.onMessage.bind(this);
    }

    static propTypes = {
        onAccept: PropTypes.func
    }

    static defaultProps = {
        onAccept: (d) => {
            alert("Code accepted! " + d)
        }
    }

    onMessage(event) {
        this.props.onAccept(event);
    }

    componentDidMount() {
        this.websocket = new WebSocket(API_ENDPOINT.PREAUTH_WS);
        this.websocket.onopen = () => {
            this.setState({
                connected: true
            })
        }

        let msgHandler = (event) => {
            if (event.data.startsWith("code:")) {
                let code = event.data.split(":")[1];
                this.setState({
                    loading: false,
                    code: code
                })
            } else {
                this.setState({
                    finished: true
                })
                console.log(this.props)
                this.onMessage(event.data)
            }
        }

        msgHandler = msgHandler.bind(this);

        this.websocket.onmessage = msgHandler

        const erOrClose = (event) => {
            this.setState({
                loading: false,
                connected: false,
                code: null,
                errored: true
            })
        }

        this.websocket.onerror = erOrClose;
        this.websocket.onclose = erOrClose;
    }

    componentWillUnmount() {
        try {
            this.websocket.close();
        } catch (e) {
            // ignore
        }
    }

    render() {
        if (this.state.finished) {
            return (
                <div className={"w-full flex flex-col justify-center items-center align-middle"}>
                    <div className={"xl:w-1/4"}>
                        <ChecklistItem
                            text={"Done!"}
                            subtext={"You'll now be logged in"}
                            checked={true}
                        />
                    </div>
                </div>
            )
        }

        // initial display
        if (this.state.code == null) {
            let text = "Connecting...";

            if (this.state.errored) {
                text = "Error connecting";
            }

            if (this.state.connected) {
                text = "Connected!";
            }

            return (
                <div className={"w-full flex flex-col justify-center items-center align-middle"}>
                    <div className={"xl:w-1/4"}>
                        <ChecklistItem
                            text={text}
                            subtext={this.state.errored ? "We're getting a code for you" : "Something went wrong"}
                            loading={this.state.loading}
                            checked={!this.state.errored}
                        />
                    </div>
                </div>
            )
        }

        let codeGrid = []
        for (let i = 0; i < this.state.code.length; i++) {
            codeGrid.push(<div key={i}
                               className={"p-2 m-1 rounded-md text-center bg-gray-700 text-white text-4xl"}>{this.state.code.charAt(i)}</div>)
        }

        return (
            <div className={"w-full flex flex-col justify-center items-center align-middle"}>
                <p className={"text-3xl"}>Your login code is:</p>
                <div className={"flex"}>
                    {codeGrid}
                </div>
                <div>
                    <p className={"text-sm mt-2"}>
                        Enter it through the command <code
                        className={"bg-gray-700 p-1 ml-1 rounded-md text-white"}>/audio {this.state.code}</code>
                    </p>
                </div>
            </div>
        )
    }
}