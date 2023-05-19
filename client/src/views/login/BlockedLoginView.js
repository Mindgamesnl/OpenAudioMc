import {BlackoutPage} from "../../components/layout/BlackoutPage";
import React from "react";
import "../../components/loginform/login.css"
import {connect} from "react-redux";

class BlockedLoginView extends React.Component {

    render() {
        return (
            <BlackoutPage>
                <div className="py-12">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div>
                                {this.props.isPersonalBlock && <p className="w-80 text-center text-sm mb-8 text-white tracking-wide cursor-pointer">
                                    You are currently blocked from using OpenAudioMc. Please contact support at <a href="https://discord.openaudiomc.net/">https://discord.openaudiomc.net/</a> to appeal.
                                </p>}

                                {!this.props.isPersonalBlock && <p className="w-80 text-center text-sm mb-8 text-white tracking-wide cursor-pointer">
                                    This account is blocked. Please contact the server owner for more information.
                                </p>}
                            </div>
                        </div>
                    </div>
                </div>
            </BlackoutPage>
        );
    }
}
export default connect(mapStateToProps)(BlockedLoginView);
function mapStateToProps(state) {
    return {
        isPersonalBlock: state.isPersonalBlock,
    };
}