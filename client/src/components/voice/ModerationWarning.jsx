import React from 'react';
import { msg } from '../../client/OpenAudioAppContainer';

export function ModerationWarning() {
  return (
    <div className="content-section pb-5">
      <div className="content-wrapper-box audio-content full bg-red-800">
        <div className="content-wrapper-context full">
          <div className="content-text full">
            <div className="text-center">
              <p className="soft-text">
                {msg('vc.voiceModerationEnabled')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
