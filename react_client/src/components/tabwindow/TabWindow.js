import React, {Component} from 'react';
import {getTranslation, OAC} from "../../client/OpenAudioAppContainer";

export class TabWindow extends Component {
    static contextType = OAC;

    constructor(props) {
        super(props);
        this.state = {
            activePage: 0
        }
    }

    render() {
        let c = this.context;

        const pages = React.Children.map(this.props.children, child => ({
            name: child.props.name,
            content: child.props.content
        }));

        return (
            <div className="main-container tabbed">
                <div className="main-header flex justify-start">
                    <span className="theme-color-text p-10 w-1/3">
                        { getTranslation(c, "serverName")}
                        <span className="small-pill free">Free</span>
                        <span className="small-pill premium">Premium</span>
                    </span>

                    <div className="header-menu w-1/3 center flex justify-center">
                        {pages.map((page, index) => (
                            <span className="tab" key={index}>
                                <label
                                    href="#"
                                    className={index === this.state.activePage ? "active main-header-link" : "main-header-link"}
                                    onClick={() => this.setState({ activePage: index })}
                                >
                                    {page.name}
                                </label>
                            </span>
                        ))}
                    </div>
                    <div className="header-notice w-1/3 flex justify-end">
                        <a className="menu-link-main soft-text" href="https://openaudiomc.net/">&copy; OpenAudioMc 2016-2022. All Rights Reserved.</a>
                    </div>
                </div>
                <div className="tab-content">
                    <div className="content-wrapper">
                        {pages[this.state.activePage].content}
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

