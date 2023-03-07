import {getTranslation, OAC} from "../../client/OpenAudioAppContainer";
import React from "react";
import {setGlobalState} from "../../state/store";
import {connect} from "react-redux";

class AudioVolume extends React.Component {
    static contextType = OAC;

    constructor(props) {
        super(props);
        this.state = {}
        this.onInput = this.onInput.bind(this);
    }

    onInput(element) {
        // update state
        setGlobalState({settings: {normalVolume: element.target.value}});
    }

    render() {
        let c = this.context;
        return (
            <div>
                <div className="content-section">
                    <div className="content-section-title">{getTranslation(c, "home.audioControls")}</div>
                </div>
                <div className="content-section">
                    <div className="content-card-collection items-stretch">
                        <div className="content-wrapper-box audio-content 2xl:order-2">
                            <div className="content-wrapper-context full">
                                <div className="content-text full soft-text pr-5">
                                    <div className={"inline"} dangerouslySetInnerHTML={{ __html: getTranslation(c, "home.volumeContext") }} />
                                </div>
                                <br/>
                                <input onChange={this.onInput}
                                       value={this.props.volume}
                                       className="volume-slider"
                                       type="range" min="0" max="100" step="1" />
                            </div>
                            <div>
                                <h1 className="volume-pill"><label htmlFor="volume-slider">{this.props.volume}</label></h1>
                            </div>
                        </div>
                    </div>
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