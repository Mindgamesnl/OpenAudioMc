/* eslint-disable */
import React from 'react';
import { VoiceModule } from '../../client/services/voice/VoiceModule';
import { getGlobalState } from '../../state/store';

import './onboarding.css';
import { msg } from '../../client/OpenAudioAppContainer';

export class VcOnboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.state.clicked) return;
    this.setState({ clicked: true });
    VoiceModule.startVoiceChat();
  }

  render() {
    return (
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {msg('vc.title')}
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            {msg('vc.onboarding').replace('%range', getGlobalState().voiceState.radius)}
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Privacy Info Card */}
          <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-xl p-5 border border-white border-opacity-5">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-amber-500 bg-opacity-20 rounded-lg border border-amber-500 border-opacity-30 flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div
                className="text-sm text-gray-300 leading-relaxed flex-1"
                dangerouslySetInnerHTML={{ __html: msg('vc.safetyFooter') }}
              />
            </div>
          </div>

          {/* Join Button */}
          <div className="pt-2">
            <button
              onClick={this.onClick}
              disabled={this.state.clicked}
              type={this.state.clicked ? 'button' : 'submit'}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-200 border-2 ${
                this.state.clicked 
                  ? 'bg-gray-600 bg-opacity-50 text-gray-400 cursor-not-allowed border-gray-600 border-opacity-50' 
                  : 'bg-green-500 hover:bg-green-400 text-white border-green-500 hover:border-green-400 shadow-lg hover:shadow-green-500/20 transform hover:scale-[1.02] active:scale-[0.98]'
              }`}
              id="vc-connect-button"
            >
              {this.state.clicked ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Connecting...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <span>{msg('vc.join')}</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
