import {BlackoutPage} from "../../components/layout/BlackoutPage";
import React from "react";
import "./loading.css";
import {OAC} from "../../client/OpenAudioAppContainer";
import {connect} from "react-redux";

class LoadingView extends React.Component {

    static contextType = OAC;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BlackoutPage>
                <div className="flex flex-col p-8 bg-gray-800 shadow-md hover:shodow-lg rounded-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                            <div className="flex flex-col ml-3">
                                <div className="font-medium leading-none text-gray-100">Loading OpenAudioMc...</div>
                                <p className="text-sm text-gray-300 leading-none mt-1">
                                    {this.props.loading}
                                </p> <small className="text-gray-500 inline">Build thingy</small>
                            </div>
                        </div>
                    </div>
                </div>
            </BlackoutPage>
        );
    }
}
export default connect(mapStateToProps)(LoadingView);
function mapStateToProps(state) {
    console.log(state)
    return {
        loading: state.loadingState,
    };
}