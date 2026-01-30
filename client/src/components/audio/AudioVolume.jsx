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
          className="relative h-14 flex items-center px-4 rounded-2xl"
          style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Track background */}
          <div
            className="absolute left-4 right-4 h-2.5 rounded-full"
            style={{
              backgroundColor: '#1f2937',
            }}
          />

          {/* Filled track */}
          <div
            className="absolute left-4 h-2.5 rounded-full"
            style={{
              width: `calc((100% - 32px) * ${volume / 100})`,
              backgroundColor: 'var(--primary-accent)',
              border: '1px solid rgba(0,0,0,0.08)',
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

          {/* Custom thumb without glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: `calc(16px + (100% - 32px) * ${volume / 100} - 14px)`,
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
