import React from "react";
import {BlackoutPage} from "../../../../components/layout/BlackoutPage";

export class BedrockTokenHandle extends React.Component {

    render() {
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
                        </div>
                    </div>
                </div>
            </BlackoutPage>
        )
    }

}