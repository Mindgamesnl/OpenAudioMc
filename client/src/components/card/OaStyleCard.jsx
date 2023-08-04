import React from "react"
import PropTypes from "prop-types";
import "./OaStyleCard.css"

export class OaStyleCard extends React.Component {
    render() {

        let width = this.props.width || "4";
        if (this.props.fullWidth) {
            width = "w-full";
        }
        width = "w-1/" + width + " pr-4 pl-4";

        let heading = "panel-heading";
        if (this.props.isDanger) {
            heading += " danger-heading";
        }

        let hasAlert = this.props.alertBody != null || this.props.alertTitle != null;

        let bodyClass = "panel-body";
        if (this.props.noPadding) {
            bodyClass += " no-padding";
        }
        if (this.props.dark) {
            bodyClass += " panel-body-dark";
        }

        return (
            <div className={width}>
                <div className={"panel panel-default"}>
                    <div className={heading}>
                        <h1>{this.props.title}</h1>
                    </div>
                    <div className={bodyClass}>
                        { hasAlert && (
                            <div
                                className="bg-green-200 border-t border-b border-green-500 text-green-700 px-4 my-3 pt-2 pb-2 mb-5"
                                role="alert">
                                {this.props.alertTitle && (<p className="font-bold">{this.props.alertTitle}</p>)}
                                {this.props.alertBody && (<p className="text-sm">{this.props.alertBody}</p>)}
                            </div>
                        )}

                        {this.props.body}
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

OaStyleCard.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.element,
    isDanger: PropTypes.bool,
    width: PropTypes.string,
    alertBody: PropTypes.string,
    alertTitle: PropTypes.string,
    fullWidth: PropTypes.bool,
    dark: PropTypes.bool,
    noPadding: PropTypes.bool
}
