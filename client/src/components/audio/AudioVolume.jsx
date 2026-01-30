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
      <div className="relative w-full h-10 flex items-center">
        {/* Track background */}
        <div className="absolute inset-x-0 h-2 bg-gray-700 rounded-full" />

        {/* Filled track */}
        <div
          className="absolute left-0 h-2 rounded-full transition-all duration-75"
          style={{
            width: `${volume}%`,
            backgroundColor: 'var(--primary-accent)',
          }}
        />

        {/* Native range input - styled to be mostly invisible but functional */}
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={this.onChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ margin: 0 }}
        />

        {/* Custom thumb indicator */}
        <div
          className="absolute w-4 h-4 bg-white rounded-full shadow-md pointer-events-none transition-all duration-75"
          style={{
            left: `calc(${volume}% - 8px)`,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
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
