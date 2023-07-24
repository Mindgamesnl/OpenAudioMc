import React from "react";

import java from "./editions/alt_java.png"
import bedrock from "./editions/alt_bedrock.png"
import {LoginForm} from "../../../components/loginform/LoginForm";

export class PlatformSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
    }

    render() {
        if (this.state.selected == null) {
            // render general selection
            // two divs side by side

            const panelClass = "flex flex-col items-center justify-center w-full h-1/2 xl:h-full xl:w-1/2 py-8 xl:py-0"

            return (
                <div className={"flex flex-col xl:flex-row w-screen"}>
                    <div className={panelClass}>
                        <div
                            className="mx-4 xl:mx-0 relative block common-rounded-top pt-2 common-rounded-bottom max-w-xl shadow-lg p-6 clickprompt-box">
                            <div className={"w-full"}>
                                <div className={"text-white m-5"}>
                                    <div className="flex items-center justify-center align-middle space-x-3">
                                        <img src={bedrock}/>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center align-middle">
                                    <p className="w-3/4 text-center  text-white text-sm mb-8 tracking-wide cursor-pointer">Please
                                        Configure OpenAudioMc to fully run in the background while you're playing on your phone or console.
                                    </p>
                                </div>
                                <a href={"https://openaudiomc.net/docs/client_guide"}
                                   className="w-full block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium common-rounded-top common-rounded-bottom text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Proceed to Bedrock setup
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={"border-r-2 border-solid border-gray-700 xl:h-screen"}/>

                    <div className={panelClass}>
                        <div
                            className="mx-4 xl:mx-0 relative block common-rounded-top pt-2 common-rounded-bottom shadow-lg max-w-xl p-6 clickprompt-box">
                            <div className={"w-full"}>
                                <div className={"text-white m-5"}>
                                    <div className="flex items-center justify-center align-middle space-x-3">
                                        <img src={java}/>
                                    </div>
                                </div>
                                <div className={"text-white"}>
                                    <LoginForm/>
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