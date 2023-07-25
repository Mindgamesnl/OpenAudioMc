import React from "react";
import {BlackoutPage} from "../../../../components/layout/BlackoutPage";
import {ButtonChecklistItem} from "../../../../components/checklist/ButtonChecklistItem";
import {WrappedUserMedia} from "../../../../client/services/voice/util/WrappedUserMedia";
import PropTypes from "prop-types";

export let premadeAudioStream = null;

export class BedrockAuthFlow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notificationPermissionsGranted: false,
            notificationErrorMessage: null,
            microphonePermissionsGranted: false,
            microphoneErrorMessage: null,
        }

        this.requestNotificationPermissions = this.requestNotificationPermissions.bind(this);
        this.requestMicrophonePermissions = this.requestMicrophonePermissions.bind(this);
    }

    supportsNotificationPermissions() {
        return "Notification" in window;
    }

    requestNotificationPermissions() {
        Notification.requestPermission().then((result) => {
            if (result === "granted") {
                this.setState({notificationPermissionsGranted: true, notificationErrorMessage: null})
            } else {
                this.setState({
                    notificationPermissionsGranted: false,
                    notificationErrorMessage: "You denied the notification permissions, please enable them in your browser settings"
                })
            }
        })
    }

    requestMicrophonePermissions() {
        let wrapped = new WrappedUserMedia();
        console.log(wrapped)

        let success = function (stream) {
            // destroy the stream
            premadeAudioStream = stream;
            this.setState({microphonePermissionsGranted: true, microphoneErrorMessage: null})
        }

        let failed = function (error) {
            // is it permission denied?
            if (error.name === "PermissionDeniedError" || error.name === "NotAllowedError") {
                this.setState({
                    microphonePermissionsGranted: false,
                    microphoneErrorMessage: "You denied the microphone permissions, please enable them in your browser settings"
                })
            } else {
                this.setState({
                    microphonePermissionsGranted: false,
                    microphoneErrorMessage: "An unknown error occurred while requesting the microphone permissions, please try again later"
                })
            }
        }

        failed = failed.bind(this);
        success = success.bind(this);
        wrapped.successCallback = (success)
        wrapped.errorCallback = failed


        wrapped.getUserMedia(null)
    }

    render() {

        let meetsRequirements = (this.state.notificationPermissionsGranted || !this.supportsNotificationPermissions()) && this.state.microphonePermissionsGranted;

        return (
            <BlackoutPage>
                <div className="relative bg-gradient-to-bl via-gray-900 from-stone-900 to-gray-900">
                    <div
                        className="relative mx-auto xl:max-w-7xl py-12 px-6 lg:px-8 lg:py-16 xl:border-l-8 border-solid border-indigo-900">
                        <div className="md:ml-auto">
                            <h2 className="text-lg font-semibold text-gray-300">Connecting with</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Minecraft: Bedrock Edition
                            </p>
                            <p className="mt-3 text-lg text-gray-300">
                                You need to give the required permissions to this page now, so we can connect you
                                automatically in the future.
                            </p>
                            <div className="mt-8">
                                {this.supportsNotificationPermissions() ?
                                    <>

                                        <ButtonChecklistItem
                                            text={"Notification Permissions"}
                                            subtext={"We need to send you notifications when you're not in the app."}
                                            buttonContent={"Enable Notifications"}
                                            buttonOnClick={this.requestNotificationPermissions}
                                            checked={this.state.notificationPermissionsGranted}
                                            showButton={!this.state.notificationPermissionsGranted}
                                        />

                                        {this.state.notificationErrorMessage != null ?
                                            <ErrorBox
                                                title={"Notification Permissions"}
                                                description={this.state.notificationErrorMessage}/>
                                            : null}

                                        <div className={"h-4"}/>
                                    </> : null}

                                <ButtonChecklistItem
                                    text={"Microphone Permissions"}
                                    subtext={"We need to send you notifications when you're not in the app."}
                                    buttonContent={"Enable Microphone"}
                                    buttonOnClick={this.requestMicrophonePermissions}
                                    showButton={!this.state.microphonePermissionsGranted}
                                    checked={this.state.microphonePermissionsGranted}
                                />

                                {this.state.microphoneErrorMessage != null ?
                                    <ErrorBox
                                        title={"Microphone Error"}
                                        description={this.state.microphoneErrorMessage}/>
                                    : null}

                                <hr/>

                                <div className={"pb-8"}>
                                    {meetsRequirements ? <div className={"w-full flex justify-center"}>
                                            <button
                                                className={"bg-green-500 py-4 px-2 rounded-md text-gray-50 mr-4 mt-4"}
                                            >Continue
                                            </button>
                                        </div>
                                        : <div className={"w-full flex justify-center"}>
                                            <button
                                                disabled={true}
                                                className={"bg-gray-800 py-4 px-2 rounded-md text-gray-400 mr-4 mt-4"}
                                            >
                                                You need to enable all permissions before you can continue
                                            </button>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BlackoutPage>
        )
    }
}

class ErrorBox extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
    }

    render() {
        return (
            <div className={"w-full flex justify-center"}>
                <div className="rounded-md bg-red-700 p-2 mt-4 w-1/2">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-200">{this.props.title}</h3>
                            <div className="mt-2 text-sm text-red-200">
                                {this.props.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
