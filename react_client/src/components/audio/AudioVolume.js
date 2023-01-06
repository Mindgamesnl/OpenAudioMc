import {OAC} from "../../client/OpenAudioAppContainer";
import React from "react";

export class AudioVolume extends React.Component {
    static contextType = OAC;

    constructor(props) {
        super(props);
        this.state = {
            volume: 0
        }
        this.onInput = this.onInput.bind(this);
    }

    onInput(element) {
        console.log("Updating volume to " + element.target.value);
        // update state
        this.setState({volume: element.target.value});

        // fire event to oa
        this.context.app.settings.volume = element.target.value;
    }

    componentDidMount() {
        this.setState({volume: this.context.app.settings.volume});
    }

    render() {
        return (
            <div>
                <div className="content-section">
                    <div className="content-section-title">Audio Controls</div>
                </div>
                <div className="content-section">
                    <div className="content-card-collection items-stretch">
                        <div className="content-wrapper-box audio-content 2xl:order-2">
                            <div className="content-wrapper-context full">
                                <div className="content-text full soft-text pr-5">
                                    Volume control
                                </div>
                                <br/>
                                <input onChange={this.onInput}
                                       value={this.state.volume}
                                       className="volume-slider"
                                       type="range" min="0" max="100" step="1" />
                            </div>
                            <div>
                                <h1 className="volume-pill"><label htmlFor="volume-slider">{this.state.volume}</label></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}