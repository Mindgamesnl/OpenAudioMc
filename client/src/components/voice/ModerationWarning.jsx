import React from 'react';

export function ModerationWarning() {
  return (
    <div className="content-section pb-5">
      <div className="content-wrapper-box audio-content full bg-red-800">
        <div className="content-wrapper-context full">
          <div className="content-text full">
            <div className="text-center">
              <p className="soft-text">
                This server has moderation enabled. Select staff may be listening in while your mic is active.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
