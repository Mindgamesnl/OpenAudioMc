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
        {/* Slider container with flat background */}
        <div
          className="relative h-14 flex items-center rounded-2xl overflow-hidden"
          style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Track background */}
          <div
            className="absolute left-0 right-0 h-full"
            style={{
              backgroundColor: 'transparent',
            }}
          >
            {/* Center line visual */}
            <div
              className="absolute left-0 right-0 h-2.5"
              style={{
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: '#1f2937',
              }}
            />
          </div>

          {/* Filled track */}
          <div
            className="absolute left-0 h-full"
            style={{
              width: `${volume}%`,
              backgroundColor: 'var(--primary-accent)',
              opacity: 0.2,
            }}
          />

          {/* Filled track line */}
          <div
            className="absolute left-0 h-2.5"
            style={{
              width: `${volume}%`,
              backgroundColor: 'var(--primary-accent)',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />

          {/* Native range input */}
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={this.onChange}
            className="absolute left-0 right-0 h-full cursor-pointer w-full"
            style={{
              margin: 0,
              width: '100%',
              WebkitAppearance: 'none',
              appearance: 'none',
              background: 'transparent',
              zIndex: 10,
            }}
          />

          {/* Custom thumb without glow */}
          <div
            className="absolute pointer-events-none z-20"
            style={{
              left: `calc(${volume}% - 12px)`,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <div
              className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-gray-200"
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: 'var(--primary-accent)' }}
              />
            </div>
          </div>
        </div>

        {/* Volume level indicators */}
        <div className="flex justify-between mt-3 px-4 text-gray-500 text-xs">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
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
