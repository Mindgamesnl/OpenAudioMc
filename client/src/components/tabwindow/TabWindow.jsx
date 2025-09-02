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
    this.state = { sidebarExpanded: false };
    this.toggleSidebar = this.toggleSidebar.bind(this);
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

  toggleSidebar() {
    this.setState((prev) => ({ sidebarExpanded: !prev.sidebarExpanded }));
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

    const sidebarWidth = hiddenNavbar ? 0 : (this.state.sidebarExpanded ? '16rem' : '4rem'); // 64 / 16 in Tailwind
    const accent = this.props.accentColor;

    return (
      <div className="flex bg-gray-800 bg-opacity-25 text-white h-screen w-screen">
        {/* Vertical Sidebar */}
        {!hiddenNavbar && (
          <nav
            className={`fixed left-0 top-0 h-screen z-30 transition-[width] duration-300 ease-in-out
                        bg-black bg-opacity-50 backdrop-blur-2xl border-r border-white border-opacity-10
                        shadow-2xl`}
            style={{
              width: sidebarWidth,
              boxShadow: accent ? `0 10px 40px -10px ${accent}30` : undefined,
              background: accent
                ? `linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.65)), radial-gradient(ellipse at top left, ${accent}12, transparent 60%)`
                : undefined,
            }}
          >
            {/* Header: Logo (expanded) + centered toggle */}
            <div className={`flex items-center px-3 py-4 ${this.state.sidebarExpanded ? 'justify-between' : 'justify-center'}`}>
              {this.state.sidebarExpanded && (
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="relative">
                    <img src={this.props.logoImage} alt="Logo" className="h-10 w-10 rounded-xl object-cover shadow-lg" />
                    {accent ? (
                      <div
                        className="absolute inset-0 rounded-xl opacity-20 blur-sm"
                        style={{ background: `radial-gradient(circle at center, ${accent}60, transparent 70%)` }}
                      />
                    ) : null}
                  </div>
                  <span className="font-semibold text-lg text-white tracking-tight whitespace-nowrap">
                    {msg('serverName')}
                  </span>
                </div>
              )}

              <button
                type="button"
                aria-label="Toggle sidebar"
                className="ml-2 text-gray-300 hover:text-white transition-all duration-300 p-2
                           bg-black bg-opacity-40 rounded-xl border border-white border-opacity-10
                           hover:bg-opacity-50"
                style={{ boxShadow: accent ? `0 0 16px -8px ${accent}40` : undefined }}
                onClick={this.toggleSidebar}
              >
                <MenuIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-2 px-2 h-[calc(100vh-9rem)] overflow-y-auto flex">
              <div className="flex flex-col space-y-2 justify-center h-full w-full">
                {pages.map((page, index) => {
                  const isActive = this.props.currentTab === index;
                  const activeStyle = isActive && accent ? {
                    background: `linear-gradient(135deg, ${accent}25, ${accent}10)`,
                    borderColor: `${accent}66`,
                    boxShadow: `0 10px 30px -10px ${accent}40`,
                  } : isActive ? {
                    background: 'rgba(255,255,255,0.06)',
                    borderColor: 'rgba(255,255,255,0.15)',
                  } : {};

                  return (
                    <button
                      key={page.name}
                      type="button"
                      title={!this.state.sidebarExpanded ? page.name : undefined}
                      className={`group relative w-full flex items-center rounded-2xl border
                                  ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}
                                  bg-white/5 hover:bg-white/10 border-white/10 transition-all duration-300`}
                      style={activeStyle}
                      onClick={() => setTab(index)}
                    >
                      {/* Icon cell */}
                      <div
                        className={`flex items-center justify-center ${this.state.sidebarExpanded ? 'h-12 w-12 ml-1 my-1' : 'h-12 w-12 m-1'} rounded-xl border
                                    transition-transform duration-300 ${isActive ? 'scale-105' : 'group-hover:scale-105'}`}
                        style={isActive && accent ? { background: `${accent}14`, borderColor: `${accent}55` } : { background: 'rgba(0,0,0,0.25)', borderColor: 'rgba(255,255,255,0.08)' }}
                      >
                        {page.buttonContent ? page.buttonContent : null}
                      </div>

                      {/* Labels (only when expanded) */}
                      {this.state.sidebarExpanded && (
                        <div className="flex-1 min-w-0 pr-3 py-2">
                          <div className="font-medium text-sm truncate">{page.name}</div>
                          {page.subtext ? (
                            <div
                              className="text-xs mt-0.5 font-medium truncate"
                              style={isActive && accent ? { color: `${accent}dd` } : { color: isActive ? '#a7f3d0' : '#86efac' }}
                            >
                              {page.subtext}
                            </div>
                          ) : null}
                        </div>
                      )}

                      {/* Active indicator: left accent bar for better alignment */}
                      {isActive && (
                        <div
                          className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full"
                          style={{ backgroundColor: accent || '#ffffff', boxShadow: `0 0 8px ${(accent || '#ffffff')}66` }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer: User */}
            <div className="absolute bottom-0 left-0 right-0 px-3 py-3 border-t border-white border-opacity-10">
              <div className={`flex ${this.state.sidebarExpanded ? 'items-center px-3 py-2.5' : 'items-center justify-center -px-2'} bg-black bg-opacity-40 backdrop-blur-lg rounded-xl border border-white border-opacity-10`}>
                <div className="relative">
                  <UserAvatar classes={this.state.sidebarExpanded ? 'h-8 w-8 rounded-xl mx-2' : 'h-8 w-8 rounded-xl'} />
                  {accent ? (
                    <div
                      className="absolute inset-0 rounded-full opacity-20 blur-sm"
                      style={{ background: `radial-gradient(circle at center, ${accent}60, transparent 70%)` }}
                    />
                  ) : null}
                </div>
                {this.state.sidebarExpanded && (
                  <span className="ml-3 text-sm font-medium text-gray-200 truncate">{playerName}</span>
                )}
              </div>
            </div>
          </nav>
        )}

        {/* Main content */}
        <main
          className="flex-1 h-screen w-full overflow-x-hidden overflow-y-auto backdrop-blur"
          style={{ marginLeft: sidebarWidth }}
        >
          <div className="content-wrapper">
            <ServerConnectionWarning />
            {pages[tabToRender].content}
          </div>
        </main>

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
