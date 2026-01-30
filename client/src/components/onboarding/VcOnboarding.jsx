/* eslint-disable */
import React from 'react';
import { VoiceModule } from '../../client/services/voice/VoiceModule';
import { getGlobalState } from '../../state/store';

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
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'var(--primary-accent)' }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div className="min-w-0">
            <h2 className="text-white font-semibold">{msg('vc.title')}</h2>
            <p className="text-gray-500 text-sm">
              {msg('vc.onboarding').replace('%range', getGlobalState().voiceState.radius)}
            </p>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex gap-2">
            <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p
              className="text-gray-400 text-xs leading-relaxed"
              dangerouslySetInnerHTML={{ __html: msg('vc.safetyFooter') }}
            />
          </div>
        </div>

        {/* Join Button */}
        <button
          onClick={this.onClick}
          disabled={this.state.clicked}
          type="button"
          className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-colors ${
            this.state.clicked 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-500 text-white'
          }`}
        >
          {this.state.clicked ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Connecting...
            </span>
          ) : (
            msg('vc.join')
          )}
        </button>
      </div>
    );
  }
}
