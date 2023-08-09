import React, { Component, createRef } from 'react';
import { webm, mp4 } from './media';

class NoSleepComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { enabled: false, task: null };
    this.videoRef = createRef();

    this.onPageClick = this.onPageClick.bind(this);
  }

  componentDidMount() {
    // listen for clicks
    document.addEventListener('click', this.onPageClick);

    // go to start on video end
    this.videoRef.current.addEventListener('ended', () => {
      this.videoRef.current.currentTime = 2;
      this.videoRef.current.play();
    });

    this.setState({
      task: setInterval(() => {
        // jump to random time in video
        if (this.videoRef.current) {
          let newTime = Math.random() * this.videoRef.current.duration;
          // make sure newTime is fafe (no nonfinite numbers)
          // eslint-disable-next-line no-restricted-globals
          if (newTime === Infinity || newTime === -Infinity || isNaN(newTime)) {
            newTime = 0;
          }
          this.videoRef.current.currentTime = newTime;
        }
      }, 800),
    });
  }

  componentWillUnmount() {
    // stop listening for clicks
    document.removeEventListener('click', this.onPageClick);
    clearInterval(this.state.task);
  }

  onPageClick() {
    this.setState({ enabled: true });
  }

  render() {
    if (this.state.enabled) {
      this.videoRef.current.play();
    }

    return (
      <>
        {this.props.children}
        <div className="hidden">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video ref={this.videoRef} title="No Sleep" playsInline>
            <source src={webm} type="video/webm" />
            <source src={mp4} type="video/mp4" />
          </video>
        </div>
      </>
    );
  }
}

export default NoSleepComponent;
