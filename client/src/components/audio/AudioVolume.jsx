import React from 'react';
import { connect } from 'react-redux';
import { setGlobalState } from '../../state/store';

class AudioVolume extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    setGlobalState({ settings: { normalVolume: parseInt(e.target.value, 10) } });
  }

  render() {
    const { volume } = this.props;

    return (
      <div className="relative w-full py-4">
        {/* Slider container with rounded background */}
        <div
          className="relative h-16 flex items-center px-4 rounded-2xl"
          style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {/* Track background with inner shadow */}
          <div
            className="absolute left-4 right-4 h-3 rounded-full"
            style={{
              backgroundColor: '#1a1a2e',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)',
            }}
          />

          {/* Filled track with gradient and glow */}
          <div
            className="absolute left-4 h-3 rounded-full"
            style={{
              width: `calc((100% - 32px) * ${volume / 100})`,
              background: 'linear-gradient(90deg, var(--primary-accent) 0%, color-mix(in srgb, var(--primary-accent) 80%, #fff) 100%)',
              boxShadow: '0 0 12px color-mix(in srgb, var(--primary-accent) 50%, transparent)',
            }}
          />

          {/* Native range input */}
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={this.onChange}
            className="absolute left-4 right-4 h-full cursor-pointer"
            style={{
              margin: 0,
              WebkitAppearance: 'none',
              appearance: 'none',
              background: 'transparent',
            }}
          />

          {/* Custom thumb with glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: `calc(16px + (100% - 32px) * ${volume / 100} - 14px)`,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <div
              className="w-7 h-7 rounded-full bg-white flex items-center justify-center"
              style={{
                boxShadow: '0 2px 10px rgba(0,0,0,0.4), 0 0 20px color-mix(in srgb, var(--primary-accent) 40%, transparent)',
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: 'var(--primary-accent)' }}
              />
            </div>
          </div>
        </div>

        {/* Volume level indicators */}
        <div className="flex justify-between mt-3 px-4">
          <span className="text-gray-500 text-xs">0%</span>
          <span className="text-gray-500 text-xs">50%</span>
          <span className="text-gray-500 text-xs">100%</span>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AudioVolume);

function mapStateToProps(state) {
  return {
    volume: state.settings.normalVolume,
  };
}
