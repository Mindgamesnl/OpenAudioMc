import React from 'react';
import { Volume2, Mic } from 'lucide-react';
import { connect } from 'react-redux';
import { setGlobalState } from '../../state/store';
import { msg } from '../../client/OpenAudioAppContainer';

function ClickPrompt({ currentUser, voiceState }) {
  let welcomeWithName = msg('home.confirmLoginBody');
  welcomeWithName = welcomeWithName.replace('%name', currentUser.userName);

  return (
    <div className="fixed inset-0 bg-gray-900/40 flex items-center justify-center">
      <div className="w-full max-w-4xl px-4">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center">
            <img
              src={`https://visage.surgeplay.com/bust/512/${currentUser?.uuid}`}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-blue-500 mx-auto mb-4"
            />
            <p className="text-white text-xl">
              <div
                dangerouslySetInnerHTML={{ __html: welcomeWithName }}
              />
            </p>
          </div>

          <div className="w-full max-w-md space-y-4">
            <button
              onClick={() => {
                setGlobalState({ voiceState: { autoJoinVoiceChat: false } });
              }}
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg transform transition-all hover:scale-102 flex items-center justify-center space-x-4"
            >
              <Volume2 size={28} />
              <span className="text-lg font-medium">{msg('home.confirmLoginButton')}</span>
            </button>
            {voiceState?.serverHasVoiceChat ? (
              <button
                type="button"
                onClick={() => {
                  setGlobalState({ voiceState: { autoJoinVoiceChat: true } });
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg transform transition-all hover:scale-102 flex items-center justify-center space-x-4"
              >
                <Mic size={28} />
                <span className="text-lg font-medium">
                  {msg('home.confirmLoginWithVoicechat')}
                </span>
              </button>
            ) : null}
          </div>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute bottom-1 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"
            />
            <div
              className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-green-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(ClickPrompt);

function mapStateToProps(state) {
  return {
    voiceState: state.voiceState,
    currentUser: state.currentUser,
  };
}
