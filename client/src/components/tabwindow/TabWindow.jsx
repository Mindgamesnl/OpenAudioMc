// eslint-disable-next-line max-classes-per-file
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showTextModal } from '../modal/InputModal';
import { setGlobalState } from '../../state/store';
import { msg } from '../../client/OpenAudioAppContainer';

export const setTab = (tab) => {
  setGlobalState({
    currentTab: tab,
  });
};

class TabWindow extends Component {
  constructor(props) {
    super(props);
    this.openUpgradeDialog = this.openUpgradeDialog.bind(this);
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

  render() {
    let pages = React.Children.map(this.props.children, (child) => ({
      name: child.props.name,
      content: child.props.content,
      hidden: child.props.hidden,
      buttonContent: child.props.buttonContent,
      subtext: child.props.subtext,
      colorWhenHasSubtext: child.props.colorWhenHasSubtext,
    }));

    pages = pages.filter((page) => !page.hidden);

    let playerUuid = '00000000-0000-0000-0000-000000000000';
    let playerName = 'Unknown';
    if (this.props.currentUser) {
      playerUuid = this.props.currentUser.uuid;
      playerName = this.props.currentUser.userName; // Assuming there is a name property in currentUser
    }

    // prevent index out of bounds
    if (this.props.currentTab >= pages.length) {
      setTab(0);
    }

    const hiddenNavbar = this.props.navbarDetails === false && pages.length === 1;

    return (
      <div className="h-screen w-screen flex flex-col md:flex-row bg-gray-800 bg-opacity-25 text-white">
        {!hiddenNavbar ? (
          <nav className="pt-6 navbar-bg shadow-lg flex flex-row sm:flex-col justify-between min-w-max">
            <div className="flex flex-col justify-start">
              <div className="flex items-center justify-center flex-col py-2 mx-6 min-w-max">
                <div className="flex items-center justify-center">
                  <img src={this.props.settings.logoImage} alt="Logo" className="h-8" />
                  <span className="ml-2 font-semibold text-xl text-gray-300">
                    {msg('serverName')}
                  </span>
                </div>
                <span className="ml-2 font-semibold text-xs text-gray-300 ">
                  {this.props.isPremium ? msg('navbar.premium') : msg('navbar.free')}
                </span>
              </div>
              <ul className="sm:mt-6 flex flex-row sm:flex-col">
                {pages.map((page, index) => (
                  <li className="relative sm:pr-6 pl-2 sm:pl-4 sm:mr-4 py-3" key={page.name}>
                    <span className={`absolute inset-y-0 left-0 w-1 ${this.props.currentTab === index ? 'themed-bg' : 'bg-transparent'} rounded-tr-lg rounded-br-lg`} aria-hidden="true" />
                    <button
                      className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150
                        ${this.props.currentTab === index ? 'hover:text-blue-500' : ''}
                        ${page.colorWhenHasSubtext && page.subtext ? 'text-green-400' : 'text-gray-300'}
                      `}
                      onClick={() => setTab(index)}
                      type={page.buttonContent ? 'button' : 'submit'}
                    >
                      {page.buttonContent ? page.buttonContent : null}
                      <div className="ml-4 w-full text-left">
                        <p>{page.name}</p>
                        {page.subtext ? <p className=" text-green-400 text-xs">{page.subtext}</p> : null}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Footer Section */}
            <div className="pb-2">
              <img
                src={`https://visage.surgeplay.com/face/512/${playerUuid}`}
                className="h-12 w-12 rounded-full mx-auto mb-2"
                alt="avatar"
              />
              <p className="text-sm text-center text-gray-300">
                {playerName}
              </p>
            </div>
          </nav>
        ) : null}

        <main className="flex justify-center overflow-x-hidden overflow-y-auto w-full h-full backdrop-blur">
          <div className="content-wrapper">
            {pages[this.props.currentTab].content}
          </div>
        </main>

        <div className="fixed bottom-0 right-0 pl-2 pb-2 pr-2 pt-2 bg-gray-800 rounded-tl-2xl">
          <a
            className="soft-text break-words"
            id="notice"
            href="https://openaudiomc.net/"
          >
            &copy; OpenAudioMc 2016-2023.All Rights Reserved.
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
    settings: state.settings,
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
