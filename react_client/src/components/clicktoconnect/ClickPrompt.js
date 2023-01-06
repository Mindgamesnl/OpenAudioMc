import React from "react";
import "./clickprompt.css";

export class ClickPrompt extends React.Component {
  render() {
    return (
        <div className="content-wrapper-box landing-thing">
            <section className="mb-32 text-gray-800 text-center lg:text-left w-full pt-32">
                <div className="container mx-auto xl:px-32 text-center lg:text-left">
                    <div className="grid lg:grid-cols-2 flex items-center">
                        <div className="mb-12 lg:mb-0 md:mt-10">
                            <div
                                className="relative block rounded-lg shadow-lg px-6 py-12 md:px-12 lg:-mr-14 themed-text clickprompt-box">
                                <h2 className="text-5xl font-bold mb-4 display-5 themed-text">
                                    Activate header
                                </h2>
                                <p className="text-gray-200 mb-6 mt-6">
                                    Activate text
                                </p>
                            </div>
                        </div>
                        <div className="shadow-lg fancy-border-radius rotate-lg-6 w-full login-image"></div>
                    </div>
                </div>
            </section>
        </div>
    );
  }
}