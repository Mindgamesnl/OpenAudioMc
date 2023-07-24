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
                    this.videoRef.current.currentTime = Math.random() * this.videoRef.current.duration;
                }
            }, 800)
        });
    }

    componentWillUnmount() {
        // stop listening for clicks
        document.removeEventListener('click', this.onPageClick);
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
                <div className={"absolute"}>
                    <video ref={this.videoRef} title="No Sleep" playsInline id={"testv"}>
                        <source src={webm} type="video/webm" />
                        <source src={mp4} type="video/mp4" />
                    </video>
                </div>
                {this.props.children}
            </>
        );
    }
}

export default NoSleepComponent;
