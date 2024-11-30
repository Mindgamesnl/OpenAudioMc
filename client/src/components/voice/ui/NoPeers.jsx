import React from 'react';
import {
  Users, ArrowRight, Radio, MapPin,
} from 'lucide-react';

function EmptyVoiceState() {
  return (
    <div className="w-full p-4">
      <div className="mx-auto">
        {/* Main Container */}
        <div className="relative">
          {/* Background with theme colors */}
          <div
            className="absolute inset-0 rounded-xl opacity-50"
            style={{
              background: `linear-gradient(
                167deg,
                var(--dark-primary-background) 50%,
                color-mix(in srgb, var(--primary-accent), var(--dark-primary-background) 65%),
                var(--dark-primary-background) 100%
              )`,
            }}
          />

          <div className="relative rounded-xl p-6 border border-gray-700/30 backdrop-blur-sm">
            {/* Icon Grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="flex items-center justify-center">
                <Users style={{ color: 'var(--primary-accent)' }} className="w-8 h-8 opacity-40" />
              </div>
              <div className="flex items-center justify-center">
                <Radio style={{ color: 'var(--primary-accent)' }} className="w-8 h-8 opacity-40" />
              </div>
              <div className="flex items-center justify-center">
                <MapPin style={{ color: 'var(--primary-accent)' }} className="w-8 h-8 opacity-40" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--primary-accent)' }}>
              Looking for Someone?
            </h2>

            <p className="text-gray-300 text-sm mb-4">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Voice chat is more fun together! Here's how you can connect with others:
            </p>

            {/* Action Cards */}
            <div className="grid gap-2">
              <ActionCard
                title="Move Closer to Players"
                description="Voice chat works based on proximity. Find and approach other players!"
                icon={<MapPin className="w-4 h-4" />}
              />

              <ActionCard
                title="Join a Channel"
                description="Use channels to talk regardless of distance"
                icon={<Radio className="w-4 h-4" />}
                onClick={() => window.open('https://openaudiomc.net/docs/channels', '_blank')}
                isLink
              />

              <ActionCard
                title="Invite Others"
                description="Let others know about voice chat - they might not have enabled it yet!"
                icon={<Users className="w-4 h-4" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionCard({
  title, description, icon, onClick, isLink,
}) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-800/40 border border-gray-700/30 ${
        isLink ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
      role={isLink ? 'button' : 'presentation'}
      style={{
        background: 'var(--dark-primary-background)',
      }}
    >
      <div className="p-1.5 rounded-lg" style={{ background: 'color-mix(in srgb, var(--primary-accent), transparent 85%)' }}>
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-white text-sm mb-0.5 flex items-center gap-1">
          {title}
          {isLink ? <ArrowRight className="w-3 h-3" style={{ color: 'var(--primary-accent)' }} /> : null}
        </h3>
        <p className="text-gray-400 text-xs">{description}</p>
      </div>
    </div>
  );
}

export default EmptyVoiceState;