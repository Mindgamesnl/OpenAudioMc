import React from 'react';

export function UnsupportedBanner(props) {
  return (
    <div className="content-section">
      <div className="content-wrapper-box audio-content full bg-red-800">
        <div className="content-wrapper-context full">
          <div className="content-text full">
            <div className="text-center">
              <p className="soft-text">
                {props.children}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
