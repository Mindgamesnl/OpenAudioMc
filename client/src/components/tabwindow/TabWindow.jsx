/* eslint-disable jsx-a11y/mouse-events-have-key-events, no-nested-ternary, no-return-assign, max-classes-per-file */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MenuIcon } from 'lucide-react';
import { showTextModal } from '../modal/InputModal';
import { setGlobalState } from '../../state/store';
import { msg } from '../../client/OpenAudioAppContainer';
import ServerConnectionWarning from '../connectionwarning/ServerConnectionWarning';
import UserAvatar from '../avatar/UserAvatar';
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

    const { transparentNavbar } = pages[tabToRender];

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
            {/* Mobile Bottom Navbar */}
            <nav className="relative w-full p-3 md:hidden bg-black bg-opacity-50 backdrop-blur-xl border-t border-white border-opacity-10 z-10">
              <div className="flex justify-between items-center w-full relative">
                {/* Logo and Server Name */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img src={this.props.logoImage} alt="Logo" className="h-8 w-8 rounded-lg object-cover" />
                    {this.props.accentColor ? (
                      <div
                        className="absolute inset-0 rounded-lg opacity-20 blur-sm"
                        style={{
                          background: `radial-gradient(circle at center, ${this.props.accentColor}60, transparent 70%)`,
                        }}
                      />
                    ) : null}
                  </div>
                  <div>
                    <span className="font-semibold text-base text-gray-100 tracking-tight">
                      {msg('serverName')}
                    </span>
                  </div>
                </div>

                {/* Hamburger Menu Button */}
                <button
                  type="button"
                  className="relative text-gray-300 hover:text-white transition-all duration-300 p-3 bg-black bg-opacity-40 backdrop-blur-lg rounded-2xl border border-white border-opacity-10 shadow-lg hover:shadow-xl group"
                  style={{
                    boxShadow: this.props.accentColor ? `0 0 20px -8px ${this.props.accentColor}40` : '',
                  }}
                  onClick={this.toggleMobileMenu}
                >
                  <div className="relative">
                    <MenuIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    {this.props.accentColor ? (
                      <div
                        className="absolute inset-0 opacity-20 blur-sm"
                        style={{
                          background: `radial-gradient(circle at center, ${this.props.accentColor}60, transparent 70%)`,
                        }}
                      />
                    ) : null}
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                </button>

                {/* Ambient background */}
                {this.props.accentColor ? (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-15"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${this.props.accentColor}20, transparent)`,
                    }}
                  />
                ) : null}
              </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
              className={`fixed inset-0 bg-black bg-opacity-95 backdrop-blur-2xl transform ${
                this.state.mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
              } transition-transform duration-300 ease-in-out z-50 md:hidden`}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white border-opacity-10">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img src={this.props.logoImage} alt="Logo" className="h-10 w-10 rounded-xl object-cover" />
                      {this.props.accentColor ? (
                        <div
                          className="absolute inset-0 rounded-xl opacity-20 blur-sm"
                          style={{
                            background: `radial-gradient(circle at center, ${this.props.accentColor}60, transparent 70%)`,
                          }}
                        />
                      ) : null}
                    </div>
                    <div>
                      <span className="font-semibold text-xl text-gray-100 tracking-tight">
                        {msg('serverName')}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative text-gray-300 hover:text-white transition-all duration-300 bg-black bg-opacity-40 backdrop-blur-lg p-3 rounded-2xl border border-white border-opacity-10 shadow-lg group"
                    style={{
                      boxShadow: this.props.accentColor ? `0 0 20px -8px ${this.props.accentColor}40` : '',
                    }}
                    onClick={this.toggleMobileMenu}
                  >
                    <span className="text-sm font-medium">Close</span>
                    <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex flex-col py-8 px-6 space-y-4 flex-grow">
                  {pages.map((page, index) => {
                    const isActive = this.props.currentTab === index;
                    const activeStyle = isActive && this.props.accentColor ? {
                      background: `linear-gradient(135deg, ${this.props.accentColor}20, ${this.props.accentColor}10)`,
                      borderColor: this.props.accentColor,
                      boxShadow: `0 8px 32px -8px ${this.props.accentColor}30`,
                    } : isActive ? {
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                      borderColor: 'rgba(255,255,255,0.2)',
                      boxShadow: '0 8px 32px -8px rgba(0,0,0,0.3)',
                    } : {};

                    return (
                      <button
                        key={page.name}
                        type="button"
                        className={`relative py-4 px-5 text-base transition-all duration-300 rounded-2xl border group ${
                          isActive
                            ? 'text-white bg-opacity-80 backdrop-blur-lg border-opacity-20'
                            : 'text-gray-300 hover:text-white border-transparent hover:bg-white hover:bg-opacity-5 hover:border-white hover:border-opacity-10'
                        }`}
                        style={activeStyle}
                        onClick={() => {
                          setTab(index);
                          this.toggleMobileMenu();
                        }}
                      >
                        {/* Background glow for active item */}
                        {isActive && this.props.accentColor ? (
                          <div
                            className="absolute inset-0 rounded-2xl opacity-20 blur-md"
                            style={{
                              background: `radial-gradient(ellipse at center, ${this.props.accentColor}40, transparent 70%)`,
                            }}
                          />
                        ) : null}

                        <div className="flex items-center space-x-4 relative">
                          {/* Icon */}
                          <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                            {page.buttonContent ? page.buttonContent : null}
                          </div>

                          {/* Text */}
                          <div className="flex-1 text-left">
                            <span className="font-semibold text-lg">{page.name}</span>
                            {page.subtext ? (
                              <div
                                className="text-sm mt-1 font-medium"
                                style={isActive && this.props.accentColor ? {
                                  color: `${this.props.accentColor}dd`,
                                } : {
                                  color: isActive ? '#a7f3d0' : '#86efac',
                                }}
                              >
                                {page.subtext}
                              </div>
                            ) : null}
                          </div>

                          {/* Active indicator */}
                          {isActive ? (
                            <div
                              className="w-2 h-2 rounded-full shadow-lg"
                              style={{
                                backgroundColor: this.props.accentColor || '#ffffff',
                                boxShadow: `0 0 12px ${this.props.accentColor || '#ffffff'}80`,
                              }}
                            />
                          ) : null}
                        </div>

                        {/* Hover effect */}
                        <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-3 transition-opacity duration-300" />
                      </button>
                    );
                  })}
                </nav>

                {/* Footer User Section */}
                <div className="p-6 border-t border-white border-opacity-10">
                  <div className="flex items-center bg-black bg-opacity-40 backdrop-blur-lg px-4 py-3 rounded-2xl border border-white border-opacity-10 shadow-lg">
                    <div className="relative mr-3">
                      <UserAvatar />
                      {this.props.accentColor ? (
                        <div
                          className="absolute inset-0 rounded-full opacity-20 blur-sm"
                          style={{
                            background: `radial-gradient(circle at center, ${this.props.accentColor}60, transparent 70%)`,
                          }}
                        />
                      ) : null}
                    </div>
                    <span className="text-base font-medium text-gray-200">{playerName}</span>
                  </div>

                  {/* Ambient background glow */}
                  {this.props.accentColor ? (
                    <div
                      className="absolute inset-0 pointer-events-none opacity-10"
                      style={{
                        background: `radial-gradient(ellipse at 50% 100%, ${this.props.accentColor}40, transparent 80%)`,
                      }}
                    />
                  ) : null}
                </div>
              </div>
            </div>

            {/* Desktop Navbar */}
            <nav
              className={transparentNavbar
                ? 'hidden-on-mobile relative w-full py-3 px-6 bg-black bg-opacity-40 backdrop-blur-xl border-t border-white border-opacity-10 z-10'
                : 'hidden-on-mobile md:flex navbar-bg-modern shadow-2xl flex items-center py-3 px-6'}
            >
              <div className="container mx-auto flex justify-between items-center relative">
                {/* Logo and Server Name */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img src={this.props.logoImage} alt="Logo" className="h-10 w-10 rounded-xl object-cover shadow-lg" />
                    {this.props.accentColor ? (
                      <div
                        className="absolute inset-0 rounded-xl opacity-20 blur-sm"
                        style={{
                          background: `radial-gradient(circle at center, ${this.props.accentColor}60, transparent 70%)`,
                        }}
                      />
                    ) : null}
                  </div>
                  <div>
                    <span className="font-semibold text-lg text-white tracking-tight">
                      {msg('serverName')}
                    </span>
                  </div>
                </div>

                {/* Navigation Tabs */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center bg-black bg-opacity-30 backdrop-blur-lg rounded-2xl p-1.5 border border-white border-opacity-10 shadow-xl">
                  {pages.map((page, index) => {
                    const isActive = this.props.currentTab === index;
                    return (
                      <button
                        key={page.name}
                        type="button"
                        className={`relative px-6 py-3 whitespace-nowrap text-sm flex flex-row items-center justify-center font-medium transition-all duration-300 rounded-xl group ${
                          isActive ? 'text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                        }`}
                        style={isActive && this.props.accentColor ? {
                          background: `linear-gradient(135deg, ${this.props.accentColor}90, ${this.props.accentColor}60)`,
                          boxShadow: `0 8px 32px -8px ${this.props.accentColor}40, 0 0 0 1px ${this.props.accentColor}30`,
                        } : isActive ? {
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                          boxShadow: '0 8px 32px -8px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
                        } : {}}
                        onClick={() => setTab(index)}
                      >
                        {/* Active tab background glow */}
                        {isActive && this.props.accentColor ? (
                          <div
                            className="absolute inset-0 rounded-xl opacity-30 blur-md"
                            style={{
                              background: `radial-gradient(ellipse at center, ${this.props.accentColor}40, transparent 70%)`,
                            }}
                          />
                        ) : null}

                        {/* Icon */}
                        <div className={`relative transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                          {page.buttonContent ? page.buttonContent : null}
                        </div>

                        {/* Text content */}
                        <div className="ml-3 relative">
                          <div className="font-medium">
                            {page.name}
                          </div>
                          {page.subtext ? (
                            <div
                              className="text-xs mt-0.5 font-medium"
                              style={isActive && this.props.accentColor ? {
                                color: `${this.props.accentColor}dd`,
                              } : {
                                color: isActive ? '#a7f3d0' : '#86efac',
                              }}
                            >
                              {page.subtext}
                            </div>
                          ) : null}
                        </div>

                        {/* Hover effect */}
                        <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                      </button>
                    );
                  })}
                </div>

                {/* User Profile Section */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center bg-black bg-opacity-40 backdrop-blur-lg px-4 py-2.5 rounded-2xl border border-white border-opacity-10 shadow-lg hover:bg-opacity-50 transition-all duration-300">
                    <span className="text-sm font-medium text-gray-200 mr-3">{playerName}</span>
                    <div className="relative">
                      <UserAvatar />
                      {this.props.accentColor ? (
                        <div
                          className="absolute inset-0 rounded-full opacity-20 blur-sm"
                          style={{
                            background: `radial-gradient(circle at center, ${this.props.accentColor}60, transparent 70%)`,
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Ambient background glow */}
                {this.props.accentColor ? (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-10"
                    style={{
                      background: `radial-gradient(ellipse at 50% 100%, ${this.props.accentColor}30, transparent 80%)`,
                    }}
                  />
                ) : null}
              </div>
            </nav>
          </>
        )}

        {/* Copyright Footer */}
        <div
          className="fixed bottom-0 right-0 p-3 bg-black bg-opacity-40 backdrop-blur-xl rounded-tl-2xl z-10 border-t border-l border-white border-opacity-10 shadow-lg"
          style={{
            background: this.props.accentColor
              ? `linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), radial-gradient(ellipse at bottom right, ${this.props.accentColor}15, transparent 70%)`
              : 'rgba(0,0,0,0.4)',
          }}
        >
          <a
            className="text-xs text-gray-400 hover:text-white transition-all duration-300 font-medium tracking-wide"
            id="notice"
            href="https://openaudiomc.net/"
            style={this.props.accentColor ? {
              '--hover-color': this.props.accentColor,
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

TabPage.defaultProps = {
  hidden: false,
  buttonContent: null,
  subtext: null,
  colorWhenHasSubtext: false,
  transparentNavbar: false,
};
