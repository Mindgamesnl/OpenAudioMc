/* eslint-disable */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {showTextModal} from '../modal/InputModal';
import {setGlobalState} from '../../state/store';
import {msg} from '../../client/OpenAudioAppContainer';
import ServerConnectionWarning from '../connectionwarning/ServerConnectionWarning';
import UserAvatar from '../avatar/UserAvatar';
import {reportVital} from '../../client/util/vitalreporter';
import {MenuIcon} from 'lucide-react';

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
    // Get accent color from props or state
    const { accentColor } = this.props;

    let pages = React.Children.toArray(this.props.children).map((child) => ({
      name: child.props.name,
      content: child.props.content,
      hidden: child.props.hidden,
      buttonContent: child.props.buttonContent,
      subtext: child.props.subtext,
      colorWhenHasSubtext: child.props.colorWhenHasSubtext,
      transparentNavbar: child.props.transparentNavbar,
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

    const transparentNavbar = pages[tabToRender].transparentNavbar;

    return (
      <div className="flex flex-col-reverse bg-gray-800 bg-opacity-25 text-white h-screen w-screen">
        <main className="flex justify-center overflow-x-hidden overflow-y-auto w-full h-full backdrop-blur">
          <div className="content-wrapper">
            <ServerConnectionWarning/>
            {pages[tabToRender].content}
          </div>
        </main>

        {!hiddenNavbar && (
          <>
            <nav
              className="relative w-full p-2 md:hidden bg-black bg-opacity-60 backdrop-blur-md border-t border-gray-800 z-10">
              <div className="flex justify-between items-center w-full relative">
                <div className="flex items-center">
                  <img src={this.props.logoImage} alt="Logo" className="h-7"/>
                  <span className="ml-2 font-medium text-base text-gray-200">
                    {msg('serverName')}
                  </span>
                </div>
                <button
                  type="button"
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2 bg-black bg-opacity-50 rounded-full border border-gray-700"
                  style={{
                    boxShadow: this.props.accentColor ? `0 0 10px -2px ${this.props.accentColor}40` : ''
                  }}
                  onClick={this.toggleMobileMenu}
                >
                  <MenuIcon/>
                </button>
                <div
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    background: this.props.accentColor
                      ? `linear-gradient(to right, ${this.props.accentColor}15, ${this.props.accentColor}25, ${this.props.accentColor}15)`
                      : ''
                  }}
                ></div>
              </div>
            </nav>

            <div
              className={`fixed inset-0 bg-black bg-opacity-95 backdrop-blur-lg transform ${
                this.state.mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
              } transition-transform duration-300 ease-in-out z-50 md:hidden`}
            >
              <div className={"flex flex-col h-full"}>
                <div className="flex justify-between items-center p-4 border-b border-gray-800">
                  <div className="flex items-center">
                    <img src={this.props.logoImage} alt="Logo" className="h-8"/>
                    <span className="ml-3 font-medium text-lg text-gray-200">
                      {msg('serverName')}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white transition-colors duration-200 bg-black bg-opacity-50 p-2 rounded-full border border-gray-700"
                    style={{
                      boxShadow: this.props.accentColor ? `0 0 10px -2px ${this.props.accentColor}40` : ''
                    }}
                    onClick={this.toggleMobileMenu}
                  >
                    Close
                  </button>
                </div>
                <nav className="flex flex-col py-6 px-5 space-y-6 flex-grow">
                  {pages.map((page, index) => {
                    // Style for active menu item
                    const activeStyle = this.props.currentTab === index && this.props.accentColor ? {
                      borderColor: this.props.accentColor,
                      boxShadow: `0 0 15px -5px ${this.props.accentColor}50`
                    } : {};

                    return (
                      <button
                        key={page.name}
                        type="button"
                        className={`py-3 px-4 text-base transition-all duration-200 rounded-lg ${
                          this.props.currentTab === index
                            ? 'text-white bg-black bg-opacity-50 border border-gray-700'
                            : 'text-gray-400 hover:text-white'
                        }`}
                        style={activeStyle}
                        onClick={() => {
                          setTab(index);
                          this.toggleMobileMenu();
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          {page.buttonContent ? page.buttonContent : null}
                          <span className="font-medium">{page.name}</span>
                        </div>
                        {page.subtext && (
                          <p className={`text-xs mt-2 ${
                            this.props.currentTab === index && this.props.accentColor
                              ? ''
                              : 'text-gray-500'
                          }`}
                             style={this.props.currentTab === index && this.props.accentColor ? {
                               color: this.props.accentColor
                             } : {}}>
                            {page.subtext}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </nav>
                <div className="p-4 border-t border-gray-800">
                  <div
                    className="flex items-center bg-black bg-opacity-50 px-3 py-2 rounded-full border border-gray-700">
                    <UserAvatar/>
                    <p className="ml-2 text-sm text-gray-300">{playerName}</p>
                  </div>
                  {this.props.accentColor && (
                    <div
                      className="absolute inset-0 pointer-events-none opacity-10"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${this.props.accentColor}40, transparent 70%)`
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Navbar */}
            <nav
              className={transparentNavbar ? "hidden-on-mobile relative w-full py-2 px-6 bg-black bg-opacity-60 backdrop-blur-md border-t border-gray-800 z-10" : "hidden-on-mobile md:flex navbar-bg shadow-lg flex items-center p-2"}>
              <div className="container mx-auto flex justify-between items-center relative">
                <div className="flex items-center">
                  <img src={this.props.logoImage} alt="Logo" className="h-8"/>
                  <span className="ml-2 font-medium text-base text-gray-200">
                    {msg('serverName')}
                  </span>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-1">
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

                <div className="flex items-center space-x-3">
                  <div
                    className="flex items-center bg-black bg-opacity-50 px-3 py-1 rounded-full border border-gray-700">
                    <p className="text-sm text-gray-300 mr-2">{playerName}</p>
                    <UserAvatar/>
                  </div>
                </div>
                <div
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    background: this.props.accentColor
                      ? `linear-gradient(to right, ${this.props.accentColor}15, ${this.props.accentColor}25, ${this.props.accentColor}15)`
                      : ''
                  }}
                ></div>
              </div>
            </nav>
          </>
        )}

        <div className="fixed bottom-0 right-0 p-2 bg-black bg-opacity-60 backdrop-blur-md rounded-tl-lg z-10"
             style={{
               background: this.props.accentColor
                 ? `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.7)), linear-gradient(135deg, ${this.props.accentColor}20, transparent 70%)`
                 : 'rgba(0,0,0,0.6)'
             }}
        >
          <a
            className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
            id="notice"
            href="https://openaudiomc.net/"
            style={this.props.accentColor ? {
              '--hover-color': this.props.accentColor
            } : {}}
            onMouseOver={(e) => this.props.accentColor && (e.target.style.color = this.props.accentColor)}
            onMouseOut={(e) => this.props.accentColor && (e.target.style.color = '')}
          >
            &copy; OpenAudioMc 2016-2025. All Rights Reserved.
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
    accentColor: state.settings.accentColor,
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
  buttonContent: PropTypes.element,
  subtext: PropTypes.string,
  colorWhenHasSubtext: PropTypes.bool,
  transparentNavbar: PropTypes.bool,
};

TabPage.defaultProps = {
  hidden: false,
  buttonContent: null,
  subtext: null,
  colorWhenHasSubtext: false,
  transparentNavbar: false,
};
