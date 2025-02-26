import React from 'react';
import PropTypes from 'prop-types';
import { BaseSegmentedPage } from '../layout/BaseSegmentedPage';
import { OaStyleCard } from '../card/OaStyleCard';

export function LoadingSpinnerBox(props) {
  return (
    <OaStyleCard
      title={props.title}
      body={(
        <div className="flex flex-col items-center py-6">
          {/* Animated spinner with glow */}
          <div className="relative mb-8">
            <div
              className="absolute -inset-4 rounded-full blur-xl opacity-30"
              style={{ backgroundColor: 'var(--accent-color, #6366f1)' }}
            />
            <div className="relative">
              {/* Outer ring */}
              <div className="w-24 h-24 rounded-full border-4 border-gray-700 border-opacity-20 flex items-center justify-center">
                {/* Spinning element */}
                <div
                  className="w-20 h-20 rounded-full border-4 border-t-4 animate-spin"
                  style={{
                    borderColor: 'transparent',
                    borderTopColor: 'var(--accent-color, #6366f1)',
                  }}
                />
              </div>

              {/* Inner pulse effect */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ animation: 'pulse 2s infinite ease-in-out' }}
              >
                <div
                  className="w-8 h-8 rounded-full"
                  style={{
                    backgroundColor: 'var(--accent-color, #6366f1)',
                    opacity: 0.3,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Message content */}
          <div className="text-center">
            <p className="text-xl font-medium text-white mb-2">
              {props.message || 'Loading...'}
            </p>
            <p className="text-gray-400 text-sm">
              Please wait while we prepare everything for you
            </p>
          </div>
        </div>
      )}
    />
  );
}

LoadingSpinnerBox.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
};

LoadingSpinnerBox.defaultProps = {
  message: 'Loading...',
};

// Also provide the enhanced LoadingView
export function LoadingView(props) {
  return (
    <BaseSegmentedPage showVersion>
      <div className="w-full max-w-2xl mx-auto">
        <LoadingSpinnerBox
          title="Loading OpenAudioMc"
          message={props.loading}
          footer={`Version ${props.version?.revision || '1.0.0'}, line ${props.version?.tag || 'stable'}`}
        />
      </div>
    </BaseSegmentedPage>
  );
}

LoadingView.propTypes = {
  loading: PropTypes.string,
  version: PropTypes.shape({
    revision: PropTypes.string,
    tag: PropTypes.string,
  }),
};

LoadingView.defaultProps = {
  loading: 'Setting things up...',
  version: {
    revision: '1.0.0',
    tag: 'stable',
  },
};

export default LoadingView;
