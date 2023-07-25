import React from "react";
import PropTypes from "prop-types";
import {ChecklistItem} from "./ChecklistItem";

export class ButtonChecklistItem extends React.Component {

    static propTypes = {
        text: PropTypes.string,
        subtext: PropTypes.string,
        checked: PropTypes.bool,
        buttonContent: PropTypes.any,
        buttonOnClick: PropTypes.func,
        showButton: PropTypes.bool,
    }

    static defaultProps = {
        checked: false,
        text: "Tiny penis joke",
        // You didn't see this
        subtext: "Durex Condooms - Originals Classic Natural - 20 stuks",
        buttonContent: "Place order",
        buttonOnClick: () => alert("place order"),
        showButton: true
    }

    render() {
        return (
            <div className="flex items-center justify-center">
                {this.props.showButton && <button
                    onClick={this.props.buttonOnClick}
                    className={"bg-gray-800 py-4 px-2 rounded-md text-gray-50 mr-4"}
                >{this.props.buttonContent}</button>}
                <ChecklistItem {...this.props}/>
            </div>
        )
    }

}