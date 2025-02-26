import React from 'react';
import {
  Mic, Volume2, Music, HeadphonesIcon,
} from 'lucide-react';
import { connect } from 'react-redux';
import { setGlobalState } from '../../state/store';
import { msg } from '../../client/OpenAudioAppContainer';
import { BaseSegmentedPage } from '../layout/BaseSegmentedPage';

function StyledClickPrompt(props) {
  const { currentUser, voiceState } = props;
  let welcomeWithName = msg('home.confirmLoginBody');
  welcomeWithName = welcomeWithName.replace('%name', currentUser.userName);

  return (
    <BaseSegmentedPage showVersion>
      <div className="container mx-auto my-8 z-10 flex flex-col lg:flex-row items-center justify-center gap-8 px-4">
        {/* Left panel - User avatar and welcome text */}
        <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start space-y-8 pt-8">
          <div className="text-center lg:text-left">
            <div className="relative">
              <img
                src={`https://visage.surgeplay.com/bust/512/${currentUser?.uuid}`}
                alt="Profile"
                className="relative w-48 h-48 object-contain mx-auto lg:mx-0 rounded-full border-2"
                style={{ borderColor: 'var(--accent-color, #6366f1)' }}
              />
            </div>
            <h1
              className="text-white text-3xl font-bold mt-6"
            >
              Welcome back,
              {' '}
              {currentUser.userName}
              !
            </h1>
            <div className="text-gray-400 mt-4 max-w-md">
              <div dangerouslySetInnerHTML={{ __html: welcomeWithName }} />
              <p className="mt-4">
                {msg('home.onboarding.subtext')}
              </p>
            </div>
          </div>

          {/* Animated waves */}
          <div className="hidden lg:block w-full h-24 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  style={{ fill: 'var(--accent-color, #6366f1)', opacity: 0.15 }}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right panel - Audio connection options */}
        <div className="w-full lg:w-7/12 max-w-2xl">
          <div
            className="backdrop-blur-xl bg-black bg-opacity-30 rounded-2xl p-8 border shadow-2xl"
            style={{ borderColor: 'var(--accent-color, #6366f1)', borderWidth: '1px' }}
          >
            <div className="flex flex-col space-y-6">
              <h2 className="text-white text-2xl font-bold mb-2">{msg('home.onboarding.title')}</h2>
              <p className="text-gray-400">{msg('home.onboarding.description')}</p>

              {/* Audio Only Option */}
              <div className="group">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <div
                      className="absolute -inset-1 rounded-full blur opacity-60 group-hover:opacity-100 transition-all duration-300"
                      style={{ backgroundColor: 'var(--accent-color, #6366f1)' }}
                    />
                    <div
                      className="relative w-14 h-14 flex items-center justify-center bg-black bg-opacity-50 rounded-full border-2"
                      style={{ borderColor: 'var(--accent-color, #6366f1)' }}
                    >
                      <HeadphonesIcon size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-white text-xl font-bold">{msg('home.onboarding.audioonly.title')}</h2>
                    <p className="text-gray-400 text-sm">{msg('home.onboarding.audioonly.description')}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setGlobalState({ voiceState: { autoJoinVoiceChat: false } });
                  }}
                  type="button"
                  className="w-full py-4 bg-opacity-10 text-white font-medium relative overflow-hidden group rounded-xl"
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
                  />
                  <div className="relative flex items-center justify-center space-x-2">
                    <Volume2 size={20} />
                    <span>{msg('home.confirmLoginButton')}</span>
                  </div>
                </button>
              </div>

              {/* Voice Chat Option - Only if available */}
              {voiceState?.serverHasVoiceChat ? (
                <div className="group pt-4 border-t border-gray-800">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <div
                        className="absolute -inset-1 rounded-full blur opacity-60 group-hover:opacity-100 transition-all duration-300"
                        style={{ backgroundColor: '#10B981' }}
                      />
                      <div
                        className="relative w-14 h-14 flex items-center justify-center bg-black bg-opacity-50 rounded-full border-2"
                        style={{ borderColor: '#10B981' }}
                      >
                        <Mic size={24} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-white text-xl font-bold">{msg('home.onboarding.withvoice.title')}</h2>
                      <p className="text-gray-400 text-sm">{msg('home.onboarding.withvoice.description')}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setGlobalState({ voiceState: { autoJoinVoiceChat: true } });
                    }}
                    className="w-full py-4 bg-opacity-10 text-white font-medium relative overflow-hidden group rounded-xl"
                    style={{
                      backgroundColor: '#10B981',
                      borderWidth: '1px',
                      borderColor: '#10B981',
                    }}
                  >
                    <div
                      className="absolute inset-0 w-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                      style={{
                        backgroundColor: '#10B981',
                        opacity: 0.2,
                      }}
                    />
                    <div className="relative flex items-center justify-center space-x-2">
                      <Music size={20} />
                      <span>{msg('home.confirmLoginWithVoicechat')}</span>
                    </div>
                  </button>
                </div>
              ) : null}

              {/* Benefits list */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <h3 className="text-white text-sm font-semibold mb-3">{msg('home.onboarding.features.title')}</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div
                      className="flex-shrink-0 h-5 w-5 rounded-full bg-opacity-20 flex items-center justify-center mr-2"
                      style={{ backgroundColor: 'var(--accent-color, #6366f1)' }}
                    >
                      <span className="text-xs" style={{ color: 'var(--accent-color, #6366f1)' }}>✓</span>
                    </div>
                    <p className="text-gray-400 text-sm">{msg('home.onboarding.features.one')}</p>
                  </li>
                  <li className="flex items-start">
                    <div
                      className="flex-shrink-0 h-5 w-5 rounded-full bg-opacity-20 flex items-center justify-center mr-2"
                      style={{ backgroundColor: 'var(--accent-color, #6366f1)' }}
                    >
                      <span className="text-xs" style={{ color: 'var(--accent-color, #6366f1)' }}>✓</span>
                    </div>
                    <p className="text-gray-400 text-sm">{msg('home.onboarding.features.two')}</p>
                  </li>
                  <li className="flex items-start">
                    <div
                      className="flex-shrink-0 h-5 w-5 rounded-full bg-opacity-20 flex items-center justify-center mr-2"
                      style={{ backgroundColor: 'var(--accent-color, #6366f1)' }}
                    >
                      <span className="text-xs" style={{ color: 'var(--accent-color, #6366f1)' }}>✓</span>
                    </div>
                    <p className="text-gray-400 text-sm">{msg('home.onboarding.features.three')}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseSegmentedPage>
  );
}

function mapStateToProps(state) {
  return {
    voiceState: state.voiceState,
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(StyledClickPrompt);
