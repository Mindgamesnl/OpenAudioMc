import {BlackoutPage} from "../../components/layout/BlackoutPage";
import React from "react";
import "../../components/loginform/login.css"

export class BlockedLoginView extends React.Component {

    render() {
        return (
            <BlackoutPage>
                <div className="py-12">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div>
                                <p className="w-80 text-center text-sm mb-8 text-white tracking-wide cursor-pointer">
                                    This account is blocked. Please contact the server owner for more information.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </BlackoutPage>
        );
    }
}