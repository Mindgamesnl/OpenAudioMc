import React from "react";
import PropTypes from "prop-types";

export class BlackoutPage extends React.Component {

    static propTypes = {
        coverImage: PropTypes.string,
    }

    static defaultProps = {
        coverImage: null,
    }

    render() {

        let style;
        let hasBackground = false;
        if (this.props.coverImage) {
            style = {
                backgroundImage: `url(${this.props.coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
            };
            hasBackground = true;
        } else {
            style = {
                background: "#242424",
            };
        }

        return (
            <div
                className="flex flex-col space-y-4 min-w-screen h-screen animated fadeIn faster fixed  left-0 top-0 flex justify-center items-center inset-0 z-40 outline-none focus:outline-none"
                style={style}>
                {hasBackground && <>
                    <div className={"absolute h-screen w-screen backdrop-filter backdrop-blur-md inset-0 z-0"}/>
                    <div className="z-30">
                        {this.props.children}
                    </div>
                </>}

                {!hasBackground && this.props.children}
            </div>
        );
    }
}