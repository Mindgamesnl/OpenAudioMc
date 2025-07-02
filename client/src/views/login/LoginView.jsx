/* eslint-disable */
import React from 'react';

import '@fontsource/roboto/300.css';
import './css/login-glow.css';
import JAVA_LOGO from './platforms/editions/java.png';
import BEDROCK_LOGO from './platforms/editions/bedrock.png';
import {FadeToCtx} from '../../components/contexts';
import {BedrockAuthFlow} from './platforms/bedrock/BedrockAuthFlow';
import {BaseSegmentedPage} from "../../components/layout/BaseSegmentedPage.jsx";
import PropTypes from "prop-types";

class LoginPageContent extends React.Component {
  static contextType = FadeToCtx;

  // prop types
  static propTypes = {
    serverDisplayName: PropTypes.string,
    logoImage: PropTypes.string,
    accentColor: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      activeTab: 'game' // Add activeTab state - 'game' or 'token'
    };

    this.startBedrock = this.startBedrock.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.switchTab = this.switchTab.bind(this); // Add method binding for tab switching
  }

  onSubmit() {
    let name = this.state.token;

    if (name.indexOf('#') !== -1) {
      name = name.split('#')[1];
    }

    if (name.length > 3) {
      window.location = `#${name}`;
      window.location.reload();
    }
  }

  startBedrock() {
    this.context.fadeToComponent(<BedrockAuthFlow/>);
  }

  // Add method to switch between tabs
  switchTab(tab) {
    this.setState({ activeTab: tab });
  }

  render() {
    const { activeTab } = this.state;
    const { serverDisplayName, logoImage } = this.props;

    return (
      <>
        <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start space-y-8 pt-8">
          <div className="text-center lg:text-left">
            <div className="relative">
              <img src={logoImage} alt="logo" className="relative w-48 h-48 object-contain mx-auto lg:mx-0"/>
            </div>
            <h1
              style={{ fontFamily: 'roboto' }}
              className="text-white text-5xl font-bold mt-6"
            >
              {serverDisplayName}
            </h1>
            <p className="text-gray-400 mt-4 max-w-md">
              Connect your game audio experience to immerse yourself in a whole new dimension of gameplay
            </p>
          </div>


          <div className="hidden lg:block w-full h-24 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  style={{ fill: 'var(--accent-color, #6366f1)', opacity: 0.15 }}
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-7/12 max-w-2xl">
          <div
            className="backdrop-blur-xl bg-black bg-opacity-30 rounded-2xl p-8 border shadow-2xl"
            style={{ borderColor: 'var(--accent-color, #6366f1)', borderWidth: '1px' }}
          >
            <div className="flex flex-col space-y-6">
              {/* Tab navigation */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-black bg-opacity-30 rounded-xl mb-4">
                <button
                  onClick={() => this.switchTab('game')}
                  className={`py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'game'
                      ? 'text-white bg-opacity-80 backdrop-blur-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  style={activeTab === 'game' ? { backgroundColor: 'var(--accent-color, #6366f1)', opacity: 0.9 } : {}}
                >
                  Connect Game
                </button>
                <button
                  onClick={() => this.switchTab('token')}
                  className={`py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'token'
                      ? 'text-white bg-opacity-80 backdrop-blur-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  style={activeTab === 'token' ? { backgroundColor: 'var(--accent-color, #6366f1)', opacity: 0.9 } : {}}
                >
                  Direct Token
                </button>
              </div>

              {/* Game Options Tab Content */}
              {activeTab === 'game' && (
                <>
                  {/* Java Edition Option */}
                  <div className="group">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative">
                        <div
                          className="absolute -inset-1 rounded-full blur opacity-60 group-hover:opacity-100 transition-all duration-300"
                          style={{ backgroundColor: 'var(--accent-color, #6366f1)' }}></div>
                        <img src={JAVA_LOGO} alt="java logo" className="relative w-14 h-14 object-contain"/>
                      </div>
                      <div>
                        <h2 className="text-white text-xl font-bold">Java Edition</h2>
                        <p className="text-gray-400 text-sm">Simple in-game command activation</p>
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-xl mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r opacity-20"
                           style={{
                             backgroundImage: `linear-gradient(to right, var(--accent-color, #6366f1), transparent)`
                           }}></div>
                      <div className="flex items-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
                        <div className="flex-1">
                          <p className="text-gray-300">
                            Type <span className="font-mono text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                                /audio</span> in the game chat
                          </p>
                          <p className="text-gray-400 text-xs mt-1">A clickable message will appear for easy login</p>
                        </div>
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bedrock Edition Option */}
                  <div className="group">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative">
                        <div
                          className="absolute -inset-1 rounded-full blur opacity-60 group-hover:opacity-100 transition-all duration-300"
                          style={{ backgroundColor: 'var(--accent-color, #6366f1)' }}></div>
                        <img src={BEDROCK_LOGO} alt="bedrock logo" className="relative w-14 h-14 object-contain"/>
                      </div>
                      <div>
                        <h2 className="text-white text-xl font-bold">Bedrock Edition</h2>
                        <p className="text-gray-400 text-sm">Keep playing while connecting</p>
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden backdrop-blur-sm mb-4">
                      <button
                        type="submit"
                        onClick={this.startBedrock}
                        className="w-full py-4 bg-opacity-10 text-white font-medium relative overflow-hidden group"
                        style={{
                          backgroundColor: 'var(--accent-color, #6366f1)',
                          borderWidth: '1px',
                          borderColor: 'var(--accent-color, #6366f1)',
                        }}
                      >
                        <div
                          className="absolute inset-0 w-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                          style={{
                            backgroundColor: 'var(--accent-color, #6366f1)',
                            opacity: 0.2,
                          }}
                        ></div>
                        <div className="relative flex items-center justify-center space-x-2">
                          <span>Continue to Bedrock Login</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Token Input Tab Content */}
              {activeTab === 'token' && (
                <div className="py-4">
                  <div className="mb-6">
                    <h2 className="text-white text-xl font-bold mb-2">Direct Token Authentication</h2>
                    <p className="text-gray-400 text-sm">
                      Enter your token or pin provided by the game or server administrator
                    </p>
                  </div>

                  <div className="relative mb-6">
                    <input
                      id="token"
                      type="text"
                      placeholder="Enter your authentication token"
                      onInput={(e) => this.setState({ token: e.target.value })}
                      className="w-full bg-black bg-opacity-60 border-0 rounded-lg py-4 px-4 pl-12 text-white placeholder-gray-500 focus:ring-2 focus:outline-none transition-all duration-200"
                      style={{
                        borderWidth: '1px',
                        borderColor: 'rgba(255,255,255,0.1)',
                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
                        caretColor: 'var(--accent-color, #6366f1)',
                      }}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </div>
                  </div>

                  <button
                    type="submit"
                    onClick={this.onSubmit}
                    className="w-full py-4 bg-opacity-10 text-white font-medium relative overflow-hidden group rounded-lg"
                    style={{
                      backgroundColor: 'var(--accent-color, #6366f1)',
                      borderWidth: '1px',
                      borderColor: 'var(--accent-color, #6366f1)',
                    }}
                  >
                    <div
                      className="absolute inset-0 w-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                      style={{
                        backgroundColor: 'var(--accent-color, #6366f1)',
                        opacity: 0.2,
                      }}
                    ></div>
                    <div className="relative flex items-center justify-center space-x-2">
                      <span>Submit Token</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </div>
                  </button>

                  <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm">
                      Don't have a token? <button onClick={() => this.switchTab('game')}
                                                  className="text-gray-300 hover:text-white">
                      Try connecting directly from the game
                    </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default function LoginView(props) {
  return (
    <BaseSegmentedPage showVersion>
      <LoginPageContent />
    </BaseSegmentedPage>
  );
}
