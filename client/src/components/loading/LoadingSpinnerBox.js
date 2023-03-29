import React from "react";
import PropTypes from "prop-types";
import {OaStyleCard} from "../card/OaStyleCard";

export class LoadingSpinnerBox extends React.Component {
    render() {
        return (
            <OaStyleCard title={this.props.title} fullWidth={true} body={

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div
                                className="loader ease-linear rounded-full border-4 border-t-4 border-gray-800 h-12 w-12"></div>
                            <div className="flex flex-col ml-3">
                                <div className="font-medium leading-none text-gray-600">{this.props.title}</div>
                                <p className="text-sm text-gray-800 leading-none mt-1">
                                    {this.props.message}
                                </p>
                                <small className="text-gray-500 inline">{this.props.footer}</small>
                            </div>
                        </div>
                    </div>
            } />
        )
    }
}

LoadingSpinnerBox.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    footer: PropTypes.string,
}