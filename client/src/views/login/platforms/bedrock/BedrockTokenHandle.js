import React from "react";
import {BlackoutPage} from "../../../../components/layout/BlackoutPage";

export class BedrockTokenHandle extends React.Component {

    render() {

        let code = "FD8E"

        // show this code as seperate digits in a grid
        let codeGrid = []
        for (let i = 0; i < code.length; i++) {
            codeGrid.push(<div className={"p-2 m-1 rounded-md text-center bg-gray-700 text-white text-4xl"}>{code.charAt(i)}</div>)
        }

        return (
            <BlackoutPage coverImage={"/assets/bg.png"}>
                <div className="relative bg-gradient-to-bl via-gray-900 from-stone-900 to-gray-900">
                    <div
                        className="relative mx-auto xl:max-w-7xl py-12 px-6 lg:px-8 lg:py-16 xl:border-l-8 border-solid border-indigo-900">
                        <div className="md:ml-auto">
                            <h2 className="text-lg font-semibold text-gray-300">Connecting with</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Minecraft: Bedrock Edition
                            </p>
                            <p className="mt-3 text-lg text-gray-300">
                                You're almost there! Just copy or remember the code below and enter it in the server where you're playing.
                                Be sure to leave this page open in the background.

                                <hr className={"my-4"}/>
                                <div className={"w-full flex flex-col justify-center items-center align-middle"}>
                                    <p className={"text-3xl"}>Your login code is:</p>
                                    <div className={"flex"}>
                                        {codeGrid}
                                    </div>
                                    <div>
                                        <p className={"text-sm mt-2"}>
                                            Enter it through the command <code className={"bg-gray-500 p-1 ml-1 rounded-md text-white"}>/audio {code}</code>
                                        </p>
                                    </div>
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            </BlackoutPage>
        )
    }

}