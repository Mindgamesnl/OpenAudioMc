import React from "react";
import {getGlobalState, setGlobalState} from "../../state/store";

export class InputModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: ""
        }

        this.finishModal = this.finishModal.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
    }

    finishModal() {
        try {
            getGlobalState().inputModal.callback(this.state.value);
        } catch (e) {}
        setGlobalState({inputModal: {visible: false}})
    }

    cancelModal() {
        try {
            getGlobalState().inputModal.callback(null);
        } catch (e) {}
        setGlobalState({inputModal: {visible: false}})
    }

    render() {
        let {title, message} = getGlobalState().inputModal;
        let textOnly = getGlobalState().inputModal.textOnly;

        return (
            <>
                <div className="fixed inset-0 overflow-y-auto h-full w-full z-50 backdrop-filter backdrop-blur-xl">
                    <div className={"absolute bg-black opacity-75 inset-0 z-0"}/>
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-gray-700">
                        <div className="mt-3 text-center">
                            <h1 className="text-lg font-medium text-indigo-200">{title}</h1>
                            <div className="mt-2 text-center">
                                <p className="text-sm text-white">
                                    <div dangerouslySetInnerHTML={{__html: message}} />
                                </p>
                                {!textOnly && <><hr /><textarea className={"w-full h-32 bg-gray-100 rounded-l"} placeholder={"Please write your message here..."} value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} /></>}
                            </div>
                            <div className="items-center px-4 py-3">
                                <button onClick={this.finishModal} className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-1/3 mr-5 shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                                    OK
                                </button>
                                {!textOnly && <button onClick={this.cancelModal} className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-1/3 shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                                    CLOSE
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

export function showInputModal(title, message, callback) {
    setGlobalState({inputModal: {visible: true, title: title, message: message, callback: callback, textOnly: false}})
}

export function showTextModal(title, ...message) {

    let fullMessage = "";
    for (let i = 0; i < message.length; i++) {
        fullMessage += message[i] + "<br />";
    }

    setGlobalState({inputModal: {visible: true, title: title, message: fullMessage, callback: () => {}, textOnly: true}})
}
