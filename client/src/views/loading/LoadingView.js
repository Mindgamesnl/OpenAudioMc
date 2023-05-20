import {BlackoutPage} from "../../components/layout/BlackoutPage";
import React from "react";
import "./loading.css";
import {OAC} from "../../client/OpenAudioAppContainer";
import {connect} from "react-redux";
import {LoadingSpinnerBox} from "../../components/loading/LoadingSpinnerBox";
import {VERSION} from "../../index";

class LoadingView extends React.Component {

    static contextType = OAC;ßß

    render() {
        return (
            <BlackoutPage coverImage={"assets/login-background.png"}>
                <LoadingSpinnerBox
                    title={"Loading OpenAudioMc"}
                    message={this.props.loading}
                    footer={"Version " + VERSION.revision + ", line " + VERSION.tag + ""}
                />
            </BlackoutPage>
        );
    }
}
export default connect(mapStateToProps)(LoadingView);
function mapStateToProps(state) {
    return {
        loading: state.loadingState,
    };
}