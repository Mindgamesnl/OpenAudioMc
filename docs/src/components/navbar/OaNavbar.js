import React from "react";

export class OaNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
            pages: [
                {
                    name: 'Home',
                    url: '/',
                },
                {
                    name: 'Documentation',
                    url: 'https://help.openaudiomc.net/',
                },
                {
                    name: 'Discord',
                    url: 'https://discord.openaudiomc.net/',
                },
                {
                    name: 'Account',
                    url: 'https://account.craftmend.com/login',
                },
                {
                    name: 'Beta',
                    url: 'https://account.openaudiomc.net/',
                }
            ]
        };
    }

    handleMenuClick = () => {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen,
        }));
    };

    render() {
        return (
            <nav className="bg-gray-900 border-b-2 border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <a href="/">
                                <img className="h-12 w-auto" src="/assets/logo.png" alt="Logo"/>
                            </a>
                        </div>
                        <div className="-mr-2 flex items-center md:hidden">
                            <button onClick={this.handleMenuClick} type="button"
                                    className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:bg-gray-800 focus:text-white transition duration-150 ease-in-out"
                                    aria-label="Main menu" aria-expanded={this.state.isMenuOpen ? 'true' : 'false'}>
                <span className={this.state.isMenuOpen ? 'hidden' : 'block'}>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                </span>
                                <span className={this.state.isMenuOpen ? 'block' : 'hidden'}>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </span>
                            </button>
                        </div>
                        <div className="hidden md:flex items-center">
                            {this.state.pages.map((page, index) => (
                                <a href={page.url} className="ml-10 font-medium text-white hover:text-gray-300 focus:outline-none focus:text-gray-300 transition duration-150 ease-in-out">{page.name}</a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={this.state.isMenuOpen ? 'block' : 'hidden'}>
                    <div className="pb-2 pt-4 sm:pt-6 sm:pb-4">
                        {this.state.pages.map((page, index) => (
                            <a href={page.url}  className="block px-3 py-2 font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition duration-150 ease-in-out">{page.name}</a>
                        ))}
                    </div>
                </div>
            </nav>
        )
    }
}