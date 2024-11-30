import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { msg } from '../../client/OpenAudioAppContainer';
import './modwarning.css';

export function ModerationWarning() {
  return (
    <div className="mt-3 flex items-center gap-3 rounded-lg bg-red-950/30 p-4 border border-red-500/20">
      <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-400" />
      <p className="text-sm text-red-200 font-medium">
        {msg('vc.voiceModerationEnabled')}
      </p>
    </div>
  );
}
