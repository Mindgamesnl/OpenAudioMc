import React from "react";
import "./grayout.css"

export class GrayoutPage extends React.Component {
    render() {
        return (
            <div className="flex flex-col space-y-4 min-w-screen h-screen animated fadeIn faster fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none grayout-page">
                {this.props.children}
            </div>
        );
    }
}