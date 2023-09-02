import React from 'react';
import { connect } from 'react-redux';
import './clickprompt.css';
import { BlackoutPage } from '../layout/BlackoutPage';
import { getGlobalState, setGlobalState } from '../../state/store';
import { msg } from '../../client/OpenAudioAppContainer';

function ClickPrompt(props) {
  const { currentUser } = getGlobalState();

  let welcomeWithName = msg('home.confirmLoginBody');
  welcomeWithName = welcomeWithName.replace('%name', currentUser.userName);

  // instant join voice button as well
  let voiceButton = (
    <button
      type="submit"
      onClick={() => {
        setGlobalState({ voiceState: { autoJoinVoiceChat: true } });
      }}
      className="w-full mt-2 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium common-rounded-top common-rounded-bottom text-sm px-5 py-2.5 text-center"
    >
      <div className="flex">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
            />
          </svg>
        </div>
        <div className="items-center justify-center w-full">
          {msg('home.confirmLoginWithVoicechat')}
        </div>
      </div>
    </button>
  );

  if (!props.voiceState.serverHasVoiceChat) {
    voiceButton = '';
  }

  return (
    <BlackoutPage backgroundColor="black">
      <div className="py-12">
        <section className="mb-32 text-gray-800 text-center lg:text-left w-full pt-32">
          <div className="container mx-auto xl:px-32 text-center lg:text-left">
            <div className="grid lg:grid-cols-2 flex items-center">
              <div className="mb-12 lg:mb-0 md:mt-10">
                <div
                  className="relative block common-rounded-top common-rounded-bottom shadow-lg px-6 py-12 md:px-12 lg:-mr-14 themed-text clickprompt-box"
                >
                  <div>
                    <div className="text-white m-5">
                      <div className="flex items-center space-x-3">
                        <div className="h-20 w-20 flex-shrink-0">
                          <img
                            className="h-20 w-20 rounded-full bg-gray-300"
                            src={`https://visage.surgeplay.com/bust/512/${currentUser.uuid}`}
                            style={{ borderColor: '#32415d', borderWidth: '2px' }}
                            alt=""
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-200">
                            <div
                              dangerouslySetInnerHTML={{ __html: welcomeWithName }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium common-rounded-top common-rounded-bottom text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <div className="flex">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                            />
                          </svg>
                        </div>
                        <div className="items-center justify-center w-full">
                          {msg('home.confirmLoginButton')}
                        </div>
                      </div>
                    </button>
                    {voiceButton}
                  </div>
                </div>
              </div>
              <div className="shadow-lg fancy-border-radius rotate-lg-6 w-full login-image" />
            </div>
          </div>
        </section>
      </div>
    </BlackoutPage>
  );
}

export default connect(mapStateToProps)(ClickPrompt);

function mapStateToProps(state) {
  return {
    voiceState: state.voiceState,
  };
}
