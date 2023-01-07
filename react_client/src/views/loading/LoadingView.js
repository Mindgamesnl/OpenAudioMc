import {BlackoutPage} from "../../components/layout/BlackoutPage";
import React from "react";
import "./loading.css";
import {OAC} from "../../client/OpenAudioAppContainer";
import {connect} from "react-redux";
import {LoadingSpinnerBox} from "../../components/loading/LoadingSpinnerBox";

class LoadingView extends React.Component {

    static contextType = OAC;ßß

    render() {
        return (
            <BlackoutPage>
                <LoadingSpinnerBox
                    title={"Loading OpenAudioMc"}
                    message={this.props.loading}
                    footer={"Hold on, we're loading your stuff!"}
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