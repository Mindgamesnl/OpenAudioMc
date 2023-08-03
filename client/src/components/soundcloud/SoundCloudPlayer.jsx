import React from "react";
import {connect} from "react-redux";

class SoundCloudPlayer extends React.Component {
    render() {
        if (!this.props.soundcloud.visible) {
            return <div/>
        }

        return (
            <footer>
                <a href={this.props.soundcloud.link}>
                    <img className="sc-cover" src={this.props.soundcloud.image} alt={"Soundcloud now playing indicator"}/>
                    <p className="sc-title">{this.props.soundcloud.title}</p>
                </a>
            </footer>
        );
    }
}
export default connect(mapStateToProps)(SoundCloudPlayer);
function mapStateToProps(state) {
    return {
        soundcloud: state.soundcloud,
    };
}