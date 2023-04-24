import React, {Component} from 'react';
import {getTranslation, OAC} from "../../client/OpenAudioAppContainer";
import PropTypes from "prop-types";
import {getGlobalState} from "../../state/store";

export let setTab = (tab) => {
    console.warn("TAB HANDLER IS NOT SET YET");
}

export class TabWindow extends Component {
    static contextType = OAC;

    constructor(props) {
        super(props);
        this.state = {
            activePage: 0
        }
    }
    componentDidMount() {
        setTab = (tab) => {
            this.setState({activePage: tab});
        }
    }

    componentWillUnmount() {
        setTab = (tab) => {
            console.warn("TAB HANDLER IS NOT SET YET");
        }
    }

    render() {
        let c = this.context;

        let pages = React.Children.map(this.props.children, child => ({
            name: child.props.name,
            content: child.props.content,
            hidden: child.props.hidden,
            buttonContent: child.props.buttonContent
        }));

        // remove hidden pages
        pages = pages.filter(page => !page.hidden);
        let pageIndex = this.state.activePage;

        // move active page back if it's out of bounds
        if (pageIndex >= pages.length) {
            pageIndex = pages.length - 1;
        }

        let pill = <span className="small-pill free">Free</span>;
        if (c.isPremium) pill = <span className="small-pill premium">Premium</span>;

        // placeholder for player uuid
        let playerUuid = "00000000-0000-0000-0000-000000000000";
        if (getGlobalState().currentUser) playerUuid = getGlobalState().currentUser.uuid;

        return (
            <div className="main-container tabbed">
                <div className="main-header flex justify-start">
                    <span className="theme-color-text md:pl-10 w-1/3">
                        <div className={"rounding-bottom rounding-top px-1 py-1 flex items-center justify-start"}>
                            <img src={"https://visage.surgeplay.com/face/512/" + playerUuid} className="rounding-top rounding-bottom inline mr-5 w-9 h-9" alt="avatar" />
                            {getTranslation(c, "serverName")}
                            {pill}
                        </div>
                    </span>

                    <div className="header-menu w-1/3 center flex justify-center">
                        {pages.map((page, index) => (
                            <span className="tab" key={index}>
                                <label
                                    href="#"
                                    className={(index === this.state.activePage ? "active main-header-link" : "main-header-link") + " h-auto flex items-center justify-center rounding-top"}
                                    onClick={() => this.setState({activePage: index})}
                                >
                                    {page.buttonContent && <>{page.buttonContent}</>}
                                    {page.buttonContent && <span className="mr-2 ml-2 hiddennp lg:block">{page.name}</span>}
                                </label>
                            </span>
                        ))}
                    </div>
                    <div className="header-notice w-1/3 flex justify-end">
                        <a className="menu-link-main soft-text" id={"notice"} href="https://openaudiomc.net/">&copy; OpenAudioMc 2016-2023. All Rights Reserved.</a>
                    </div>
                </div>
                <div className="tab-content">
                    <div className="content-wrapper">
                        {pages[pageIndex].content}
                    </div>
                </div>
            </div>
        );
    }
}

export class TabPage extends Component {
    render() {
        return this.props.children;
    }
}

TabPage.propTypes = {
    name: PropTypes.string.isRequired,
    content: PropTypes.element.isRequired,
    hidden: PropTypes.bool,
    buttonContent: PropTypes.element
}

