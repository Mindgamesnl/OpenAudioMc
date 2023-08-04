import React from "react";

export class UnsupportedBanner extends React.Component {
    render() {
        return (
            <div className="content-section">
                <div className="content-wrapper-box audio-content full bg-red-800">
                    <div className="content-wrapper-context full">
                        <div className="content-text full">
                            <div className={"text-center"}>
                                <p className="soft-text">
                                    {this.props.children}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}