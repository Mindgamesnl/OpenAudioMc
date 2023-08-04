import React from "react";
import PropTypes from "prop-types";

export class BlackoutPage extends React.Component {

    static propTypes = {
        coverImage: PropTypes.string,
        extraClasses: PropTypes.string,
    }

    static defaultProps = {
        coverImage: null,
        extraClasses: "",
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
                background: "#211f1f",
            };
        }

        let passableProps = {...this.props};
        delete passableProps.coverImage;

        return (
            <div
                className="flex flex-col xl:space-y-4 overflow-y-hidden animated fadeIn faster fixed  left-0 top-0 justify-center items-center inset-0 z-40 outline-none focus:outline-none"
                style={style}>
                {hasBackground && <>
                    <div className={"absolute h-screen w-screen top-0 backdrop-filter backdrop-blur-md inset-0 z-0"}/>
                    <div className={"absolute h-screen w-screen xl:-top-4 bg-black opacity-50 inset-0 z-20"}/>
                    <div className="z-30 overflow-y-auto"  {...passableProps}>
                        {this.props.children}
                    </div>
                </>}

                {!hasBackground && <div className={" p-0 m-0 flex justify-center align-middle " + this.props.extraClasses} {...passableProps}>{this.props.children}</div>}
            </div>
        );
    }
}