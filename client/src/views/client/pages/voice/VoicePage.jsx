import React from 'react';
import { connect } from 'react-redux';
import {
  Users, UserPlus, Map, Radio, AlertTriangle, Loader2,
} from 'lucide-react';
import VoicePeerBox from '../../../../components/voice/VoicePeerBox';
import VoiceQuickSettings from '../../../../components/voice/ui/VoiceQuickSettings';
import GeneralVoiceSettings from '../../../../components/voice/ui/GeneralVoiceSettings';
import { ModerationWarning } from '../../../../components/voice/ModerationWarning';
import { msg } from '../../../../client/OpenAudioAppContainer';
import ChannelList from '../../../../components/voice/ui/VoiceChannels';

function VoiceErrorState({ color, errorMessage }) {
  return (
    <div className="h-full p-3">
      <div className="max-w-2/3 h-full mx-auto">
        <div className="h-full flex items-center justify-center">
          <div className="w-full max-w-md text-center">
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              <AlertTriangle size={32} className="text-red-500" />
            </div>

            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 mb-6 border border-red-500/50">
              <h3 className="text-lg font-medium text-red-400 mb-2">
                {msg('vc.state.error.title')}
              </h3>
              <p className="text-gray-400">
                {msg('vc.state.error.body')}
              </p>
              <p className="text-gray-400 mt-2">
                { errorMessage }
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-gray-400">
                <p>{msg('vc.state.error.hints')}</p>
                <ul className="list-disc text-left pl-4 mt-2 space-y-1">
                  <li>{msg('vc.state.error.fix1')}</li>
                  <li>{msg('vc.state.error.fix2')}</li>
                  <li>{msg('vc.state.error.fix3')}</li>
                  <li>{msg('vc.state.error.fix4')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VoiceLoadingState({ color }) {
  return (
    <div className="h-full p-3">
      <div className="max-w-2/3 h-full mx-auto">
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              <Loader2 size={32} className="animate-spin" style={{ color }} />
            </div>

            <h2 className="text-xl font-medium text-gray-200 mb-3">
              {msg('vc.state.loading.title')}
            </h2>

            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-2 bg-black/40 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full animate-pulse"
                  style={{ backgroundColor: color }}
                />
              </div>
              <p className="text-sm text-gray-400">
                {msg('vc.state.loading.body')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DarkPanel({ children, className = '', color }) {
  return (
    <div
      className={`bg-black/40 backdrop-blur-sm rounded-xl ${className}`}
      style={{ borderColor: color }}
    >
      {children}
    </div>
  );
}

function ActionCard({
  icon: Icon, title, description, color,
}) {
  return (
    <div
      className="bg-black/30 border rounded-lg p-4 hover:bg-black/40 transition-colors"
      style={{ borderColor: color }}
    >
      <div className="flex items-start gap-3">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <div>
          <h3 className="text-gray-200 font-medium mb-1">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

function VoicePage({ voiceState, color }) {
  if (voiceState.failedGeneric) {
    return <VoiceErrorState color={color} errorMessage={voiceState.failedErrorContext} />;
  }

  if (voiceState.loading) {
    return <VoiceLoadingState color={color} />;
  }

  return (
    <div className="h-full p-3">
      <div className="max-w-2/3 h-full mx-auto">
        <div className="flex h-full flex-col lg:flex-row gap-3">
          {/* Sidebar */}
          <aside className="w-full lg:w-[320px] space-y-3">
            <DarkPanel className="p-4" color={color}>
              <VoiceQuickSettings />
              {voiceState.serverHasModeration ? (
                <div className="mt-3">
                  <ModerationWarning />
                </div>
              ) : null}
            </DarkPanel>

            <DarkPanel color={color}>
              <GeneralVoiceSettings />
            </DarkPanel>
          </aside>
          {/* Main Content */}
          <main className="w-full lg:flex-1 flex flex-col">
            <DarkPanel className="h-full min-h-[500px] flex flex-col" color={color}>
              <div className="flex flex-col h-full">
                <div className="flex-1 min-h-0 p-4 overflow-y-auto">
                  {!voiceState.peers || Object.keys(voiceState.peers).length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center p-4">
                      <Users size={48} className="opacity-50 mb-4" style={{ color: '#ff6b6b' }} />
                      <h2 className="text-xl text-gray-200 font-medium mb-2">
                        {msg('vc.empty.title')}
                      </h2>
                      <p className="text-gray-400 mb-8 text-center">
                        {msg('vc.empty.description')}
                      </p>

                      <div className="w-full max-w-md space-y-3">
                        <ActionCard
                          icon={Map}
                          color={color}
                          title={msg('vc.empty.move.title')}
                          description={msg('vc.empty.move.description')}
                        />

                        <ActionCard
                          icon={Radio}
                          color={color}
                          title="Join a Voice Channel"
                          description="Browse available voice channels and join one to start talking"
                        />

                        <ActionCard
                          icon={UserPlus}
                          title={msg('vc.empty.invite.title')}
                          color={color}
                          description={msg('vc.empty.invite.description')}
                        />
                      </div>
                    </div>
                  ) : (
                    <VoicePeerBox />
                  )}
                </div>
                <div className="flex-shrink-0">
                  <ChannelList color={color} />
                </div>
              </div>
            </DarkPanel>
          </main>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  voiceState: state.voiceState,
  color: state.settings.accentColor,
});

export default connect(mapStateToProps)(VoicePage);
