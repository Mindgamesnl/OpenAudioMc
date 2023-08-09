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
      <div className="content-section shockwave">
        <div
          className="content-card-collection items-stretch"
        >
          <div className="flex justify-center">
            <div className="content-card wide-card pt-0 pb-0">
              <div className="content-card-content pt-0 pb-0">
                <span className="pt-5 inline">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path
                      d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10"
                    />
                    <path
                      d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2"
                    />
                  </svg>
                  {msg('vc.title')}
                </span>
                <div className="overflow-visible lg:grid lg:grid-cols-2 lg:gap-4">
                  <div className="lg:self-center py-3">
                    {msg('vc.onboarding').replace('%range', getGlobalState().voiceState.radius)}
                    <div className="content-card-buttons">
                      <div
                        dangerouslySetInnerHTML={{ __html: msg('vc.safetyFooter') }}
                      />
                    </div>
                    <div className="content-card-buttons w-full">
                      <button
                        onClick={this.onClick}
                        disabled={this.state.clicked}
                        type={this.state.clicked ? 'button' : 'submit'}
                        className="animate-pulse content-pill status-button green w-full mb-4 md:mb-0"
                        id="vc-connect-button"
                      >
                        {msg('vc.join')}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center z-50 -mt-8 hidden-on-mobile">
                    <img
                      className="transform rounded-xl object-cover w-2/5 object-left-top"
                      src="assets/bust.png"
                      alt="App screenshot"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
