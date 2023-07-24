import React from "react";

import java from "./editions/alt_java.png"
import bedrock from "./editions/alt_bedrock.png"
import {FadeToCtx} from "../../../components/fadeto/fadeto";
import {BedrockAuthFlow} from "./flows/BedrockAuthFlow";

export class PlatformSelection extends React.Component {

    static contextType = FadeToCtx;

    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }

        this.startBedrock = this.startBedrock.bind(this);
    }

    startBedrock() {
        this.context.fadeToComponent(<BedrockAuthFlow />)
    }

    render() {
        let btnClass = "mx-4 w-2/3 px-5 py-2.5 text-white bg-gray-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium common-rounded-top common-rounded-bottom text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

        if (this.state.selected == null) {
            // render general selection
            return (
                <div className={"flex flex-col xl:flex-row w-screen"}>
                    <div className={"flex flex-col items-center justify-center w-full py-8 xl:py-0"}>
                        <div
                            className="mx-4 xl:mx-0 flex flex-col xl:flex-row common-rounded-top pt-2 common-rounded-bottom shadow-lg xl:p-6 clickprompt-box">

                            <div className={"h-full flex flex-col mb-24 xl:mb-0"}>
                                <div className={"text-white my-5"}>
                                    <div className="flex items-center justify-center align-middle w-full">
                                        <img src={bedrock} alt={"Logo for Minecraft: Bedrock Edition"}/>
                                    </div>
                                </div>
                                <div className={"grid content-end h-full"}>
                                    <div className="w-full flex justify-center align-bottom">
                                        <p className="w-3/4 text-center  text-white text-sm mb-8 tracking-wide">
                                            Run OpenAudioMc in the background while you play on this (or another) device.
                                        </p>
                                    </div>
                                    <div className={"w-full flex justify-center align-middle"}>
                                        <button
                                            onClick={this.startBedrock}
                                            className={btnClass}>
                                            Continue to Bedrock Setup
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className={"border-r-2 border-solid border-gray-700 xl:h-full"}/>

                            <div className={"h-full flex flex-col mb-6 xl:mb-0"}>
                                <div className={"text-white m-5"}>
                                    <div className="flex items-center justify-center align-middle space-x-3">
                                        <img src={java} alt={"Logo for Minecraft: Java Edition"}/>
                                    </div>
                                </div>
                                <div className={"grid content-end h-full"}>
                                    <div className="w-full flex justify-center align-middle">
                                        <p className="w-3/4 text-center  text-white text-sm mb-8 tracking-wide">
                                            Run OpenAudioMc in a browser window while you play on this computer
                                        </p>
                                    </div>
                                    <div className={"w-full flex justify-center align-middle"}>
                                        <button
                                            onClick={this.startBedrock}
                                            className={btnClass}>
                                            Continue to Normal Setup
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <h1>ass</h1>
        )
    }

}