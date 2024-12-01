import React, { useState, useCallback, memo } from 'react';
import {
  Radio, Users, Globe, Loader,
} from 'lucide-react';
import { connect } from 'react-redux';
import { SocketManager } from '../../../client/services/socket/SocketModule';
import * as PluginChannel from '../../../client/util/PluginChannel';
import { msg } from '../../../client/OpenAudioAppContainer';

// Extracted socket communication to separate functions
const sendChannelAction = (action, channelName) => {
  SocketManager.send(PluginChannel.CHANNEL_UI, {
    action,
    target: channelName,
  });
};

// Memoized individual channel component
const ChannelCard = memo(({
  channel,
  isActive,
  color,
  onJoin,
  onLeave,
  hasActiveChannel,
  loadingChannel,
}) => {
  channel.firstMembers = Object.values(channel.firstMembers);
  const { name, firstMembers, otherMembers = 0 } = channel;
  const totalMembers = (firstMembers?.length || 0) + otherMembers;
  const isLoading = loadingChannel === name;
  const buttonDisabled = loadingChannel !== null;

  return (
    <div
      className={`flex-shrink-0 w-[220px] rounded relative group flex flex-col ${
        isActive
          ? 'bg-black/80 ring-1 ring-white/20'
          : 'bg-black/20 hover:bg-white/5'
      }`}
    >
      <div className="p-3 flex-1 flex flex-col min-h-[160px]">
        <div className="flex items-center gap-2 mb-3">
          <Globe size={14} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-100">{name}</span>
          <div className="ml-auto flex items-center gap-1.5">
            <Users size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400">{totalMembers}</span>
          </div>
        </div>

        <div className="space-y-2 flex-1">
          {Array.isArray(firstMembers) && firstMembers.map((member) => (
            <div key={member.uuid} className="flex items-center gap-2">
              <img
                src={`https://crafatar.com/avatars/${member.uuid}?size=24&overlay=true`}
                alt={member.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-gray-300 truncate">
                {member.name}
              </span>
            </div>
          ))}
          {otherMembers > 0 && (
            <div className="text-xs text-gray-400 mt-2">
              +
              {otherMembers}
              {' '}
              {msg('vc.channel.moreMembers')}
            </div>
          )}
          {totalMembers === 0 && (
            <span className="text-sm text-gray-500 italic">
              {msg('vc.channel.noMembersYet')}
            </span>
          )}
        </div>

        {isActive ? (
          <button
            type="button"
            onClick={() => onLeave(name)}
            disabled={buttonDisabled}
            className="w-full py-2 rounded text-sm font-medium transition-colors mt-auto bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-600 disabled:text-gray-300 disabled:opacity-50"
            style={buttonDisabled ? {} : { opacity: '1 !important' }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size={14} className="animate-spin" />
                {msg('vc.channel.joining')}
              </span>
            ) : (
              msg('vc.channel.leave')
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onJoin(name)}
            disabled={hasActiveChannel || !channel.joinable || buttonDisabled}
            className="w-full py-2 rounded text-sm font-medium transition-colors mt-auto disabled:bg-gray-600 disabled:text-gray-300 disabled:opacity-50"
            style={!hasActiveChannel && channel.joinable && !buttonDisabled ? {
              backgroundColor: color,
              color: 'white',
              opacity: '1 !important',
            } : {}}
          >
            {/* eslint-disable-next-line no-nested-ternary */}
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size={14} className="animate-spin" />
                {msg('vc.channel.leaving')}
              </span>
              // eslint-disable-next-line no-nested-ternary
            ) : hasActiveChannel ? (
              msg('vc.channel.leaveCurrentFirst')
            ) : !channel.joinable ? (
              msg('vc.channel.noPermissions')
            ) : (
              msg('vc.channel.join')
            )}
          </button>
        )}
      </div>

      {isActive ? (
        <>
          <div
            className="absolute left-0 top-0 h-full w-1 rounded-l"
            style={{ backgroundColor: color }}
          />
          <div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 px-2 py-0.5 rounded text-xs font-medium text-white"
            style={{ backgroundColor: color }}
          >
            Active
          </div>
        </>
      ) : null}
    </div>
  );
});

function ChannelList({ channels, activeChannelId, color }) {
  const [loadingChannel, setLoadingChannel] = useState(null);
  const hasActiveChannel = activeChannelId != null;
  const channelArray = Object.values(channels);

  const handleJoinChannel = useCallback(async (channelName) => {
    setLoadingChannel(channelName);
    try {
      sendChannelAction('JOIN_CHANNEL', channelName);
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 2500));
    } finally {
      setLoadingChannel(null);
    }
  }, []);

  const handleLeaveChannel = useCallback(async (channelName) => {
    setLoadingChannel(channelName);
    try {
      sendChannelAction('LEAVE_CHANNEL', channelName);
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 2500));
    } finally {
      setLoadingChannel(null);
    }
  }, []);

  // do we not even have channels? then don't render
  if (Object.keys(channels).length === 0) {
    return null;
  }
  return (
    <div className="border-t border-white/10">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Radio size={14} style={{ color }} />
          <span className="text-sm font-medium text-gray-200">
            {msg('vc.channel.title')}
          </span>
        </div>
        <span className="text-xs text-gray-400">
          {channelArray.length}
          {' '}
          {channelArray.length === 1 ? msg('vc.channel.single') : msg('vc.channel.multiple')}
          {' '}
          available
        </span>
      </div>

      <div className="flex gap-3 p-3 overflow-x-auto">
        {channelArray.map((channel) => (
          <ChannelCard
            key={channel.name}
            channel={channel}
            isActive={activeChannelId === channel.name}
            color={color}
            onJoin={handleJoinChannel}
            onLeave={handleLeaveChannel}
            hasActiveChannel={hasActiveChannel}
            loadingChannel={loadingChannel}
          />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  channels: state.voiceChannels.channels,
  activeChannelId: state.voiceChannels.activeChannelId,
  color: state.settings.accentColor,
});

export default connect(mapStateToProps)(ChannelList);
