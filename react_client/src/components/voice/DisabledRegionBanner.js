import React from "react";
import {getTranslation} from "../../client/OpenAudioAppContainer";

export class DisabledRegionBanner extends React.Component {
    render() {
        return (
            <div className="content-section">
                <div className="content-wrapper-box audio-content full bg-red-800">
                    <div className="content-wrapper-context full">
                        <div className="content-text full">
                            <div className={"text-center"}>
                                <p className="soft-text">
                                    {getTranslation(null, "vc.disabled").replace("%server", getTranslation(null, "serverName"))}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}