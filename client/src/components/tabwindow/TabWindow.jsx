// eslint-disable-next-line max-classes-per-file
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showTextModal } from '../modal/InputModal';
import { setGlobalState } from '../../state/store';
import { msg } from '../../client/OpenAudioAppContainer';
import ServerConnectionWarning from '../connectionwarning/ServerConnectionWarning';
import UserAvatar from '../avatar/UserAvatar';
import { HamburgerSvg } from '../icons/hamburger';
import { reportVital } from '../../client/util/vitalreporter';

export const setTab = (tab) => {
  setGlobalState({
    currentTab: tab,
  });
};

class TabWindow extends Component {
  constructor(props) {
    super(props);
    this.openUpgradeDialog = this.openUpgradeDialog.bind(this);
    this.state = { mobileMenuOpen: false };
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
  }

  openUpgradeDialog() {
    showTextModal(
      'Important platform update',
      "OpenAudioMc moved to a new platform which will entirely replace the old one. Please check our full changelog on Spigot and update at your earliest convenience. If you have any questions, please contact us on Discord. Support for the legacy 'Craftmend' platform will be dropped this summer.",
      '',
      "<a href='https://www.spigotmc.org/resources/openaudiomc-proximity-voice-chat-and-music-without-mods.30691/update?update=498012'>Visit changelog on Spigot</a>",
      '<i>this message is only applicable to server owners</i>',
    );
  }

  toggleMobileMenu() {
    this.setState((prevState) => ({ mobileMenuOpen: !prevState.mobileMenuOpen }));
  }

  render() {
    let pages = React.Children.toArray(this.props.children).map((child) => ({
      name: child.props.name,
      content: child.props.content,
      hidden: child.props.hidden,
      buttonContent: child.props.buttonContent,
      subtext: child.props.subtext,
      colorWhenHasSubtext: child.props.colorWhenHasSubtext,
    }));

    pages = pages.filter((page) => !page.hidden);

    let playerName = 'Unknown';
    if (this.props.currentUser) {
      playerName = this.props.currentUser.userName;
    }

    const hiddenNavbar = this.props.navbarDetails === false && pages.length === 1;

    let tabToRender = this.props.currentTab;

    // safety check, current tab should never be higher than the amount of tabs
    if (this.props.currentTab >= pages.length) {
      reportVital(`metrics:errorinfo:tabwindow currentTab is higher than the amount of tabs. Tab: ${this.props.currentTab}, pages: ${pages.length}`);
      tabToRender = 0;
    }

    return (
      <div className="flex flex-col-reverse bg-gray-800 bg-opacity-25 text-white h-screen w-screen">
        <main className="flex justify-center overflow-x-hidden overflow-y-auto w-full h-full backdrop-blur">
          <div className="content-wrapper">
            <ServerConnectionWarning />
            {pages[tabToRender].content}
          </div>
        </main>

        {!hiddenNavbar && (
          <>
            {/* Mobile Navbar */}
            <nav className="navbar-bg shadow-lg flex items-center p-2 md:hidden">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                  <img src={this.props.logoImage} alt="Logo" className="pl-2 h-8" />
                  <span className="ml-2 font-semibold text-xl text-gray-300">
                    {msg('serverName')}
                  </span>
                </div>
                <button
                  type="button"
                  className="text-white"
                  onClick={this.toggleMobileMenu}
                >
                  <HamburgerSvg />
                  {this.state.mobileMenuOpen ? 'Close' : 'Menu'}
                </button>
              </div>
            </nav>

            <div
              className={`fixed inset-0 bg-gray-800 bg-opacity-75 transform ${
                this.state.mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
              } transition-transform duration-300 ease-in-out z-50 md:hidden`}
            >
              <nav className="flex flex-col p-4 space-y-4">
                {pages.map((page, index) => (
                  <button
                    key={page.name}
                    type="button"
                    className={`px-5 py-3 text-lg font-medium flex gap-3 transition-colors duration-150 ${
                      this.props.currentTab === index ? 'bg-gray-700 text-green-300' : 'text-white hover:bg-gray-700'
                    }`}
                    onClick={() => {
                      setTab(index);
                      this.toggleMobileMenu();
                    }}
                  >
                    {page.buttonContent ? page.buttonContent : null}
                    {page.name}
                    {page.subtext ? (
                      <p
                        className={`text-sm ${
                          this.props.currentTab === index ? 'text-green-300' : 'text-green-200'
                        }`}
                      >
                        {page.subtext}
                      </p>
                    ) : null}
                  </button>
                ))}
                <div className="flex items-center justify-center mt-auto">
                  <p className="text-sm text-gray-300">{playerName}</p>
                  <UserAvatar />
                </div>
              </nav>
            </div>

            {/* Desktop Navbar */}
            <nav className="hidden-on-mobile md:flex navbar-bg shadow-lg flex items-center p-2">
              <div className="basis-1/3 flex items-center">
                <img src={this.props.logoImage} alt="Logo" className="pl-2 h-8" />
                <span className="ml-2 font-semibold text-xl text-gray-300">
                  {msg('serverName')}
                </span>
              </div>

              <div className="basis-1/3">
                <div className="flex flex-row gap-1 p-1 mx-auto rounded-lg navbar-bg-button w-min" role="group">
                  {pages.map((page, index) => (
                    <button
                      key={page.name}
                      type="button"
                      className={`px-5 whitespace-nowrap text-xs flex flex-row items-center justify-center font-medium transition-colors duration-150 ${
                        this.props.currentTab === index ? 'navbar-button-active rounded-lg' : 'text-white hover:bg-gray-700'
                      }`}
                      onClick={() => setTab(index)}
                    >
                      {page.buttonContent ? page.buttonContent : null}
                      <div className="ml-2">
                        {page.name}
                        {page.subtext ? (
                          <p
                            className={`${
                              this.props.currentTab === index ? 'text-green-700' : 'text-green-200'
                            } text-xs`}
                          >
                            {page.subtext}
                          </p>
                        ) : null}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="basis-1/3 flex float-right w-1/3 place-content-end align-top">
                <div className="flex h-full justify-center align-middle items-center items-end">
                  <p className="text-sm text-gray-300">{playerName}</p>
                  <UserAvatar />
                </div>
              </div>
            </nav>
          </>
        )}

        <div className="fixed bottom-0 right-0 p-2 bg-gray-800 rounded-tl-2xl">
          <a
            className="soft-text break-words"
            id="notice"
            href="https://openaudiomc.net/"
          >
            &copy; OpenAudioMc 2016-2024. All Rights Reserved.
          </a>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TabWindow);

function mapStateToProps(state) {
  return {
    currentTab: state.currentTab,
    isPremium: state.isPremium,
    currentUser: state.currentUser,
    navbarDetails: state.navbarDetails,
    clickLock: state.clickLock,
    logoImage: state.settings.logoImage,
  };
}

export class TabPage extends Component {
  render() {
    return this.props.children;
  }
}

// eslint if struggeling with re-assigned props

/* eslint-disable react/no-unused-prop-types */
TabPage.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  hidden: PropTypes.bool,
  buttonContent: PropTypes.element,
  subtext: PropTypes.string,
  colorWhenHasSubtext: PropTypes.bool,
};

TabPage.defaultProps = {
  hidden: false,
  buttonContent: null,
  subtext: null,
  colorWhenHasSubtext: false,
};
