import React from 'react';
import { connect } from 'react-redux';
import { setGlobalState } from '../../state/store';
import './audiovolume.css';

class AudioVolume extends React.Component {
  constructor(props) {
    super(props);
    this.dragging = false;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onWheel = this.onWheel.bind(this);
  }

  onMouseDown(e) {
    e.preventDefault();
    this.dragging = true;
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
    this.updateVolume(e);
  }

  onMouseMove(e) {
    if (this.dragging) {
      e.preventDefault();
      this.updateVolume(e);
    }
  }

  onMouseUp() {
    this.dragging = false;
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  onWheel(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -2 : 2;
    const newVolume = Math.max(0, Math.min(100, this.props.volume + delta));
    setGlobalState({ settings: { normalVolume: newVolume } });
  }

  updateVolume(e) {
    const rect = this.container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = (Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180) / Math.PI + 90;
    let normalizedAngle = angle;
    if (normalizedAngle < 0) normalizedAngle += 360;
    if (normalizedAngle > 360) normalizedAngle -= 360;
    const volume = Math.round((normalizedAngle / 360) * 100);
    setGlobalState({ settings: { normalVolume: volume } });
  }

  render() {
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className="absolute inset-0"
        ref={(el) => {
          this.container = el;
        }}
        onMouseDown={this.onMouseDown}
        onWheel={this.onWheel}
        style={{ userSelect: 'none' }}
      >
        {/* Invisible circular slider overlay */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(AudioVolume);

function mapStateToProps(state) {
  return {
    volume: state.settings.normalVolume,
    settings: state.settings,
    hasPlayingMedia: state.hasPlayingMedia,
  };
}
