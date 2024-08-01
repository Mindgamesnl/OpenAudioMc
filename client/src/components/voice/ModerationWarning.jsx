import React from 'react';
import { msg } from '../../client/OpenAudioAppContainer';

import './modwarning.css';

export function ModerationWarning() {
  return (
    <div className="moderation-warning m-5">
      <div className="content-text full">
        <div className="text-center">
          {msg('vc.voiceModerationEnabled')}
        </div>
      </div>
    </div>

  );
}
