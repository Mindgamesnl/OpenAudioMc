import React from "react";
import {BlackoutPage} from "../../../../components/layout/BlackoutPage";
import {ButtonChecklistItem} from "../../../../components/checklist/ButtonChecklistItem";

export class BedrockAuthFlow extends React.Component {

    render() {
        return (
            <BlackoutPage>

                <div className="relative bg-gradient-to-bl from-gray-900 via-stone-900 to-gray-900">
                    <div className="relative mx-auto max-w-7xl py-12 px-6 lg:px-8 lg:py-16 xl:border-l-8 border-solid border-indigo-900">
                        <div className="md:ml-auto">
                            <h2 className="text-lg font-semibold text-gray-300">Connecting with</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Minecraft: Bedrock Edition
                            </p>
                            <p className="mt-3 text-lg text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Et, egestas tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim
                                et fermentum, augue. Aliquet amet volutpat quisque ut interdum tincidunt duis.</p>
                            <div className="mt-8">

                                    <ButtonChecklistItem />
                            </div>
                        </div>
                    </div>
                </div>

            </BlackoutPage>
        )
    }

}