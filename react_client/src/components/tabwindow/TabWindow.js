import React, {Component} from 'react';

export class TabWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 0
        }
    }

    render() {
        const pages = React.Children.map(this.props.children, child => ({
            name: child.props.name,
            content: child.props.content
        }));
        console.log(pages);


        return (
            <div className="main-container tabbed">
                <div className="main-header flex justify-start">
                    <span className="theme-color-text p-10 w-1/3">
                        serverName
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
        console.log(this.props);
        return this.props.children;
    }
}

