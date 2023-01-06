import React from "react";

export class VcOnboarding extends React.Component {
    render() {
        console.log('VcOnboarding');
        return (
            <div className="content-section shockwave">
                <div className="content-section-title">Voicechat Onboarding</div>
                <div
                    className="content-card-collection items-stretch 2xl:mt-0 2xl:mr-0 xl:mt-5 xl:mr-5 lg:mt-5 lg:mr-5 md:mt-5 md:mr-5 sm:mt-5 sm:mr-5">
                    <div className="content-card">
                        <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                             stroke="currentColor" fill="none" strokeLinecap="round"
                             strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path
                            d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10"/>  <path
                            d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2"/></svg>
                        Voicechat Title
                        <div className="content-card-content content-card-content-border-bottom">
                            Voicechat Onboarding
                        </div>
                        <div className="content-card-buttons w-full">
                            <button className="content-pill status-button green w-full" id="vc-connect-button">
                                Voicechat Join
                            </button>
                        </div>
                    </div>

                    <div className="content-card wide-card">
                               <span><svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                                          stroke="currentColor" fill="none" strokeLinecap="round"
                                          strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle
                                   cx="12" cy="7" r="4"/>  <path
                                   d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/></svg>
                                   Safety Title
                               </span>
                        <div className="content-card-content">
                            Voicechat Safety
                        </div>
                        <div className="content-card-buttons">
                            Safety desc
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}