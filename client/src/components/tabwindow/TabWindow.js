import React, {Component} from 'react';
import {getTranslation} from "../../client/OpenAudioAppContainer";
import PropTypes from "prop-types";
import {showTextModal} from "../modal/InputModal";
import {connect} from "react-redux";
import {getGlobalState} from "../../state/store";

export let setTab = (tab) => {
    console.warn("TAB HANDLER IS NOT SET YET");
}

let openedFirstTime = false;

class TabWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 0
        }

        this.openUpgradeDialog = this.openUpgradeDialog.bind(this)
    }

    componentDidMount() {
        setTab = (tab) => {
            this.setState({activePage: tab});
        }

        if (!openedFirstTime) {
            // uuid
            let serverKey = getGlobalState().currentUser;
            if (serverKey) {
                serverKey = serverKey.publicServerKey;
            } else {
                return
            }

            openedFirstTime = true;

            if (this.props.isLegacy) {
                this.openUpgradeDialog();
            }

        }
    }

    componentWillUnmount() {
        setTab = (tab) => {
            console.warn("TAB HANDLER IS NOT SET YET");
        }
    }

    openUpgradeDialog() {
        showTextModal(
            "Important platform update",
            "OpenAudioMc moved to a new platform which will entirely replace the old one. Please check our full changelog on Spigot and update at your earliest convenience. If you have any questions, please contact us on Discord. Support for the legacy 'Craftmend' platform will be dropped this summer.",
            "",
            "<a href='https://www.spigotmc.org/resources/openaudiomc-proximity-voice-chat-and-music-without-mods.30691/update?update=498012'>Visit changelog on Spigot</a>",
            "<i>this message is only applicable to server owners</i>"
        )
    }

    render() {
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

        let pill = <div className="small-pill free">Free</div>;
        if (this.props.isPremium) pill = <div className="small-pill premium">Premium</div>;

        // placeholder for player uuid
        let playerUuid = "00000000-0000-0000-0000-000000000000";
        if (this.props.currentUser) playerUuid = this.props.currentUser.uuid;

        if (!this.props.navbarDetails) pill = ""

        let legacy = this.props.isLegacy;

        let navbarButtons = pages.map((page, index) => (
            <span className="tab" key={index}>
                                <label
                                    href="#"
                                    className={(index === this.state.activePage ? "active main-header-link" : "main-header-link") + " h-auto flex items-center justify-center rounding-top"}
                                    onClick={() => this.setState({activePage: index})}
                                >
                                    {page.buttonContent && <>{page.buttonContent}</>}
                                    {page.buttonContent &&
                                        <span className="mr-2 ml-2 hiddennp lg:block">{page.name}</span>}
                                </label>
                            </span>
        ));

        // is there only one page? then hide the navbar
        if (navbarButtons.length === 1) navbarButtons = "";

        return (
            <div className="main-container tabbed">
                <div className="main-header flex justify-start">
                    <span className="theme-color-text md:pl-10 w-1/3">
                        <div
                            className={"rounding-bottom rounding-top px-1 py-1 flex items-center justify-start hidden-on-mobile"}>
                            {this.props.navbarDetails &&
                                <img src={"https://visage.surgeplay.com/face/512/" + playerUuid}
                                     className="rounding-top rounding-bottom inline mr-5 w-9 h-9" alt="avatar"/>}
                            {getTranslation(null, "serverName")}
                            {pill}
                            {legacy && <button onClick={this.openUpgradeDialog}
                                               className="content-pill status-button ml-2 green">{getTranslation(null, "navbar.upgradeRequired")}</button>}
                        </div>
                    </span>

                    <div className="header-menu w-1/3 center flex justify-center">
                        {navbarButtons}
                    </div>
                    <div className="header-notice w-1/3 flex justify-end">
                        <a className="menu-link-main soft-text" id={"notice"}
                           href="https://openaudiomc.net/">&copy; OpenAudioMc 2016-2023. All Rights Reserved.</a>
                    </div>
                </div>
                <div className="tab-content px-4 xl:px-24 xl:pt-5">
                    <div className="content-wrapper">
                        {pages[pageIndex].content}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(TabWindow);

function mapStateToProps(state) {
    return {
        isPremium: state.isPremium,
        isLegacy: state.isLegacy,
        currentUser: state.currentUser,
        navbarDetails: state.navbarDetails
    };
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

