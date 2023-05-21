import React from "react";
import {getTranslation, OAC} from "../../client/OpenAudioAppContainer";

export class Header extends React.Component {
    static contextType = OAC;

    render() {
        let c = this.context;
        return (
            <div>
                <div className="relative">
                    <div
                        className="px-4 py-4 lg:py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                        <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
                            <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                                {getTranslation(c, "home.welcome")}
                            </h2>
                            <p className="mb-6 text-base text-indigo-100 md:text-lg" dangerouslySetInnerHTML={{ __html: getTranslation(c, "home.header") }}>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}