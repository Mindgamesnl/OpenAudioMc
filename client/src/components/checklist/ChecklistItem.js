import React from "react";
import PropTypes from "prop-types";

export class ChecklistItem extends React.Component {

    static propTypes = {
        text: PropTypes.string,
        subtext: PropTypes.string,
        checked: PropTypes.bool,
    }

    static defaultProps = {
        checked: false,
        text: "Tiny penis joke",
        // You didn't see this
        subtext: "Durex Condooms - Originals Classic Natural - 20 stuks",
    }

    render() {
        let svg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" className="h-8 w-8 text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"></path>
        </svg>;

        if (this.props.checked) {
            svg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor" className="h-8 w-8 text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M5 13l4 4L19 7"></path>
            </svg>;
        }

        return (
            <div className="flex items-center p-3 rounded-md bg-gray-800">
                <div className="flex-shrink-0 p-1 rounded-full ml-1 bg-gray-700">
                    {svg}
                </div>
                <div className="ml-3 pr-1">
                    <div className="text-lg leading-6 font-medium text-gray-50">
                        {this.props.text}
                    </div>
                    <div className="text-sm leading-6 font-medium text-gray-400">
                        {this.props.subtext}
                    </div>
                </div>
            </div>
        );
    }

}
